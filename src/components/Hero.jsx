import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Star, Bike, ArrowRight, MapPin, Search } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionRef = useRef(null);

  const popularAreas = [
    'Rajarampuri',
    'Shahupuri',
    'Tarabai Park',
    'Cyber Chowk',
    'Shivaji Udyam Nagar',
    'University Road'
  ];

  const filteredSuggestions = popularAreas.filter(area => 
    area.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionRef.current && !suggestionRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/find-mess?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/find-mess');
    }
  };

  const handleSelectSuggestion = (area) => {
    setSearchQuery(area);
    setShowSuggestions(false);
    navigate(`/find-mess?search=${encodeURIComponent(area)}`);
  };

  return (
    <div className="hero-outer-wrapper">
      {/* Premium glowing background blur points */}
      <div className="hero-glow hero-glow-1"></div>
      <div className="hero-glow hero-glow-2"></div>
      
      <section className="hero-section" id="home">
        <div className="container hero-container">
          <div className="hero-split-grid">
            
            {/* LEFT PANEL: Branding & Text Info */}
            <div className="hero-left animate-fade-in-up">
              {/* Small Trust Badge */}
              <div className="trust-badge-capsule">
                <span className="badge-emoji">🍱</span>
                <span className="badge-text">Trusted by 1200+ Students & Professionals</span>
              </div>
              
              {/* Catchy handwritten tag */}
              <span className="hero-handwritten-tag">Purely Home-Cooked, Delivered With Love ❤️</span>

              {/* Large Marathi Headline */}
              <h1 className="hero-marathi-headline">
                घरच्या जेवणाची चव,<br />
                आता <span className="hero-gradient-orange">तुमच्या दारात!</span>
              </h1>
              
              {/* English Subheadline */}
              <p className="hero-subheadline-text">
                Discover authentic home-style meals from trusted mess providers across Kolhapur.
                <span className="subheadline-highlight"> Fresh food. Affordable plans. Daily delivery.</span>
              </p>
              
              {/* Zomato-style Interactive Search Input */}
              <div className="hero-search-wrapper" ref={suggestionRef}>
                <form onSubmit={handleSearchSubmit} className="hero-search-form">
                  <div className="search-input-field-wrap">
                    <MapPin className="search-icon-pin" size={18} />
                    <input 
                      type="text" 
                      placeholder="Enter your college, hostel or area..." 
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setShowSuggestions(true);
                      }}
                      onFocus={() => setShowSuggestions(true)}
                    />
                  </div>
                  <button type="submit" className="btn-hero-search">
                    <Search size={16} />
                    <span>Search</span>
                  </button>
                </form>

                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="hero-search-suggestions-dropdown">
                    <div className="dropdown-section-title">POPULAR DELIVERY LOCATIONS</div>
                    {filteredSuggestions.map((area, idx) => (
                      <div 
                        key={idx} 
                        className="suggestion-row"
                        onClick={() => handleSelectSuggestion(area)}
                      >
                        <MapPin size={14} className="icon-orange" />
                        <span>{area}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Secondary CTA options / partners */}
              <div className="hero-partner-links-row">
                <span>Are you a mess owner?</span>
                <button onClick={() => navigate('/become-partner')} className="hero-link-partner">
                  Partner with us <ArrowRight size={12} />
                </button>
              </div>
              
              {/* Inline Ratings and Metrics below CTAs */}
              <div className="hero-inline-metrics">
                <div className="metric-stars-group">
                  <div className="stars-row">
                    <Star size={16} fill="#FF6B00" stroke="#FF6B00" />
                    <Star size={16} fill="#FF6B00" stroke="#FF6B00" />
                    <Star size={16} fill="#FF6B00" stroke="#FF6B00" />
                    <Star size={16} fill="#FF6B00" stroke="#FF6B00" />
                    <Star size={16} fill="#FF6B00" stroke="#FF6B00" />
                  </div>
                  <span className="rating-value">4.8 Rating</span>
                </div>
                <div className="metric-divider"></div>
                <div className="metric-text-group">
                  <span className="metric-number">1200+</span>
                  <span className="metric-label">Subscribers</span>
                </div>
                <div className="metric-divider"></div>
                <div className="metric-text-group">
                  <span className="metric-number">50+</span>
                  <span className="metric-label">Mess Partners</span>
                </div>
                <div className="metric-divider"></div>
                <div className="metric-text-group">
                  <span className="metric-number">99%</span>
                  <span className="metric-label">On-Time Delivery</span>
                </div>
              </div>
            </div>
            
            {/* RIGHT PANEL: Aaji Image & Floating Cards */}
            <div className="hero-right">
              <div className="hero-image-wrapper animate-fade-in">
                {/* Visual Glow behind grandma image */}
                <div className="image-backlight"></div>
                
                <img 
                  src="/indian_mom_tiffin_hero.png" 
                  alt="Smiling Indian Grandmother holding freshly cooked tiffin box" 
                  className="main-hero-img"
                />
                
                {/* Floating Card 1: Today's Menu */}
                <div className="floating-card card-todays-menu glass-card float-anim-1">
                  <div className="card-header-row">
                    <span className="card-emoji">🍱</span>
                    <h4>Today's Menu</h4>
                  </div>
                  <ul className="menu-list">
                    <li>3 Chapati</li>
                    <li>Dal Fry</li>
                    <li>Mix Veg</li>
                    <li>Rice</li>
                  </ul>
                </div>
                
                {/* Floating Card 2: Rating */}
                <div className="floating-card card-stars glass-card float-anim-2">
                  <div className="star-rating-pill">
                    <Star size={14} fill="#FF6B00" stroke="#FF6B00" />
                    <span>4.8 Rating</span>
                  </div>
                  <p>Loved by students</p>
                </div>
                
                {/* Floating Card 3: Delivered Today */}
                <div className="floating-card card-delivery glass-card float-anim-3">
                  <div className="delivery-header">
                    <Bike size={16} className="truck-icon" />
                    <h4>Delivered Today</h4>
                  </div>
                  <p className="bold-stat">120+ Orders Completed</p>
                  <div className="live-badge-row">
                    <span className="pulse-dot"></span>
                    <span>Live Tracking</span>
                  </div>
                </div>
                
                {/* Floating Card 4: Verified Mess */}
                <div className="floating-card card-verified glass-card float-anim-4">
                  <div className="verified-header">
                    <ShieldCheck size={18} className="verified-icon" />
                    <div className="verified-text">
                      <h4>Verified Mess</h4>
                      <p>Quality Checked</p>
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* STATISTICS BAR BELOW HERO */}
      <div className="statistics-bar-wrapper">
        <div className="container">
          <div className="statistics-grid animate-fade-in-delayed">
            <div className="stat-col">
              <span className="stat-count">50+</span>
              <span className="stat-label">Verified Mess Partners</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-col">
              <span className="stat-count">1200+</span>
              <span className="stat-label">Happy Subscribers</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-col">
              <span className="stat-count">99%</span>
              <span className="stat-label">Delivery Success</span>
            </div>
            <div className="stat-divider"></div>
            <div className="stat-col">
              <span className="stat-count">4.8★</span>
              <span className="stat-label">Average Rating</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
