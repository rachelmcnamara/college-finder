import React, { useState, useEffect, useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  MapPin,
  Home,
  GraduationCap,
  DollarSign,
  X,
  ChevronRight,
  Info,
  BookOpen,
  Landmark,
  CheckCircle2,
  AlertTriangle,
  Star,
  TrendingUp,
  Table as TableIcon,
  LayoutGrid,
  CloudSun,
  Percent,
  ExternalLink,
  Calendar,
  Users,
  BadgePercent,
  Activity,
  Scale,
  Link2,
  Columns2,
  MessageCircle,
  Route,
  ListChecks,
  Briefcase,
} from "lucide-react";

const RATINGS_KEY = "star-ratings";
const TIMELINE_KEY = "timeline-checks";

/* ---------------------------------------------------------------
   DATA — filtered for end-of-junior-year GPAs: 3.67 unweighted / 3.79 weighted.
   Figures are rounded, approximate, based on each school's most
   recently published 2025-27 figures. Costs, acceptance rates and
   GPA bands shift year to year — always confirm current numbers
   on the school's own admissions & financial aid pages.

   Excluded from this list:
   - UC Berkeley: overall admit GPAs run well above this profile (avg
     weighted ~4.5 / unweighted ~3.9+), and Haas is an internal
     sophomore-year admit on top of that — a real reach at 3.67 UW.
   - UCLA: ~3.93 unweighted average, ~8.6% acceptance — also out.
   Cal Poly SLO stays on the list as a Central Coast reach/target
   (avg weighted ~4.12 vs 3.79 weighted here).
----------------------------------------------------------------*/

