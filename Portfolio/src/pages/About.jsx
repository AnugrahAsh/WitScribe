import React from 'react';
import htmlIcon from '../assets/icons/html.svg';
import cssIcon from '../assets/icons/css.svg';
import javascriptIcon from '../assets/icons/javascript.svg';
import reactIcon from '../assets/icons/react.svg';
import nodejsIcon from '../assets/icons/nodejs.svg';
import mongodbIcon from '../assets/icons/mongodb.svg';
import gitIcon from '../assets/icons/git.svg';
import figmaIcon from '../assets/icons/figma.svg';
import tailwindIcon from '../assets/icons/tailwindcss.svg';
import bootstrapIcon from '../assets/icons/bootstrap.svg';
import expressIcon from '../assets/icons/express.svg';
import javaIcon from '../assets/icons/java.svg';
import githubIcon from '../assets/icons/github.svg';
import postmanIcon from '../assets/icons/postman.svg';
import me from '../assets/images/Me.png';
import CTA from '../components/CTA';

const skills = [
  {
    name: "HTML5",
    icon: htmlIcon,
  },
  {
    name: "CSS3",
    icon: cssIcon,
  },
  {
    name: "JavaScript",
    icon: javascriptIcon,
  },
  {
    name: "MongoDB",
    icon: mongodbIcon,
  },
  {
    name: "Express",
    icon: expressIcon,
  },
  {
    name: "React",
    icon: reactIcon,
  },
  {
    name: "Node.js",
    icon: nodejsIcon,
  },
  {
    name: "Figma",
    icon: figmaIcon,
  },
  {
    name: "Tailwind CSS",
    icon: tailwindIcon,
  },
  {
    name: "Bootstrap",
    icon: bootstrapIcon,
  },
  {
    name: "Git",
    icon: gitIcon,
  },
  {
    name: "GitHub",
    icon: githubIcon,
  },
  {
    name: "Postman",
    icon: postmanIcon,
  },
  {
    name: "Java",
    icon: javaIcon,
  }
];

const About = () => {
  return (
    <section className='max-w-full px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-20'>
      <div className='max-w-7xl mx-auto'>
        <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-center sm:text-left'>
          Hello, I'm{" "}
          <span className='text-blue-600 font-semibold'>
            {" "}
            Anugrah
          </span>{" "}
          👋
        </h1>

        <div className='mt-5 sm:mt-8 flex flex-col md:flex-row items-center gap-8'>
          <div className='w-full md:w-2/3 lg:w-3/4'>
            <p className='text-base sm:text-lg text-slate-600 text-center md:text-left'>
              A visionary developer, strategist, and innovator dedicated to building transformative digital experiences. My journey is fueled by an unstoppable drive to master technology, dominate challenges, and create lasting impact.

              I specialize in full-stack development, AI-driven platforms, and interactive web experiences, crafting products that go beyond functionality—they inspire, engage, and disrupt. I've consistently pushed the boundaries of what's possible.

              Beyond coding, I embrace a relentless mindset of growth, discipline, and excellence. Whether it's training my left hand to become ambidextrous, learning a new language, reading books, playing chess, playing basketball, or script writing, I'm always seeking new ways to expand my horizons and sharpen my skills.
            </p>
          </div>
          
          <div className='w-full md:w-1/3 lg:w-1/2 flex justify-center'>
            <img 
              src={me} 
              alt="Anugrah" 
              className='rounded-xl object-contain w-full max-w-xs h-auto filter brightness-150'
            />
          </div>
        </div>

        <div className='mt-10 sm:mt-16'>
          <h3 className='text-lg sm:text-xl text-center sm:text-left font-semibold'>My Skills</h3>

          <div className='mt-6 sm:mt-10 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 sm:gap-6 justify-center'>
            {skills.map((skill) => (
              <div 
                className='relative w-full aspect-square flex flex-col items-center justify-center' 
                key={skill.name}
              >
                <div className='absolute inset-0 bg-blue-100 rounded-xl opacity-50 hover:opacity-75 transition-opacity duration-300'></div>
                <div className='relative z-10 flex flex-col items-center justify-center'>
                  <div className='w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 bg-white rounded-full shadow-md flex items-center justify-center mb-2'>
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className='w-2/3 h-2/3 object-contain'
                    />
                  </div>
                  <p className='text-xs sm:text-sm text-center text-slate-700'>
                    {skill.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <hr className='border-slate-200 mt-10'/>

      <CTA />

    </section>
  );
};

export default About;