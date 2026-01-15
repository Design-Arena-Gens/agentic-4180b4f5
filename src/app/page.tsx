"use client";

import { useState } from "react";
import {
  CTA_PRESETS,
  TONE_PRESETS,
  TRENDING_TOPICS_2026,
} from "@/lib/data";
import {
  GeneratedScript,
  generateYoutubeScript,
  selectTrendingTopic,
} from "@/lib/generate-script";

const formatScriptForCopy = (script: GeneratedScript) => {
  const lines: string[] = [
    script.title,
    "",
    ...script.intro,
    "",
    ...script.sections.flatMap((section) => {
      const sectionLines = [`${section.heading.toUpperCase()}:`];
      if (section.paragraphs) {
        sectionLines.push(...section.paragraphs);
      }
      if (section.bullets) {
        sectionLines.push(...section.bullets.map((bullet) => `• ${bullet}`));
      }
      sectionLines.push("");
      return sectionLines;
    }),
    "COUNTRY-BY-COUNTRY IMPACT:",
    ...script.regions.map(
      (region) =>
        `${region.region}: ${region.detail} This wave centers on ${region.focus}.`,
    ),
  ];

  if (script.actionIdeas) {
    lines.push("", "STORYBOARD IDEAS:");
    lines.push(...script.actionIdeas.map((idea, idx) => `${idx + 1}. ${idea}`));
  }

  lines.push("", `CTA: ${script.cta}`);
  return lines.join("\n");
};

const runtimeOptions = [
  { label: "5 min breakout", value: 5 },
  { label: "8 min deep dive", value: 8 },
  { label: "12 min docu style", value: 12 },
];

