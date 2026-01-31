import React from 'react'
import ServicesHero from '@/app/Components/ServicesPages/ServicesHero'
import ServicesOverview from '@/app/Components/ServicesPages/ServicesOverview'
import WhyChooseServices from '@/app/Components/ServicesPages/WhyChooseServices'
import ServicesGrid from '@/app/Components/ServicesPages/ServicesGrid'
import ServiceRelatedProjects from '@/app/Components/ServicesPages/ServiceRelatedProjects'
import DesignProcess from '@/app/Components/ServicesPages/DesignProcess'
import ServicesCTA from '@/app/Components/ServicesPages/ServicesCTA'
import { getServices } from '@/app/actions/services'

export const revalidate = 3600;

export default async function ServicesPage() {
    const services = await getServices();

    return (
        <main className="bg-stone-950 min-h-screen">
            <ServicesHero />
            <ServicesOverview />
            <ServicesGrid services={services} />
            <WhyChooseServices />
            <ServiceRelatedProjects />
            <DesignProcess />
            <ServicesCTA />
        </main>
    )
}
