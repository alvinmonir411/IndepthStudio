import React from 'react'
import ServicesHero from '@/app/Components/ServicesPages/ServicesHero'
import ServicesOverview from '@/app/Components/ServicesPages/ServicesOverview'
import WhyChooseServices from '@/app/Components/ServicesPages/WhyChooseServices'
import ServicesGrid from '@/app/Components/ServicesPages/ServicesGrid'
import ServiceRelatedProjects from '@/app/Components/ServicesPages/ServiceRelatedProjects'
import DesignProcess from '@/app/Components/ServicesPages/DesignProcess'
import ServicesCTA from '@/app/Components/ServicesPages/ServicesCTA'

const page = () => {
    return (
        <main className="bg-stone-950 min-h-screen">
            <ServicesHero />
            <ServicesOverview />
            <ServicesGrid />
            <WhyChooseServices />
            <ServiceRelatedProjects />
            <DesignProcess />
            <ServicesCTA />
        </main>
    )
}




export default page
