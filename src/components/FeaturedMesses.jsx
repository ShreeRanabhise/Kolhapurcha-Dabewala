import React, { useState, useEffect } from 'react';
import { Star, MapPin, Users, Check, Flame, ArrowRight, LayoutGrid, Leaf, Drumstick, Wallet, Crown, ShieldCheck, Clock, Heart } from 'lucide-react';
import './FeaturedMesses.css';

const featuredMess = {
  id: 'featured-1',
  name: "Shivneri Mess",
  location: "Shahupuri, Kolhapur",
  students: "450+",
  rating: 4.9,
  reviewsCount: "450+",
  type: "Pure Veg",
  image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
  menu: ["3 Chapati", "Rice", "Dal Fry", "Mix Veg", "Salad", "Sweet"],
  pricePerDay: 70,
  pricePerMonth: 2100
};

const trendingMesses = [
  {
    id: 1,
    name: "Aai's Kitchen",
    location: "Rajarampuri, Kolhapur",
    students: "300+",
    rating: 4.8,
    type: "Veg",
    price: "₹2199",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    name: "Kolhapuri Tadka",
    location: "Tarabai Park, Kolhapur",
    students: "250+",
    rating: 4.7,
    type: "Non-Veg",
    price: "₹2599",
    image: "https://images.unsplash.com/photo-1628294895950-9805252327bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 3,
    name: "Gharandaaz Meals",
    location: "Shivaji University, Kolhapur",
    students: "500+",
    rating: 4.6,
    type: "Veg",
    price: "₹2099",
    image: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 4,
    name: "Yummy Mess",
    location: "C Ward, Kolhapur",
    students: "200+",
    rating: 4.6,
    type: "Non-Veg",
    price: "₹2499",
    image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
  }
];

const categories = [
  { id: 'all', label: 'All Messes', icon: LayoutGrid },
  { id: 'veg', label: 'Veg', icon: Leaf },
  { id: 'nonveg', label: 'Non-Veg', icon: Drumstick },
  { id: 'budget', label: 'Budget Friendly', icon: Wallet },
  { id: 'premium', label: 'Premium', icon: Crown },
];

