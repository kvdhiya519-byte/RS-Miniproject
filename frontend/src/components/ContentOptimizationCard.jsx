import React, { useState } from 'react';
import { Sparkles, Copy, Check, MessageSquare, Flame, MousePointerClick, Hash } from 'lucide-react';

export default function ContentOptimizationCard({ optimization }) {
  if (!optimization) return null;

  const [copiedKey, setCopiedKey] = useState(null);

  const copyToClipboard = (text, key) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => {
      setCopiedKey(null);
    }, 2000);
  };

  const rawHook = optimization.hook || '';
  const rawCaption = optimization.caption || '';
  const cta = optimization.cta || '';
  const suggested_length = optimization.suggested_length || '';
  const rawHashtags = optimization.hashtags || [];

  const hook = rawHook.replace(/\s*\(Thread\):?/gi, '').replace(/^Thread:\s*/gi, '').trim();
  const caption = rawCaption.replace(/^Thread on [^:]+:\n\n/gi, '').trim();
  const hashtags = rawHashtags.filter((tag) => !tag.toLowerCase().includes('thread'));

  return (
    <div className="bg-white dark:bg-[#121214] rounded-xl border border-slate-200/80 dark:border-zinc-800 p-5 sm:p-6 shadow-xs transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              AI Content Optimization Assets
            </h3>
          </div>
          <p className="text-xs text-slate-500 dark:text-zinc-200 mt-0.5">
            Ready-to-deploy hooks, captions, calls-to-action, and optimized hashtags
          </p>
        </div>

        {suggested_length && (
          <span className="text-xs font-bold text-slate-700 dark:text-white bg-slate-100 dark:bg-black px-3 py-1 rounded-full border border-slate-200 dark:border-zinc-700 self-start sm:self-auto">
            Target Length: <strong>{suggested_length}</strong>
          </span>
        )}
      </div>

      <div className="space-y-4">
        
        {/* Hook */}
        {hook && (
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-[#18181b]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" /> High-Retention Hook
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(hook, 'hook')}
                className="flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300 font-medium transition-colors cursor-pointer"
              >
                {copiedKey === 'hook' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Hook</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white leading-relaxed">
              "{hook}"
            </p>
          </div>
        )}

        {/* Caption */}
        {caption && (
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-[#18181b]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 dark:text-zinc-200 uppercase tracking-wider flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5" /> Recommended Caption / Body
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(caption, 'caption')}
                className="flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300 font-medium transition-colors cursor-pointer"
              >
                {copiedKey === 'caption' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Caption</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-sm text-slate-800 dark:text-white leading-relaxed whitespace-pre-wrap font-medium">
              {caption}
            </p>
          </div>
        )}

        {/* CTA */}
        {cta && (
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-[#18181b]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                <MousePointerClick className="w-3.5 h-3.5" /> Call-To-Action (CTA)
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(cta, 'cta')}
                className="flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300 font-medium transition-colors cursor-pointer"
              >
                {copiedKey === 'cta' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy CTA</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {cta}
            </p>
          </div>
        )}

        {/* Hashtags */}
        {hashtags && hashtags.length > 0 && (
          <div className="p-4 rounded-xl border border-slate-200/80 dark:border-zinc-800 bg-slate-50/50 dark:bg-[#18181b]">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-xs font-bold text-violet-600 dark:text-violet-400 uppercase tracking-wider flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5" /> Optimized Hashtags ({hashtags.length})
              </span>
              <button
                type="button"
                onClick={() => copyToClipboard(hashtags.join(' '), 'all_hashtags')}
                className="flex items-center gap-1 text-xs text-slate-600 hover:text-indigo-600 dark:text-white dark:hover:text-indigo-300 font-medium transition-colors cursor-pointer"
              >
                {copiedKey === 'all_hashtags' ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span className="text-emerald-500 dark:text-emerald-400 font-bold">All Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy All</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {hashtags.map((tag, idx) => {
                const formatted = tag.startsWith('#') ? tag : `#${tag}`;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => copyToClipboard(formatted, `tag_${idx}`)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-white dark:bg-black text-slate-800 dark:text-white border border-slate-200 dark:border-zinc-700 hover:border-indigo-400 dark:hover:border-indigo-500 transition-all font-mono font-medium cursor-pointer"
                    title="Click to copy single hashtag"
                  >
                    {copiedKey === `tag_${idx}` ? '✓ Copied' : formatted}
                  </button>
                );
              })}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
