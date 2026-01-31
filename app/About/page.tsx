import AboutHero from '@/app/Components/AboutUspages/AboutHero'
import CompanyIntroduction from '@/app/Components/AboutUspages/CompanyIntroduction'
import OurStory from '../Components/AboutUspages/OurStory'
import MissionVision from '../Components/AboutUspages/MissionVision'
import WhatMakesUsDifferent from '../Components/AboutUspages/WhatMakesUsDifferent'
import DesignProcess from '../Components/AboutUspages/DesignProcess'
import TeamSection from '../Components/AboutUspages/TeamSection'
import { getTeamMembers } from '../actions/team'


export default async function AboutPage() {
    const allMembers = await getTeamMembers();

    // Separate founder from team members using the isFounder flag
    const founder = allMembers.find((m: any) => m.isFounder === true) || allMembers.find((m: any) => m.role.toLowerCase().includes('founder'));
    const teamMembers = allMembers.filter((m: any) => m !== founder);

    return (
        <div>
            <AboutHero imageSrc="/aboutUSpages.jpg" imageAlt="About Us" />
            <CompanyIntroduction />
            <OurStory />
            <MissionVision />
            <WhatMakesUsDifferent />
            <DesignProcess />
            <TeamSection founder={founder} teamMembers={teamMembers} />
        </div>
    )
}