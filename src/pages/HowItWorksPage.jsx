import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Eye, Calendar, CreditCard, ShieldCheck, 
  Star, ChefHat, Bike, Layers, Lock, Smartphone, 
  ArrowRight, Landmark, Compass, Award, ShieldAlert, AwardIcon
} from 'lucide-react';
import './HowItWorksPage.css';

const HowItWorksPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="hiw-page-wrapper">
      
      {/* Background glowing gradients */}
      <div className="hiw-background-glow hiw-glow-top-left"></div>
      <div className="hiw-background-glow hiw-glow-bottom-right"></div>

      <div className="hiw-main-container">
        
        {/* SECTION HEADER */}
        <header className="hiw-page-header">
          <div className="hiw-section-badge">
            <span className="badge-emoji">🍱</span>
            <span className="badge-text">How Kolhapurcha Dabewala Works</span>
          </div>
          
          <h1 className="hiw-main-title">
            From Searching <br />
            To Eating <span className="title-orange-gradient">Home-Style Meals</span>
          </h1>
          
          <p className="hiw-subheading-text">
            Finding a trusted mess in Kolhapur has never been easier. Subscribe and eat in under 2 minutes.
          </p>
        </header>

        {/* 5-STEP HORIZONTAL TIMELINE */}
        <section className="hiw-timeline-section">
          <div className="timeline-horizontal-connecting-line"></div>
          
          <div className="hiw-steps-row-grid">
            
            {/* STEP 1: Choose Your Area */}
            <div className="hiw-step-card-item">
              <div className="step-badge-number">01</div>
              
              <div className="step-illustration-box">
                {/* Visual: Student arrives in Kolhapur with luggage */}
                <div className="ill-student-luggage">
                  <div className="ill-map-grid">
                    <MapPin className="ill-pin-icon pulse-animation" size={24} />
                    <span className="ill-city-text">KOLHAPUR</span>
                  </div>
                  <div className="ill-bag-stack">
                    <div className="ill-bag-primary"></div>
                    <div className="ill-bag-secondary"></div>
                  </div>
                </div>
              </div>

              <h3 className="step-card-title">Choose Your Area</h3>
              <p className="step-card-desc">
                Select your college, hostel, office area or neighborhood.
              </p>
              
              <div className="step-card-tags-list">
                <span className="tag-item">Rajarampuri</span>
                <span className="tag-item">Shahupuri</span>
                <span className="tag-item">Tarabai Park</span>
                <span className="tag-item">University</span>
              </div>
            </div>

            {/* STEP 2: Compare Verified Messes */}
            <div className="hiw-step-card-item">
              <div className="step-badge-number">02</div>
              
              <div className="step-illustration-box">
                {/* Visual: Browsing food cards */}
                <div className="ill-browsing-food-cards">
                  <div className="ill-food-card active">
                    <div className="ill-card-pic veg-thali"></div>
                    <div className="ill-card-details">
                      <div className="ill-line short"></div>
                      <div className="ill-meta-row">
                        <span className="ill-star-badge">★ 4.8</span>
                        <span className="ill-price">₹1999</span>
                      </div>
                    </div>
                  </div>
                  <div className="ill-food-card shadow-peeking">
                    <div className="ill-card-pic nonveg-thali"></div>
                  </div>
                </div>
              </div>

              <h3 className="step-card-title">Compare Verified Messes</h3>
              <p className="step-card-desc">
                View menus, pricing, ratings and subscriber reviews.
              </p>
            </div>

            {/* STEP 3: Select Your Plan */}
            <div className="hiw-step-card-item">
              <div className="step-badge-number">03</div>
              
              <div className="step-illustration-box">
                {/* Visual: Mess profile page with subscription pricing cards */}
                <div className="ill-profile-subscription-select">
                  <div className="ill-toggle-bar">
                    <span className="toggle-pill active">Monthly</span>
                    <span className="toggle-pill">Weekly</span>
                  </div>
                  <div className="ill-pricing-mini-grid">
                    <div className="ill-pricing-box selected">
                      <span className="ill-plan-name">Standard</span>
                      <span className="ill-plan-rate">₹2499</span>
                    </div>
                    <div className="ill-pricing-box">
                      <span className="ill-plan-name">Student</span>
                      <span className="ill-plan-rate">₹1999</span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="step-card-title">Select Your Plan</h3>
              <p className="step-card-desc">
                Choose daily, weekly or monthly meal subscriptions.
              </p>
            </div>

            {/* STEP 4: Subscribe Securely */}
            <div className="hiw-step-card-item">
              <div className="step-badge-number">04</div>
              
              <div className="step-illustration-box">
                {/* Visual: Mobile payment screen */}
                <div className="ill-mobile-payment-screen">
                  <div className="ill-lock-badge">
                    <Lock size={12} className="lock-icon" />
                    <span>Secure Checkout</span>
                  </div>
                  <div className="ill-upi-pill">
                    <span className="upi-logo">UPI</span>
                    <span className="upi-status">Pay Securely</span>
                  </div>
                  <div className="ill-bank-icons-row">
                    <div className="bank-card-shape font-bold">💳 VISA</div>
                    <div className="bank-card-shape font-bold">🏛 Net</div>
                  </div>
                </div>
              </div>

              <h3 className="step-card-title">Subscribe Securely</h3>
              <p className="step-card-desc">
                Pay using UPI, Cards or Net Banking.
              </p>
            </div>

            {/* STEP 5: Receive Fresh Meals */}
            <div className="hiw-step-card-item">
              <div className="step-badge-number">05</div>
              
              <div className="step-illustration-box">
                {/* Visual: Delivery rider carrying tiffin */}
                <div className="ill-delivery-rider-tiffin">
                  <div className="ill-tiffin-carrier-stack">
                    <div className="carrier-ring"></div>
                    <div className="carrier-ring"></div>
                    <div className="carrier-ring"></div>
                  </div>
                  <Bike size={24} className="rider-bike-icon move-horizontal" />
                  <div className="ill-delivery-pin">📍 Doorstep</div>
                </div>
              </div>

              <h3 className="step-card-title">Receive Fresh Meals</h3>
              <p className="step-card-desc">
                Get delicious home-style food delivered every day.
              </p>
            </div>

          </div>
        </section>

        {/* VISUAL JOURNEY SECTION */}
        <section className="hiw-visual-journey-section">
          <div className="hiw-journey-outer-card">
            
            <header className="journey-card-header">
              <h2 className="journey-title">Your Daily Meal Journey</h2>
              <p className="journey-subtitle">Experience fresh food prepared and delivered at the right times, every day.</p>
            </header>

            <div className="journey-timeline-flow-row">
              
              {/* Morning: Breakfast Prepared */}
              <div className="journey-flow-col">
                <div className="journey-flow-time">Morning</div>
                <div className="journey-flow-circle-indicator orange">
                  <span className="circle-emoji">🍳</span>
                </div>
                <h4 className="journey-flow-event-title">Breakfast Prepared</h4>
                <p className="journey-flow-event-desc">Freshly prepared local dishes like Poha, Upma or Idli at 7:30 AM.</p>
              </div>

              <div className="journey-horizontal-arrow-connector"></div>

              {/* Noon: Lunch Delivered */}
              <div className="journey-flow-col">
                <div className="journey-flow-time">Noon</div>
                <div className="journey-flow-circle-indicator green">
                  <span className="circle-emoji">🍱</span>
                </div>
                <h4 className="journey-flow-event-title">Lunch Delivered</h4>
                <p className="journey-flow-event-desc">Hot authentic thali with chapati, curry and rice arrives by 12:30 PM.</p>
              </div>

              <div className="journey-horizontal-arrow-connector"></div>

              {/* Evening: Dinner Delivered */}
              <div className="journey-flow-col">
                <div className="journey-flow-time">Evening</div>
                <div className="journey-flow-circle-indicator purple">
                  <span className="circle-emoji">🥘</span>
                </div>
                <h4 className="journey-flow-event-title">Dinner Delivered</h4>
                <p className="journey-flow-event-desc">Hygienically packed evening meals delivered directly by 7:30 PM.</p>
              </div>

              <div className="journey-horizontal-arrow-connector"></div>

              {/* Night: Rate Your Experience */}
              <div className="journey-flow-col">
                <div className="journey-flow-time">Night</div>
                <div className="journey-flow-circle-indicator gold">
                  <span className="circle-emoji">⭐</span>
                </div>
                <h4 className="journey-flow-event-title">Rate Your Experience</h4>
                <p className="journey-flow-event-desc">Pause schedules or rate your provider directly via your customer portal.</p>
              </div>

            </div>

          </div>
        </section>

        {/* WHY USERS LOVE IT */}
        <section className="hiw-why-love-section">
          <header className="why-love-section-header">
            <h2>Why Users Love It</h2>
            <p>Hassle-free meal management designed for modern living.</p>
          </header>

          <div className="why-love-features-grid">
            
            <div className="why-love-grid-item">
              <div className="why-love-icon-box yellow">
                <Star size={20} fill="#EAB308" stroke="none" />
              </div>
              <div className="why-love-info">
                <h4>Verified Mess Partners</h4>
                <p>Every single mess is handpicked, quality checked, and FSSAI certified.</p>
              </div>
            </div>

            <div className="why-love-grid-item">
              <div className="why-love-icon-box orange">
                <ChefHat size={20} className="icon-orange" />
              </div>
              <div className="why-love-info">
                <h4>Home-Style Food</h4>
                <p>Hygienic, light, and low-oil meals prepared by local cooks like family.</p>
              </div>
            </div>

            <div className="why-love-grid-item">
              <div className="why-love-icon-box green">
                <Bike size={20} className="icon-green" />
              </div>
              <div className="why-love-info">
                <h4>On-Time Delivery</h4>
                <p>Hot lunch and dinner arrive right at your doorstep on a fixed schedule.</p>
              </div>
            </div>

            <div className="why-love-grid-item">
              <div className="why-love-icon-box orange">
                <span className="why-love-emoji">💰</span>
              </div>
              <div className="why-love-info">
                <h4>Affordable Pricing</h4>
                <p>Premium meals starting at just ₹1999 per month. No hidden charges.</p>
              </div>
            </div>

            <div className="why-love-grid-item">
              <div className="why-love-icon-box blue">
                <Smartphone size={20} className="icon-blue" />
              </div>
              <div className="why-love-info">
                <h4>Easy Subscription Management</h4>
                <p>Pause subscription, switch provider, or cancel anytime with single clicks.</p>
              </div>
            </div>

            <div className="why-love-grid-item">
              <div className="why-love-icon-box purple">
                <ShieldCheck size={20} className="icon-purple" />
              </div>
              <div className="why-love-info">
                <h4>Secure Payments</h4>
                <p>Safe gateway operations with UPI, debit cards, and monthly receipts.</p>
              </div>
            </div>

          </div>
        </section>

        {/* TRUST SECTION */}
        <section className="hiw-trust-stats-capsule-card">
          <div className="hiw-trust-grid">
            
            <div className="hiw-trust-col">
              <h3>50+</h3>
              <h4>Verified Mess Partners</h4>
              <p>Trusted mess providers</p>
            </div>

            <div className="hiw-trust-divider"></div>

            <div className="hiw-trust-col">
              <h3>1200+</h3>
              <h4>Happy Subscribers</h4>
              <p>Across Kolhapur area</p>
            </div>

            <div className="hiw-trust-divider"></div>

            <div className="hiw-trust-col">
              <h3>99%</h3>
              <h4>Delivery Success</h4>
              <p>On-time meal dispatches</p>
            </div>

            <div className="hiw-trust-divider"></div>

            <div className="hiw-trust-col">
              <h3>4.8★</h3>
              <h4>Average Rating</h4>
              <p>Top-rated culinary taste</p>
            </div>

          </div>
        </section>

        {/* BOTTOM CTA: Large Orange Gradient Banner */}
        <section className="hiw-bottom-cta-banner-wrapper">
          <div className="hiw-cta-orange-gradient-banner">
            <h2 className="cta-banner-title">Ready To Find Your Perfect Mess?</h2>
            <p className="cta-banner-desc">
              Join thousands of students and professionals already using Kolhapurcha Dabewala.
            </p>
            
            <div className="cta-banner-buttons-row">
              <button 
                onClick={() => navigate('/find-mess')} 
                className="btn-cta-banner solid-white"
              >
                Find Mess
              </button>
              <button 
                onClick={() => navigate('/subscription-plans')} 
                className="btn-cta-banner outline-white"
              >
                View Plans
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HowItWorksPage;
