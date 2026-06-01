import React, { useState } from 'react';
import { Heart, Users, CheckCircle, Clock, Star, Leaf, ShieldCheck, Truck, Wallet, Smartphone, Shield, ArrowRight, ConciergeBell, UtensilsCrossed, Calculator, Flame, Sparkles, Plus } from 'lucide-react';
import './FeaturesGrid.css';

const features = [
  {
    id: '01',
    title: "Home-Style Food",
    description: "Enjoy freshly cooked, hygienic and delicious meals just like home.",
    pillText: "Fresh & Healthy",
    pillIcon: <Leaf size={14} />,
    pillColor: "green",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    isImage: true
  },
  {
    id: '02',
    title: "Verified Mess Partners",
    description: "All mess partners are background verified and quality-checked regularly.",
    pillText: "Quality Assured",
    pillIcon: <Star size={14} />,
    pillColor: "orange",
    icon: <ShieldCheck size={80} color="#FF6B00" strokeWidth={1} />,
    isImage: false
  },
  {
    id: '03',
    title: "Daily Doorstep Delivery",
    description: "We deliver hot and fresh meals to your doorstep, every single day.",
    pillText: "Always On Time",
    pillIcon: <Clock size={14} />,
    pillColor: "green",
    icon: <Truck size={80} color="#FF6B00" strokeWidth={1} />,
    isImage: false
  },
  {
    id: '04',
    title: "Budget-Friendly Plans",
    description: "Affordable monthly subscriptions with multiple plan options.",
    pillText: "Best Value",
    pillIcon: <span className="rupee-icon">₹</span>,
    pillColor: "orange",
    icon: <Wallet size={80} color="#FF6B00" strokeWidth={1} />,
    isImage: false
  },
  {
    id: '05',
    title: "Easy Subscription Management",
    description: "Pause, resume or change your plan anytime with just a few taps.",
    pillText: "Flexible & Simple",
    pillIcon: <Smartphone size={14} />,
    pillColor: "purple",
    icon: <Smartphone size={80} color="#FF6B00" strokeWidth={1} />,
    isImage: false
  },
  {
    id: '06',
    title: "Safe & Secure Payments",
    description: "100% secure payments via UPI, Cards, Net Banking and Wallets.",
    pillText: "100% Secure",
    pillIcon: <Shield size={14} />,
    pillColor: "blue",
    icon: <Shield size={80} color="#22C55E" strokeWidth={1} />,
    isImage: false
  }
];

const tierData = {
  1: {
    title: "Carbs & Fuel Tier",
    subtitle: "3x Hand-Rolled Chapatis / Jowar Bhakri",
    description: "Hand-rolled daily by certified home-makers in Kolhapur using 100% whole wheat/jowar flour sourced from local farmers. Brushed with light homemade ghee or served plain.",
    stats: { carbs: "85%", protein: "40%", fat: "15%", fiber: "70%" },
    highlights: [
      "Zero Maida & Preservatives",
      "Soft for up to 6 hours",
      "Gluten-free Bhakri available",
      "Cooked in clean, non-greasy pans"
    ]
  },
  2: {
    title: "Vitamins & Fiber Tier",
    subtitle: "Seasonal Vegetable Special & Local Curry",
    description: "Rich, fresh veggies sourced directly from Kolhapur's local farmer markets. Prepared with authentic, moderate Kolhapuri spices for maximum flavor and health.",
    stats: { carbs: "35%", protein: "25%", fat: "20%", fiber: "95%" },
    highlights: [
      "100% fresh, seasonal farm produce",
      "Less oil, high nutritional retention",
      "Different menu every single day",
      "Authentic home-style taste"
    ]
  },
  3: {
    title: "Protein & Comfort Tier",
    subtitle: "Slow-Cooked Varhadi Dal & Indrayani Rice",
    description: "Slow-cooked high-protein dal (Amti) paired with premium, aromatic Kolhapuri Indrayani rice. Packaged piping hot to retain that traditional home-cooked smell and taste.",
    stats: { carbs: "65%", protein: "80%", fat: "10%", fiber: "55%" },
    highlights: [
      "High-protein yellow split lentils",
      "Aromatic local Indrayani rice",
      "Zero soda or rising agents used",
      "Comfort food that is light on the gut"
    ]
  }
};

