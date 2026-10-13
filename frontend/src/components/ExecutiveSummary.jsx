import React from 'react';
import {
  TrendingUp,
  Users,
  Sparkles,
  CheckCircle2,
  Tag,
  Smile,
  FileText,
  Target,
  Sliders
} from 'lucide-react';
import { PlatformIcon } from './PlatformIcons';

export default function ExecutiveSummary({ data, isDark }) {
  if (!data) return null;

  const {
    content_analysis: analysis,
    expected_engagement: rawEngagement,
    overall_factors: factors,
    platform_recommendations: rawPlatforms = [],
    audience_recommendations: audiences = [],
  } = data;

  const platforms = rawPlatforms.filter(
    (p) => !p.platform.toLowerCase().includes('thread')
  );

  const topPlatform = platforms[0] || rawPlatforms[0];
  const topAudience = audiences[0];

  // Helper to normalize any score (whether 0-1 or 0-100) to clean integer 0-100
  const normalizePercent = (val) => {
    if (val == null) return 0;
    const num = Number(val);
    if (isNaN(num)) return 0;
    const scaled = num <= 1.0 && num > 0 ? num * 100 : num;
    return Math.min(100, Math.max(0, Math.round(scaled)));
  };

  const engagement = normalizePercent(rawEngagement);

  const factorItems = [
    {
      name: 'Platform Fit',
      value: normalizePercent(factors?.platform_fit),
      desc: 'Channel algorithm compatibility and delivery format match',
      color: 'bg-indigo-500',
      barBg: 'bg-indigo-500/20',
      textColor: 'text-indigo-400',
    },
    {
      name: 'Audience Resonance',
      value: normalizePercent(factors?.audience_fit),
      desc: 'Semantic interest clustering and demographic alignment',
      color: 'bg-purple-500',
      barBg: 'bg-purple-500/20',
      textColor: 'text-purple-400',
    },
    {
      name: 'Objective Fit',
      value: normalizePercent(factors?.goal_fit),
      desc: 'Alignment with target conversion and reach objectives',
      color: 'bg-emerald-500',
      barBg: 'bg-emerald-500/20',
      textColor: 'text-emerald-400',
    },
  ];

  const getEngagementRating = (score) => {
    if (score >= 75) return { label: 'High Potential', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800' };
    if (score >= 50) return { label: 'Moderate Fit', color: 'text-indigo-400 bg-indigo-950/60 border-indigo-800' };
    return { label: 'Needs Focus', color: 'text-amber-400 bg-amber-950/60 border-amber-800' };
  };

  const rating = getEngagementRating(engagement);

  return (
    <div className="space-y-6">
      
      {/* 3 High-Impact KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Engagement Score */}
        <div className="bg-white dark:bg-[#121214] rounded-xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs transition-colors relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Predicted Engagement</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {engagement}
            </span>
            <span className="text-xs text-slate-400 dark:text-zinc-500 font-medium">/ 100</span>
          </div>
          <div className="mt-3 flex items-center gap-2">
            <span className={`inline-flex items-center text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${rating.color}`}>
              {rating.label}
            </span>
            <span className="text-[11px] text-slate-500 dark:text-zinc-400">
              ML predicted index
            </span>
          </div>
        </div>

        {/* Top Platform */}
        <div className="bg-white dark:bg-[#121214] rounded-xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs transition-colors relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Top Recommended Platform</span>
            <div className="w-8 h-8 rounded-lg bg-slate-100 dark:bg-zinc-900 flex items-center justify-center text-slate-700 dark:text-white border dark:border-zinc-800">
              <PlatformIcon name={topPlatform?.platform} className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
              {topPlatform?.platform || 'Unspecified'}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 dark:text-zinc-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
            <span>Score: <strong className="text-slate-900 dark:text-white font-bold">{normalizePercent(topPlatform?.score)}%</strong> match</span>
          </div>
        </div>

        {/* Target Audience Profile */}
        <div className="bg-white dark:bg-[#121214] rounded-xl border border-slate-200/80 dark:border-zinc-800 p-5 shadow-xs transition-colors relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 dark:text-zinc-400 mb-2">
            <span className="text-[11px] font-bold uppercase tracking-wider">Primary Target Audience</span>
            <div className="w-8 h-8 rounded-lg bg-sky-50 dark:bg-sky-950/60 flex items-center justify-center text-sky-600 dark:text-sky-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
              {topAudience?.audience || 'General Audience'}
            </span>
          </div>
          <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-600 dark:text-zinc-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-sky-500" />
            <span>Score: <strong className="text-slate-900 dark:text-white font-bold">{normalizePercent(topAudience?.score)}%</strong> alignment</span>
          </div>
        </div>

      </div>

      {/* Factor Breakdown & NLP Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Strategic Factor Fit Matrix */}
        <div className="lg:col-span-2 bg-white dark:bg-[#121214] rounded-xl border border-slate-200/80 dark:border-zinc-800 p-5 sm:p-6 shadow-xs transition-colors">
          <div className="flex items-center justify-between mb-5">
            <div>
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-500" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Strategic Factor Breakdown
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
                Relative component weightings normalized on a 0 - 100% scale
              </p>
            </div>
            <span className="text-[11px] font-bold text-slate-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-900 px-2.5 py-1 rounded-md border dark:border-zinc-800">
              Multi-Factor Index
            </span>
          </div>

          <div className="space-y-4">
            {factorItems.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-lg bg-slate-50/70 dark:bg-[#18181b] border border-slate-100 dark:border-zinc-800/80">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {item.name}
                    </span>
                    <span className="text-[11px] text-slate-400 dark:text-zinc-500 hidden sm:inline">
                      • {item.desc}
                    </span>
                  </div>
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white font-mono">
                    {item.value}%
                  </span>
                </div>

                {/* Smooth Progress Bar */}
                <div className="w-full bg-slate-200/80 dark:bg-zinc-900 rounded-full h-2 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* NLP Content Analysis Card */}
        <div className="bg-white dark:bg-[#121214] rounded-xl border border-slate-200/80 dark:border-zinc-800 p-5 sm:p-6 shadow-xs transition-colors flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                NLP Content Analysis
              </h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400 font-medium flex items-center gap-1.5">
                  <Tag className="w-3.5 h-3.5" /> Topic Category
                </span>
                <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-zinc-900 px-2 py-0.5 rounded border dark:border-zinc-800">
                  {analysis?.topic || 'General'}
                </span>
              </div>

              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400 font-medium flex items-center gap-1.5">
                  <Smile className="w-3.5 h-3.5" /> Sentiment
                </span>
                <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-zinc-900 px-2 py-0.5 rounded border dark:border-zinc-800">
                  {analysis?.sentiment || 'Neutral'}
                </span>
              </div>

              <div className="flex items-center justify-between pb-2.5 border-b border-slate-100 dark:border-zinc-800">
                <span className="text-slate-500 dark:text-zinc-400 font-medium flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Content Type
                </span>
                <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-zinc-900 px-2 py-0.5 rounded border dark:border-zinc-800">
                  {analysis?.content_type || 'General'}
                </span>
              </div>
            </div>
          </div>

          {/* Keywords cloud */}
          {analysis?.keywords && analysis.keywords.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800">
              <span className="text-[11px] font-bold text-slate-500 dark:text-zinc-400 block mb-2">
                Extracted NLP Keywords:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {analysis.keywords.map((kw, idx) => (
                  <span
                    key={idx}
                    className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-zinc-900 text-slate-800 dark:text-zinc-200 font-mono font-medium border border-slate-200/60 dark:border-zinc-800"
                  >
                    #{kw}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
