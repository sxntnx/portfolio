// All site copy lives here. Edit text without touching components.
// `en` is the default language; `es` must keep the exact same shape (enforced by the Content type).

export type Lang = 'en' | 'es'

export type NavId = 'about' | 'projects' | 'skills' | 'experience' | 'contact'

export type ThumbKind = 'pipeline' | 'rag' | 'bars' | 'trend'

export interface Project {
  thumb: ThumbKind
  category: string
  title: string
  description: string
  bullets: string[]
  stack: string[]
  /** GitHub repo URL. 'TODO' = repo not published yet; the card hides the links. */
  code: string
  /** README / case study URL. 'TODO' = not published yet. */
  caseUrl: string
}

export interface Stat {
  value: number
  decimals: number
  prefix?: string
  suffix: string
  label: string
}

export interface Job {
  role: string
  org: string
  period: string
  bullets: string[]
  stack?: string
  education?: boolean
}

export interface Content {
  meta: { switchTo: string; switchLabel: string; menuOpen: string; menuClose: string }
  nav: Record<NavId, string>
  hero: {
    badge: string
    name: string
    role: string
    tagline: string
    ctaProjects: string
    ctaContact: string
    cv: string
    location: string
    pipelineTitle: string
    pipeline: { title: string; detail: string }[]
  }
  about: {
    number: string
    title: string
    body: string
    facts: { label: string; value: string }[]
    stats: Stat[]
  }
  projects: {
    number: string
    title: string
    intro: string
    viewCode: string
    readCase: string
    comingSoon: string
    seeAll: string
    items: Project[]
  }
  skills: {
    number: string
    title: string
    groups: { label: string; items: string[]; learning?: boolean }[]
  }
  experience: { number: string; title: string; present: string; items: Job[] }
  contact: {
    number: string
    title: string
    body: string
    linkedin: string
    cv: string
    github: string
    copyEmail: string
    copied: string
    copyFailed: string
  }
  footer: { built: string; top: string }
}

export const links = {
  linkedin: 'https://www.linkedin.com/in/santino-spelzini-b605662a5',
  github: 'https://github.com/sxntnx',
  cv: { en: 'CV_Santino_Spelzini_EN.pdf', es: 'CV_Santino_Spelzini_ES.pdf' } satisfies Record<Lang, string>,
  // Split so the address never appears as plain text in the page or source.
  emailParts: ['santinospelzin', 'gmail.com'] as const,
}

const repos = {
  etl: 'https://github.com/sxntnx/supply-chain-etl-pipeline',
  rag: 'https://github.com/sxntnx/mini-rag',
  eda: 'https://github.com/sxntnx/finance-eda-project',
  // TODO: the Power BI inventory repo does not exist on github.com/sxntnx yet.
  inventory: 'TODO',
}

const readme = (url: string) => (url === 'TODO' ? 'TODO' : `${url}#readme`)

