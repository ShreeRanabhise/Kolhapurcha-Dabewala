import React, { useState } from 'react';
import { ArrowRight, Star, Truck, ShieldCheck, Users, GraduationCap, Briefcase, Crown, CheckCircle2 } from 'lucide-react';
import './Pricing.css';

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <section id="plans" className="pricing-section">
      {/* Decorative background elements can be added here if needed */}
      <div className="pricing-bg-pattern"></div>
      
      <div className="container relative z-10">
        
        {/* Header Section */}
        <div className="pricing-header">
          <div className="pre-title">
            <span>👑</span> SUBSCRIPTION PLANS
          </div>
          <h2 className="pricing-title">
            Choose Your Perfect <span className="text-maroon">Meal Plan</span>
          </h2>
          <p className="pricing-subtitle">
            Fresh, home-cooked meals delivered daily with love and hygiene. <span className="text-red">❤️</span>
          </p>
          
          <div className="floating-text left-floating">
            <span className="text-sm">घरगुती चव,<br/>रोज तुमच्या दारात</span>
          </div>
          <div className="floating-text right-floating">
            <span className="text-sm">Loved by<br/>1000+ Families</span>
          </div>
          
          {/* Billing Toggle */}
          <div className="billing-toggle-wrapper">
            <div className="billing-toggle">
              <button 
                className={`toggle-btn ${billingCycle === 'monthly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('monthly')}
              >
                <div className="toggle-title">Monthly</div>
                <div className="toggle-sub">Best Flexibility</div>
              </button>
              <button 
                className={`toggle-btn ${billingCycle === 'quarterly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('quarterly')}
              >
                <div className="toggle-title">Quarterly</div>
                <div className="toggle-sub text-maroon">Save 10%</div>
              </button>
              <button 
                className={`toggle-btn relative ${billingCycle === 'yearly' ? 'active' : ''}`}
                onClick={() => setBillingCycle('yearly')}
              >
                <div className="best-value-badge">Best Value</div>
                <div className="toggle-title">Yearly</div>
                <div className="toggle-sub text-green">Save 20%</div>
              </button>
            </div>
          </div>
        </div>
        
        {/* Pricing Cards Grid */}
        <div className="pricing-grid">
          
          {/* Card 1: Student Plan */}
          <div className="pricing-card standard-card">
            <div className="card-top-icons">
              <div className="card-identity">
                <div className="icon-circle text-orange"><GraduationCap size={28} /></div>
                <div>
                  <h3 className="plan-name text-orange">STUDENT PLAN</h3>
                  <p className="plan-desc">Perfect for Students</p>
                </div>
              </div>
              {/* Replace the src below with your local image path once you save it */}
              <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80" alt="Student Thali" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '12px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} />
            </div>
            
            <div className="card-middle">
              <div className="price-info">
                <div className="price-display">
                  <span className="currency">₹</span>
                  <span className="amount">2,199</span>
                  <span className="period">/month</span>
                </div>
                <div className="subscription-label">30 Days Subscription</div>
              </div>
            </div>
            
            <ul className="features-grid-list">
              <li><CheckCircle2 size={16} className="text-orange" /> Lunch Daily</li>
              <li><CheckCircle2 size={16} className="text-orange" /> Hygienic & Fresh</li>
              <li><CheckCircle2 size={16} className="text-orange" /> 2 Chapati</li>
              <li><CheckCircle2 size={16} className="text-orange" /> Pause Anytime</li>
              <li><CheckCircle2 size={16} className="text-orange" /> Rice, Dal, 1 Sabji</li>
              <li><CheckCircle2 size={16} className="text-orange" /> No Hidden Charges</li>
              <li><CheckCircle2 size={16} className="text-orange" /> Free Delivery</li>
            </ul>
            
            <div className="card-footer">
              <button className="btn-orange w-full">
                Choose Plan <ArrowRight size={18} />
              </button>
              <div className="card-trust">
                <ShieldCheck size={14} className="text-orange" /> Safe, Secure & Reliable
              </div>
            </div>
          </div>
          
          {/* Card 2: Professional Plan (Most Popular) */}
          <div className="pricing-card popular-card">
            <div className="popular-badge">🔥 MOST POPULAR</div>
            
            <div className="card-top-icons">
              <div className="card-identity">
                <div className="icon-circle text-maroon bg-white"><Briefcase size={28} /></div>
                <div>
                  <h3 className="plan-name text-white">PROFESSIONAL PLAN</h3>
                  <p className="plan-desc text-white-70">For Working Professionals</p>
                </div>
              </div>
              <div className="icon-circle-outline border-gold"><Star size={28} className="text-gold" fill="currentColor" /></div>
            </div>
            
            <div className="card-middle">
              <div className="price-info">
                <div className="price-display text-white">
                  <span className="currency">₹</span>
                  <span className="amount">3,299</span>
                  <span className="period text-white-70">/month</span>
                </div>
                <div className="subscription-label bg-maroon-dark text-white">30 Days Subscription</div>
              </div>
            </div>
            
            <ul className="features-grid-list text-white">
              <li><CheckCircle2 size={16} className="text-gold" /> Lunch + Dinner</li>
              <li><CheckCircle2 size={16} className="text-gold" /> Free Delivery</li>
              <li><CheckCircle2 size={16} className="text-gold" /> Rice, Dal</li>
              <li><CheckCircle2 size={16} className="text-gold" /> Priority Delivery</li>
              <li><CheckCircle2 size={16} className="text-gold" /> 2 Sabji</li>
              <li><CheckCircle2 size={16} className="text-gold" /> Hygienic & Fresh</li>
              <li><CheckCircle2 size={16} className="text-gold" /> 4 Chapati</li>
              <li><CheckCircle2 size={16} className="text-gold" /> Pause Anytime</li>
              <li><CheckCircle2 size={16} className="text-gold" /> Salad</li>
              <li><CheckCircle2 size={16} className="text-gold" /> 24/7 Support</li>
            </ul>
            
            <div className="card-footer">
              <button className="btn-white w-full">
                Subscribe Now <ArrowRight size={18} className="text-maroon" />
              </button>
              <div className="card-subscribers">
                <div className="avatar-group">
                  <div className="avatar"></div>
                  <div className="avatar"></div>
                  <div className="avatar"></div>
                </div>
                <span>1000+ Happy Subscribers</span>
              </div>
            </div>
          </div>
          
          {/* Card 3: Premium Home Food */}
          <div className="pricing-card standard-card">
            <div className="card-top-icons">
              <div className="card-identity">
                <div className="icon-circle text-gold"><Crown size={28} /></div>
                <div>
                  <h3 className="plan-name text-gold-dark">PREMIUM HOME FOOD</h3>
                  <p className="plan-desc">Premium Taste. Premium Experience.</p>
                </div>
              </div>
              <div className="icon-circle-outline"><span className="text-gold" style={{fontSize: '1.5rem'}}>💎</span></div>
            </div>
            
            <div className="card-middle">
              <div className="price-info">
                <div className="price-display">
                  <span className="currency">₹</span>
                  <span className="amount">3,999</span>
                  <span className="period">/month</span>
                </div>
                <div className="subscription-label">30 Days Subscription</div>
              </div>
            </div>
            
            <ul className="features-grid-list">
              <li><CheckCircle2 size={16} className="text-gold" /> Lunch + Dinner</li>
              <li><CheckCircle2 size={16} className="text-gold" /> Premium Packaging</li>
              <li><CheckCircle2 size={16} className="text-gold" /> Premium Menu</li>
              <li><CheckCircle2 size={16} className="text-gold" /> Priority Support</li>
              <li><CheckCircle2 size={16} className="text-gold" /> Extra Sabji</li>
              <li><CheckCircle2 size={16} className="text-gold" /> Fastest Delivery</li>
              <li><CheckCircle2 size={16} className="text-gold" /> Salad + Sweet</li>
              <li><CheckCircle2 size={16} className="text-gold" /> Pause Anytime</li>
              <li><CheckCircle2 size={16} className="text-gold" /> Weekend Special</li>
              <li><CheckCircle2 size={16} className="text-gold" /> 100% Satisfaction</li>
            </ul>
            
            <div className="card-footer">
              <button className="btn-gold w-full">
                Go Premium <ArrowRight size={18} />
              </button>
              <div className="card-trust">
                <ShieldCheck size={14} className="text-gold" /> Best Quality. Best Taste.
              </div>
            </div>
          </div>
          
        </div>

        {/* Promo Banner */}
        <div className="promo-pill">
          🎁 Save up to ₹1,200 with Yearly Plan! 🎉
        </div>
        
        {/* Trust Indicators Banner */}
        <div className="trust-banner">
          <div className="trust-indicator">
            <div className="trust-icon-box bg-orange-light">
              <Star size={24} className="text-orange" fill="currentColor" />
            </div>
            <div className="trust-text">
              <div className="trust-value">4.8</div>
              <div className="trust-label">Average Rating</div>
              <div className="trust-stars">★★★★★</div>
            </div>
          </div>
          
          <div className="trust-indicator">
            <div className="trust-icon-box bg-green-light">
              <Users size={24} className="text-green" fill="currentColor" />
            </div>
            <div className="trust-text">
              <div className="trust-value">1000+</div>
              <div className="trust-label">Happy Subscribers</div>
              <div className="trust-subtext">and growing</div>
            </div>
          </div>
          
          <div className="trust-indicator">
            <div className="trust-icon-box bg-blue-light">
              <Truck size={24} className="text-blue" fill="currentColor" />
            </div>
            <div className="trust-text">
              <div className="trust-value">99%</div>
              <div className="trust-label">On-time Delivery</div>
              <div className="trust-subtext">You can trust</div>
            </div>
          </div>
          
          <div className="trust-indicator">
            <div className="trust-icon-box bg-purple-light">
              <ShieldCheck size={24} className="text-purple" />
            </div>
            <div className="trust-text">
              <div className="trust-value">50+</div>
              <div className="trust-label">Verified Mess Partners</div>
              <div className="trust-subtext">Quality Assured</div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default Pricing;
