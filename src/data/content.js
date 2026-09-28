import {
  Activity,
  ArrowLeftRight,
  BadgeCheck,
  BarChart3,
  BrainCircuit,
  CalendarClock,
  Crosshair,
  Download,
  FileBarChart,
  FileCheck2,
  Fingerprint,
  GaugeCircle,
  GitCompareArrows,
  Globe2,
  LayoutDashboard,
  LineChart,
  Lock,
  MapPin,
  MonitorPlay,
  MousePointerClick,
  Network,
  Radio,
  RadioTower,
  Repeat2,
  ShieldCheck,
  SlidersHorizontal,
  Upload,
  Users,
  Wrench,
  Zap,
} from 'lucide-react';

export const APP_URL = 'https://app.ddosphere.com/login';
export const USER_GUIDE_URL = 'https://ddosphere.gitbook.io/ddosphere';

export const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Attack Types', href: '#attack-types' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'FAQ', href: '#faq' },
];

export const HERO = {
  eyebrow: 'Authorized cloud-based resilience testing',
  titleTop: 'Prove Your Defenses Against',
  titleBottom: 'Real-World DDoS Pressure',
  description:
    'Ddosphere is an enterprise, cloud-based platform for authorized DDoS resilience testing. Simulate real distributed load on infrastructure you own — under explicit authorization and defined scope — to validate mitigation, measure recovery, and prove your defenses hold.',
};

// Shown as a compliance/authorization strip under the hero.
export const AUTHORIZATION = {
  note: 'Ddosphere is a controlled testing platform. Every engagement requires verified ownership of the target and a signed authorization scope. Emergency stop is available at any time.',
};

export const FEATURES = [
  { icon: Zap, title: 'Fast to Launch', text: 'Configure and run cloud-based resilience tests in minutes — no infrastructure to provision' },
  { icon: Globe2, title: 'Global Coverage', text: 'Simulate distributed load from multiple regions worldwide to mirror real traffic patterns' },
  { icon: MousePointerClick, title: 'Simple by Design', text: 'A clear, guided interface that makes complex test scenarios quick to set up and run' },
  { icon: CalendarClock, title: 'Scheduled Testing', text: 'Plan and automate resilience tests around your maintenance and release windows' },
  {
    icon: GitCompareArrows,
    title: 'Result Comparison',
    text: 'Compare test runs over time to track progress and evaluate different scenarios side by side',
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    text: 'Manage roles across your organization with granular permissions, including read-only Observer access',
  },
  { icon: FileBarChart, title: 'Detailed Reporting', text: 'Receive comprehensive, shareable reports on every resilience test simulation' },
  { icon: MapPin, title: 'Regional Origins', text: 'Validate your defenses against traffic originating from different geographic regions' },
  { icon: LayoutDashboard, title: 'Dashboard by Assets', text: 'Organize, monitor, and report on test activity grouped by the assets you own' },
  { icon: FileCheck2, title: 'Scoped Test Scenarios', text: 'Design test scenarios tailored to your systems, within your authorized scope' },
];

export const BENEFITS = [
  { icon: BrainCircuit, title: 'Institutional Knowledge', text: 'Build a lasting record of past tests — learn from every run and shape a stronger security posture' },
  { icon: MonitorPlay, title: 'Live Monitoring', text: 'Watch each resilience test unfold in real time and stop it the moment you need to' },
  { icon: BarChart3, title: 'Comparison Tool', text: 'Analyze and compare different test scenarios to see what moves the needle' },
  { icon: GaugeCircle, title: 'DRR Score', text: "Quantify your system's resilience with our proprietary DDoS Resilience Rating" },
];

// Industries served (not customer logos). Swap in real customer/partner names when available.
export const TRUST = {
  heading: 'Purpose-built for security & infrastructure teams across',
  logos: ['Fintech', 'Hosting & Cloud', 'Telecom', 'E-commerce', 'Public Sector', 'Gaming', 'Enterprise SOCs'],
};

export const COMPLIANCE = [
  { icon: FileCheck2, title: 'Authorized use only', text: 'Verified target ownership and a signed scope are required before any test can run' },
  { icon: Lock, title: 'Data protection', text: 'Encrypted in transit and at rest, with configurable data-retention windows per plan' },
  { icon: ShieldCheck, title: 'Controlled & reversible', text: 'Rate-limited scenarios with an always-available emergency stop' },
  { icon: BadgeCheck, title: 'TÜBİTAK-supported R&D', text: 'Developed under the TÜBİTAK TEYDEB program by Virgosol IT (Project No: 3221019)' },
];

export const STEPS = [
  { icon: Fingerprint, label: 'Authorize', text: 'Verify ownership of the target and confirm your test scope' },
  { icon: Crosshair, label: 'Target', text: 'Select the asset and endpoint you are authorized to test' },
  { icon: SlidersHorizontal, label: 'Configure', text: 'Choose the metric, level, and regions for your test scenario' },
  { icon: Globe2, label: 'Simulate', text: 'Run a distributed resilience test from regions around the world' },
  { icon: Activity, label: 'Monitor', text: 'Watch it live — real-time monitoring, with emergency stop on hand' },
  { icon: LineChart, label: 'Analyze', text: 'Review your results and DRR Score, then fine-tune future tests' },
];

