'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, BadgeCheck, Brush, CarFront, Droplets, Hammer, Lightbulb, Sparkles, Wrench } from 'lucide-react';
import { EmptyState, ErrorState, Spinner, primaryButton } from '@/components/ui';
import type { Category } from '@/types';

const iconFor = (slug: string) => ({ mechanic: CarFront, cleaning: Sparkles, electrician: Lightbulb, plumber: Droplets, painter: Brush, carpenter: Hammer }[slug] ?? Wrench);

export default function HomePage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/categories').then((r) => r.json())
      .then((result) => { if (!result.success) throw new Error('Could not load local services.'); setCategories(result.data); })
      .catch((reason) => setError(reason instanceof Error ? reason.message : 'Could not load local services.'))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <section className="border-b border-line bg-sand px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto grid max-w-7xl items-end gap-14 lg:grid-cols-[1.25fr_.75fr]">
          <div>
            <p className="mb-8 text-xs font-black uppercase tracking-[.28em] text-tomato">Greater Tunis · Local services</p>
            <h1 className="max-w-4xl font-display text-6xl font-black leading-[.94] tracking-[-.05em] text-ink sm:text-8xl">
              The right help,<br /><span className="text-teal">quietly found.</span>
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-ink/65">
              Describe what you need in your own words. We turn the uncertainty into a clear request, then connect you with a trusted professional nearby.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-5">
              <Link href="/register?role=client" className={primaryButton}>Start a request <ArrowRight className="h-4 w-4" /></Link>
              <Link href="/register?role=provider" className="border-b border-ink pb-1 text-sm font-bold text-ink hover:border-tomato hover:text-tomato">Join as a professional</Link>
            </div>
          </div>
          <div className="border-l border-line pl-7 lg:mb-3">
            <p className="font-display text-3xl font-black leading-tight text-ink">A considered way to arrange everyday work.</p>
            <div className="mt-8 space-y-5 text-sm leading-6 text-ink/60">
              <p><span className="mr-3 font-display text-2xl font-black text-tomato">01</span> Explain the problem without needing the right words.</p>
              <p><span className="mr-3 font-display text-2xl font-black text-tomato">02</span> Compare nearby professionals, prices, and availability.</p>
              <p><span className="mr-3 font-display text-2xl font-black text-tomato">03</span> Book a time and keep the details together.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-wrap items-end justify-between gap-5">
            <div><p className="text-xs font-black uppercase tracking-[.25em] text-tomato">What can we arrange?</p><h2 className="mt-3 font-display text-4xl font-black tracking-tight sm:text-5xl">Practical expertise, close by.</h2></div>
            <p className="max-w-sm text-sm leading-6 text-ink/60">From a leaking sink to a car that will not start, start with the situation—not a category.</p>
          </div>
          {loading ? <Spinner label="Loading local services..." /> : error ? <ErrorState message={error} /> : categories.length === 0 ? <EmptyState title="The service list is empty." /> : (
            <div className="grid border-t border-line sm:grid-cols-2 lg:grid-cols-3">
              {categories.map((category, index) => {
                const Icon = iconFor(category.slug);
                return <Link href="/register?role=client" key={category.id} className="group flex items-center justify-between border-b border-line py-6 pr-4 transition hover:pl-3 hover:text-teal sm:nth-[odd]:border-r sm:nth-[odd]:pr-8 lg:nth-[3n+1]:border-r lg:nth-[3n+2]:border-r lg:nth-[3n+1]:pr-8 lg:nth-[3n+2]:px-8">
                  <div className="flex items-center gap-4"><span className="font-display text-xl font-black text-ink/25">0{index + 1}</span><div><span className="block font-display text-2xl font-black text-ink group-hover:text-teal">{category.name}</span><span className="text-xs font-bold text-ink/50">{category.badgeCount ?? 0} local professionals</span></div></div>
                  <Icon className="h-6 w-6 text-tomato transition group-hover:translate-x-1" />
                </Link>;
              })}
            </div>
          )}
        </div>
      </section>

      <section id="how-it-works" className="bg-teal px-5 py-14 text-sand sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-xs font-black uppercase tracking-[.25em] text-mustard">The ProxiService approach</p><h2 className="mt-4 max-w-md font-display text-5xl font-black leading-tight">Less searching.<br />More certainty.</h2></div>
            <div className="grid gap-8 sm:grid-cols-3">{[['01', 'Describe', 'Tell us what is happening in plain language.'], ['02', 'Match', 'See the professionals who fit the work and the location.'], ['03', 'Arrange', 'Choose a time and follow the request from one place.']].map(([number, title, text]) => <div key={number} className="border-t border-sand/30 pt-5"><span className="font-display text-3xl font-black text-mustard">{number}</span><h3 className="mt-6 font-display text-2xl font-black">{title}</h3><p className="mt-3 text-sm leading-6 text-sand/70">{text}</p></div>)}</div>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-12 lg:py-20"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-end"><div><p className="text-xs font-black uppercase tracking-[.25em] text-tomato">Built around trust</p><h2 className="mt-3 max-w-xl font-display text-4xl font-black leading-tight sm:text-5xl">Every detail should make the next step easier.</h2></div><div className="grid gap-5 border-t border-line pt-5 sm:grid-cols-3 lg:border-t-0 lg:pt-0">{[['Profiles', 'See services, reviews, experience, and working hours before you book.'], ['Clarity', 'A guided request gives you and the professional the same brief.'], ['Follow-through', 'Requests, appointments, and reviews stay together in your account.']].map(([title, text]) => <div key={title}><BadgeCheck className="mb-4 h-6 w-6 text-tomato" /><h3 className="font-display text-lg font-black">{title}</h3><p className="mt-2 text-sm leading-6 text-ink/60">{text}</p></div>)}</div></div></section>
    </div>
  );
}
