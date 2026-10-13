import React from 'react';
import { Compass, Moon, Sun } from 'lucide-react';

export default function Header({
  isDark,
  onToggleTheme,
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-zinc-800 dark:bg-black/95 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-sm shadow-indigo-500/20">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-slate-900 dark:text-white tracking-tight">
                ContentPilot
              </span>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-white border border-indigo-200/60 dark:border-indigo-700">
                AI Engine
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-zinc-300 hidden sm:block">
              Intelligent Content, Platform & Audience Recommendation
            </p>
          </div>
        </div>

        {/* Right side: Dark / Light Mode Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2.5 rounded-lg text-slate-600 hover:text-slate-900 dark:text-white dark:hover:bg-zinc-900 border border-slate-200 dark:border-zinc-800 transition-colors cursor-pointer"
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-300" />
            ) : (
              <Moon className="w-4 h-4 text-slate-600" />
            )}
          </button>
        </div>

      </div>
    </header>
  );
}