export const ATTACK_TYPES = [
  {
    icon: Network,
    title: 'TCP SYN',
    text: 'Simulates a flood of TCP SYN connection requests to measure how your servers cope with half-open connection (SYN) exhaustion.',
  },
  {
    icon: ArrowLeftRight,
    title: 'TCP ACK',
    text: 'Sends a sustained stream of TCP ACK packets to validate how stateful devices and services hold up under ACK-flood pressure.',
  },
  {
    icon: Repeat2,
    title: 'TCP SYN-ACK',
    text: 'Generates SYN-ACK traffic to test how your stack handles unsolicited handshake responses at high volume.',
  },
  {
    icon: Download,
    title: 'HTTP(S) GET',
    text: 'Drives intense HTTP(S) GET request volume to gauge how your web tier and CDN absorb Layer-7 read pressure.',
  },
  {
    icon: Upload,
    title: 'HTTP(S) POST',
    text: 'Overloads endpoints with HTTP(S) POST requests to measure the resilience of write-heavy application paths.',
  },
  {
    icon: Radio,
    title: 'UDP',
    text: 'Floods the target with high-volume UDP traffic to test bandwidth saturation and stateless-filtering defenses.',
  },
  {
    icon: RadioTower,
    title: 'ICMP',
    text: 'Sends large volumes of ICMP traffic to validate network-layer rate limiting and edge filtering.',
  },
];

export const ATTACK_LEVELS = {
  heading: 'Attack',
  highlight: 'Levels',
  description:
    'Test scenarios are defined at five levels, each representing the maximum load a test can place on the network. Every level maps to specific BPS, PPS, and TPS values.',
  image: '/vol.svg',
};

export const PLANS = [
  {
    name: 'Silver',
    price: 1700,
    features: [
      'Level: 1-2',
      'Geolocation: Up to 2',
      'Concurrent Tests: 1',
      'Duration: 1 hour',
      '1 domain',
      'Data Retention: 30 days',
      'Unlimited Team Members',
    ],
  },
  {
    name: 'Gold',
    price: 2700,
    featured: true,
    features: [
      'Level: 1-2-3',
      'Geolocation: Up to 3',
      'Concurrent Tests: 3',
      'Duration: 3 hours',
      'Up to 3 domains',
      'Data Retention: 180 days',
      'Unlimited Team Members',
    ],
  },
  {
    name: 'Platinum',
    price: 6500,
    features: [
      'Level: 1-2-3-4',
      'Geolocation: Up to 5',
      'Concurrent Tests: 5',
      'Duration: 5 hours',
      'Unlimited domains',
      'Parallel Execution',
      'Data Retention: 365 days',
      'Unlimited Team Members',
    ],
  },
];

export const TESTIMONIALS = [
  {
    quote:
      'We finally have hard numbers on how our stack behaves under distributed load. The DRR Score gave our board a metric they could actually track quarter over quarter.',
    name: 'Head of Infrastructure',
    role: 'Managed hosting provider',
  },
  {
    quote:
      'The authorization and scope controls made it an easy sign-off for our security and legal teams. Live monitoring plus emergency stop meant we ran tests in production with confidence.',
    name: 'Security Lead',
    role: 'Fintech platform',
  },
];

export const FAQS = [
  {
    q: 'What is Ddosphere?',
    a: 'Ddosphere is an enterprise platform for authorized DDoS resilience testing. It lets teams safely simulate distributed load against infrastructure they own — under explicit authorization and a defined scope — to validate their mitigation, measure recovery, and strengthen defenses.',
  },
  {
    q: 'Who is allowed to run a test?',
    a: 'Only organizations testing infrastructure they own or are explicitly authorized to test. Every engagement requires verified target ownership and a signed authorization scope before a test can be launched. Ddosphere is not a service for targeting third parties.',
  },
  {
    q: 'How are the resilience tests performed?',
    a: 'Distributed test nodes deployed across different global regions generate controlled, rate-limited traffic toward your authorized target, mirroring real-world distributed load so you can measure how your defenses respond.',
  },
  {
    q: 'Can I stop a test immediately if something looks wrong?',
    a: 'Yes. An emergency stop is available at all times — click “Stop” and confirm, and the test halts immediately.',
  },
  {
    q: 'Can a test run for less than one hour?',
    a: 'The minimum scheduled test duration is one hour, but you can end any test early at any time using the emergency stop.',
  },
  {
    q: 'How is my data handled?',
    a: 'Test data is encrypted in transit and at rest, and retained according to your plan’s data-retention window (30 to 365 days). You control the console throughout the scheduled test window.',
  },
];

export const CONTACT = {
  office: 'Berlin, GERMANY / Istanbul, TÜRKİYE',
  phone: '+90 533 672 0103',
  email: 'info@ddosphere.com',
  heading: 'Let’s discuss your resilience-testing needs with our expert team.',
  text: 'Tell us about your infrastructure and goals — we’ll help you scope a safe, authorized testing program.',
  tubitak:
    'This project is being developed by utilizing the TÜBİTAK TEYDEB Support Program (Project No: 3221019). However, all responsibility for the product/service belongs to Virgosol IT and Software Solutions A.Ş.',
};
