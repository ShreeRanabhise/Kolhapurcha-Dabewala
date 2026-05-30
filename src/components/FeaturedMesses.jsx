import { Star, MapPin, Users } from 'lucide-react';
import './FeaturedMesses.css';

const messes = [
  {
    id: 1,
    name: "Aai's Kitchen",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    location: "Rajarampuri",
    price: "₹2199",
    time: "45 mins",
    subscribers: "300+",
  },
  {
    id: 2,
    name: "Shivneri Mess",
    image: "https://images.unsplash.com/photo-1589301760014-d929f39ce9de?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    location: "Shahupuri",
    price: "₹2399",
    time: "30 mins",
    subscribers: "450+",
  },
  {
    id: 3,
    name: "Kolhapuri Tadka",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    location: "Tarabai Park",
    price: "₹2599",
    time: "40 mins",
    subscribers: "250+",
  },
  {
    id: 4,
    name: "Gharandaaz Meals",
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    location: "Shivaji University",
    price: "₹2099",
    time: "50 mins",
    subscribers: "500+",
  }
];

const FeaturedMesses = () => {
  return (
    <section id="find-mess" className="featured-section">
      <div className="container">
        <div className="section-header text-center">
          <h2 className="section-title">Featured Mess</h2>
          <p className="section-subtitle">Discover the most loved and highly rated mess services in your area.</p>
        </div>
        
        <div className="messes-grid">
          {messes.map((mess) => (
            <div key={mess.id} className="mess-card">
              <div className="mess-image-wrapper">
                <img 
                  src={mess.image} 
                  alt={mess.name} 
                  className="mess-image" 
                />
                <div className="mess-rating">
                  <Star fill="#FFB800" stroke="none" size={14} />
                  <span>{mess.rating}</span>
                </div>
              </div>
              
              <div className="mess-details">
                <h3 className="mess-name">{mess.name}</h3>
                
                <div className="mess-meta">
                  <div className="meta-item">
                    <MapPin size={14} className="text-primary" />
                    <span>{mess.location}</span>
                  </div>
                  <div className="meta-item">
                    <Users size={14} className="text-secondary" />
                    <span>{mess.subscribers}</span>
                  </div>
                </div>
                
                <div className="mess-footer">
                  <div>
                    <span className="price-label">Starts at</span>
                    <div className="price-value">{mess.price}<span className="price-period">/mo</span></div>
                  </div>
                  <button className="btn btn-primary btn-sm">View Menu</button>
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
