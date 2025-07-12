import React from 'react'
import shlokImage from '../assets/images/shlok.png'
import simpleyelpcampImage from '../assets/images/simpleyelpcamp.png'
import muacmImage from '../assets/images/muacm.png'
import ascentrixImage from '../assets/images/Ascentrix.png'
import fianchettoImage from '../assets/images/Fianchetto.png'
import arrow from '../assets/icons/arrow.svg'
import noodleuiImage from '../assets/images/noodleui.png'
import witscribeImage from '../assets/images/witscribe.png'

const projects = [
  {
    name: "NoodleUi (Work in Progress)",
    description: "NoodleUI is a modern, intuitive user interface (UI) framework/library designed to simplify and accelerate the development of responsive web applications. It offers a clean, modular design system with customizable components that enhance user experience while maintaining performance and accessibility standards. Built with scalability in mind, NoodleUI enables developers to create visually appealing interfaces with minimal effort, making it ideal for projects ranging from simple landing pages to complex dashboards.",
    image: noodleuiImage,
    color: "bg-purple-300",
    link: "https://noodle-ui.vercel.app/"
  },
  {
    name: "WitScribe",
    description: "WitScribe is an AI-powered tool that automatically generates concise and accurate summaries of YouTube videos. By analyzing video transcripts and key points, WitScribe helps users quickly grasp the essential information without watching the entire video. Designed for efficiency and clarity, it’s ideal for students, professionals, and content creators who want to save time and enhance their learning or research experience.",
    image: witscribeImage,
    color: "bg-green-300",
    link: "https://witscribe.vercel.app/"
  },
  {
    name: "Shlok",
    description: "Shlok is a full-stack platform built to preserve, explore, and share the spiritual and historical essence of Sanatan Dharma (Hinduism). It is designed for devotees, scholars, and enthusiasts who seek easy access to sacred texts, devotional hymns, and historical knowledge in one interactive and engaging space.",
    image: shlokImage,
    color: "bg-blue-300",
    link: "https://theshlok.onrender.com/"
  },
  {
    name: "Medicaps University ACM Chapter Website",
    description: "Contributed to the development of the official website for the MUACM (Medicaps University ACM Chapter) as part of an open-source initiative during HacktoberFest. My work primarily involved refining user experience (UX), building modular and reusable frontend components, and adding interactivity to improve the overall usability of the website. Collaborated with the development team via GitHub, adhering to clean coding practices and contributing meaningful improvements to the project’s open-source codebase.",
    image: muacmImage,
    color: "bg-red-300",
    link: "https://muacm.vercel.app/"
  },
  {
    name: "SimpleYelpCamp",
    description: "SimpleYelpCamp is a full-stack web application designed for outdoor enthusiasts to explore, review, and share camping experiences. Inspired by the functionality of Yelp, it provides a platform where users can discover campgrounds, leave reviews, and contribute their own listings.",
    image: simpleyelpcampImage,
    color: "bg-stone-300",
    link: "https://simpleyelpcamp.onrender.com/"
  },
]

const Projects = () => {
  return (
    <div className='m-4 sm:m-6 md:m-8 lg:m-10 flex flex-col'>
      <h1 className='text-2xl sm:text-3xl font-semibold'>My Work 🚀</h1>
      <p className='mt-4 text-base sm:text-lg w-full sm:w-[80%]'>
        Welcome To My Mad Scientist Lab, Where I Experiment With Different Technologies And Create Cool Stuff. You Can See Everything I Created Or Working On Here. Explore Till Your Heart's Content.
      </p>
      <div className="showcase flex flex-wrap gap-6 sm:gap-8 lg:gap-10 mt-8">
        {projects.map((project) => (
          <div 
            className={`card p-6 sm:p-10 lg:p-20 flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-10 rounded-lg shadow-md bg-opacity-50 w-full ${project.color}`} 
            key={project.name}
          >
            <img 
              src={project.image} 
              alt="" 
              className='w-full lg:w-96 h-48 sm:h-60 object-contain rounded-md'
            />
            <div className="description flex flex-col gap-4 sm:gap-7">
              <h1 className='text-lg sm:text-xl font-semibold'>{project.name}</h1>
              <p className='w-auto text-base sm:text-lg'>{project.description}</p>
              {project.link && (
                <h2>
                  <a 
                    href={project.link} 
                    target='_blank' 
                    rel="noreferrer" 
                    className='text-black font-semibold text-sm sm:text-md flex items-center gap-2 sm:gap-3'
                  >
                    Check It Out <span><img src={arrow} alt="-->" /></span>
                  </a>
                </h2>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Projects