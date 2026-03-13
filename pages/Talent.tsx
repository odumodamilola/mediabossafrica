import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Instagram, Video, Youtube } from 'lucide-react';
import { FEATURED_PROJECTS, TALENT_PROFILES } from '../content';

const platformIcons: Record<string, typeof Instagram> = {
  Instagram,
  TikTok: Video,
  YouTube: Youtube,
};

const Talent: React.FC = () => {
  return (
    <div className="pt-32 pb-16 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-32">
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <section className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-magenta">Talent</p>
            <h1 className="mt-5 text-4xl font-display font-black leading-[0.95] tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
              MediaBoss Africa talent profiles.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-gray-700 dark:text-white/70">
              Explore actors, hosts, and digital personalities represented across entertainment, branded content, and audience-led storytelling.
            </p>
          </div>

          <div className="rounded-[36px] border border-gray-200 bg-gray-50 p-8 dark:border-white/10 dark:bg-white/5">
            <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-magenta">What you can review</p>
            <ul className="mt-6 space-y-3">
              <li className="flex items-start gap-3 text-base text-gray-700 dark:text-white/70">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-magenta" />
                <span>Talent biographies and specialties</span>
              </li>
              <li className="flex items-start gap-3 text-base text-gray-700 dark:text-white/70">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-magenta" />
                <span>Portfolio highlights and selected work</span>
              </li>
              <li className="flex items-start gap-3 text-base text-gray-700 dark:text-white/70">
                <span className="mt-2 h-2 w-2 rounded-full bg-brand-magenta" />
                <span>Direct links to individual talent detail pages</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mt-14">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {TALENT_PROFILES.map((person) => (
              <article
                key={person.slug}
                className="overflow-hidden rounded-[32px] border border-gray-200 bg-white dark:border-white/10 dark:bg-white/5"
              >
                <img
                  src={person.portfolio[0]?.image}
                  alt={person.name}
                  className="h-72 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-6 sm:p-8">
                  <p className="text-[11px] font-black uppercase tracking-[0.35em] text-brand-magenta">{person.location}</p>
                  <h2 className="mt-4 text-3xl font-display font-black text-gray-900 dark:text-white">{person.name}</h2>
                  <p className="mt-3 text-sm font-semibold uppercase tracking-[0.16em] text-gray-500 dark:text-white/45">{person.role}</p>
                  <p className="mt-5 text-base leading-relaxed text-gray-700 dark:text-white/70">{person.description}</p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {person.specialties.slice(0, 3).map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-gray-200 bg-gray-50 px-3 py-1 text-xs text-gray-700 dark:border-white/10 dark:bg-white/5 dark:text-white/70"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                  {person.socials && person.socials.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-3">
                      {person.socials.map((social) => {
                        const Icon = platformIcons[social.platform] || Instagram;
                        return (
                          <a
                            key={social.platform}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 px-3 py-2 text-xs font-bold text-gray-900 transition-all hover:border-brand-magenta hover:text-brand-magenta dark:border-white/10 dark:text-white dark:hover:border-brand-magenta"
                          >
                            <Icon className="h-4 w-4" />
                            {social.platform}
                          </a>
                        );
                      })}
                    </div>
                  )}
                  <Link
                    to={`/talent/${person.slug}`}
                    className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-brand-magenta px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-white"
                  >
                    View profile
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[36px] border border-gray-200 bg-white p-8 dark:border-white/10 dark:bg-white/5 sm:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-black uppercase tracking-[0.4em] text-brand-magenta">Featured projects</p>
              <h2 className="mt-4 text-3xl font-display font-black text-gray-900 dark:text-white sm:text-4xl">
                Talent connected to flagship productions.
              </h2>
            </div>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-2xl border border-gray-300 px-6 py-3 text-xs font-black uppercase tracking-[0.2em] text-gray-900 dark:border-white/20 dark:text-white"
            >
              Work with talent
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {FEATURED_PROJECTS.map((project) => (
              <article
                key={project.slug}
                className="overflow-hidden rounded-[28px] border border-gray-200 bg-gray-50 dark:border-white/10 dark:bg-brand-deep/40"
              >
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  className="h-64 w-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
                <div className="p-6 sm:p-8">
                  <p className="text-[11px] font-black uppercase tracking-[0.3em] text-brand-magenta">{project.type}</p>
                  <h3 className="mt-4 text-2xl font-display font-black text-gray-900 dark:text-white">{project.title}</h3>
                  <p className="mt-4 text-base leading-relaxed text-gray-700 dark:text-white/70">{project.description}</p>
                  <p className="mt-5 text-sm text-gray-500 dark:text-white/45">
                    Featuring {project.people.join(', ')}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Talent;
