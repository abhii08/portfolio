import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FiCode, FiDatabase, FiServer, FiGlobe } from 'react-icons/fi';
import { personalInfo, achievements } from '../../data/portfolioData';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer } from '../../utils/animations';
import Button from '../common/Button';

const About = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const handleContactClick = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const specialties = [
    {
      icon: <FiCode size={24} />,
      title: 'Frontend Development',
      description: 'Creating responsive, interactive user interfaces with React, TypeScript, and modern CSS frameworks.',
      technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion']
    },
    {
      icon: <FiServer size={24} />,
      title: 'Backend Development',
      description: 'Building scalable server-side applications with Node.js, Express, and modern backend technologies.',
      technologies: ['Node.js', 'Express.js', 'JWT', 'RESTful APIs']
    },
    {
      icon: <FiDatabase size={24} />,
      title: 'Database Management',
      description: 'Designing and optimizing databases for performance and scalability with SQL and NoSQL solutions.',
      technologies: ['MongoDB', 'PostgreSQL', 'Prisma', 'Database Design']
    },
    {
      icon: <FiGlobe size={24} />,
      title: 'Full Stack Integration',
      description: 'Seamlessly connecting frontend and backend systems for complete web application solutions.',
      technologies: ['API Integration', 'Authentication', 'Deployment', 'DevOps']
    }
  ];

  return (
    <section
      id="about"
      className="section-padding bg-gray-50 dark:bg-gray-800"
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
              About <span className="text-gradient">Me</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Passionate about creating efficient, scalable solutions that drive business growth and deliver exceptional user experiences.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            {/* Left Content */}
            <motion.div
              variants={fadeInLeft}
            >
              <div className="space-y-6">
                <h3 className="heading-3 text-gray-900 dark:text-white">
                  Crafting Digital Solutions with Precision
                </h3>
                
                <div className="space-y-4 text-gray-600 dark:text-gray-400">
                  <p>
                    With a strong foundation in Information Technology and hands-on experience in full-stack development, 
                    I specialize in building modern web applications that solve real-world problems.
                  </p>
                  
                  <p>
                    My journey began with a Bachelor's degree in Information Technology from Rajasthan Technical University, 
                    where I developed a solid understanding of computer science fundamentals and software engineering principles.
                  </p>
                  
                  <p>
                    Currently working as an Associate at Virtual Binz LLP, I collaborate with clients to deliver high-quality 
                    solutions while continuously expanding my technical expertise in cutting-edge technologies.
                  </p>
                </div>

                {/* Key Achievements */}
                <div className="space-y-3">
                  <h4 className="text-xl font-semibold text-gray-900 dark:text-white">Key Achievements</h4>
                  <ul className="space-y-2">
                    {achievements.map((achievement, index) => (
                      <motion.li
                        key={index}
                        className="flex items-start space-x-3"
                        variants={fadeInUp}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-gray-600 dark:text-gray-400">{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <Button
                  variant="primary"
                  onClick={handleContactClick}
                  className="mt-8"
                >
                  Let's Work Together
                </Button>
              </div>
            </motion.div>

            {/* Right Content - Personal Info */}
            <motion.div
              variants={fadeInRight}
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-8 shadow-xl">
                <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">Personal Info</h4>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Name</span>
                    <span className="font-medium text-gray-900 dark:text-white">{personalInfo.name}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Email</span>
                    <span className="font-medium text-gray-900 dark:text-white">{personalInfo.email}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Phone</span>
                    <span className="font-medium text-gray-900 dark:text-white">{personalInfo.phone}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Location</span>
                    <span className="font-medium text-gray-900 dark:text-white">{personalInfo.location}</span>
                  </div>
                  
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 dark:text-gray-400">Availability</span>
                    <span className="font-medium text-green-600 dark:text-green-400">Available</span>
                  </div>
                </div>

                {/* Download Resume */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <Button
                    variant="outline"
                    onClick={() => window.open('/resume.pdf', '_blank')}
                    className="w-full"
                  >
                    Download Resume
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Specialties Grid */}
          <motion.div
            variants={fadeInUp}
          >
            <div className="text-center mb-12">
              <h3 className="heading-3 text-gray-900 dark:text-white mb-4">
                My <span className="text-gradient">Specialties</span>
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400">
                Areas where I excel and deliver exceptional results
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {specialties.map((specialty, index) => (
                <motion.div
                  key={index}
                  className="card card-hover p-6 text-center"
                  variants={fadeInUp}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                >
                  <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600 dark:text-blue-400">
                    {specialty.icon}
                  </div>
                  
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    {specialty.title}
                  </h4>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">
                    {specialty.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 justify-center">
                    {specialty.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
