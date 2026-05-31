import React, { useState } from 'react';
import { MapPin, Search, Utensils, ChevronDown, SlidersHorizontal, Heart, Users, Star, Truck, ShieldCheck, ChevronRight } from 'lucide-react';
import './FindMess.css';
import { Link } from 'react-router-dom';

// Data for Messes
const messes = [
  {
    id: 1, name: "Aai's Kitchen", rating: 4.8, reviews: 128, location: 'Rajarampuri', subs: '120+', price: 2199, tags: ['Veg & Non-Veg', 'Free Delivery'],
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=400&q=80',
    badge: 'Student Favourite', badgeColor: 'green'
  },
  {
    id: 2, name: 'Sai Home Food', rating: 4.7, reviews: 96, location: 'Tarabai Park', subs: '95+', price: 2299, tags: ['Veg & Non-Veg', 'Free Delivery'],
    img: 'https://images.unsplash.com/photo-1589301760014-d929f39ce9de?auto=format&fit=crop&w=400&q=80',
    badge: 'Most Popular', badgeColor: 'orange'
  },
  {
    id: 3, name: 'Shivaji Tiffin Center', rating: 4.6, reviews: 77, location: 'Near SUK', subs: '85+', price: 2099, tags: ['Veg', 'Free Delivery'],
    img: 'https://images.unsplash.com/photo-1626776876729-abcb4995eb87?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 4, name: 'Suvarna Mess', rating: 4.5, reviews: 64, location: 'Shahupuri', subs: '70+', price: 1999, tags: ['Veg & Non-Veg', 'Free Delivery'],
    img: 'https://images.unsplash.com/photo-1565557612630-f9bd88c1baee?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 5, name: 'Maa Tiffin Service', rating: 4.4, reviews: 52, location: 'New Palace Road', subs: '60+', price: 2199, tags: ['Veg', 'Free Delivery'],
    img: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 6, name: 'Pooja Home Food', rating: 4.3, reviews: 38, location: 'Kolhapur MIDC', subs: '45+', price: 2299, tags: ['Veg & Non-Veg', 'Free Delivery'],
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80'
  }
];

const filters = ['All', 'Veg', 'Non-Veg', 'Budget Friendly', 'Premium', 'Student Favourite', 'Lunch Available', 'Dinner Available', 'Free Delivery'];

