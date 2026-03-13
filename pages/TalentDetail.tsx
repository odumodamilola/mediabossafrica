import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TALENT_PROFILES } from '../content';
import { Instagram, Youtube, Video } from 'lucide-react';

const platformIcons: Record<string, any> = {
  Instagram: Instagram,
  YouTube: Youtube,
  TikTok: Video,
};

const TalentDetail: React.FC = () => {
  const { talentSlug } = useParams();
  const person = TALENT_PROFILES.find((item) => item.slug === talentSlug);

  if (!person) {
    return (
      <div className="pt-32 pb-20 sm:pt-40 lg:pt-48">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display font-black text-gray-900 dark:text-white">Talent profile not found</h1>
          <Link to="/talent" className="mt-8 inline-flex rounded-2xl bg-brand-magenta px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white">
            Back to Talent
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-magenta">{person.location}</p>
            <h1 className="mt-5 text-4xl font-display font-black leading-[0.95] tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              {person.name}
            </h1>
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-white/45">{person.role}</p>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-700 dark:text-white/70">{person.description}</p>
            
            {person.socials && person.socials.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-4">
                {person.socials.map((social) => {
                  const Icon = platformIcons[social.platform] || Instagram;
                  return (
                    <a
                      key={social.platform}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2 text-sm font-bold text-gray-900 transition-all hover:border-brand-magenta hover:text-brand-magenta dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-brand-magenta"
                    >
                      <Icon className="h-4 w-4" />
                      {social.platform}
                    </a>
                  );
                })}
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              {person.specialties.map((item) => (
                <span key={item} className="rounded-full border border-gray-200 bg-white px-4 py-2 text-sm text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-[36px] border border-gray-200 bg-gray-50 p-8 dark:border-white/10 dark:bg-white/5">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-magenta">Known for</p>
            <ul className="mt-6 space-y-3">
              {person.knownFor.map((item) => (
                <li key={item} className="flex items-start gap-3 text-base text-gray-700 dark:text-white/70">
                  <span className="mt-2 h-2 w-2 rounded-full bg-brand-magenta" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mt-14 rounded-[36px] border border-gray-200 bg-white p-8 dark:border-white/10 dark:bg-white/5 sm:p-10">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-magenta">Biography</p>
          <div className="mt-6 space-y-5">
            {person.biography.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-gray-700 dark:text-white/70 sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-magenta">Portfolio</p>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {person.portfolio.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-[28px] border border-gray-200 bg-white dark:border-white/10 dark:bg-white/5">
                <img src={item.image} alt={item.title} className="h-64 w-full object-cover" loading="lazy" decoding="async" />
                <div className="p-6 sm:p-8">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-magenta">{item.role}</p>
                  <h2 className="mt-4 text-3xl font-display font-black text-gray-900 dark:text-white">{item.title}</h2>
                  <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-white/70">{item.summary}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <div className="mt-14 flex flex-wrap gap-4">
          <Link to="/talent" className="rounded-2xl bg-brand-magenta px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white">
            Back to Talent
          </Link>
          <Link to="/talent-form" className="rounded-2xl border border-gray-300 px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-gray-900 dark:border-white/20 dark:text-white">
            Work With Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TalentDetail;
