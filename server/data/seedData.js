const firmInfo = {
  name: "Tax Assistance (TA), RHA Advisory & Co.",
  shortName: "Tax Assistance",
  tagline: "Professional Solutions. Practical Advice. Trusted Partnership.",
  subTagline: "Tax Assistance & Financial Advisory",
  established: "2025",
  affiliation: "Independent member of the Dhaka Taxes Bar Association",
  summary: "Tax Assistance (TA) is an independent professional services firm with distinctive local strength, practical understanding, and professional expertise. We provide integrated Audit, Tax, Consulting, and Business Support Services to businesses, organizations, and individuals.",
  mission: "To provide professional services ethically through leadership, collaboration, and practical solutions that create value for our clients.",
  vision: "To evolve as a leading institution of international standards and become a benchmark for professional services among our clients and peers.",
  coreValues: [
    { title: "Service", description: "We are committed to delivering responsive, practical, and high-quality professional services." },
    { title: "Collaboration", description: "We believe in working closely with our clients and partners to achieve shared objectives." },
    { title: "Leadership", description: "We strive to lead through professionalism, knowledge, innovation, and responsible decision-making." },
    { title: "Integrity", description: "We conduct our work with honesty, transparency, confidentiality, and professional ethics." }
  ],
  ethics: "At Tax Assistance, ethical conduct is at the heart of everything we do. We maintain the highest standards of integrity, professionalism, confidentiality, and accountability in our decision-making and client relationships.",
  contact: {
    address: "Level 3, Ventura Iconia, Holding 37, Road No. 11, Dhaka 1213, Bangladesh",
    phone: "+880 1767-690408",
    email: "info@tax-assistance.com",
    whatsapp: "+8801767690408",
    googleMapUrl: "https://maps.google.com/?q=Ventura+Iconia+Road+11+Dhaka+1213+Bangladesh"
  },
  stats: [
    { label: "Individual Clients Served", value: "250+" },
    { label: "Sectors Covered", value: "10+" },
    { label: "Service Categories", value: "4 Core Pillars" },
    { label: "Client Retention Rate", value: "98%" }
  ]
};