const FeaturesGrid = () => {
  const [activeTab, setActiveTab] = useState('tiffin');
  const [selectedTier, setSelectedTier] = useState(2);
  const [userType, setUserType] = useState('student');
  const [mealsPerWeek, setMealsPerWeek] = useState(6);

  // ROI Calculator Math:
  // Avg restaurant meal cost per profile:
  const profileRates = {
    student: 110,
    employee: 160,
    bachelor: 135
  };
  const restaurantRate = profileRates[userType];
  const kdRate = 75; // average KD price per meal
  const mealsPerMonth = Math.round(mealsPerWeek * 4.33);
  
  const restaurantMonthlyCost = mealsPerMonth * restaurantRate;
  const kdMonthlyCost = mealsPerMonth * kdRate;
  const monthlySavings = restaurantMonthlyCost - kdMonthlyCost;
  
  // 45 mins saved per meal (no waiting, ordering, cleanup)
  const hoursSaved = Math.round((mealsPerMonth * 45) / 60);
  const healthScore = Math.round(mealsPerWeek * 12.5);

  return (
    <section id="why-us" className="why-us-section">
      {/* Ambient background glow blobs */}
      <div className="ambient-blob blob-1"></div>
      <div className="ambient-blob blob-2"></div>

      <div className="container">
        
        {/* Header Section */}
        <div className="section-header">
          <div className="trust-badge">
            <Heart size={14} fill="#FF6B00" color="#FF6B00" />
            <span>WHY THOUSANDS TRUST US</span>
          </div>
          <h2 className="section-title">Why <span className="text-orange">Kolhapurcha Dabewala?</span></h2>
          <div className="title-underline"></div>
          <p className="section-subtitle">
            Fresh home-style meals, trusted mess partners and hassle-free<br/>
            subscriptions for students, employees and bachelors.
          </p>
          <div className="trust-micro-badge">
            <span className="live-pulse"></span>
            <span>Loved by 1,200+ monthly subscribers in Kolhapur</span>
          </div>
        </div>

        {/* 6-Card Features Grid */}
        <div className="features-6-grid">
          {features.map((feature) => {
            const cardClasses = {
              '01': 'card-homestyle',
              '02': 'card-verified',
              '03': 'card-delivery',
              '04': 'card-budget',
              '05': 'card-sub',
              '06': 'card-payments'
            };
            const customClass = cardClasses[feature.id] || '';
            return (
              <div key={feature.id} className={`feature-6-card ${customClass}`}>
                <div className="card-top">
                  <span className="feature-number">{feature.id}</span>
                  <div className="feature-content">
                    <h3 className="feature-title">{feature.title}</h3>
                    <p className="feature-desc">{feature.description}</p>
                  </div>
                </div>
                
                <div className="feature-visual">
                  {feature.isImage ? (
                    <img src={feature.image} alt={feature.title} className="feature-plate-img" />
                  ) : (
                    <div className="feature-icon-large">
                      {feature.icon}
                    </div>
                  )}
                </div>
                
                <div className="card-bottom">
                  <div className={`feature-pill pill-${feature.pillColor}`}>
                    {feature.pillIcon}
                    <span>{feature.pillText}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Unique Feature: Interactive Tiffin & ROI Hub */}
        <div className="interactive-hub-container">
          <div className="hub-header">
            <div className="hub-badge">
              <Sparkles size={14} color="#FF6B00" fill="#FF6B00" />
              <span>KOLHAPUR DIGITAL LAB</span>
            </div>
            <h3 className="hub-title">Interactive Experience</h3>
            <p className="hub-desc">Click below to dissect your lunchbox or calculate your monthly cash savings instantly.</p>
          </div>

          <div className="hub-tabs">
            <button 
              className={`hub-tab-btn ${activeTab === 'tiffin' ? 'active' : ''}`}
              onClick={() => setActiveTab('tiffin')}
            >
              <UtensilsCrossed size={16} />
              <span>Inside the Dabba (Tiffin)</span>
            </button>
            <button 
              className={`hub-tab-btn ${activeTab === 'calculator' ? 'active' : ''}`}
              onClick={() => setActiveTab('calculator')}
            >
              <Calculator size={16} />
              <span>Smart Savings & Health ROI</span>
            </button>
          </div>

          <div className="hub-content">
            {activeTab === 'tiffin' ? (
              <div className="tiffin-visualizer-view">
                {/* Left side: Tiffin Stack */}
                <div className="tiffin-column tiffin-visual-pane">
                  <div className="tiffin-steel-handle"></div>
                  <div className="tiffin-steel-bracket-left"></div>
                  <div className="tiffin-steel-bracket-right"></div>
                  <div className="tiffin-metal-stack">
                    <div 
                      className={`tiffin-tier-container tier-1-box ${selectedTier === 1 ? 'active' : ''}`}
                      onClick={() => setSelectedTier(1)}
                    >
                      <div className="tiffin-tier-lid"></div>
                      <div className="tiffin-metal-body">
                        <span className="tier-tag">TIER 1</span>
                        <span className="tier-name">Carbs / Grains</span>
                      </div>
                    </div>
                    <div 
                      className={`tiffin-tier-container tier-2-box ${selectedTier === 2 ? 'active' : ''}`}
                      onClick={() => setSelectedTier(2)}
                    >
                      <div className="tiffin-metal-body">
                        <span className="tier-tag">TIER 2</span>
                        <span className="tier-name">Veggies / Fiber</span>
                      </div>
                    </div>
                    <div 
                      className={`tiffin-tier-container tier-3-box ${selectedTier === 3 ? 'active' : ''}`}
                      onClick={() => setSelectedTier(3)}
                    >
                      <div className="tiffin-metal-body">
                        <span className="tier-tag">TIER 3</span>
                        <span className="tier-name">Protein / Comfort</span>
                      </div>
                    </div>
                  </div>
                  <div className="tiffin-shadow-glow"></div>
                </div>

                {/* Right side: Detailed Breakdown */}
                <div className="tiffin-column tiffin-details-pane">
                  <div className="tier-glow-header">
                    <span className="tier-badge-number">0{selectedTier}</span>
                    <div>
                      <h4 className="tier-glow-title">{tierData[selectedTier].title}</h4>
                      <p className="tier-glow-subtitle">{tierData[selectedTier].subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="tier-description">{tierData[selectedTier].description}</p>
                  
                  <div className="nutrition-stats-card">
                    <h5 className="stats-heading">Nutrition Focus & Quality Ratios</h5>
                    <div className="stats-grid">
                      <div className="stat-row">
                        <span className="stat-label">Fiber & Minerals</span>
                        <div className="stat-bar-outer">
                          <div className="stat-bar-inner fiber" style={{ width: tierData[selectedTier].stats.fiber }}></div>
                        </div>
                        <span className="stat-pct">{tierData[selectedTier].stats.fiber}</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Complex Carbs</span>
                        <div className="stat-bar-outer">
                          <div className="stat-bar-inner carbs" style={{ width: tierData[selectedTier].stats.carbs }}></div>
                        </div>
                        <span className="stat-pct">{tierData[selectedTier].stats.carbs}</span>
                      </div>
                      <div className="stat-row">
                        <span className="stat-label">Proteins</span>
                        <div className="stat-bar-outer">
                          <div className="stat-bar-inner protein" style={{ width: tierData[selectedTier].stats.protein }}></div>
                        </div>
                        <span className="stat-pct">{tierData[selectedTier].stats.protein}</span>
                      </div>
                    </div>
                  </div>

                  <div className="tier-highlights-list">
                    {tierData[selectedTier].highlights.map((item, index) => (
                      <div key={index} className="tier-highlight-item">
                        <CheckCircle size={16} className="highlight-check" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="calculator-view">
                {/* Left side: Controls */}
                <div className="calculator-pane calc-inputs">
                  <h4 className="calc-title">Choose Your Lifestyle profile</h4>
                  <div className="profile-selector-grid">
                    <button 
                      className={`profile-card ${userType === 'student' ? 'active' : ''}`}
                      onClick={() => setUserType('student')}
                    >
                      <span className="p-emoji">🎓</span>
                      <span className="p-title">Student / Aspirant</span>
                      <span className="p-sub">Eating Rate: ~₹110/meal</span>
                    </button>
                    <button 
                      className={`profile-card ${userType === 'employee' ? 'active' : ''}`}
                      onClick={() => setUserType('employee')}
                    >
                      <span className="p-emoji">💼</span>
                      <span className="p-title">Office Employee</span>
                      <span className="p-sub">Eating Rate: ~₹160/meal</span>
                    </button>
                    <button 
                      className={`profile-card ${userType === 'bachelor' ? 'active' : ''}`}
                      onClick={() => setUserType('bachelor')}
                    >
                      <span className="p-emoji">🏡</span>
                      <span className="p-title">Home Bachelor</span>
                      <span className="p-sub">Eating Rate: ~₹135/meal</span>
                    </button>
                  </div>

                  <div className="slider-control-group">
                    <div className="slider-labels">
                      <span className="slider-title">Meals per Week</span>
                      <span className="slider-value">{mealsPerWeek} meals / wk</span>
                    </div>
                    <input 
                      type="range" 
                      min="3" 
                      max="7" 
                      value={mealsPerWeek} 
                      onChange={(e) => setMealsPerWeek(parseInt(e.target.value))}
                      className="kd-range-input"
                    />
                    <div className="slider-minmax">
                      <span>3 meals (Only Lunch)</span>
                      <span>7 meals (Lunch + Dinner)</span>
                    </div>
                  </div>

                  <div className="calc-disclaimer">
                    <p>* Calculations compare typical local hotel prices vs. our subscription services averages (₹75/meal).</p>
                  </div>
                </div>

                {/* Right side: Results display */}
                <div className="calculator-pane calc-results">
                  <div className="results-grid">
                    <div className="result-card card-savings">
                      <span className="res-icon"><Wallet size={20} /></span>
                      <div className="res-content">
                        <span className="res-val">₹{monthlySavings.toLocaleString('en-IN')}</span>
                        <span className="res-label">Net Savings / Month</span>
                      </div>
                      <div className="res-badge-pct">-{Math.round(((restaurantMonthlyCost - kdMonthlyCost)/restaurantMonthlyCost)*100)}% Cost</div>
                    </div>

                    <div className="result-card card-hours">
                      <span className="res-icon"><Clock size={20} /></span>
                      <div className="res-content">
                        <span className="res-val">{hoursSaved} hrs</span>
                        <span className="res-label">Time Saved / Month</span>
                      </div>
                      <div className="res-subtext">No cooking or dishwashing</div>
                    </div>

                    <div className="result-card card-health">
                      <span className="res-icon"><Leaf size={20} /></span>
                      <div className="res-content">
                        <span className="res-val">+{healthScore}%</span>
                        <span className="res-label">Health ROI Index</span>
                      </div>
                      <div className="res-subtext">No preservatives, low acidity</div>
                    </div>

                    <div className="result-card card-meals">
                      <span className="res-icon"><CheckCircle size={20} /></span>
                      <div className="res-content">
                        <span className="res-val">{mealsPerMonth} meals</span>
                        <span className="res-label">Hygienic Meals Eaten</span>
                      </div>
                      <div className="res-subtext">100% home-cooked kitchen audited</div>
                    </div>
                  </div>

                  <div className="action-row-calculator">
                    <div className="savings-highlight">
                      <span>Annual Savings Estimate:</span>
                      <strong className="text-orange">₹{(monthlySavings * 12).toLocaleString('en-IN')}/year</strong>
                    </div>
                    <button className="btn-find-mess" onClick={() => {
                      const element = document.getElementById('find-mess');
                      if (element) element.scrollIntoView({ behavior: 'smooth' });
                    }}>
                      Claim Savings Now <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Promotional Banner */}
        <div className="bottom-trust-banner">
          <div className="banner-text">
            <h3>Good Food. Trusted People.<br/><span className="text-orange">Delivered with Care.</span></h3>
            <p>Join thousands of students & working professionals<br/>who trust Kolhapurcha Dabewala for their daily meals.</p>
          </div>
          
          <div className="banner-icons">
            <div className="banner-icon-item">
              <div className="b-icon"><ConciergeBell size={24} color="#FF6B00" /></div>
              <span>Home-Style<br/>Meals</span>
            </div>
            <div className="banner-icon-item">
              <div className="b-icon"><ShieldCheck size={24} color="#FF6B00" /></div>
              <span>Hygienic<br/>& Safe</span>
            </div>
            <div className="banner-icon-item">
              <div className="b-icon"><Heart size={24} color="#FF6B00" /></div>
              <span>Made<br/>with Care</span>
            </div>
            <div className="banner-icon-item">
              <div className="b-icon"><Users size={24} color="#FF6B00" /></div>
              <span>Loved by<br/>Many</span>
            </div>
          </div>
          
          <div className="banner-actions">
            <button className="btn-find-mess" onClick={() => {
              const element = document.getElementById('find-mess');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}>
              Find Your Mess <ArrowRight size={16} />
            </button>
            <a href="#explore" className="link-explore">Explore Now</a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FeaturesGrid;
