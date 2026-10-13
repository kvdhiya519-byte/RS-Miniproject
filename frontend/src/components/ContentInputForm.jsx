import React, { useState } from 'react';
import { Sparkles, Wand2, ArrowRight, RotateCcw, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';

const PRESET_EXAMPLES = [
  {
    label: 'AI & Engineering',
    text: 'Building autonomous AI agents using LangChain and FastAPI: 5 architectural lessons we learned scaling to 100k daily workflows.',
  },
  {
    label: 'Product Launch',
    text: 'Excited to announce ContentPilot v1.0! An AI-powered engine that predicts optimal platform, audience profiles, and posting schedules with machine learning.',
  },
  {
    label: 'Tutorial Guide',
    text: 'Step-by-step tutorial: How to fine-tune open-source LLMs using LoRA and PyTorch on a single GPU in under 30 minutes.',
  },
  {
    label: 'Startup Growth',
    text: 'Why 90% of early-stage SaaS companies fail at organic content marketing, and the framework we used to reach 50,000 monthly active users organically.',
  },
];

export default function ContentInputForm({
  formData,
  onChange,
  onSubmit,
  onAutoFill,
  onReset,
  isLoading,
  isAutoFilling,
  autoFillMeta,
  healthData,
}) {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const contentTypes = healthData?.allowed_content_types || [
    'Educational',
    'Promotional',
    'Entertainment',
    'News',
    'Tutorial',
    'Product',
    'Personal/Professional',
  ];

  const goals = healthData?.allowed_goals || [
    'Engagement',
    'Reach',
    'Awareness',
    'Leads',
    'Conversions',
    'Community Growth',
  ];

  const rawPlatforms = healthData?.supported_platforms || [
    'Instagram',
    'YouTube',
    'LinkedIn',
    'X/Twitter',
    'TikTok',
    'Facebook',
  ];
  const platforms = rawPlatforms.filter((p) => !p.toLowerCase().includes('thread'));

  const audiences = [
    'General Audience',
    'Tech Enthusiasts',
    'Developers',
    'Data Scientists',
    'Business Professionals',
    'Entrepreneurs',
    'Researchers',
    'Beginners',
    'Intermediate Learners',
    'Advanced Professionals',
  ];

  const handleSelectPreset = (text) => {
    onChange('content', text);
  };

  return (
    <div className="bg-white dark:bg-[#121214] rounded-xl border border-slate-200/80 dark:border-zinc-800 shadow-xs p-5 sm:p-6 transition-colors">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
            Content Strategy Input
          </h2>
          <p className="text-xs text-slate-500 dark:text-zinc-200 mt-0.5">
            Provide your post draft, topic idea, or campaign message.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onAutoFill(formData.content)}
          disabled={isAutoFilling || !formData.content?.trim()}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-900 dark:text-white dark:hover:bg-indigo-800 border border-indigo-200 dark:border-indigo-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer shadow-xs"
          title="Auto-detect content type, audience, platform, and goal from text"
        >
          <Wand2 className={`w-3.5 h-3.5 ${isAutoFilling ? 'animate-spin' : ''}`} />
          <span>{isAutoFilling ? 'Detecting...' : 'AI Auto-Detect'}</span>
        </button>
      </div>

      {/* Content Textarea */}
      <div className="relative">
        <textarea
          rows={4}
          value={formData.content}
          onChange={(e) => onChange('content', e.target.value)}
          placeholder="Paste or type your draft, idea, or headline here (e.g., '5 key insights on fine-tuning open source models')..."
          className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-slate-50/60 dark:bg-black px-3.5 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-500 focus:border-indigo-500 dark:focus:border-indigo-500 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 transition-all resize-y"
        />
        <div className="flex items-center justify-between mt-1 text-[11px] text-slate-500 dark:text-zinc-300">
          <span>{formData.content?.trim() ? `${formData.content.trim().split(/\s+/).length} words` : '0 words'}</span>
          <span>{formData.content?.length || 0} characters</span>
        </div>
      </div>

      {/* Preset Chips */}
      <div className="mt-3 flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-bold text-slate-500 dark:text-white uppercase tracking-wider">
          Presets:
        </span>
        {PRESET_EXAMPLES.map((preset, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSelectPreset(preset.text)}
            className="text-xs px-2.5 py-1 rounded-md bg-slate-100 hover:bg-slate-200 dark:bg-[#1c1c20] dark:hover:bg-zinc-800 text-slate-700 dark:text-white font-medium transition-colors border border-slate-200 dark:border-zinc-700 cursor-pointer"
          >
            {preset.label}
          </button>
        ))}
      </div>

      {/* Auto-fill metadata pills if detected */}
      {autoFillMeta && (
        <div className="mt-3 p-3 rounded-lg bg-indigo-50/60 dark:bg-[#18181b] border border-indigo-100 dark:border-indigo-900 text-xs">
          <div className="flex items-center gap-2 mb-1.5 font-bold text-indigo-900 dark:text-white">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            <span>AI Auto-Detected Attributes:</span>
          </div>
          <div className="flex flex-wrap gap-2 text-slate-700 dark:text-white">
            <span className="bg-white dark:bg-black px-2 py-0.5 rounded border border-indigo-200 dark:border-zinc-700 text-slate-900 dark:text-white font-medium">
              Topic: <strong className="text-indigo-600 dark:text-indigo-300">{autoFillMeta.topic}</strong>
            </span>
            <span className="bg-white dark:bg-black px-2 py-0.5 rounded border border-indigo-200 dark:border-zinc-700 text-slate-900 dark:text-white font-medium">
              Sentiment: <strong className="text-emerald-600 dark:text-emerald-300">{autoFillMeta.sentiment}</strong>
            </span>
            {autoFillMeta.keywords?.length > 0 && (
              <span className="bg-white dark:bg-black px-2 py-0.5 rounded border border-indigo-200 dark:border-zinc-700 text-slate-900 dark:text-white font-medium">
                Keywords: <em className="text-slate-800 dark:text-zinc-200">{autoFillMeta.keywords.slice(0, 3).join(', ')}</em>
              </span>
            )}
          </div>
        </div>
      )}

      {/* Toggle Advanced / Override Controls */}
      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800">
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-slate-900 dark:text-white dark:hover:text-zinc-200 cursor-pointer"
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span>Targeting & Strategic Constraints (Optional)</span>
          {showAdvanced ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>

        {showAdvanced && (
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {/* Content Type */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-white mb-1">
                Content Type
              </label>
              <select
                value={formData.contentType || ''}
                onChange={(e) => onChange('contentType', e.target.value || null)}
                className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-black px-2.5 py-1.5 text-xs text-slate-800 dark:text-white focus:border-indigo-500 focus:outline-hidden"
              >
                <option value="">Auto-Detect Type</option>
                {contentTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </div>

            {/* Strategic Goal */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-white mb-1">
                Primary Goal
              </label>
              <select
                value={formData.goal || ''}
                onChange={(e) => onChange('goal', e.target.value || null)}
                className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-black px-2.5 py-1.5 text-xs text-slate-800 dark:text-white focus:border-indigo-500 focus:outline-hidden"
              >
                <option value="">Auto-Detect Goal</option>
                {goals.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Platform */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-white mb-1">
                Preferred Platform
              </label>
              <select
                value={formData.preferredPlatform || ''}
                onChange={(e) => onChange('preferredPlatform', e.target.value || null)}
                className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-black px-2.5 py-1.5 text-xs text-slate-800 dark:text-white focus:border-indigo-500 focus:outline-hidden"
              >
                <option value="">Auto-Select Best Platform</option>
                {platforms.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Audience */}
            <div>
              <label className="block text-xs font-medium text-slate-700 dark:text-white mb-1">
                Target Audience
              </label>
              <select
                value={formData.targetAudience || ''}
                onChange={(e) => onChange('targetAudience', e.target.value || null)}
                className="w-full rounded-lg border border-slate-300 dark:border-zinc-700 bg-white dark:bg-black px-2.5 py-1.5 text-xs text-slate-800 dark:text-white focus:border-indigo-500 focus:outline-hidden"
              >
                <option value="">Auto-Detect Audience</option>
                {audiences.map((a) => (
                  <option key={a} value={a}>
                    {a}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-slate-100 dark:border-zinc-800">
        <button
          type="button"
          onClick={onReset}
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 dark:text-white dark:hover:text-zinc-200 rounded-lg hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset</span>
        </button>

        <button
          type="button"
          onClick={onSubmit}
          disabled={isLoading || !formData.content?.trim()}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs sm:text-sm font-bold shadow-md shadow-indigo-600/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Analyzing & Optimizing...</span>
            </>
          ) : (
            <>
              <span>Generate Recommendations</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