const services = [
  {
    id: "audit-assurance",
    title: "Audit & Assurance",
    category: "Audit & Assurance",
    summary: "Our Audit & Assurance team helps organizations strengthen financial reporting, internal controls, governance, compliance, and operational effectiveness.",
    icon: "ShieldCheck",
    subcategories: [
      {
        title: "Audit",
        items: [
          "Assistance in External Audit",
          "Group Reporting and Corporate Governance",
          "Assistance in Project Audit",
          "Assistance in NGO/NGOB Audit",
          "Assistance in PNGO Audit",
          "Assistance in Provident Fund (PF) Audit",
          "Assistance in Gratuity Fund (GF) Audit",
          "Assistance in WPPF Audit",
          "Perform Internal Audit",
          "Internal Control Assessment & Audit",
          "Financial Review",
          "Assistance in IFRS Compliance Audit"
        ]
      },
      {
        title: "Assurance",
        items: [
          "Assessment of risks and deficiencies in existing control systems",
          "Review and redesign of control frameworks aligned with business strategy",
          "Recommendation of safeguards to reduce identified risks",
          "Review Engagement",
          "Fixed Asset Verification",
          "Inventory Verification"
        ]
      }
    ]
  },
  {
    id: "taxation",
    title: "Taxation",
    category: "Taxation",
    summary: "Integrated tax solutions to maximize tax-planning opportunities, ensure complete statutory compliance, and address complex tax challenges.",
    icon: "ReceiptPercent",
    subcategories: [
      {
        title: "Direct Tax - Corporate",
        items: [
          "Corporate Tax Registration & e-TIN Registration/Amendment",
          "Income Year Maintenance",
          "Return under Section 177 - Review, Preparation & Submission",
          "Corporate Tax Return Preparation & Filing",
          "Quarterly Advance Income Tax (AIT) - Computation & Submission",
          "Income Tax Clearance Certificate",
          "Transfer Pricing: Statement of International Transactions & Study Report",
          "Issuance of Chartered Accountant's Certificate",
          "Assessment at DCT Level & Revised Assessments",
          "Appeal against orders of DCT & Commissioner (Appeals)",
          "Defending Departmental Appeals & High Court Applications",
          "Representation before Taxes Appellate Tribunal & ADR",
          "Provident Fund, Gratuity Fund & WPPF Approval",
          "NBR Certification relating to DTAA/Non-DTAA & SRO clarifications"
        ]
      },
      {
        title: "Direct Tax - Personal",
        items: [
          "Personal Income Tax Planning & Computation",
          "Income Tax Return Preparation and Submission",
          "Tax services for local and expatriate individuals",
          "Income Tax Clearance Certificate",
          "Assessment at DCT Level & Error Correction Applications",
          "Adjustment of Tax Refunds",
          "Appeals against DCT orders & Tribunal Reference Applications",
          "Alternative Dispute Resolution (ADR) Representation"
        ]
      },
      {
        title: "Indirect Tax - VAT",
        items: [
          "BIN Registration & Amendment",
          "Monthly VAT Return - Review, Preparation & Submission",
          "VAT Challan Preparation, Attestation & Deposition",
          "Input-Output Coefficient - Review, Preparation & Submission",
          "VAT Compliance Certificate",
          "VAT Software Implementation",
          "Assistance with appeals before VAT authorities & VAT Tribunal/ADR",
          "Assistance with VAT audit findings & High Court reference"
        ]
      }
    ]
  },
  {
    id: "consulting",
    title: "Consulting",
    category: "Consulting",
    summary: "Simplifying modern business complexity through accounting services, asset management, payroll, SOP development, and AI automation.",
    icon: "TrendingUp",
    subcategories: [
      {
        title: "Accounting Services",
        items: [
          "Monthly, Quarterly & Annual Accounts Preparation",
          "Fund Accounts Preparation - PF, GF & WPPF",
          "Accounting Advisory & Backlog Resolution",
          "FDI Reporting",
          "Withholding Tax and VAT Calculation & Deposition",
          "ERP Implementation & Integration",
          "QuickBooks Bookkeeping, Automation & Reporting"
        ]
      },
      {
        title: "Asset Management",
        items: [
          "Fixed Asset Verification",
          "Physical Inventory Verification",
          "Asset Tagging and Register Preparation",
          "Periodic Cash Counting"
        ]
      },
      {
        title: "Payroll Services",
        items: [
          "Monthly Payroll Processing & Software Solutions",
          "Payroll Tax Computation, Deduction & Deposition",
          "Salary Advice & Individual Online Payslips",
          "Final Settlement Calculation",
          "Annual Investment Notice & Annual Salary Certificate",
          "Monthly & Annual Employee Tax Statements",
          "Salary Component Restructuring & Tax Optimization",
          "PF, GF & WPPF Fund Management"
        ]
      },
      {
        title: "Business Process & SOP Development",
        items: [
          "Financial Manual and Policy Development",
          "Procurement Manual Development",
          "Finance & Accounts SOP Development",
          "Corporate Finance & Sales Management SOPs",
          "VAT Management & Supply Chain SOPs",
          "Inventory & Fixed Assets Management SOPs",
          "Direct & Indirect Tax Process Development"
        ]
      },
      {
        title: "Automation with AI",
        items: [
          "Accounting & Bookkeeping Automation",
          "Financial Reporting & Real-time Dashboard Automation",
          "VAT & Tax Compliance Automation",
          "Payroll & HR Process Automation",
          "Document & Data Processing using AI",
          "AI-Powered Financial & Business Analysis",
          "Digital Approval & Expense Management Workflows"
        ]
      },
      {
        title: "Other Consulting Services",
        items: [
          "Cost Certification & Price Verification",
          "Legalization & Notarization Support",
          "Financial Due Diligence & Taxation Due Diligence",
          "Company Valuation",
          "Assistance in Obtaining Bank Loan Approvals",
          "Management Consulting & Process Improvement"
        ]
      }
    ]
  },
  {
    id: "business-support",
    title: "Business Support Services",
    category: "Business Support Services",
    summary: "Full corporate secretarial, RJSC, BIDA, and licensing services to help businesses establish, operate, and thrive in Bangladesh.",
    icon: "Building2",
    subcategories: [
      {
        title: "Registrar of Joint Stock Companies & Firms (RJSC)",
        items: [
          "Company Name Clearance & Name Change",
          "New Company Incorporation (Private & Public)",
          "Registered Address Change",
          "Share Transfer & Director Change",
          "AGM & EGM Documentation & Preparation",
          "Increase / Decrease of Share Capital",
          "Annual Return Filing & Return for Changes",
          "Partnership & Society Registration",
          "Memorandum & Articles of Association (MoA & AoA) Drafting"
        ]
      },
      {
        title: "Bangladesh Investment Development Authority (BIDA)",
        items: [
          "E-Visa Application",
          "Work Permit Application, Amendment & Cancellation",
          "Liaison / Branch / Representative Office Registration & Renewal",
          "Outward Remittance Approval: Royalty, Technical Know-How Fees, Franchise Fees"
        ]
      },
      {
        title: "Licenses & Government Registrations",
        items: [
          "Chamber of Commerce Membership Certificate - New/Renewal/Amendment",
          "Trade License - New/Renewal/Amendment",
          "Factory and Other Government Licenses",
          "Import Registration Certificate (IRC) & Export Registration Certificate (ERC)",
          "Share Certificate Preparation & Share Register Update",
          "Embassy Attestation & Foreign Exchange Advisory",
          "Trademark & Copyright Services",
          "Ministry of Commerce Registration & Amendment"
        ]
      }
    ]
  }
];

