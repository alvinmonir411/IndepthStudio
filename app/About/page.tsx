import AboutHero from '@/app/Components/AboutUspages/AboutHero'
import CompanyIntroduction from '@/app/Components/AboutUspages/CompanyIntroduction'
import OurStory from '../Components/AboutUspages/OurStory'
import MissionVision from '../Components/AboutUspages/MissionVision'
import WhatMakesUsDifferent from '../Components/AboutUspages/WhatMakesUsDifferent'
import DesignProcess from '../Components/AboutUspages/DesignProcess'
import TeamSection from '../Components/AboutUspages/TeamSection'


const page = () => {
    return (
        <div>
            <AboutHero imageSrc="/aboutUSpages.jpg" imageAlt="About Us" />
            <CompanyIntroduction />
            <OurStory />
            <MissionVision />
            <WhatMakesUsDifferent />
            <DesignProcess />
            <TeamSection />
        </div>
    )
}

export default page