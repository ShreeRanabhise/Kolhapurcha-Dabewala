import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, ArrowRight, TrendingUp, Users, Megaphone, Smartphone, Star, 
  BarChart, Store, Truck, ShieldCheck, Clock, MapPin, Search, ChevronDown, 
  MessageCircle, Upload, ChevronRight, X
} from 'lucide-react';
import './BecomePartner.css';

const EarningsCalculator = () => {
  const [customers, setCustomers] = useState(50);
  const [avgPlan, setAvgPlan] = useState(2500);
  
  const monthlyRev = customers * avgPlan;
  const projectedRev = Math.round(monthlyRev * 1.6); // 60% growth

  return (
    <section className="bp-calculator">
      <div className="container">
        <h2 className="section-title">Calculate Your Earning Potential</h2>
        <div className="bp-calc-box">
          <div className="bp-calc-grid">
            <div className="bp-calc-inputs">
              <div className="bp-input-group">
                <label>Monthly Customers</label>
                <input 
                  type="range" 
                  min="10" max="500" step="10" 
                  value={customers} 
                  onChange={(e) => setCustomers(e.target.value)}
                  className="bp-range-slider"
                />
                <div className="bp-range-val">{customers} Customers</div>
              </div>
              <div className="bp-input-group" style={{marginTop: '2rem'}}>
                <label>Average Plan Value (₹)</label>
                <input 
                  type="range" 
                  min="1000" max="5000" step="100" 
                  value={avgPlan} 
                  onChange={(e) => setAvgPlan(e.target.value)}
                  className="bp-range-slider"
                />
                <div className="bp-range-val">₹{avgPlan}</div>
              </div>
            </div>
            
            <div className="bp-calc-result">
              <div className="bp-result-title">Current Monthly Revenue</div>
              <div className="bp-result-amount" style={{color: 'white', fontSize: '2rem'}}>₹{monthlyRev.toLocaleString()}</div>
              <hr />
              <div className="bp-result-title">Projected Growth With Platform</div>
              <div className="bp-result-amount">₹{projectedRev.toLocaleString()}</div>
              <p style={{fontSize: '0.85rem', opacity: 0.8}}>*Based on average 60% partner growth in first 3 months</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const RegistrationForm = () => {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  const nextStep = () => { if (step < totalSteps) setStep(step + 1); };
  const prevStep = () => { if (step > 1) setStep(step - 1); };

  return (
    <section className="bp-registration" id="register">
      <div className="container">
        <h2 className="section-title">Start Your Journey Today</h2>
        
        <div className="bp-form-container">
          <div className="bp-form-steps">
            {[1, 2, 3, 4, 5].map(num => (
              <div key={num} className={`bp-step-indicator ${step === num ? 'active' : ''} ${step > num ? 'completed' : ''}`}>
                {step > num ? <CheckCircle size={16} /> : num}
              </div>
            ))}
          </div>
          
          <div className="bp-form-content">
            {step === 1 && (
              <div className="animate-fade-in">
                <h3 style={{marginBottom: '1.5rem'}}>Business Information</h3>
                <div className="bp-form-group">
                  <label>Business / Mess Name</label>
                  <input type="text" className="bp-form-input" placeholder="e.g. Aai's Kitchen" />
                </div>
                <div className="bp-form-group">
                  <label>Owner Name</label>
                  <input type="text" className="bp-form-input" placeholder="Full Name" />
                </div>
                <div className="bp-form-group">
                  <label>Mobile Number</label>
                  <input type="tel" className="bp-form-input" placeholder="+91" />
                </div>
                <div className="bp-form-group">
                  <label>Email Address</label>
                  <input type="email" className="bp-form-input" placeholder="email@example.com" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in">
                <h3 style={{marginBottom: '1.5rem'}}>Location Details</h3>
                <div className="bp-form-group">
                  <label>City / Area</label>
                  <select className="bp-form-select">
                    <option>Rajarampuri</option>
                    <option>Shahupuri</option>
                    <option>Tarabai Park</option>
                    <option>Other</option>
                  </select>
                </div>
                <div className="bp-form-group">
                  <label>Full Address</label>
                  <textarea className="bp-form-input" rows="3" placeholder="Enter complete address..."></textarea>
                </div>
                <div className="bp-form-group">
                  <label>Google Map Link (Optional)</label>
                  <input type="text" className="bp-form-input" placeholder="Paste maps link" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in">
                <h3 style={{marginBottom: '1.5rem'}}>Food Information</h3>
                <div className="bp-form-group">
                  <label>Food Type</label>
                  <select className="bp-form-select">
                    <option>Veg & Non-Veg</option>
                    <option>Pure Veg</option>
                    <option>Non-Veg Only</option>
                  </select>
                </div>
                <div className="bp-form-group">
                  <label>Monthly Plan Price (Starting from)</label>
                  <input type="number" className="bp-form-input" placeholder="₹" />
                </div>
                <div className="bp-form-group">
                  <label>Delivery Capability</label>
                  <select className="bp-form-select">
                    <option>I have my own delivery boys</option>
                    <option>I need delivery partners</option>
                    <option>Dine-in / Pickup only</option>
                  </select>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-fade-in">
                <h3 style={{marginBottom: '1.5rem'}}>Upload Documents</h3>
                <div className="bp-form-group">
                  <label>Aadhaar Card</label>
                  <div className="bp-form-input" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: '#f9f9f9'}}>
                    <Upload size={18} /> Click to upload
                  </div>
                </div>
                <div className="bp-form-group">
                  <label>FSSAI License / PAN (Optional)</label>
                  <div className="bp-form-input" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: '#f9f9f9'}}>
                    <Upload size={18} /> Click to upload
                  </div>
                </div>
                <div className="bp-form-group">
                  <label>Kitchen/Food Photos (Up to 3)</label>
                  <div className="bp-form-input" style={{display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', background: '#f9f9f9'}}>
                    <Upload size={18} /> Click to upload
                  </div>
                </div>
              </div>
            )}

            {step === 5 && (
              <div className="animate-fade-in">
                <div style={{textAlign: 'center', padding: '2rem 0'}}>
                  <CheckCircle size={64} color="#2E8B57" style={{margin: '0 auto 1rem'}} />
                  <h3 style={{marginBottom: '1rem'}}>Ready to Submit!</h3>
                  <p style={{color: '#666', marginBottom: '2rem'}}>
                    By submitting this form, you agree to our partner terms and conditions. Our team will verify your details and contact you within 24 hours.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="bp-form-actions">
            {step > 1 ? (
              <button className="bp-btn-prev" onClick={prevStep}>Back</button>
            ) : <div></div>}
            
            {step < totalSteps ? (
              <button className="bp-btn-next" onClick={nextStep}>Next Step <ArrowRight size={16} style={{display: 'inline', marginLeft: '0.2rem', verticalAlign: 'text-bottom'}} /></button>
            ) : (
              <button className="bp-btn-next" style={{background: '#2E8B57'}}>Submit Application</button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

const FAQAccordion = () => {
  const faqs = [
    { q: "How do I join as a partner?", a: "Simply fill out the registration form on this page with your business and food details. Our team will review your application, verify your kitchen, and activate your account within 24-48 hours." },
    { q: "How much does it cost?", a: "We offer different plans starting from ₹499/month. There are no hidden charges. You choose the plan that best fits your business needs." },
    { q: "When do I get paid?", a: "We process payments on a weekly basis. Since customers pay upfront for subscriptions, you have guaranteed revenue sent directly to your bank account." },
    { q: "Can I pause my account?", a: "Yes, you can pause your account at any time from your partner dashboard if you are going on vacation or cannot accept new orders." },
    { q: "How are customers assigned?", a: "Customers in your delivery radius can see your profile and subscribe to your meal plans based on your ratings and food type." }
  ];

  const [openIdx, setOpenIdx] = useState(null);

  return (
    <section className="bp-faq">
      <div className="container">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="bp-faq-container">
          {faqs.map((faq, i) => (
            <div key={i} className="bp-faq-item">
              <button className="bp-faq-question" onClick={() => setOpenIdx(openIdx === i ? null : i)}>
                {faq.q}
                <ChevronDown size={20} style={{transform: openIdx === i ? 'rotate(180deg)' : 'none', transition: '0.3s'}} />
              </button>
              {openIdx === i && (
                <div className="bp-faq-answer animate-fade-in">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


const BecomePartner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="become-partner-page">
      
      {/* Floating WhatsApp */}
      <a href="https://wa.me/910000000000" className="floating-whatsapp" target="_blank" rel="noreferrer" title="Chat on WhatsApp">
        <MessageCircle size={32} />
      </a>

      {/* 1. Hero Section */}
      <section className="bp-hero">
        <div className="container">
          <div className="bp-hero-grid">
            <div>
              <div className="bp-badge">🚀 Join Maharashtra's Fastest Growing Tiffin Platform</div>
              <h1 className="bp-hero-title">Grow Your Tiffin Business With Kolhapurcha Dabewala</h1>
              <p className="bp-hero-subtitle">
                Get more customers, receive guaranteed prepaid payments, and grow your monthly subscriptions without spending money on marketing.
              </p>
              <div className="bp-hero-cta">
                <a href="#register" className="btn-bp-primary">Become a Partner</a>
                <button className="btn-bp-secondary">Schedule Demo</button>
              </div>
              <div className="bp-hero-trust">
                <div className="bp-trust-item"><CheckCircle size={18} /> Prepaid Customers</div>
                <div className="bp-trust-item"><CheckCircle size={18} /> Weekly Payouts</div>
                <div className="bp-trust-item"><CheckCircle size={18} /> Marketing Support</div>
                <div className="bp-trust-item"><CheckCircle size={18} /> Zero Tech Knowledge Needed</div>
              </div>
            </div>
            
            <div className="bp-hero-img-container">
              <div className="bp-glass-card bp-glass-1">
                <div className="glass-icon"><TrendingUp size={24} /></div>
                <div className="glass-text">
                  <strong>+120%</strong>
                  <span>Revenue Growth</span>
                </div>
              </div>
              <div className="bp-glass-card bp-glass-2">
                <div className="glass-icon" style={{color: '#2E8B57'}}><CheckCircle size={24} /></div>
                <div className="glass-text">
                  <strong>Guaranteed</strong>
                  <span>Prepaid Payouts</span>
                </div>
              </div>
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80" alt="Happy mess owner" className="bp-hero-img" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Why Join Us */}
      <section className="bp-why-join">
        <div className="container">
          <h2 className="section-title">Why Thousands of Customers Trust Kolhapurcha Dabewala</h2>
          <div className="bp-grid-3">
            <div className="bp-card">
              <div className="bp-card-icon"><Store size={28} /></div>
              <h3>💰 Guaranteed Payments</h3>
              <p>Customers pay before meals start. No more chasing customers for money at the end of the month.</p>
            </div>
            <div className="bp-card">
              <div className="bp-card-icon"><Users size={28} /></div>
              <h3>📈 More Subscribers</h3>
              <p>Get access to thousands of students, workers, hostels, and families looking for quality daily meals.</p>
            </div>
            <div className="bp-card">
              <div className="bp-card-icon"><Megaphone size={28} /></div>
              <h3>🎯 Marketing Support</h3>
              <p>We actively promote your mess online across social media and local networks to bring you leads.</p>
            </div>
            <div className="bp-card">
              <div className="bp-card-icon"><Smartphone size={28} /></div>
              <h3>📱 Digital Management</h3>
              <p>Manage all your subscribers, daily menus, paused days, and earnings directly from one easy dashboard.</p>
            </div>
            <div className="bp-card">
              <div className="bp-card-icon"><Star size={28} /></div>
              <h3>⭐ Reviews & Ratings</h3>
              <p>Build your reputation online. Great food gets great ratings, which brings even more customers automatically.</p>
            </div>
            <div className="bp-card">
              <div className="bp-card-icon"><TrendingUp size={28} /></div>
              <h3>🚀 Business Growth</h3>
              <p>Focus on cooking great food while we handle the tech, marketing, and customer acquisition to scale your business.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="bp-timeline-section">
        <div className="container">
          <h2 className="section-title">How It Works</h2>
          <div className="bp-timeline">
            <div className="bp-step">
              <div className="bp-step-num">1</div>
              <h4>Register Your Mess</h4>
              <p>Fill out the application form with your details.</p>
            </div>
            <div className="bp-step">
              <div className="bp-step-num">2</div>
              <h4>Verification</h4>
              <p>Submit kitchen photos and compliance details.</p>
            </div>
            <div className="bp-step">
              <div className="bp-step-num">3</div>
              <h4>Approval</h4>
              <p>Our team verifies and approves your profile.</p>
            </div>
            <div className="bp-step">
              <div className="bp-step-num">4</div>
              <h4>Go Live</h4>
              <p>Start receiving customers from the app.</p>
            </div>
            <div className="bp-step">
              <div className="bp-step-num">5</div>
              <h4>Weekly Payouts</h4>
              <p>Receive your earnings automatically every week.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Business Benefits */}
      <section className="bp-comparison">
        <div className="container">
          <h2 className="section-title">The Kolhapurcha Dabewala Advantage</h2>
          <div className="bp-comp-container">
            <div className="bp-comp-box bp-comp-bad">
              <h3>Traditional Mess</h3>
              <ul className="bp-comp-list">
                <li><X color="#EF4444" size={24} /> Payment Delays & Dues</li>
                <li><X color="#EF4444" size={24} /> Chasing Customers</li>
                <li><X color="#EF4444" size={24} /> No Online Presence</li>
                <li><X color="#EF4444" size={24} /> Limited Local Reach</li>
                <li><X color="#EF4444" size={24} /> Manual Record Keeping</li>
              </ul>
            </div>
            <div className="bp-comp-box bp-comp-good">
              <h3>With Kolhapurcha Dabewala</h3>
              <ul className="bp-comp-list">
                <li><CheckCircle color="#10B981" size={24} /> 100% Prepaid Customers</li>
                <li><CheckCircle color="#10B981" size={24} /> Guaranteed Revenue</li>
                <li><CheckCircle color="#10B981" size={24} /> Massive Online Visibility</li>
                <li><CheckCircle color="#10B981" size={24} /> Unlimited Reach in City</li>
                <li><CheckCircle color="#10B981" size={24} /> Automated Digital Dashboard</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Earnings Calculator */}
      <EarningsCalculator />

      {/* 6. Success Stories */}
      <section className="bp-stories">
        <div className="container">
          <h2 className="section-title">Partner Success Stories</h2>
          <div className="bp-grid-3">
            <div className="bp-story-card">
              <div className="bp-story-header">
                <img src="https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=150&q=80" alt="Partner" className="bp-story-img" />
                <div className="bp-story-info">
                  <h4>Sujata's Kitchen</h4>
                  <p><MapPin size={12} style={{display:'inline'}}/> Rajarampuri, Kolhapur</p>
                  <p><Star size={12} color="#F4B400" fill="#F4B400" style={{display:'inline'}}/> 4.9 Rating</p>
                </div>
              </div>
              <p style={{marginBottom: '1.5rem', color: '#4B5563', fontStyle: 'italic'}}>
                "Since joining, I no longer worry about collecting money at the end of the month. My customer base doubled in just 2 months!"
              </p>
              <div className="bp-story-stats">
                <div className="bp-stat-item">
                  <strong>+120%</strong>
                  <span>Customers</span>
                </div>
                <div className="bp-stat-item">
                  <strong>3x</strong>
                  <span>Revenue Growth</span>
                </div>
              </div>
            </div>
            <div className="bp-story-card">
              <div className="bp-story-header">
                <img src="https://images.unsplash.com/photo-1555243896-c709bfa0b564?auto=format&fit=crop&w=150&q=80" alt="Partner" className="bp-story-img" />
                <div className="bp-story-info">
                  <h4>Ramesh Tiffin Center</h4>
                  <p><MapPin size={12} style={{display:'inline'}}/> Shahupuri, Kolhapur</p>
                  <p><Star size={12} color="#F4B400" fill="#F4B400" style={{display:'inline'}}/> 4.7 Rating</p>
                </div>
              </div>
              <p style={{marginBottom: '1.5rem', color: '#4B5563', fontStyle: 'italic'}}>
                "The dashboard is so easy to use. I can see exactly how many meals to prepare every day. It reduced my food wastage completely."
              </p>
              <div className="bp-story-stats">
                <div className="bp-stat-item">
                  <strong>0%</strong>
                  <span>Food Wastage</span>
                </div>
                <div className="bp-stat-item">
                  <strong>+80%</strong>
                  <span>Monthly Profit</span>
                </div>
              </div>
            </div>
            <div className="bp-story-card">
              <div className="bp-story-header">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80" alt="Partner" className="bp-story-img" />
                <div className="bp-story-info">
                  <h4>Healthy Bites</h4>
                  <p><MapPin size={12} style={{display:'inline'}}/> Tarabai Park</p>
                  <p><Star size={12} color="#F4B400" fill="#F4B400" style={{display:'inline'}}/> 4.8 Rating</p>
                </div>
              </div>
              <p style={{marginBottom: '1.5rem', color: '#4B5563', fontStyle: 'italic'}}>
                "As a cloud kitchen, visibility was hard. This platform put my healthy meal plans in front of hundreds of fitness enthusiasts."
              </p>
              <div className="bp-story-stats">
                <div className="bp-stat-item">
                  <strong>150+</strong>
                  <span>Active Subs</span>
                </div>
                <div className="bp-stat-item">
                  <strong>No. 1</strong>
                  <span>In Category</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Who Can Join */}
      <section className="bp-who">
        <div className="container">
          <h2 className="section-title">Who Can Join?</h2>
          <div className="bp-grid-6">
            <div className="bp-who-card">
              <div className="bp-who-icon">🏠</div>
              <h4>Home Chefs</h4>
            </div>
            <div className="bp-who-card">
              <div className="bp-who-icon">🍱</div>
              <h4>Tiffin Providers</h4>
            </div>
            <div className="bp-who-card">
              <div className="bp-who-icon">🍛</div>
              <h4>Mess Owners</h4>
            </div>
            <div className="bp-who-card">
              <div className="bp-who-icon">🏢</div>
              <h4>Corporate Caterers</h4>
            </div>
            <div className="bp-who-card">
              <div className="bp-who-icon">🥗</div>
              <h4>Healthy Meal Providers</h4>
            </div>
            <div className="bp-who-card">
              <div className="bp-who-icon">👨‍🍳</div>
              <h4>Cloud Kitchens</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Partner Plans */}
      <section className="bp-plans">
        <div className="container">
          <h2 className="section-title">Choose Your Partner Plan</h2>
          <div className="bp-grid-3">
            <div className="bp-plan-card">
              <h3>Starter Plan</h3>
              <div className="bp-plan-price">₹499<span>/month</span></div>
              <ul className="bp-plan-features">
                <li><CheckCircle size={18} /> Vendor Listing</li>
                <li><CheckCircle size={18} /> Basic Dashboard</li>
                <li><CheckCircle size={18} /> Customer Leads</li>
                <li><CheckCircle size={18} /> Standard Support</li>
              </ul>
              <a href="#register" className="bp-plan-btn" style={{display: 'block', textAlign:'center'}}>Get Started</a>
            </div>

            <div className="bp-plan-card bp-plan-popular">
              <div className="bp-popular-badge">Most Popular</div>
              <h3>Growth Plan</h3>
              <div className="bp-plan-price">₹999<span>/month</span></div>
              <ul className="bp-plan-features">
                <li><CheckCircle size={18} /> Featured Listing</li>
                <li><CheckCircle size={18} /> Higher Visibility</li>
                <li><CheckCircle size={18} /> Marketing Support</li>
                <li><CheckCircle size={18} /> Advanced Analytics</li>
                <li><CheckCircle size={18} /> Priority Support</li>
              </ul>
              <a href="#register" className="bp-plan-btn" style={{display: 'block', textAlign:'center'}}>Become Premium Partner</a>
            </div>

            <div className="bp-plan-card">
              <h3>Enterprise Plan</h3>
              <div className="bp-plan-price" style={{fontSize: '2rem', padding: '0.4rem 0'}}>Custom Pricing</div>
              <ul className="bp-plan-features">
                <li><CheckCircle size={18} /> Corporate Leads</li>
                <li><CheckCircle size={18} /> Dedicated Account Manager</li>
                <li><CheckCircle size={18} /> Multi-Location Support</li>
                <li><CheckCircle size={18} /> Custom Payout Terms</li>
              </ul>
              <a href="#register" className="bp-plan-btn" style={{display: 'block', textAlign:'center'}}>Contact Sales</a>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Registration Form */}
      <RegistrationForm />

      {/* 10. Dashboard Preview */}
      <section className="bp-dashboard">
        <div className="container">
          <h2 className="section-title">Powerful Tools to Manage Your Business</h2>
          <div className="bp-mockup">
            <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80" alt="Dashboard Preview" />
          </div>
        </div>
      </section>

      {/* 11. Trust & Verification */}
      <section className="bp-trust-section">
        <div className="container">
          <h2 className="section-title" style={{color: 'white'}}>We Maintain Quality Standards</h2>
          <div className="bp-trust-grid">
            <div className="bp-trust-badge">
              <ShieldCheck />
              <span>Kitchen Verification</span>
            </div>
            <div className="bp-trust-badge">
              <CheckCircle />
              <span>Food Quality Monitoring</span>
            </div>
            <div className="bp-trust-badge">
              <Star />
              <span>Customer Reviews</span>
            </div>
            <div className="bp-trust-badge">
              <BarChart />
              <span>Performance Tracking</span>
            </div>
            <div className="bp-trust-badge">
              <MessageCircle />
              <span>24/7 Support Team</span>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FAQ Section */}
      <FAQAccordion />

      {/* 13. Final CTA Section */}
      <section className="bp-final-cta">
        <div className="bp-final-content">
          <h2>Ready To Grow Your Food Business?</h2>
          <p>Join Kolhapurcha Dabewala and start receiving prepaid customers today.</p>
          <div className="bp-hero-cta" style={{justifyContent: 'center'}}>
            <a href="#register" className="bp-btn-white">Become a Partner</a>
            <button className="bp-btn-white" style={{background: 'transparent', color: 'white', border: '2px solid white'}}>Talk To Team</button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default BecomePartner;
