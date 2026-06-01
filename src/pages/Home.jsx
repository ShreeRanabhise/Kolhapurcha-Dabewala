import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import TrustBar from '../components/TrustBar';
import FeaturedMesses from '../components/FeaturedMesses';

import Testimonials from '../components/Testimonials';
import AppPromo from '../components/AppPromo';
import ReferralBanner from '../components/ReferralBanner';
import FAQ from '../components/FAQ';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100); // slight delay to ensure DOM is ready
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <>
      <Hero />
      <FeaturedMesses />
      <TrustBar />

      <Testimonials />
      <AppPromo />
      <ReferralBanner />
      <FAQ />
    </>
  );
};

export default Home;
