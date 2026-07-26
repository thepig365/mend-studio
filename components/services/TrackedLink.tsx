"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import {
  trackExperienceEvent,
  type ExperienceEvent,
} from "@/lib/experience-analytics";

export default function TrackedLink({
  href,
  event,
  detail,
  className,
  children,
}: {
  href: string;
  event: ExperienceEvent;
  detail?: Record<string, string | number | boolean>;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => trackExperienceEvent(event, detail)}
    >
      {children}
    </Link>
  );
}
