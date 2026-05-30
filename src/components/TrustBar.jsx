import React from 'react';
import './TrustBar.css';

const trustStats = [
  { label: 'Verified Mess Partners', value: '50+' },
  { label: 'Active Subscribers', value: '1000+' },
  { label: 'Delivery Success', value: '99%' },
  { label: 'Average Rating', value: '4.8' },
];

const TrustBar = () => {
  return (
    <section className="trust-section">
      <div className="container">
        <div className="trust-grid">
          {trustStats.map((stat, index) => (
            <div key={index} className="trust-stat">
              <h2 className="stat-value text-secondary">{stat.value}</h2>
              <p className="stat-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBar;
