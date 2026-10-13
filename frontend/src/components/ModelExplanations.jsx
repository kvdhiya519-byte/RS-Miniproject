import React from 'react';
import { HelpCircle, Award, Sparkles, Layers, Users, ChevronRight } from 'lucide-react';

export default function ModelExplanations({ explanations = [] }) {
  const filtered = (explanations || []).filter(
    (e) =>
      !e.toLowerCase().includes('posting schedule') &&
      !e.toLowerCase().includes('thread')
  );

  if (filtered.length === 0) return null;

  const parseExplanation = (text) => {
    let title = '';
    let body = text;

    if (text.includes(':')) {
      const idx = text.indexOf(':');
      title = text.slice(0, idx).trim();
      body = text.slice(idx + 1).trim();
    }

    const lower = title.toLowerCase();
    let theme = {
      badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
      badgeText: 'text-indigo-700 dark:text-indigo-300',
      badgeBorder: 'border-indigo-200/70 dark:border-indigo-800/60',
      cardBorder: 'border-indigo-100 dark:border-indigo-950/40',
      icon: Award,
    };

    if (lower.includes('why') && (lower.includes('only') || lower.includes('#1'))) {
      theme = {
        badgeBg: 'bg-indigo-50 dark:bg-indigo-950/40',
        badgeText: 'text-indigo-700 dark:text-indigo-300',
        badgeBorder: 'border-indigo-200/70 dark:border-indigo-800/60',
        cardBorder: 'border-indigo-100/80 dark:border-indigo-900/40',
        icon: Award,
      };
    } else if (lower.includes('why it was recommended') || lower.includes('recommended')) {
      theme = {
        badgeBg: 'bg-blue-50 dark:bg-blue-950/40',
        badgeText: 'text-blue-700 dark:text-blue-300',
        badgeBorder: 'border-blue-200/70 dark:border-blue-800/60',
        cardBorder: 'border-blue-100/80 dark:border-blue-900/40',
        icon: Sparkles,
      };
    } else if (lower.includes('other') || lower.includes('not chosen') || lower.includes('trade-off')) {
      theme = {
        badgeBg: 'bg-amber-50 dark:bg-amber-950/40',
        badgeText: 'text-amber-700 dark:text-amber-300',
        badgeBorder: 'border-amber-200/70 dark:border-amber-800/60',
        cardBorder: 'border-amber-100/80 dark:border-amber-900/40',
        icon: Layers,
      };
    } else if (lower.includes('audience')) {
      theme = {
        badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40',
        badgeText: 'text-emerald-700 dark:text-emerald-300',
        badgeBorder: 'border-emerald-200/70 dark:border-emerald-800/60',
        cardBorder: 'border-emerald-100/80 dark:border-emerald-900/40',
        icon: Users,
      };
    }

    return { title, body, theme };
  };

  return (
    <div className="bg-white dark:bg-[#121214] rounded-xl border border-slate-200/80 dark:border-zinc-800 p-5 sm:p-6 shadow-xs transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <HelpCircle className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
        <h3 className="text-base font-bold text-slate-900 dark:text-white">
          Recommendation Explainability
        </h3>
      </div>
      <p className="text-xs text-slate-500 dark:text-zinc-400 mb-4">
        Clear AI model rationale explaining why this strategy was recommended, why the primary platform was selected, and why alternatives ranked lower
      </p>

      <div className="space-y-3">
        {filtered.map((item, index) => {
          const { title, body, theme } = parseExplanation(item);
          const IconComponent = theme.icon || ChevronRight;

          return (
            <div
              key={index}
              className={`p-4 rounded-xl bg-slate-50/70 dark:bg-[#18181b] border ${theme.cardBorder} transition-all hover:border-slate-300 dark:hover:border-zinc-700`}
            >
              {title && (
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-semibold border ${theme.badgeBg} ${theme.badgeText} ${theme.badgeBorder}`}
                  >
                    <IconComponent className="w-3.5 h-3.5 shrink-0" />
                    {title}
                  </span>
                </div>
              )}
              <p className="text-xs sm:text-[13px] text-slate-700 dark:text-zinc-200 leading-relaxed font-normal">
                {body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
