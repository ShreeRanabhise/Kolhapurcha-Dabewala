import React, { useState } from 'react';
import './MenuPreview.css';

const MenuPreview = () => {
  const [activeTab, setActiveTab] = useState('lunch');

  return (
    <section className="menu-preview-section">
      <div className="container">
        <div className="section-header text-center flex-col">
          <h2 className="section-title">Today's Menu Preview</h2>
          <p className="section-subtitle">Freshly prepared, just like home.</p>
        </div>
        
        <div className="menu-tabs">
          <button 
            className={`tab-btn ${activeTab === 'lunch' ? 'active' : ''}`}
            onClick={() => setActiveTab('lunch')}
          >
            Lunch
          </button>
          <button 
            className={`tab-btn ${activeTab === 'dinner' ? 'active' : ''}`}
            onClick={() => setActiveTab('dinner')}
          >
            Dinner
          </button>
        </div>
        
        <div className="menu-content">
          <div className="menu-image">
            <img 
              src={activeTab === 'lunch' 
                ? "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" 
                : "https://images.unsplash.com/photo-1589301760014-d929f39ce9de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"} 
              alt={`${activeTab} Thali`} 
            />
          </div>
          
          <div className="menu-items glassmorphism">
            <h3 className="menu-title">{activeTab === 'lunch' ? 'Classic Lunch Thali' : 'Comfort Dinner Thali'}</h3>
            <ul className="menu-list">
              <li><span className="emoji">🍚</span> Steam Rice</li>
              <li><span className="emoji">🍲</span> Yellow Dal Tadka</li>
              <li><span className="emoji">🫓</span> 3 Soft Chapatis</li>
              <li><span className="emoji">🥗</span> Fresh Green Salad</li>
              {activeTab === 'lunch' ? (
                <>
                  <li><span className="emoji">🥔</span> Batata Sukhi Bhaji</li>
                  <li><span className="emoji">🌶️</span> Thecha & Pickle</li>
                </>
              ) : (
                <>
                  <li><span className="emoji">🥘</span> Mixed Veg Curry</li>
                  <li><span className="emoji">🍮</span> Gulab Jamun (Sweet)</li>
                </>
              )}
            </ul>
            <button className="btn btn-primary w-full mt-4">View Full Weekly Menu</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;