const portfolio = [
  {
    year: "2026",
    title: "Expanding Horizons & AI Automation",
    badge: "Current Focus",
    items: [
      "SOP Development Services across corporate entities",
      "FDI Return Filing & Bangladesh Bank regulatory clearances",
      "Comprehensive Tax Return Filing for corporate & 250+ individuals",
      "External Audit Report coordination & assurance",
      "Management Consulting & Growing Business Services",
      "BIDA Consultancy Services for foreign investors",
      "Appellate Tribunal representation & ADR settlements",
      "Accounting & Payroll Services with QuickBooks automation",
      "AI-enabled process automation & intelligent financial dashboards"
    ]
  },
  {
    year: "2025",
    title: "Foundation & Integrated Practice Expansion",
    badge: "Milestone Year",
    items: [
      "Formal establishment of Tax Assistance (TA), RHA Advisory & Co.",
      "FDI return filing & corporate governance advisory",
      "Preparation and analysis of complex financial statements",
      "Internal, Social, and Compliance Audits across manufacturing & development sectors",
      "Resolution of critical accounting backlogs & QuickBooks setups",
      "Corporate tax planning, assessment defenses, and dispute resolution"
    ]
  },
  {
    year: "2024",
    title: "Specialized Audit & Corporate Advisory",
    badge: "Established Excellence",
    items: [
      "Preparation of multi-sector financial forecasting & statement analyses",
      "Legal advisory on regulatory compliance and RJSC matters",
      "Design and roll-out of standard accounting systems",
      "Management & Operational Audits for international non-profits",
      "Tax return filings and advance corporate tax optimizations"
    ]
  },
  {
    year: "2023",
    title: "Strategic Advisory & Financial Systems",
    badge: "Core Delivery",
    items: [
      "Tax assessment and advisory services for corporate and high-net-worth individuals",
      "Review engagements & independent financial evaluations",
      "Corporate training seminars on direct tax & VAT compliance",
      "Accounting advisory and QuickBooks automation implementation"
    ]
  }
];

