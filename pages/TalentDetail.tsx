import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { TALENT_PROFILES } from '../content';
import { Instagram, Youtube, Video, Star, Film, Briefcase, ChevronRight } from 'lucide-react';

const platformIcons: Record<string, any> = {
  Instagram,
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
    <div className="pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32 bg-white dark:bg-brand-deep transition-colors">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-magenta">{person.location}</p>
            <h1 className="mt-4 text-5xl font-display font-black leading-[0.9] tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-8xl">
              {person.name}
            </h1>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-white/40">{person.role}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-gray-700 dark:text-white/70">{person.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              {person.specialties.map((item) => (
                <span key={item} className="rounded-full border border-gray-200 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70">
                  {item}
                </span>
              ))}
            </div>

            {person.socials && person.socials.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {person.socials.map((social) => {
                  const Icon = platformIcons[social.platform] || Instagram;
                  return (
                    <a
                      key={social.platform}
                      href={social.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-bold text-gray-900 transition-all hover:border-brand-magenta hover:text-brand-magenta dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-brand-magenta"
                    >
                      <Icon className="h-4 w-4" />
                      {social.platform}
                    </a>
                  );
                })}
              </div>
            )}
          </div>

          {/* Portfolio image card */}
          <div className="overflow-hidden rounded-[36px] border border-gray-200 bg-gray-100 dark:border-white/10 dark:bg-white/5">
            <img
              src={person.portfolio[0]?.image}
              alt={person.name}
              className="w-full aspect-[4/5] object-cover"
              loading="eager"
            />
          </div>
        </section>

        {/* ── Biography ─────────────────────────────────── */}
        <section className="mt-16 rounded-[36px] border border-gray-200 bg-gray-50 p-8 dark:border-white/10 dark:bg-white/5 sm:p-12">
          <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-magenta mb-6">Biography & Specialty</p>
          <div className="space-y-5">
            {person.biography.map((paragraph, i) => (
              <p key={i} className="text-base leading-relaxed text-gray-700 dark:text-white/70 sm:text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </section>

        {/* ── Portfolio Highlights ──────────────────────── */}
        {person.portfolioHighlights && person.portfolioHighlights.length > 0 && (
          <section className="mt-10 rounded-[36px] border border-gray-200 bg-white p-8 dark:border-white/10 dark:bg-white/5 sm:p-12">
            <div className="flex items-center gap-3 mb-6">
              <Star className="h-4 w-4 text-brand-magenta" />
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-magenta">Portfolio Highlights</p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {person.portfolioHighlights.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-base text-gray-700 dark:text-white/70">
                  <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-brand-magenta" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Filmography ───────────────────────────────── */}
        {person.filmography && person.filmography.length > 0 && (
          <section className="mt-10">
            <div className="flex items-center gap-3 mb-6">
              <Film className="h-4 w-4 text-brand-magenta" />
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-magenta">Filmography (Selected)</p>
            </div>
            <div className="overflow-hidden rounded-[28px] border border-gray-200 dark:border-white/10">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 dark:bg-white/5 border-b border-gray-200 dark:border-white/10">
                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 dark:text-white/40">Year</th>
                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 dark:text-white/40">Title</th>
                    <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-[0.3em] text-gray-500 dark:text-white/40">Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-white/5 bg-white dark:bg-white/[0.02]">
                  {person.filmography.map((film, i) => (
                    <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-brand-magenta whitespace-nowrap">{film.year}</td>
                      <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">{film.title}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-white/60">{film.filmRole}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* ── Brand Collaboration Package ───────────────── */}
        {person.brandPackage && (
          <section className="mt-10 rounded-[36px] bg-brand-deep text-white p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,0,160,0.15),transparent_60%)] pointer-events-none" />
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-8">
                <Briefcase className="h-4 w-4 text-brand-magenta" />
                <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-magenta">Brand Collaboration Package</p>
              </div>
              <div className="grid gap-8 md:grid-cols-3">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">Ideal For</p>
                  <div className="flex flex-wrap gap-2">
                    {person.brandPackage.idealFor.map((item, i) => (
                      <span key={i} className="rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white/80">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">Offerings</p>
                  <ul className="space-y-2">
                    {person.brandPackage.offerings.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/70">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand-magenta" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40 mb-4">Unique Advantage</p>
                  <p className="text-sm leading-relaxed text-white/80">{person.brandPackage.uniqueAdvantage}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Portfolio work ────────────────────────────── */}
        {person.portfolio.length > 0 && (
          <section className="mt-10">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-magenta mb-6">Featured Work</p>
            <div className="grid gap-6 lg:grid-cols-2">
              {person.portfolio.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-[28px] border border-gray-200 bg-white dark:border-white/10 dark:bg-white/5">
                  <img src={item.image} alt={item.title} className="h-72 w-full object-cover" loading="lazy" decoding="async" />
                  <div className="p-6 sm:p-8">
                    <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-magenta">{item.role}</p>
                    <h2 className="mt-3 text-2xl font-display font-black text-gray-900 dark:text-white">{item.title}</h2>
                    <p className="mt-3 text-base leading-relaxed text-gray-700 dark:text-white/70">{item.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ── CTA ──────────────────────────────────────── */}
        <div className="mt-14 flex flex-wrap gap-4">
          <Link to="/talent" className="rounded-2xl bg-brand-magenta px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-white hover:opacity-90 transition-opacity">
            Back to Talent
          </Link>
          <Link to="/talent-form" className="rounded-2xl border border-gray-300 px-8 py-4 text-xs font-black uppercase tracking-[0.2em] text-gray-900 hover:border-brand-magenta hover:text-brand-magenta transition-colors dark:border-white/20 dark:text-white dark:hover:border-brand-magenta dark:hover:text-brand-magenta">
            Work With Us
          </Link>
        </div>

      </div>
    </div>
  );
};

export default TalentDetail;
