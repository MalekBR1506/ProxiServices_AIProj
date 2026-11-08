'use client';

import Link from 'next/link';
import AIProblemChat from '@/components/AIProblemChat';
import RoleGuard from '@/components/RoleGuard';
import { secondaryButton } from '@/components/ui';

export default function NewRequestPage() {
  return (
    <RoleGuard allowedRoles={['CLIENT']}>
      <div className="min-h-screen bg-sand px-5 py-12 paper-grain sm:px-8 lg:px-12 lg:py-20">
        <div className="mx-auto max-w-5xl">
          <Link href="/client/dashboard" className="text-xs font-black uppercase tracking-[.2em] text-teal hover:text-tomato">← Back to dashboard</Link>
          <div className="mt-12 max-w-2xl">
            <p className="text-xs font-black uppercase tracking-[.2em] text-tomato">New service request</p>
            <h1 className="mt-3 font-display text-5xl font-black leading-tight text-ink sm:text-6xl">Start with what you know.</h1>
            <p className="mt-4 text-base leading-7 text-ink/60">Describe the situation naturally. We will help make the request specific before you meet a professional.</p>
          </div>
          <div className="mt-12 max-w-4xl"><AIProblemChat /></div>
        </div>
      </div>
    </RoleGuard>
  );
}
