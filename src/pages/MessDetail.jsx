import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Star, CheckCircle2, ChevronRight, MapPin, Sparkles, ShieldCheck, 
  Clock, Heart, MessageCircle, ChevronDown, ChevronUp, Copy, Check, Info, HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './MessDetail.css';

// Original list of messes for backup matching
const BASE_MESSES = [
  { id: 1, name: "Shivneri Mess", area: "Shahupuri", price: 2399, rating: 4.5, isVeg: true, isPremium: true, nearArea: "Near Office", description: "Fresh home-style meals prepared daily with love and hygiene.", image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
  { id: 2, name: "Aai's Kitchen", area: "Tarabai Park", price: 2199, rating: 4.7, isVeg: true, nearArea: "Near Hostel", description: "Tasty, hygienic and balanced home cooked meals.", image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
  { id: 3, name: "Gharacha Swad Mess", area: "Rajarampuri", price: 2099, rating: 4.6, isVeg: true, nearArea: "Near College", description: "Pure home-style food with authentic taste and quality.", image: "https://images.unsplash.com/photo-1589302168068-964664d93cb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
  { id: 4, name: "Kolhapur Tiffin Service", area: "C Ward", price: 1999, rating: 4.5, isVeg: true, nearArea: "Near College", description: "Affordable and delicious tiffin service for everyone.", image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" },
  { id: 5, name: "Sai Home Kitchen", area: "New Shahupuri", price: 2499, rating: 4.8, isVeg: true, isPremium: true, nearArea: "Near Office", description: "Healthy home-style meals prepared daily using fresh ingredients with the perfect balance of taste and nutrition.", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" },
  { id: 6, name: "Maa Annapurna Mess", area: "Bhandiwade", price: 2299, rating: 4.6, isVeg: true, nearArea: "Near Hostel", description: "Traditional recipes with modern hygiene standards.", image: "https://images.unsplash.com/photo-1621979087428-11136877c3ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" }
];

const MessDetail = () => {
  const { messName } = useParams();
  const navigate = useNavigate();
  const [mess, setMess] = useState(BASE_MESSES[4]); // Defaults to Sai Home Kitchen
  const [activeImage, setActiveImage] = useState(BASE_MESSES[4].image);
  const [liked, setLiked] = useState(false);
  const [weeklyMenuExpanded, setWeeklyMenuExpanded] = useState(false);
  const [faqOpen, setFaqOpen] = useState({});

  // Plan Selection Sync with Sticky Sidebar
  const [selectedPlan, setSelectedPlan] = useState({
    id: 'lunch-dinner',
    name: 'Lunch / Dinner',
    price: 1624,
    badge: 'Most Popular',
    features: ['Chapati', 'Rice', 'Dal', 'Sabji', 'Salad', 'Curd', 'Pickle']
  });

  const getCleanName = (name) => name.toLowerCase().replace(/\s+/g, '-');

  // Load mess data dynamically
  useEffect(() => {
    let localApproved = [];
    const savedApproved = localStorage.getItem('approvedVendors');
    if (savedApproved) {
      try {
        localApproved = JSON.parse(savedApproved).filter(v => v.id > 6);
      } catch (e) {
        console.error(e);
      }
    } else {
      localStorage.setItem('approvedVendors', JSON.stringify([]));
    }
    
    const mappedApproved = localApproved.map(vendor => ({
      id: vendor.id || Date.now() + Math.random(),
      name: vendor.name || vendor.messName || "Approved Mess",
      area: vendor.area || "Rajarampuri",
      price: vendor.price || 2100,
      rating: vendor.rating || 4.7,
      isVeg: vendor.isVeg !== undefined ? vendor.isVeg : true,
      isPremium: vendor.isPremium || false,
      nearArea: vendor.nearArea || "Near College",
      description: vendor.description || "Fresh home-style food prepared fresh daily with the best quality ingredients.",
      image: vendor.image || "https://images.unsplash.com/photo-1621979087428-11136877c3ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
    }));

    const allMesses = [...mappedApproved];
    const target = allMesses.find(m => getCleanName(m.name) === messName);
    
    if (target) {
      setMess(target);
      setActiveImage(target.image);
      
      // Sync customized plans if vendor customized them in dash
      const clean = target.name.trim().replace(/\s+/g, '_');
      const customLunchDinner = localStorage.getItem(`vendor_plan_lunchDinner_${clean}`);
      const customLunchOnly = localStorage.getItem(`vendor_plan_lunchOnly_${clean}`);
      const customMiniMeal = localStorage.getItem(`vendor_plan_miniMeal_${clean}`);

      const planLDPrice = customLunchDinner ? parseInt(customLunchDinner) : target.price || 2499;
      const planLPrice = customLunchOnly ? parseInt(customLunchOnly) : Math.round((target.price || 2499) * 0.65);
      const planMPrice = customMiniMeal ? parseInt(customMiniMeal) : Math.round((target.price || 2499) * 0.5);

      // Set default selected plan as Lunch/Dinner
      setSelectedPlan({
        id: 'lunch-dinner',
        name: 'Lunch / Dinner',
        price: planLPrice,
        badge: 'Most Popular',
        features: ['Chapati', 'Rice', 'Dal', 'Sabji', 'Salad', 'Curd', 'Pickle']
      });
    }

    // Check if favorited
    const savedLikes = localStorage.getItem('likedMesses');
    if (savedLikes && target) {
      try {
        const parsed = JSON.parse(savedLikes);
        setLiked(parsed.some(item => item.id === target.id));
      } catch (e) {
        console.error(e);
      }
    }
    
    window.scrollTo(0, 0);
  }, [messName]);

  const toggleFavorite = () => {
    const savedLikes = localStorage.getItem('likedMesses');
    let list = [];
    if (savedLikes) {
      try { list = JSON.parse(savedLikes); } catch (e) { console.error(e); }
    }

    const isFav = list.some(item => item.id === mess.id);
    let updated;
    if (isFav) {
      updated = list.filter(item => item.id !== mess.id);
      setLiked(false);
    } else {
      updated = [...list, { id: mess.id, name: mess.name, area: mess.area, image: mess.image, price: mess.price }];
      setLiked(true);
    }
    localStorage.setItem('likedMesses', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('favorites-updated', { detail: updated }));
  };

  const handleSubscribeClick = () => {
    // Fire account signup trigger popover in navigation header
    const triggerBtn = document.querySelector('.btn-get-started');
    if (triggerBtn) {
      triggerBtn.click();
    }
  };

  const toggleFaq = (index) => {
    setFaqOpen(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  // Mock galleries matching the layout screenshot
  const galleryPhotos = [
    mess.image,
    "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1589302168068-964664d93cb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    "https://images.unsplash.com/photo-1621979087428-11136877c3ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  ];

  // Dynamic pricing based on localStorage overrides
  const cleanKey = mess.name.trim().replace(/\s+/g, '_');
  const plansData = [
    {
      id: 'mini',
      name: 'Mini Meal',
      price: localStorage.getItem(`vendor_plan_miniMeal_${cleanKey}`) 
        ? parseInt(localStorage.getItem(`vendor_plan_miniMeal_${cleanKey}`)) 
        : Math.round(mess.price * 0.5),
      features: ['Rice', 'Dal', 'Sabji', 'Delivery'],
      badge: ''
    },
    {
      id: 'lunch-dinner',
      name: 'Lunch / Dinner',
      price: localStorage.getItem(`vendor_plan_lunchOnly_${cleanKey}`)
        ? parseInt(localStorage.getItem(`vendor_plan_lunchOnly_${cleanKey}`))
        : Math.round(mess.price * 0.65),
      features: ['Chapati', 'Rice', 'Dal', 'Sabji', 'Salad', 'Curd', 'Pickle'],
      badge: 'Most Popular'
    },
    {
      id: 'lunch-plus-dinner',
      name: 'Lunch + Dinner',
      price: localStorage.getItem(`vendor_plan_lunchDinner_${cleanKey}`)
        ? parseInt(localStorage.getItem(`vendor_plan_lunchDinner_${cleanKey}`))
        : mess.price,
      features: ['Full Meal (2 times)', 'Chapati / Rice', 'Dal', 'Sabji (2 Types)', 'Salad', 'Curd', 'Weekend Special', 'Priority Support'],
      badge: 'Premium'
    }
  ];

  return (
    <div className="mess-detail-page">
      <div className="container">
        
        {/* HERO SECTION CONTAINER */}
        <div className="detail-hero-layout">
          
          {/* LEFT: Food Galleries */}
          <div className="hero-gallery-wrap">
            <div className="main-display-image-wrap">
              <img src={activeImage} alt={mess.name} className="gallery-main-img" />
              
              {/* Badge overlays */}
              <div className="gallery-badges-overlay">
                <span className="verif-tag"><CheckCircle2 size={12} fill="#FFFFFF" stroke="none" /> Verified Mess</span>
                {mess.isPremium && <span className="premium-tag">👑 Premium Vendor</span>}
              </div>

              {/* Heart like button */}
              <button 
                onClick={toggleFavorite} 
                className={`gallery-fav-btn ${liked ? 'liked' : ''}`}
                title={liked ? "Remove from Favorites" : "Add to Favorites"}
              >
                <Heart size={18} fill={liked ? "#FF6B00" : "none"} stroke={liked ? "#FF6B00" : "#FFFFFF"} />
              </button>
            </div>

            {/* Thumbnail selector */}
            <div className="gallery-thumbnails-row">
              {galleryPhotos.map((photo, i) => (
                <div 
                  key={i} 
                  className={`thumb-card ${activeImage === photo ? 'active' : ''}`}
                  onClick={() => setActiveImage(photo)}
                >
                  <img src={photo} alt={`${mess.name} view ${i}`} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Primary Meta details */}
          <div className="hero-metadata-wrap">
            <div className="meta-badge-row">
              <span className="green-verif-badge">✓ Verified Mess</span>
            </div>
            
            <h1 className="mess-meta-title">{mess.name}</h1>
            
            <div className="rating-subscriber-row">
              <div className="rating-block">
                <Star size={16} fill="var(--color-orange)" stroke="none" />
                <span className="rating-num">{mess.rating}</span>
                <span className="reviews-count">(215 Reviews)</span>
              </div>
              <div className="divider-dot">•</div>
              <div className="subscriber-count">
                <strong>450+</strong> Subscribers
              </div>
            </div>

            <p className="meta-location">
              <MapPin size={16} className="pin-icon" /> {mess.area}, Kolhapur
            </p>

            <p className="meta-description">{mess.description}</p>

            {/* Quick Stats Checklist */}
            <div className="quick-stats-grid">
              <div className="stat-pill">
                <span className="stat-emoji">🌱</span>
                <span>Veg Meals</span>
              </div>
              <div className="stat-pill">
                <span className="stat-emoji">🚚</span>
                <span>Daily Delivery</span>
              </div>
              <div className="stat-pill">
                <span className="stat-emoji">🧼</span>
                <span>Hygienic Kitchen</span>
              </div>
              <div className="stat-pill">
                <span className="stat-emoji">⏰</span>
                <span>On-Time Delivery</span>
              </div>
              <div className="stat-pill font-semibold">
                <span className="stat-emoji">🥗</span>
                <span>Fresh Ingredients</span>
              </div>
            </div>
          </div>

        </div>

        {/* TWO-COLUMN CONTENT GRID (Left Details vs Right Sticky Sidebar) */}
        <div className="detail-split-content-row">
          
          {/* LEFT DETAILS COLUMN */}
          <div className="details-left-column">
            
            {/* PLAN SECTION */}
            <section className="section-block plans-section">
              <h2 className="section-title">Choose Your Plan</h2>
              
              <div className="plans-cards-grid">
                {plansData.map((plan) => (
                  <div 
                    key={plan.id}
                    className={`plan-option-card ${selectedPlan.id === plan.id ? 'selected' : ''}`}
                    onClick={() => setSelectedPlan(plan)}
                  >
                    {plan.badge && (
                      <span className={`plan-badge ${plan.badge.toLowerCase().replace(/\s+/g, '-')}`}>
                        {plan.badge}
                      </span>
                    )}
                    
                    <h3 className="plan-name">{plan.name}</h3>
                    <div className="plan-price-block">
                      <span className="plan-price-val">₹{plan.price}</span>
                      <span className="plan-price-unit">/month</span>
                    </div>

                    <ul className="plan-benefits-checklines">
                      {plan.features.map((feat, idx) => (
                        <li key={idx}>✓ {feat}</li>
                      ))}
                    </ul>

                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlan(plan);
                        handleSubscribeClick();
                      }}
                      className={`plan-subscribe-btn ${selectedPlan.id === plan.id ? 'active' : ''}`}
                    >
                      Subscribe
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* TODAY'S MENU */}
            <section className="section-block today-menu-section">
              <div className="today-menu-highlight-card">
                <div className="today-header-row">
                  <h3>🍽 Today's Menu</h3>
                  <span className="today-fresh-badge">Prepared Fresh Today</span>
                </div>
                
                <div className="today-items-grid">
                  <div className="menu-item-tag">✓ 3 Chapati</div>
                  <div className="menu-item-tag">✓ Rice</div>
                  <div className="menu-item-tag">✓ Dal Fry</div>
                  <div className="menu-item-tag">✓ Mix Veg Sabji</div>
                  <div className="menu-item-tag">✓ Fresh Salad</div>
                  <div className="menu-item-tag">✓ Sweet Dish</div>
                </div>
              </div>
            </section>

            {/* WEEKLY MENU */}
            <section className="section-block weekly-menu-section">
              <div className="weekly-menu-card">
                <h3 className="card-title">📅 Weekly Menu</h3>
                
                <div className={`weekly-days-row ${weeklyMenuExpanded ? 'expanded' : ''}`}>
                  <div className="day-col">
                    <span className="day-name">Mon</span>
                    <ul className="day-list">
                      <li>Chapati</li>
                      <li>Rice</li>
                      <li>Dal Fry</li>
                      <li>Mix Veg</li>
                      <li>Salad</li>
                    </ul>
                  </div>

                  <div className="day-col">
                    <span className="day-name">Tue</span>
                    <ul className="day-list">
                      <li>Chapati</li>
                      <li>Rice</li>
                      <li>Amti</li>
                      <li>Paneer</li>
                      <li>Salad</li>
                    </ul>
                  </div>

                  <div className="day-col">
                    <span className="day-name">Wed</span>
                    <ul className="day-list">
                      <li>Chapati</li>
                      <li>Rice</li>
                      <li>Dal</li>
                      <li>Bhindi</li>
                      <li>Salad</li>
                    </ul>
                  </div>

                  <div className="day-col">
                    <span className="day-name">Thu</span>
                    <ul className="day-list">
                      <li>Chapati</li>
                      <li>Rice</li>
                      <li>Dal Tadka</li>
                      <li>Aloo Gobi</li>
                      <li>Salad</li>
                    </ul>
                  </div>

                  <div className="day-col">
                    <span className="day-name">Fri</span>
                    <ul className="day-list">
                      <li>Chapati</li>
                      <li>Rice</li>
                      <li>Usal</li>
                      <li>Koshimbir</li>
                      <li>Salad</li>
                    </ul>
                  </div>

                  <div className="day-col special">
                    <span className="day-name">Sat</span>
                    <ul className="day-list">
                      <li>Chapati</li>
                      <li>Pulao</li>
                      <li>Masala Veg</li>
                      <li>Sweet</li>
                    </ul>
                  </div>

                  <div className="day-col special-feast">
                    <span className="day-name">Sun</span>
                    <ul className="day-list font-bold">
                      <li>Special Thali</li>
                      <li>Sweet Dish</li>
                      <li>Curd</li>
                      <li>Papad</li>
                    </ul>
                  </div>
                </div>

                <button 
                  onClick={() => setWeeklyMenuExpanded(!weeklyMenuExpanded)} 
                  className="weekly-toggle-btn"
                >
                  {weeklyMenuExpanded ? (
                    <>
                      <span>Collapse Weekly Menu</span>
                      <ChevronUp size={16} />
                    </>
                  ) : (
                    <>
                      <span>View Full Weekly Menu</span>
                      <ChevronDown size={16} />
                    </>
                  )}
                </button>
              </div>
            </section>

            {/* CUSTOMER REVIEWS */}
            <section className="section-block reviews-section">
              <div className="reviews-header-block">
                <h2 className="section-title">Customer Reviews</h2>
                <div className="overall-rating-card">
                  <span className="stars-fill">⭐⭐⭐⭐⭐</span>
                  <span className="rating-avg">4.8 Average rating based on verified subscribers.</span>
                </div>
              </div>

              <div className="reviews-list-stack">
                <div className="review-comment-card">
                  <div className="review-user-row">
                    <div className="user-avatar text-orange">RD</div>
                    <div>
                      <h4>Rahul Deshmukh</h4>
                      <span className="user-role">Student</span>
                    </div>
                  </div>
                  <p className="review-quote">"As a student, this is the closest thing to home food. Balanced oil and spices, and highly hygienic packaging."</p>
                </div>

                <div className="review-comment-card">
                  <div className="review-user-row">
                    <div className="user-avatar text-orange">PP</div>
                    <div>
                      <h4>Priya Patil</h4>
                      <span className="user-role">Working Professional</span>
                    </div>
                  </div>
                  <p className="review-quote">"Delivery is always on time. If I need to pause, the WhatsApp support is quick to assist. Fully recommended!"</p>
                </div>

                <div className="review-comment-card">
                  <div className="review-user-row">
                    <div className="user-avatar text-orange">AK</div>
                    <div>
                      <h4>Amit Kadam</h4>
                      <span className="user-role">Student</span>
                    </div>
                  </div>
                  <p className="review-quote">"Affordable and hygienic. Highly regular services and the Sunday special feasting menu is delicious."</p>
                </div>
              </div>
            </section>

            {/* ABOUT THE MESS */}
            <section className="section-block about-mess-section">
              <h2 className="section-title">About {mess.name}</h2>
              <div className="about-details-card">
                <p>
                  Started in 2018, {mess.name} is run by a local family that believes in serving healthy food just like home. 
                  We follow high hygiene, quality, taste, and punctual delivery standards. Every dish is cooked using freshly ground local spices 
                  and quality grain.
                </p>

                <div className="about-stats-grid">
                  <div className="about-stat-item">
                    <span className="label">Established</span>
                    <strong className="value">2018</strong>
                  </div>
                  <div className="about-stat-item">
                    <span className="label">Meals Served</span>
                    <strong className="value">50,000+</strong>
                  </div>
                  <div className="about-stat-item">
                    <span className="label">Specialty</span>
                    <strong className="value">Home-style food</strong>
                  </div>
                  <div className="about-stat-item">
                    <span className="label">Food Type</span>
                    <strong className="value">100% Vegetarian</strong>
                  </div>
                  <div className="about-stat-item">
                    <span className="label">Timings</span>
                    <strong className="value">7:00 AM – 10:00 PM</strong>
                  </div>
                </div>
              </div>
            </section>

            {/* DELIVERY AREA */}
            <section className="section-block delivery-area-section">
              <h2 className="section-title">Delivery Areas</h2>
              <div className="delivery-card">
                <p className="deliv-subtext">We deliver fresh hot meals twice daily to the following locations:</p>
                
                <div className="delivery-checklist-grid">
                  <div className="delivery-item">✓ Rajarampuri</div>
                  <div className="delivery-item">✓ Shahupuri</div>
                  <div className="delivery-item">✓ Tarabai Park</div>
                  <div className="delivery-item">✓ Shivaji University Area</div>
                  <div className="delivery-item">✓ Ruikar Colony</div>
                  <div className="delivery-item">✓ New Palace Area</div>
                  <div className="delivery-item">✓ Vidyanagar</div>
                </div>

                <div className="map-view-box">
                  <button className="btn-view-map">📍 View Coverage Map</button>
                </div>
              </div>
            </section>

            {/* TRUST STATISTICS */}
            <section className="trust-stats-footer-strip">
              <div className="trust-col">
                <strong className="number">50+</strong>
                <span className="label">Verified Messes</span>
              </div>
              <div className="trust-col">
                <strong className="number">1,200+</strong>
                <span className="label">Happy Subscribers</span>
              </div>
              <div className="trust-col">
                <strong className="number">99%</strong>
                <span className="label">On-Time Delivery</span>
              </div>
              <div className="trust-col">
                <strong className="number">4.8★</strong>
                <span className="label">Average Rating</span>
              </div>
            </section>

            {/* FAQ SECTION */}
            <section className="section-block faq-detail-section">
              <h2 className="section-title">Frequently Asked Questions</h2>
              
              <div className="faq-accordion-stack">
                {[
                  { q: "Can I pause my subscription?", a: "Yes, you can pause or resume your subscription at any time by messaging our support on WhatsApp. Unused meals will carry over to the next billing cycle." },
                  { q: "Can I change plans later?", a: "Absolutely. You can switch between Mini Meal, Single Meal, or Double Meal plans at the start of any week. The price difference will be adjusted in your wallet." },
                  { q: "Do you offer non-veg meals?", a: "Sai Home Kitchen is a pure vegetarian mess. If you are looking for non-veg options, please browse other verified partners on the 'Find Mess' directory." },
                  { q: "How is food delivered?", a: "Meals are packed in insulated, hygienic food-grade stainless steel tiffins and delivered directly to your home, office, or hostel room by our dedicated delivery crew." },
                  { q: "What if I am not at home during delivery?", a: "You can request the delivery agent to drop the tiffin at your gate, security cabin, or with a roommate. Alternatively, notify support 2 hours in advance to skip that meal." }
                ].map((item, idx) => (
                  <div key={idx} className={`faq-row-item ${faqOpen[idx] ? 'open' : ''}`}>
                    <button onClick={() => toggleFaq(idx)} className="faq-question-btn">
                      <span>{item.q}</span>
                      {faqOpen[idx] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {faqOpen[idx] && (
                      <div className="faq-answer-block">
                        <p>{item.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT STICKY SIDEBAR */}
          <aside className="sticky-plans-sidebar">
            <div className="sidebar-card glassmorphism">
              <span className="sidebar-pill">Selected Plan</span>
              
              <h3 className="sidebar-plan-name">{selectedPlan.name} Subscription</h3>
              
              <div className="sidebar-price-row">
                <span className="sidebar-price-num">₹{selectedPlan.price}</span>
                <span className="sidebar-price-term">/month</span>
              </div>

              <div className="sidebar-benefits-checklist">
                <h4>Includes:</h4>
                <ul>
                  {selectedPlan.features.map((feat, idx) => (
                    <li key={idx} className="benefit-item">✓ {feat}</li>
                  ))}
                  <li className="benefit-item">✓ Contactless Daily Delivery</li>
                  <li className="benefit-item">✓ Option to Pause Subscription</li>
                </ul>
              </div>

              <button onClick={handleSubscribeClick} className="btn-sidebar-subscribe-solid">
                Subscribe Now
              </button>

              <a 
                href={`https://wa.me/919999999999?text=Hi!%20I%20am%20interested%20in%20subscribing%20to%20the%20${selectedPlan.name}%20plan%20at%20${mess.name}.%20Please%20guide%20me.`}
                target="_blank"
                rel="noreferrer"
                className="btn-sidebar-whatsapp-outline"
              >
                <MessageCircle size={16} /> Chat on WhatsApp
              </a>

              <div className="sidebar-trust-footer">
                <ShieldCheck size={14} color="#2E7D32" />
                <span>100% Secure Payments</span>
              </div>
            </div>

            {/* Quick Sticky Highlight Card: Today's Menu */}
            <div className="sidebar-menu-preview-card">
              <h4>🍱 Today's Thali Preview</h4>
              <ul className="preview-list">
                <li>3 Chapatis</li>
                <li>Steamed Rice</li>
                <li>Dal Fry & Mix Veg</li>
                <li>Salad & Sweet Dish</li>
              </ul>
              <div className="fresh-indicator">✓ Fresh & Hot</div>
            </div>
          </aside>

        </div>

        {/* BOTTOM CTA ORANGE GRADIENT BANNER */}
        <div className="bottom-conversion-banner">
          <div className="banner-left-visual">
            {/* Tiffin bucket carrier visual decoration */}
            <div className="tiffin-carrier-icon-art">
              <div className="bracket-bar"></div>
              <div className="container-pails">
                <div className="bucket top"></div>
                <div className="bucket mid"></div>
                <div className="bucket bottom"></div>
              </div>
            </div>
          </div>

          <div className="banner-middle-content">
            <h2>Ready To Start Eating Home-Style Meals?</h2>
            <p>Choose your plan and enjoy home-style food delivered fresh to your doorstep daily.</p>
          </div>

          <div className="banner-right-actions">
            <button onClick={handleSubscribeClick} className="btn-banner-subscribe">
              Subscribe Now
            </button>
            <button 
              onClick={() => window.open(`https://wa.me/919999999999?text=Hi%20Sai%20Home%20Kitchen!`)} 
              className="btn-banner-contact"
            >
              Contact Mess
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default MessDetail;
