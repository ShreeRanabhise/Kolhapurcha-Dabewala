import React, { useEffect } from 'react';
import Pricing from '../components/Pricing';

const SubscriptionPlans = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ backgroundColor: '#FFF8F0', minHeight: '100vh' }}>
      <Pricing />
    </div>
  );
};

export default SubscriptionPlans;
