import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  GraduationCap, Utensils, Crown, Check, CheckCircle2, 
  RotateCcw, ShieldCheck, BadgeCheck, Users, Smile, Bike, 
  Star, Headphones 
} from 'lucide-react';
import './Pricing.css';

const Pricing = () => {
  const navigate = useNavigate();

  const handleChoosePlan = (plan) => {
    // Navigate to find mess directory with selected plan filter context
    navigate('/find-mess');
  };

  const handleContactUs = () => {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/#footer');
    }
  };

  return (
    <section className="premium-pricing-section">
      <div className="pricing-container-width">
        
        {/* Floating Thalis for Premium Tech Startup Aesthetic */}
        <div className="floating-plate floating-plate-left">
          <img 
            src="https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=400&q=80" 
            alt="Delicious Indian Curry Rice Thali Plate" 
          />
        </div>
        <div className="floating-plate floating-plate-right">
          <img 
            src="https://images.unsplash.com/photo-1589302168068-964664d93cb0?auto=format&fit=crop&w=400&q=80" 
            alt="Traditional Indian Steel Thali Plate" 
          />
        </div>

        {/* Decorative Grid Dot Patterns */}
        <div className="dots-grid dots-grid-left"></div>
        <div className="dots-grid dots-grid-right"></div>

        {/* SECTION HEADER */}
        <div className="premium-pricing-header">
          <div className="pricing-badge-capsule">
            <span className="badge-emoji">💳</span>
            <span className="badge-text">Flexible Subscription Plans</span>
          </div>
          
          <h1 className="pricing-main-heading">
            Choose the Perfect <br />
            <span className="gradient-highlight-text">Meal Plan</span> for You
          </h1>
          
          <p className="pricing-subheading-text">
            Affordable home-style meals for students, working professionals, bachelors and families.
          </p>
        </div>

        {/* PLAN CARDS GRID */}
        <div className="premium-plans-cards-grid">
          
          {/* CARD 1: Student Plan */}
          <div className="plan-card-box student-box">
            <div className="card-top-identity">
              <div className="card-icon-round grey">
                <GraduationCap size={28} className="icon-grey" />
              </div>
              <div className="card-title-badge-group">
                <h3 className="card-plan-title">Student Plan</h3>
                <span className="card-tag-pill orange">🔥 Most Popular</span>
              </div>
            </div>

            <div className="card-pricing-block">
              <span className="rupee-symbol">₹</span>
              <span className="price-number">1999</span>
              <span className="pricing-duration">/month</span>
            </div>

            <div className="card-divider-line"></div>

            <ul className="card-features-bullet-list">
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Lunch Only</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>30 Meals / Month</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Daily Delivery</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Veg Meals</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Pause Anytime</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Customer Support</span>
              </li>
            </ul>

            <button 
              onClick={() => handleChoosePlan('student')} 
              className="btn-plan-action outline"
            >
              Choose Plan
            </button>
          </div>

          {/* CARD 2: Standard Plan (Highlighted Card) */}
          <div className="plan-card-box standard-box highlighted">
            {/* Best Value Overlapping Badge */}
            <div className="best-value-overlapping-badge">
              <Star size={12} fill="#FFFFFF" stroke="none" />
              <span>Best Value</span>
            </div>

            <div className="card-top-identity">
              <div className="card-icon-round orange">
                <Utensils size={26} className="icon-orange" />
              </div>
              <div className="card-title-badge-group">
                <h3 className="card-plan-title">Standard Plan</h3>
              </div>
            </div>

            <div className="card-pricing-block">
              <span className="rupee-symbol">₹</span>
              <span className="price-number">2499</span>
              <span className="pricing-duration">/month</span>
            </div>

            <div className="card-divider-line"></div>

            <ul className="card-features-bullet-list">
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Lunch + Dinner</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>60 Meals / Month</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Daily Delivery</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Veg & Non-Veg Options</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Pause Anytime</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Change Provider Anytime</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Priority Support</span>
              </li>
            </ul>

            <button 
              onClick={() => handleChoosePlan('standard')} 
              className="btn-plan-action solid"
            >
              Choose Plan
            </button>
          </div>

          {/* CARD 3: Premium Plan */}
          <div className="plan-card-box premium-box">
            <div className="card-top-identity">
              <div className="card-icon-round gold">
                <Crown size={26} className="icon-gold" />
              </div>
              <div className="card-title-badge-group">
                <h3 className="card-plan-title">Premium Plan</h3>
                <span className="card-tag-pill gold">👑 Premium</span>
              </div>
            </div>

            <div className="card-pricing-block">
              <span className="rupee-symbol">₹</span>
              <span className="price-number">3499</span>
              <span className="pricing-duration">/month</span>
            </div>

            <div className="card-divider-line"></div>

            <ul className="card-features-bullet-list">
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Breakfast + Lunch + Dinner</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Unlimited Monthly Meals</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Premium Mess Partners</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Free Delivery</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Flexible Schedule</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Priority Customer Support</span>
              </li>
              <li>
                <Check className="feature-check-icon" size={16} />
                <span>Special Weekend Menu</span>
              </li>
            </ul>

            <button 
              onClick={() => handleChoosePlan('premium')} 
              className="btn-plan-action outline"
            >
              Choose Plan
            </button>
          </div>

        </div>

        {/* COMPARISON BAR */}
        <div className="premium-comparison-bar-card">
          <div className="comparison-item">
            <div className="comp-icon-box green">
              <CheckCircle2 size={20} className="icon-green" />
            </div>
            <div className="comp-text-details">
              <h4>No Hidden Charges</h4>
              <p>What you see is what you pay</p>
            </div>
          </div>
          
          <div className="comparison-item">
            <div className="comp-icon-box orange">
              <RotateCcw size={20} className="icon-orange" />
            </div>
            <div className="comp-text-details">
              <h4>Cancel Anytime</h4>
              <p>Pause or cancel at any time</p>
            </div>
          </div>

          <div className="comparison-item">
            <div className="comp-icon-box blue">
              <ShieldCheck size={20} className="icon-blue" />
            </div>
            <div className="comp-text-details">
              <h4>Secure Payments</h4>
              <p>100% safe & secure payments</p>
            </div>
          </div>

          <div className="comparison-item">
            <div className="comp-icon-box purple">
              <BadgeCheck size={20} className="icon-purple" />
            </div>
            <div className="comp-text-details">
              <h4>Verified Mess Partners</h4>
              <p>Quality checked & trusted</p>
            </div>
          </div>
        </div>

        {/* TRUST SECTION WITH STATS AND HELP CTA */}
        <div className="premium-trust-stats-section-box">
          <div className="trust-stats-left-grid">
            <div className="trust-stat-col-item">
              <div className="stat-icon-wrapper-orange">
                <Users size={22} className="stat-orange-icon" />
              </div>
              <div className="stat-numbers-details">
                <h3>50+</h3>
                <h4>Verified Partners</h4>
                <p>Trusted mess providers</p>
              </div>
            </div>

            <div className="trust-stat-col-item">
              <div className="stat-icon-wrapper-yellow">
                <Smile size={22} className="stat-yellow-icon" />
              </div>
              <div className="stat-numbers-details">
                <h3>1200+</h3>
                <h4>Happy Subscribers</h4>
                <p>Across Kolhapur</p>
              </div>
            </div>

            <div className="trust-stat-col-item">
              <div className="stat-icon-wrapper-orange">
                <Bike size={22} className="stat-orange-icon" />
              </div>
              <div className="stat-numbers-details">
                <h3>99%</h3>
                <h4>Delivery Success</h4>
                <p>On-time delivery</p>
              </div>
            </div>

            <div className="trust-stat-col-item">
              <div className="stat-icon-wrapper-star-orange">
                <Star size={20} fill="#FF6B00" stroke="none" className="stat-star-icon" />
              </div>
              <div className="stat-numbers-details">
                <h3>4.8★</h3>
                <h4>Average Rating</h4>
                <p>Average Rating</p>
              </div>
            </div>
          </div>

          <div className="vertical-section-divider"></div>

          <div className="trust-help-right-cta">
            <h3 className="help-box-title">Need Help Choosing?</h3>
            <p className="help-box-sub">Talk to our support team</p>
            <button onClick={handleContactUs} className="btn-help-contact-orange">
              <Headphones size={16} />
              <span>Contact Us</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;