const clients = [
  {
    id: "city-bank",
    name: "City Bank PLC",
    category: "Banking, Finance, Insurance & Securities",
    priority: "1st",
    logo: "/clients/1st/City-Bank-Logo-Eng.png"
  },
  {
    id: "brac-bank",
    name: "BRAC Bank PLC",
    category: "Banking, Finance, Insurance & Securities",
    priority: "1st",
    logo: "/clients/1st/brac_bank.jpg"
  },
  {
    id: "ific-bank",
    name: "IFIC Bank PLC",
    category: "Banking, Finance, Insurance & Securities",
    priority: "2nd",
    logo: "/clients/2nd/IFIC-New-Logo-with-I-space-copy-2f0e6991ffeee3633b0e6836700d729c.jpg"
  },
  {
    id: "eastern-bank",
    name: "Eastern Bank PLC",
    category: "Banking, Finance, Insurance & Securities",
    priority: "text-only"
  },
  {
    id: "hsbc",
    name: "HSBC",
    category: "Banking, Finance, Insurance & Securities",
    priority: "text-only"
  },
  {
    id: "idlc",
    name: "IDLC Finance Limited",
    category: "Banking, Finance, Insurance & Securities",
    priority: "text-only"
  },
  {
    id: "purbani",
    name: "Purbani Group of Companies",
    category: "Textile & Garments",
    priority: "1st",
    logo: "/clients/1st/PURBANI.jpeg"
  },
  {
    id: "karim-textile",
    name: "Karim Textile Mills Ltd.",
    category: "Textile & Garments",
    priority: "text-only"
  },
  {
    id: "somru",
    name: "Somru Bio Science Inc.",
    category: "Services",
    priority: "1st",
    logo: "/clients/1st/Somru Bio sciencce.png"
  },
  {
    id: "novus",
    name: "Novus Clinical Research Services Limited",
    category: "Services",
    priority: "1st",
    logo: "/clients/1st/Novus Clinical Research Services Limited.png"
  },
  {
    id: "bsl",
    name: "BRAC Services Ltd. (BSL)",
    category: "Services",
    priority: "1st",
    logo: "/clients/1st/BSL.png"
  },
  {
    id: "wyzr",
    name: "WYZR Limited",
    category: "Services",
    priority: "1st",
    logo: "/clients/1st/WYZR.jpg"
  },
  {
    id: "giz",
    name: "Deutsche Gesellschaft für Internationale Zusammenarbeit (GIZ)",
    category: "NGO / Not-for-Profit",
    priority: "1st",
    logo: "/clients/1st/giz.webp"
  },
  {
    id: "hemas",
    name: "Hemas Consumer Brands Private Limited",
    category: "Consumer Products",
    priority: "2nd",
    logo: "/clients/2nd/hemas.png"
  },
  {
    id: "intisaar",
    name: "Intisaar",
    category: "Consumer Products",
    priority: "2nd",
    logo: "/clients/2nd/Intisaar.jpg"
  },
  {
    id: "mevan",
    name: "MEVAN",
    category: "Consumer Products",
    priority: "2nd",
    logo: "/clients/2nd/Mevan.jpg"
  },
  {
    id: "el-capitano",
    name: "EL Capitano BD Limited",
    category: "Consumer Products",
    priority: "text-only"
  },
  {
    id: "lil-shop",
    name: "LIL Shop",
    category: "Consumer Products",
    priority: "text-only"
  },
  {
    id: "sar-clothing",
    name: "SAR International Clothing",
    category: "Consumer Products",
    priority: "text-only"
  },
  {
    id: "world-vision",
    name: "World Vision Bangladesh",
    category: "Development & Social Organizations",
    priority: "2nd",
    logo: "/clients/2nd/World vision.jpg"
  },
  {
    id: "esdo",
    name: "Eco-Social Development Organizations (ESDO)",
    category: "Development & Social Organizations",
    priority: "2nd",
    logo: "/clients/2nd/ESDO.png"
  },
  {
    id: "dca",
    name: "DanChurchAid (DCA)",
    category: "Development & Social Organizations",
    priority: "2nd",
    logo: "/clients/2nd/DCA_logo1.png"
  },
  {
    id: "oxfam",
    name: "Oxfam-GB",
    category: "Development & Social Organizations",
    priority: "text-only"
  },
  {
    id: "bgs",
    name: "Bangla German Sampreeti (BGS)",
    category: "Development & Social Organizations",
    priority: "text-only"
  },
  {
    id: "bff",
    name: "Bangladesh Fellowship Foundation (BFF)",
    category: "NGO / Not-for-Profit",
    priority: "2nd",
    logo: "/clients/2nd/BFF.jpg"
  },
  {
    id: "koinonia",
    name: "Koinonia Bangladesh",
    category: "NGO / Not-for-Profit",
    priority: "2nd",
    logo: "/clients/2nd/Koinonia Bangladesh.jpeg"
  },
  {
    id: "prokritee",
    name: "Prokritee Ltd.",
    category: "Services",
    priority: "2nd",
    logo: "/clients/2nd/Prokritee.jpg"
  },
  {
    id: "brac",
    name: "BRAC",
    category: "NGO / Not-for-Profit",
    priority: "text-only"
  },
  {
    id: "pksf",
    name: "Palli Karma-Sahayak Foundation (PKSF)",
    category: "NGO / Not-for-Profit",
    priority: "text-only"
  },
  {
    id: "muslim-aid",
    name: "Muslim Aid",
    category: "NGO / Not-for-Profit",
    priority: "text-only"
  },
  {
    id: "bils",
    name: "Bangladesh Institute of Labour Studies (BILS)",
    category: "NGO / Not-for-Profit",
    priority: "text-only"
  },
  {
    id: "stormy",
    name: "Stormy Foundation",
    category: "NGO / Not-for-Profit",
    priority: "text-only"
  },
  {
    id: "incepta",
    name: "Incepta Pharmaceuticals Limited",
    category: "Pharmaceuticals",
    priority: "text-only"
  },
  {
    id: "sheba",
    name: "Sheba Platform Limited",
    category: "IT & Telecommunications",
    priority: "text-only"
  },
  {
    id: "three-sixty-adv",
    name: "360 Degree Advertising Ltd.",
    category: "IT & Telecommunications",
    priority: "text-only"
  },
  {
    id: "barisal-power",
    name: "Barisal Electric Power Company Limited",
    category: "Energy, Power & Infrastructure",
    priority: "text-only"
  },
  {
    id: "bbs-cables",
    name: "BBS Cables Ltd.",
    category: "Energy, Power & Infrastructure",
    priority: "text-only"
  },
  {
    id: "bns-group",
    name: "BNS Group of Companies",
    category: "Energy, Power & Infrastructure",
    priority: "text-only"
  },
  {
    id: "four-points",
    name: "Four Points by Sheraton (Doreen Hotel & Resort)",
    category: "Hospitality",
    priority: "text-only"
  },
  {
    id: "individuals",
    name: "250+ High Net-Worth Individuals & Executives",
    category: "Individuals",
    priority: "featured"
  }
];

