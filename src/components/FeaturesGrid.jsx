import React from 'react';
import { ShieldCheck, Leaf, IndianRupee, CalendarClock, Lock, PauseCircle, Truck, Headset } from 'lucide-react';
import './FeaturesGrid.css';

const features = [
  { icon: <ShieldCheck size={24} />, title: "Verified Mess Partners", desc: "Rigorous quality checks for every kitchen." },
  { icon: <Leaf size={24} />, title: "Fresh Home Food", desc: "Prepared daily with local, fresh ingredients." },
  { icon: <IndianRupee size={24} />, title: "Affordable Pricing", desc: "Pocket-friendly plans for students and professionals." },
  { icon: <CalendarClock size={24} />, title: "Flexible Plans", desc: "Choose meals and timings that suit you." },
  { icon: <Lock size={24} />, title: "Secure Payments", desc: "100% safe transactions via UPI, Cards, or NetBanking." },
  { icon: <PauseCircle size={24} />, title: "Easy Pause Subscription", desc: "Going home? Pause your plan with one tap." },
  { icon: <Truck size={24} />, title: "Daily Delivery", desc: "Timely delivery right to your doorstep." },
  { icon: <Headset size={24} />, title: "Customer Support", desc: "24/7 dedicated support for all your queries." }
];

const FeaturesGrid = () => {
  return (
    <section className="features-section">
      <div className="container">
        <div className="section-header text-center flex-col">
          <h2 className="section-title">Why Kolhapurcha Dabewala?</h2>
          <p className="section-subtitle">We bring the comfort of home-cooked meals straight to you.</p>
        </div>
        
        <div className="features-grid">
          {features.map((feature, idx) => (
            <div key={idx} className="feature-card">
              <div className="feature-icon-wrapper">
                {feature.icon}
              </div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;