const en: Content = {
  meta: { switchTo: 'ES', switchLabel: 'Ver en español', menuOpen: 'Open menu', menuClose: 'Close menu' },
  nav: { about: 'About', projects: 'Projects', skills: 'Skills', experience: 'Experience', contact: 'Contact' },
  hero: {
    badge: 'Open to remote junior roles',
    name: 'Santino Spelzini',
    role: 'Data Analyst · Aspiring Data Engineer',
    tagline:
      "I take data from raw source to decision — SQL, Python ETL pipelines and KPI dashboards, with an industrial engineer's business mindset.",
    ctaProjects: 'View projects',
    ctaContact: 'Contact me',
    cv: 'Download CV',
    location: 'Tucumán, Argentina · GMT-3 · Remote · English B2',
    pipelineTitle: 'From raw data to decision',
    pipeline: [
      { title: 'Extract & Model', detail: 'SQL · Python · Star schema' },
      { title: 'Transform & Validate', detail: 'ETL · Data quality · Reconciliation' },
      { title: 'Decide', detail: 'Power BI · KPIs · Financial models' },
    ],
  },
  about: {
    number: '01',
    title: 'About',
    body:
      "Industrial Engineering graduate (UNSTA, 2026) repositioned into data. I build ETL pipelines with built-in quality controls, model data into star schemas and turn it into KPI dashboards teams actually use. As a consulting partner at ACTION and owner of a small services business, I work with P&Ls, cash flows, NPV/IRR and CAPEX — so I read data with a business lens, not just a technical one. I use AI tools (Claude, ChatGPT) to speed up development and always verify the output.",
    facts: [
      { label: 'Location', value: 'Yerba Buena, Tucumán, Argentina (GMT-3)' },
      { label: 'Education', value: 'Industrial Engineer · UNSTA · 2020–2026' },
      { label: 'Languages', value: 'Spanish (native) · English B2 (certified)' },
      { label: 'Work mode', value: 'Remote · LATAM-friendly time zones' },
    ],
    stats: [
      { value: 180, decimals: 0, suffix: 'K+', label: 'rows processed in ETL pipeline' },
      { value: 0.93, decimals: 2, suffix: '', label: 'recall@1 on RAG retrieval' },
      { value: 2000, decimals: 0, suffix: ' m²', label: 'medical center project structured (ACTION)' },
    ],
  },
  projects: {
    number: '02',
    title: 'Projects',
    intro: 'Selected work — from pipelines and retrieval to dashboards and analysis.',
    viewCode: 'View code',
    readCase: 'Read case',
    comingSoon: 'Repository coming soon',
    seeAll: 'See all on GitHub',
    items: [
      {
        thumb: 'pipeline',
        category: 'ETL / Data Engineering',
        title: 'Supply Chain ETL Pipeline',
        description:
          'End-to-end pipeline: 180K+ raw rows → star schema (1 fact + 2 dimensions) in SQLite, modular extract/transform/load with logging.',
        bullets: [
          'Data quality at load: PII removal, deduplication, type validation, source-vs-destination row reconciliation.',
          'Indexed SQL for on-time delivery rate and margin by region.',
        ],
        stack: ['Python', 'Pandas', 'SQL', 'SQLite', 'Git'],
        code: repos.etl,
        caseUrl: readme(repos.etl),
      },
      {
        thumb: 'rag',
        category: 'AI / Retrieval',
        title: 'mini-RAG: Semantic Search with Cited Answers',
        description:
          'Ingestion, overlap chunking, embeddings, SQLite vector store, cosine retrieval and a FastAPI endpoint that answers with sources or abstains.',
        bullets: [
          'Measured on a 15-question golden set: recall@1 0.933 · recall@3 1.000 · MRR 0.967 · 5/5 tests passing.',
          'Abstains on 100% of out-of-domain queries (threshold 0.80) without losing valid answers.',
        ],
        stack: ['Python', 'FastAPI', 'Embeddings', 'SQLite', 'pytest'],
        code: repos.rag,
        caseUrl: readme(repos.rag),
      },
      {
        thumb: 'bars',
        category: 'Power BI / Supply Chain',
        title: 'Inventory & Service-Level Analytics',
        description:
          'Power BI dashboard over 2,000 purchase orders (FY2025, synthetic data): Fill Rate 96.1%, OTIF 76.1%, Stockout 11.6%, Avg Lead Time 7.8 days.',
        bullets: [
          '2 suppliers concentrate stockouts (20% / 17%) and the longest lead times.',
          'Reallocating volume to faster suppliers cuts stockouts without raising cost.',
        ],
        stack: ['Power BI', 'DAX', 'Python', 'Pandas'],
        code: repos.inventory,
        caseUrl: readme(repos.inventory),
      },
      {
        thumb: 'trend',
        category: 'EDA / Finance',
        title: 'Financial Performance EDA',
        description: 'B2B sales & financial performance 2022–2024 across 4 regions and 4 product lines.',
        bullets: ['~12% YoY revenue growth.', 'Software EBITDA margin near 50% and a 15% Q4 seasonality uplift.'],
        stack: ['Python', 'Pandas', 'Matplotlib', 'Seaborn'],
        code: repos.eda,
        caseUrl: readme(repos.eda),
      },
    ],
  },
  skills: {
    number: '03',
    title: 'Skills',
    groups: [
      {
        label: 'Data & Languages',
        items: ['SQL', 'Python', 'Pandas', 'NumPy', 'SQLite', 'Git/GitHub', 'Star schema modeling'],
      },
      {
        label: 'Data Engineering',
        items: ['ETL', 'Batch ingestion', 'Deduplication', 'Type validation', 'Reconciliation', 'Logging'],
      },
      {
        label: 'Analytics & BI',
        items: ['Power BI', 'Looker Studio', 'Advanced Excel', 'Google Sheets', 'Jupyter', 'Matplotlib', 'Seaborn'],
      },
      { label: 'AI', items: ['LLM-assisted SQL/Python dev (Claude, ChatGPT)', 'RAG', 'Structured prompting'] },
      {
        label: 'Business',
        items: ['Financial modeling', 'NPV/IRR', 'CAPEX', 'Cash flow', 'P&L', 'KPI design', 'Process optimization'],
      },
      { label: 'Currently learning', items: ['Docker', 'Linux', 'AWS', 'BigQuery', 'dbt'], learning: true },
    ],
  },
  experience: {
    number: '04',
    title: 'Experience',
    present: 'Present',
    items: [
      {
        role: 'Partner & Project Structuring Consultant',
        org: 'ACTION Consultoría y Gestión',
        period: 'Dec 2025 – Present',
        bullets: [
          'Structured a 2,000 m² medical center end-to-end, from care concept to a bank-ready investment file.',
          'Built phased CAPEX structures and financial models (cash flow, NPV, IRR, break-even).',
          'Market/demand research, operating & business model, phased roadmap with risk map; executive deliverables for investors and banks.',
        ],
        stack: 'Excel · Google Sheets · Power BI',
      },
      {
        role: 'Founder & Operations Lead',
        org: 'Environmental Services Business',
        period: '2022 – Present',
        bullets: [
          'Run the business with its own P&L; track sales, cost and margin metrics to plan operations and coordinate field team and suppliers.',
        ],
      },
      {
        role: 'External Sales & Logistics Analytics Consultant',
        org: 'Silva SRL',
        period: '2024',
        bullets: [
          'Analyzed sales data to reorganize logistics for 3 sales reps across the province; redesigned coverage to improve acquisition/retention and cut travel costs.',
        ],
        stack: 'Excel · Power BI',
      },
      {
        role: 'Industrial Engineer',
        org: 'UNSTA',
        period: '2020 – 2026 · Graduated',
        bullets: [],
        education: true,
      },
    ],
  },
  contact: {
    number: '05',
    title: "Let's talk data.",
    body: 'Open to remote junior Data Analyst / Data Engineer roles. Fastest way to reach me is LinkedIn.',
    linkedin: 'Message me on LinkedIn',
    cv: 'Download CV',
    github: 'GitHub',
    copyEmail: 'Copy email',
    copied: 'Copied!',
    copyFailed: "Couldn't copy — try LinkedIn",
  },
  footer: { built: 'Built with React & Framer Motion', top: 'Back to top' },
}