const team = [
  {
    id: "mehedi-hasan",
    name: "Mehedi Hasan, CPA, ITP",
    role: "Founder & CEO",
    department: "Executive Leadership",
    bio: "Visionary professional accountant and tax practitioner with extensive expertise in corporate direct taxation, assurance, IFRS compliance, and strategic financial advisory across multinational and domestic corporate entities in Bangladesh. Member of the Dhaka Taxes Bar Association.",
    photo: "/team/Photo-MH.jpg",
    credentials: ["Certified Public Accountant (CPA)", "Income Tax Practitioner (ITP)", "Member, Dhaka Taxes Bar Association"]
  },
  {
    id: "rahatul-jannat-anni",
    name: "Rahatul Jannat Anni",
    role: "Secretary",
    department: "Corporate Secretarial & Administration",
    bio: "Manages corporate secretarial affairs, client communications, governance coordination, and administrative operations with diligence, meticulous organization, and dedication to professional standards.",
    photo: "/team/Photo-RJA.jpg",
    credentials: ["Corporate Secretarial Specialist", "Client Relations Executive"]
  }
];

const libraryResources = [
  {
    id: "res-1",
    title: "Bangladesh Finance Act 2025-2026: Key Corporate & Personal Tax Amendments",
    category: "Tax Updates",
    year: "2026",
    format: "PDF Document",
    size: "1.4 MB",
    description: "In-depth analysis of tax slabs, withholding tax rate revisions, Section 177 compliance obligations, and digital filing requirements for corporations and individuals.",
    downloadUrl: "#",
    publishedDate: "2026-07-15"
  },
  {
    id: "res-2",
    title: "VAT & Supplementary Duty Act: Monthly Compliance & Challan Deposition Checklist",
    category: "VAT Updates",
    year: "2026",
    format: "Checklist / Guide",
    size: "850 KB",
    description: "Practical step-by-step guidance on Input-Output coefficient filing (Mushak 4.3), monthly returns (Mushak 9.1), and VDS deductions.",
    downloadUrl: "#",
    publishedDate: "2026-05-10"
  },
  {
    id: "res-3",
    title: "RJSC Annual Filing & Statutory Compliance Framework for Private Limited Companies",
    category: "Regulatory Updates",
    year: "2025",
    format: "Whitepaper",
    size: "2.1 MB",
    description: "Comprehensive handbook for company secretaries and CFOs covering AGM documentation, share transfers, director changes, and BIDA permissions.",
    downloadUrl: "#",
    publishedDate: "2025-11-20"
  },
  {
    id: "res-4",
    title: "Standard Operating Procedures (SOP) Blueprint for Finance & Procurement",
    category: "Templates & Resources",
    year: "2025",
    format: "DOCX Template",
    size: "3.2 MB",
    description: "Customizable corporate policy framework covering inventory controls, invoice approval matrices, and vendor selection compliance.",
    downloadUrl: "#",
    publishedDate: "2025-09-05"
  },
  {
    id: "res-5",
    title: "Transfer Pricing Documentation Guide for Multinational Enterprises in Bangladesh",
    category: "Articles & Insights",
    year: "2025",
    format: "Guide",
    size: "1.8 MB",
    description: "Key considerations for formulating TP study reports, Statement of International Transactions, and dealing with tax authority transfer pricing audits.",
    downloadUrl: "#",
    publishedDate: "2025-08-12"
  },
  {
    id: "res-6",
    title: "Expatriate Income Tax & BIDA Work Permit Compliance Manual",
    category: "Guides & Checklists",
    year: "2025",
    format: "PDF Document",
    size: "1.1 MB",
    description: "Essential roadmap for hiring foreign nationals, processing E-Visas, work permit amendments, and filing individual tax clearance certificates.",
    downloadUrl: "#",
    publishedDate: "2025-04-18"
  }
];

