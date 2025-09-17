import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveSection } from '../store/slices/uiSlice';
import { throttle } from '../utils/helpers';

const useScrollSpy = (sectionIds, offset = 100) => {
  const [activeSection, setActiveSectionLocal] = useState('home');
  const dispatch = useDispatch();

  useEffect(() => {
    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY + offset;

      // Find the current section
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            if (activeSection !== sectionIds[i]) {
              setActiveSectionLocal(sectionIds[i]);
              dispatch(setActiveSection(sectionIds[i]));
            }
            break;
          }
        }
      }
    }, 100);

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once to set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset, activeSection, dispatch]);

  return activeSection;
};

export default useScrollSpy;
