# Tax Assistance (TA), RHA Advisory & Co. - Full Stack MERN Website

A modern, high-performance, and responsive full-stack website built with the **MERN stack (MongoDB, Express, React, Node.js)** with Tailwind CSS for **Tax Assistance (TA), RHA Advisory & Co.** (independent member of the Dhaka Taxes Bar Association).

---

## 🏛️ Firm Overview
- **Firm Name**: Tax Assistance (TA), RHA Advisory & Co.
- **Tagline**: *Professional Solutions. Practical Advice. Trusted Partnership.*
- **Affiliation**: Independent member of the Dhaka Taxes Bar Association.
- **Office Address**: Level 3, Ventura Iconia, Holding 37, Road No. 11, Dhaka 1213, Bangladesh.
- **Direct Phone**: +880 1767-690408
- **Email**: info@tax-assistance.com
- **WhatsApp**: +880 1767-690408

---

## 🚀 Key Features

1. **Integrated Practice Directory**:
   - **Audit & Assurance**: External audit assistance, project audit, NGO/NGOB, PF/GF/WPPF, internal audit, risk assessment.
   - **Taxation**: Corporate tax compliance (Sec 177), personal income tax planning, transfer pricing, appeals/ADR, indirect tax (VAT).
   - **Consulting**: Accounting services, QuickBooks automation, asset management, payroll, SOP & manuals, AI-powered automation solutions.
   - **Business Support Services**: RJSC incorporations, BIDA visas and work permits, chamber certificates, trademarks, and statutory compliance.

2. **Client Showcase**:
   - High-fidelity logo gallery of 1st and 2nd priority clients (BRAC Bank, City Bank, IFIC Bank, PURBANI Group, Somru Bio Science, Novus Clinical Research, GIZ, Hemas, Mevan, Intisaar, World Vision, ESDO, DCA, Prokritee, etc.).
   - Interactive category filter by Banking, Consumer Goods, Services, NGOs, Garments, Pharma, and Energy.
   - Special highlight for 250+ individual tax clients.

3. **Leadership & Team**:
   - **Mehedi Hasan, CPA, ITP** (Founder & CEO) - Member of Dhaka Taxes Bar Association.
   - **Rahatul Jannat Anni** (Secretary) - Corporate secretarial and client administration.
   - Affiliates network and "Our People, Our Strength" philosophy.

4. **Resource Library**:
   - Searchable and filterable regulatory repository covering Tax updates (Finance Act amendments), VAT guides, RJSC whitepapers, and SOP blueprints.

5. **Career Portal**:
   - Active vacancies with job details, responsibilities, and required qualifications.
   - Interactive modal with CV/Resume file upload.

6. **Consultation & Contact**:
   - Working contact inquiry form with service pre-selection and file attachment.
   - Google Maps embed for Ventura Iconia, Road 11, Dhaka.
   - Direct WhatsApp action buttons.

7. **Admin CMS Portal**:
   - Live browser-accessible portal to view submitted client inquiries and job candidate CVs.

---

## 💻 Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4, Lucide Icons
- **Backend**: Node.js, Express REST API, Multer (file uploads)
- **Database**: MongoDB & Mongoose (with automatic resilient fallback)
- **Image Pipeline**: Converted high-res HEIC to JPEG, web-optimized client and firm logos

---

## 🏃 Running the Application

### 1. Run Everything in Production Mode (Single Command)
```bash
npm start
```
*Opens on **http://localhost:5000*** (serves both React UI and REST API).

### 2. Run in Development Mode with Hot-Reloading (HMR)
In terminal 1 (Backend):
```bash
npm run server
```
In terminal 2 (Frontend):
```bash
npm run client
```
*Frontend dev server runs on **http://localhost:3000*** and proxies all `/api` calls to **http://localhost:5000***.

### 3. Rebuilding the Frontend Bundle
```bash
npm run build
```
