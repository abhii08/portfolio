import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiBriefcase, FiCalendar, FiMapPin, FiTrendingUp } from 'react-icons/fi';
import { experience, education } from '../../data/portfolioData';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../utils/animations';

const Experience = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Combine experience and education with type indicators
  const timelineItems = [
    ...experience.map(item => ({ ...item, type: 'experience' })),
    ...education.map(item => ({ ...item, type: 'education' }))
  ].sort((a, b) => {
    // Sort by start date (assuming duration format includes years)
    const getYear = (duration) => {
      const match = duration.match(/(\d{4})/);
      return match ? parseInt(match[1]) : 0;
    };
    return getYear(b.duration) - getYear(a.duration);
  });


  const TimelineItem = ({ item, index, isEducation = false }) => {
    return (
      <div className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
            <FiBriefcase className="text-blue-600 dark:text-blue-400" size={20} />
          </div>
          <div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {isEducation ? item.degree : item.position}
            </h3>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              {isEducation ? item.institution : item.company}
            </p>
          </div>
        </div>

        {/* Meta Information */}
        <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center space-x-1">
            <FiCalendar size={16} />
            <span>{item.duration}</span>
          </div>
          <div className="flex items-center space-x-1">
            <FiMapPin size={16} />
            <span>{item.location}</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {item.description}
        </p>

        {/* Achievements */}
        {item.achievements && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <FiTrendingUp size={16} className="mr-2" />
              Key Achievements
            </h4>
            <ul className="space-y-2">
              {item.achievements.map((achievement, achIndex) => (
                <li key={achIndex} className="flex items-start space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Field for Education */}
        {isEducation && item.field && (
          <div className="mb-4">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              <strong>Field:</strong> {item.field}
            </span>
          </div>
        )}

        {/* Coursework for Education */}
        {isEducation && item.coursework && (
          <div className="mb-4">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
              Coursework
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <pre className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap font-sans leading-relaxed">
                {item.coursework}
              </pre>
            </div>
          </div>
        )}

        {/* Technologies */}
        {item.technologies && (
          <div className="flex flex-wrap gap-2">
            {item.technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      id="experience"
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
              My <span className="text-gradient">Journey</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              A timeline of my professional experience and educational background that shaped my expertise in full-stack development.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16"
            variants={fadeInUp}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">1+</div>
              <div className="text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">3+</div>
              <div className="text-gray-600 dark:text-gray-400">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10+</div>
              <div className="text-gray-600 dark:text-gray-400">Technologies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Client Satisfaction</div>
            </div>
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Mobile Timeline Line */}
            <div className="lg:hidden absolute left-6 top-0 bottom-0 w-0.5 bg-gray-300 dark:bg-gray-600" />
            
            {/* Timeline Items */}
            <div className="space-y-8 lg:space-y-0">
              {timelineItems.length > 0 ? (
                timelineItems.map((item, index) => (
                  <TimelineItem 
                    key={`timeline-${index}`} 
                    item={item} 
                    index={index} 
                    isEducation={item.type === 'education'} 
                  />
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">No timeline items found. Debug info in console.</p>
                </div>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <motion.div
            className="text-center mt-16"
            variants={fadeInUp}
          >
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Ready to Start Your Next Project?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Let's collaborate to bring your ideas to life with cutting-edge technology and innovative solutions.
              </p>
              <motion.button
                className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get In Touch
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
