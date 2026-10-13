import React, { useState } from 'react';
import { Share2, Award, LayoutList, BarChart3 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from 'recharts';
import { PlatformIcon } from './PlatformIcons';

export default function PlatformRecommendations({ platforms: rawPlatforms = [], isDark }) {
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'chart'

  // Filter out Threads
  const platforms = (rawPlatforms || []).filter(
    (p) => !p.platform.toLowerCase().includes('thread')
  );

  if (platforms.length === 0) return null;

  const chartData = platforms.map((p) => ({
    name: p.platform,
    score: Math.min(100, Math.max(0, Math.round(p.score))),
  }));

  const getPlatformBrandColor = (name) => {
    const norm = (name || '').toLowerCase();
    if (norm.includes('arxiv') || norm.includes('scholar')) return '#E11D48';
    if (norm.includes('kaggle')) return '#20BEFF';
    if (norm.includes('dataset') || norm.includes('data.gov')) return '#3B82F6';
    if (norm.includes('github')) return '#10B981';
    if (norm.includes('gitlab')) return '#FC6D26';
    if (norm.includes('bitbucket')) return '#0052CC';
    if (norm.includes('stack') || norm.includes('overflow')) return '#F48024';
    if (norm.includes('hugging') || norm.includes('hf')) return '#F59E0B';
    if (norm.includes('reddit')) return '#FF4500';
    if (norm.includes('medium') || norm.includes('substack')) return '#059669';
    if (norm.includes('youtube')) return '#EF4444';
    if (norm.includes('tiktok')) return '#06B6D4';
    if (norm.includes('instagram')) return '#EC4899';
    if (norm.includes('linkedin')) return '#0A66C2';
    if (norm.includes('facebook')) return '#1877F2';
    if (norm.includes('twitter') || norm.includes('x/')) return '#94A3B8';
    return '#6366F1';
  };

  return (
    <div className="bg-white dark:bg-[#121214] rounded-xl border border-slate-200/80 dark:border-zinc-800 p-5 sm:p-6 shadow-xs transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5 text-indigo-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Platform Fit & Distribution
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Ranked multi-platform suitability calculated from audience affinity and content characteristics
          </p>
        </div>

        {/* View Toggle & Count Pill */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="flex items-center bg-slate-100 dark:bg-zinc-900 p-1 rounded-lg border border-slate-200/70 dark:border-zinc-800 text-xs">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-zinc-800 dark:text-white font-bold'
                  : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <LayoutList className="w-3.5 h-3.5" />
              <span>Ranked</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('chart')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-md font-medium transition-all cursor-pointer ${
                viewMode === 'chart'
                  ? 'bg-white text-slate-900 shadow-xs dark:bg-zinc-800 dark:text-white font-bold'
                  : 'text-slate-500 dark:text-zinc-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Compare</span>
            </button>
          </div>

          <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-zinc-800">
            {platforms.length} Platforms
          </span>
        </div>
      </div>

      {/* Comparison Chart View */}
      {viewMode === 'chart' && (
        <div className="mb-6 p-4 rounded-xl bg-slate-50/50 dark:bg-[#18181b] border border-slate-100 dark:border-zinc-800/80">
          <div className="h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 15, right: 15, left: -20, bottom: 25 }}
              >
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11, fill: isDark ? '#ffffff' : '#475569', fontWeight: 600 }}
                  axisLine={{ stroke: isDark ? '#27272a' : '#e2e8f0' }}
                  tickLine={false}
                  angle={-15}
                  textAnchor="end"
                  interval={0}
                />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 25, 50, 75, 100]}
                  tick={{ fontSize: 11, fill: isDark ? '#a1a1aa' : '#64748b' }}
                  axisLine={{ stroke: isDark ? '#27272a' : '#e2e8f0' }}
                  tickLine={false}
                />
                <Tooltip
                  cursor={{ fill: isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)' }}
                  formatter={(val) => [`${val}%`, 'Suitability Match']}
                  contentStyle={{
                    backgroundColor: isDark ? '#09090b' : '#ffffff',
                    borderColor: isDark ? '#27272a' : '#e2e8f0',
                    borderRadius: '8px',
                    fontSize: '12px',
                    color: isDark ? '#ffffff' : '#0f172a',
                    fontWeight: 600,
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  }}
                />
                <Bar dataKey="score" radius={[6, 6, 0, 0]} barSize={32}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getPlatformBrandColor(entry.name)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Ranked Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {platforms.map((item, index) => {
          const isTop = index === 0;
          const scorePercent = Math.min(100, Math.max(0, Math.round(item.score)));
          const brandColor = getPlatformBrandColor(item.platform);

          return (
            <div
              key={item.platform}
              className={`p-4 rounded-xl border transition-all ${
                isTop
                  ? 'border-indigo-400 dark:border-indigo-600/80 bg-indigo-50/20 dark:bg-[#18181b] shadow-xs'
                  : 'border-slate-200/80 dark:border-zinc-800 bg-slate-50/40 dark:bg-[#18181b]'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-white dark:bg-black flex items-center justify-center border border-slate-200/70 dark:border-zinc-700 shadow-xs shrink-0">
                    <PlatformIcon name={item.platform} className="w-4 h-4" />
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {item.platform}
                      </span>
                      {isTop && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-indigo-700 dark:text-white bg-indigo-100 dark:bg-indigo-900/80 px-2 py-0.5 rounded-full border dark:border-indigo-600">
                          <Award className="w-3 h-3" /> Top Choice
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-medium text-slate-400 dark:text-zinc-500">
                      Rank #{index + 1}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-base font-extrabold text-slate-900 dark:text-white font-mono">
                    {scorePercent}%
                  </span>
                  <span className="block text-[10px] font-medium text-slate-400 dark:text-zinc-500 uppercase">
                    Match
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-slate-200/80 dark:bg-zinc-900 rounded-full h-1.5 mb-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${scorePercent}%`,
                    backgroundColor: brandColor,
                  }}
                />
              </div>

              {/* Strategic Rationale */}
              <p className="text-xs text-slate-600 dark:text-zinc-300 leading-relaxed font-normal">
                {item.reason}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
