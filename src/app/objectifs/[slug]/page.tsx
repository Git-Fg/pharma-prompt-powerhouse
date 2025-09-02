import { notFound } from 'next/navigation';
import { getObjectifBySlug, content } from '@/lib/content-loader';
import { ContentRenderer } from '@/components/shared/ContentRenderer';

interface ObjectifPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return content.objectives.map((obj) => ({ slug: obj.slug }));
}

export default function ObjectifPage({ params }: ObjectifPageProps) {
  const objectif = getObjectifBySlug(params.slug);

  if (!objectif) {
    notFound();
  }

  return (
    <article className="prose dark:prose-invert mx-auto py-8">
      <h1>{objectif.title}</h1>
      <p className="lead">{objectif.description}</p>
      <ContentRenderer content={objectif.content} />
    </article>
  );
}
