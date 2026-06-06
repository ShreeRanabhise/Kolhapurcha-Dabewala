import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Star, CheckCircle2, SlidersHorizontal, 
  RotateCcw, HelpCircle, UserPlus, Headphones, X, ChevronDown, Calendar, Bike, Heart
} from 'lucide-react';
import { db } from '../config/firebase';
import { collection, onSnapshot } from 'firebase/firestore';
import './FindMess.css';

// Load messes dynamically from local storage approvedVendors
const FindMess = () => {
  const navigate = useNavigate();
  const [allMesses, setAllMesses] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'vendors'), (snapshot) => {
      const activeVendors = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).filter(v => v.status === 'Active');
      const mapped = activeVendors.map(vendor => ({
        id: vendor.id || Date.now() + Math.random(),
        name: vendor.name || vendor.messName || "Approved Mess",
        area: vendor.area || "Shahupuri",
        price: vendor.price || 2100,
        rating: vendor.rating || 4.7,
        isVeg: vendor.isVeg !== undefined ? vendor.isVeg : true,
        isPremium: vendor.isPremium || vendor.selectedPlan?.includes('999') || vendor.plan?.includes('999') || false,
        nearArea: vendor.nearArea || "Near College",
        description: vendor.description || "Fresh home-style meals prepared daily with love and hygiene.",
        image: vendor.image || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
      }));
      setAllMesses(mapped);
    });
    return () => unsub();
  }, []);


  // Filters State setup - default checked filters set to match screenshot
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [isVegChecked, setIsVegChecked] = useState(true);
  const [isNonVegChecked, setIsNonVegChecked] = useState(false);


  // Proximity delivery area
  const [nearCollege, setNearCollege] = useState(false);
  const [nearOffice, setNearOffice] = useState(false);
  const [nearHostel, setNearHostel] = useState(false);

  // Sorting
  const [sortBy, setSortBy] = useState('popularity');
  
  // Top Active filter chip
  const [activeChip, setActiveChip] = useState('All');

  // Favorites state & sync
  const [likedMesses, setLikedMesses] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('likedMesses');
    if (saved) {
      try { setLikedMesses(JSON.parse(saved)); } catch (e) { console.error(e); }
    }

    const handleLikesUpdated = (e) => {
      setLikedMesses(e.detail || []);
    };
    window.addEventListener('favorites-updated', handleLikesUpdated);
    return () => window.removeEventListener('favorites-updated', handleLikesUpdated);
  }, []);

  const isLiked = (id) => likedMesses.some(item => item.id === id);

  const toggleLike = (mess) => {
    let updated;
    const existing = likedMesses.find(item => item.id === mess.id);
    if (existing) {
      updated = likedMesses.filter(item => item.id !== mess.id);
    } else {
      updated = [...likedMesses, { id: mess.id, name: mess.name, area: mess.area, image: mess.image, price: mess.price }];
    }
    setLikedMesses(updated);
    localStorage.setItem('likedMesses', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('favorites-updated', { detail: updated }));
  };

  // Filter Logic
  const getFilteredMesses = () => {
    return allMesses.filter(mess => {
      // 1. Search Query filter (split into terms, matching individual words, ignoring generic 'kolhapur' constraints)
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const terms = query.split(/[\s,]+/).filter(t => t.trim() !== '');
        
        if (terms.length > 0) {
          const matchesAllTerms = terms.every(term => {
            if (term === 'kolhapur') {
              return true; // 'kolhapur' is generic and matches all messes
            }
            return (
              mess.name.toLowerCase().includes(term) ||
              mess.area.toLowerCase().includes(term) ||
              mess.description.toLowerCase().includes(term)
            );
          });
          
          if (!matchesAllTerms) return false;
        }
      }

      // 2. Location select filter
      if (selectedArea !== '') {
        if (mess.area.toLowerCase() !== selectedArea.toLowerCase()) return false;
      }

      // 3. Meal Type check
      if (isVegChecked && !isNonVegChecked && !mess.isVeg) return false;
      if (isNonVegChecked && !isVegChecked && mess.isVeg) return false;
      if (!isVegChecked && !isNonVegChecked) return false; // Show nothing if both unchecked

      // 4. Budget Filter Chip Match
      if (activeChip === 'Budget') {
        const priceVal = mess.price || 2100;
        if (priceVal > 2200) return false;
      }

      // 5. Proximity Area check
      const areaChecked = nearCollege || nearOffice || nearHostel;
      if (areaChecked) {
        let matchesArea = false;
        if (nearCollege && mess.nearArea === "Near College") matchesArea = true;
        if (nearOffice && mess.nearArea === "Near Office") matchesArea = true;
        if (nearHostel && mess.nearArea === "Near Hostel") matchesArea = true;
        if (!matchesArea) return false;
      }

      // 6. Premium Filter Chip Match
      if (activeChip === 'Premium' && !mess.isPremium) return false;

      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      // Default: popularity or rating order
      return b.rating - a.rating;
    });
  };

  const filteredMesses = getFilteredMesses();

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedArea('');
    setIsVegChecked(true);
    setIsNonVegChecked(false);
    setNearCollege(false);
    setNearOffice(false);
    setNearHostel(false);
    setActiveChip('All');
    setSortBy('popularity');
  };

  const handleChipClick = (chip) => {
    setActiveChip(chip);
    if (chip === 'All') {
      handleResetFilters();
    } else if (chip === 'Veg') {
      setIsVegChecked(true);
      setIsNonVegChecked(false);
    } else if (chip === 'Non-Veg') {
      setIsVegChecked(false);
      setIsNonVegChecked(true);
    } else if (chip === 'Budget') {
      setIsVegChecked(true);
    } else if (chip === 'Premium') {
      // Handled dynamically via activeChip === 'Premium' inside getFilteredMesses
    }
  };

  const triggerSubscribe = (mess) => {
    navigate('/checkout', { 
      state: {
        vendorName: mess.name,
        vendorId: mess.id,
        planName: mess.isPremium ? "Premium Plan" : "Standard Plan",
        planType: "monthly",
        price: mess.price || 2499
      }
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="find-mess-page-v2">
      <div className="container find-mess-container">
        
        {/* TOP PANEL: Page Header & Title + Search Bar */}
        <div className="fm-top-header-panel">
          <div className="header-left-titles">
            <h1 className="fm-main-title">Find Your Perfect Mess</h1>
            <p className="fm-subtitle">Discover verified home-style mess services near you.</p>
          </div>
          
          <div className="header-right-search">
            <div className="search-input-wrapper">
              <Search className="search-lens-icon" size={18} />
              <input 
                type="text" 
                placeholder="Search area, mess name, college, or location..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="fm-search-bar-input"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="search-clear-btn">
                  <X size={16} />
                </button>
              )}
            </div>
            <button className="fm-filter-icon-btn" title="Toggle Sidebar Filters">
              <SlidersHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* TOP FILTER CHIPS ROW */}
        <div className="fm-filter-chips-row">
          <button 
            onClick={() => handleChipClick('All')}
            className={`chip-btn ${activeChip === 'All' ? 'active' : ''}`}
          >
            <span className="chip-icon-grid">⚃</span> All
          </button>
          <button 
            onClick={() => handleChipClick('Veg')}
            className={`chip-btn ${activeChip === 'Veg' ? 'active' : ''}`}
          >
            <span className="leaf-dot green">🌱</span> Veg
          </button>
          <button 
            onClick={() => handleChipClick('Non-Veg')}
            className={`chip-btn ${activeChip === 'Non-Veg' ? 'active' : ''}`}
          >
            <span className="meat-dot red">🍖</span> Non-Veg
          </button>
          <button 
            onClick={() => handleChipClick('Budget')}
            className={`chip-btn ${activeChip === 'Budget' ? 'active' : ''}`}
          >
            <span className="wallet-dot purple">💳</span> Budget
          </button>
          <button 
            onClick={() => handleChipClick('Premium')}
            className={`chip-btn ${activeChip === 'Premium' ? 'active' : ''}`}
          >
            <span className="crown-dot gold">👑</span> Premium
          </button>
          <button 
            onClick={() => handleChipClick('Monthly')}
            className={`chip-btn ${activeChip === 'Monthly' ? 'active' : ''}`}
          >
            <span className="calendar-dot blue">📅</span> Monthly
          </button>
          <button 
            onClick={() => handleChipClick('Daily Tiffin')}
            className={`chip-btn ${activeChip === 'Daily Tiffin' ? 'active' : ''}`}
          >
            <span className="lunchbox-dot orange">🍱</span> Daily Tiffin
          </button>
        </div>

        {/* MAIN BODY: Grid Layout */}
        <div className="fm-main-split-layout">
          
          {/* SIDEBAR: Filters */}
          <aside className="fm-left-sidebar">
            <div className="sidebar-header-row">
              <h3>Filter By</h3>
              <button onClick={handleResetFilters} className="clear-all-link">Clear All</button>
            </div>

            {/* LOCATION FILTER */}
            <div className="filter-group">
              <label className="filter-label">
                <MapPin size={16} className="sidebar-icon" /> Location
              </label>
              <div className="select-dropdown-wrapper">
                <select 
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="dropdown-area-select"
                >
                  <option value="">Select Area</option>
                  <option value="Shahupuri">Shahupuri</option>
                  <option value="Tarabai Park">Tarabai Park</option>
                  <option value="Rajarampuri">Rajarampuri</option>
                  <option value="C Ward">C Ward</option>
                  <option value="New Shahupuri">New Shahupuri</option>
                  <option value="Bhandiwade">Bhandiwade</option>
                </select>
                <ChevronDown className="dropdown-arrow-icon" size={16} />
              </div>
            </div>

            {/* MEAL TYPE FILTER */}
            <div className="filter-group">
              <label className="filter-label">
                <span className="sidebar-label-icon">🍽</span> Meal Type
              </label>
              <div className="checkbox-options-list">
                <label className="custom-checkbox-row">
                  <input 
                    type="checkbox" 
                    checked={isVegChecked}
                    onChange={(e) => {
                      const val = e.target.checked;
                      setIsVegChecked(val);
                      if (val) setIsNonVegChecked(false);
                    }}
                  />
                  <span className="checkbox-design veg"></span>
                  <span className="label-text">Veg</span>
                </label>
                <label className="custom-checkbox-row">
                  <input 
                    type="checkbox" 
                    checked={isNonVegChecked}
                    onChange={(e) => {
                      const val = e.target.checked;
                      setIsNonVegChecked(val);
                      if (val) setIsVegChecked(false);
                    }}
                  />
                  <span className="checkbox-design nonveg"></span>
                  <span className="label-text">Non-Veg</span>
                </label>
              </div>
            </div>

            {/* DELIVERY AREA PROXIMITY */}
            <div className="filter-group">
              <label className="filter-label">
                <span className="sidebar-label-icon">🚚</span> Delivery Area
              </label>
              <div className="checkbox-options-list">
                <label className="custom-checkbox-row">
                  <input 
                    type="checkbox" 
                    checked={nearCollege}
                    onChange={(e) => {
                      const val = e.target.checked;
                      setNearCollege(val);
                      if (val) {
                        setNearOffice(false);
                        setNearHostel(false);
                      }
                    }}
                  />
                  <span className="checkbox-design"></span>
                  <span className="label-text">Near College</span>
                </label>
                <label className="custom-checkbox-row">
                  <input 
                    type="checkbox" 
                    checked={nearOffice}
                    onChange={(e) => {
                      const val = e.target.checked;
                      setNearOffice(val);
                      if (val) {
                        setNearCollege(false);
                        setNearHostel(false);
                      }
                    }}
                  />
                  <span className="checkbox-design"></span>
                  <span className="label-text">Near Office</span>
                </label>
                <label className="custom-checkbox-row">
                  <input 
                    type="checkbox" 
                    checked={nearHostel}
                    onChange={(e) => {
                      const val = e.target.checked;
                      setNearHostel(val);
                      if (val) {
                        setNearCollege(false);
                        setNearOffice(false);
                      }
                    }}
                  />
                  <span className="checkbox-design"></span>
                  <span className="label-text">Near Hostel</span>
                </label>
              </div>
            </div>

            {/* RESET BUTTON */}
            <button onClick={handleResetFilters} className="sidebar-reset-btn">
              <RotateCcw size={15} /> Reset Filters
            </button>
          </aside>

          {/* RIGHT COLUMN: Directory Grid */}
          <main className="fm-right-directory">
            
            {/* Grid Header Panel */}
            <div className="directory-header-row">
              <h2 className="results-count-text">
                {filteredMesses.length === 6 ? '25+' : filteredMesses.length} Mess Services Found
              </h2>
              
              <div className="sort-select-wrapper">
                <span className="sort-label">Sort By:</span>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="directory-sort-select"
                >
                  <option value="popularity">Popularity</option>
                  <option value="rating">Rating</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="sort-arrow-icon" size={14} />
              </div>
            </div>

            {/* Empty State visual */}
            {filteredMesses.length === 0 ? (
              <div className="fm-empty-state-card">
                <div className="empty-plate-icon">
                  <svg width="120" height="120" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="40" stroke="#E2E8F0" strokeWidth="4" />
                    <circle cx="50" cy="50" r="30" stroke="#F1F5F9" strokeWidth="2" />
                    <line x1="32" y1="50" x2="68" y2="50" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />
                    <path d="M50 25C40 25 35 35 35 45H65C65 35 60 25 50 25Z" fill="#E2E8F0" opacity="0.4" />
                  </svg>
                </div>
                <h3>No mess found.</h3>
                <p>Try adjusting filters or reset the filter settings to show all partners.</p>
                <button onClick={handleResetFilters} className="empty-state-reset-btn">
                  Reset All Filters
                </button>
              </div>
            ) : (
              /* Mess Cards 3-column Desktop Grid */
              <div className="messes-cards-grid">
                {filteredMesses.map((mess) => (
                  <div key={mess.id} className="mess-thali-card">
                    
                    {/* Thali Image Wrapper */}
                    <div className="card-image-wrap">
                      <img src={mess.image} alt={mess.name} className="card-food-img" />
                      
                      {/* Floating badging */}
                      <div className="card-img-badge rating-pill">
                        <Star size={12} fill="#FFFFFF" stroke="none" />
                        <span>{mess.rating}</span>
                      </div>
                      <div className="card-img-badge verified-pill">
                        <CheckCircle2 size={11} fill="#FFFFFF" stroke="none" />
                        <span>Verified</span>
                      </div>
                      {mess.isPremium && (
                        <div className="card-img-badge premium-pill">
                          <span>👑 Premium</span>
                        </div>
                      )}

                      {/* Floating Heart button for likes */}
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLike(mess);
                        }} 
                        className={`card-like-btn ${isLiked(mess.id) ? 'liked' : ''}`}
                        title={isLiked(mess.id) ? "Remove from Favorites" : "Add to Favorites"}
                      >
                        <Heart size={16} fill={isLiked(mess.id) ? "#FF6B00" : "none"} stroke={isLiked(mess.id) ? "#FF6B00" : "#FFFFFF"} />
                      </button>
                    </div>

                    {/* Content Details Block */}
                    <div className="card-body-details">
                      <div className="card-title-price-row">
                        <h3 className="card-mess-name">{mess.name}</h3>
                        <span className="card-price-value">
                          ₹{mess.price}<span className="price-term">/month</span>
                        </span>
                      </div>

                      <p className="card-location-row">
                        <span className="location-pin-marker">📍</span> {mess.area}, Kolhapur
                      </p>

                      <p className="card-short-desc">{mess.description}</p>

                      {/* Pill features list */}
                      <div className="card-features-tag-list">
                        {mess.isVeg ? (
                          <span className="feature-tag-item veg-tag" style={{ backgroundColor: '#ECFDF5', color: '#10B981', border: '1px solid rgba(16, 185, 129, 0.15)' }}>
                            <span className="tag-emoji">🌱</span> Pure Veg
                          </span>
                        ) : (
                          <span className="feature-tag-item nonveg-tag" style={{ backgroundColor: '#FEF2F2', color: '#DC2626', border: '1px solid rgba(220, 38, 38, 0.15)' }}>
                            <span className="tag-emoji">🍖</span> Veg & Non-Veg
                          </span>
                        )}
                        <span className="feature-tag-item">
                          <span className="tag-emoji">🚚</span> Daily Delivery
                        </span>
                        <span 
                          className="feature-tag-item frequency-tag"
                          style={{
                            backgroundColor: mess.price < 2400 ? 'rgba(255, 107, 0, 0.06)' : 'rgba(34, 197, 94, 0.06)',
                            color: mess.price < 2400 ? '#FF6B00' : '#16A34A',
                            border: mess.price < 2400 ? '1px solid rgba(255, 107, 0, 0.15)' : '1px solid rgba(34, 197, 94, 0.15)'
                          }}
                        >
                          <span className="tag-emoji">⏰</span> {mess.price < 2400 ? 'Lunch or Dinner Only' : 'Lunch + Dinner (2 Times)'}
                        </span>
                      </div>

                      {/* Bottom button block */}
                      <div className="card-action-row">
                        <button 
                          onClick={() => navigate(`/find-mess/${mess.name.toLowerCase().replace(/\s+/g, '-')}`)} 
                          className="btn-card-details-outline"
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => triggerSubscribe(mess)}
                          className="btn-card-subscribe-solid"
                        >
                          Subscribe Now
                        </button>
                      </div>

                    </div>

                  </div>
                ))}
              </div>
            )}

          </main>
        </div>

        {/* BOTTOM CTA: Support Help block */}
        <div className="fm-bottom-cta-banner">
          <div className="banner-left-graphics">
            {/* Stainless steel tiffin container stack vector representation */}
            <div className="tiffin-vector-art">
              <div className="tiffin-handle"></div>
              <div className="tiffin-clips"></div>
              <div className="tiffin-tier top"></div>
              <div className="tiffin-tier mid"></div>
              <div className="tiffin-tier bottom"></div>
              <div className="tiffin-bowl small left"></div>
              <div className="tiffin-bowl small right"></div>
            </div>
          </div>

          <div className="banner-center-text">
            <h3>Can't Find a Suitable Mess?</h3>
            <p>Help us connect you with the perfect mess service.</p>
          </div>

          <div className="banner-right-buttons">
            <button 
              onClick={() => navigate('/become-partner')} 
              className="btn-banner-partner"
            >
              <UserPlus size={16} /> Become a Partner
            </button>
            <button 
              onClick={() => navigate('/#footer')}
              className="btn-banner-support"
            >
              <Headphones size={16} /> Contact Support
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FindMess;
