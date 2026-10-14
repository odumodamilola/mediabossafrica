import ServiceDetail from '../../../views/ServiceDetail';

export default function Page({ params }: { params: { slug: string } }) {
  return <ServiceDetail slug={params.slug} />;
}
