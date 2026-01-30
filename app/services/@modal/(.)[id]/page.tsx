import { servicesData } from '@/app/services/servicesData';
import ServiceDetailModal from '@/app/Components/ServicesPages/ServiceDetailModal';
import { notFound } from 'next/navigation';

export default async function ServiceModalPage(props: { params: Promise<{ id: string }> }) {
    const params = await props.params;
    const service = servicesData.find((s) => s.id === params.id);

    if (!service) {
        return notFound();
    }

    return <ServiceDetailModal service={service} />;
}
