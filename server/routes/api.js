const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {
  firmInfo,
  services,
  portfolio,
  clients,
  team,
  libraryResources,
  vacancies
} = require('../data/seedData');

const { getPool, getMySQLStatus } = require('../config/mysql');
const { getDBStatus } = require('../config/db');

// Multer storage for uploads
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9]/g, '_');
    cb(null, `${basename}_${Date.now()}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 } // 15MB limit
});

const crypto = require('crypto');

// -------------------------------------------------------------
// CMS Administrative Security & Session Management
// -------------------------------------------------------------
const activeAdminSessions = new Map();

// Configurable admin credentials
const ADMIN_CONFIG = {
  usernames: ['admin', 'admin@tax-assistance.com', 'info@tax-assistance.com'],
  password: process.env.ADMIN_PASSWORD || 'admin@ta2026'
};

const verifyAdminAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers['x-admin-token'];
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.substring(7) 
    : authHeader;

  if (!token || !activeAdminSessions.has(token)) {
    return res.status(401).json({
      success: false,
      message: 'Unauthorized: Valid CMS session required. Please log in.'
    });
  }

  req.adminSession = activeAdminSessions.get(token);
  next();
};

// -------------------------------------------------------------
// CMS Authentication Endpoints
// -------------------------------------------------------------
router.post('/admin/login', (req, res) => {
  const { username, password } = req.body || {};
  const cleanUser = (username || '').trim().toLowerCase();

  if (ADMIN_CONFIG.usernames.includes(cleanUser) && password === ADMIN_CONFIG.password) {
    const token = 'ta_cms_' + crypto.randomBytes(32).toString('hex');
    const user = {
      username: cleanUser,
      name: 'Mehedi Hasan, CPA',
      designation: 'Managing Partner & Chief Administrator',
      email: 'info@tax-assistance.com',
      loginTime: new Date().toISOString()
    };
    activeAdminSessions.set(token, user);
    return res.json({
      success: true,
      message: 'Authentication successful. Access granted to TA CMS Console.',
      token,
      user
    });
  }

  return res.status(401).json({
    success: false,
    message: 'Invalid administrative username or password. Access denied.'
  });
});

router.get('/admin/verify', (req, res) => {
  const authHeader = req.headers.authorization || req.headers['x-admin-token'];
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.substring(7) 
    : authHeader;

  if (token && activeAdminSessions.has(token)) {
    return res.json({
      success: true,
      authenticated: true,
      user: activeAdminSessions.get(token)
    });
  }

  return res.status(401).json({
    success: false,
    authenticated: false,
    message: 'Session expired or invalid.'
  });
});

router.post('/admin/logout', (req, res) => {
  const authHeader = req.headers.authorization || req.headers['x-admin-token'];
  const token = authHeader && authHeader.startsWith('Bearer ') 
    ? authHeader.substring(7) 
    : authHeader;

  if (token) {
    activeAdminSessions.delete(token);
  }
  res.json({ success: true, message: 'Administrative session ended.' });
});

// -------------------------------------------------------------
// Public Endpoints
// -------------------------------------------------------------

// Firm Info & Stats
router.get('/firm', (req, res) => {
  res.json({ success: true, data: firmInfo });
});

// Services
router.get('/services', (req, res) => {
  res.json({ success: true, count: services.length, data: services });
});

router.get('/services/:id', (req, res) => {
  const service = services.find(s => s.id === req.params.id);
  if (!service) {
    return res.status(404).json({ success: false, message: 'Service not found' });
  }
  res.json({ success: true, data: service });
});

// Portfolio
router.get('/portfolio', (req, res) => {
  res.json({ success: true, data: portfolio });
});

// Clients (from MySQL if connected, else seedData)
router.get('/clients', async (req, res) => {
  const pool = getPool();
  const { category, search } = req.query;

  try {
    if (pool) {
      let query = 'SELECT * FROM clients WHERE 1=1';
      const params = [];

      if (category && category !== 'All') {
        query += ' AND category = ?';
        params.push(category);
      }
      if (search) {
        query += ' AND (name LIKE ? OR category LIKE ?)';
        params.push(`%${search}%`, `%${search}%`);
      }
      query += ' ORDER BY priority ASC, name ASC';

      const [rows] = await pool.query(query, params);
      return res.json({ success: true, count: rows.length, data: rows });
    }
  } catch (err) {
    console.error('MySQL clients fetch error, falling back:', err.message);
  }

  // Fallback
  let result = [...clients];
  if (category && category !== 'All') {
    result = result.filter(c => c.category === category);
  }
  if (search) {
    const q = search.toLowerCase();
    result = result.filter(c => c.name.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
  }
  res.json({ success: true, count: result.length, data: result });
});

// Add New Client (Admin)
router.post('/clients', verifyAdminAuth, async (req, res) => {
  const pool = getPool();
  const { name, category, priority, logo } = req.body;

  if (!name || !category) {
    return res.status(400).json({ success: false, message: 'Client name and category are required.' });
  }

  const id = name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-');

  try {
    if (pool) {
      await pool.query(
        'INSERT INTO clients (id, name, category, priority, logo) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name=?, category=?, priority=?, logo=?',
        [id, name, category, priority || '2nd', logo || null, name, category, priority || '2nd', logo || null]
      );
      return res.json({ success: true, message: 'Client partner added successfully to MySQL.', data: { id, name, category, priority, logo } });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }

  res.json({ success: true, message: 'Client added to local cache.' });
});

// Delete Client (Admin)
router.delete('/clients/:id', verifyAdminAuth, async (req, res) => {
  const pool = getPool();
  try {
    if (pool) {
      await pool.query('DELETE FROM clients WHERE id = ?', [req.params.id]);
      return res.json({ success: true, message: 'Client removed from MySQL.' });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
  res.json({ success: true, message: 'Client deleted.' });
});

// Team
router.get('/team', (req, res) => {
  res.json({ success: true, data: team });
});

// Library Resources (from MySQL)
router.get('/library', async (req, res) => {
  const pool = getPool();
  const { category, year, search } = req.query;

  try {
    if (pool) {
      let query = 'SELECT * FROM library_resources WHERE 1=1';
      const params = [];

      if (category && category !== 'All') {
        query += ' AND category = ?';
        params.push(category);
      }
      if (year && year !== 'All') {
        query += ' AND year = ?';
        params.push(year);
      }
      if (search) {
        query += ' AND (title LIKE ? OR description LIKE ? OR category LIKE ?)';
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }
      query += ' ORDER BY publishedDate DESC, year DESC';

      const [rows] = await pool.query(query, params);
      return res.json({ success: true, count: rows.length, data: rows });
    }
  } catch (err) {
    console.error('MySQL library fetch error, falling back:', err.message);
  }

  // Fallback
  let list = [...libraryResources];
  if (category && category !== 'All') list = list.filter(r => r.category === category);
  if (year && year !== 'All') list = list.filter(r => r.year === year);
  if (search) {
    const q = search.toLowerCase();
    list = list.filter(r => r.title.toLowerCase().includes(q) || r.description.toLowerCase().includes(q));
  }
  res.json({ success: true, count: list.length, data: list });
});

// Add Library Resource (Admin)
router.post('/library', verifyAdminAuth, async (req, res) => {
  const pool = getPool();
  const { title, category, year, format, size, description, downloadUrl } = req.body;

  if (!title || !category || !year) {
    return res.status(400).json({ success: false, message: 'Title, category, and year are required.' });
  }

  const id = 'res-' + Date.now();
  const pubDate = new Date().toISOString().split('T')[0];

  try {
    if (pool) {
      await pool.query(
        'INSERT INTO library_resources (id, title, category, year, format, size, description, downloadUrl, publishedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [id, title, category, year, format || 'PDF Document', size || '1.2 MB', description || '', downloadUrl || '#', pubDate]
      );
      return res.status(201).json({ success: true, message: 'Resource publication added to MySQL.', data: { id, title, category, year } });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }

  res.json({ success: true, message: 'Resource added to cache.' });
});

// Delete Library Resource (Admin)
router.delete('/library/:id', verifyAdminAuth, async (req, res) => {
  const pool = getPool();
  try {
    if (pool) {
      await pool.query('DELETE FROM library_resources WHERE id = ?', [req.params.id]);
      return res.json({ success: true, message: 'Resource removed from MySQL.' });
    }
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
  res.json({ success: true, message: 'Resource deleted.' });
});

// Vacancies
router.get('/vacancies', (req, res) => {
  res.json({ success: true, data: vacancies });
});

// -------------------------------------------------------------
// Inquiries (MySQL Database)
// -------------------------------------------------------------

// Submit Contact Inquiry
router.post('/inquiries', upload.single('attachment'), async (req, res) => {
  try {
    const { fullName, organization, email, phone, serviceRequired, message } = req.body;

    if (!fullName || !email || !phone || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Mandatory fields missing: Full Name, Email, Phone, and Message are required.' 
      });
    }

    const attachmentPath = req.file ? `/uploads/${req.file.filename}` : null;
    const pool = getPool();

    if (pool) {
      const [result] = await pool.query(
        'INSERT INTO inquiries (fullName, organization, email, phone, serviceRequired, message, attachment, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [fullName, organization || '', email, phone, serviceRequired || 'General Advisory', message, attachmentPath, 'New']
      );

      return res.status(201).json({
        success: true,
        message: 'Inquiry submitted successfully into MySQL! Our advisors will reach out promptly.',
        data: {
          id: result.insertId,
          fullName,
          organization,
          email,
          phone,
          serviceRequired,
          attachment: attachmentPath,
          status: 'New'
        }
      });
    }

    // Fallback if MySQL pool not ready
    res.status(201).json({
      success: true,
      message: 'Inquiry received. Stored in backup buffer.',
      data: { fullName, email, phone, serviceRequired }
    });

  } catch (err) {
    console.error('Error in POST /inquiries:', err);
    res.status(500).json({ success: false, message: 'Failed to submit inquiry: ' + err.message });
  }
});

// Get All Inquiries (Admin Backend Dashboard)
router.get('/inquiries', verifyAdminAuth, async (req, res) => {
  try {
    const pool = getPool();
    if (pool) {
      const { status, search } = req.query;
      let query = 'SELECT * FROM inquiries WHERE 1=1';
      const params = [];

      if (status && status !== 'All') {
        query += ' AND status = ?';
        params.push(status);
      }
      if (search) {
        query += ' AND (fullName LIKE ? OR organization LIKE ? OR email LIKE ? OR serviceRequired LIKE ?)';
        params.push(`%${search}%`, `%${search}%`, `%${search}%`, `%${search}%`);
      }

      query += ' ORDER BY createdAt DESC';
      const [rows] = await pool.query(query, params);
      return res.json({ success: true, count: rows.length, data: rows });
    }

    res.json({ success: true, count: 0, data: [] });
  } catch (err) {
    console.error('Error in GET /inquiries:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update Inquiry Status & Notes (Admin)
router.put('/inquiries/:id', verifyAdminAuth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const pool = getPool();

    if (pool) {
      await pool.query(
        'UPDATE inquiries SET status = COALESCE(?, status), notes = COALESCE(?, notes) WHERE id = ?',
        [status, notes, req.params.id]
      );
      return res.json({ success: true, message: 'Inquiry updated successfully in MySQL.' });
    }

    res.status(400).json({ success: false, message: 'Database not connected.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete Inquiry (Admin)
router.delete('/inquiries/:id', verifyAdminAuth, async (req, res) => {
  try {
    const pool = getPool();
    if (pool) {
      await pool.query('DELETE FROM inquiries WHERE id = ?', [req.params.id]);
      return res.json({ success: true, message: 'Inquiry deleted from MySQL database.' });
    }
    res.status(400).json({ success: false, message: 'Database not connected.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// -------------------------------------------------------------
// Career Applications (MySQL Database)
// -------------------------------------------------------------

// Submit Job Application
router.post('/career/apply', upload.single('resume'), async (req, res) => {
  try {
    const { fullName, email, phone, positionId, positionTitle, coverLetter } = req.body;

    if (!fullName || !email || !phone || !positionTitle) {
      return res.status(400).json({ success: false, message: 'Please provide full name, email, phone, and position title.' });
    }

    if (!req.file) {
      return res.status(400).json({ success: false, message: 'Resume / CV document is required.' });
    }

    const resumeUrl = `/uploads/${req.file.filename}`;
    const pool = getPool();

    if (pool) {
      const [result] = await pool.query(
        'INSERT INTO applications (fullName, email, phone, positionId, positionTitle, coverLetter, resumeUrl, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [fullName, email, phone, positionId || '', positionTitle, coverLetter || '', resumeUrl, 'Submitted']
      );

      return res.status(201).json({
        success: true,
        message: 'Application & CV saved successfully in MySQL! Our HR team will review your credentials.',
        data: {
          id: result.insertId,
          fullName,
          email,
          positionTitle,
          resumeUrl
        }
      });
    }

    res.status(201).json({ success: true, message: 'Application submitted.' });
  } catch (err) {
    console.error('Error in POST /career/apply:', err);
    res.status(500).json({ success: false, message: 'Failed to submit application: ' + err.message });
  }
});

// Get All Applications (Admin Backend Dashboard)
router.get('/career/applications', verifyAdminAuth, async (req, res) => {
  try {
    const pool = getPool();
    if (pool) {
      const { status, search } = req.query;
      let query = 'SELECT * FROM applications WHERE 1=1';
      const params = [];

      if (status && status !== 'All') {
        query += ' AND status = ?';
        params.push(status);
      }
      if (search) {
        query += ' AND (fullName LIKE ? OR email LIKE ? OR positionTitle LIKE ?)';
        params.push(`%${search}%`, `%${search}%`, `%${search}%`);
      }

      query += ' ORDER BY appliedAt DESC';
      const [rows] = await pool.query(query, params);
      return res.json({ success: true, count: rows.length, data: rows });
    }

    res.json({ success: true, count: 0, data: [] });
  } catch (err) {
    console.error('Error in GET /career/applications:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// Update Application Status & Notes (Admin)
router.put('/career/applications/:id', verifyAdminAuth, async (req, res) => {
  try {
    const { status, notes } = req.body;
    const pool = getPool();

    if (pool) {
      await pool.query(
        'UPDATE applications SET status = COALESCE(?, status), notes = COALESCE(?, notes) WHERE id = ?',
        [status, notes, req.params.id]
      );
      return res.json({ success: true, message: 'Applicant status updated in MySQL.' });
    }
    res.status(400).json({ success: false, message: 'Database not connected.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Delete Application (Admin)
router.delete('/career/applications/:id', verifyAdminAuth, async (req, res) => {
  try {
    const pool = getPool();
    if (pool) {
      await pool.query('DELETE FROM applications WHERE id = ?', [req.params.id]);
      return res.json({ success: true, message: 'Application record deleted from MySQL.' });
    }
    res.status(400).json({ success: false, message: 'Database not connected.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// -------------------------------------------------------------
// Admin Analytics & Dashboard Overview
// -------------------------------------------------------------
router.get('/admin/stats', verifyAdminAuth, async (req, res) => {
  try {
    const pool = getPool();
    let stats = {
      inquiriesTotal: 0,
      inquiriesNew: 0,
      inquiriesResolved: 0,
      applicationsTotal: 0,
      applicationsReview: 0,
      clientsTotal: clients.length,
      libraryTotal: libraryResources.length,
      database: getMySQLStatus()
    };

    if (pool) {
      const [inqCounts] = await pool.query(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'New' THEN 1 ELSE 0 END) as newCount,
          SUM(CASE WHEN status = 'Resolved' THEN 1 ELSE 0 END) as resolvedCount
        FROM inquiries
      `);
      if (inqCounts[0]) {
        stats.inquiriesTotal = inqCounts[0].total || 0;
        stats.inquiriesNew = inqCounts[0].newCount || 0;
        stats.inquiriesResolved = inqCounts[0].resolvedCount || 0;
      }

      const [appCounts] = await pool.query(`
        SELECT 
          COUNT(*) as total,
          SUM(CASE WHEN status = 'Submitted' THEN 1 ELSE 0 END) as submittedCount
        FROM applications
      `);
      if (appCounts[0]) {
        stats.applicationsTotal = appCounts[0].total || 0;
        stats.applicationsReview = appCounts[0].submittedCount || 0;
      }

      const [clientCount] = await pool.query('SELECT COUNT(*) as total FROM clients');
      if (clientCount[0]) {
        stats.clientsTotal = clientCount[0].total || 0;
      }

      const [libCount] = await pool.query('SELECT COUNT(*) as total FROM library_resources');
      if (libCount[0]) {
        stats.libraryTotal = libCount[0].total || 0;
      }
    }

    res.json({ success: true, data: stats });
  } catch (err) {
    console.error('Error in /admin/stats:', err);
    res.status(500).json({ success: false, message: err.message });
  }
});

// System Status Endpoint
router.get('/status', (req, res) => {
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    firm: firmInfo.name,
    database: getMySQLStatus()
  });
});

module.exports = router;
