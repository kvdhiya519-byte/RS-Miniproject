import React from 'react';
import { Users, UserCheck } from 'lucide-react';

export default function AudienceRecommendations({ audiences = [] }) {
  if (!audiences || audiences.length === 0) return null;

  return (
    <div className="bg-white dark:bg-[#121214] rounded-xl border border-slate-200/80 dark:border-zinc-800 p-5 sm:p-6 shadow-xs transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-sky-500" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Target Audience Alignment
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-400 mt-0.5">
            Profiles most likely to resonate, interact, and convert based on semantic clustering
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-600 dark:text-zinc-400 bg-slate-100 dark:bg-zinc-900 px-2.5 py-1 rounded-lg border border-slate-200/60 dark:border-zinc-800 self-start sm:self-auto">
          {audiences.length} Segments
        </span>
      </div>

      <div className="space-y-3">
        {audiences.map((item, index) => {
          const isPrimary = index === 0;
          const scorePercent = Math.min(100, Math.max(0, Math.round(item.score)));

          return (
            <div
              key={item.audience}
              className={`p-4 rounded-xl border transition-all ${
                isPrimary
                  ? 'border-sky-400 dark:border-sky-600/80 bg-sky-50/20 dark:bg-[#18181b] shadow-xs'
                  : 'border-slate-200/80 dark:border-zinc-800 bg-slate-50/40 dark:bg-[#18181b]'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white dark:bg-black flex items-center justify-center border border-slate-200/70 dark:border-zinc-700 shadow-xs shrink-0 text-xs font-bold text-slate-700 dark:text-white font-mono">
                    #{index + 1}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-white">
                        {item.audience}
                      </span>
                      {isPrimary && (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-sky-700 dark:text-white bg-sky-100 dark:bg-sky-900/80 px-2 py-0.5 rounded-full border dark:border-sky-600">
                          <UserCheck className="w-3 h-3" /> Core Target
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white font-mono">
                    {scorePercent}%
                  </span>
                  <span className="block text-[10px] font-medium text-slate-400 dark:text-zinc-500 uppercase">
                    Alignment
                  </span>
                </div>
              </div>

              {/* Match bar */}
              <div className="w-full bg-slate-200/80 dark:bg-zinc-900 rounded-full h-1.5 mb-2.5 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700 bg-sky-500"
                  style={{ width: `${scorePercent}%` }}
                />
              </div>

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
