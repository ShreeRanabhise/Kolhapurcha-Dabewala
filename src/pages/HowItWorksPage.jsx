import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MapPin, Eye, Calendar, CreditCard, ShieldCheck, 
  Star, ChefHat, Bike, Lock, Smartphone, 
  ArrowRight, Award, ShieldAlert, Check, TrendingUp, 
  HelpCircle, User, Briefcase, Plus, Minus, Sparkles, 
  ChevronRight, Calculator, Clock, Utensils
} from 'lucide-react';
import './HowItWorksPage.css';

const HowItWorksPage = () => {
  const navigate = useNavigate();

  // Core States
  const [activePersona, setActivePersona] = useState('customer'); // 'customer' or 'partner'
  const [activeStep, setActiveStep] = useState(0);
  const [activeMealTime, setActiveMealTime] = useState('lunch'); // 'breakfast', 'lunch', 'dinner', 'planning'
  
  // Customer Calculator States
  const [mealsPerMonth, setMealsPerMonth] = useState(30);
  const [restaurantCost, setRestaurantCost] = useState(130);

  // Partner Calculator States
  const [activeSubscribers, setActiveSubscribers] = useState(80);
  const [subRate, setSubRate] = useState(2400);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Ensure active step index stays valid when persona changes
  const handlePersonaChange = (persona) => {
    setActivePersona(persona);
    setActiveStep(0);
  };

  const customerSteps = [
    {
      title: "Choose Your Area",
      desc: "Enter your college, hostel, office area or neighborhood in Kolhapur to see verified messes delivering to your exact spot.",
      tags: ["Rajarampuri", "Shahupuri", "Cyber Chowk", "University Road"]
    },
    {
      title: "Compare Verified Messes",
      desc: "Check full menus, inspect real subscriber reviews, compare prices, and check FSSAI safety certification badges.",
      tags: ["Veg / Non-Veg", "Dish Schedule", "FSSAI Inspected"]
    },
    {
      title: "Select Your Plan",
      desc: "Customize your meals (1 meal/day, 2 meals/day, or custom), select plan duration (weekly or monthly), and choose preference.",
      tags: ["Flexible Subscriptions", "Student Friendly"]
    },
    {
      title: "Subscribe Securely",
      desc: "Confirm and pay instantly via UPI (GPay, PhonePe, Paytm), Net Banking, or Credit/Debit cards with zero hidden charges.",
      tags: ["1-Click Checkout", "Secure UPI Gateway"]
    },
    {
      title: "Doorstep Delivery & Pause",
      desc: "Enjoy hot, fresh, home-cooked food delivered directly to you. Going out? Easily pause next day's meal before 10:00 PM.",
      tags: ["On-time Delivery", "No-Waste Pause Switch"]
    }
  ];

  const partnerSteps = [
    {
      title: "Online Registration",
      desc: "Submit your tiffin service name, owner details, address, and FSSAI registration number in under 5 minutes.",
      tags: ["Zero Register Fees", "Fast Validation"]
    },
    {
      title: "Hygiene & Taste Audit",
      desc: "Our expert culinary and quality assurance team conducts a fast audit of kitchen standards and taste-tests sample plates.",
      tags: ["Kitchen Quality Check", "Verified Partner Badge"]
    },
    {
      title: "Activate Digital Menu",
      desc: "List your daily dishes (Pithla Bhakri, Pandhra Rassa, Veg Thali), configure pricing plans, and map out your delivery slots.",
      tags: ["Price Control", "Menu Scheduler Dashboard"]
    },
    {
      title: "Receive Orders & Grow",
      desc: "Start receiving active subscribers. Get direct digital billing weekly, manage schedules, and scale your daily volumes.",
      tags: ["Weekly Bank Payouts", "Order Management CRM"]
    }
  ];

  const currentSteps = activePersona === 'customer' ? customerSteps : partnerSteps;

  // Calculators logic
  const customerMonthlyRestaurantCost = Math.round(mealsPerMonth * restaurantCost * 1.15); // Add 15% extra for delivery/taxes
  const customerKDCost = Math.round(mealsPerMonth * 65); // Approx 65 per premium home meal
  const customerSavings = customerMonthlyRestaurantCost - customerKDCost;

  const partnerGrossRevenue = activeSubscribers * subRate;
  const partnerNetRevenue = Math.round(partnerGrossRevenue * 0.9); // 10% platform fee

  // Smartphone Screens Renderer
  const renderSmartphoneScreen = () => {
    if (activePersona === 'customer') {
      switch (activeStep) {
        case 0:
          return (
            <div className="phone-screen-content fade-in-animation">
              <div className="phone-nav-bar">
                <MapPin size={12} className="icon-orange" />
                <span className="phone-nav-title text-ellipsis">Rajarampuri, Kolhapur</span>
              </div>
              <div className="phone-search-wrapper">
                <div className="phone-search-input">
                  <span className="search-typing-placeholder">Search "messes in cyber..."</span>
                </div>
                <div className="phone-suggestions-list">
                  <div className="phone-suggest-item highlight-suggest">
                    <MapPin size={10} className="icon-slate" />
                    <div>
                      <h6>Rajarampuri Lane 4</h6>
                      <p>12 verified messes deliver here</p>
                    </div>
                  </div>
                  <div className="phone-suggest-item">
                    <MapPin size={10} className="icon-slate" />
                    <div>
                      <h6>Cyber Chowk, University Road</h6>
                      <p>8 verified messes deliver here</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="phone-mini-map-view">
                <div className="pulse-map-marker">📍</div>
              </div>
            </div>
          );
        case 1:
          return (
            <div className="phone-screen-content fade-in-animation">
              <div className="phone-nav-bar">
                <span>Select Mess Provider</span>
              </div>
              <div className="phone-mess-cards-scroll">
                <div className="phone-mess-card premium-shadow-active">
                  <div className="phone-card-header">
                    <span className="badge-verified-phone">FSSAI ✓</span>
                    <span className="badge-thali-veg-non">Veg/Non-Veg</span>
                  </div>
                  <div className="phone-card-body">
                    <h6>Mauli Executive Mess</h6>
                    <div className="phone-card-rating">
                      <Star size={10} fill="#EAB308" stroke="none" />
                      <span>4.9 (140+ reviews)</span>
                    </div>
                    <p className="phone-card-price">₹1,999 <span>/ month</span></p>
                  </div>
                </div>
                <div className="phone-mess-card phone-card-inactive">
                  <div className="phone-card-header">
                    <span className="badge-verified-phone">FSSAI ✓</span>
                  </div>
                  <div className="phone-card-body">
                    <h6>Yashoda Pure Veg</h6>
                    <div className="phone-card-rating">
                      <Star size={10} fill="#EAB308" stroke="none" />
                      <span>4.7 (88 reviews)</span>
                    </div>
                    <p className="phone-card-price">₹1,800 <span>/ month</span></p>
                  </div>
                </div>
              </div>
            </div>
          );
        case 2:
          return (
            <div className="phone-screen-content fade-in-animation">
              <div className="phone-nav-bar">
                <span>Configure Subscription</span>
              </div>
              <div className="phone-sub-editor">
                <label className="phone-mock-label">Meal Type</label>
                <div className="phone-mock-pill-selector">
                  <div className="phone-mock-pill active">Lunch + Dinner</div>
                  <div className="phone-mock-pill">Lunch Only</div>
                </div>

                <label className="phone-mock-label">Plan Duration</label>
                <div className="phone-mock-pricing-grid">
                  <div className="phone-pricing-card selected-plan">
                    <span className="duration">30 Days</span>
                    <span className="amount">₹3,499</span>
                    <span className="per-meal">₹58 / meal</span>
                  </div>
                  <div className="phone-pricing-card">
                    <span className="duration">7 Days</span>
                    <span className="amount">₹999</span>
                    <span className="per-meal">₹71 / meal</span>
                  </div>
                </div>
                <button className="phone-btn-action-mock">Continue to Pay</button>
              </div>
            </div>
          );
        case 3:
          return (
            <div className="phone-screen-content fade-in-animation">
              <div className="phone-nav-bar">
                <span>Secure Payment</span>
              </div>
              <div className="phone-checkout-summary">
                <div className="checkout-row">
                  <span>Plan Amount:</span>
                  <span>₹3,499</span>
                </div>
                <div className="checkout-row">
                  <span>Delivery Charges:</span>
                  <span className="text-green">FREE</span>
                </div>
                <div className="checkout-divider"></div>
                <div className="checkout-row grand-total">
                  <span>Grand Total:</span>
                  <span>₹3,499</span>
                </div>
              </div>
              <div className="phone-payment-methods">
                <div className="payment-method-item select-upi">
                  <span className="upi-logo-mock">UPI</span>
                  <span>Pay via GPay / PhonePe / Paytm</span>
                  <span className="radio-dot-checked"></span>
                </div>
                <div className="payment-method-item">
                  <span>Credit / Debit Cards</span>
                  <span className="radio-dot-unchecked"></span>
                </div>
              </div>
              <button className="phone-btn-action-mock pay-gradient">
                <Lock size={12} className="inline-lock" /> Pay Securely ₹3,499
              </button>
            </div>
          );
        case 4:
          return (
            <div className="phone-screen-content fade-in-animation">
              <div className="phone-nav-bar">
                <span>Active Subscription</span>
              </div>
              <div className="phone-delivery-tracker">
                <div className="tracker-card">
                  <span className="tracker-label">NEXT MEAL ARRIVING</span>
                  <h5>Today at 12:45 PM</h5>
                  <p>Prep: Mauli Mess • Delivery: Aniket P.</p>
                </div>
                <div className="tracker-route-map">
                  <div className="route-line">
                    <div className="route-progress-bar"></div>
                  </div>
                  <div className="marker-origin">🏢</div>
                  <div className="marker-rider-bike">🏍️</div>
                  <div className="marker-destination">🏠</div>
                </div>
                <div className="tiffin-status-card">
                  <div className="status-flex">
                    <span className="delivery-status-dot active-pulse"></span>
                    <span>Tiffin leaves kitchen (Hot & Fresh)</span>
                  </div>
                </div>
                <div className="phone-pause-switch-container">
                  <span>Need to skip tomorrow's lunch?</span>
                  <div className="pause-switch-mock active-switch">
                    <span className="switch-text">ACTIVE</span>
                    <span className="switch-knob"></span>
                  </div>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    } else {
      // Partner View Mockups
      switch (activeStep) {
        case 0:
          return (
            <div className="phone-screen-content fade-in-animation">
              <div className="phone-nav-bar">
                <span>Partner Onboarding</span>
              </div>
              <div className="phone-partner-form">
                <div className="mock-input-group">
                  <label>Mess / Kitchen Name</label>
                  <input type="text" placeholder="Sai Executive Mess" disabled className="mock-input" />
                </div>
                <div className="mock-input-group">
                  <label>Owner Name</label>
                  <input type="text" placeholder="Sanjay Patil" disabled className="mock-input" />
                </div>
                <div className="mock-input-group">
                  <label>FSSAI Register ID</label>
                  <input type="text" placeholder="21523049000185" disabled className="mock-input" />
                </div>
                <div className="mock-input-group">
                  <label>Kitchen Location</label>
                  <input type="text" placeholder="Tarabai Park, Kolhapur" disabled className="mock-input" />
                </div>
                <button className="phone-btn-action-mock">Submit For Review</button>
              </div>
            </div>
          );
        case 1:
          return (
            <div className="phone-screen-content fade-in-animation center-flex">
              <div className="phone-audit-result">
                <div className="glowing-audit-badge">
                  <Award size={36} className="color-gold" />
                </div>
                <h5>Audit Rating: 9.8 / 10</h5>
                <p>Taste, hygiene, packing systems & licenses successfully audited!</p>
                <div className="partner-verified-pill">
                  <Check size={12} /> VERIFIED PARTNER
                </div>
              </div>
            </div>
          );
        case 2:
          return (
            <div className="phone-screen-content fade-in-animation">
              <div className="phone-nav-bar">
                <span>Manage Menu Details</span>
              </div>
              <div className="phone-menu-manager">
                <div className="menu-day-selector">
                  <span className="day active">MON</span>
                  <span className="day">TUE</span>
                  <span className="day">WED</span>
                </div>
                <div className="menu-item-input-card">
                  <h6>Monday Lunch Details</h6>
                  <p className="menu-content-preview">Shevga Shenga Bhaji, Varan, Bhat, Chapati, Koshimbir</p>
                  <span className="badge-veg">VEG ONLY</span>
                </div>
                <div className="delivery-coverage-preview">
                  <h6>Delivery Coverage Zones</h6>
                  <div className="coverage-tags">
                    <span>Rajarampuri</span>
                    <span>Cyber</span>
                    <span>Sambhaji Nagar</span>
                  </div>
                </div>
              </div>
            </div>
          );
        case 3:
          return (
            <div className="phone-screen-content fade-in-animation">
              <div className="phone-nav-bar">
                <span>Vendor Dashboard</span>
              </div>
              <div className="phone-vendor-dashboard">
                <div className="vendor-quick-stats">
                  <div className="vendor-stat-pill">
                    <span className="label">ACTIVE SUBS</span>
                    <span className="val">142</span>
                  </div>
                  <div className="vendor-stat-pill">
                    <span className="label">EARNINGS (WEEK)</span>
                    <span className="val">₹24,800</span>
                  </div>
                </div>
                <div className="vendor-earnings-graph">
                  <h6>Weekly Subscriptions growth</h6>
                  <div className="graph-bars-mock">
                    <div className="bar" style={{ height: '35%' }}><span className="bar-lbl">W1</span></div>
                    <div className="bar" style={{ height: '55%' }}><span className="bar-lbl">W2</span></div>
                    <div className="bar" style={{ height: '70%' }}><span className="bar-lbl">W3</span></div>
                    <div className="bar highlight-bar" style={{ height: '90%' }}><span className="bar-lbl">W4</span></div>
                  </div>
                </div>
                <div className="recent-payout-row">
                  <span className="payout-status">Last Payout Sent</span>
                  <span className="payout-amount">₹21,450</span>
                </div>
              </div>
            </div>
          );
        default:
          return null;
      }
    }
  };

  // Cuisine detailed information based on meal clock
  const getMealDetail = () => {
    switch (activeMealTime) {
      case 'breakfast':
        return {
          title: "Fresh, Hot Morning Fuel",
          time: "08:00 AM — 09:30 AM",
          emoji: "🍳",
          cuisine: "Kanda Pohe, Misal Pav, Sabudana Khichdi, Ghadichi Poli with Tea",
          desc: "Light and energizing breakfast dishes prepared freshly at dawn and dispatched in insulated bags to reach you piping hot.",
          tip: "Great for students rushed for early college classes or professionals starting their shifts."
        };
      case 'lunch':
        return {
          title: "Authentic Kolhapuri Thali",
          time: "12:30 PM — 02:00 PM",
          emoji: "🍱",
          cuisine: "Hot Chapatis, Rice, Varan Dal, Veg Dry/Gravy Bhaji OR Chicken/Mutton Thali with authentic Pandhra & Tambda Rassa",
          desc: "The heart of our service. Rich, satisfying local thali prepared with authentic spices and fresh local produce.",
          tip: "Delivered straight to colleges, libraries, offices, or PG doorsteps exactly at lunch hours."
        };
      case 'dinner':
        return {
          title: "Comforting Cozy Evening Dinner",
          time: "07:30 PM — 09:00 PM",
          emoji: "🥘",
          cuisine: "Jowar Bhakri, Pithla (Besan), Thecha, Shengdanacha Chutney, or local home-style curries",
          desc: "Lighter, easy-to-digest recipes prepared in traditional style. Perfect comfort food after a long day of work or study.",
          tip: "Ensures you eat home-cooked food rather than oily hotel dishes before bed."
        };
      case 'planning':
        return {
          title: "Flexible Daily Adaptive Planning",
          time: "Before 10:00 PM for Next Day",
          emoji: "⚙️",
          cuisine: "Pause / Resume schedule via customer portal",
          desc: "Planning to travel, hang out with friends, or dine at a wedding tomorrow? Open your dashboard, click pause, and we skip tomorrow's delivery. Your subscription validity is automatically extended by 1 day!",
          tip: "Never waste money on food you didn't eat. Maximize subscription efficiency."
        };
      default:
        return null;
    }
  };

  const mealDetail = getMealDetail();

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
            Your Local Tiffin Network,<br />
            Redefined for <span className="title-orange-gradient">Modern Convenience</span>
          </h1>
          
          <p className="hiw-subheading-text">
            Connecting hungry college students and working professionals with verified, authentic home mess kitchens across Kolhapur.
          </p>

          {/* PERSONA TAB SWITCHER */}
          <div className="hiw-persona-toggle-container">
            <button 
              className={`persona-toggle-btn ${activePersona === 'customer' ? 'active' : ''}`}
              onClick={() => handlePersonaChange('customer')}
            >
              <User size={16} />
              <span>For Customers</span>
            </button>
            <button 
              className={`persona-toggle-btn ${activePersona === 'partner' ? 'active' : ''}`}
              onClick={() => handlePersonaChange('partner')}
            >
              <Briefcase size={16} />
              <span>For Mess Partners</span>
            </button>
          </div>
        </header>

        {/* INTERACTIVE WORKFLOW GRID */}
        <section className="hiw-interactive-workflow">
          <div className="hiw-workflow-grid">
            
            {/* Left Column: Interactive Steps List */}
            <div className="workflow-steps-column">
              <div className="workflow-section-title-box">
                <span className="visual-indicator-bar"></span>
                <h2>{activePersona === 'customer' ? 'Easy Onboarding' : 'Grow Your Business'}</h2>
                <p>Follow the simple guide below to see how our systems operate.</p>
              </div>

              <div className="workflow-steps-list">
                {currentSteps.map((step, idx) => (
                  <div 
                    key={idx}
                    className={`workflow-step-card ${activeStep === idx ? 'active-step-card' : ''}`}
                    onClick={() => setActiveStep(idx)}
                    onMouseEnter={() => setActiveStep(idx)}
                  >
                    <div className="step-card-num-box">
                      <span>0{idx + 1}</span>
                    </div>
                    <div className="step-card-text-details">
                      <h4>{step.title}</h4>
                      <p>{step.desc}</p>
                      <div className="step-card-tags">
                        {step.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="step-mini-tag">{tag}</span>
                        ))}
                      </div>
                    </div>
                    <div className="step-card-indicator-chevron">
                      <ChevronRight size={16} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Smartphone Mockup Container (Sticky) */}
            <div className="workflow-mockup-column">
              <div className="smartphone-sticky-wrapper">
                <div className="smartphone-body-mock">
                  {/* Speaker and Camera notch */}
                  <div className="phone-notch">
                    <span className="camera-dot"></span>
                    <span className="speaker-bar"></span>
                  </div>
                  {/* Phone screen container */}
                  <div className="phone-screen-container">
                    {renderSmartphoneScreen()}
                  </div>
                  {/* Home indicator bar */}
                  <div className="phone-home-indicator"></div>
                </div>
                <div className="phone-shadow-glow"></div>
                <p className="phone-interaction-hint">
                  <Sparkles size={12} className="icon-orange animate-spin-slow" /> 
                  Interact with the steps on the left to test the app screen
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* INTERACTIVE DAILY CUISINE CLOCK */}
        <section className="hiw-daily-clock-section">
          <div className="hiw-clock-header">
            <span className="hiw-section-badge">
              <Clock size={12} className="icon-orange" />
              <span className="badge-text">DAILY MEAL ROTATION</span>
            </span>
            <h2>Your Authentic Daily Menu Experience</h2>
            <p>From early morning energy to comforting evening meals, cooked by local home kitchens.</p>
          </div>

          <div className="hiw-clock-interactive-container">
            {/* Clock Dial Selectors */}
            <div className="clock-timeline-tabs">
              <button 
                onClick={() => setActiveMealTime('breakfast')}
                className={`clock-tab-btn ${activeMealTime === 'breakfast' ? 'active-clock-tab' : ''}`}
              >
                <span className="tab-icon">🍳</span>
                <div className="tab-details">
                  <span className="title">Morning Breakfast</span>
                  <span className="time">08:00 AM</span>
                </div>
              </button>

              <button 
                onClick={() => setActiveMealTime('lunch')}
                className={`clock-tab-btn ${activeMealTime === 'lunch' ? 'active-clock-tab' : ''}`}
              >
                <span className="tab-icon">🍱</span>
                <div className="tab-details">
                  <span className="title">Midday Lunch</span>
                  <span className="time">01:00 PM</span>
                </div>
              </button>

              <button 
                onClick={() => setActiveMealTime('dinner')}
                className={`clock-tab-btn ${activeMealTime === 'dinner' ? 'active-clock-tab' : ''}`}
              >
                <span className="tab-icon">🥘</span>
                <div className="tab-details">
                  <span className="title">Comforting Dinner</span>
                  <span className="time">08:00 PM</span>
                </div>
              </button>

              <button 
                onClick={() => setActiveMealTime('planning')}
                className={`clock-tab-btn ${activeMealTime === 'planning' ? 'active-clock-tab' : ''}`}
              >
                <span className="tab-icon">⚙️</span>
                <div className="tab-details">
                  <span className="title">Pause Tomorrow</span>
                  <span className="time">Before 10:00 PM</span>
                </div>
              </button>
            </div>

            {/* Displaying Current Selection Details */}
            <div className="clock-meal-card-display fade-in-animation">
              {mealDetail && (
                <div className="meal-card-grid">
                  <div className="meal-details-column">
                    <div className="meal-time-badge">
                      <Clock size={12} />
                      <span>{mealDetail.time}</span>
                    </div>
                    <h3>{mealDetail.title} {mealDetail.emoji}</h3>
                    <p className="meal-description">{mealDetail.desc}</p>
                    
                    <div className="meal-menu-items-box">
                      <span className="menu-header">TODAY'S SPECIAL</span>
                      <p className="menu-content">{mealDetail.cuisine}</p>
                    </div>

                    <div className="meal-tips-box">
                      <span className="bold-tip">Pro Tip: </span>
                      <span>{mealDetail.tip}</span>
                    </div>
                  </div>

                  <div className="meal-illustration-visual">
                    <div className="thali-plate-wrapper">
                      {/* CSS thali simulation */}
                      {activeMealTime === 'breakfast' && (
                        <div className="thali-plate breakfast-plate animate-spin-plate">
                          <div className="poha-bowl"></div>
                          <div className="lemon-wedge"></div>
                          <div className="chai-cup"></div>
                          <div className="spoon-mock"></div>
                        </div>
                      )}
                      {activeMealTime === 'lunch' && (
                        <div className="thali-plate lunch-plate animate-spin-plate">
                          <div className="katori tambda-rassa"></div>
                          <div className="katori pandhra-rassa"></div>
                          <div className="katori dry-subji"></div>
                          <div className="rice-portion"></div>
                          <div className="chapati-stack"></div>
                        </div>
                      )}
                      {activeMealTime === 'dinner' && (
                        <div className="thali-plate dinner-plate animate-spin-plate">
                          <div className="bhakri-portion"></div>
                          <div className="pithla-bowl"></div>
                          <div className="thecha-dot"></div>
                          <div className="onion-slice"></div>
                        </div>
                      )}
                      {activeMealTime === 'planning' && (
                        <div className="planning-control-card">
                          <div className="screen-status-box">
                            <span className="badge">PLANNING PORTAL</span>
                            <h5>Toggle Delivery</h5>
                          </div>
                          <div className="interactive-switch-demo">
                            <span>Skip tomorrow's meal?</span>
                            <div className="demo-switch-outer paused-switch">
                              <span className="label">PAUSED</span>
                              <span className="knob"></span>
                            </div>
                          </div>
                          <div className="alert-savings-green">
                            <span>✓ Meal credited back to your balance!</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* INTERACTIVE CALCULATOR SECTION */}
        <section className="hiw-calculator-section">
          <div className="hiw-calculator-card">
            
            <header className="calculator-header">
              <span className="hiw-section-badge">
                <Calculator size={12} className="icon-orange" />
                <span className="badge-text">Interactive Calculator</span>
              </span>
              <h2>
                {activePersona === 'customer' 
                  ? 'Calculate Your Monthly Tiffin Savings' 
                  : 'Estimate Your Monthly Partner Earnings'
                }
              </h2>
              <p>
                {activePersona === 'customer'
                  ? 'Move the sliders to compare what you spend on restaurants versus our clean tiffin networks.'
                  : 'Estimate your monthly revenue and profit limits based on your kitchen delivery capabilities.'
                }
              </p>
            </header>

            {activePersona === 'customer' ? (
              /* CUSTOMER SAVINGS CALCULATOR */
              <div className="calculator-wrapper-grid">
                <div className="sliders-inputs-column">
                  <div className="slider-group">
                    <div className="slider-label-row">
                      <span>Meals eaten outside per month:</span>
                      <span className="input-value-badge">{mealsPerMonth} meals</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="60" 
                      value={mealsPerMonth} 
                      onChange={(e) => setMealsPerMonth(Number(e.target.value))} 
                      className="slider-range-input" 
                    />
                    <div className="range-limits">
                      <span>10</span>
                      <span>60</span>
                    </div>
                  </div>

                  <div className="slider-group">
                    <div className="slider-label-row">
                      <span>Average cost of a restaurant meal:</span>
                      <span className="input-value-badge">₹{restaurantCost}</span>
                    </div>
                    <input 
                      type="range" 
                      min="80" 
                      max="250" 
                      value={restaurantCost} 
                      onChange={(e) => setRestaurantCost(Number(e.target.value))} 
                      className="slider-range-input" 
                    />
                    <div className="range-limits">
                      <span>₹80</span>
                      <span>₹250</span>
                    </div>
                  </div>
                </div>

                <div className="calculation-results-column">
                  <div className="results-wrapper-glass">
                    <div className="result-metric-row">
                      <span className="lbl">Restaurant Expenses (with delivery)</span>
                      <span className="val-red">₹{customerMonthlyRestaurantCost}</span>
                    </div>
                    <div className="result-metric-row">
                      <span className="lbl">Kolhapurcha Dabewala Flat Rate</span>
                      <span className="val-green">₹{customerKDCost}</span>
                    </div>
                    <div className="results-divider"></div>
                    <div className="final-savings-badge">
                      <span className="label">Estimated Monthly Savings</span>
                      <h3 className="savings-amount">₹{customerSavings}</h3>
                      <p className="yearly-saving-hint">Save up to ₹{customerSavings * 12} every year!</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* PARTNER EARNINGS CALCULATOR */
              <div className="calculator-wrapper-grid">
                <div className="sliders-inputs-column">
                  <div className="slider-group">
                    <div className="slider-label-row">
                      <span>Active daily tiffin subscribers:</span>
                      <span className="input-value-badge">{activeSubscribers} clients</span>
                    </div>
                    <input 
                      type="range" 
                      min="10" 
                      max="250" 
                      value={activeSubscribers} 
                      onChange={(e) => setActiveSubscribers(Number(e.target.value))} 
                      className="slider-range-input" 
                    />
                    <div className="range-limits">
                      <span>10</span>
                      <span>250</span>
                    </div>
                  </div>

                  <div className="slider-group">
                    <div className="slider-label-row">
                      <span>Average subscription price (per month):</span>
                      <span className="input-value-badge">₹{subRate}</span>
                    </div>
                    <input 
                      type="range" 
                      min="1800" 
                      max="3500" 
                      value={subRate} 
                      onChange={(e) => setSubRate(Number(e.target.value))} 
                      className="slider-range-input" 
                    />
                    <div className="range-limits">
                      <span>₹1,800</span>
                      <span>₹3,500</span>
                    </div>
                  </div>
                </div>

                <div className="calculation-results-column">
                  <div className="results-wrapper-glass">
                    <div className="result-metric-row">
                      <span className="lbl">Gross Monthly Billings</span>
                      <span className="val-white">₹{partnerGrossRevenue}</span>
                    </div>
                    <div className="result-metric-row">
                      <span className="lbl">Marketplace Commission (10%)</span>
                      <span className="val-red">- ₹{Math.round(partnerGrossRevenue * 0.1)}</span>
                    </div>
                    <div className="results-divider"></div>
                    <div className="final-savings-badge partner-earnings">
                      <span className="label">Your Estimated Net Monthly Payout</span>
                      <h3 className="savings-amount">₹{partnerNetRevenue}</h3>
                      <p className="yearly-saving-hint">Annual business scaling potential of ₹{partnerNetRevenue * 12}!</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </section>

        {/* WHY USERS & VENDORS CHOOSE US */}
        <section className="hiw-why-love-section">
          <header className="why-love-section-header">
            <h2>Why the Entire City Trusts Us</h2>
            <p>We combine traditional taste and sanitation standards with modern logistics.</p>
          </header>

          <div className="why-love-features-grid">
            
            <div className="why-love-grid-item">
              <div className="why-love-icon-box yellow">
                <Star size={20} fill="#EAB308" stroke="none" />
              </div>
              <div className="why-love-info">
                <h4>100% Handpicked kitchens</h4>
                <p>Every partner is audited, tested, and regularly checked for taste and sanitization standards.</p>
              </div>
            </div>

            <div className="why-love-grid-item">
              <div className="why-love-icon-box orange">
                <ChefHat size={20} className="icon-orange" />
              </div>
              <div className="why-love-info">
                <h4>Authentic Kolhapuri Taste</h4>
                <p>Meals are prepared by local home-cooks using local spices. No artificial preservatives.</p>
              </div>
            </div>

            <div className="why-love-grid-item">
              <div className="why-love-icon-box green">
                <Bike size={20} className="icon-green" />
              </div>
              <div className="why-love-info">
                <h4>Punctual Delivery Networks</h4>
                <p>Insulated meal boxes are routed efficiently to arrive directly at your location on time.</p>
              </div>
            </div>

            <div className="why-love-grid-item">
              <div className="why-love-icon-box orange">
                <span className="why-love-emoji">💰</span>
              </div>
              <div className="why-love-info">
                <h4>Pocket Friendly Rates</h4>
                <p>Healthy home subscriptions starting under ₹65 a meal. Ideal for budget management.</p>
              </div>
            </div>

            <div className="why-love-grid-item">
              <div className="why-love-icon-box blue">
                <Smartphone size={20} className="icon-blue" />
              </div>
              <div className="why-love-info">
                <h4>Smart Subscriptions</h4>
                <p>Switch menus, modify schedules, pause deliveries, or end subscription with quick controls.</p>
              </div>
            </div>

            <div className="why-love-grid-item">
              <div className="why-love-icon-box purple">
                <ShieldCheck size={20} className="icon-purple" />
              </div>
              <div className="why-love-info">
                <h4>Certified Financial Gateways</h4>
                <p>Every payment operates on a secure portal with direct bank receipts generated on the spot.</p>
              </div>
            </div>

          </div>
        </section>

        {/* TRUST BANNER STATS */}
        <section className="hiw-trust-stats-capsule-card">
          <div className="hiw-trust-grid">
            
            <div className="hiw-trust-col">
              <h3>50+</h3>
              <h4>Verified Partners</h4>
              <p>Top kitchens in Kolhapur</p>
            </div>

            <div className="hiw-trust-divider"></div>

            <div className="hiw-trust-col">
              <h3>1200+</h3>
              <h4>Happy Subscribers</h4>
              <p>Active daily student/office clients</p>
            </div>

            <div className="hiw-trust-divider"></div>

            <div className="hiw-trust-col">
              <h3>99.2%</h3>
              <h4>Logistics Accuracy</h4>
              <p>On-time door-to-door delivery</p>
            </div>

            <div className="hiw-trust-divider"></div>

            <div className="hiw-trust-col">
              <h3>4.9★</h3>
              <h4>Average Food Rating</h4>
              <p>Voted by local subscribers</p>
            </div>

          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="hiw-bottom-cta-banner-wrapper">
          <div className="hiw-cta-orange-gradient-banner">
            <h2 className="cta-banner-title">Ready to Taste True Convenience?</h2>
            <p className="cta-banner-desc">
              Subscribe in 2 minutes or join our kitchen partner program to expand your operations.
            </p>
            
            <div className="cta-banner-buttons-row">
              <button 
                onClick={() => navigate('/find-mess')} 
                className="btn-cta-banner solid-white"
              >
                Find A Mess
              </button>
              <button 
                onClick={() => navigate('/become-partner')} 
                className="btn-cta-banner outline-white"
              >
                Register Your Kitchen
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default HowItWorksPage;
