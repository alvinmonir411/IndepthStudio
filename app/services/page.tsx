import React from 'react'
import ServicesHero from '@/app/Components/ServicesPages/ServicesHero'
import ServicesOverview from '@/app/Components/ServicesPages/ServicesOverview'
import ServicesGrid from '@/app/Components/ServicesPages/ServicesGrid'

const page = () => {
    return (
        <main className="bg-stone-950 min-h-screen">
            <ServicesHero />
            <ServicesOverview />
            <ServicesGrid />
        </main>
    )
}



export default page
