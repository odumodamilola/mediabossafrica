
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Features from './pages/Features';
import Solutions from './pages/Solutions';
import Pricing from './pages/Pricing';
import Resources from './pages/Resources';
import Contact from './pages/Contact';
import Apply from './pages/Apply';
import Work from './pages/Work';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import { PageType } from './types';
import { SEO_CONFIG, FAQS } from './constants';

const SEOManager: React.FC<{ page: PageType }> = ({ page }) => {
  const config = SEO_CONFIG[page] || SEO_CONFIG.home;
  const baseUrl = "https://mediabossafrica.com";
  const canonicalUrl = `${baseUrl}/#${page === 'home' ? '' : page}`;

  useEffect(() => {
    document.title = config.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) metaDescription.setAttribute('content', config.description);
  }, [page, config]);

  return null;
};

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<PageType>('home');
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as PageType;
      const validPages: PageType[] = ['home', 'features', 'solutions', 'pricing', 'resources', 'contact', 'apply', 'work', 'privacy', 'terms'];
      if (validPages.includes(hash)) {
        setActivePage(hash);
      } else {
        setActivePage('home');
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: PageType) => {
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home': return <Home onNavigate={handleNavigate} />;
      case 'features': return <Features />;
      case 'solutions': return <Solutions />;
      case 'pricing': return <Pricing onNavigate={handleNavigate} />;
      case 'resources': return <Resources />;
      case 'contact': return <Contact />;
      case 'apply': return <Apply />;
      case 'work': return <Work />;
      case 'privacy': return <Privacy />;
      case 'terms': return <Terms />;
      default: return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="bg-brand-deep min-h-screen text-white selection:bg-brand-magenta selection:text-white font-sans overflow-x-hidden">
      <SEOManager page={activePage} />
      <motion.div className="fixed top-0 left-0 right-0 h-[2px] bg-brand-magenta z-[110] origin-left shadow-[0_0_15px_#ff00a0]" style={{ scaleX }} />
      <Navbar activePage={activePage} onNavigate={handleNavigate} />
      <main className="relative z-10" id="main-content">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activePage} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -10 }} 
            transition={{ duration: 0.5, ease: "expo" }}
          >
            {renderPage()}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer onNavigate={handleNavigate} />
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(255,0,160,0.02)_0%,_transparent_60%)]" />
      </div>
    </div>
  );
};

export default App;
