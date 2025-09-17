import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { 
  SiJavascript, SiTypescript, SiPython, SiHtml5, SiMysql,
  SiReact, SiNodedotjs, SiExpress, SiRedux, SiTailwindcss, SiVite,
  SiGit, SiDocker, SiPrisma, SiCloudflare, SiPostman,
  SiMongodb, SiPostgresql
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { VscCode } from 'react-icons/vsc';
import { skills } from '../../data/portfolioData';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../utils/animations';

const Skills = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const iconMap = {
    SiJavascript, SiTypescript, SiPython, FaJava, SiHtml5, SiMysql,
    SiReact, SiNodedotjs, SiExpress, SiRedux, SiTailwindcss, SiVite,
    SiGit, SiDocker, SiPrisma, SiCloudflare, VscCode, SiPostman,
    SiMongodb, SiPostgresql
  };

  const categories = [
    { id: 'languages', label: 'Languages', data: skills.languages },
    { id: 'frameworks', label: 'Frameworks', data: skills.frameworks },
    { id: 'tools', label: 'Tools', data: skills.tools },
    { id: 'databases', label: 'Databases', data: skills.databases },
    { id: 'libraries', label: 'Libraries', data: skills.libraries }
  ];

  const SkillBar = ({ skill, index }) => {
    const [animatedLevel, setAnimatedLevel] = useState(0);
    const IconComponent = iconMap[skill.icon];

    useEffect(() => {
      if (inView) {
        const timer = setTimeout(() => {
          setAnimatedLevel(skill.level);
        }, index * 100);
        return () => clearTimeout(timer);
      }
    }, [inView, skill.level, index]);

    return (
      <motion.div
        className="mb-6"
        variants={fadeInUp}
        transition={{ delay: index * 0.1 }}
      >
        <div className="flex items-center mb-2">
          <div className="flex items-center space-x-3">
            {IconComponent ? (
              <IconComponent className="text-2xl text-blue-600 dark:text-blue-400" />
            ) : (
              <div className="w-6 h-6 bg-blue-600 dark:bg-blue-400 rounded flex items-center justify-center text-white text-xs font-bold">
                {skill.name.charAt(0)}
              </div>
            )}
            <span className="font-medium text-gray-900 dark:text-white">
              {skill.name}
            </span>
          </div>
        </div>
        <div className="skill-bar">
          <motion.div
            className="skill-progress"
            initial={{ width: 0 }}
            animate={{ width: inView ? `${animatedLevel}%` : 0 }}
            transition={{ duration: 1, delay: index * 0.1, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    );
  };

  const SkillCard = ({ skill, index }) => {
    const IconComponent = iconMap[skill.icon];

    return (
      <motion.div
        className="card card-hover p-6 text-center group"
        variants={fadeInUp}
        transition={{ delay: index * 0.1 }}
        whileHover={{ y: -10, scale: 1.02 }}
      >
        <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800 transition-colors">
          {IconComponent ? (
            <IconComponent className="text-3xl text-blue-600 dark:text-blue-400" />
          ) : (
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {skill.name.charAt(0)}
            </div>
          )}
        </div>
        
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          {skill.name}
        </h3>
        
        <div className="flex items-center justify-center mb-3">
          <div className="flex space-x-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i < Math.floor(skill.level / 20)
                    ? 'bg-blue-600 dark:bg-blue-400'
                    : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      id="skills"
      className="section-padding bg-white dark:bg-gray-900"
      ref={ref}
    >
      <div className="container-custom">
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate={inView ? "animate" : "initial"}
        >
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            variants={fadeInUp}
          >
            <h2 className="heading-2 text-gray-900 dark:text-white mb-4">
              Skills & <span className="text-gradient">Expertise</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A comprehensive overview of my technical skills and proficiency levels across various 
              programming languages, frameworks, tools, and technologies.
            </p>
          </motion.div>

          {/* Skills Flow Diagram */}
          <div className="mb-16">
            {/* Category Headers with Animated Flow */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
              {categories.map((category, categoryIndex) => (
                <motion.div
                  key={category.id}
                  className="relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: categoryIndex * 0.2 }}
                >
                  {/* Category Header Box */}
                  <div className="bg-white dark:bg-gray-800 border-2 border-gray-800 dark:border-white rounded-2xl p-6 text-center shadow-lg hover:scale-105 hover:-translate-y-1 transition-transform duration-300">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {category.label}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-col items-center mt-4 space-y-2">
                    {category.data && category.data.map((skill, skillIndex) => (
                      <div
                        key={skill.name}
                        className="flex items-center space-x-2 opacity-100"
                      >
                        {/* Arrow */}
                        <div className="text-2xl text-blue-600 dark:text-blue-400 animate-pulse">
                          →
                        </div>
                        
                        {/* Skill Item */}
                        <div className="flex items-center space-x-2 bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded-lg min-w-[140px] hover:bg-blue-50 dark:hover:bg-gray-600 transition-colors duration-200">
                          <div className="flex-shrink-0">
                            {iconMap[skill.icon] ? (
                              React.createElement(iconMap[skill.icon], {
                                className: "text-lg text-blue-600 dark:text-blue-400"
                              })
                            ) : (
                              <div className="w-4 h-4 bg-blue-600 dark:bg-blue-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                                {skill.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {skill.name}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Convergence Point */}
            <motion.div
              className="text-center"
              variants={fadeInUp}
              transition={{ delay: 1.5 }}
            >
              <motion.div
                className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl shadow-xl"
                whileHover={{ scale: 1.1, rotate: [0, -1, 1, 0] }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <h3 className="text-2xl font-bold">Full Stack Developer</h3>
                <p className="text-blue-100 mt-1">Ready to Build Amazing Applications</p>
              </motion.div>
            </motion.div>
          </div>

          {/* Skills Summary */}
          <motion.div
            className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8"
            variants={fadeInUp}
          >
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {skills.languages.length}+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Programming Languages
                </div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {skills.frameworks.length}+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Frameworks & Tools
                </div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {skills.databases.length}+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Database Technologies
                </div>
              </div>
              
              <div>
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  {skills.libraries.length}+
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  Libraries & Packages
                </div>
              </div>
            </div>
          </motion.div>

          {/* Learning & Growth */}
          <motion.div
            className="text-center mt-16"
            variants={fadeInUp}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Continuous Learning
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              I'm constantly expanding my skill set and staying up-to-date with the latest 
              technologies and industry best practices. Currently exploring AI/ML integration 
              and advanced cloud architectures.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
              {['Next.js', 'GraphQL', 'AWS', 'Kubernetes', 'Machine Learning'].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 bg-yellow-100 dark:bg-yellow-900 text-yellow-600 dark:text-yellow-400 rounded-full text-sm font-medium"
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                >
                  🚀 Learning {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;
