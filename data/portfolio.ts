/**
 * ============================================================================
 *  ALL OF THE WEBSITE'S CONTENT LIVES IN THIS ONE FILE.
 * ============================================================================
 *
 * You do NOT need to touch any other file to update your site. Every
 * component (Hero, About, Skills, Experience, Projects, Education, Contact)
 * reads its text from the `portfolio` object exported below.
 *
 * HOW TO EDIT (beginner-friendly guide):
 *
 * 1. To change your name, role, location, tagline, or links:
 *    edit the plain fields near the top of the object.
 *
 * 2. To add a new job to the Experience timeline:
 *    copy one of the objects inside the `experience` array (the part
 *    between `{` and `}`), paste it as a new entry, and change the text.
 *    The newest job should stay first in the list.
 *
 * 3. To add a new project card:
 *    copy one of the objects inside the `projects` array and change the
 *    text. `tags` is the list of small pill labels shown on the card.
 *    `links` is optional — leave a link out entirely if you don't have one.
 *
 * 4. To add a school to Education:
 *    copy one of the objects inside the `education` array.
 *
 * 5. To reorder anything: just reorder the objects inside the array.
 *    Arrays render top to bottom, exactly in the order you write them.
 *
 * That's it. Save the file and the site updates automatically in dev mode
 * (or on your next deploy).
 * ============================================================================
 */

export type ExperienceItem = {
  role: string;
  company: string;
  location: string;
  dates: string;
  /** Optional line under the title, e.g. an advisor or team name */
  subtitle?: string;
  bullets: string[];
};

export type ProjectItem = {
  title: string;
  description: string[];
  tags: string[];
  links?: {
    label: string;
    url: string;
  }[];
};

export type EducationItem = {
  school: string;
  degree: string;
  location: string;
  dates: string;
  detail?: string;
};

export type SkillGroup = {
  category: string;
  items: string[];
};

