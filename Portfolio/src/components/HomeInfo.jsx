import React from 'react'
import { Link } from 'react-router-dom'
import arrow from '../assets/icons/arrow.svg'

const InfoBox = ({ text, link, btnText }) => {
    return (
      <div
        className="sm:text-md sm:leading-snug text-center 
        bg-blue-500 border-b-4 border-r-4 border-blue-600 
        shadow-lg rounded-2xl py-5 px-4 text-white 
        mx-auto my-6 max-w-xs lg:max-w-md"
      >
        <p className="mb-6 font-medium sm:text-lg text-center">{text}</p>
        <Link
          to={link}
          className="bg-white text-blue-500 rounded-xl px-4 py-2.5 w-full max-w-xs 
          inline-flex items-center justify-center gap-2 font-medium shadow-md 
          hover:bg-gray-100 transition-all duration-200"
        >
          {btnText}
          <img src={arrow} alt="arrow" className="w-4 h-4 object-contain" />
        </Link>
      </div>
    );
  }
const renderContent = {
    1: (
        <h1 className='sm:text-sm sm:leading-snug text-center
        bg-blue-500 border-b-3 border-r-3 mb-20 border-blue-600 shadow-2xs rounded-xl py-4 px-8 text-white mx-2'>
            Hello, I am <span className='font-semibold'>Anugrah</span>👋
            <br />
            An Engineering Student From India 
        </h1>
    ),
    2: (
        <InfoBox 
            text="I Do A Lot Off Stuff When I Am Bored, Like I Love To Code, Play Games, Much More"
            link="/about" 
            btnText="Learn More" 
        />
    ),
    3: (
        <InfoBox 
            text="Welcome To My Mad Scientist Lab, See For Yourself What I Have Created"
            link="/projects" 
            btnText="Explore" 
        />
    ),
    4: (
        <InfoBox 
            text="Need Something Built? I Can Help You With That"
            link="/contact" 
            btnText="Contact Me" 
        />
    )
}

const HomeInfo = ({ currentStage }) => {
    return renderContent[currentStage] || null
}

export default HomeInfo