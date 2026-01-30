import AboutHero from '@/app/Components/AboutUspages/AboutHero'
import CompanyIntroduction from '@/app/Components/AboutUspages/CompanyIntroduction'
import OurStory from '../Components/AboutUspages/OurStory'
import MissionVision from '../Components/AboutUspages/MissionVision'
import WhatMakesUsDifferent from '../Components/AboutUspages/WhatMakesUsDifferent'

const page = () => {
    return (
        <div>
            <AboutHero imageSrc="/AboutUs.jpg" imageAlt="About Us" />
            <CompanyIntroduction />
            <OurStory />
            <MissionVision />
            <WhatMakesUsDifferent />
        </div>
    )
}

export default page