const FeaturedMesses = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [allTrending, setAllTrending] = useState([]);
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
      const areaName = mess.location ? mess.location.split(',')[0].trim() : (mess.area || '');
      const priceVal = mess.price ? parseInt(mess.price.toString().replace('₹', '').trim()) : mess.pricePerMonth || 2100;
      updated = [...likedMesses, { id: mess.id, name: mess.name, area: areaName, image: mess.image, price: priceVal }];
    }
    setLikedMesses(updated);
    localStorage.setItem('likedMesses', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('favorites-updated', { detail: updated }));
  };

  useEffect(() => {
    const localApproved = localStorage.getItem('approvedVendors')
      ? JSON.parse(localStorage.getItem('approvedVendors'))
      : [];
    const premiumLocal = localApproved.filter(m => m.isPremium);
    const defaults = trendingMesses.map(m => ({
      ...m,
      isPremium: true
    }));
    setAllTrending([...premiumLocal, ...defaults]);
  }, []);

  // Load rates dynamically (updated by vendor partner inside dashboard)
  const dailyRate = localStorage.getItem('vendorDailyRate') ? parseInt(localStorage.getItem('vendorDailyRate')) : 70;
  const monthlyRate = localStorage.getItem('vendorMonthlyRate') ? parseInt(localStorage.getItem('vendorMonthlyRate')) : 2100;

  const filteredMesses = allTrending.filter(m => {
    if (activeCategory === 'all') return true;
    const typeLabel = m.type || (m.isVeg ? 'Veg' : 'Non-Veg');
    if (activeCategory === 'veg') return typeLabel.toLowerCase().includes('veg');
    if (activeCategory === 'nonveg') return typeLabel.toLowerCase().includes('non-veg');
    if (activeCategory === 'budget') {
      const priceVal = m.price ? parseInt(m.price.toString().replace('₹', '')) : m.pricePerMonth || 2200;
      return priceVal <= 2200;
    }
    if (activeCategory === 'premium') return m.isPremium;
    return true;
  });

  return (
    <section id="find-mess" className="featured-section">
      <div className="container">
        
        {/* Header Section */}
        <div className="section-header text-center flex-col">
          <div className="handpicked-badge">
            <Star size={14} fill="currentColor" />
            <span>HANDPICKED FOR YOU</span>
          </div>
          <h2 className="section-title">Featured <span className="text-orange">Messes</span></h2>
          <p className="section-subtitle">Discover the most loved and highly rated mess services in your area.</p>
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button 
                key={cat.id} 
                className={`filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                <Icon size={16} className={`filter-icon ${cat.id}`} />
                {cat.label}
              </button>
            );
          })}
        </div>
        
        {/* Large Featured Card */}
        <div className="featured-partner-card">
          <div className="featured-image-section">
            <div className="featured-partner-badge" style={{ background: 'linear-gradient(135deg, var(--color-maroon) 0%, var(--color-orange) 100%)', border: '1px solid rgba(255,255,255,0.2)', boxShadow: '0 4px 12px rgba(255, 107, 0, 0.25)', gap: '4px', display: 'flex', alignItems: 'center' }}>
              <Star size={14} fill="#fff" stroke="none" />
              <span>👑 Growth Partner (₹999/mo)</span>
            </div>
            <img src={featuredMess.image} alt={featuredMess.name} className="featured-image" />
            
            <div className="image-overlay-badges">
              <div className="rating-badge glass-badge">
                <Star size={14} fill="#FFB800" stroke="none" />
                <span className="rating-score">{featuredMess.rating}</span>
                <span className="review-count">{featuredMess.reviewsCount} Reviews</span>
              </div>
              <div className="type-badge glass-badge">
                <Leaf size={14} color="#22C55E" />
                {featuredMess.type}
              </div>
            </div>
          </div>

          <div className="featured-content-section">
            <div className="featured-header-info">
              <h3 className="featured-mess-name">{featuredMess.name}</h3>
              <div className="featured-meta">
                <span><MapPin size={16} /> {featuredMess.location}</span>
                <span><Users size={16} /> {featuredMess.students} Active Students</span>
              </div>
            </div>

            <div className="featured-menu-preview">
              <h4 className="menu-heading">Today's Menu</h4>
              <div className="menu-grid">
                {featuredMess.menu.map((item, index) => (
                  <div key={index} className="menu-item">
                    <Check size={16} className="text-orange" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="featured-action-section">
              <div className="featured-pricing">
                <div className="price-per-day">
                  <span className="rupee">₹</span>
                  <span className="amount">{dailyRate}</span>
                  <span className="duration">/day</span>
                </div>
                <div className="price-per-month">
                  ₹{monthlyRate} <span className="duration">/month</span>
                </div>
              </div>
              <div className="featured-buttons">
                <button className="btn-view-menu">
                  <Flame size={16} /> View Menu
                </button>
                <button className="btn-subscribe-now">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trending Section Header */}
        <div className="trending-header">
          <div className="trending-title">
            <Flame size={24} fill="#FF6B00" color="#FF6B00" />
            <h3>Trending This Week</h3>
          </div>
          <button className="btn-view-all-text">
            View All Messes <ArrowRight size={16} />
          </button>
        </div>

        {/* Trending Grid */}
        <div className="trending-grid">
          {filteredMesses.map((mess) => (
            <div key={mess.id} className="trending-card">
              <div className="trending-image-wrapper">
                <img src={mess.image} alt={mess.name} className="trending-image" />
                <div className="card-top-badges" style={{ flexWrap: 'wrap', gap: '4px' }}>
                  <div className="rating-pill">
                    <Star size={12} fill="#FFB800" stroke="none" />
                    <span>{mess.rating}</span>
                  </div>
                  {mess.isPremium && (
                    <div className="premium-pill" style={{ background: 'linear-gradient(135deg, var(--color-maroon) 0%, var(--color-orange) 100%)', color: 'white', padding: '0.15rem 0.5rem', borderRadius: '4px', fontSize: '0.65rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '2px' }}>
                      👑 Growth Partner (₹999)
                    </div>
                  )}
                  <div className={`type-pill ${mess.type === 'Veg' || mess.type === 'Pure Veg' || mess.isVeg === true ? 'veg' : 'non-veg'}`}>
                    {mess.type || (mess.isVeg ? 'Veg' : 'Non-Veg')}
                  </div>
                </div>
                
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
              <div className="trending-content">
                <h4 className="trending-name">{mess.name}</h4>
                <div className="trending-meta">
                  <span><MapPin size={14} /> {mess.location}</span>
                  <span><Users size={14} /> {mess.students} Students</span>
                </div>
                <div className="trending-footer">
                  <div className="trending-price">
                    <span className="price-amount">{mess.price}</span>
                    <span className="price-duration">/month</span>
                  </div>
                  <button className="btn-card-outline">View Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>



      </div>
    </section>
  );
};

export default FeaturedMesses;
