import React from 'react';
import { MapPin, Search, CalendarCheck, Utensils } from 'lucide-react';
import './HowItWorks.css';

const steps = [
  {
    id: 1,
    icon: <MapPin size={32} />,
    title: "Choose Area",
    desc: "Enter your location in Kolhapur to find nearby messes."
  },
  {
    id: 2,
    icon: <Search size={32} />,
    title: "Select Mess",
    desc: "Browse reviews, ratings, and menus to pick the best mess."
  },
  {
    id: 3,
    icon: <CalendarCheck size={32} />,
    title: "Subscribe Plan",
    desc: "Select a meal plan and pay securely online."
  },
  {
    id: 4,
    icon: <Utensils size={32} />,
    title: "Enjoy Daily Meals",
    desc: "Get fresh, hot food delivered to your door every day."
  }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="hiw-section">
      <div className="container">
        <div className="section-header text-center flex-col">
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">Get started in 4 simple steps.</p>
        </div>
        
        <div className="hiw-container">
          {steps.map((step, index) => (
            <div key={step.id} className="hiw-step">
              <div className="hiw-icon-container">
                <div className="hiw-icon">{step.icon}</div>
                <div className="hiw-number">{step.id}</div>
              </div>
              <h3 className="hiw-title">{step.title}</h3>
              <p className="hiw-desc">{step.desc}</p>
              
              {index < steps.length - 1 && (
                <div className="hiw-connector"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
