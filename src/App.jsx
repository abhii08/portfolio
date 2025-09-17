
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store';
import { initializeTheme } from './store/slices/themeSlice';
import { trackPageView } from './lib/supabase';
import Header from './components/layout/Header';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Projects from './components/sections/Projects';
import Skills from './components/sections/Skills';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import NotificationListener from './components/admin/NotificationListener';

function AppContent() {
  useEffect(() => {
    // Initialize theme on app load
    store.dispatch(initializeTheme());
    
    // Track page view
    trackPageView('home');
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
      <NotificationListener />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