const es: Content = {
  meta: { switchTo: 'EN', switchLabel: 'View in English', menuOpen: 'Abrir menú', menuClose: 'Cerrar menú' },
  nav: { about: 'Sobre mí', projects: 'Proyectos', skills: 'Skills', experience: 'Experiencia', contact: 'Contacto' },
  hero: {
    badge: 'Disponible para roles junior remotos',
    name: 'Santino Spelzini',
    role: 'Data Analyst · Aspiring Data Engineer',
    tagline:
      'Llevo el dato desde la fuente hasta la decisión — SQL, pipelines ETL en Python y tableros de KPIs, con la mirada de negocio de un ingeniero industrial.',
    ctaProjects: 'Ver proyectos',
    ctaContact: 'Contactame',
    cv: 'Descargar CV',
    location: 'Tucumán, Argentina · GMT-3 · Remoto · Inglés B2',
    pipelineTitle: 'Del dato crudo a la decisión',
    pipeline: [
      { title: 'Extraer y modelar', detail: 'SQL · Python · Esquema estrella' },
      { title: 'Transformar y validar', detail: 'ETL · Calidad de datos · Reconciliación' },
      { title: 'Decidir', detail: 'Power BI · KPIs · Modelos financieros' },
    ],
  },
  about: {
    number: '01',
    title: 'Sobre mí',
    body:
      'Ingeniero Industrial (UNSTA, 2026) reposicionado hacia datos. Construyo pipelines ETL con controles de calidad integrados, modelo datos en esquemas estrella y los convierto en tableros de KPIs que los equipos realmente usan. Como socio consultor en ACTION y dueño de un pequeño negocio de servicios, trabajo con estados de resultados, flujos de fondos, VAN/TIR y CAPEX — así que leo los datos con mirada de negocio, no solo técnica. Uso herramientas de IA (Claude, ChatGPT) para acelerar el desarrollo y siempre verifico el resultado.',
    facts: [
      { label: 'Ubicación', value: 'Yerba Buena, Tucumán, Argentina (GMT-3)' },
      { label: 'Educación', value: 'Ingeniero Industrial · UNSTA · 2020–2026' },
      { label: 'Idiomas', value: 'Español (nativo) · Inglés B2 (certificado)' },
      { label: 'Modalidad', value: 'Remoto · Husos horarios compatibles con LATAM' },
    ],
    stats: [
      { value: 180, decimals: 0, suffix: 'K+', label: 'filas procesadas en el pipeline ETL' },
      { value: 0.93, decimals: 2, suffix: '', label: 'recall@1 en retrieval del RAG' },
      { value: 2000, decimals: 0, suffix: ' m²', label: 'proyecto de centro médico estructurado (ACTION)' },
    ],
  },
  projects: {
    number: '02',
    title: 'Proyectos',
    intro: 'Trabajo seleccionado — de pipelines y retrieval a tableros y análisis.',
    viewCode: 'Ver código',
    readCase: 'Leer caso',
    comingSoon: 'Repositorio próximamente',
    seeAll: 'Ver todo en GitHub',
    items: [
      {
        ...en.projects.items[0],
        description:
          'Pipeline de punta a punta: más de 180K filas crudas → esquema estrella (1 hechos + 2 dimensiones) en SQLite, con extract/transform/load modular y logging.',
        bullets: [
          'Calidad de datos en la carga: eliminación de datos personales, deduplicación, validación de tipos y reconciliación de filas origen-destino.',
          'SQL indexado para tasa de entregas a tiempo y margen por región.',
        ],
      },
      {
        ...en.projects.items[1],
        category: 'IA / Retrieval',
        title: 'mini-RAG: búsqueda semántica con respuestas citadas',
        description:
          'Ingesta, chunking con solape, embeddings, vector store en SQLite, retrieval por coseno y un endpoint FastAPI que responde citando fuentes o se abstiene.',
        bullets: [
          'Medido sobre un golden set de 15 preguntas: recall@1 0.933 · recall@3 1.000 · MRR 0.967 · 5/5 tests pasando.',
          'Se abstiene en el 100% de las consultas fuera de dominio (umbral 0.80) sin perder respuestas válidas.',
        ],
      },
      {
        ...en.projects.items[2],
        title: 'Analítica de inventario y nivel de servicio',
        description:
          'Tablero de Power BI sobre 2.000 órdenes de compra (FY2025, datos sintéticos): Fill Rate 96,1%, OTIF 76,1%, Quiebre de stock 11,6%, Lead time promedio 7,8 días.',
        bullets: [
          '2 proveedores concentran los quiebres de stock (20% / 17%) y los lead times más largos.',
          'Reasignar volumen a proveedores más rápidos reduce quiebres sin subir el costo.',
        ],
      },
      {
        ...en.projects.items[3],
        category: 'EDA / Finanzas',
        title: 'EDA de desempeño financiero',
        description: 'Ventas B2B y desempeño financiero 2022–2024 en 4 regiones y 4 líneas de producto.',
        bullets: [
          '~12% de crecimiento interanual de ingresos.',
          'Margen EBITDA de software cercano al 50% y estacionalidad +15% en el Q4.',
        ],
      },
    ],
  },
  skills: {
    number: '03',
    title: 'Skills',
    groups: [
      {
        label: 'Datos y lenguajes',
        items: ['SQL', 'Python', 'Pandas', 'NumPy', 'SQLite', 'Git/GitHub', 'Modelado en esquema estrella'],
      },
      {
        label: 'Ingeniería de datos',
        items: ['ETL', 'Ingesta por lotes', 'Deduplicación', 'Validación de tipos', 'Reconciliación', 'Logging'],
      },
      {
        label: 'Análisis y BI',
        items: ['Power BI', 'Looker Studio', 'Excel avanzado', 'Google Sheets', 'Jupyter', 'Matplotlib', 'Seaborn'],
      },
      { label: 'IA', items: ['Desarrollo SQL/Python asistido por LLM (Claude, ChatGPT)', 'RAG', 'Prompting estructurado'] },
      {
        label: 'Negocio',
        items: ['Modelado financiero', 'VAN/TIR', 'CAPEX', 'Flujo de fondos', 'Estado de resultados', 'Diseño de KPIs', 'Optimización de procesos'],
      },
      { label: 'Aprendiendo ahora', items: ['Docker', 'Linux', 'AWS', 'BigQuery', 'dbt'], learning: true },
    ],
  },
  experience: {
    number: '04',
    title: 'Experiencia',
    present: 'Actualidad',
    items: [
      {
        role: 'Socio y Consultor de Estructuración de Proyectos',
        org: 'ACTION Consultoría y Gestión',
        period: 'Dic 2025 – Actualidad',
        bullets: [
          'Estructuré de punta a punta un centro médico de 2.000 m², desde el concepto asistencial hasta un expediente de inversión presentable a banco.',
          'Armé estructuras de CAPEX por etapas y modelos financieros (flujo de fondos, VAN, TIR, punto de equilibrio).',
          'Investigación de mercado y demanda, modelo operativo y de negocio, hoja de ruta por etapas con mapa de riesgos; entregables ejecutivos para inversores y bancos.',
        ],
        stack: 'Excel · Google Sheets · Power BI',
      },
      {
        role: 'Fundador y Responsable de Operaciones',
        org: 'Emprendimiento de servicios ambientales',
        period: '2022 – Actualidad',
        bullets: [
          'Gestiono el negocio con estado de resultados propio; sigo métricas de ventas, costos y margen para planificar la operación y coordinar equipo de campo y proveedores.',
        ],
      },
      {
        role: 'Consultor externo de análisis comercial y logística',
        org: 'Silva SRL',
        period: '2024',
        bullets: [
          'Analicé datos de ventas para reorganizar la logística de 3 vendedores en la provincia; rediseñé la cobertura para mejorar captación/retención y reducir costos de viaje.',
        ],
        stack: 'Excel · Power BI',
      },
      {
        role: 'Ingeniero Industrial',
        org: 'UNSTA',
        period: '2020 – 2026 · Graduado',
        bullets: [],
        education: true,
      },
    ],
  },
  contact: {
    number: '05',
    title: 'Hablemos de datos.',
    body: 'Disponible para roles remotos junior de Data Analyst / Data Engineer. La forma más rápida de contactarme es LinkedIn.',
    linkedin: 'Escribime por LinkedIn',
    cv: 'Descargar CV',
    github: 'GitHub',
    copyEmail: 'Copiar email',
    copied: '¡Copiado!',
    copyFailed: 'No se pudo copiar — probá por LinkedIn',
  },
  footer: { built: 'Hecho con React y Framer Motion', top: 'Volver arriba' },
}

export const content: Record<Lang, Content> = { en, es }
