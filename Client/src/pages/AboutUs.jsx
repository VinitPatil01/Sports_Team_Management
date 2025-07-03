import React from 'react';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';


import ShubhamImage from '../assets/shubham.jpg';
import VinitImage from '../assets/vinit.jpg';
import RohitImage from '../assets/rohit.jpg';

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 sm:px-6 lg:px-8">
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-12">
        Meet Our Team
      </h2>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-center items-stretch gap-8 flex-wrap">
       
        <div className="w-full md:w-96 bg-white rounded-xl shadow-lg hover:shadow-xl p-6 transform hover:-translate-y-2 transition-all duration-300">
          <div className="flex flex-col items-center">
            <img 
              src={ShubhamImage} 
              alt="Shubham C Thete" 
              className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover mb-6"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-1">Shubham C Thete</h3>
            <p className="text-blue-600 font-semibold mb-4">SDE-1</p>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Full-stack developer specializing in modern web technologies. 
              Passionate about creating scalable solutions and optimizing user experiences.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a 
                href="mailto:shubham@example.com" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

       
        <div className="w-full md:w-96 bg-white rounded-xl shadow-lg hover:shadow-xl p-6 transform hover:-translate-y-2 transition-all duration-300">
          <div className="flex flex-col items-center">
            <img 
              src={VinitImage} 
              alt="Vinit Patil" 
              className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover mb-6"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-1">Vinit Patil</h3>
            <p className="text-blue-600 font-semibold mb-4">Development Engineer</p>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Front-end specialist with a keen eye for design. 
              Expertise in React ecosystem and creating responsive, accessible interfaces.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a 
                href="mailto:vinit@example.com" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        
        <div className="w-full md:w-96 bg-white rounded-xl shadow-lg hover:shadow-xl p-6 transform hover:-translate-y-2 transition-all duration-300">
          <div className="flex flex-col items-center">
            <img 
              src={RohitImage} 
              alt="Rohit Jadhav" 
              className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover mb-6"
            />
            <h3 className="text-xl font-bold text-gray-800 mb-1">Rohit Jadhav</h3>
            <p className="text-blue-600 font-semibold mb-4">Development Engineer</p>
            <p className="text-gray-600 text-center mb-6 leading-relaxed">
              Back-end developer focused on system architecture and database design. 
              Loves solving complex problems with efficient code.
            </p>
            <div className="flex gap-4">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <FaLinkedin className="w-6 h-6" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="GitHub"
              >
                <FaGithub className="w-6 h-6" />
              </a>
              <a 
                href="mailto:rohit@example.com" 
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="Email"
              >
                <FaEnvelope className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;