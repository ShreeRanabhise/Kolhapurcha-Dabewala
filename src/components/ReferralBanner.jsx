import React from 'react';
import { Gift } from 'lucide-react';
import './ReferralBanner.css';

const ReferralBanner = () => {
  return (
    <section className="referral-section">
      <div className="container">
        <div className="referral-banner">
          <div className="referral-content">
            <div className="referral-icon">
              <Gift size={40} color="white" />
            </div>
            <div>
              <h2 className="referral-title">Invite Friends & Earn</h2>
              <p className="referral-desc">
                Get ₹100 Wallet Credit for every friend who subscribes to a meal plan using your referral code.
              </p>
            </div>
          </div>
          <button className="btn btn-outline referral-btn">Refer Now</button>
        </div>
      </div>
    </section>
  );
};

export default ReferralBanner;