const SCHOOLS = [
  {
    id: "ucdavis",
    name: "UC Davis",
    fullName: "University of California, Davis",
    type: "UC",
    city: "Davis",
    region: "Sacramento Valley",
    costIn: 46800,
    costOut: 84400,
    acceptance: "~40-44%",
    acceptanceNum: 42,
    gpaFit: "competitive",
    gpaNote:
      "The middle 50% of admits carry a 3.79–4.00 unweighted GPA — a 3.67 UW sits just below that band, while 3.79 weighted is also modest for Davis. General campus admission is still a realistic target, not a lock. The business major itself is described by UC Davis as 'highly competitive' on top of that, with its own GPA and course requirements to declare.",
    program: {
      name: "Undergraduate Business Major (Graduate School of Management)",
      blurb:
        "UC Davis recently launched a true undergraduate Business major through its Graduate School of Management — a real upgrade from the older Managerial Economics-only path, with tracks in finance, marketing, accounting, and management. It's competitive to declare even after you're enrolled at Davis. Managerial Economics (through Agricultural & Resource Economics) remains a strong, more accessible business-adjacent alternative if the direct business major doesn't work out.",
      ranking: "New direct-entry business major, competitive to declare",
    },
    minors:
      "Both History and Political Science are long-standing, well-resourced majors and minors at a major research university — genuinely strong on their own merits, independent of whether the business major works out.",
    housing: {
      dial: 5,
      note: "Guarantees 2 years of housing. Davis is a classic, small, bike-friendly college town with limited nearby options outside the university, giving it one of the most residential feels of any UC.",
    },
    goodFor: "Real UC business major, but competitive even after enrolling",
    careerSalary: "~$55k (Managerial Econ)",
    careerNote:
      "The new undergrad business major is too recent to have its own salary data yet. Managerial Economics — the longer-running path — reports a median salary around $55,000, with strong access to Sacramento-area government and Bay Area corporate employers.",
    extras: [
      "Business major admission is competitive even after arriving on campus — ask about GPA and course requirements to declare it as a sophomore.",
      "Application deadline: Nov 30 (UC system).",
      "Best fit if your child wants a research-university UC experience with a real, if selective, path into a business degree.",
    ],
  },
  {
    id: "ucsc",
    name: "UC Santa Cruz",
    fullName: "University of California, Santa Cruz",
    type: "UC",
    city: "Santa Cruz",
    region: "Central Coast",
    costIn: 44800,
    costOut: 84600,
    acceptance: "~63-66%",
    acceptanceNum: 64,
    gpaFit: "competitive",
    gpaNote:
      "Average GPA among enrolled students is around 3.92, but the acceptance rate (63-66%) is by far the highest of any UC — a 3.67 UW is below the enrolled average, so this is a realistic target rather than a lock.",
    program: {
      name: "Business Management Economics (Economics Dept.)",
      blurb:
        "No traditional standalone business school, but Business Management Economics — run through the Economics Department — is a popular, well-regarded major with real depth in finance, marketing, and management applications. Less brand recognition than Berkeley or Davis, but by far the easiest UC on this list to get into.",
      ranking: "No dedicated business school; strong Economics dept.",
    },
    minors:
      "History is offered as a minor. UCSC's political science equivalent is called 'Politics' rather than 'Political Science,' and leans into a social-justice and critical-theory approach — worth knowing if your child wants a more traditional poli sci angle instead.",
    housing: {
      dial: 4,
      note: "Housing is guaranteed for most incoming students. The wooded, hillside campus is divided into distinct residential colleges, which gives it a strong built-in community feel even though some upperclassmen move into Santa Cruz's beach-town rental market.",
    },
    goodFor: "Easiest UC to get into, no dedicated business school",
    careerSalary: "~$52k → $79k (1yr → 5yr)",
    careerNote:
      "Business Management Economics grads report a median salary of about $52,000 one year out, climbing to roughly $79,000 by year five — well above UCSC's campus-wide median. About 75% stay in the Santa Cruz or Bay Area after graduating.",
    extras: [
      "The most accessible UC on this list by a wide margin — a genuine target rather than a reach at 3.67 UW / 3.79 weighted.",
      "Application deadline: Nov 30 (UC system).",
      "Best fit if a laid-back, nature-forward UC campus matters as much as the UC name itself.",
    ],
  },
  {
    id: "ucmerced",
    name: "UC Merced",
    fullName: "University of California, Merced",
    type: "UC",
    city: "Merced",
    region: "Central Valley",
    costIn: 40500,
    costOut: 73000,
    acceptance: "~89%",
    acceptanceNum: 89,
    gpaFit: "comfortable",
    gpaNote:
      "Average admitted GPA is around 3.6, and UC Merced is the most accessible campus in the entire UC system by acceptance rate — a 3.67 UW is a comfortable, likely admit.",
    program: {
      name: "Management & Business Economics (B.S.) / Business Administration (B.A.)",
      blurb:
        "UC Merced offers both a Management & Business Economics B.S. — a quantitative blend of economics, finance, and management theory — and a Business Administration B.A. As the newest and smallest UC (opened 2005, ~8,300 undergrads), it lacks the brand recognition of the older campuses, but it's a genuine UC degree with real business options at by far the easiest admission odds on this list.",
      ranking: "Newest, smallest UC; real business options, easiest UC admission",
    },
    minors:
      "Both History and Political Science are offered as full majors and minors — confirmed, standard offerings at a comprehensive (if young) UC campus.",
    housing: {
      dial: 4,
      note: "Housing is guaranteed for entering students on a purpose-built, self-contained campus. Merced itself is a small Central Valley city, so campus life leans residential by necessity as much as design.",
    },
    goodFor: "Easiest UC admission of all, real business degree options",
    careerSalary: "~$46k",
    careerNote:
      "Business Administration grads report a median salary of about $46,000. As the newest and smallest UC business program, outcomes data is thinner than at the older campuses, but UC Merced points graduates toward consulting, corporate, and public-sector employers.",
    extras: [
      "By far the most accessible UC on this list — a genuine safety-tier UC rather than a target or reach.",
      "Application deadline: Nov 30 (UC system).",
      "Best fit if UC prestige matters less than admission odds and cost, and your child is open to a small, newer campus.",
    ],
  },
  {
    id: "ucr",
    name: "UC Riverside",
    fullName: "University of California, Riverside",
    type: "UC",
    city: "Riverside",
    region: "Inland Empire",
    costIn: 40500,
    costOut: 79000,
    acceptance: "~87%",
    acceptanceNum: 87,
    gpaFit: "competitive",
    gpaNote:
      "Average admitted GPA is right around 3.83 — a 3.67 UW sits below that average — but the overall acceptance rate (86-89%) is one of the highest in the UC system. Still a realistic target, not a lock on GPA alone.",
    program: {
      name: "School of Business — B.S. Business Administration",
      blurb:
        "UCR is home to the largest undergraduate business program in the entire UC system, with concentrations in accounting, finance, marketing, management, business analytics, and information systems, plus the only actuarial science degree housed in a UC business school. Freshmen enter as Pre-Business and formally declare the major junior year, but — unlike Berkeley or Davis — this isn't described as a brutally competitive internal admit.",
      ranking: "Largest UC undergrad business program",
    },
    minors:
      "Both History and Political Science are well-established majors and minors within UCR's College of Humanities, Arts, and Social Sciences.",
    housing: {
      dial: 3,
      note: "Housing is guaranteed for a couple of years, but Riverside's Inland Empire location and commuter-heavy regional culture mean a meaningful share of students live off campus — a mixed, not fully residential, experience.",
    },
    goodFor: "Largest UC business program, easy admission",
    careerSalary: "~$64k",
    careerNote:
      "Business Administration & Management grads report a median salary of about $64,000 — ranked #15 among all U.S. schools for this major by College Factual. Roughly 20% of UCR grads start in finance or business services, and a quarter of alumni overall earn $200k+ by mid-career.",
    extras: [
      "The strongest combination on this list of 'real UC business degree' plus 'comfortable admission odds.'",
      "Application deadline: Nov 30 (UC system).",
      "Best fit if a dedicated, well-resourced UC business program matters more than brand name or a coastal location.",
    ],
  },
  {
    id: "uci",
    name: "UC Irvine",
    fullName: "University of California, Irvine",
    type: "UC",
    city: "Irvine",
    region: "Orange County",
    costIn: 46000,
    costOut: 86000,
    acceptance: "~29%",
    acceptanceNum: 29,
    gpaFit: "competitive",
    gpaNote:
      "The middle 50% of admits carry a 4.1–4.3 weighted GPA — a 3.79 weighted sits well below that band. This is a genuine target, not a safety, and more of a stretch than Irvine's overall reputation might suggest at first glance.",
    program: {
      name: "Paul Merage School of Business",
      blurb:
        "Merage's undergrad Business Administration program is solidly ranked nationally (roughly top 30) and AACSB-accredited, with real concentrations in finance, marketing, and entrepreneurship. Unlike Berkeley or Davis, you can apply to it directly as a freshman rather than competing for an internal sophomore-year admit.",
      ranking: "~#27 nationally (undergrad business, U.S. News)",
    },
    minors:
      "Solid, well-supported minors in a mid-sized School of Social Sciences — smaller and more accessible than the Berkeley/UCLA versions.",
    housing: {
      dial: 4,
      note: "Guarantees 2 years of housing. The suburban, self-contained campus design makes it feel residential, even though Orange County's sprawl means some students do commute.",
    },
    goodFor: "Real, direct-entry business major, genuine target",
    careerSalary: "~$86k",
    careerNote:
      "Business Administration grads report a median salary of about $86,000 — the highest figure among the UC business programs on this list, and top-4-nationally in College Factual's ranking for the major.",
    extras: [
      "Big advantage over Berkeley/UCLA: you apply directly to the business major as a freshman — no internal-admission gauntlet.",
      "Application deadline: Nov 30 (UC system).",
      "Best fit if you want UC prestige plus a real, direct-entry business degree, and are comfortable with a genuine (not guaranteed) target school.",
    ],
  },
  {
    id: "ucsd",
    name: "UC San Diego",
    fullName: "University of California, San Diego",
    type: "UC",
    city: "La Jolla",
    region: "San Diego",
    costIn: 45500,
    costOut: 80500,
    acceptance: "~27%",
    acceptanceNum: 27,
    gpaFit: "competitive",
    gpaNote:
      "Average admitted GPA is reported around 3.90, though competitive applicants often present a UC-weighted GPA of 4.0+ (roughly 3.7-3.8 unweighted). A 3.67 UW / 3.79 weighted sits a bit below that neighborhood — a real target, not a safety, and not a Berkeley/UCLA-level reach either.",
    program: {
      name: "No dedicated business school — Business Economics B.S. (Rady + Economics)",
      blurb:
        "UCSD doesn't offer a Bachelor's in Business Administration. Instead, the Rady School of Management co-runs a Business Economics B.S. with the Economics Department, plus a Business Psychology major and seven open-to-all business minors (accounting, finance, marketing, etc.). Worth knowing: UCSD will stop admitting new students into the current Business Economics major starting Fall 2028, so timing matters if this is the target major.",
      ranking: "No standalone business major; strong Rady minors instead",
    },
    minors:
      "Both History and Political Science are well-established departments and minors at a major AAU research university.",
    housing: {
      dial: 5,
      note: "UCSD's distinctive residential college system (eight colleges, each with its own dorms, dining, and traditions) makes it one of the most structurally residential UC campuses, in an otherwise fairly isolated, affluent La Jolla setting.",
    },
    goodFor: "Prestige UC, but no dedicated business major",
    careerSalary: "~$80k (Economics, proxy)",
    careerNote:
      "No business major means no business-specific salary data, but Economics grads — the closest proxy, and what most Business Economics students overlap with — report a median salary of about $80,000, among the top 15 nationally for the major.",
    extras: [
      "The Business Economics major stops accepting new students starting Fall 2028 — check current status directly with Rady/Economics before counting on it.",
      "Application deadline: Nov 30 (UC system).",
      "Best fit if UCSD's overall prestige and La Jolla setting outweigh not having a true business school.",
    ],
  },
  {
    id: "ucsb",
    name: "UC Santa Barbara",
    fullName: "University of California, Santa Barbara",
    type: "UC",
    city: "Santa Barbara",
    region: "Central Coast",
    costIn: 47000,
    costOut: 86000,
    acceptance: "~38%",
    acceptanceNum: 38,
    gpaFit: "competitive",
    gpaNote:
      "Admitted students post a middle-50% weighted GPA of roughly 4.05–4.29 — high, and a 3.79 weighted sits below that band. UCSB's acceptance rate has climbed recently (34–44% depending on residency and year), so this is still a real if optimistic target rather than a firm reach.",
    program: {
      name: "No dedicated business major — Economics B.A. + Technology Management certificate",
      blurb:
        "UCSB doesn't offer a business major. The realistic path is an Economics B.A. (a large, well-regarded department) paired with the undergraduate Technology Management certificate program, which layers business fundamentals — finance, marketing, entrepreneurship — on top of any major. It's a real option, just not a dedicated business degree the way Irvine, Davis, or Riverside offer.",
      ranking: "No business major; Econ + Technology Management certificate",
    },
    minors:
      "Both History and Political Science are large, well-regarded departments — UCSB's overall Social Sciences division is its most popular by degrees awarded.",
    housing: {
      dial: 5,
      note: "Guarantees about 2 years of housing, and the adjacent Isla Vista neighborhood — where most upperclassmen live — is such a dense, walkable student community that UCSB has one of the most immersive 'college town' cultures of any UC.",
    },
    goodFor: "Iconic UC college-town culture, no business major",
    careerSalary: "~$88k (Economics, proxy)",
    careerNote:
      "Economics grads — the closest proxy to a business degree here — report a median salary of about $88,000 by year five, the #1-ranked outcome in California for the major by College Factual. This reflects Economics broadly, not a business-specific program.",
    extras: [
      "Weakest business-specific fit of the UCs on this list — the Technology Management program is a certificate layered on another major, not a standalone business degree.",
      "Application deadline: Nov 30 (UC system).",
      "Best fit if the classic beachside UC social experience matters more than having a dedicated business school.",
    ],
  },
  {
    id: "scu",
    name: "Santa Clara",
    fullName: "Santa Clara University",
    type: "Private",
    city: "Santa Clara",
    region: "Bay Area",
    costIn: 83000,
    costOut: 83000,
    acceptance: "~44-49%",
    acceptanceNum: 46,
    gpaFit: "competitive",
    gpaNote:
      "Average unweighted GPA for admits is around 3.86 — a 3.67 UW is meaningfully below that average. Santa Clara is holistic, not GPA-cutoff-driven, so this remains a genuine target rather than a hard reach, but GPA is no longer a near-match.",
    program: {
      name: "Leavey School of Business",
      blurb:
        "A solid, AACSB-accredited program with an underrated advantage: it sits in the middle of Silicon Valley, which matters a lot for internships and networking even outside tech-specific majors. Smaller and more personal than any public option on this list.",
      ranking: "AACSB-accredited, Silicon Valley location",
    },
    minors:
      "Both minors are offered through the College of Arts and Sciences — solid, with notably small classes given SCU's overall size (~6,000 undergrads).",
    housing: {
      dial: 4,
      note: "Guarantees housing for 2 years on a small, walkable campus, so it feels residential — though the Bay Area's high cost of living pushes some upperclassmen off campus.",
    },
    goodFor: "Silicon Valley access, small and personal",
    careerSalary: "~$87k (5yr, all majors)",
    careerNote:
      "Leavey undergrads have a 90% employment rate at graduation — the highest of any school at SCU. Santa Clara alumni overall rank #9 nationally for salary potential (PayScale), with a median of about $87,000 five years out and $173,000 after a decade-plus.",
    extras: [
      "Smallest school on this list (~6,000 undergrads) — expect noticeably smaller classes than any public option here.",
      "Regular Decision deadline: early January; Restrictive Early Action ~Nov 1.",
      "Best fit if Silicon Valley internship access and a smaller, more personal campus outweigh chasing a bigger brand name.",
    ],
  },
  {
    id: "usf",
    name: "University of San Francisco",
    fullName: "University of San Francisco",
    type: "Private",
    city: "San Francisco",
    region: "Bay Area",
    costIn: 90000,
    costOut: 90000,
    acceptance: "~62-72%",
    acceptanceNum: 67,
    gpaFit: "comfortable",
    gpaNote:
      "Average admitted GPA is around 3.6-3.7, with an acceptance rate in the 60s to low 70s% — a 3.67 UW sits right in that band, a comfortable admit.",
    program: {
      name: "School of Management",
      blurb:
        "Jesuit university with a real business school in the heart of downtown San Francisco. The hilltop campus and city location give strong access to SF's finance, tech, and nonprofit sectors for internships. A solidly regarded regional Jesuit brand, in the same tier as Santa Clara but with an urban rather than suburban feel.",
      ranking: "Jesuit, urban SF location, real business school",
    },
    minors:
      "Both History and Political Science are well-established majors and minors at a comprehensive Jesuit College of Arts & Sciences.",
    housing: {
      dial: 4,
      note: "Freshmen are required to live on campus. Being in the middle of San Francisco means the campus feels less self-contained than a suburban school, but the on-campus requirement still gives underclassmen a real residential foundation.",
    },
    goodFor: "Jesuit, SF internship access, moderate selectivity",
    careerSalary: "~$51k",
    careerNote:
      "Business Administration grads report a median salary of about $51,000, ranked #119 nationally (top 10%) for the major by College Factual.",
    extras: [
      "Real business school, in the city itself — a different feel from Santa Clara's suburban Silicon Valley setting.",
      "Regular Decision deadline: mid-January; Early Action ~Nov 1.",
      "Best fit if downtown San Francisco access matters more than a traditional self-contained campus.",
    ],
  },
  {
    id: "smc",
    name: "Saint Mary's College",
    fullName: "Saint Mary's College of California",
    type: "Private",
    city: "Moraga",
    region: "Bay Area",
    costIn: 77000,
    costOut: 77000,
    acceptance: "~87-89%",
    acceptanceNum: 88,
    gpaFit: "comfortable",
    gpaNote:
      "Average admitted GPA is around 3.58, and the acceptance rate (87-89%) is one of the most generous on this entire list — a 3.67 UW is a comfortable admit.",
    program: {
      name: "School of Economics and Business Administration",
      blurb:
        "Business Administration is Saint Mary's single most popular major on campus. Small classes (average 19 students) and a 13:1 student-faculty ratio give it a genuinely personal feel — closer to a small liberal arts college than a business school in the traditional sense.",
      ranking: "Most popular major on campus, very small classes",
    },
    minors:
      "Both minors are offered within the School of Liberal Arts — solid, standard options at a small liberal arts college with real breadth across ~40 majors.",
    housing: {
      dial: 5,
      note: "Freshmen are required to live on campus, on a small, quiet suburban campus in Moraga — one of the most residential, traditional 'college' feels on this entire list.",
    },
    goodFor: "Small, personal, easiest-admission private on the list",
    careerSalary: "~$50k-$140k (varies by year)",
    careerNote:
      "Business Administration grads report a median salary that has swung widely year to year — from the low $50,000s to over $140,000 in different reporting cycles — which is typical for a program this small (~40-45 grads/year), where a handful of high earners can skew the median.",
    extras: [
      "One of the most generous acceptance rates of any private school here — genuinely comfortable, not just a target.",
      "Regular Decision deadline: mid-January.",
      "Best fit if a small, quiet, personal campus matters more than a big-name brand.",
    ],
  },
  {
    id: "dominican",
    name: "Dominican University",
    fullName: "Dominican University of California",
    type: "Private",
    city: "San Rafael",
    region: "Bay Area",
    costIn: 73500,
    costOut: 73500,
    acceptance: "~83-96%",
    acceptanceNum: 88,
    gpaFit: "comfortable",
    gpaNote:
      "Average admitted GPA is around 3.65, with acceptance rates commonly reported in the 80s to mid-90s% — a 3.67 UW is a comfortable, likely admit.",
    program: {
      name: "Barowsky School of Business",
      blurb:
        "Business Administration is one of Dominican's two most popular majors (after nursing). Very small (~1,200 undergrads), so expect close faculty relationships and a tight-knit community rather than a large program with lots of specialization options.",
      ranking: "2nd-most-popular major, very small school",
    },
    minors:
      "Both minors are likely offered given Dominican's broad liberal arts foundation, but course rotation at a school this small can be limited — worth confirming the current catalog directly with Dominican before counting on either.",
    housing: {
      dial: 4,
      note: "A small, residential campus in San Rafael (Marin County) — generally a traditional, on-campus college experience given its size, though not confirmed as a formal freshman requirement.",
    },
    goodFor: "Small, Marin County, easy admission",
    careerSalary: "~$66k",
    careerNote:
      "Business Administration grads report a median salary of about $66,000, and roughly 95% of job-seeking grads found placement or continued to graduate school (2019-2023 average).",
    extras: [
      "Smallest traditional four-year private on this list (~1,200 undergrads) — expect a very close-knit community.",
      "Regular Decision deadline: rolling/priority around Jan-Feb — confirm current dates directly.",
      "Best fit if a very small, supportive Marin County campus outweighs program breadth.",
    ],
  },
  {
    id: "menlo",
    name: "Menlo College",
    fullName: "Menlo College",
    type: "Private",
    city: "Atherton",
    region: "Bay Area",
    costIn: 72000,
    costOut: 72000,
    acceptance: "~60-68%",
    acceptanceNum: 64,
    gpaFit: "comfortable",
    gpaNote:
      "No published average GPA, but the acceptance rate (60-68%) and modest test-score ranges suggest GPA isn't a hard barrier here — a 3.67 UW / 3.79 weighted should be a comfortable admit.",
    program: {
      name: "School of Business",
      blurb:
        "Menlo is almost entirely business-and-psychology focused — a very narrow but very deep option, with required internships and heavy Silicon Valley networking given its Atherton location. Business Analytics, Finance, Marketing, International Business, and more are all offered, but this is a specialized professional college, not a broad university.",
      ranking: "Business-centric college, deep Silicon Valley ties",
    },
    minors:
      "Political Science is confirmed as an official minor (launched 2021-22). History is not offered as a standalone minor — it exists only as elective coursework feeding into Menlo's Equity & Justice Studies minor. This is the weakest history/poli-sci fit on the whole list.",
    housing: {
      dial: 4,
      note: "Described by the college itself as a small, residential campus — a genuine on-campus experience despite its tiny size (~830 students).",
    },
    goodFor: "All-in on business, Silicon Valley — but no true History minor",
    careerSalary: "~$61k starting",
    careerNote:
      "80% of the Class of 2022 was employed, in grad school, or in the military within the year, with an average starting salary of $61,290 — a strong outcome given Menlo's small size, driven largely by close Silicon Valley networking.",
    extras: [
      "Important gap: no standalone History minor exists here — only Political Science. Worth weighing heavily given your stated interest.",
      "Rolling admissions — no single fixed deadline, but apply early for scholarships.",
      "Best fit if a small, intensely business-focused college with real Silicon Valley access outweighs a broad liberal arts foundation.",
    ],
  },
  {
    id: "ggu",
    name: "Golden Gate University",
    fullName: "Golden Gate University",
    type: "Private",
    city: "San Francisco",
    region: "Bay Area",
    costIn: 31000,
    costOut: 31000,
    acceptance: "~58-83%",
    acceptanceNum: 70,
    gpaFit: "comfortable",
    gpaNote:
      "Undergraduate admission is generally accessible, with a minimum GPA around 2.0 and acceptance rates commonly reported between 58% and 83% — a 3.67 UW is well above what's needed.",
    program: {
      name: "Undergraduate business, accounting, and management degrees",
      blurb:
        "GGU is a business, law, accounting, and taxation-focused institution, but it's built primarily around working professionals and transfer students, not traditional 18-year-old freshmen. It offers only 4 undergraduate degrees total, with no on-campus housing.",
      ranking: "Cheapest option on this entire list, adult-focused",
    },
    minors:
      "Neither History nor Political Science is offered — GGU's undergraduate catalog is limited to 4 business, accounting, and management-focused degrees. This is a real mismatch with your stated minor interest.",
    housing: {
      dial: 1,
      note: "No on-campus housing at all. Students live in the city and commute in — this is not a traditional residential college experience in any sense.",
    },
    goodFor: "Cheapest by far, but no campus life or History/PoliSci",
    careerSalary: "~$78k",
    careerNote:
      "Business Administration grads report a median salary of about $78,000 — high for the price tag, though this likely reflects GGU's older, often already-employed working-adult student population rather than typical outcomes for an 18-year-old entering as a freshman.",
    extras: [
      "By far the least expensive option on this list — worth knowing even though it's not a strong overall fit here.",
      "No History or Political Science minor exists, and there's no on-campus housing — two significant mismatches with what you're looking for.",
      "Best fit for a student who wants a fast, affordable, career-focused business credential rather than a traditional four-year college experience.",
    ],
  },
  {
    id: "pacific",
    name: "University of the Pacific",
    fullName: "University of the Pacific",
    type: "Private",
    city: "Stockton",
    region: "Central Valley",
    costIn: 67000,
    costOut: 67000,
    acceptance: "~93-95%",
    acceptanceNum: 94,
    gpaFit: "comfortable",
    gpaNote:
      "Average unweighted admitted GPA is around 3.6-3.63, with a very high acceptance rate (93-95%) — a 3.67 UW is a comfortable, likely admit.",
    program: {
      name: "Eberhardt School of Business",
      blurb:
        "A real, well-established business school within a full private university offering 80 undergraduate degrees across nine schools and colleges. Backed by a Four-Year Graduation Guarantee and NCAA Division I athletics, this is the most traditional, full-featured 'private university experience' among the smaller privates on this list.",
      ranking: "Established business school within a full university",
    },
    minors:
      "Both History and Political Science are offered as full majors and minors within Pacific's College of the Pacific (its liberal arts college) — solid, standard offerings at a comprehensive university.",
    housing: {
      dial: 4,
      note: "A traditional residential campus with NCAA Division I athletics and a real 'college town' feel, despite Stockton's less glamorous reputation than the Bay Area or Central Coast.",
    },
    goodFor: "Full traditional college experience, comfortable admission",
    careerSalary: "~$54k starting",
    careerNote:
      "Eberhardt ranks #86 nationally by Poets&Quants (#8 among smaller business schools). About 77% of 2024 grads had a job within three months, with an average starting salary of $54,000; recent top employers include PwC, Tesla, and the City of Stockton.",
    extras: [
      "Most well-rounded of the smaller privates on this list — real breadth across 80 degree programs, not just business.",
      "Regular Decision deadline: mid-January.",
      "Best fit if your child wants the fullest traditional private-university experience (sports, dorms, breadth of majors) at a genuinely comfortable admission bar.",
    ],
  },
  {
    id: "chico",
    name: "Chico State",
    fullName: "California State University, Chico",
    type: "CSU",
    city: "Chico",
    region: "Sacramento Valley",
    costIn: 29900,
    costOut: 42900,
    acceptance: "~92%",
    acceptanceNum: 92,
    gpaFit: "comfortable",
    gpaNote:
      "One of the most accessible campuses on this list — GPA is a factor but not a serious barrier at 3.67 UW; this is a comfortable, likely admit.",
    program: {
      name: "College of Business",
      blurb:
        "AACSB-accredited, with a long-standing regional reputation and especially strong alumni ties throughout Northern California business and public-sector employers. Chico is one of the most social, traditional 'college town' CSU experiences — similar in spirit to Cal Poly SLO, just easier to get into.",
      ranking: "AACSB-accredited, strong regional alumni network",
    },
    minors:
      "Both minors are offered through Chico's humanities and social science departments — solid, standard offerings without a particular standout angle.",
    housing: {
      dial: 4,
      note: "Chico is a genuine college town, and campus culture leans heavily residential and social for a CSU, even though on-campus housing capacity is limited relative to total enrollment.",
    },
    goodFor: "Classic college town, easy admission",
    careerSalary: "~$46k",
    careerNote:
      "Business Administration grads report a median salary of about $46,000. Chico's College of Business has held AACSB accreditation since 1972.",
    extras: [
      "Very high acceptance rate — a comfortable, realistic option at this GPA.",
      "Application deadline: Nov 30 (CSU system, Cal State Apply).",
      "Best fit for a classic college-town social experience at CSU prices.",
    ],
  },
  {
    id: "sacstate",
    name: "Sacramento State",
    fullName: "California State University, Sacramento",
    type: "CSU",
    city: "Sacramento",
    region: "Sacramento Valley",
    costIn: 30500,
    costOut: 44000,
    acceptance: "~93-94%",
    acceptanceNum: 93,
    gpaFit: "comfortable",
    gpaNote:
      "Average admitted GPA is around 3.4, with a middle-50% range of about 3.0–3.7 — a 3.67 UW sits at the top of that band, a comfortable admit.",
    program: {
      name: "College of Business Administration",
      blurb:
        "Business Administration is Sac State's single largest major, giving it real scale and course variety. Being in the state capital gives unusually strong access to government, policy, and public-sector internships and jobs — a nice pairing for a business degree alongside a poli sci minor specifically.",
      ranking: "Large program, strong state-government ties",
    },
    minors:
      "Both minors are offered; being in the capital gives Sacramento State's Political Science department unusual access to state legislature and government internships.",
    housing: {
      dial: 3,
      note: "Historically more of a commuter school given its location in a major city, though it has expanded on-campus housing in recent years — sits in the middle of this list, not fully residential, not fully commuter.",
    },
    goodFor: "Capital-city internships, huge business program",
    careerSalary: "~$67k",
    careerNote:
      "Business Administration & Management grads report a median salary of about $67,000, ranked #8 among CSU business programs nationally by College Factual — one of the strongest outcomes in the CSU system.",
    extras: [
      "Business Administration is Sac State's largest major — expect a big program with lots of course sections but less individual attention early on.",
      "Application deadline: Nov 30 (CSU system, Cal State Apply).",
      "Best fit if Sacramento's state-government internship access appeals alongside the business degree.",
    ],
  },
  {
    id: "sfsu",
    name: "SF State",
    fullName: "San Francisco State University",
    type: "CSU",
    city: "San Francisco",
    region: "Bay Area",
    costIn: 31000,
    costOut: 44000,
    acceptance: "~90-96%",
    acceptanceNum: 92,
    gpaFit: "comfortable",
    gpaNote:
      "Average admitted GPA is around 3.3 — a 3.67 UW is well above average here and this is a comfortable admit.",
    program: {
      name: "College of Business",
      blurb:
        "Business Administration is SF State's largest major by a wide margin. Location is the real draw: internship access to San Francisco's finance, tech, and nonprofit sectors is hard to beat from any other school on this list, though the university's overall graduation-rate and resourcing metrics lag some other CSUs.",
      ranking: "Largest major on campus, unmatched SF internship access",
    },
    minors:
      "Both minors are offered through the College of Liberal & Creative Arts / Behavioral and Social Sciences — standard, solid offerings without a particular standout angle.",
    housing: {
      dial: 2,
      note: "San Francisco's expensive housing market and a large local commuter population make this one of the more commuter-oriented schools on this list, despite on-campus dorms.",
    },
    goodFor: "SF job market access, lighter campus life",
    careerSalary: "~$45k",
    careerNote:
      "Business Administration grads report a median salary of about $45,000 — solid but below several other CSUs, consistent with SF State's lower overall graduation-rate and resourcing metrics.",
    extras: [
      "San Francisco's cost of living pushes real costs above the sticker price even though tuition itself is low — budget carefully for off-campus housing if it comes to that.",
      "Application deadline: Nov 30 (CSU system, Cal State Apply).",
      "Best fit if direct access to SF's job market outweighs a lighter on-campus social scene.",
    ],
  },
  {
    id: "sjsu",
    name: "San José State",
    fullName: "San José State University",
    type: "CSU",
    city: "San José",
    region: "Bay Area",
    costIn: 35000,
    costOut: 48000,
    acceptance: "~85%",
    acceptanceNum: 85,
    gpaFit: "comfortable",
    gpaNote:
      "Average admitted GPA is around 3.53 — a 3.67 UW is above that average. Note that all SJSU majors are officially 'impacted,' meaning competitive admission applies campus-wide, but the GPA bar itself is well within reach.",
    program: {
      name: "Lucas College and Graduate School of Business",
      blurb:
        "The strongest business program in the CSU system — ranked #1 among CSU business schools and in the national top 100 by Poets&Quants, with roughly 80% of graduates employed in Silicon Valley. Sitting less than a mile from Adobe and a short commute from Apple and Google gives it recruiting access none of the other CSUs on this list can match.",
      ranking: "#1 CSU business school, top ~100 nationally",
    },
    minors:
      "Both minors are offered; Political Science benefits from Silicon Valley's growing tech-policy overlap, though that's not the department's central focus.",
    housing: {
      dial: 2,
      note: "A historically urban, commuter-heavy campus in downtown San José, though the university has grown its on-campus housing in recent years.",
    },
    goodFor: "Best CSU business brand, Silicon Valley ties",
    careerSalary: "~$73k starting",
    careerNote:
      "Lucas College grads reported an average starting salary of $72,813 in 2024 (13.6% also got a signing bonus averaging $6,348), with about 80% employed in Silicon Valley — the strongest starting-salary outcome of any CSU business program on this list.",
    extras: [
      "The strongest CSU business brand on this list, with real Silicon Valley recruiting pipelines.",
      "Application deadline: Nov 30 (CSU system) — all majors are impacted, so apply early within the window.",
      "Best fit if tech-adjacent business networking matters as much as the degree itself.",
    ],
  },
  {
    id: "sonoma",
    name: "Sonoma State",
    fullName: "Sonoma State University",
    type: "CSU",
    city: "Rohnert Park",
    region: "Bay Area",
    costIn: 27300,
    costOut: 40000,
    acceptance: "~94-95%",
    acceptanceNum: 94,
    gpaFit: "comfortable",
    gpaNote:
      "Average admitted GPA is roughly 3.2–3.4, with a very high overall acceptance rate — a 3.67 UW is a comfortable, easy admit here.",
    program: {
      name: "School of Business and Economics",
      blurb:
        "A smaller business school in California's wine country, including the only dedicated Wine Business program in the U.S. Less national reputation than San José State or the UCs, but a tight-knit, scenic campus with a genuinely different vibe from the bigger urban CSUs.",
      ranking: "Small, distinctive Wine Business specialization",
    },
    minors:
      "Both minors are offered through a small College of Arts and Humanities/Social Sciences — expect small, personal classes given Sonoma's overall size (~5,400 undergrads).",
    housing: {
      dial: 4,
      note: "A small campus with proportionally more on-campus housing than the bigger CSUs, giving it a more residential feel, though many local North Bay students commute from home.",
    },
    goodFor: "Smallest, most scenic option",
    careerSalary: "~$55k",
    careerNote:
      "Business Administration grads report a median salary of about $55,000, with an overall campus employment rate near 94% within a year of graduation.",
    extras: [
      "Smallest school on this list by enrollment — expect a very different, more personal experience than the larger CSUs.",
      "Application deadline: Nov 30 (CSU system, Cal State Apply).",
      "Best fit if a small, scenic wine-country campus appeals more than a big-city one.",
    ],
  },
  {
    id: "csueb",
    name: "CSU East Bay",
    fullName: "California State University, East Bay",
    type: "CSU",
    city: "Hayward",
    region: "Bay Area",
    costIn: 28500,
    costOut: 41000,
    acceptance: "~80-97%",
    acceptanceNum: 85,
    gpaFit: "comfortable",
    gpaNote:
      "Admission is driven mainly by GPA and coursework; a 3.67 UW is well within reach here, though the university notes Business Administration draws a deeper applicant pool than the campus-wide average.",
    program: {
      name: "College of Business and Economics",
      blurb:
        "AACSB-accredited, solid and genuinely affordable, with Bay Area access at a lower price than San José State or SF State. It's also the most commuter-oriented school on this list, worth weighing if a traditional on-campus social scene matters to your child.",
      ranking: "AACSB-accredited, most budget-friendly Bay Area option",
    },
    minors:
      "Both minors are offered; standard department offerings without a particular standout reputation.",
    housing: {
      dial: 2,
      note: "Described directly by the university as a campus where many students live off campus and balance work with school — if a traditional residential college experience matters, this is the most commuter-oriented option on this list.",
    },
    goodFor: "Most affordable, most commuter-heavy",
    careerSalary: "~$73k",
    careerNote:
      "Business Administration & Management grads report a median salary of about $73,000 — a surprisingly strong outcome (ranked #16 nationally by College Factual), likely reflecting Bay Area wages even for a mostly-commuter campus.",
    extras: [
      "The most affordable option on this entire list for CA residents.",
      "Application deadline: Nov 30 (CSU system, Cal State Apply).",
      "Best fit if cost is the top priority and your child is comfortable with a lighter on-campus social scene.",
    ],
  },
  {
    id: "csumb",
    name: "CSU Monterey Bay",
    fullName: "California State University, Monterey Bay",
    type: "CSU",
    city: "Seaside",
    region: "Central Coast",
    costIn: 28700,
    costOut: 41500,
    acceptance: "~95-97%",
    acceptanceNum: 96,
    gpaFit: "comfortable",
    gpaNote:
      "Average admitted GPA is around 3.3–3.45, with one of the highest acceptance rates on this list — a 3.67 UW is a very comfortable admit.",
    program: {
      name: "College of Business",
      blurb:
        "Business Administration is CSUMB's second-most-popular major — a real, sizeable program despite the university's relative youth (founded 1994, on a former Army base). Less brand recognition than the bigger CSUs, but the setting is a genuine draw.",
      ranking: "Growing program, 2nd-largest major on campus",
    },
    minors:
      "Both minors are offered through a young but growing College of Arts, Humanities & Social Sciences.",
    housing: {
      dial: 5,
      note: "Freshmen are required to live on campus, and the self-contained former-base campus layout reinforces a residential feel a mile from the beach.",
    },
    goodFor: "Oceanfront, required freshman housing",
    careerSalary: "~$48k",
    careerNote:
      "Business Administration grads report a median salary of about $48,000, broadly in line with other mid-sized CSUs.",
    extras: [
      "Business Administration is CSUMB's second-most-popular major — a real, sizeable program despite the school's youth.",
      "Application deadline: Nov 30 (CSU system, Cal State Apply).",
      "Best fit for oceanfront Central Coast living with more of a residential first-year experience than most CSUs.",
    ],
  },
  {
    id: "humboldt",
    name: "Cal Poly Humboldt",
    fullName: "California State Polytechnic University, Humboldt",
    type: "CSU",
    city: "Arcata",
    region: "North Coast",
    costIn: 25700,
    costOut: 38000,
    acceptance: "~92-99%",
    acceptanceNum: 95,
    gpaFit: "comfortable",
    gpaNote:
      "Average admitted GPA is around 3.5, with an acceptance rate near or above 90% — a 3.67 UW is a comfortable, easy admit here.",
    program: {
      name: "School of Business",
      blurb:
        "A small business program, accredited by IACBE rather than the AACSB accreditation most others on this list carry — worth knowing, though not disqualifying. Business isn't Humboldt's signature strength (it's much better known for environmental and natural-resource programs), but it's the most affordable, most residential option on this list if the far-north redwood coast setting appeals.",
      ranking: "IACBE-accredited (not AACSB), small program",
    },
    minors:
      "Political Science is confirmed as an official minor, run through Humboldt's 'Politics' department with a social-justice and environmental-policy focus. History is very likely available too at a comprehensive university like this, but it's worth double-checking the exact minor requirements directly with Humboldt, since the school's strengths lean more environmental than humanities.",
    housing: {
      dial: 4,
      note: "Described as a primarily residential campus in a small, remote town — genuinely the most 'away at college' feeling on this list, for better or worse depending on what your family wants.",
    },
    goodFor: "Most residential far-north option, smallest business program",
    careerSalary: "~$40k starting",
    careerNote:
      "Business Administration is Humboldt's lowest-paying major among its top earners, with entry-level salaries around $40,000 — reflecting both the school's environmental/natural-resource focus and the North Coast's smaller regional job market.",
    extras: [
      "Business accreditation here (IACBE) is a step below the AACSB accreditation most others on this list carry — worth knowing, though not disqualifying on its own.",
      "Application deadline: Nov 30 (CSU system, Cal State Apply).",
      "Best fit if the far-north-coast, redwoods setting and a smaller, residential campus outweigh having the strongest business program specifically.",
    ],
  },
  {
    id: "calpoly",
    name: "Cal Poly SLO",
    fullName: "California Polytechnic State University, San Luis Obispo",
    type: "CSU",
    city: "San Luis Obispo",
    region: "Central Coast",
    costIn: 32300,
    costOut: 52200,
    acceptance: "~28%",
    acceptanceNum: 28,
    gpaFit: "competitive",
    gpaNote:
      "Middle 50% of admits carry a 4.04–4.25 weighted GPA (avg ~4.12) — Cal Poly is the most selective CSU by a wide margin, and admits by major. A 3.79 weighted sits well below that band, so this is a genuine reach/target rather than a safety.",
    program: {
      name: "Orfalea College of Business",
      blurb:
        "AACSB-accredited and known for its hands-on 'Learn by Doing' philosophy — heavy on real projects, less on pure lecture. Widely regarded as the strongest CSU business program by reputation, especially with employers who value practical skills. Because admission is by major, Business Administration is competitive to get into directly out of high school.",
      ranking: "Strongest CSU business program by reputation, AACSB-accredited",
    },
    minors:
      "Both History and Political Science minors exist (confirmed in Cal Poly's own catalog), but as a polytechnic, the humanities departments are much smaller — expect a tighter, more intimate minor experience rather than broad course variety.",
    housing: {
      dial: 5,
      note: "Freshmen are required to live on campus. San Luis Obispo is a small college town with limited nearby housing, giving Cal Poly the most traditional 'college town' residential feel on this entire list.",
    },
    goodFor: "Best-regarded CSU business program, classic college town",
    careerSalary: "~$72k",
    careerNote:
      "Business Administration grads report a median salary of about $72,000, and Cal Poly is the 14th most-recruited school by the top 25 Silicon Valley employers, with recent hires going to Apple, Google, Amazon, LinkedIn, and SpaceX.",
    extras: [
      "Apply directly to Business Administration — Cal Poly admits by major from the start, not as undeclared.",
      "Application deadline: Nov 30 (CSU system, Cal State Apply).",
      "Best fit if your child likes project-based, applied learning and wants the strongest CSU business reputation, and can compete for it academically.",
    ],
  },
  {
    id: "sdsu",
    name: "San Diego State",
    fullName: "San Diego State University",
    type: "CSU",
    city: "San Diego",
    region: "San Diego",
    costIn: 29300,
    costOut: 42600,
    acceptance: "~34%",
    acceptanceNum: 34,
    gpaFit: "competitive",
    gpaNote:
      "Average admitted GPA is around 3.84 — a 3.67 UW sits below that average — and the ~34% acceptance rate puts SDSU in match/reach territory rather than a likely admit.",
    program: {
      name: "Fowler College of Business",
      blurb:
        "AACSB-accredited and SDSU's largest program by a wide margin — meaning huge course variety and alumni reach, but bigger lecture classes in the first two years. San Diego's biotech, defense, and tech economy gives solid access to local internships; roughly half of recent business grads reported landing at least one internship before graduating.",
      ranking: "Large, AACSB-accredited, strong regional ties",
    },
    minors:
      "Both minors are available through a well-established College of Arts & Letters — solid, but not a particular standout compared to the UC options.",
    housing: {
      dial: 3,
      note: "Historically known as more of a commuter school, though SDSU has added dorms in recent years and leans into a lively Greek-life and social scene — sits in the middle of this list, not fully residential, not fully commuter.",
    },
    goodFor: "Big alumni network, lively undergrad social scene",
    careerSalary: "~$60k+ (regional avg)",
    careerNote:
      "77% of 2023 Fowler grads had a job within three months of graduation (down from 85% the prior year), and 53% completed at least one business internship. Recent top employers include Amazon, Bank of America, Deloitte, and Microsoft.",
    extras: [
      "Roughly half of recent Fowler business grads reported at least one internship before graduation — worth asking current students about their experience.",
      "Application deadline: Nov 30 (CSU system, Cal State Apply).",
      "Best fit if San Diego's location and a more traditional, social college experience matter as much as the degree itself.",
    ],
  },
  {
    id: "uw",
    name: "UW Seattle",
    fullName: "University of Washington, Seattle",
    type: "OOS",
    city: "Seattle",
    region: "Pacific Northwest",
    costIn: 69600,
    costOut: 69600,
    acceptance: "~39%",
    acceptanceNum: 39,
    gpaFit: "competitive",
    gpaNote:
      "Middle 50% of autumn 2025 admits posted a 3.75–3.98 high-school GPA — a 3.67 UW sits below that band. Nonresident admit rate runs around 39% (a bit below the overall ~42%). Campus admission is a real target, not a lock. Foster Freshman Direct is a second, tighter filter on top of that — list Business Administration as the first-choice major, or plan on applying to Foster after freshman year.",
    program: {
      name: "Michael G. Foster School of Business",
      blurb:
        "AACSB-accredited and consistently ranked among the top public undergraduate business schools in the country, with concentrations in finance, marketing, accounting, information systems, and more — plus Seattle's Amazon / Microsoft / startup recruiting pipeline. Two paths: Freshman Direct (Foster picks from UW admits who listed Business Administration first) or standard admission after the first year, which is still capacity-constrained. Getting into UW is not the same as getting into Foster.",
      ranking: "Top public undergrad business school; AACSB-accredited",
    },
    minors:
      "Both History and Political Science are large, well-regarded majors and minors in the College of Arts & Sciences — among the stronger liberal-arts benches on this list, independent of Foster.",
    housing: {
      dial: 4,
      note: "Most freshmen live on campus (~70%+), but housing is not guaranteed — apply as soon as the housing portal opens. After year one, many students move into the U-District apartment scene. Big-city campus, not a self-contained college town.",
    },
    goodFor: "Top public B-school + Seattle internships — out-of-state price",
    careerSalary: "~$81k",
    careerNote:
      "Foster Class of 2025 reported an average starting salary around $81,000, with 92% employed or in planned next steps within 90 days — tech, finance, consulting, and accounting in Seattle and beyond.",
    extras: [
      "List Business Administration as first-choice major on the Common App for Foster Freshman Direct — a campus admit does not automatically mean Foster.",
      "Application deadline: Nov 15 (Common App) — two weeks before UC/CSU. No Early Action or Early Decision.",
      "From Danville this is typically a ~2-hour flight, not a weekend drive. Best fit if Seattle's job market and a flagship-public business brand are worth nonresident tuition.",
    ],
  },
];