const FindMess = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <div className="find-mess-page">
      
      {/* 1. Page Header & Search Section */}
      <section className="fm-hero-section">
        <div className="container">
          <div className="fm-breadcrumb">
            <Link to="/" tabIndex={1}>Home</Link> <ChevronRight size={14} /> <span>Find Mess</span>
          </div>
          
          <h1 className="fm-title">Find Your <span className="text-maroon">Perfect Daily Meal</span></h1>
          <p className="fm-subtitle">Browse trusted mess providers in Kolhapur and subscribe to fresh home-cooked meals.</p>
          
          <div className="fm-search-container">
            <div className="search-bar-wrapper">
              
              <div className="search-input-group location-group">
                <MapPin size={20} className="search-icon" />
                <select className="search-select" tabIndex={2}>
                  <option>Rajarampuri</option>
                  <option>Tarabai Park</option>
                  <option>Shahupuri</option>
                  <option>Kolhapur MIDC</option>
                </select>
              </div>
              
              <div className="search-divider"></div>
              
              <div className="search-input-group keyword-group">
                <Search size={20} className="search-icon" />
                <input type="text" placeholder="Search mess name..." className="search-input" tabIndex={3} />
              </div>
              
              <div className="search-divider"></div>
              
              <div className="search-input-group food-type-group">
                <Utensils size={20} className="search-icon" />
                <select className="search-select" tabIndex={4}>
                  <option>Veg & Non-Veg</option>
                  <option>Pure Veg</option>
                  <option>Non-Veg</option>
                </select>
              </div>
              
              <button className="search-btn" tabIndex={5}>Search</button>
            </div>
          </div>
          
          {/* Trust Highlights Hero */}
          <div className="fm-hero-trust">
            <div className="fm-trust-item">
              <div className="fm-trust-icon bg-orange-light"><Users size={24} className="text-orange" /></div>
              <div><strong>1000+</strong><span>Happy Customers</span></div>
            </div>
            <div className="fm-trust-item">
              <div className="fm-trust-icon bg-maroon-light"><ShieldCheck size={24} className="text-maroon" /></div>
              <div><strong>50+</strong><span>Verified Mess Partners</span></div>
            </div>
            <div className="fm-trust-item">
              <div className="fm-trust-icon bg-orange-light"><Truck size={24} className="text-orange" /></div>
              <div><strong>99%</strong><span>On-Time Delivery</span></div>
            </div>
            <div className="fm-trust-item">
              <div className="fm-trust-icon bg-maroon-light"><Star size={24} className="text-maroon" fill="currentColor" /></div>
              <div><strong>4.8</strong><span>Average Rating</span></div>
            </div>
          </div>
          
        </div>
      </section>

      {/* 2. Filter Chips */}
      <section className="fm-filters-section">
        <div className="container fm-filters-container">
          <div className="fm-chips">
            {filters.map((f, i) => (
              <button 
                key={f} 
                className={`fm-chip ${activeFilter === f ? 'active' : ''}`}
                onClick={() => setActiveFilter(f)}
                tabIndex={6 + i}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="fm-more-filters" tabIndex={20}>
            <SlidersHorizontal size={16} /> More Filters
          </button>
        </div>
      </section>

      {/* 3. Main Content Area */}
      <section className="fm-main-content">
        <div className="container fm-content-grid">
          
          {/* Left Column: Mess Listings */}
          <div className="fm-listings">
            <div className="fm-listings-header">
              <h2>Top Rated Messes Near You</h2>
              <div className="fm-sort">
                Sort by: 
                <select className="fm-sort-select" tabIndex={21}>
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Price: Low to High</option>
                </select>
              </div>
            </div>
            
            <div className="fm-mess-grid">
              {messes.map((mess, i) => (
                <div key={mess.id} className="mess-card">
                  <div className="mess-img-wrapper">
                    <img src={mess.img} alt={mess.name} className="mess-img" />
                    {mess.badge && (
                      <span className={`mess-badge bg-${mess.badgeColor}`}>{mess.badge}</span>
                    )}
                    <button className="mess-heart" tabIndex={22 + (i * 3)}><Heart size={20} /></button>
                  </div>
                  
                  <div className="mess-card-body">
                    <div className="mess-title-row">
                      <h3 className="mess-name">{mess.name}</h3>
                      <div className="mess-rating">
                        <Star size={14} fill="currentColor" className="text-orange" /> 
                        {mess.rating} <span>({mess.reviews})</span>
                      </div>
                    </div>
                    
                    <div className="mess-details-row">
                      <div className="mess-location">
                        <MapPin size={14} /> {mess.location}
                        <div className="mess-subs"><Users size={14} /> {mess.subs} Subscribers</div>
                      </div>
                      <div className="mess-price">
                        <span className="price-label">Starting from</span>
                        <div className="price-val">₹{mess.price}<span>/month</span></div>
                      </div>
                    </div>
                    
                    <div className="mess-tags">
                      {mess.tags.map(tag => (
                        <span key={tag} className={tag.includes('Veg') ? 'tag-green' : 'tag-orange'}>{tag}</span>
                      ))}
                    </div>
                    
                    <div className="mess-actions">
                      <button className="btn-outline" tabIndex={23 + (i * 3)}>View Details</button>
                      <button className="btn-maroon" tabIndex={24 + (i * 3)}>Subscribe Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="fm-load-more">
              <button className="btn-outline" tabIndex={100}>Load More Messes <ChevronDown size={18} /></button>
            </div>
          </div>
          
          {/* Right Column: Sidebar */}
          <div className="fm-sidebar">
            
            {/* Today's Menu Preview */}
            <div className="sidebar-widget menu-widget">
              <h3 className="widget-title">Today's Menu Preview</h3>
              
              <div className="menu-time">
                <h4 className="time-title">☀️ Lunch</h4>
                <div className="menu-items-grid">
                  <ul className="menu-list">
                    <li><img src="/icons/veg-mark.png" alt="veg" className="veg-mark" /> Rice</li>
                    <li><img src="/icons/veg-mark.png" alt="veg" className="veg-mark" /> Dal</li>
                    <li><img src="/icons/veg-mark.png" alt="veg" className="veg-mark" /> 2 Chapati</li>
                    <li><img src="/icons/veg-mark.png" alt="veg" className="veg-mark" /> Mix Veg</li>
                    <li><img src="/icons/veg-mark.png" alt="veg" className="veg-mark" /> Salad</li>
                    <li><img src="/icons/veg-mark.png" alt="veg" className="veg-mark" /> Sweet Dish</li>
                  </ul>
                  <img src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80" alt="Lunch thali" className="menu-thali-img" />
                </div>
              </div>
              
              <div className="menu-divider"></div>
              
              <div className="menu-time">
                <h4 className="time-title">🌙 Dinner</h4>
                <div className="menu-items-grid">
                  <ul className="menu-list">
                    <li><img src="/icons/veg-mark.png" alt="veg" className="veg-mark" /> Rice</li>
                    <li><img src="/icons/veg-mark.png" alt="veg" className="veg-mark" /> Dal</li>
                    <li><img src="/icons/veg-mark.png" alt="veg" className="veg-mark" /> Chapati</li>
                    <li><img src="/icons/veg-mark.png" alt="veg" className="veg-mark" /> Paneer Bhaji</li>
                    <li><img src="/icons/veg-mark.png" alt="veg" className="veg-mark" /> Salad</li>
                  </ul>
                  <img src="https://images.unsplash.com/photo-1589301760014-d929f39ce9de?auto=format&fit=crop&w=150&q=80" alt="Dinner thali" className="menu-thali-img" />
                </div>
              </div>
              
              <button className="btn-orange w-full menu-btn" tabIndex={101}>View Full Menu <ChevronRight size={18} /></button>
            </div>
            
            {/* Why Choose Us */}
            <div className="sidebar-widget why-widget">
              <h3 className="widget-title">Why Choose Our Mess Partners?</h3>
              <ul className="why-list">
                <li>
                  <div className="why-icon"><ShieldCheck size={20} className="text-maroon" /></div>
                  <div className="why-text">
                    <strong>Verified & Inspected Kitchens</strong>
                    <span>Every kitchen is verified for hygiene and quality.</span>
                  </div>
                </li>
                <li>
                  <div className="why-icon"><Utensils size={20} className="text-maroon" /></div>
                  <div className="why-text">
                    <strong>Freshly Prepared Daily</strong>
                    <span>Home-cooked meals made with fresh ingredients.</span>
                  </div>
                </li>
                <li>
                  <div className="why-icon"><MapPin size={20} className="text-maroon" /></div>
                  <div className="why-text">
                    <strong>Affordable Monthly Plans</strong>
                    <span>Budget-friendly plans for students and working professionals.</span>
                  </div>
                </li>
                <li>
                  <div className="why-icon"><SlidersHorizontal size={20} className="text-maroon" /></div>
                  <div className="why-text">
                    <strong>Flexible Subscriptions</strong>
                    <span>Pause, change or cancel your plan anytime.</span>
                  </div>
                </li>
              </ul>
              <div className="why-link"><a href="#" tabIndex={102}>Learn more about us <ChevronRight size={14} /></a></div>
            </div>
            
          </div>
        </div>
      </section>
      
      {/* 4. Bottom CTA Section */}
      <section className="fm-cta-section">
        <div className="container">
          <div className="fm-cta-box">
            <div className="fm-cta-content">
              <h2>Ready to start your healthy meal journey?</h2>
              <p>Subscribe to your favorite mess and enjoy homemade meals every day.</p>
              <div className="fm-cta-buttons">
                <button className="btn-maroon" tabIndex={103}>Find Your Mess</button>
                <button className="btn-outline-white" tabIndex={104}>View Plans</button>
              </div>
            </div>
            <img src="https://images.unsplash.com/photo-1626776876729-abcb4995eb87?auto=format&fit=crop&w=400&q=80" alt="Thali" className="fm-cta-img" />
          </div>
          
          {/* Bottom Trust Row */}
          <div className="fm-cta-trust">
            <div className="cta-trust-item">
              <ShieldCheck size={20} className="text-orange" />
              <div><strong>Secure Payments</strong><span>100% Safe & Secure</span></div>
            </div>
            <div className="cta-trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange"><path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/><path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16"/><path d="M16 21v-5h5"/></svg>
              <div><strong>Easy Refunds</strong><span>Hassle-free process</span></div>
            </div>
            <div className="cta-trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
              <div><strong>Pause Anytime</strong><span>Take a break anytime</span></div>
            </div>
            <div className="cta-trust-item">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>
              <div><strong>No Hidden Charges</strong><span>What you see is what you pay</span></div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default FindMess;