export const portfolio = {
  // ---- Identity ------------------------------------------------------------
  name: "Vraj Shaileshbhai Patel",
  firstName: "Vraj",
  role: "Software & Machine Learning Engineer",
  location: "Jersey City, NJ",
  status:
    "Driven by curiosity and a love for building. Always looking to learn something new and take on the next challenge.",
  tagline: "Building reliable software and data-driven solutions, end to end.",

  // ---- Photo -----------------------------------------------------------
  // Lives at /public/photo.jpg — replace that file to change the picture.
  photo: "/photo.jpg",

  // ---- Resume file -------------------------------------------------------
  // Lives at /public/resume.pdf — replace that file to change the download.
  resumeFile: "/resume.pdf",

  // ---- Links ---------------------------------------------------------------
  links: {
    github: "https://github.com/Vraj2712",
    linkedin: "https://www.linkedin.com/in/vraj-s-patel-89329622a/",
    email: "pvraj0019@gmail.com",
    phone: "+1 (605) 212-0452",
  },

  // ---- About -----------------------------------------------------------
  // Each string in this array becomes one paragraph in the About section.
  about: [
    "I'm a Computer Science M.S. candidate (graduating May 2026) who enjoys building and shipping software across the full lifecycle — from working with data and designing solutions to deploying them in the cloud. I like turning messy problems into clean, reliable systems.",
    "I work primarily in Python and SQL and care about reproducible, version-controlled workflows and writing code that holds up. I'm comfortable picking up new tools quickly and translating technical work for both technical and non-technical audiences.",
  ],

  // ---- Skills ----------------------------------------------------------
  skills: [
    {
      category: "Machine Learning",
      items: [
        "scikit-learn",
        "XGBoost",
        "Random Forest",
        "Logistic Regression",
        "Cross-Validation",
        "Hyperparameter Tuning",
        "ROC-AUC / Model Evaluation",
        "Feature Selection",
      ],
    },
    {
      category: "Data Analysis",
      items: ["Python (Pandas, NumPy)", "EDA", "Statistical Analysis", "Matplotlib"],
    },
    {
      category: "Healthcare Data",
      items: [
        "Clinical Dataset Analysis",
        "Confidential Health-Data Handling",
        "Medical-Imaging Research",
      ],
    },
    {
      category: "Programming Languages",
      items: ["JavaScript", "C", "C++", "Java", "Python"],
    },
    {
      category: "Web & Frameworks",
      items: ["React", "HTML", "CSS", "Tailwind CSS", "FastAPI", "Node.js"],
    },
    {
      category: "SQL & Databases",
      items: ["SQL", "PL/SQL", "MySQL", "PostgreSQL", "MongoDB"],
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "Docker", "VS Code", "Jupyter", "Linux CLI", "Excel"],
    },
    {
      category: "Spoken Languages",
      items: ["English", "Hindi", "Gujarati"],
    },
  ] satisfies SkillGroup[],

  // ---- Experience (newest first) ----------------------------------------
  experience: [
    {
      role: "Graduate Researcher",
      company: "New Jersey Institute of Technology",
      subtitle: "Clinical Data Analysis, PLCO Cancer-Screening Trial. Advisor: Prof. Arashdeep Kaur",
      location: "Newark, NJ",
      dates: "Sep 2025 - Present",
      bullets: [
        "Analyze the PLCO cancer-screening dataset in Python (Pandas), running EDA and statistical testing to rank candidate predictors for downstream risk modeling.",
        "Process confidential patient health and medical-imaging data under strict privacy and governance standards, keeping records secure and analysis-ready.",
        "Build preprocessing and feature-engineering pipelines, cutting redundant variables by 30% through data-driven feature selection.",
        "Evaluate models with AUC, F1, and Brier score, and share findings through a standardized, reproducible workflow for both technical and non-technical stakeholders.",
      ],
    },
    {
      role: "Web Systems Design & Development Intern",
      company: "Mind Inventory",
      location: "Ahmedabad, India",
      dates: "Jan 2023 - Apr 2023",
      bullets: [
        "Built and maintained scalable, database-driven web systems using PHP, MySQL (XAMPP), and front-end frameworks.",
        "Worked in an agile team on relational databases and responsive UI across 3+ platforms, improving page-load speed by roughly 30%.",
        "Contributed to QA testing and bug-fix cycles, strengthening code reliability.",
      ],
    },
    {
      role: "Web Developer Intern",
      company: "EliteEvince Technologies",
      subtitle: "PHP & MySQL",
      location: "Ahmedabad, India",
      dates: "Jun 2022 - Jul 2022",
      bullets: [
        "Translated client requirements into deliverables under tight timelines.",
        "Resolved UI and documentation issues across 2 internal projects, improving maintainability and usability.",
      ],
    },
  ] satisfies ExperienceItem[],

  // ---- Projects ----------------------------------------------------------
  projects: [
    {
      title: "GraphRAG — Multi-Cancer Prediction Research",
      description: [
        "Knowledge-graph question-answering system over sixteen peer-reviewed cancer-prediction research papers: built a GraphRAG pipeline that combines vector search with Neo4j graph traversal, so answers are grounded in explicit graph facts rather than opaque text similarity.",
        "Designed the ingestion pipeline with LangChain's LLMGraphTransformer (Claude Haiku) to extract entities and relationships from paper chunks into a Neo4j knowledge graph, linking each entity back to its source chunk for traceability.",
        "Combined Gemini embeddings with a Neo4j vector index for chunk retrieval, then traversed one hop out from retrieved chunks' entities to pull in connected relationships, letting Claude answer multi-hop questions plain RAG can't (e.g. connecting a dataset to a model never mentioned in the same sentence).",
        "Shipped a full-stack app end to end: FastAPI backend, React/TypeScript/Tailwind frontend with explainable Entity → RELATIONSHIP → Entity fact display, deployed across Vercel, Render, and Neo4j Aura with environment-driven CORS and build-time API wiring.",
        "Solved a real production constraint by switching from a local HuggingFace embedding model to the Gemini embeddings API after memory limits crashed the deploy target, building a `--reembed` mode to re-embed the full corpus at a new vector dimension without re-running costly LLM extraction.",
      ],
      tags: ["Python", "TypeScript", "React", "FastAPI", "Neo4j", "LangChain", "Claude", "Gemini", "Vercel", "Render"],
      links: [
        { label: "GitHub", url: "https://github.com/Vraj2712/graphrag-neo4j" },
        { label: "Live Demo", url: "https://graphrag-neo4j.vercel.app" },
      ],
    },
    {
      title: "Lung Cancer Risk Prediction",
      description: [
        "Data efficiency and stability analysis: designed a super-stacking ensemble of six base learners (Logistic Regression, Random Forest, Gradient Boosting, XGBoost, LightGBM, CatBoost) with a logistic-regression meta-learner to predict lung cancer risk from 15 clinically interpretable variables in the PLCO trial.",
        "Ran a data-efficiency study across training fractions from 100% down to 10%, evaluated against a fixed, stratified 20% test set with 5 random seeds per fraction, reporting mean and standard deviation for reproducibility.",
        "Held AUC-ROC near 0.836 with only a ~0.005 drop at 10% training data, keeping recall around 0.88.",
        "Mitigated severe class imbalance via class_weight / scale_pos_weight and tuned the decision threshold on validation only, keeping the operating point stable near 0.30 without test-set leakage.",
      ],
      tags: ["Python", "scikit-learn", "XGBoost", "LightGBM", "CatBoost", "pandas", "Matplotlib"],
      links: [
        {
          label: "GitHub",
          url: "https://github.com/Vraj2712/data-efficient-lung-cancer-prediction",
        },
      ],
    },
    {
      title: "VolGuard",
      description: [
        "End-to-end stock volatility forecasting: built an ML pipeline forecasting 5-day realized volatility for five large-cap stocks, from raw prices through SQL feature engineering, a validated model, AWS Lambda, and a live Tableau dashboard.",
        "Engineered features entirely in SQL (daily returns, 5/10/30-day rolling volatility, forward-5-day target) with strict chronological splits to prevent data leakage.",
        "Validated with walk-forward testing across 4 out-of-sample folds, benchmarking Linear Regression, Random Forest, XGBoost, and GARCH(1,1) against a naive baseline, and shipped the simplest model, cutting RMSE by roughly 20% versus baseline.",
        "Deployed to AWS with Terraform (S3 + Lambda, API-key auth), serving predictions via CLI/SDK that feed the public dashboard.",
      ],
      tags: ["Python", "scikit-learn", "XGBoost", "SQL (SQLite)", "AWS Lambda", "AWS S3", "Terraform", "Tableau"],
      links: [
        { label: "GitHub", url: "https://github.com/Vraj2712/VolGuard" },
        {
          label: "Live Dashboard",
          url: "https://public.tableau.com/app/profile/vraj.patel6320/viz/VolGuard-StockVolatilityForecasting/Dashboard1",
        },
      ],
    },
    {
      title: "Mini Amazon",
      description: [
        "Full-stack e-commerce app: built a scalable platform for 100+ users with product search, cart, and order tracking.",
        "Developed an admin dashboard supervising 500+ products with real-time order updates.",
      ],
      tags: ["React", "Tailwind CSS", "FastAPI", "MongoDB", "JWT", "WebSockets"],
      // TODO: add a public repo or live link for Mini Amazon if you have one.
    },
  ] satisfies ProjectItem[],

  // ---- Education (newest first) ------------------------------------------
  education: [
    {
      school: "New Jersey Institute of Technology",
      degree: "M.S. in Computer Science",
      location: "Newark, NJ",
      dates: "Sep 2024 - May 2026",
      detail: "GPA: 3.80 / 4.0",
    },
    {
      school: "Gujarat Technological University (SAL Institute)",
      degree: "B.E. in Computer Engineering",
      location: "Ahmedabad, India",
      dates: "Sep 2019 - May 2023",
      detail: "GPA: 8.13 / 10",
    },
  ] satisfies EducationItem[],

  // ---- Navbar sections (order controls the nav links) --------------------
  nav: [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Education", href: "#education" },
    { label: "Contact", href: "#contact" },
  ],
};

export type Portfolio = typeof portfolio;