export default function Home() {
  const [topic, setTopic] = useState<string>(selectTrendingTopic());
  const [tone, setTone] = useState<(typeof TONE_PRESETS)[number]["id"]>("explainer");
  const [hostName, setHostName] = useState("Alex");
  const [runtime, setRuntime] = useState(8);
  const [includeActionIdeas, setIncludeActionIdeas] = useState(true);
  const [customCta, setCustomCta] = useState("");
  const [script, setScript] = useState<GeneratedScript | null>(null);
  const [isCopied, setIsCopied] = useState(false);

  const handleGenerate = () => {
    const result = generateYoutubeScript({
      topic,
      tone,
      hostName,
      runtime,
      includeActionIdeas,
      customCta,
    });
    setScript(result);
    setIsCopied(false);
  };

  const handleCopy = async () => {
    if (!script) return;
    await navigator.clipboard.writeText(formatScriptForCopy(script));
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 3200);
  };

  const handleRandomTopic = () => {
    setTopic(selectTrendingTopic());
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)] text-slate-50">
      <main className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-6 pb-24 pt-16">
        <header className="flex flex-col gap-3">
          <p className="inline-flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs uppercase tracking-[0.28em] text-indigo-200">
            Agentic YouTube Script Generator · 2026
          </p>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
            Rapid-fire scripts engineered for USA, UK, and China audiences.
          </h1>
          <p className="max-w-3xl text-base text-slate-300 sm:text-lg">
            Blend regional insight, futuristic tone, and precise structure in seconds.
            Crafted for hybrid creators shipping across Vercel-powered channels.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[minmax(0,360px)_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-indigo-500/20 backdrop-blur">
            <div className="flex items-start justify-between gap-4">
              <h2 className="text-xl font-semibold text-white">Episode Brief</h2>
              <button
                type="button"
                onClick={handleRandomTopic}
                className="rounded-full border border-white/30 px-3 py-1 text-xs font-medium text-indigo-100 transition hover:border-indigo-200 hover:bg-indigo-500/20"
              >
                Spin Topic
              </button>
            </div>

            <label className="mt-5 flex flex-col gap-2">
              <span className="text-sm font-medium text-indigo-100">Trending Topic</span>
              <select
                className="w-full rounded-2xl border border-white/20 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none transition hover:border-indigo-300 focus:ring-2 focus:ring-indigo-400"
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
              >
                {TRENDING_TOPICS_2026.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </label>

            <label className="mt-5 flex flex-col gap-2">
              <span className="text-sm font-medium text-indigo-100">Host Name</span>
              <input
                className="rounded-2xl border border-white/20 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none transition hover:border-indigo-300 focus:ring-2 focus:ring-indigo-400"
                value={hostName}
                onChange={(event) => setHostName(event.target.value)}
                placeholder="Enter who is presenting this episode"
              />
            </label>

            <div className="mt-5">
              <span className="text-sm font-medium text-indigo-100">Tone DNA</span>
              <div className="mt-3 grid gap-3">
                {TONE_PRESETS.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setTone(preset.id)}
                    className={`rounded-2xl border px-4 py-3 text-left transition ${
                      tone === preset.id
                        ? "border-indigo-300 bg-indigo-500/20 text-white"
                        : "border-white/15 bg-slate-900/40 text-slate-200 hover:border-indigo-200 hover:bg-indigo-500/10"
                    }`}
                  >
                    <span className="text-sm font-semibold uppercase tracking-[0.22em] text-indigo-200">
                      {preset.label}
                    </span>
                    <p className="mt-2 text-sm leading-relaxed text-slate-200">
                      {preset.descriptors.join(" · ")}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 flex flex-col gap-2">
              <span className="text-sm font-medium text-indigo-100">Runtime Target</span>
              <div className="grid grid-cols-3 gap-3">
                {runtimeOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setRuntime(option.value)}
                    className={`rounded-2xl border px-3 py-2 text-center text-xs font-semibold uppercase tracking-wide transition ${
                      runtime === option.value
                        ? "border-indigo-300 bg-indigo-500/25 text-white"
                        : "border-white/15 bg-slate-900/40 text-slate-200 hover:border-indigo-200 hover:bg-indigo-500/10"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            <label className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/40 px-4 py-3">
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  Include storyboard prompts
                </p>
                <p className="text-xs text-slate-400">
                  Cue visual beats for editors and AI scene tools.
                </p>
              </div>
              <input
                type="checkbox"
                checked={includeActionIdeas}
                onChange={(event) => setIncludeActionIdeas(event.target.checked)}
                className="h-5 w-5 rounded border border-white/30 bg-slate-900 text-indigo-400 accent-indigo-400"
              />
            </label>

            <label className="mt-6 flex flex-col gap-2">
              <span className="text-sm font-medium text-indigo-100">
                Custom Call To Action
              </span>
              <textarea
                className="min-h-[90px] rounded-2xl border border-white/20 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 outline-none transition hover:border-indigo-300 focus:ring-2 focus:ring-indigo-400"
                value={customCta}
                onChange={(event) => setCustomCta(event.target.value)}
                placeholder={`e.g. ${CTA_PRESETS[0]}`}
              />
            </label>

            <button
              type="button"
              onClick={handleGenerate}
              className="mt-8 w-full rounded-2xl bg-indigo-500 px-5 py-3 text-sm font-semibold uppercase tracking-[0.28em] text-slate-900 transition hover:bg-indigo-400"
            >
              Launch Script
            </button>
          </aside>

          <section className="rounded-3xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl shadow-blue-900/30 backdrop-blur">
            {script ? (
              <div className="flex h-full flex-col gap-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
                  <div>
                    <p className="text-sm uppercase tracking-[0.32em] text-indigo-200">
                      Final Script Blueprint
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">
                      {script.title}
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="rounded-full border border-indigo-300 px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-indigo-100 transition hover:bg-indigo-500/20"
                  >
                    {isCopied ? "Copied!" : "Copy Script"}
                  </button>
                </div>

                <div className="space-y-6 overflow-y-auto pr-1 text-sm leading-relaxed text-slate-100 lg:max-h-[68vh]">
                  <article className="space-y-2 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    {script.intro.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </article>

                  {script.sections.map((section) => (
                    <article
                      key={section.heading}
                      className="space-y-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4"
                    >
                      <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-200">
                        {section.heading}
                      </h3>
                      {section.paragraphs?.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.bullets && (
                        <ul className="space-y-2 pl-4 text-slate-200">
                          {section.bullets.map((bullet) => (
                            <li key={bullet} className="list-disc">
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      )}
                    </article>
                  ))}

                  <article className="space-y-3 rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-200">
                      Country-by-Country Impact
                    </h3>
                    <div className="grid gap-3 sm:grid-cols-3">
                      {script.regions.map((region) => (
                        <div
                          key={region.region}
                          className="rounded-2xl border border-white/10 bg-slate-900/60 p-3"
                        >
                          <p className="text-xs font-semibold uppercase tracking-[0.32em] text-indigo-200">
                            {region.region}
                          </p>
                          <p className="mt-2 text-xs text-indigo-100">
                            Anchor Focus: {region.focus}
                          </p>
                          <p className="mt-2 text-sm text-slate-100">
                            {region.detail}
                          </p>
                        </div>
                      ))}
                    </div>
                  </article>

                  {script.actionIdeas && (
                    <article className="space-y-3 rounded-2xl border border-indigo-500/30 bg-indigo-500/10 p-4">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-200">
                        Storyboard Prompts
                      </h3>
                      <ol className="space-y-2 pl-4 text-slate-100">
                        {script.actionIdeas.map((idea) => (
                          <li key={idea} className="list-decimal">
                            {idea}
                          </li>
                        ))}
                      </ol>
                    </article>
                  )}

                  <article className="rounded-2xl border border-white/5 bg-white/[0.02] p-4">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.28em] text-indigo-200">
                      CTA
                    </h3>
                    <p className="mt-2 text-base text-white">{script.cta}</p>
                  </article>
                </div>
              </div>
            ) : (
              <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                <p className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs uppercase tracking-[0.28em] text-indigo-200">
                  awaiting launch
                </p>
                <h2 className="max-w-xl text-3xl font-semibold text-white">
                  Draft the 2026 trend story your global audience will binge.
                </h2>
                <p className="max-w-lg text-sm text-slate-300">
                  Configure the brief on the left, then generate a ready-to-record
                  script engineered for USA, UK, and China viewers—complete with hooks,
                  pacing, and storyboard beats.
                </p>
              </div>
            )}
          </section>
        </section>
      </main>
    </div>
  );
}
