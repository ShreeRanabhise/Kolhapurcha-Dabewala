import React from 'react';
import { Smartphone, CheckCircle, Apple } from 'lucide-react';
import './AppPromo.css';

const appFeatures = [
  "Track your daily meals live",
  "Pause or resume plan instantly",
  "Change mess provider with one tap",
  "Recharge KD Wallet easily",
  "Earn referral rewards"
];

const AppPromo = () => {
  return (
    <section className="app-promo-section">
      <div className="container">
        <div className="app-promo-wrapper">
          <div className="app-promo-content">
            <h2 className="promo-title">Manage Your Meals on the Go!</h2>
            <p className="promo-desc">
              Download the Kolhapurcha Dabewala app to track your meals, pause your subscription, and manage your wallet seamlessly.
            </p>
            
            <ul className="promo-features">
              {appFeatures.map((feature, idx) => (
                <li key={idx}>
                  <CheckCircle size={20} className="text-secondary" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            
            <div className="promo-actions">
              <button className="btn btn-primary">
                <Smartphone size={20} />
                Download App
              </button>
              <button className="btn btn-outline coming-soon" disabled>
                <Apple size={20} />
                iOS App (Coming Soon)
              </button>
            </div>
          </div>
          
          <div className="app-promo-image">
            {/* Using a placeholder phone mockup since we don't have an actual app mockup image */}
            <div className="phone-mockup">
              <div className="phone-screen">
                <div className="phone-header">
                  <div className="phone-logo">KD</div>
                  <div className="phone-user"></div>
                </div>
                <div className="phone-banner bg-maroon text-white">
                  <h4>Today's Lunch</h4>
                  <p>Arriving in 15 mins</p>
                </div>
                <div className="phone-list">
                  <div className="phone-item"></div>
                  <div className="phone-item"></div>
                  <div className="phone-item"></div>
                </div>
                <div className="phone-nav"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