const vacancies = [
  {
    id: "vac-1",
    position: "Senior Tax Consultant - Corporate Direct Tax",
    department: "Taxation",
    location: "Dhaka (Ventura Iconia, Road 11)",
    employmentType: "Full-time",
    experience: "3-5 years of direct tax and assessment experience",
    responsibilities: [
      "Prepare and review corporate tax returns and advance income tax calculations",
      "Represent corporate clients before DCT and Appellate authorities",
      "Draft transfer pricing documentation and technical opinions",
      "Coordinate with NBR regarding tax exemptions and SRO clarifications"
    ],
    qualifications: [
      "CA (Part qualified / Inter) or CMA or LLB with ITP certification",
      "Strong knowledge of Income Tax Act 2023 and relevant SROs",
      "Proficient communication and analytical skills"
    ],
    deadline: "2026-10-15"
  },
  {
    id: "vac-2",
    position: "Audit Associate / Executive - Audit & Assurance",
    department: "Audit & Assurance",
    location: "Dhaka (Ventura Iconia, Road 11)",
    employmentType: "Full-time",
    experience: "1-3 years in audit firm / accounting firm",
    responsibilities: [
      "Perform internal control evaluations and financial statement reviews",
      "Participate in donor/NGO audits, PF/GF audits, and fixed asset verifications",
      "Prepare working papers and draft audit observations",
      "Assist engagement partners with IFRS compliance checks"
    ],
    qualifications: [
      "BBA / Master's in Accounting or Finance",
      "CA Articleship completed or partly completed preferred",
      "Solid understanding of IFRS and Bangladesh Auditing Standards"
    ],
    deadline: "2026-10-30"
  },
  {
    id: "vac-3",
    position: "Corporate Secretarial & RJSC Executive",
    department: "Business Support Services",
    location: "Dhaka (Ventura Iconia, Road 11)",
    employmentType: "Full-time",
    experience: "2+ years in RJSC & BIDA filings",
    responsibilities: [
      "Handle new company incorporation, name clearance, and share capital changes",
      "Process BIDA work permits, branch office renewals, and inward/outward remittance approvals",
      "Liaise with Registrar of Joint Stock Companies and other statutory authorities"
    ],
    qualifications: [
      "Bachelor's degree in Law, Business, or related discipline",
      "Demonstrated track record of RJSC portal operations and legal filings"
    ],
    deadline: "2026-11-15"
  }
];

module.exports = {
  firmInfo,
  services,
  portfolio,
  clients,
  team,
  libraryResources,
  vacancies
};
