import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setScrollDirection, setShowScrollTop } from '../store/slices/uiSlice';
import { throttle } from '../utils/helpers';

const useScrollDirection = () => {
  const [scrollDirection, setScrollDirectionLocal] = useState('up');
  const [lastScrollY, setLastScrollY] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    const updateScrollDirection = throttle(() => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? 'down' : 'up';
      
      if (direction !== scrollDirection && (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)) {
        setScrollDirectionLocal(direction);
        dispatch(setScrollDirection(direction));
      }
      
      // Show scroll to top button when scrolled down 300px
      dispatch(setShowScrollTop(scrollY > 300));
      
      setLastScrollY(scrollY > 0 ? scrollY : 0);
    }, 100);

    window.addEventListener('scroll', updateScrollDirection);

    return () => {
      window.removeEventListener('scroll', updateScrollDirection);
    };
  }, [scrollDirection, lastScrollY, dispatch]);

  return scrollDirection;
};

export default useScrollDirection;
