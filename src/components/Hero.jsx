import { motion } from 'framer-motion';
import { MapPin, Search, Star, Truck, ShieldCheck } from 'lucide-react';
import './Hero.css';

const Hero = () => {
  return (
    <section id="home" className="hero-section">
      <div className="container hero-container">
        
        {/* Left Content */}
        <div className="hero-content">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="trust-label"
          >
            <div className="live-dot"></div>
            <span className="emoji">🥘</span> Trusted By 1000+ Food Lovers
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="hero-heading"
          >
            Homemade Food,<br/>
            <span className="text-secondary">Delivered Every Day.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hero-subheading"
          >
            Find trusted local mess providers and subscribe to fresh, hygienic, affordable meals in Kolhapur.
          </motion.p>

          {/* Social Proof Avatars */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="hero-avatars-group"
          >
            <div className="avatars-overlap">
              <img src="https://i.pravatar.cc/100?img=1" alt="User" />
              <img src="https://i.pravatar.cc/100?img=2" alt="User" />
              <img src="https://i.pravatar.cc/100?img=3" alt="User" />
              <img src="https://i.pravatar.cc/100?img=4" alt="User" />
              <div className="avatar-more">+2k</div>
            </div>
            <div className="avatars-text">
              <div className="stars">★★★★★</div>
              <span>from 500+ reviews</span>
            </div>
          </motion.div>
          
          {/* Search Module */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="search-module glassmorphism"
          >
            <div className="search-input-group border-right">
              <MapPin className="icon text-primary" size={20} />
              <select className="search-select">
                <option value="">Select Area in Kolhapur</option>
                <option value="rajarampuri">Rajarampuri</option>
                <option value="shahupuri">Shahupuri</option>
                <option value="shivaji-u">Shivaji University</option>
                <option value="tarabai-park">Tarabai Park</option>
              </select>
            </div>
            <div className="search-input-group flex-1">
              <Search className="icon text-primary" size={20} />
              <input type="text" placeholder="Search for mess..." className="search-input" />
            </div>
            <button className="btn btn-primary search-btn">Find Meals</button>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hero-actions mt-4"
          >
            <div className="tick-item"><ShieldCheck size={18} className="text-secondary"/> Home-Cooked Food</div>
            <div className="tick-item"><ShieldCheck size={18} className="text-secondary"/> Verified Messes</div>
          </motion.div>
        </div>
        
        {/* Right Image */}
        <div className="hero-image-wrapper">
          <div className="hero-image-glow"></div>
          
          <motion.img 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Delicious Indian Thali" 
            className="hero-img"
          />
          
          {/* Circular Text Badge */}
          <motion.div 
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="circular-badge"
          >
            <svg viewBox="0 0 100 100" width="120" height="120">
              <defs>
                <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
              </defs>
              <text fontSize="11" fontWeight="bold" letterSpacing="2" fill="#6B0F1A">
                <textPath href="#circle">
                  • 100% FRESH • HOMEMADE DAILY
                </textPath>
              </text>
            </svg>
          </motion.div>
          
          {/* Continuous Floating Cards */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0, y: [0, -12, 0] }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.6 },
              x: { duration: 0.6, delay: 0.6 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            className="floating-card card-rating glassmorphism"
          >
            <div className="flex items-center gap-2">
              <Star fill="#FFB800" stroke="none" size={20} />
              <div className="font-bold">4.8 Rating</div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.8 },
              x: { duration: 0.6, delay: 0.8 },
              y: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
            }}
            className="floating-card card-delivery glassmorphism"
          >
            <div className="flex items-center gap-2">
              <div className="icon-circle bg-orange">
                <Truck size={16} color="white" />
              </div>
              <div className="font-bold">Daily Delivery</div>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: [0, -8, 0] }}
            transition={{ 
              opacity: { duration: 0.6, delay: 1 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }
            }}
            className="floating-card card-verified glassmorphism"
          >
            <div className="flex items-center gap-2">
              <div className="icon-circle bg-maroon">
                <ShieldCheck size={16} color="white" />
              </div>
              <div className="font-bold">Verified Mess</div>
            </div>
          </motion.div>
        </div>
        
      </div>
    </section>
  );
};

export default Hero;
