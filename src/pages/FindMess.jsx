import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Star, CheckCircle2, SlidersHorizontal, 
  RotateCcw, HelpCircle, UserPlus, Headphones, X, ChevronDown, Calendar, Bike, Heart
} from 'lucide-react';
import './FindMess.css';

// Mock Database of Verified Mess Partners in Kolhapur matching the screenshot exactly
const MOCK_MESSES = [
  {
    id: 1,
    name: "Shivneri Mess",
    area: "Shahupuri",
    price: 2399,
    rating: 4.5,
    isVeg: true,
    isPremium: true,
    nearArea: "Near Office",
    description: "Fresh home-style meals prepared daily with love and hygiene.",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 2,
    name: "Aai's Kitchen",
    area: "Tarabai Park",
    price: 2199,
    rating: 4.7,
    isVeg: true,
    nearArea: "Near Hostel",
    description: "Tasty, hygienic and balanced home cooked meals.",
    image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 3,
    name: "Gharacha Swad Mess",
    area: "Rajarampuri",
    price: 2099,
    rating: 4.6,
    isVeg: true,
    nearArea: "Near College",
    description: "Pure home-style food with authentic taste and quality.",
    image: "https://images.unsplash.com/photo-1589302168068-964664d93cb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 4,
    name: "Kolhapur Tiffin Service",
    area: "C Ward",
    price: 1999,
    rating: 4.5,
    isVeg: true,
    nearArea: "Near College",
    description: "Affordable and delicious tiffin service for everyone.",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 5,
    name: "Sai Home Kitchen",
    area: "New Shahupuri",
    price: 2499,
    rating: 4.8,
    isVeg: true,
    isPremium: true,
    nearArea: "Near Office",
    description: "Healthy, homely and hygienic meals delivered on time.",
    image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    id: 6,
    name: "Maa Annapurna Mess",
    area: "Bhandiwade",
    price: 2299,
    rating: 4.6,
    isVeg: true,
    nearArea: "Near Hostel",
    description: "Traditional recipes with modern hygiene standards.",
    image: "https://images.unsplash.com/photo-1621979087428-11136877c3ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  }
];

const FindMess = () => {
  const navigate = useNavigate();

  // Filters State setup - default checked filters set to match screenshot
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedArea, setSelectedArea] = useState('');
  const [isVegChecked, setIsVegChecked] = useState(true);
  const [isNonVegChecked, setIsNonVegChecked] = useState(false);
  
  // Budget Per Month Checkboxes
  const [budget15_20, setBudget15_20] = useState(false);
  const [budget20_25, setBudget20_25] = useState(true); // checked by default in screenshot
  const [budget25_30, setBudget25_30] = useState(false);
  const [budget30Plus, setBudget30Plus] = useState(false);

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
    return MOCK_MESSES.filter(mess => {
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

      // 4. Budget Range Check
      const budgetChecked = budget15_20 || budget20_25 || budget25_30 || budget30Plus;
      if (budgetChecked) {
        let matchesBudget = false;
        if (budget15_20 && mess.price >= 1500 && mess.price < 2000) matchesBudget = true;
        if (budget20_25 && mess.price >= 2000 && mess.price < 2500) matchesBudget = true;
        if (budget25_30 && mess.price >= 2500 && mess.price < 3000) matchesBudget = true;
        if (budget30Plus && mess.price >= 3000) matchesBudget = true;
        if (!matchesBudget) return false;
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
    setBudget15_20(false);
    setBudget20_25(false);
    setBudget25_30(false);
    setBudget30Plus(false);
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
      setBudget15_20(true);
      setBudget20_25(true);
      setBudget25_30(false);
      setBudget30Plus(false);
    } else if (chip === 'Premium') {
      // Handled dynamically via activeChip === 'Premium' inside getFilteredMesses
    }
  };

  const triggerSubscribe = (messName) => {
    // Check if header button triggers exist
    const triggerBtn = document.querySelector('.btn-get-started');
    if (triggerBtn) {
      triggerBtn.click();
    }
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

            {/* BUDGET FILTER */}
            <div className="filter-group">
              <label className="filter-label">
                <HelpCircle size={16} className="sidebar-icon" /> Budget (Per Month)
              </label>
              <div className="checkbox-options-list">
                <label className="custom-checkbox-row">
                  <input 
                    type="checkbox" 
                    checked={budget15_20}
                    onChange={(e) => setBudget15_20(e.target.checked)}
                  />
                  <span className="checkbox-design"></span>
                  <span className="label-text">₹1500 - ₹2000</span>
                </label>
                <label className="custom-checkbox-row">
                  <input 
                    type="checkbox" 
                    checked={budget20_25}
                    onChange={(e) => setBudget20_25(e.target.checked)}
                  />
                  <span className="checkbox-design"></span>
                  <span className="label-text">₹2000 - ₹2500</span>
                </label>
                <label className="custom-checkbox-row">
                  <input 
                    type="checkbox" 
                    checked={budget25_30}
                    onChange={(e) => setBudget25_30(e.target.checked)}
                  />
                  <span className="checkbox-design"></span>
                  <span className="label-text">₹2500 - ₹3000</span>
                </label>
                <label className="custom-checkbox-row">
                  <input 
                    type="checkbox" 
                    checked={budget30Plus}
                    onChange={(e) => setBudget30Plus(e.target.checked)}
                  />
                  <span className="checkbox-design"></span>
                  <span className="label-text">₹3000+</span>
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
                        <span className="feature-tag-item">
                          <span className="tag-emoji">🍱</span> Veg Meals
                        </span>
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
                          onClick={() => triggerSubscribe(mess.name)} 
                          className="btn-card-details-outline"
                        >
                          View Details
                        </button>
                        <button 
                          onClick={() => triggerSubscribe(mess.name)}
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