/* Approximate climate averages (typical July / January daytime highs)
   and a short rainy-season note. Rounded from long-run NOAA / local
   normals — not a forecast. Map links open Google Maps centered on campus. */
const LOCATION_INFO = {
  ucdavis: {
    weather: {
      summerHigh: 94,
      winterHigh: 55,
      rainNote: "Hot, dry summers; most rain falls Nov–Mar.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=University+of+California+Davis",
  },
  ucsc: {
    weather: {
      summerHigh: 75,
      winterHigh: 61,
      rainNote: "Cool coastal summers with fog; wet winters Nov–Mar.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=University+of+California+Santa+Cruz",
  },
  ucmerced: {
    weather: {
      summerHigh: 97,
      winterHigh: 56,
      rainNote: "Very hot, dry Central Valley summers; rain mainly Nov–Mar.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=University+of+California+Merced",
  },
  ucr: {
    weather: {
      summerHigh: 95,
      winterHigh: 68,
      rainNote: "Hot inland summers; little rain outside winter storms.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=University+of+California+Riverside",
  },
  uci: {
    weather: {
      summerHigh: 82,
      winterHigh: 67,
      rainNote: "Mild Orange County climate; nearly rainless summers.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=University+of+California+Irvine",
  },
  ucsd: {
    weather: {
      summerHigh: 75,
      winterHigh: 65,
      rainNote: "Mild year-round near the coast; dry summers, light winter rain.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=University+of+California+San+Diego+La+Jolla",
  },
  ucsb: {
    weather: {
      summerHigh: 77,
      winterHigh: 64,
      rainNote: "Mild Mediterranean coast; rain concentrated Nov–Mar.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=University+of+California+Santa+Barbara",
  },
  scu: {
    weather: {
      summerHigh: 82,
      winterHigh: 60,
      rainNote: "Warm South Bay summers; rainy season roughly Nov–Mar.",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Santa+Clara+University",
  },
  usf: {
    weather: {
      summerHigh: 67,
      winterHigh: 57,
      rainNote: "Cool, often foggy summers; wet winters Nov–Mar.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=University+of+San+Francisco",
  },
  smc: {
    weather: {
      summerHigh: 82,
      winterHigh: 57,
      rainNote: "East Bay hills — warm summers, wet winters Nov–Mar.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Saint+Mary%27s+College+of+California+Moraga",
  },
  dominican: {
    weather: {
      summerHigh: 78,
      winterHigh: 57,
      rainNote: "Mild Marin climate; wetter winters Nov–Mar.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Dominican+University+of+California+San+Rafael",
  },
  menlo: {
    weather: {
      summerHigh: 80,
      winterHigh: 58,
      rainNote: "Mild Peninsula weather; rain mainly Nov–Mar.",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Menlo+College+Atherton",
  },
  ggu: {
    weather: {
      summerHigh: 67,
      winterHigh: 57,
      rainNote: "Cool downtown SF summers; rain concentrated Nov–Mar.",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=Golden+Gate+University+San+Francisco",
  },
  pacific: {
    weather: {
      summerHigh: 95,
      winterHigh: 56,
      rainNote: "Hot Central Valley summers; most rain Nov–Mar.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=University+of+the+Pacific+Stockton",
  },
  chico: {
    weather: {
      summerHigh: 96,
      winterHigh: 55,
      rainNote: "Hot, dry summers; rainy season Nov–Mar.",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=California+State+University+Chico",
  },
  sacstate: {
    weather: {
      summerHigh: 93,
      winterHigh: 55,
      rainNote: "Hot summers, cool foggy winters; rain Nov–Mar.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=California+State+University+Sacramento",
  },
  sfsu: {
    weather: {
      summerHigh: 67,
      winterHigh: 57,
      rainNote: "Cool, foggy SF summers; wet winters Nov–Mar.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=San+Francisco+State+University",
  },
  sjsu: {
    weather: {
      summerHigh: 84,
      winterHigh: 60,
      rainNote: "Warm South Bay summers; rain mainly Nov–Mar.",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=San+Jose+State+University",
  },
  sonoma: {
    weather: {
      summerHigh: 82,
      winterHigh: 57,
      rainNote: "Mild Wine Country climate; wet winters Nov–Mar.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sonoma+State+University+Rohnert+Park",
  },
  csueb: {
    weather: {
      summerHigh: 76,
      winterHigh: 58,
      rainNote: "Milder East Bay summers; rain concentrated Nov–Mar.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=California+State+University+East+Bay+Hayward",
  },
  csumb: {
    weather: {
      summerHigh: 68,
      winterHigh: 60,
      rainNote: "Cool Monterey Bay fog much of summer; wet winters.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=California+State+University+Monterey+Bay",
  },
  humboldt: {
    weather: {
      summerHigh: 64,
      winterHigh: 54,
      rainNote: "Cool, damp North Coast — rainy Oct–Apr, rarely hot.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Cal+Poly+Humboldt+Arcata",
  },
  calpoly: {
    weather: {
      summerHigh: 77,
      winterHigh: 62,
      rainNote: "Mild Central Coast; rain mostly Nov–Mar.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=California+Polytechnic+State+University+San+Luis+Obispo",
  },
  sdsu: {
    weather: {
      summerHigh: 78,
      winterHigh: 66,
      rainNote: "Mild, dry San Diego climate; scarce summer rain.",
    },
    mapUrl: "https://www.google.com/maps/search/?api=1&query=San+Diego+State+University",
  },
  uw: {
    weather: {
      summerHigh: 76,
      winterHigh: 47,
      rainNote: "Mild, dry-ish summers; gray and rainy Oct–May — bring a jacket.",
    },
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=University+of+Washington+Seattle",
  },
};

/* Main undergraduate application deadline for fall entry.
   UC/CSU share system portals; private dates are the typical
   Regular Decision target — always confirm on the school site. */
const APPLICATION_DEADLINES = {
  ucdavis: { date: "Nov 30", system: "UC Application" },
  ucsc: { date: "Nov 30", system: "UC Application" },
  ucmerced: { date: "Nov 30", system: "UC Application" },
  ucr: { date: "Nov 30", system: "UC Application" },
  uci: { date: "Nov 30", system: "UC Application" },
  ucsd: { date: "Nov 30", system: "UC Application" },
  ucsb: { date: "Nov 30", system: "UC Application" },
  scu: {
    date: "Early January",
    system: "Regular Decision",
    note: "Restrictive Early Action ~Nov 1",
  },
  usf: {
    date: "Mid-January",
    system: "Regular Decision",
    note: "Early Action ~Nov 1",
  },
  smc: { date: "Mid-January", system: "Regular Decision" },
  dominican: {
    date: "Jan–Feb priority",
    system: "Rolling admissions",
    note: "Confirm current priority dates for aid",
  },
  menlo: {
    date: "Rolling",
    system: "Rolling admissions",
    note: "Apply early for best scholarship consideration",
  },
  ggu: {
    date: "Rolling",
    system: "Rolling admissions",
    note: "Designed around working adults / transfers — confirm current cycles",
  },
  pacific: { date: "Mid-January", system: "Regular Decision" },
  chico: { date: "Nov 30", system: "Cal State Apply" },
  sacstate: { date: "Nov 30", system: "Cal State Apply" },
  sfsu: { date: "Nov 30", system: "Cal State Apply" },
  sjsu: {
    date: "Nov 30",
    system: "Cal State Apply",
    note: "All majors impacted — apply early in the window",
  },
  sonoma: { date: "Nov 30", system: "Cal State Apply" },
  csueb: { date: "Nov 30", system: "Cal State Apply" },
  csumb: { date: "Nov 30", system: "Cal State Apply" },
  humboldt: { date: "Nov 30", system: "Cal State Apply" },
  calpoly: { date: "Nov 30", system: "Cal State Apply" },
  sdsu: { date: "Nov 30", system: "Cal State Apply" },
  uw: {
    date: "Nov 15",
    system: "Common App",
    note: "No Early Action / Early Decision — one deadline for autumn entry",
  },
};

/* Approximate campus-wide average undergraduate class size.
   Rounded from Common Data Set distributions / school fact sheets.
   Intro business, econ, and stats lectures are often larger than average. */
const CLASS_SIZES = {
  ucdavis: {
    typical: "~34",
    averageNum: 34,
    note: "Many classes under 40, but large lower-division lectures (100+) are common.",
  },
  ucsc: {
    typical: "~30",
    averageNum: 30,
    note: "Residential-college feel keeps many sections mid-size; big STEM/econ lectures still exist.",
  },
  ucmerced: {
    typical: "~26",
    averageNum: 26,
    note: "Smallest UC — more mid-size sections overall, though popular GE lectures still pack in.",
  },
  ucr: {
    typical: "~32",
    averageNum: 32,
    note: "Business is UC's largest undergrad program, so core courses can run well above average.",
  },
  uci: {
    typical: "~32",
    averageNum: 32,
    note: "Typical UC mix: mid-size upper-division, large lower-division lectures.",
  },
  ucsd: {
    typical: "~35",
    averageNum: 35,
    note: "Research-university scale — expect large lectures early, smaller major courses later.",
  },
  ucsb: {
    typical: "~33",
    averageNum: 33,
    note: "Campus-wide average is mid-30s; popular econ courses can be much larger.",
  },
  scu: {
    typical: "~23",
    averageNum: 23,
    note: "Private Jesuit campus — smaller sections than UCs; business core stays relatively intimate.",
  },
  usf: {
    typical: "~22",
    averageNum: 22,
    note: "Small private university averages; urban campus but class sizes stay modest.",
  },
  smc: {
    typical: "~20",
    averageNum: 20,
    note: "Classic small liberal-arts / business mix — most sections well under 30.",
  },
  dominican: {
    typical: "~16",
    averageNum: 16,
    note: "One of the smallest averages on this list — very discussion-friendly class sizes.",
  },
  menlo: {
    typical: "~18",
    averageNum: 18,
    note: "Tiny, business-focused campus — almost all courses stay seminar-to-small-lecture sized.",
  },
  ggu: {
    typical: "~20",
    averageNum: 20,
    note: "Adult / professional-leaning classes; small sections, not a traditional lecture-hall campus.",
  },
  pacific: {
    typical: "~21",
    averageNum: 21,
    note: "Private mid-size university — averages stay low compared with UCs and big CSUs.",
  },
  chico: {
    typical: "~30",
    averageNum: 30,
    note: "Residential CSU — many mid-size classes; popular GE and business intros can run larger.",
  },
  sacstate: {
    typical: "~38",
    averageNum: 38,
    note: "Large urban CSU — intro business/econ/stats often seat well into the hundreds.",
  },
  sfsu: {
    typical: "~35",
    averageNum: 35,
    note: "Big city CSU — campus average mid-30s, with large lower-division lectures common.",
  },
  sjsu: {
    typical: "~33",
    averageNum: 33,
    note: "Impacted business program; core classes can feel bigger than the campus average suggests.",
  },
  sonoma: {
    typical: "~27",
    averageNum: 27,
    note: "Smaller CSU — closer to ~25–30 in many courses, including business core.",
  },
  csueb: {
    typical: "~30",
    averageNum: 30,
    note: "Typical CSU mix; commuting campus with mid-size sections and some large intros.",
  },
  csumb: {
    typical: "~28",
    averageNum: 28,
    note: "Smaller coastal CSU — averages stay below the big urban campuses.",
  },
  humboldt: {
    typical: "~25",
    averageNum: 25,
    note: "Among the smallest CSU averages here — business core often near seminar size.",
  },
  calpoly: {
    typical: "~31",
    averageNum: 31,
    note: "'Learn by Doing' keeps many labs/projects smaller; lecture courses still hit 50–100+.",
  },
  sdsu: {
    typical: "~36",
    averageNum: 36,
    note: "Large business college — first- and second-year lectures are often very big.",
  },
  uw: {
    typical: "~33",
    averageNum: 33,
    note: "Big research university — large lower-division lectures are common; Foster upper-division sections run smaller.",
  },
};

/* Short financial-aid snapshots for cards/detail.
   Confirm amounts and eligibility on each school's aid site — they change yearly. */
const FINANCIAL_AID = {
  ucdavis: {
    lean: "need",
    summary: "Need-based UC aid; selective Regents merit",
    note: "CA residents: Blue & Gold (tuition often covered for family income ≤ ~$100k), Cal Grant, and Middle Class Scholarship via FAFSA/CADAA (~March 2). Competitive Regents-style merit is considered through the Nov 30 UC Application — limited, not automatic.",
  },
  ucsc: {
    lean: "need",
    summary: "Need-based UC aid; selective campus merit",
    note: "Same UC need stack (Blue & Gold, Cal Grant, MCS). Campus scholarships after timely FAFSA/CADAA. Don't plan on a large automatic merit discount.",
  },
  ucmerced: {
    lean: "need",
    summary: "Strong need-based aid + lowest UC sticker",
    note: "Often the most grant-friendly UC on cost of attendance for CA residents. Affordability usually comes from Pell/Cal Grant/Blue & Gold/MCS, not big merit awards.",
  },
  ucr: {
    lean: "need",
    summary: "Need-based UC aid; limited automatic merit",
    note: "Standard UC grants for eligible CA residents. Merit awards exist but are selective — plan around need-based aid and in-state tuition.",
  },
  uci: {
    lean: "need",
    summary: "Need-based + named merit via UC App",
    note: "Blue & Gold / Cal Grant / MCS for eligible CA residents. Named awards (Regents, Chancellor's, Directors') selected through UC Application review — competitive, amounts often unpublished.",
  },
  ucsd: {
    lean: "need",
    summary: "Need-based UC aid; thin nonresident merit",
    note: "High research-university sticker. CA residents lean on Blue & Gold / Cal Grant / MCS. Out-of-state students rarely see large automatic merit cuts.",
  },
  ucsb: {
    lean: "need",
    summary: "Need-based UC aid; selective merit",
    note: "Classic UC pattern: file FAFSA/CADAA on time for need-based grants. Treat any Regents-style award as a bonus, not the plan.",
  },
  scu: {
    lean: "merit",
    summary: "Strong merit — sticker often ≠ net price",
    note: "Tiered merit at admission: Johnson Scholars (rare full-ride path via EA/ED I + Honors), Presidential at Entry (full tuition), Provost (~half tuition), Dean's (fixed amounts). Also need-based aid via FAFSA + CSS Profile. Run SCU's net price calculator.",
  },
  usf: {
    lean: "merit",
    summary: "Automatic merit ~$17k–$37k / year",
    note: "Published first-year merit tiers (St. Francis through University Scholarship) based on USF-calculated GPA — no separate merit app. Need-based USF grants stack after FAFSA/CADAA. Merit applies to tuition only.",
  },
  smc: {
    lean: "merit",
    summary: "Heavy institutional aid (avg offer ~$47k)",
    note: "Merit awarded at acceptance and renewed for four years. Fall 2025 average financial aid offer was about $46,832. Also departmental awards and Lasallian legacy scholarships. File FAFSA for need/state grants.",
  },
  dominican: {
    lean: "merit",
    summary: "Institutional merit + need packaging",
    note: "Small private — typically packages renewable merit at admission plus need-based grants after FAFSA/CADAA. Apply early in the rolling/priority window; confirm current ranges on their aid site.",
  },
  menlo: {
    lean: "merit",
    summary: "Automatic merit $22k–$26k / year",
    note: "Aspire $22k, Scholars $24k, Innovation & Impact $26k (automatic at admit). San Mateo County Commitment can reach up to ~$46k with need. Institutional aid is tuition-only. FAFSA/CADAA for need (no CSS Profile).",
  },
  ggu: {
    lean: "mixed",
    summary: "Low sticker; modest / adult-focused aid",
    note: "Cheapest sticker on the list, so scholarship shopping matters less. Traditional freshman merit packaging is thinner than SCU/USF/Menlo. Compare net price against discounted privates, not just GGU's published tuition.",
  },
  pacific: {
    lean: "merit",
    summary: "Automatic merit ~$10k–$30k / year",
    note: "Holistic academic merit for first-years (domestic and international); generally no separate app. Need-based aid and some named scholarships require FAFSA or separate applications. Renewable with GPA requirements.",
  },
  chico: {
    lean: "need",
    summary: "CSU grants + Wildcat scholarships",
    note: "State University Grant, Cal Grant, and MCS for eligible CA residents. Campus Wildcat Scholarship Application (typically Jan–mid Feb) plus some automatic Academic & Performance recruitment awards for new admits.",
  },
  sacstate: {
    lean: "need",
    summary: "CSU need-based grants; portal scholarships",
    note: "Primary affordability = in-state tuition + SUG / Cal Grant / MCS. Extra scholarships via the campus portal — not a large automatic freshman merit grid.",
  },
  sfsu: {
    lean: "need",
    summary: "CSU need-based grants; limited auto merit",
    note: "SUG + Cal Grant + MCS drive most gift aid. Campus scholarships available, but don't expect private-school-style automatic $20k+ merit.",
  },
  sjsu: {
    lean: "need",
    summary: "CSU grants; impacted majors, modest merit",
    note: "Same CSU grant stack. Silicon Valley living costs are high; large automatic merit is uncommon. File aid early and apply by Nov 30.",
  },
  sonoma: {
    lean: "need",
    summary: "CSU grants + campus scholarships",
    note: "Affordability centered on SUG / Cal Grant / MCS. Campus scholarship applications add modest amounts compared with private merit grids.",
  },
  csueb: {
    lean: "need",
    summary: "CSU need-based package",
    note: "Typical CSU grants for eligible CA residents. Lower sticker than UCs/privates can still make net price competitive without big merit awards.",
  },
  csumb: {
    lean: "need",
    summary: "CSU grants; watch coastal living costs",
    note: "Aid follows CSU rules. Monterey Bay housing/food can offset tuition savings — use the net price calculator with realistic living estimates.",
  },
  humboldt: {
    lean: "need",
    summary: "Lower COA + CSU need-based aid",
    note: "Often among the more affordable residential CSUs before aid. Still rely on SUG / Cal Grant / MCS rather than large automatic merit.",
  },
  calpoly: {
    lean: "need",
    summary: "CSU grants; college/dept scholarships",
    note: "Little automatic mega-merit. Incoming students are auto-considered for many university/college awards from the admission app; FAFSA/CADAA needed for need-based slices. Continuing students use My Cal Poly Portal.",
  },
  sdsu: {
    lean: "need",
    summary: "CSU grants; invite-only merit scholars",
    note: "Baseline = SUG / Cal Grant / MCS. Selective add-ons: SDSU Merit Scholars (~$7.5k–$10k/yr, local invite) and Presidential Scholars (up to ~$30k over 4 years, invite-only). Watch email after applying.",
  },
  uw: {
    lean: "mixed",
    summary: "OOS sticker ~$70k; Purple & Gold merit auto",
    note: "California residents pay nonresident tuition — no Cal Grant / Blue & Gold. U.S. nonresidents are automatically considered for the Purple & Gold Scholarship from the Nov 15 application (amounts unpublished; typically modest vs private merit, renewable 4 years). File FAFSA for federal aid. Run UW's net price calculator.",
  },
};

/* How much extracurriculars tend to matter in admission review.
   GPA/course rigor still dominate everywhere — this is relative weight. */
const EC_WEIGHT = {
  ucdavis: {
    weight: "medium",
    summary: "Matter in comprehensive review; GPA still leads",
    note: "UC Davis reads the full application. At 3.67 UW (just below the middle-50%), sustained ECs, leadership, or work/family responsibilities can tip a competitive file — especially for the selective business major path after enrollment.",
  },
  ucsc: {
    weight: "medium",
    summary: "Helpful color; academics usually decide",
    note: "Higher admit rate means thin ECs are less fatal than at Irvine or SDSU-tier selectivity. Still use PIQs to show depth or explain time constraints (work, family, long commute).",
  },
  ucmerced: {
    weight: "medium",
    summary: "Less make-or-break than selective UCs",
    note: "Most accessible UC on this list. Strong grades carry more of the decision; ECs still help for scholarships and standing out, but a thin résumé rarely sinks a solid 3.67 UW here.",
  },
  ucr: {
    weight: "medium",
    summary: "Part of UC review; not the main driver",
    note: "High admit rate + large business program. Comprehensive review still reads activities, but academics and eligibility dominate. Depth beats a long shallow list.",
  },
  uci: {
    weight: "medium",
    summary: "Matter more — selective campus + Merage path",
    note: "More selective than Merced/Riverside. PIQs and activities help differentiate similar GPAs. Leadership, research, work, or community impact strengthen both admission and named-scholarship consideration.",
  },
  ucsd: {
    weight: "medium",
    summary: "Matter for differentiation at a selective UC",
    note: "Competitive campus. Course rigor + GPA lead, but ECs/PIQs matter when many applicants look similar on paper. Business Economics isn't a classic undergrad business school — show intellectual curiosity, not just club titles.",
  },
  ucsb: {
    weight: "medium",
    summary: "Standard UC comprehensive review",
    note: "No dedicated business major — ECs that show initiative, writing, or quantitative interest help the overall story. Weak ECs are workable if academics are strong and PIQs explain your time.",
  },
  scu: {
    weight: "high",
    summary: "Holistic private — ECs matter a lot",
    note: "Santa Clara reads the whole person for admission and top merit (Johnson / Presidential). Leadership, Jesuit-service fit, and sustained impact help. A grades-only file is softer here than at most CSUs.",
  },
  usf: {
    weight: "high",
    summary: "Holistic private; merit is GPA-tied, admit is broader",
    note: "Automatic merit tiers lean on GPA, but admission and campus fit still weigh activities, service, and urban engagement. Thin ECs won't kill a strong academic file, but depth helps you look like more than a transcript.",
  },
  smc: {
    weight: "high",
    summary: "Small private — activities and character count",
    note: "Lasallian mission schools care about community, leadership, and engagement. Merit is largely academic, but a hollow EC list is a missed chance at a place that reads holistically.",
  },
  dominican: {
    weight: "high",
    summary: "Small campus — engagement stands out",
    note: "With a small student body, real involvement (or a clear reason you couldn't be involved) is noticeable. Work and family responsibilities count if you explain them.",
  },
  menlo: {
    weight: "high",
    summary: "Business-focused private — initiative matters",
    note: "Tiny, career-oriented campus. Jobs, entrepreneurship, DECA/FBLA-style leadership, or building something real fit the brand better than a dozen passive clubs.",
  },
  ggu: {
    weight: "low",
    summary: "Adult/professional focus — traditional ECs matter less",
    note: "Not a classic residential undergrad admit process. Work experience can matter more than high-school clubs. Still not a strong fit if you want a traditional four-year EC-driven campus culture.",
  },
  pacific: {
    weight: "high",
    summary: "Holistic private; merit is holistic too",
    note: "Pacific says merit considers GPA, rigor, leadership, and activities — not GPA alone. Weak ECs can leave merit and admission both on the table compared with peers who show initiative.",
  },
  chico: {
    weight: "low",
    summary: "CSU — GPA and eligibility dominate",
    note: "Cal State Apply is mostly academic/eligibility-driven. ECs rarely make or break admission. They can still help campus scholarships (Wildcat app) and your own fit for a residential campus.",
  },
  sacstate: {
    weight: "low",
    summary: "CSU impaction/GPA weigh more than ECs",
    note: "Standard CSU review. Focus on meeting deadlines and major requirements. Use ECs for scholarships and résumé-building more than for getting in.",
  },
  sfsu: {
    weight: "low",
    summary: "CSU — activities secondary to academics",
    note: "Admission is not a deep EC read like SCU. Weak high-school ECs are common and usually fine if GPA/A–G are solid.",
  },
  sjsu: {
    weight: "low",
    summary: "Impacted majors: GPA/eligibility first",
    note: "Business is impacted — academic metrics dominate. ECs won't substitute for the GPA/course bar. Still useful later for internships and scholarships.",
  },
  sonoma: {
    weight: "low",
    summary: "Smaller CSU — academics lead",
    note: "ECs are nice-to-have for admission. Depth helps campus life and scholarships more than the admit decision itself.",
  },
  csueb: {
    weight: "low",
    summary: "CSU — thin ECs rarely sink a file",
    note: "Commuter-leaning CSU with eligibility-focused review. Prioritize GPA, A–G, and the Nov 30 application over packing clubs.",
  },
  csumb: {
    weight: "low",
    summary: "CSU academics first",
    note: "Similar to other CSUs: ECs secondary. Local service or coastal/community work can support scholarships but usually isn't decisive for admission.",
  },
  humboldt: {
    weight: "low",
    summary: "CSU — ECs secondary",
    note: "Accessible CSU admit profile. Activities help you thrive on a residential campus and for scholarships; they seldom decide admission at 3.67 UW.",
  },
  calpoly: {
    weight: "medium",
    summary: "More selective CSU; must-have is academic/major fit",
    note: "Cal Poly is impacted and competitive by major. Selection is still largely academic/eligibility, but 'Learn by Doing' rewards applicants who show projects, making, leadership, or applied work — not empty club lists.",
  },
  sdsu: {
    weight: "medium",
    summary: "Selective CSU; ECs help at the margins + scholars",
    note: "More selective than most CSUs. GPA/eligibility dominate, but leadership/service matter for Presidential / Merit Scholars invites. Weak ECs are OK for a solid admit; they hurt more for those invite-only awards.",
  },
  uw: {
    weight: "medium",
    summary: "Holistic review; essays + activities matter",
    note: "UW is test-free and reads the whole file. GPA and senior-year rigor lead, but the writing section and sustained activities help — especially for Foster Freshman Direct and Purple & Gold. A grades-only file is softer here than at a CSU.",
  },
};

/* Official campus links — admissions, net price, visit/tour, business/major page. */
const OFFICIAL_LINKS = {
  ucdavis: {
    admissions: "https://www.ucdavis.edu/admissions/undergraduate",
    netPrice: "https://financialaid.ucdavis.edu/undergraduate/estimate",
    tour: "https://visit.ucdavis.edu/",
    major: "https://gsm.ucdavis.edu/undergraduate-business-major",
  },
  ucsc: {
    admissions: "https://admissions.ucsc.edu/",
    netPrice: "https://financialaid.ucsc.edu/costing/net-cost-calculator.html",
    tour: "https://admissions.ucsc.edu/visit/",
    major: "https://economics.ucsc.edu/undergraduate/index.html",
  },
  ucmerced: {
    admissions: "https://admissions.ucmerced.edu/",
    netPrice: "https://financialaid.ucmerced.edu/cost-calculator",
    tour: "https://admissions.ucmerced.edu/visit/",
    major: "https://ssha.ucmerced.edu/undergraduate-programs",
  },
  ucr: {
    admissions: "https://admissions.ucr.edu/",
    netPrice: "https://financialaid.ucr.edu/cost-of-attendance",
    tour: "https://admissions.ucr.edu/visit/",
    major: "https://business.ucr.edu/undergraduate",
  },
  uci: {
    admissions: "https://admissions.uci.edu/",
    netPrice: "https://www.ofas.uci.edu/content/estimatingCost.php",
    tour: "https://admissions.uci.edu/visit/",
    major: "https://merage.uci.edu/programs/undergraduate/",
  },
  ucsd: {
    admissions: "https://admissions.ucsd.edu/",
    netPrice: "https://fas.ucsd.edu/forms-and-resources/financial-aid-estimator/index.html",
    tour: "https://admissions.ucsd.edu/visit/",
    major: "https://rady.ucsd.edu/programs/undergraduate/",
  },
  ucsb: {
    admissions: "https://admissions.sa.ucsb.edu/",
    netPrice: "https://www.finaid.ucsb.edu/cost-of-attendance",
    tour: "https://admissions.sa.ucsb.edu/visit-ucsb",
    major: "https://www.econ.ucsb.edu/",
  },
  scu: {
    admissions: "https://www.scu.edu/admission/",
    netPrice: "https://www.scu.edu/financialaid/net-price-calculator/",
    tour: "https://www.scu.edu/admission/visit/",
    major: "https://www.scu.edu/business/",
  },
  usf: {
    admissions: "https://www.usfca.edu/admission",
    netPrice: "https://www.usfca.edu/financial-aid/net-price-calculator",
    tour: "https://www.usfca.edu/admission/undergraduate/visit",
    major: "https://www.usfca.edu/arts-sciences/programs/undergraduate/business",
  },
  smc: {
    admissions: "https://www.stmarys-ca.edu/admissions-aid",
    netPrice: "https://www.stmarys-ca.edu/financial-aid/net-price-calculator",
    tour: "https://www.stmarys-ca.edu/admissions-aid/visit",
    major: "https://www.stmarys-ca.edu/school-economics-business-administration",
  },
  dominican: {
    admissions: "https://www.dominican.edu/admissions",
    netPrice: "https://www.dominican.edu/admissions/tuition-aid/net-price-calculator",
    tour: "https://www.dominican.edu/admissions/visit",
    major: "https://www.dominican.edu/academics/barowsky-school-business",
  },
  menlo: {
    admissions: "https://www.menlo.edu/admissions/",
    netPrice: "https://www.menlo.edu/affordability/net-price-calculator/",
    tour: "https://www.menlo.edu/admissions/visit/",
    major: "https://www.menlo.edu/academics/school-of-business/",
  },
  ggu: {
    admissions: "https://www.ggu.edu/undergraduate/",
    netPrice: "https://www.ggu.edu/admissions/tuition-and-fees/",
    tour: "https://www.ggu.edu/about/locations/san-francisco/",
    major: "https://www.ggu.edu/undergraduate/",
  },
  pacific: {
    admissions: "https://www.pacific.edu/admission",
    netPrice: "https://www.pacific.edu/financial-aid/net-price-calculator",
    tour: "https://www.pacific.edu/admission/visit",
    major: "https://www.pacific.edu/academics/schools-and-colleges/eberhardt-school-of-business",
  },
  chico: {
    admissions: "https://www.csuchico.edu/admissions/",
    netPrice: "https://www.csuchico.edu/fa/cost/net-price-calculator.shtml",
    tour: "https://www.csuchico.edu/admissions/visit/",
    major: "https://www.csuchico.edu/cob/",
  },
  sacstate: {
    admissions: "https://www.csus.edu/apply/admissions/",
    netPrice: "https://www.csus.edu/apply/financial-aid-scholarships/net-price-calculator.html",
    tour: "https://www.csus.edu/experience/visit/",
    major: "https://www.csus.edu/college/business-administration/",
  },
  sfsu: {
    admissions: "https://www.sfsu.edu/future_students/",
    netPrice: "https://financialaid.sfsu.edu/net-price-calculator",
    tour: "https://www.sfsu.edu/explore/",
    major: "https://cob.sfsu.edu/",
  },
  sjsu: {
    admissions: "https://www.sjsu.edu/admissions/",
    netPrice: "https://www.sjsu.edu/faso/resources/net-price-calculator.php",
    tour: "https://www.sjsu.edu/admissions/visit/",
    major: "https://www.sjsu.edu/cob/",
  },
  sonoma: {
    admissions: "https://admissions.sonoma.edu/",
    netPrice: "https://financialaid.sonoma.edu/cost-calculator",
    tour: "https://admissions.sonoma.edu/visit",
    major: "https://business.sonoma.edu/",
  },
  csueb: {
    admissions: "https://www.csueastbay.edu/admissions/",
    netPrice: "https://www.csueastbay.edu/financialaid/net-price-calculator.html",
    tour: "https://www.csueastbay.edu/admissions/visit/",
    major: "https://www.csueastbay.edu/cbe/",
  },
  csumb: {
    admissions: "https://csumb.edu/admissions/",
    netPrice: "https://csumb.edu/financialaid/net-price-calculator/",
    tour: "https://csumb.edu/admissions/visit/",
    major: "https://csumb.edu/business/",
  },
  humboldt: {
    admissions: "https://www.humboldt.edu/apply",
    netPrice: "https://www.humboldt.edu/financial-aid/net-price-calculator",
    tour: "https://www.humboldt.edu/visit",
    major: "https://business.humboldt.edu/",
  },
  calpoly: {
    admissions: "https://www.calpoly.edu/admissions",
    netPrice: "https://www.calpoly.edu/financial-aid/net-price-calculator",
    tour: "https://www.calpoly.edu/admissions/visit",
    major: "https://www.calpoly.edu/orfalea-college-of-business",
  },
  sdsu: {
    admissions: "https://admissions.sdsu.edu/",
    netPrice: "https://sacd.sdsu.edu/financial-aid/cost-of-attendance/net-price-calculator",
    tour: "https://admissions.sdsu.edu/visit",
    major: "https://business.sdsu.edu/",
  },
  uw: {
    admissions: "https://admit.washington.edu/apply/first-year/",
    netPrice: "https://www.washington.edu/financialaid/getting-started/student-budgets/",
    tour: "https://www.washington.edu/visit/",
    major: "https://foster.uw.edu/academics/degree-programs/undergraduate-programs/",
  },
};

/* Curated student-vibe snapshots (not star ratings). Themes reflect
   recurring praise/criticism on Niche, Reddit, and campus guides —
   self-selected and noisy. Always read recent threads yourself. */
const STUDENT_VIBE = {
  ucdavis: {
    summary: "Bike-town, friendly, academically solid — less flashy than Bay UCs",
    tags: ["bike campus", "college town", "STEM-heavy"],
    praised: "Students often like the classic college-town feel, Aggie community, and balance of academics + outdoors.",
    criticized: "Common gripes: hot summers, can feel sprawling, and big lower-division lectures / admin hurdles.",
    niche: "https://www.niche.com/colleges/university-of-california---davis/",
    reddit: "https://www.reddit.com/r/UCDavis/",
    studentLife: "https://campuslife.ucdavis.edu/",
  },
  ucsc: {
    summary: "Forest campus, chill vibe, activist — less traditional Greek/party",
    tags: ["redwoods", "laid-back", "progressive"],
    praised: "People love the setting, residential colleges, and creative/independent culture.",
    criticized: "Housing stress, fog/cold summers, and a less polished 'business school' energy come up a lot.",
    niche: "https://www.niche.com/colleges/university-of-california---santa-cruz/",
    reddit: "https://www.reddit.com/r/UCSantaCruz/",
    studentLife: "https://studentservices.ucsc.edu/",
  },
  ucmerced: {
    summary: "Small, new UC — tight-knit but quieter socially",
    tags: ["newest UC", "small", "growing"],
    praised: "Students cite approachable faculty, community feel, and easier access than older UCs.",
    criticized: "Limited town options, heat, and fewer big-campus traditions/resources get mentioned often.",
    niche: "https://www.niche.com/colleges/university-of-california---merced/",
    reddit: "https://www.reddit.com/r/ucmerced/",
    studentLife: "https://studentlife.ucmerced.edu/",
  },
  ucr: {
    summary: "Diverse, value-minded UC — more practical than glamorous",
    tags: ["diverse", "commuter mix", "improving"],
    praised: "Diversity, affordability-for-a-UC, and growing campus pride show up often.",
    criticized: "Inland Empire heat/location and 'less prestige than other UCs' comparisons are recurring.",
    niche: "https://www.niche.com/colleges/university-of-california---riverside/",
    reddit: "https://www.reddit.com/r/ucr/",
    studentLife: "https://studentlife.ucr.edu/",
  },
  uci: {
    summary: "Safe, suburban, academically intense — quieter social scene",
    tags: ["suburban", "safe", "grind"],
    praised: "Safety, weather, and strong academics/career prep are frequent pluses.",
    criticized: "Students often say social life takes more effort — suburban/spread-out, less 'instant party campus.'",
    niche: "https://www.niche.com/colleges/university-of-california---irvine/",
    reddit: "https://www.reddit.com/r/UCI/",
    studentLife: "https://studentlife.uci.edu/",
  },
  ucsd: {
    summary: "Brilliant & beach-adjacent — socially awkward stereotype (half joke)",
    tags: ["STEM", "beach nearby", "quarter system"],
    praised: "Academics, research, weather, and La Jolla access get strong marks.",
    criticized: "Social life / 'UC Socially Dead' jokes, brutal quarter pace, and housing costs are common themes.",
    niche: "https://www.niche.com/colleges/university-of-california---san-diego/",
    reddit: "https://www.reddit.com/r/UCSD/",
    studentLife: "https://students.ucsd.edu/",
  },
  ucsb: {
    summary: "Beach + academics — lively social reputation",
    tags: ["beach town", "social", "beautiful"],
    praised: "Campus beauty, Isla Vista energy, and overall student happiness come up constantly.",
    criticized: "Party culture / IV intensity isn't for everyone; housing and cost of living sting.",
    niche: "https://www.niche.com/colleges/university-of-california---santa-barbara/",
    reddit: "https://www.reddit.com/r/UCSantaBarbara/",
    studentLife: "https://studentlife.sa.ucsb.edu/",
  },
  scu: {
    summary: "Polished Silicon Valley private — ambitious, smaller community",
    tags: ["Jesuit", "career-focused", "smaller"],
    praised: "Internship pipeline, campus feel, and supportive/professional vibe are frequent praises.",
    criticized: "Cost, 'bubble' / pre-professional intensity, and less big-state-school sports culture.",
    niche: "https://www.niche.com/colleges/santa-clara-university/",
    reddit: "https://www.reddit.com/r/SantaClaraUniversity/",
    studentLife: "https://www.scu.edu/studentlife/",
  },
  usf: {
    summary: "City campus in SF — urban, Jesuit, less 'quad life'",
    tags: ["urban", "diverse", "city access"],
    praised: "San Francisco access, diversity, and socially conscious culture get love.",
    criticized: "Hilltop campus can feel small/split from the city; SF cost of living dominates complaints.",
    niche: "https://www.niche.com/colleges/university-of-san-francisco/",
    reddit: "https://www.reddit.com/r/USFCA/",
    studentLife: "https://www.usfca.edu/student-life",
  },
  smc: {
    summary: "Small Lasallian campus — community over hustle",
    tags: ["small", "close-knit", "East Bay hills"],
    praised: "Professors who know you, community feel, and quieter campus life.",
    criticized: "Limited town/nightlife nearby; some want more big-campus energy and name recognition.",
    niche: "https://www.niche.com/colleges/saint-marys-college-of-california/",
    reddit: "https://www.reddit.com/search/?q=%22Saint%20Mary%27s%20College%22%20Moraga",
    studentLife: "https://www.stmarys-ca.edu/student-life",
  },
  dominican: {
    summary: "Tiny Marin campus — personal, calm, low-key social",
    tags: ["tiny", "personal", "Marin"],
    praised: "Small classes and approachable feel; easy to get involved.",
    criticized: "Very limited campus scene — you make your own social life; Marin is pricey.",
    niche: "https://www.niche.com/colleges/dominican-university-of-california/",
    reddit: "https://www.reddit.com/search/?q=%22Dominican%20University%22%20California%20student",
    studentLife: "https://www.dominican.edu/student-life",
  },
  menlo: {
    summary: "Tiny business college — career-first, not a mega social scene",
    tags: ["business-focused", "tiny", "Peninsula"],
    praised: "Career focus, small classes, Silicon Valley proximity.",
    criticized: "Narrow academic/social menu; some miss a broader university atmosphere.",
    niche: "https://www.niche.com/colleges/menlo-college/",
    reddit: "https://www.reddit.com/search/?q=%22Menlo%20College%22%20Atherton",
    studentLife: "https://www.menlo.edu/student-life/",
  },
  ggu: {
    summary: "Downtown professional school — not a traditional undergrad bubble",
    tags: ["urban", "commuter", "adult-leaning"],
    praised: "Flexibility and career-oriented classes for working students.",
    criticized: "Little classic campus life/housing — a mismatch if you want dorm culture.",
    niche: "https://www.niche.com/colleges/golden-gate-university/",
    reddit: "https://www.reddit.com/search/?q=%22Golden%20Gate%20University%22%20undergraduate",
    studentLife: "https://www.ggu.edu/student-services/",
  },
  pacific: {
    summary: "Friendly private in Stockton — classic campus, mixed town reviews",
    tags: ["tree-lined campus", "smaller private", "Central Valley"],
    praised: "Pretty campus, approachable community, and solid school spirit for its size.",
    criticized: "Stockton's reputation/safety perceptions and desire for a bigger city come up often.",
    niche: "https://www.niche.com/colleges/university-of-the-pacific/",
    reddit: "https://www.reddit.com/r/UniversityofthePacific/",
    studentLife: "https://www.pacific.edu/student-life",
  },
  chico: {
    summary: "Classic party-adjacent college town — fun if you want that",
    tags: ["college town", "social", "residential CSU"],
    praised: "Strong town-and-gown social life, friendly campus, true college-town energy.",
    criticized: "Party reputation isn't for everyone; some mention town limited beyond campus scene.",
    niche: "https://www.niche.com/colleges/california-state-university---chico/",
    reddit: "https://www.reddit.com/r/ChicoState/",
    studentLife: "https://www.csuchico.edu/student-life/",
  },
  sacstate: {
    summary: "Big, diverse, Sacramento practical — more commuter than bubble",
    tags: ["urban CSU", "diverse", "commuter mix"],
    praised: "Diversity, value, and proximity to state-government internships.",
    criticized: "Commuter feel, parking, and less residential 'everyone lives on campus' energy.",
    niche: "https://www.niche.com/colleges/california-state-university---sacramento/",
    reddit: "https://www.reddit.com/r/CSUS/",
    studentLife: "https://www.csus.edu/student-life/",
  },
  sfsu: {
    summary: "SF urban CSU — city energy, campus is only part of life",
    tags: ["San Francisco", "diverse", "commuter"],
    praised: "City access, diversity, and progressive campus culture.",
    criticized: "Commuter campus, SF costs, and variable campus community depending on involvement.",
    niche: "https://www.niche.com/colleges/san-francisco-state-university/",
    reddit: "https://www.reddit.com/r/SFSU/",
    studentLife: "https://www.sfsu.edu/student/",
  },
  sjsu: {
    summary: "Silicon Valley practical — career upside, campus life uneven",
    tags: ["Silicon Valley", "commuter", "career"],
    praised: "Location for tech internships/jobs and diverse student body.",
    criticized: "Commuter culture, downtown San José vibe, and impacted-major stress dominate threads.",
    niche: "https://www.niche.com/colleges/san-jose-state-university/",
    reddit: "https://www.reddit.com/r/SJSU/",
    studentLife: "https://www.sjsu.edu/student/",
  },
  sonoma: {
    summary: "Chill Wine Country CSU — friendly, quieter",
    tags: ["smaller CSU", "Wine Country", "relaxed"],
    praised: "Beautiful setting, friendly vibe, manageable campus size.",
    criticized: "Quieter social scene; some want more big-city energy and major breadth.",
    niche: "https://www.niche.com/colleges/sonoma-state-university/",
    reddit: "https://www.reddit.com/r/SonomaState/",
    studentLife: "https://studentaffairs.sonoma.edu/",
  },
  csueb: {
    summary: "East Bay practical commute school — flexible, less residential",
    tags: ["commuter", "East Bay", "practical"],
    praised: "Convenience, diversity, and value for working/local students.",
    criticized: "Weak residential/social scene if you want a traditional dorm campus.",
    niche: "https://www.niche.com/colleges/california-state-university---east-bay/",
    reddit: "https://www.reddit.com/r/csueb/",
    studentLife: "https://www.csueastbay.edu/studentlife/",
  },
  csumb: {
    summary: "Coastal, scenic, still-growing campus identity",
    tags: ["Monterey Bay", "scenic", "smaller CSU"],
    praised: "Location/beauty and friendlier smaller-campus feel.",
    criticized: "Limited surrounding nightlife; some programs/social options feel still 'growing.'",
    niche: "https://www.niche.com/colleges/california-state-university---monterey-bay/",
    reddit: "https://www.reddit.com/r/CSUMB/",
    studentLife: "https://csumb.edu/studentlife/",
  },
  humboldt: {
    summary: "Outdoorsy North Coast — nature kids thrive",
    tags: ["redwoods", "outdoors", "remote"],
    praised: "Nature access, tight community, distinctive Humboldt culture.",
    criticized: "Remote location, weather/damp climate, and fewer big-city internships nearby.",
    niche: "https://www.niche.com/colleges/california-state-polytechnic-university---humboldt/",
    reddit: "https://www.reddit.com/r/humboldt/",
    studentLife: "https://www.humboldt.edu/student-life",
  },
  calpoly: {
    summary: "Learn-by-doing grind + classic SLO college town",
    tags: ["Learn by Doing", "impacted", "SLO town"],
    praised: "Hands-on learning, employability, and San Luis Obispo as a college town.",
    criticized: "Intensity/competition in impacted majors; can feel pre-professional and stressful.",
    niche: "https://www.niche.com/colleges/california-polytechnic-state-university---san-luis-obispo/",
    reddit: "https://www.reddit.com/r/CalPoly/",
    studentLife: "https://www.calpoly.edu/student-life",
  },
  sdsu: {
    summary: "Big school spirit + San Diego — social and sunny",
    tags: ["Greek/social", "school spirit", "San Diego"],
    praised: "Weather, athletics/spirit, and an active undergrad social scene.",
    criticized: "Large classes early on, party reputation (love it or leave it), and housing competition.",
    niche: "https://www.niche.com/colleges/san-diego-state-university/",
    reddit: "https://www.reddit.com/r/SDSU/",
    studentLife: "https://studentaffairs.sdsu.edu/",
  },
  uw: {
    summary: "Husky spirit + Seattle — rainy, ambitious, big-campus energy",
    tags: ["quarter system", "U-District", "rain"],
    praised: "Students cite the campus, city internships, school spirit, and Foster's career outcomes.",
    criticized: "Gray winters, large intro classes, housing scramble, and Foster's second-gate admit come up a lot.",
    niche: "https://www.niche.com/colleges/university-of-washington/",
    reddit: "https://www.reddit.com/r/udub/",
    studentLife: "https://www.washington.edu/studentlife/",
  },
};

for (const school of SCHOOLS) {
  const extras = {
    ...(LOCATION_INFO[school.id] || {}),
    ...(APPLICATION_DEADLINES[school.id]
      ? { deadline: APPLICATION_DEADLINES[school.id] }
      : {}),
    ...(CLASS_SIZES[school.id] ? { classSize: CLASS_SIZES[school.id] } : {}),
    ...(FINANCIAL_AID[school.id] ? { aid: FINANCIAL_AID[school.id] } : {}),
    ...(EC_WEIGHT[school.id] ? { ecs: EC_WEIGHT[school.id] } : {}),
    ...(OFFICIAL_LINKS[school.id] ? { links: OFFICIAL_LINKS[school.id] } : {}),
    ...(STUDENT_VIBE[school.id] ? { vibe: STUDENT_VIBE[school.id] } : {}),
  };
  Object.assign(school, extras);
}

/* How hard is the business (or business-adjacent) path after/at admission?
   Separate from campus admit odds. */
const BUSINESS_ACCESS = {
  ucdavis: {
    level: "hard",
    summary: "Campus admit ≠ business major — competitive to declare",
    note: "UC Davis's undergraduate business major is competitive even after enrollment, with GPA/course gates to declare. Managerial Economics is a more accessible business-adjacent backup.",
  },
  ucsc: {
    level: "easy",
    summary: "Business Management Economics — relatively open path",
    note: "No traditional business school. Business Management Economics is a popular, relatively accessible major through Economics — easier than impacted business schools, weaker brand.",
  },
  ucmerced: {
    level: "easy",
    summary: "Direct business options; easiest UC path here",
    note: "Management & Business Economics / Business Administration are real options at the most accessible UC. Less brand heat also means less internal bottleneck than Davis/Irvine.",
  },
  ucr: {
    level: "moderate",
    summary: "Pre-Business → declare junior year; large program",
    note: "Freshmen often enter Pre-Business and formally declare later. Large program, not Haas-level cutthroat, but still plan courses/GPA carefully.",
  },
  uci: {
    level: "hard",
    summary: "Merage is selective; strong frosh profile helps",
    note: "Paul Merage undergraduate business is one of the stronger direct UC business brands on this list. Admission to the major/campus pairing is competitive relative to Merced/Riverside.",
  },
  ucsd: {
    level: "moderate",
    summary: "No classic B-school — Business Economics path",
    note: "Business Economics (Rady + Economics) isn't a traditional undergrad business school admit. Capacity/interest can still make popular tracks competitive; not a guaranteed 'business major' brand.",
  },
  ucsb: {
    level: "moderate",
    summary: "No business major — Econ + certificates",
    note: "No dedicated undergraduate business degree. Economics + Technology Management (and similar) are the paths — plan expectations accordingly.",
  },
  scu: {
    level: "moderate",
    summary: "Leavey is strong; admit is the main gate",
    note: "Getting into Santa Clara/Leavey is the hard part. Once in, business is a core strength of the university rather than a brutal secondary bottleneck like some UCs.",
  },
  usf: {
    level: "easy",
    summary: "School of Management — straightforward for admits",
    note: "Business is a central undergrad offering. Campus admit is the main filter; less 'pre-business gauntlet' than Davis/SJSU.",
  },
  smc: {
    level: "easy",
    summary: "SEBA business — accessible on a small campus",
    note: "School of Economics and Business Administration is a core program. Small campus means clearer advising paths once admitted.",
  },
  dominican: {
    level: "easy",
    summary: "Barowsky business — open on a tiny campus",
    note: "Business is a flagship at Dominican. The challenge is fit/cost, not surviving an impaction gauntlet.",
  },
  menlo: {
    level: "easy",
    summary: "Business is the whole point of the college",
    note: "Menlo is a business-focused institution. If you're admitted, you're in the business ecosystem — narrow catalog, clear path.",
  },
  ggu: {
    level: "easy",
    summary: "Business-centric; nontraditional undergrad path",
    note: "Undergraduate offerings are business-heavy. Access is easy relative to selective programs; culture/fit is the real question.",
  },
  pacific: {
    level: "easy",
    summary: "Eberhardt business — standard private path",
    note: "Eberhardt School of Business is established. Campus admission is the primary gate, not a separate ultra-impacted frosh major battle.",
  },
  chico: {
    level: "moderate",
    summary: "CSU business — watch local impaction rules",
    note: "College of Business is solid and popular. Some CSU business programs tighten requirements; confirm current impaction for your term.",
  },
  sacstate: {
    level: "moderate",
    summary: "Large CBA — capacity pressure in popular concentrations",
    note: "Big urban business college. Campus admit is relatively accessible; popular concentrations and course seats can still feel tight.",
  },
  sfsu: {
    level: "moderate",
    summary: "Large College of Business; course crowding possible",
    note: "Business is huge at SF State. Getting into the university is one step; getting preferred classes/concentrations can take planning.",
  },
  sjsu: {
    level: "hard",
    summary: "Impacted business — apply early, GPA matters a lot",
    note: "Lucas College business is impacted. Campus eligibility isn't enough; major impaction is a real second filter. Treat as one of the harder CSU business gets on this list.",
  },
  sonoma: {
    level: "easy",
    summary: "Smaller SBE — relatively open",
    note: "School of Business and Economics on a smaller CSU — generally more accessible than SJSU/Cal Poly-style impaction.",
  },
  csueb: {
    level: "easy",
    summary: "CBE — practical access for local students",
    note: "College of Business and Economics is a workhorse program. Less hyper-selective than impacted South Bay/SLO peers.",
  },
  csumb: {
    level: "easy",
    summary: "Growing business college — accessible",
    note: "College of Business is not in the same impaction tier as SJSU. Confirm current requirements, but access is comparatively open.",
  },
  humboldt: {
    level: "easy",
    summary: "Small business school — easy to enter, niche campus",
    note: "School of Business is approachable. The decision is more about Humboldt fit than surviving major impaction.",
  },
  calpoly: {
    level: "hard",
    summary: "Admit by major — Orfalea is competitive",
    note: "Cal Poly admits into the major. Business Administration is competitive out of high school; switching in later can be hard. Plan as a direct-impacted admit.",
  },
  sdsu: {
    level: "hard",
    summary: "Fowler is large and competitive for freshmen",
    note: "Business is SDSU's largest program and competitive. Strong CSU applicant profile helps; don't assume 'admitted to SDSU' equals any concentration you want without checking impaction.",
  },
  uw: {
    level: "hard",
    summary: "Foster Freshman Direct — campus admit ≠ Foster",
    note: "List Business Administration as first-choice major for Freshman Direct. If not selected, you enter UW as a pre-major and apply to Foster later — still capacity-constrained, with admitted college GPAs often in the 3.6–3.8 range. Economics is the usual backup path.",
  },
};

const BUSINESS_ACCESS_STYLE = {
  easy: { color: "#7A9471", label: "Business path: easier" },
  moderate: { color: "#C9A227", label: "Business path: moderate" },
  hard: { color: "#A63D2F", label: "Business path: harder" },
};

/* Approximate campus coordinates for distance estimates. */
const CAMPUS_COORDS = {
  ucdavis: { lat: 38.5382, lng: -121.7617 },
  ucsc: { lat: 36.9914, lng: -122.0609 },
  ucmerced: { lat: 37.366, lng: -120.424 },
  ucr: { lat: 33.9737, lng: -117.3281 },
  uci: { lat: 33.6405, lng: -117.8443 },
  ucsd: { lat: 32.8801, lng: -117.234 },
  ucsb: { lat: 34.414, lng: -119.8489 },
  scu: { lat: 37.3496, lng: -121.939 },
  usf: { lat: 37.7766, lng: -122.4506 },
  smc: { lat: 37.8407, lng: -122.1086 },
  dominican: { lat: 37.9802, lng: -122.5147 },
  menlo: { lat: 37.4538, lng: -122.1905 },
  ggu: { lat: 37.7891, lng: -122.3986 },
  pacific: { lat: 37.9807, lng: -121.3133 },
  chico: { lat: 39.7285, lng: -121.846 },
  sacstate: { lat: 38.5585, lng: -121.421 },
  sfsu: { lat: 37.7219, lng: -122.478 },
  sjsu: { lat: 37.3352, lng: -121.8811 },
  sonoma: { lat: 38.3396, lng: -122.674 },
  csueb: { lat: 37.6567, lng: -122.056 },
  csumb: { lat: 36.652, lng: -121.797 },
  humboldt: { lat: 40.875, lng: -124.078 },
  calpoly: { lat: 35.305, lng: -120.6625 },
  sdsu: { lat: 32.7757, lng: -117.0719 },
  uw: { lat: 47.6553, lng: -122.3035 },
};

/** Fixed home base for drive estimates (not shown in UI). */
const HOME_BASE = { name: "Danville", lat: 37.8216, lng: -121.9999 };

function haversineMiles(a, b) {
  const toRad = (d) => (d * Math.PI) / 180;
  const R = 3958.8;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/** Rough CA driving estimate from straight-line distance. */
function estimateDrive(miles) {
  const roadMiles = miles * 1.25;
  const hours = roadMiles / 48;
  if (roadMiles < 15) return { miles: Math.round(roadMiles), drive: "~20–40 min" };
  if (hours < 1.25) return { miles: Math.round(roadMiles), drive: `~${Math.round(hours * 60)} min` };
  const h = Math.floor(hours);
  const m = Math.round((hours - h) * 60);
  if (hours >= 10) {
    return { miles: Math.round(roadMiles), drive: `typically fly (~${Math.round(hours)} hr)` };
  }
  const drive = m < 8 ? `~${h} hr` : m > 50 ? `~${h + 1} hr` : `~${h} hr ${m} min`;
  return { miles: Math.round(roadMiles), drive };
}

function distanceFromHome(schoolId) {
  const campus = CAMPUS_COORDS[schoolId];
  if (!campus) return null;
  const straight = haversineMiles(HOME_BASE, campus);
  return estimateDrive(straight);
}

for (const school of SCHOOLS) {
  if (BUSINESS_ACCESS[school.id]) school.businessAccess = BUSINESS_ACCESS[school.id];
}

const TIMELINE = [
  {
    id: "uw-app",
    when: "Nov 15",
    title: "UW Seattle Common App",
    detail: "University of Washington (Seattle) first-year autumn deadline is Nov 15 — two weeks before UC/CSU. No Early Action or Early Decision. List Business Administration as first-choice major for Foster Freshman Direct.",
    applies: "UW",
  },
  {
    id: "uc-csu-app",
    when: "Oct 1 – Nov 30",
    title: "UC Application & Cal State Apply",
    detail: "All UCs and CSUs on this list share the Nov 30 priority deadline for fall entry.",
    applies: "UC + CSU",
  },
  {
    id: "private-ea",
    when: "~Nov 1",
    title: "Private Early Action / REA (if using)",
    detail: "Santa Clara Restrictive Early Action and USF Early Action are typically around Nov 1. SCU Johnson Scholars path wants EA/ED I + Honors consideration.",
    applies: "Private",
  },
  {
    id: "css-profile",
    when: "Fall / with private apps",
    title: "CSS Profile (Santa Clara & some privates)",
    detail: "SCU recommends CSS Profile + FAFSA for maximum aid consideration. Confirm each private's forms.",
    applies: "Private",
  },
  {
    id: "private-rd",
    when: "Early–mid January",
    title: "Private Regular Decision",
    detail: "Typical RD windows for SCU, USF, Saint Mary's, Pacific, and similar. Confirm each school's date.",
    applies: "Private",
  },
  {
    id: "rolling-privates",
    when: "Jan–Feb priority",
    title: "Rolling / priority privates",
    detail: "Dominican, Menlo, and GGU lean rolling — apply earlier for scholarships and seating.",
    applies: "Private",
  },
  {
    id: "fafsa",
    when: "~March 2–3",
    title: "FAFSA or CADAA (state priority)",
    detail: "Needed for Cal Grant, Middle Class Scholarship, UC Blue & Gold consideration, and CSU State University Grant priority. Don't miss this even if apps are already in.",
    applies: "Everyone",
  },
  {
    id: "chico-wildcat",
    when: "Jan 2 – mid Feb",
    title: "Chico Wildcat Scholarship Application",
    detail: "Campus scholarship portal window for many Chico awards (dates shift slightly yearly).",
    applies: "Chico",
  },
  {
    id: "sdsu-invites",
    when: "Dec – Mar",
    title: "Watch email: SDSU Merit / Presidential invites",
    detail: "Invitation-only scholar apps. Applying to SDSU + filing aid comes first; then watch for links.",
    applies: "SDSU",
  },
  {
    id: "calpoly-portal",
    when: "Often March (continuing)",
    title: "Cal Poly continuing scholarship portal",
    detail: "Incoming frosh are mostly auto-considered from the admission app; continuing students use My Cal Poly Portal in spring.",
    applies: "Cal Poly",
  },
  {
    id: "decisions",
    when: "March – May",
    title: "Decisions & compare award letters",
    detail: "Stack gift aid vs loans. Re-run net price with real offers. Visit if you can before SIR/deposit deadlines.",
    applies: "Everyone",
  },
  {
    id: "sir",
    when: "May 1 (typical)",
    title: "Statement of Intent to Register / deposit",
    detail: "UC/CSU and many privates cluster around May 1. Confirm your exact SIR/deposit date on the portal.",
    applies: "Everyone",
  },
];

function formatDeadline(deadline) {
  if (!deadline) return "—";
  return `${deadline.date} — ${deadline.system}`;
}

const WEIGHTS_KEY = "decision-weights";
const DEFAULT_WEIGHTS = {
  affordability: 25,
  admitOdds: 25,
  smallClasses: 15,
  residential: 15,
  meritAid: 20,
};

const SCORE_RANGES = (() => {
  const costs = SCHOOLS.map((s) => s.costIn);
  const acc = SCHOOLS.map((s) => s.acceptanceNum);
  const classes = SCHOOLS.map((s) => s.classSize?.averageNum || 30);
  return {
    costMin: Math.min(...costs),
    costMax: Math.max(...costs),
    accMin: Math.min(...acc),
    accMax: Math.max(...acc),
    classMin: Math.min(...classes),
    classMax: Math.max(...classes),
  };
})();

function norm(value, min, max, invert = false) {
  if (max === min) return 0.5;
  let n = (value - min) / (max - min);
  n = Math.min(1, Math.max(0, n));
  return invert ? 1 - n : n;
}

function scoreSchool(school, weights) {
  const afford = norm(school.costIn, SCORE_RANGES.costMin, SCORE_RANGES.costMax, true);
  const admitRaw = norm(school.acceptanceNum, SCORE_RANGES.accMin, SCORE_RANGES.accMax);
  const gpaBoost = school.gpaFit === "comfortable" ? 1 : 0.55;
  const admitOdds = admitRaw * 0.7 + gpaBoost * 0.3;
  const smallClasses = norm(
    school.classSize?.averageNum || 30,
    SCORE_RANGES.classMin,
    SCORE_RANGES.classMax,
    true
  );
  const residential = ((school.housing?.dial || 3) - 1) / 4;
  const meritAid =
    school.aid?.lean === "merit" ? 1 : school.aid?.lean === "mixed" ? 0.45 : 0.28;

  const parts = [
    ["affordability", afford],
    ["admitOdds", admitOdds],
    ["smallClasses", smallClasses],
    ["residential", residential],
    ["meritAid", meritAid],
  ];
  let totalW = 0;
  let sum = 0;
  for (const [key, value] of parts) {
    const w = Number(weights[key]) || 0;
    totalW += w;
    sum += w * value;
  }
  if (totalW <= 0) return 0;
  return Math.round((100 * sum) / totalW);
}

const TYPE_COLOR = {
  UC: "#3D5A80",
  CSU: "#A63D2F",
  Private: "#C9A227",
  OOS: "#4B2E83",
};

const TYPE_LABEL = {
  UC: "UC",
  CSU: "CSU",
  Private: "Private",
  OOS: "OOS",
};

const FIT_STYLE = {
  comfortable: { color: "#7A9471", label: "Likely at 3.67 UW" },
  competitive: { color: "#C9A227", label: "Competitive at 3.67 UW" },
};

const AID_LEAN_STYLE = {
  merit: { color: "#C9A227", label: "Merit-leaning" },
  need: { color: "#7A9471", label: "Need-based" },
  mixed: { color: "#8FA3B8", label: "Mixed / low sticker" },
};

const EC_WEIGHT_STYLE = {
  high: { color: "#A63D2F", label: "ECs matter a lot" },
  medium: { color: "#C9A227", label: "ECs matter some" },
  low: { color: "#7A9471", label: "ECs matter less" },
};

function formatUSD(n) {
  return "$" + n.toLocaleString("en-US");
}

function familyCostLabel(school, variant = "short") {
  if (school.type === "Private") {
    return variant === "short" ? "per year" : "total annual cost of attendance";
  }
  if (school.type === "OOS") {
    return variant === "short" ? "out-of-state / yr" : "nonresident, on campus / year";
  }
  return variant === "short" ? "CA resident / yr" : "CA resident, on campus / year";
}

/* ---------------------------------------------------------------
   CAMPUS-LIFE DIAL — a small brass gauge showing the
   commuter <-> residential spectrum for a school.
----------------------------------------------------------------*/
function CampusDial({ score }) {
  const angle = -90 + ((score - 1) / 4) * 180;
  return (
    <div className="dial-wrap">
      <svg viewBox="0 0 120 68" className="dial-svg">
        <path
          d="M 10 60 A 50 50 0 0 1 110 60"
          fill="none"
          stroke="var(--line)"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d="M 10 60 A 50 50 0 0 1 110 60"
          fill="none"
          stroke="var(--brass)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={`${((score - 1) / 4) * 157} 157`}
          opacity="0.85"
        />
        <g transform={`translate(60,60) rotate(${angle})`}>
          <line x1="0" y1="0" x2="0" y2="-42" stroke="var(--rust)" strokeWidth="3" strokeLinecap="round" />
        </g>
        <circle cx="60" cy="60" r="5" fill="var(--rust)" />
      </svg>
      <div className="dial-labels">
        <span>Commuter</span>
        <span>Residential</span>
      </div>
    </div>
  );
}

function TypeTag({ type }) {
  return (
    <span className="type-tag" style={{ background: TYPE_COLOR[type] }}>
      {TYPE_LABEL[type]}
    </span>
  );
}

function FitBadge({ fit }) {
  const f = FIT_STYLE[fit];
  const Icon = fit === "comfortable" ? CheckCircle2 : AlertTriangle;
  return (
    <span className="fit-badge" style={{ color: f.color, borderColor: f.color }}>
      <Icon size={12} strokeWidth={2.4} /> {f.label}
    </span>
  );
}

function StarRating({ value = 0, onChange, size = 16 }) {
  const [hover, setHover] = useState(0);
  const display = hover || value;
  return (
    <div
      className="star-rating"
      onClick={(e) => e.stopPropagation()}
      onMouseLeave={() => setHover(0)}
    >
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          className="star-btn"
          aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
          aria-pressed={value === n}
          onMouseEnter={() => setHover(n)}
          onClick={(e) => {
            e.stopPropagation();
            onChange(n === value ? 0 : n);
          }}
        >
          <Star
            size={size}
            strokeWidth={2}
            fill={display >= n ? "var(--brass)" : "none"}
            stroke="var(--brass)"
          />
        </button>
      ))}
    </div>
  );
}

function SchoolCard({
  school,
  rating,
  onRate,
  onOpen,
  matchScore,
  comparing,
  compareDisabled,
  onToggleCompare,
}) {
  return (
    <div
      className={"card" + (comparing ? " card--comparing" : "")}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(school)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(school);
        }
      }}
    >
      <div className="card-top">
        <TypeTag type={school.type} />
        <span className="card-region">
          <MapPin size={12} strokeWidth={2.2} /> {school.region}
        </span>
      </div>
      <div className="card-name-row">
        <h3 className="card-name">{school.name}</h3>
        {typeof matchScore === "number" && (
          <span className="match-score" title="Match score from your priorities">
            {matchScore}
          </span>
        )}
      </div>
      <p className="card-goodfor">{school.goodFor}</p>
      <FitBadge fit={school.gpaFit} />

      <StarRating value={rating} onChange={(v) => onRate(school.id, v)} />

      {school.acceptance && (
        <div className="card-acceptance">
          <Percent size={14} strokeWidth={2.2} />
          <span>
            {school.acceptance}
            <span className="card-weather-hint"> acceptance rate</span>
          </span>
        </div>
      )}

      {school.weather && (
        <div className="card-weather">
          <CloudSun size={14} strokeWidth={2.2} />
          <span>
            {school.weather.summerHigh}° / {school.weather.winterHigh}°F
            <span className="card-weather-hint"> summer / winter high</span>
          </span>
        </div>
      )}

      {school.deadline && (
        <div className="card-deadline">
          <Calendar size={14} strokeWidth={2.2} />
          <span>
            {school.deadline.date}
            <span className="card-weather-hint"> {school.deadline.system}</span>
          </span>
        </div>
      )}

      {school.classSize && (
        <div className="card-classsize">
          <Users size={14} strokeWidth={2.2} />
          <span>
            {school.classSize.typical}
            <span className="card-weather-hint"> avg class size</span>
          </span>
        </div>
      )}

      {school.aid && (
        <div className="card-aid">
          <BadgePercent size={14} strokeWidth={2.2} />
          <div className="card-aid-text">
            <span
              className="aid-lean-tag"
              style={{ color: AID_LEAN_STYLE[school.aid.lean].color }}
            >
              {AID_LEAN_STYLE[school.aid.lean].label}
            </span>
            <span className="card-aid-summary">{school.aid.summary}</span>
          </div>
        </div>
      )}

      {school.ecs && (
        <div className="card-ecs">
          <Activity size={14} strokeWidth={2.2} />
          <div className="card-aid-text">
            <span
              className="aid-lean-tag"
              style={{ color: EC_WEIGHT_STYLE[school.ecs.weight].color }}
            >
              {EC_WEIGHT_STYLE[school.ecs.weight].label}
            </span>
            <span className="card-aid-summary">{school.ecs.summary}</span>
          </div>
        </div>
      )}

      {school.vibe && (
        <div className="card-vibe">
          <MessageCircle size={14} strokeWidth={2.2} />
          <div className="card-aid-text">
            <span className="aid-lean-tag" style={{ color: "#8FA3B8" }}>
              Student vibe
            </span>
            <span className="card-aid-summary">{school.vibe.summary}</span>
            {school.vibe.tags?.length > 0 && (
              <span className="vibe-tags">
                {school.vibe.tags.map((t) => (
                  <span key={t} className="vibe-tag">
                    {t}
                  </span>
                ))}
              </span>
            )}
          </div>
        </div>
      )}

      {school.businessAccess && (
        <div className="card-business">
          <Briefcase size={14} strokeWidth={2.2} />
          <div className="card-aid-text">
            <span
              className="aid-lean-tag"
              style={{ color: BUSINESS_ACCESS_STYLE[school.businessAccess.level].color }}
            >
              {BUSINESS_ACCESS_STYLE[school.businessAccess.level].label}
            </span>
            <span className="card-aid-summary">{school.businessAccess.summary}</span>
          </div>
        </div>
      )}

      {school.distance && (
        <div className="card-distance">
          <Route size={14} strokeWidth={2.2} />
          <span>
            ~{school.distance.miles} mi
            <span className="card-weather-hint">
              {" "}
              {school.distance.drive.includes("fly")
                ? school.distance.drive
                : `${school.distance.drive} drive`}
            </span>
          </span>
        </div>
      )}

      <div className="card-stats">
        <div className="stat">
          <DollarSign size={14} strokeWidth={2.2} />
          <div>
            <div className="stat-val">{formatUSD(school.costIn)}</div>
            <div className="stat-label">
              {familyCostLabel(school)}
            </div>
          </div>
        </div>
        <div className="stat">
          <TrendingUp size={14} strokeWidth={2.2} />
          <div>
            <div className="stat-val">{school.careerSalary}</div>
            <div className="stat-label">business grad salary</div>
          </div>
        </div>
      </div>

      <CampusDial score={school.housing.dial} />

      <div className="card-footer-row">
        <div className="card-footer-links">
          {school.mapUrl && (
            <a
              className="map-link"
              href={school.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <MapPin size={13} strokeWidth={2.2} /> Map <ExternalLink size={11} strokeWidth={2.2} />
            </a>
          )}
          <button
            type="button"
            className={"map-link compare-toggle" + (comparing ? " compare-toggle--on" : "")}
            disabled={!comparing && compareDisabled}
            onClick={(e) => {
              e.stopPropagation();
              onToggleCompare(school.id);
            }}
          >
            <Columns2 size={13} strokeWidth={2.2} />
            {comparing ? "Comparing" : "Compare"}
          </button>
        </div>
        <div className="card-open">
          See full details <ChevronRight size={14} strokeWidth={2.4} />
        </div>
      </div>
    </div>
  );
}

function Section({ icon, title, children }) {
  return (
    <div className="detail-section">
      <div className="detail-section-head">
        {icon}
        <h4>{title}</h4>
      </div>
      <div className="detail-section-body">{children}</div>
    </div>
  );
}

function DetailPanel({ school, rating, onRate, onClose }) {
  return (
    <div className="overlay" onClick={onClose}>
      <div className="panel" onClick={(e) => e.stopPropagation()}>
        <button className="panel-close" onClick={onClose} aria-label="Close">
          <X size={20} strokeWidth={2.2} />
        </button>

        <div className="panel-head">
          <TypeTag type={school.type} />
          <h2>{school.fullName}</h2>
          <p className="panel-sub">
            <MapPin size={14} strokeWidth={2.2} /> {school.city}, CA — {school.region}
            {school.mapUrl && (
              <>
                {" · "}
                <a
                  className="map-link map-link--inline"
                  href={school.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Google Maps <ExternalLink size={12} strokeWidth={2.2} />
                </a>
              </>
            )}
          </p>
          <div style={{ marginTop: 10, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <FitBadge fit={school.gpaFit} />
            <StarRating value={rating} onChange={(v) => onRate(school.id, v)} size={19} />
          </div>
        </div>

        {school.weather && (
          <Section icon={<CloudSun size={16} strokeWidth={2.2} />} title="Average weather">
            <div className="weather-row">
              <div>
                <div className="weather-big">{school.weather.summerHigh}°F</div>
                <div className="cost-label">typical summer high (July)</div>
              </div>
              <div>
                <div className="weather-big weather-big--secondary">{school.weather.winterHigh}°F</div>
                <div className="cost-label">typical winter high (January)</div>
              </div>
            </div>
            <p className="detail-note">{school.weather.rainNote}</p>
          </Section>
        )}

        {school.deadline && (
          <Section icon={<Calendar size={16} strokeWidth={2.2} />} title="Application deadline">
            <p className="detail-big-stat">
              {school.deadline.date}{" "}
              <span>{school.deadline.system}</span>
            </p>
            {school.deadline.note && (
              <p className="detail-note">{school.deadline.note}</p>
            )}
            <p className="detail-note">
              Confirm the current cycle on the school&apos;s admissions site — dates can shift
              slightly year to year, and some majors or scholarships have earlier cutoffs.
            </p>
          </Section>
        )}

        {school.classSize && (
          <Section icon={<Users size={16} strokeWidth={2.2} />} title="Average class size">
            <p className="detail-big-stat">
              {school.classSize.typical}{" "}
              <span>students (campus-wide approx.)</span>
            </p>
            <p className="detail-note">{school.classSize.note}</p>
            <p className="detail-note">
              Ask specifically about intro business, econ, and stats — those required courses are
              often larger than the campus average.
            </p>
          </Section>
        )}

        {school.aid && (
          <Section icon={<BadgePercent size={16} strokeWidth={2.2} />} title="Financial aid & scholarships">
            <p className="detail-note detail-note--strong">{school.aid.summary}</p>
            <p className="detail-note">
              <span
                className="aid-lean-tag"
                style={{ color: AID_LEAN_STYLE[school.aid.lean].color }}
              >
                {AID_LEAN_STYLE[school.aid.lean].label}
              </span>
            </p>
            <p className="detail-note">{school.aid.note}</p>
            <p className="detail-note">
              Run the school&apos;s net price calculator with your real numbers, and compare gift
              aid (grants/scholarships) vs loans on the actual offer letter.
            </p>
          </Section>
        )}

        {school.ecs && (
          <Section icon={<Activity size={16} strokeWidth={2.2} />} title="Extracurriculars">
            <p className="detail-note detail-note--strong">{school.ecs.summary}</p>
            <p className="detail-note">
              <span
                className="aid-lean-tag"
                style={{ color: EC_WEIGHT_STYLE[school.ecs.weight].color }}
              >
                {EC_WEIGHT_STYLE[school.ecs.weight].label}
              </span>
            </p>
            <p className="detail-note">{school.ecs.note}</p>
          </Section>
        )}

        {school.vibe && (
          <Section icon={<MessageCircle size={16} strokeWidth={2.2} />} title="What students often say">
            <p className="detail-note detail-note--strong">{school.vibe.summary}</p>
            {school.vibe.tags?.length > 0 && (
              <div className="vibe-tags vibe-tags--detail">
                {school.vibe.tags.map((t) => (
                  <span key={t} className="vibe-tag">
                    {t}
                  </span>
                ))}
              </div>
            )}
            <p className="detail-note">
              <strong style={{ color: "var(--paper)" }}>Often praised: </strong>
              {school.vibe.praised}
            </p>
            <p className="detail-note">
              <strong style={{ color: "var(--paper)" }}>Often criticized: </strong>
              {school.vibe.criticized}
            </p>
            <div className="official-links" style={{ marginTop: 10 }}>
              {school.vibe.niche && (
                <a
                  className="map-link"
                  href={school.vibe.niche}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Niche reviews <ExternalLink size={11} strokeWidth={2.2} />
                </a>
              )}
              {school.vibe.reddit && (
                <a
                  className="map-link"
                  href={school.vibe.reddit}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Campus Reddit <ExternalLink size={11} strokeWidth={2.2} />
                </a>
              )}
              {school.vibe.studentLife && (
                <a
                  className="map-link"
                  href={school.vibe.studentLife}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Student life <ExternalLink size={11} strokeWidth={2.2} />
                </a>
              )}
            </div>
            <p className="detail-note">
              Student opinion is self-selected and noisy — look for the same theme repeated
              recently, not one viral rant.
            </p>
          </Section>
        )}

        {school.businessAccess && (
          <Section icon={<Briefcase size={16} strokeWidth={2.2} />} title="Getting into the business path">
            <p className="detail-note detail-note--strong">{school.businessAccess.summary}</p>
            <p className="detail-note">
              <span
                className="aid-lean-tag"
                style={{ color: BUSINESS_ACCESS_STYLE[school.businessAccess.level].color }}
              >
                {BUSINESS_ACCESS_STYLE[school.businessAccess.level].label}
              </span>
            </p>
            <p className="detail-note">{school.businessAccess.note}</p>
            <p className="detail-note">
              This is about the major/program gate, not overall campus admission.
            </p>
          </Section>
        )}

        {school.distance && (
          <Section icon={<Route size={16} strokeWidth={2.2} />} title="Distance from home">
            <p className="detail-big-stat">
              ~{school.distance.miles} mi{" "}
              <span>
                {school.distance.drive.includes("fly")
                  ? school.distance.drive
                  : `${school.distance.drive} driving (rough)`}
              </span>
            </p>
            <p className="detail-note">
              Estimated from map coordinates with a simple road-distance factor — not live traffic.
              Check Google Maps for a real Saturday drive with stops.
            </p>
          </Section>
        )}

        <Section icon={<DollarSign size={16} strokeWidth={2.2} />} title="Cost">
          <div className="cost-row">
            <div>
              <div className="cost-big">{formatUSD(school.costIn)}</div>
              <div className="cost-label">
                {familyCostLabel(school, "long")}
              </div>
            </div>
            {school.type !== "Private" && school.type !== "OOS" && (
              <div>
                <div className="cost-big cost-big--secondary">{formatUSD(school.costOut)}</div>
                <div className="cost-label">nonresident, on campus / year</div>
              </div>
            )}
          </div>
          <p className="detail-note">
            Sticker price, not net price — most families pay less after aid. Run each school's net price
            calculator before comparing final numbers.
          </p>
        </Section>

        <Section icon={<GraduationCap size={16} strokeWidth={2.2} />} title="Getting in, at 3.67 UW / 3.79 W">
          <p className="detail-big-stat">{school.acceptance} <span>overall acceptance rate</span></p>
          <p className="detail-note">{school.gpaNote}</p>
        </Section>

        <Section icon={<Landmark size={16} strokeWidth={2.2} />} title="The business program">
          <p className="detail-note detail-note--strong">{school.program.name}</p>
          <p className="detail-note">{school.program.blurb}</p>
        </Section>

        <Section icon={<TrendingUp size={16} strokeWidth={2.2} />} title="Career outcomes">
          <p className="detail-big-stat">{school.careerSalary}</p>
          <p className="detail-note">{school.careerNote}</p>
        </Section>

        <Section icon={<BookOpen size={16} strokeWidth={2.2} />} title="History & political science minor">
          <p className="detail-note">{school.minors}</p>
        </Section>

        <Section icon={<Home size={16} strokeWidth={2.2} />} title="Living situation">
          <CampusDial score={school.housing.dial} />
          <p className="detail-note">{school.housing.note}</p>
        </Section>

        {school.links && (
          <Section icon={<Link2 size={16} strokeWidth={2.2} />} title="Official links">
            <div className="official-links">
              {[
                ["Admissions", school.links.admissions],
                ["Net price calculator", school.links.netPrice],
                ["Visit / tour", school.links.tour],
                ["Business / major", school.links.major],
              ].map(([label, href]) =>
                href ? (
                  <a
                    key={label}
                    className="map-link"
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label} <ExternalLink size={11} strokeWidth={2.2} />
                  </a>
                ) : null
              )}
            </div>
          </Section>
        )}

        <Section icon={<Info size={16} strokeWidth={2.2} />} title="Good to know">
          <ul className="extras-list">
            {school.extras.map((e, i) => (
              <li key={i}>{e}</li>
            ))}
          </ul>
        </Section>
      </div>
    </div>
  );
}

function TimelineSection({ checks, onToggle }) {
  const done = TIMELINE.filter((t) => checks[t.id]).length;
  return (
    <div className="timeline-panel">
      <div className="weights-head">
        <ListChecks size={16} strokeWidth={2.2} />
        <div>
          <h3 className="chart-title" style={{ margin: 0 }}>
            Application & aid timeline
          </h3>
          <p className="weights-lead">
            Checklist for this shortlist ({done}/{TIMELINE.length} done). Dates are typical —
            confirm the current cycle on each portal.
          </p>
        </div>
      </div>
      <ul className="timeline-list">
        {TIMELINE.map((item) => (
          <li key={item.id} className={"timeline-item" + (checks[item.id] ? " done" : "")}>
            <label className="timeline-check">
              <input
                type="checkbox"
                checked={!!checks[item.id]}
                onChange={() => onToggle(item.id)}
              />
              <span className="timeline-when">{item.when}</span>
              <span className="timeline-body">
                <span className="timeline-title">
                  {item.title}
                  <span className="timeline-applies">{item.applies}</span>
                </span>
                <span className="timeline-detail">{item.detail}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WeightsPanel({ weights, onChange }) {
  const fields = [
    ["affordability", "Lower sticker cost"],
    ["admitOdds", "Easier admission odds"],
    ["smallClasses", "Smaller classes"],
    ["residential", "More residential campus"],
    ["meritAid", "Stronger merit-aid potential"],
  ];
  return (
    <div className="weights-panel">
      <div className="weights-head">
        <Scale size={16} strokeWidth={2.2} />
        <div>
          <h3 className="chart-title" style={{ margin: 0 }}>
            Your priorities — match score
          </h3>
          <p className="weights-lead">
            Drag what matters most. Cards show a 0–100 match score; sort by match to see best fits.
            This is a decision helper, not an admissions predictor.
          </p>
        </div>
      </div>
      <div className="weights-grid">
        {fields.map(([key, label]) => (
          <label key={key} className="weight-row">
            <span className="weight-label">
              {label}
              <span className="weight-val">{weights[key]}</span>
            </span>
            <input
              type="range"
              min={0}
              max={40}
              value={weights[key]}
              onChange={(e) => onChange({ ...weights, [key]: Number(e.target.value) })}
            />
          </label>
        ))}
      </div>
      <button
        type="button"
        className="filter-btn"
        onClick={() => onChange({ ...DEFAULT_WEIGHTS })}
      >
        Reset weights
      </button>
    </div>
  );
}

function CompareBar({ schools, onOpen, onClear }) {
  if (!schools.length) return null;
  return (
    <div className="compare-bar">
      <div className="compare-bar-inner">
        <span className="compare-bar-label">
          <Columns2 size={14} strokeWidth={2.2} /> Compare ({schools.length}/3)
        </span>
        <div className="compare-bar-names">
          {schools.map((s) => (
            <span key={s.id} className="compare-chip">
              {s.name}
            </span>
          ))}
        </div>
        <div className="compare-bar-actions">
          <button
            type="button"
            className="filter-btn active"
            disabled={schools.length < 2}
            onClick={onOpen}
          >
            View side-by-side
          </button>
          <button type="button" className="filter-btn" onClick={onClear}>
            Clear
          </button>
        </div>
      </div>
    </div>
  );
}

function ComparePanel({ schools, scores, onClose, onOpenSchool }) {
  const rows = [
    ["Type", (s) => s.type],
    ["Region", (s) => `${s.city} — ${s.region}`],
    ["Match score", (s) => (scores[s.id] != null ? String(scores[s.id]) : "—")],
    ["Cost / yr", (s) => formatUSD(s.costIn)],
    ["Acceptance", (s) => s.acceptance],
    ["GPA fit", (s) => FIT_STYLE[s.gpaFit]?.label || s.gpaFit],
    ["Deadline", (s) => formatDeadline(s.deadline)],
    ["Avg class", (s) => s.classSize?.typical || "—"],
    ["Aid", (s) => s.aid?.summary || "—"],
    ["ECs", (s) => (s.ecs ? EC_WEIGHT_STYLE[s.ecs.weight].label : "—")],
    ["Weather", (s) =>
      s.weather ? `${s.weather.summerHigh}° / ${s.weather.winterHigh}°F` : "—"],
    ["Housing feel", (s) => `${s.housing.dial}/5 residential`],
    ["Career salary", (s) => s.careerSalary],
    ["Business program", (s) => s.program.name],
    ["Student vibe", (s) => s.vibe?.summary || "—"],
    [
      "Business path",
      (s) =>
        s.businessAccess
          ? BUSINESS_ACCESS_STYLE[s.businessAccess.level].label.replace("Business path: ", "")
          : "—",
    ],
    [
      "Distance",
      (s) =>
        s.distance ? `~${s.distance.miles} mi (${s.distance.drive})` : "—",
    ],
  ];

  return (
    <div className="overlay" onClick={onClose}>
      <div className="panel panel--wide" onClick={(e) => e.stopPropagation()}>
        <button className="panel-close" onClick={onClose} aria-label="Close">
          <X size={20} strokeWidth={2.2} />
        </button>
        <div className="panel-head">
          <h2>Side-by-side compare</h2>
          <p className="panel-sub">Pick differences that matter, then open any school for the full write-up.</p>
        </div>
        <div className="compare-table-wrap">
          <table className="compare-table">
            <thead>
              <tr>
                <th>Factor</th>
                {schools.map((s) => (
                  <th key={s.id}>
                    <button
                      type="button"
                      className="compare-school-btn"
                      onClick={() => {
                        onClose();
                        onOpenSchool(s);
                      }}
                    >
                      {s.name}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map(([label, getter]) => (
                <tr key={label}>
                  <th scope="row">{label}</th>
                  {schools.map((s) => (
                    <td key={s.id}>{getter(s)}</td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row">Links</th>
                {schools.map((s) => (
                  <td key={s.id}>
                    <div className="official-links official-links--compact">
                      {s.links?.admissions && (
                        <a href={s.links.admissions} target="_blank" rel="noopener noreferrer">
                          Admissions
                        </a>
                      )}
                      {s.links?.netPrice && (
                        <a href={s.links.netPrice} target="_blank" rel="noopener noreferrer">
                          Net price
                        </a>
                      )}
                      {s.mapUrl && (
                        <a href={s.mapUrl} target="_blank" rel="noopener noreferrer">
                          Map
                        </a>
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CostChart({ schools }) {
  const data = schools.map((s) => ({
    name: s.name,
    cost: s.costIn,
    type: s.type,
  }));
  return (
    <div className="chart-card">
      <h3 className="chart-title">Annual cost, what you'd pay from CA / on campus</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 56 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(237,231,214,0.12)" vertical={false} />
          <XAxis
            dataKey="name"
            tick={{ fill: "var(--chalk)", fontSize: 11, fontFamily: "IBM Plex Sans" }}
            angle={-35}
            textAnchor="end"
            interval={0}
            height={70}
          />
          <YAxis
            tick={{ fill: "var(--chalk)", fontSize: 11, fontFamily: "IBM Plex Mono" }}
            tickFormatter={(v) => `$${v / 1000}k`}
            width={44}
          />
          <Tooltip
            formatter={(v) => formatUSD(v)}
            contentStyle={{
              background: "#16281F",
              border: "1px solid rgba(237,231,214,0.2)",
              borderRadius: 6,
              fontFamily: "IBM Plex Sans",
              fontSize: 12,
              color: "#EDE7D6",
            }}
            labelStyle={{ color: "#EDE7D6" }}
          />
          <Bar dataKey="cost" radius={[4, 4, 0, 0]}>
            {data.map((d, i) => (
              <Cell key={i} fill={TYPE_COLOR[d.type]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="chart-legend">
        {Object.entries(TYPE_COLOR).map(([k, v]) => (
          <span key={k} className="legend-item">
            <span className="legend-swatch" style={{ background: v }} />
            {k}
          </span>
        ))}
      </div>
    </div>
  );
}

const EC_STRATEGY = [
  {
    title: "Don't fake a packed résumé",
    body: "Readers spot padded club lists. Two or three real activities with depth beat ten shallow ones — especially at privates and selective UCs.",
  },
  {
    title: "Prioritize depth this year",
    body: "Best moves now: a real job or internship, one club with a leadership role, or a project with proof (small business, campaign volunteer hours, tutoring program, community drive with numbers).",
  },
  {
    title: "Work and family care count",
    body: "Paid work, caring for siblings, or a long commute are legitimate ECs if you explain them in PIQs / essays. That's context, not an excuse.",
  },
  {
    title: "Match the school type",
    body: "CSUs: weak ECs are usually fine if GPA and eligibility are solid. UCs and UW: matter in comprehensive review at the margins. Privates (SCU, USF, Saint Mary's, Menlo, Pacific): biggest gap to close — initiative and leadership help admission and top merit.",
  },
  {
    title: "Light major alignment helps",
    body: "Business story: job, DECA/FBLA, entrepreneurship, finance club. History / poli sci: campaign, debate, Model UN, local government, research writing. Consistency helps; obsession isn't required.",
  },
  {
    title: "Essays can reframe a thin list",
    body: "If time went to grades, work, or family, say so clearly. One concrete story with impact beats a vague claim that you 'did a lot of clubs.'",
  },
];

const ALSO_CHECK = [
  {
    title: "Net price, not sticker price",
    body: "Every cost above is the published total. Run each school's net price calculator with your real financial numbers — Santa Clara especially can look very different after aid.",
  },
  {
    title: "Internship & career outcomes",
    body: "Ask each business school's career center for placement rates and starting salaries by major, not just university-wide averages — outcomes vary a lot between, say, San José State's Silicon Valley pipeline and a smaller program.",
  },
  {
    title: "Class size in the business core",
    body: "Intro business, econ, and stats classes can range from ~30 students (Sonoma, Humboldt) to several hundred (Sacramento State, SF State). Ask about class size for required courses, not just electives.",
  },
  {
    title: "Declaring the major once enrolled",
    body: "At UC Davis and San José State, getting into the university isn't the same as getting into the business major itself — both have additional, separate requirements to declare. Worth asking about directly.",
  },
  {
    title: "Application deadlines",
    body: "All UC and CSU campuses share a single Nov 30 priority deadline. Don't let that sneak up, especially for impacted programs like SJSU's.",
  },
  {
    title: "Commute realities for the less-residential schools",
    body: "SF State, San José State, and CSU East Bay all lean commuter. If your child ends up there, ask specifically about first-year housing availability and typical commute times for students who don't get a dorm.",
  },
];

function EcStrategySection() {
  return (
    <div className="also-check ec-strategy">
      <h3 className="chart-title">Extracurriculars — what matters, and if you&apos;re weak here</h3>
      <p className="ec-strategy-lead">
        GPA and course rigor still lead almost everywhere on this list. Use the per-school
        &quot;ECs matter…&quot; tags on each card for relative weight. If the activity list is thin,
        focus on depth — not inventing a dozen clubs.
      </p>
      <div className="also-check-grid">
        {EC_STRATEGY.map((item, i) => (
          <div key={i} className="also-check-card">
            <div className="also-check-num">{String(i + 1).padStart(2, "0")}</div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AlsoCheckSection() {
  return (
    <div className="also-check">
      <h3 className="chart-title">Worth checking beyond this list</h3>
      <div className="also-check-grid">
        {ALSO_CHECK.map((item, i) => (
          <div key={i} className="also-check-card">
            <div className="also-check-num">{String(i + 1).padStart(2, "0")}</div>
            <div>
              <h4>{item.title}</h4>
              <p>{item.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SpreadsheetView({ schools, ratings, onRate, onOpen }) {
  return (
    <div className="sheet-wrap">
      <div className="sheet-scroll">
        <table className="sheet-table">
          <thead>
            <tr>
              <th className="sheet-th-name">School</th>
              <th>Type</th>
              <th>Region</th>
              <th>Deadline</th>
              <th>Avg class</th>
              <th>Aid snapshot</th>
              <th>Business path</th>
              <th>Distance</th>
              <th>ECs</th>
              <th>Weather</th>
              <th>Map</th>
              <th>Cost (in-state)</th>
              <th>Cost (nonres.)</th>
              <th>Acceptance</th>
              <th>GPA fit</th>
              <th>Business program</th>
              <th>Career salary</th>
              <th>Housing</th>
              <th>Your rating</th>
            </tr>
          </thead>
          <tbody>
            {schools.map((s) => (
              <tr key={s.id} className="sheet-row" onClick={() => onOpen(s)}>
                <td className="sheet-td-name">{s.name}</td>
                <td>
                  <TypeTag type={s.type} />
                </td>
                <td>{s.region}</td>
                <td>{formatDeadline(s.deadline)}</td>
                <td className="sheet-num">{s.classSize?.typical || "—"}</td>
                <td className="sheet-aid">{s.aid?.summary || "—"}</td>
                <td>
                  {s.businessAccess ? (
                    <span
                      className="aid-lean-tag"
                      style={{
                        color: BUSINESS_ACCESS_STYLE[s.businessAccess.level].color,
                      }}
                    >
                      {BUSINESS_ACCESS_STYLE[s.businessAccess.level].label.replace(
                        "Business path: ",
                        ""
                      )}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="sheet-num">
                  {s.distance ? `~${s.distance.miles} mi` : "—"}
                </td>
                <td>
                  {s.ecs ? (
                    <span
                      className="aid-lean-tag"
                      style={{ color: EC_WEIGHT_STYLE[s.ecs.weight].color }}
                    >
                      {EC_WEIGHT_STYLE[s.ecs.weight].label}
                    </span>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="sheet-num">
                  {s.weather
                    ? `${s.weather.summerHigh}° / ${s.weather.winterHigh}°F`
                    : "—"}
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  {s.mapUrl ? (
                    <a
                      className="map-link map-link--inline"
                      href={s.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Google Maps <ExternalLink size={11} strokeWidth={2.2} />
                    </a>
                  ) : (
                    "—"
                  )}
                </td>
                <td className="sheet-num">{formatUSD(s.costIn)}</td>
                <td className="sheet-num">
                  {s.type === "Private" || s.type === "OOS" ? "—" : formatUSD(s.costOut)}
                </td>
                <td className="sheet-num">{s.acceptance}</td>
                <td>
                  <FitBadge fit={s.gpaFit} />
                </td>
                <td className="sheet-program">{s.program.name}</td>
                <td className="sheet-num">{s.careerSalary}</td>
                <td className="sheet-housing">
                  {"●".repeat(s.housing.dial) + "○".repeat(5 - s.housing.dial)}
                </td>
                <td onClick={(e) => e.stopPropagation()}>
                  <StarRating value={ratings[s.id] || 0} onChange={(v) => onRate(s.id, v)} size={14} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="sheet-hint">Tap any row for the full detail panel. Scroll sideways to see every column.</p>
    </div>
  );
}

export default function CollegeFinder() {
  const [filter, setFilter] = useState("All");
  const [sortBy, setSortBy] = useState("match");
  const [selected, setSelected] = useState(null);
  const [ratings, setRatings] = useState({});
  const [ratingsLoaded, setRatingsLoaded] = useState(false);
  const [view, setView] = useState("cards");
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const [compareIds, setCompareIds] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  const [timelineChecks, setTimelineChecks] = useState({});

  useEffect(() => {
    try {
      const saved = localStorage.getItem(RATINGS_KEY);
      if (saved) setRatings(JSON.parse(saved));
    } catch (err) {
      // no saved ratings yet — that's fine, start blank
    } finally {
      setRatingsLoaded(true);
    }
    try {
      const savedWeights = localStorage.getItem(WEIGHTS_KEY);
      if (savedWeights) setWeights({ ...DEFAULT_WEIGHTS, ...JSON.parse(savedWeights) });
    } catch (err) {
      // keep defaults
    }
    try {
      const savedTimeline = localStorage.getItem(TIMELINE_KEY);
      if (savedTimeline) setTimelineChecks(JSON.parse(savedTimeline));
    } catch (err) {
      // keep empty
    }
  }, []);

  function rateSchool(schoolId, value) {
    setRatings((prev) => {
      const next = { ...prev, [schoolId]: value };
      try {
        localStorage.setItem(RATINGS_KEY, JSON.stringify(next));
      } catch (err) {
        // ignore quota / private mode failures
      }
      return next;
    });
  }

  function updateWeights(next) {
    setWeights(next);
    try {
      localStorage.setItem(WEIGHTS_KEY, JSON.stringify(next));
    } catch (err) {
      // ignore
    }
  }

  function toggleCompare(id) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }

  function toggleTimeline(id) {
    setTimelineChecks((prev) => {
      const next = { ...prev, [id]: !prev[id] };
      try {
        localStorage.setItem(TIMELINE_KEY, JSON.stringify(next));
      } catch (err) {
        // ignore
      }
      return next;
    });
  }

  const scores = useMemo(() => {
    const map = {};
    for (const s of SCHOOLS) map[s.id] = scoreSchool(s, weights);
    return map;
  }, [weights]);

  const enrichedSchools = useMemo(() => {
    return SCHOOLS.map((s) => ({
      ...s,
      distance: distanceFromHome(s.id),
    }));
  }, []);

  const filtered = useMemo(() => {
    let list = enrichedSchools.filter((s) => filter === "All" || s.type === filter);
    list = [...list].sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "cost") return a.costIn - b.costIn;
      if (sortBy === "acceptance") return a.acceptanceNum - b.acceptanceNum;
      if (sortBy === "rating") return (ratings[b.id] || 0) - (ratings[a.id] || 0);
      if (sortBy === "match") return (scores[b.id] || 0) - (scores[a.id] || 0);
      if (sortBy === "distance") {
        const da = a.distance?.miles ?? 99999;
        const db = b.distance?.miles ?? 99999;
        return da - db;
      }
      return 0;
    });
    return list;
  }, [filter, sortBy, ratings, scores, enrichedSchools]);

  const compareSchools = useMemo(
    () => compareIds.map((id) => enrichedSchools.find((s) => s.id === id)).filter(Boolean),
    [compareIds, enrichedSchools]
  );

  return (
    <div className="app">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .app {
          --ink: #16281F;
          --ink-soft: #223A2D;
          --paper: #F7F3E8;
          --chalk: #EDE7D6;
          --brass: #C9A227;
          --rust: #A63D2F;
          --denim: #3D5A80;
          --sage: #7A9471;
          --line: rgba(237,231,214,0.16);
          background: var(--ink);
          color: var(--chalk);
          font-family: 'IBM Plex Sans', sans-serif;
          min-height: 100%;
          padding: 28px 20px 56px;
          box-sizing: border-box;
        }
        .app *, .app *::before, .app *::after { box-sizing: border-box; }
        .app button { font-family: inherit; cursor: pointer; }
        .app :focus-visible { outline: 2px solid var(--brass); outline-offset: 2px; }
        @media (prefers-reduced-motion: reduce) {
          .app * { transition: none !important; animation: none !important; }
        }

        .hero {
          max-width: 1040px;
          margin: 0 auto 16px;
          border-bottom: 1px solid var(--line);
          padding-bottom: 22px;
        }
        .hero-eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--brass);
          margin: 0 0 10px;
        }
        .hero h1 {
          font-family: 'Source Serif 4', serif;
          font-weight: 700;
          font-size: clamp(28px, 4vw, 40px);
          line-height: 1.1;
          margin: 0 0 10px;
          color: var(--paper);
        }
        .hero p {
          font-size: 14.5px;
          line-height: 1.55;
          color: rgba(237,231,214,0.75);
          max-width: 660px;
          margin: 0;
        }

        .scope-note {
          max-width: 1040px;
          margin: 0 auto 22px;
          background: var(--ink-soft);
          border: 1px solid var(--line);
          border-left: 3px solid var(--brass);
          border-radius: 6px;
          padding: 14px 16px;
          font-size: 12.5px;
          line-height: 1.6;
          color: rgba(237,231,214,0.8);
        }
        .scope-note strong { color: var(--paper); }

        .controls {
          max-width: 1040px;
          margin: 0 auto 22px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
          justify-content: space-between;
        }
        .filter-group { display: flex; gap: 6px; flex-wrap: wrap; }
        .filter-btn {
          background: transparent;
          border: 1px solid var(--line);
          color: var(--chalk);
          font-size: 12.5px;
          font-family: 'IBM Plex Mono', monospace;
          padding: 7px 13px;
          border-radius: 20px;
          transition: border-color .15s, background .15s;
        }
        .filter-btn:hover { border-color: var(--brass); }
        .filter-btn.active { background: var(--brass); border-color: var(--brass); color: var(--ink); font-weight: 600; }

        .sort-select {
          background: var(--ink-soft);
          border: 1px solid var(--line);
          color: var(--chalk);
          font-size: 12.5px;
          font-family: 'IBM Plex Mono', monospace;
          padding: 7px 10px;
          border-radius: 6px;
        }

        .controls-right { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }

        .view-toggle {
          display: flex;
          border: 1px solid var(--line);
          border-radius: 20px;
          overflow: hidden;
        }
        .view-toggle-btn {
          display: flex;
          align-items: center;
          gap: 5px;
          background: transparent;
          border: none;
          color: rgba(237,231,214,0.7);
          font-size: 12px;
          font-family: 'IBM Plex Mono', monospace;
          padding: 7px 12px;
          transition: background .15s, color .15s;
        }
        .view-toggle-btn.active { background: var(--brass); color: var(--ink); font-weight: 600; }
        .view-toggle-btn:not(.active):hover { color: var(--chalk); }

        .sheet-wrap {
          max-width: 1040px;
          margin: 0 auto 36px;
        }
        .sheet-scroll {
          overflow-x: auto;
          border: 1px solid var(--line);
          border-radius: 10px;
          background: var(--ink-soft);
        }
        .sheet-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
          min-width: 920px;
        }
        .sheet-table thead th {
          position: sticky;
          top: 0;
          background: var(--ink-soft);
          text-align: left;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: var(--brass);
          padding: 12px 14px;
          border-bottom: 1px solid var(--line);
          white-space: nowrap;
        }
        .sheet-row { border-bottom: 1px solid var(--line); cursor: pointer; transition: background .12s; }
        .sheet-row:hover { background: rgba(237,231,214,0.05); }
        .sheet-row:last-child { border-bottom: none; }
        .sheet-table td {
          padding: 10px 14px;
          color: rgba(237,231,214,0.85);
          vertical-align: middle;
          white-space: nowrap;
        }
        .sheet-td-name, .sheet-th-name { position: sticky; left: 0; background: var(--ink-soft); z-index: 1; }
        .sheet-td-name {
          font-family: 'Source Serif 4', serif;
          font-weight: 700;
          color: var(--paper);
          font-size: 13.5px;
        }
        .sheet-num { font-family: 'IBM Plex Mono', monospace; }
        .sheet-program {
          max-width: 220px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .sheet-housing { letter-spacing: 2px; color: var(--brass); font-size: 11px; }
        .sheet-hint {
          font-size: 11.5px;
          color: rgba(237,231,214,0.45);
          margin: 10px 2px 0;
        }

        .grid {
          max-width: 1040px;
          margin: 0 auto 36px;
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
          gap: 16px;
        }

        .card {
          text-align: left;
          background: var(--ink-soft);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: transform .15s, border-color .15s;
          cursor: pointer;
          font-family: inherit;
          color: inherit;
        }
        .card:hover { transform: translateY(-2px); border-color: var(--brass); }

        .card-top { display: flex; align-items: center; justify-content: space-between; }
        .card-region {
          display: flex; align-items: center; gap: 4px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: rgba(237,231,214,0.6);
        }
        .card-acceptance, .card-weather, .card-deadline, .card-classsize, .card-aid, .card-ecs, .card-vibe, .card-business, .card-distance {
          display: flex; align-items: flex-start; gap: 7px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: rgba(237,231,214,0.85);
          padding: 2px 0;
        }
        .card-acceptance { padding-top: 6px; }
        .card-acceptance svg, .card-weather svg, .card-deadline svg, .card-classsize svg, .card-aid svg, .card-ecs svg, .card-vibe svg, .card-business svg, .card-distance svg {
          color: var(--brass); flex-shrink: 0; margin-top: 1px;
        }
        .timeline-panel {
          max-width: 1040px;
          margin: 0 auto 22px;
          background: var(--ink-soft);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 18px 20px 10px;
        }
        .timeline-list { list-style: none; margin: 0; padding: 0; }
        .timeline-item {
          border-top: 1px solid var(--line);
          padding: 10px 0;
        }
        .timeline-item.done .timeline-title { color: rgba(237,231,214,0.55); text-decoration: line-through; }
        .timeline-item.done .timeline-detail { opacity: 0.65; }
        .timeline-check {
          display: grid;
          grid-template-columns: auto 110px 1fr;
          gap: 10px 14px;
          align-items: start;
          cursor: pointer;
        }
        .timeline-check input {
          margin-top: 3px;
          accent-color: var(--brass);
        }
        .timeline-when {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: var(--brass);
          padding-top: 2px;
        }
        .timeline-title {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          align-items: center;
          font-size: 13.5px;
          font-weight: 600;
          color: var(--paper);
        }
        .timeline-applies {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          font-weight: 500;
          color: rgba(237,231,214,0.55);
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 1px 7px;
        }
        .timeline-detail {
          display: block;
          margin-top: 4px;
          font-size: 12.5px;
          line-height: 1.5;
          color: rgba(237,231,214,0.68);
        }
        @media (max-width: 700px) {
          .timeline-check { grid-template-columns: auto 1fr; }
          .timeline-when { grid-column: 2; }
        }
        .vibe-tags {
          display: flex; flex-wrap: wrap; gap: 4px; margin-top: 4px;
        }
        .vibe-tags--detail { margin: 8px 0; }
        .vibe-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10px;
          color: rgba(237,231,214,0.75);
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 2px 7px;
        }
        .ec-strategy-lead {
          max-width: 1040px;
          margin: -8px auto 16px;
          font-size: 13.5px;
          line-height: 1.55;
          color: rgba(237,231,214,0.7);
        }
        .card-weather-hint {
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 11px;
          color: rgba(237,231,214,0.5);
          margin-left: 4px;
        }
        .card-aid-text { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .aid-lean-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          text-transform: uppercase;
        }
        .card-aid-summary {
          font-family: 'IBM Plex Sans', sans-serif;
          font-size: 12px;
          line-height: 1.35;
          color: rgba(237,231,214,0.82);
        }
        .sheet-aid {
          max-width: 220px;
          white-space: normal;
          line-height: 1.35;
          font-size: 12px;
        }
        .card-footer-row {
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px;
          margin-top: auto;
          padding-top: 8px;
          border-top: 1px solid var(--line);
        }
        .map-link {
          display: inline-flex; align-items: center; gap: 4px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px;
          color: var(--brass);
          text-decoration: none;
          border: 1px solid rgba(201,162,39,0.35);
          border-radius: 14px;
          padding: 4px 10px;
          transition: background .15s, border-color .15s;
        }
        .map-link:hover {
          background: rgba(201,162,39,0.12);
          border-color: var(--brass);
        }
        .map-link--inline {
          border: none;
          padding: 0;
          font-size: inherit;
        }
        .map-link--inline:hover { background: transparent; text-decoration: underline; }
        .weather-row { display: flex; gap: 28px; flex-wrap: wrap; margin-bottom: 4px; }
        .weather-big {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 24px;
          font-weight: 600;
          color: var(--paper);
        }
        .weather-big--secondary { color: rgba(237,231,214,0.6); font-size: 18px; }
        .type-tag {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--paper);
          padding: 3px 8px;
          border-radius: 4px;
        }

        .card-name-row {
          display: flex; align-items: flex-start; justify-content: space-between; gap: 10px;
        }
        .card-name {
          font-family: 'Source Serif 4', serif;
          font-size: 20px;
          font-weight: 700;
          color: var(--paper);
          margin: 0;
        }
        .match-score {
          flex-shrink: 0;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
          background: var(--brass);
          border-radius: 999px;
          min-width: 36px;
          text-align: center;
          padding: 4px 8px;
          line-height: 1.2;
        }
        .card--comparing { border-color: var(--brass); }
        .card-footer-links { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; }
        .compare-toggle:disabled { opacity: 0.4; cursor: not-allowed; }
        .compare-toggle--on {
          background: rgba(201,162,39,0.18);
          border-color: var(--brass);
          color: var(--paper);
        }
        .official-links { display: flex; flex-wrap: wrap; gap: 8px; }
        .official-links--compact {
          display: flex; flex-direction: column; gap: 4px; align-items: flex-start;
        }
        .official-links--compact a {
          color: var(--brass);
          font-size: 12px;
          font-family: 'IBM Plex Mono', monospace;
        }
        .weights-panel {
          max-width: 1040px;
          margin: 0 auto 22px;
          background: var(--ink-soft);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 18px 20px 16px;
        }
        .weights-head {
          display: flex; gap: 12px; align-items: flex-start; margin-bottom: 14px; color: var(--brass);
        }
        .weights-lead {
          margin: 6px 0 0;
          font-size: 12.5px;
          line-height: 1.5;
          color: rgba(237,231,214,0.65);
        }
        .weights-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 12px 18px;
          margin-bottom: 12px;
        }
        .weight-row { display: flex; flex-direction: column; gap: 6px; }
        .weight-label {
          display: flex; justify-content: space-between; gap: 8px;
          font-size: 12px; color: rgba(237,231,214,0.85);
        }
        .weight-val {
          font-family: 'IBM Plex Mono', monospace;
          color: var(--brass);
          font-weight: 600;
        }
        .weight-row input[type="range"] { width: 100%; accent-color: var(--brass); }
        .compare-bar {
          position: sticky;
          bottom: 0;
          z-index: 40;
          margin-top: 20px;
          padding: 12px 0 4px;
          background: linear-gradient(to top, var(--ink) 70%, transparent);
        }
        .compare-bar-inner {
          max-width: 1040px;
          margin: 0 auto;
          background: var(--ink-soft);
          border: 1px solid var(--brass);
          border-radius: 12px;
          padding: 12px 14px;
          display: flex;
          flex-wrap: wrap;
          gap: 10px 14px;
          align-items: center;
          justify-content: space-between;
        }
        .compare-bar-label {
          display: inline-flex; align-items: center; gap: 6px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: var(--brass);
          font-weight: 600;
        }
        .compare-bar-names { display: flex; flex-wrap: wrap; gap: 6px; flex: 1; }
        .compare-chip {
          font-size: 12px;
          background: rgba(237,231,214,0.08);
          border: 1px solid var(--line);
          border-radius: 999px;
          padding: 3px 10px;
          color: var(--paper);
        }
        .compare-bar-actions { display: flex; gap: 8px; flex-wrap: wrap; }
        .panel--wide { width: min(960px, 100%); }
        .compare-table-wrap { overflow-x: auto; margin-top: 8px; }
        .compare-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12.5px;
          min-width: 520px;
        }
        .compare-table th, .compare-table td {
          border-bottom: 1px solid var(--line);
          padding: 10px 12px;
          text-align: left;
          vertical-align: top;
          color: rgba(237,231,214,0.85);
        }
        .compare-table thead th {
          color: var(--brass);
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .compare-table tbody th {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px;
          color: var(--brass);
          white-space: nowrap;
          width: 120px;
        }
        .compare-school-btn {
          background: none;
          border: none;
          color: var(--paper);
          font-family: 'Source Serif 4', serif;
          font-size: 16px;
          font-weight: 700;
          padding: 0;
          text-align: left;
        }
        .compare-school-btn:hover { color: var(--brass); }
        .card-goodfor {
          font-size: 12.5px;
          color: rgba(237,231,214,0.65);
          margin: -6px 0 0;
          line-height: 1.4;
        }

        .fit-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 10.5px;
          font-weight: 600;
          padding: 3px 9px;
          border-radius: 20px;
          border: 1px solid;
          width: fit-content;
        }

        .star-rating { display: flex; gap: 3px; align-items: center; width: fit-content; }
        .star-btn {
          background: none;
          border: none;
          padding: 2px;
          line-height: 0;
          color: var(--brass);
          transition: transform .1s;
        }
        .star-btn:hover { transform: scale(1.15); }

        .card-stats { display: flex; flex-wrap: wrap; gap: 12px 16px; margin-top: 4px; }
        .stat { display: flex; align-items: flex-start; gap: 6px; color: rgba(237,231,214,0.85); min-width: 0; }
        .stat-val { font-family: 'IBM Plex Mono', monospace; font-size: 14px; font-weight: 600; color: var(--paper); }
        .stat-label { font-size: 10.5px; color: rgba(237,231,214,0.55); }

        .dial-wrap { display: flex; flex-direction: column; align-items: center; margin-top: 2px; }
        .dial-svg { width: 110px; height: 62px; }
        .dial-labels {
          display: flex; justify-content: space-between; width: 110px;
          font-size: 9.5px; font-family: 'IBM Plex Mono', monospace;
          color: rgba(237,231,214,0.5); margin-top: -4px;
        }

        .card-open {
          display: flex; align-items: center; gap: 4px;
          font-size: 12px; font-weight: 600; color: var(--brass);
          margin-left: auto;
        }

        .chart-card {
          max-width: 1040px;
          margin: 0 auto 36px;
          background: var(--ink-soft);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 20px 20px 8px;
        }
        .chart-title {
          font-family: 'Source Serif 4', serif;
          font-size: 18px;
          font-weight: 700;
          color: var(--paper);
          margin: 0 0 6px;
        }
        .chart-legend { display: flex; gap: 16px; padding: 4px 0 14px; }
        .legend-item { display: flex; align-items: center; gap: 6px; font-size: 11.5px; font-family: 'IBM Plex Mono', monospace; color: rgba(237,231,214,0.7); }
        .legend-swatch { width: 9px; height: 9px; border-radius: 2px; display: inline-block; }

        .also-check { max-width: 1040px; margin: 0 auto; }
        .also-check-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 14px;
          margin-top: 14px;
        }
        .also-check-card {
          display: flex; gap: 12px;
          background: var(--ink-soft);
          border: 1px solid var(--line);
          border-radius: 10px;
          padding: 16px;
        }
        .also-check-num {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          color: var(--rust);
          font-weight: 600;
        }
        .also-check-card h4 {
          font-family: 'Source Serif 4', serif;
          font-size: 15px;
          margin: 0 0 6px;
          color: var(--paper);
        }
        .also-check-card p {
          font-size: 12.5px;
          line-height: 1.5;
          color: rgba(237,231,214,0.72);
          margin: 0;
        }

        .overlay {
          position: fixed; inset: 0;
          background: rgba(10,18,14,0.72);
          display: flex; align-items: center; justify-content: center;
          padding: 24px;
          z-index: 50;
        }
        .panel {
          background: var(--ink);
          width: min(700px, 100%);
          max-height: min(86vh, 880px);
          overflow-y: auto;
          padding: 32px 32px 44px;
          border: 1px solid var(--line);
          border-radius: 14px;
          position: relative;
          box-shadow: 0 30px 70px rgba(0,0,0,0.5);
        }
        .panel-close {
          position: absolute; top: 20px; right: 20px;
          background: var(--ink-soft);
          border: 1px solid var(--line);
          border-radius: 50%;
          width: 34px; height: 34px;
          display: flex; align-items: center; justify-content: center;
          color: var(--chalk);
        }
        .panel-head { padding-right: 40px; margin-bottom: 18px; }
        .panel-head h2 {
          font-family: 'Source Serif 4', serif;
          font-size: 24px;
          color: var(--paper);
          margin: 10px 0 6px;
        }
        .panel-sub {
          display: flex; align-items: center; gap: 5px;
          font-size: 12.5px; color: rgba(237,231,214,0.6);
          margin: 0;
        }

        .detail-section {
          border-top: 1px solid var(--line);
          padding: 16px 0;
        }
        .detail-section-head { display: flex; align-items: center; gap: 8px; color: var(--brass); margin-bottom: 8px; }
        .detail-section-head h4 {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11.5px;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin: 0;
          color: var(--brass);
        }
        .detail-note { font-size: 13.5px; line-height: 1.6; color: rgba(237,231,214,0.82); margin: 6px 0; }
        .detail-note--strong { font-weight: 600; color: var(--paper); font-size: 14.5px; }
        .detail-big-stat {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 26px;
          font-weight: 600;
          color: var(--paper);
          margin: 0 0 6px;
        }
        .detail-big-stat span { font-size: 12px; font-family: 'IBM Plex Sans', sans-serif; color: rgba(237,231,214,0.55); margin-left: 8px; font-weight: 400; }

        .cost-row { display: flex; gap: 28px; flex-wrap: wrap; }
        .cost-big { font-family: 'IBM Plex Mono', monospace; font-size: 24px; font-weight: 600; color: var(--paper); }
        .cost-big--secondary { color: rgba(237,231,214,0.6); font-size: 18px; }
        .cost-label { font-size: 11px; color: rgba(237,231,214,0.55); margin-top: 2px; }

        .extras-list { margin: 4px 0 0; padding-left: 18px; }
        .extras-list li { font-size: 13px; line-height: 1.6; color: rgba(237,231,214,0.82); margin-bottom: 8px; }

        .footnote {
          max-width: 1040px; margin: 30px auto 0;
          font-size: 11.5px; color: rgba(237,231,214,0.45);
          border-top: 1px solid var(--line); padding-top: 16px;
          line-height: 1.6;
        }
      `}</style>

      <div className="hero">
        <p className="hero-eyebrow">California shortlist — business + history / poli sci minor</p>
        <h1>25 schools, filtered for 3.67 UW / 3.79 weighted</h1>
        <p>
          End-of-junior-year GPAs: <strong>3.67 unweighted</strong> and{" "}
          <strong>3.79 weighted</strong>. Every UC he still has a realistic shot at, plus CSUs,
          Northern California private options, and UW Seattle — spanning Northern California, the
          Central Coast, the Central Valley, San Diego, the Inland Empire, and Seattle. Tap any
          school for the full picture.
        </p>
      </div>

      <div className="scope-note">
        <strong>What's out, and why:</strong> UC Berkeley and UCLA are both out — overall admit GPAs
        at Berkeley run well above this profile (avg weighted ~4.5) and Haas adds its own tougher
        internal admit on top of that; UCLA averages ~3.93 unweighted with an ~8.6% acceptance rate.
        Every other UC is included, badged &quot;likely&quot; or &quot;competitive&quot; based on how
        a <strong>3.67 unweighted / 3.79 weighted</strong> profile stacks up. UW Seattle is the one
        out-of-state school — California residents pay nonresident tuition. Tap the stars on any
        card to rate it yourselves — ratings save automatically in this browser.
      </div>

      <div className="controls">
        <div className="filter-group">
          {["All", "UC", "CSU", "Private", "OOS"].map((t) => (
            <button
              key={t}
              className={"filter-btn" + (filter === t ? " active" : "")}
              onClick={() => setFilter(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="controls-right">
          <div className="view-toggle">
            <button
              className={"view-toggle-btn" + (view === "cards" ? " active" : "")}
              onClick={() => setView("cards")}
            >
              <LayoutGrid size={13} strokeWidth={2.2} /> Cards
            </button>
            <button
              className={"view-toggle-btn" + (view === "spreadsheet" ? " active" : "")}
              onClick={() => setView("spreadsheet")}
            >
              <TableIcon size={13} strokeWidth={2.2} /> Spreadsheet
            </button>
          </div>
          <select className="sort-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="match">Sort: match score, high to low</option>
            <option value="distance">Sort: distance, near to far</option>
            <option value="name">Sort: A–Z</option>
            <option value="cost">Sort: cost, low to high</option>
            <option value="acceptance">Sort: acceptance rate, low to high</option>
            <option value="rating">Sort: your rating, high to low</option>
          </select>
        </div>
      </div>

      <WeightsPanel weights={weights} onChange={updateWeights} />

      {view === "cards" ? (
        <div className="grid">
          {filtered.map((s) => (
            <SchoolCard
              key={s.id}
              school={s}
              rating={ratings[s.id] || 0}
              onRate={rateSchool}
              onOpen={setSelected}
              matchScore={scores[s.id]}
              comparing={compareIds.includes(s.id)}
              compareDisabled={compareIds.length >= 3}
              onToggleCompare={toggleCompare}
            />
          ))}
        </div>
      ) : (
        <SpreadsheetView
          schools={filtered}
          ratings={ratings}
          onRate={rateSchool}
          onOpen={setSelected}
        />
      )}

      <CostChart schools={filtered} />
      <EcStrategySection />
      <AlsoCheckSection />
      <TimelineSection checks={timelineChecks} onToggle={toggleTimeline} />

      <CompareBar
        schools={compareSchools}
        onOpen={() => setShowCompare(true)}
        onClear={() => {
          setCompareIds([]);
          setShowCompare(false);
        }}
      />

      <p className="footnote">
        Figures are rounded and based on each school's most recently published cost, admissions, and
        housing data as of 2026. Acceptance rates, GPA bands, and costs change year to year — confirm
        current numbers on each school's admissions and financial aid pages before applying. "Likely at
        3.67 UW" / "Competitive at 3.67 UW" reflect how a 3.67 unweighted / 3.79 weighted junior-year
        GPA compares to each school's published average or middle-50% range, not a guarantee of
        admission — holistic factors,
        specific major impaction, and course rigor all matter too. Campus-life ratings are informed
        estimates based on housing guarantees and published student surveys, not official
        commuter-percentage data from every school.         Weather figures are approximate long-run
        July/January daytime highs for the campus city — not a forecast.
        Application deadlines are the main fall-entry targets (UC Application / Cal State
        Apply Nov 30 for publics; typical Regular Decision for privates) — confirm each
        cycle on the school site.         Average class sizes are approximate campus-wide figures;
        required lower-division lectures are often larger.         Financial-aid notes are
        high-level snapshots — award amounts and rules change yearly; confirm with each
        school&apos;s net price calculator and offer letter.         Extracurricular weight tags are
        relative guidance for this shortlist, not official admissions formulas.
        Student-vibe notes are curated themes from public review sites and campus forums —
        not representative surveys or star ratings.
      </p>

      {selected && (
        <DetailPanel
          school={
            enrichedSchools.find((s) => s.id === selected.id) || selected
          }
          rating={ratings[selected.id] || 0}
          onRate={rateSchool}
          onClose={() => setSelected(null)}
        />
      )}

      {showCompare && compareSchools.length >= 2 && (
        <ComparePanel
          schools={compareSchools}
          scores={scores}
          onClose={() => setShowCompare(false)}
          onOpenSchool={setSelected}
        />
      )}
    </div>
  );
}
