const mysql = require('mysql2/promise');
const { 
  firmInfo, 
  services, 
  portfolio, 
  clients, 
  team, 
  libraryResources, 
  vacancies 
} = require('../data/seedData');

const DB_CONFIG = {
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USER || 'root',
  password: process.env.MYSQL_PASSWORD || '',
  database: process.env.MYSQL_DATABASE || 'tax_assistance',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

let pool = null;
let isConnected = false;

const initMySQL = async () => {
  try {
    // 1. Ensure database exists
    const tempConn = await mysql.createConnection({
      host: DB_CONFIG.host,
      port: DB_CONFIG.port,
      user: DB_CONFIG.user,
      password: DB_CONFIG.password
    });
    await tempConn.query(`CREATE DATABASE IF NOT EXISTS \`${DB_CONFIG.database}\`;`);
    await tempConn.end();

    // 2. Create pool
    pool = mysql.createPool(DB_CONFIG);
    const conn = await pool.getConnection();
    isConnected = true;
    console.log(`[MySQL] Connected successfully to MySQL database "${DB_CONFIG.database}" on port ${DB_CONFIG.port}`);
    conn.release();

    // 3. Create tables
    await createTables();

    // 4. Seed initial data
    await seedTables();

  } catch (err) {
    console.warn(`[MySQL] Connection warning: ${err.message}. Enabling resilient fallback mode.`);
    isConnected = false;
  }
};

const createTables = async () => {
  if (!pool) return;

  // Inquiries Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fullName VARCHAR(255) NOT NULL,
      organization VARCHAR(255) DEFAULT '',
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(100) NOT NULL,
      serviceRequired VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      attachment VARCHAR(500) DEFAULT NULL,
      status VARCHAR(50) DEFAULT 'New',
      notes TEXT DEFAULT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // Career Applications Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS applications (
      id INT AUTO_INCREMENT PRIMARY KEY,
      fullName VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(100) NOT NULL,
      positionId VARCHAR(100) DEFAULT '',
      positionTitle VARCHAR(255) NOT NULL,
      coverLetter TEXT DEFAULT NULL,
      resumeUrl VARCHAR(500) NOT NULL,
      status VARCHAR(50) DEFAULT 'Submitted',
      notes TEXT DEFAULT NULL,
      appliedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
  `);

  // Clients Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS clients (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(255) NOT NULL,
      priority VARCHAR(50) DEFAULT '2nd',
      logo VARCHAR(500) DEFAULT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Library Resources Table
  await pool.query(`
    CREATE TABLE IF NOT EXISTS library_resources (
      id VARCHAR(100) PRIMARY KEY,
      title VARCHAR(500) NOT NULL,
      category VARCHAR(255) NOT NULL,
      year VARCHAR(10) NOT NULL,
      format VARCHAR(100) NOT NULL,
      size VARCHAR(50) NOT NULL,
      description TEXT NOT NULL,
      downloadUrl VARCHAR(500) DEFAULT '#',
      publishedDate VARCHAR(50) DEFAULT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  console.log('[MySQL] Tables verified and created successfully.');
};

const seedTables = async () => {
  if (!pool) return;

  // Seed Clients
  const [clientRows] = await pool.query('SELECT COUNT(*) as cnt FROM clients');
  if (clientRows[0].cnt === 0) {
    for (const c of clients) {
      await pool.query(
        'INSERT INTO clients (id, name, category, priority, logo) VALUES (?, ?, ?, ?, ?)',
        [c.id, c.name, c.category, c.priority, c.logo || null]
      );
    }
    console.log(`[MySQL] Seeded ${clients.length} clients into MySQL.`);
  }

  // Seed Library
  const [libRows] = await pool.query('SELECT COUNT(*) as cnt FROM library_resources');
  if (libRows[0].cnt === 0) {
    for (const r of libraryResources) {
      await pool.query(
        'INSERT INTO library_resources (id, title, category, year, format, size, description, downloadUrl, publishedDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
        [r.id, r.title, r.category, r.year, r.format, r.size, r.description, r.downloadUrl, r.publishedDate]
      );
    }
    console.log(`[MySQL] Seeded ${libraryResources.length} library resources into MySQL.`);
  }
};

const getMySQLStatus = () => ({
  connected: isConnected,
  type: 'MySQL',
  host: DB_CONFIG.host,
  database: DB_CONFIG.database,
  port: DB_CONFIG.port
});

module.exports = {
  initMySQL,
  getPool: () => pool,
  getMySQLStatus
};
