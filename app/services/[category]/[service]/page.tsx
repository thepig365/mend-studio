import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ServiceExperience from "@/components/services/ServiceExperience";
import { getService, services } from "@/lib/service-catalog";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ category: string; service: string }> };

export function generateStaticParams() {
  return services.map((service) => ({
    category: service.category,
    service: service.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category, service: slug } = await params;
  const service = getService(category, slug);
  if (!service) return {};
  return pageMetadata({
    title: service.name.en,
    description: `${service.summary.en} ${service.duration.en}; ${service.price.display.en}.`,
    path: `/services/${category}/${slug}`,
  });
}

export default async function ServicePage({ params }: Props) {
  const { category, service: slug } = await params;
  const service = getService(category, slug);
  if (!service) notFound();
  return <ServiceExperience service={service} language="en" />;
}
