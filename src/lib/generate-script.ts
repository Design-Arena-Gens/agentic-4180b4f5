import {
  CTA_PRESETS,
  PRODUCTION_YEAR,
  REGIONAL_ANGLES,
  TRENDING_TOPICS_2026,
} from "./data";

type TonePresetId = "explainer" | "hype" | "analytical";

export interface ScriptConfig {
  topic: string;
  tone: TonePresetId;
  hostName: string;
  runtime: number;
  includeActionIdeas: boolean;
  customCta?: string;
}

export interface ScriptSection {
  heading: string;
  bullets?: string[];
  paragraphs?: string[];
}

export interface RegionInsight {
  region: keyof typeof REGIONAL_ANGLES;
  focus: string;
  detail: string;
}

export interface GeneratedScript {
  title: string;
  intro: string[];
  sections: ScriptSection[];
  regions: RegionInsight[];
  actionIdeas?: string[];
  cta: string;
}

const toneNarratives: Record<TonePresetId, string> = {
  explainer:
    "We break down how the technology works today and what mainstream adoption really looks like.",
  hype: "Momentum is electric—platform updates, hardware drops, and viral creator ecosystems are pushing this into the cultural spotlight.",
  analytical:
    "We dig into the data signals, industry roadmaps, and policy shifts that explain why this tech is accelerating right now.",
};

const toneHook: Record<TonePresetId, string> = {
  explainer:
    "Imagine waking up tomorrow and realizing this tech is already powering your daily routine.",
  hype: "This is the breakthrough that has Silicon Valley buzzing and Beijing doubling down.",
  analytical:
    "Markets, regulators, and classrooms are aligning around one fast-moving innovation curve.",
};

const runtimeDescriptors = (runtime: number) => {
  if (runtime <= 5) {
    return {
      pace: "tight 5-minute segment tailored for attention-grabbing shorts feed distribution",
      format: "Make every sentence purposeful—think crisp narration with quick-cut visuals.",
    };
  }

  if (runtime <= 10) {
    return {
      pace: "8-minute deep dive that balances story, stats, and speculation",
      format: "Layer narrative beats with B-roll cues and lower-thirds to keep viewers anchored.",
    };
  }

  return {
    pace: "12-minute documentary-style narrative with breathing room for expert quotes and data overlays",
    format: "Use chapter markers and on-screen callouts to keep the pacing structured.",
  };
};

const buildActionIdeas = (topic: string): string[] => [
  `Showcase a day-in-the-life sequence of someone using ${topic} across morning, work, and evening routines.`,
  `Include a data visualization comparing adoption curves for ${topic} in the USA, UK, and China from 2021 through ${PRODUCTION_YEAR}.`,
  `Interview a regional expert or creator who has built a business around ${topic} in their local market.`,
];

const resolveCta = (customCta?: string) =>
  customCta && customCta.trim().length > 0
    ? customCta.trim()
    : CTA_PRESETS[Math.floor(Math.random() * CTA_PRESETS.length)];

export const selectTrendingTopic = () =>
  TRENDING_TOPICS_2026[Math.floor(Math.random() * TRENDING_TOPICS_2026.length)];

export function generateYoutubeScript({
  topic,
  tone,
  hostName,
  runtime,
  includeActionIdeas,
  customCta,
}: ScriptConfig): GeneratedScript {
  const year = PRODUCTION_YEAR;
  const { pace, format } = runtimeDescriptors(runtime);

  const sections: ScriptSection[] = [
    {
      heading: "What Is The Trend?",
      paragraphs: [
        `${topic} represents a tipping point moment in ${year}. The tech has evolved from prototype demos into a living, breathing ecosystem with real users, real revenue, and massive cultural pull.`,
        toneNarratives[tone],
      ],
    },
    {
      heading: "Why It Is Trending",
      bullets: [
        `Breakthroughs in AI infrastructure are making ${topic.toLowerCase()} accessible to startups and solo creators.`,
        `Hardware costs are dropping while capability leaps—expect premium features from ${year - 2} to show up in entry-level devices this season.`,
        `Governments and corporations crave automation and efficiency, unlocking subsidies, pilot programs, and strategic partnerships.`,
      ],
    },
    {
      heading: "Global Momentum Snapshot",
      paragraphs: [
        `Right now, ${topic} is moving faster than the hype cycle can chart. ${pace}.`,
        `${format}`,
      ],
    },
    {
      heading: "Future Impact",
      bullets: [
        `${topic} will create new job pathways: prompt engineers, AI workflow designers, and hybrid human-machine storytellers.`,
        `Expect repetitive tasks across operations, content, and support to get reimagined or replaced entirely.`,
        `Education turns adaptive—students in ${year} will learn through simulations powered by ${topic.toLowerCase()}.`,
        `Human-tech relationships reset as ${topic.toLowerCase()} becomes as normal as smartphones did in the 2010s.`,
      ],
    },
  ];

  const regions: RegionInsight[] = (Object.keys(
    REGIONAL_ANGLES,
  ) as Array<keyof typeof REGIONAL_ANGLES>).map((region) => ({
    region,
    focus: REGIONAL_ANGLES[region],
    detail:
      region === "USA"
        ? `Investors are backing direct-to-consumer plays while legacy brands experiment with ${topic.toLowerCase()} pilots in retail and entertainment.`
        : region === "UK"
          ? `Universities and public broadcasters are stress-testing ethical guardrails, making sure ${topic.toLowerCase()} serves inclusive education and civic needs.`
          : `City-scale sandboxes across Shenzhen, Shanghai, and Chengdu are weaving ${topic.toLowerCase()} into transit, healthcare, and immersive commerce.`,
  }));

  const intro = [
    `TITLE: ${topic} Is Exploding in ${year} | USA, UK & China Explained`,
    `INTRO: ${toneHook[tone]} ${hostName} here, and today we're unpacking one of ${year}'s biggest global shifts: ${topic}.`,
    `This trend is rewriting how people live, learn, and build businesses across three powerhouse markets.`,
  ];

  const actionIdeas = includeActionIdeas ? buildActionIdeas(topic) : undefined;

  return {
    title: `${topic} Is Exploding in ${year} | USA, UK & China Explained`,
    intro,
    sections,
    regions,
    actionIdeas,
    cta: resolveCta(customCta),
  };
}
