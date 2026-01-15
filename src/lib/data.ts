export const TRENDING_TOPICS_2026 = [
  "AI Personal Assistants",
  "Smart Glasses with AR",
  "AI Doctors & Health Bots",
  "Autonomous Electric Vehicles",
  "Humanoid Robots at Home",
  "AI-Powered Education",
  "Brain-Computer Interfaces",
  "Climate Tech Innovations",
  "Digital Humans & Avatars",
  "AI Content Creation Economy",
] as const;

export const REGIONAL_ANGLES = {
  USA: "innovation and consumer adoption",
  UK: "education and ethical AI usage",
  China: "large-scale deployment and smart cities",
} as const;

export const PRODUCTION_YEAR = 2026;

export const TONE_PRESETS = [
  {
    id: "explainer",
    label: "Explainer",
    descriptors: [
      "clear storytelling",
      "data-backed insights",
      "grounded optimism",
    ],
  },
  {
    id: "hype",
    label: "High Energy",
    descriptors: [
      "fast pacing",
      "dramatic hooks",
      "bold future-forward language",
    ],
  },
  {
    id: "analytical",
    label: "Analytical",
    descriptors: [
      "market signals",
      "economic impact",
      "policy implications",
    ],
  },
] as const;

export const CTA_PRESETS = [
  "Subscribe for weekly breakthroughs you can use today.",
  "Join our community of future builders—like, share, and turn on alerts.",
  "Drop your thoughts in the comments and help shape the next deep-dive.",
] as const;
