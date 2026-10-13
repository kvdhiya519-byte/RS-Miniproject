import React from 'react';

export function PlatformIcon({ name, className = "w-4 h-4" }) {
  const norm = (name || '').toLowerCase();

  // ArXiv / Academic / Papers
  if (norm.includes('arxiv') || norm.includes('paper') || norm.includes('scholar')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" className="text-rose-500 fill-rose-500/20" />
        <path d="M6 6h10" />
        <path d="M6 10h10" />
        <path d="M6 14h6" />
      </svg>
    );
  }

  // GitHub
  if (norm.includes('github')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    );
  }

  // GitLab
  if (norm.includes('gitlab')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#FC6D26">
        <path d="M22.65 14.39L20.6 8.07a.9.9 0 0 0-.3-.42.9.9 0 0 0-.52-.16.9.9 0 0 0-.5.16.9.9 0 0 0-.31.42l-1.92 5.91H6.95L5.03 8.07a.9.9 0 0 0-.31-.42.9.9 0 0 0-.5-.16.9.9 0 0 0-.52.16.9.9 0 0 0-.3.42L1.35 14.39a1.06 1.06 0 0 0 .38 1.18L11.5 22.8a.8.8 0 0 0 1 0l9.77-7.23a1.06 1.06 0 0 0 .38-1.18z"/>
      </svg>
    );
  }

  // Bitbucket
  if (norm.includes('bitbucket')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#0052CC">
        <path d="M2.61 3.5a.8.8 0 0 0-.8.93l2.84 16.07a1.2 1.2 0 0 0 1.18.99h12.34a1.2 1.2 0 0 0 1.18-.99l2.84-16.07a.8.8 0 0 0-.8-.93H2.61zm10.74 12.33H10.6l-1.07-5.9h4.94l-1.12 5.9z"/>
      </svg>
    );
  }

  // Stack Overflow
  if (norm.includes('stack') || norm.includes('overflow')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#F48024">
        <path d="M15.725 0l-1.72 1.277 6.39 8.588 1.716-1.277L15.725 0zm-3.94 4.418l-1.43 1.594 7.943 7.158 1.429-1.595-7.942-7.157zm-2.457 4.966l-1.048 1.881 9.079 5.074 1.047-1.88-9.078-5.075zm-1.183 5.484l-.568 2.068 10.021 2.754.569-2.069-10.022-2.753zm-.325 5.632H18.2v-2.143H7.82v2.143zm11.72-4.286v6.429H4.46v-6.429H2.32v8.571h19.36v-8.571h-2.14z"/>
      </svg>
    );
  }

  // Hugging Face
  if (norm.includes('hugging') || norm.includes('hf')) {
    return (
      <span className="text-sm select-none" role="img" aria-label="Hugging Face">🤗</span>
    );
  }

  // Kaggle
  if (norm.includes('kaggle')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#20BEFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 4v16" />
        <path d="M19 4l-9 8 9 8" />
      </svg>
    );
  }

  // Google Dataset Search / Datasets
  if (norm.includes('dataset') || norm.includes('data.gov')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <ellipse cx="12" cy="5" rx="9" ry="3" className="text-blue-500 fill-blue-500/20" />
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" className="text-blue-500" />
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" className="text-blue-500" />
      </svg>
    );
  }

  // Reddit
  if (norm.includes('reddit')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="#FF4500">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.56 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.609a1.24 1.24 0 0 1 1.108-.693zM8.617 10.774c-.907 0-1.644.737-1.644 1.644 0 .907.737 1.644 1.644 1.644.907 0 1.644-.737 1.644-1.644 0-.907-.737-1.644-1.644-1.644zm6.766 0c-.907 0-1.644.737-1.644 1.644 0 .907.737 1.644 1.644 1.644.907 0 1.644-.737 1.644-1.644 0-.907-.737-1.644-1.644-1.644zm-6.07 4.19a.403.403 0 0 0-.27.12.39.39 0 0 0 0 .563c1.045 1.046 2.716 1.05 3.774 0a.39.39 0 0 0 0-.563.4.4 0 0 0-.563 0c-.754.754-1.956.754-2.71 0a.4.4 0 0 0-.231-.12z"/>
      </svg>
    );
  }

  // Medium / Substack
  if (norm.includes('medium') || norm.includes('substack') || norm.includes('blog')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
      </svg>
    );
  }

  // YouTube
  if (norm.includes('youtube')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#FF0000"/>
      </svg>
    );
  }

  // Instagram
  if (norm.includes('instagram')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="none">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="currentColor" strokeWidth="2" className="text-pink-500" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" stroke="currentColor" strokeWidth="2" className="text-pink-500" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-pink-500" />
      </svg>
    );
  }

  // TikTok
  if (norm.includes('tiktok')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .58.04.86.12V9.37a6.34 6.34 0 0 0-.86-.06 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34-6.35V9.75a8.28 8.28 0 0 0 3.77.92V7.21a4.84 4.84 0 0 1-.0-.52z" fill="#25F4EE"/>
      </svg>
    );
  }

  // X / Twitter
  if (norm.includes('twitter') || norm.includes('x/')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    );
  }

  // LinkedIn
  if (norm.includes('linkedin')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" fill="#0A66C2"/>
      </svg>
    );
  }

  // Facebook
  if (norm.includes('facebook')) {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" fill="#1877F2"/>
      </svg>
    );
  }

  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10"/>
      <line x1="2" y1="12" x2="22" y2="12"/>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
    </svg>
  );
}
