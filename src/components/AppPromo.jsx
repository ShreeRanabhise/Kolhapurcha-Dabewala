import React, { useState } from 'react';
import { CheckCircle, Smartphone, ArrowRight, Apple, Play, Sparkles, Loader, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './AppPromo.css';

const appFeatures = [
  "Live track your delivery boy",
  "Pause or resume meals in 1-click",
  "Zero-fee mess switching",
  "Wallet cashouts & cashbacks"
];

const AppPromo = () => {
  const [phone, setPhone] = useState('');
  const [status, setStatus] = useState('idle'); // 'idle', 'sending', 'success'

  const handleSendLink = (e) => {
    e.preventDefault();
    if (!phone || phone.replace(/\D/g, '').length !== 10) {
      alert('Please enter a valid 10-digit mobile number.');
      return;
    }
    setStatus('sending');
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setPhone('');
      }, 5000);
    }, 1500);
  };

  const handlePhoneChange = (e) => {
    const val = e.target.value.replace(/\D/g, '');
    if (val.length <= 10) setPhone(val);
  };

  return (
    <section className="app-promo-section">
      <div className="container">
        <div className="app-promo-wrapper glassmorphism-dark">
          {/* Background decorative glows */}
          <div className="promo-bg-glow glow-1"></div>
          <div className="promo-bg-glow glow-2"></div>
          
          {/* Left Content */}
          <div className="app-promo-content">
            <div className="promo-badge">
              <Sparkles size={14} className="text-secondary animate-pulse" /> <span>Kolhapur's No. 1 Food App</span>
            </div>
            
            <h2 className="promo-title">
              Manage Your Daily Meals <br />
              <span className="text-gradient">Right From Your Pocket</span>
            </h2>
            
            <p className="promo-desc">
              Get the official mobile app to customize your tiffin calendars, swap between top-rated local mess partners instantly, and track live deliveries directly to your hostel, college, or office.
            </p>
            
            <div className="promo-trust-bar">
              <span className="trust-pill">★ 4.9 App Rating</span>
              <span className="trust-divider">|</span>
              <span className="trust-pill">50K+ Downloads</span>
              <span className="trust-divider">|</span>
              <span className="trust-pill">100% Ad-Free</span>
            </div>
            
            <ul className="promo-features">
              {appFeatures.map((feature, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <CheckCircle size={18} className="text-orange" />
                  <span>{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* Interactive SMS Link Box */}
            <div className="sms-link-box glassmorphism">
              <span className="sms-label">Enter phone number to receive the link via SMS</span>
              <form onSubmit={handleSendLink} className="sms-input-group">
                <div className="country-code">+91</div>
                <input 
                  type="tel" 
                  placeholder="Enter 10-digit phone number" 
                  value={phone}
                  onChange={handlePhoneChange}
                  disabled={status === 'sending' || status === 'success'}
                  maxLength={10}
                  className="sms-input"
                />
                <button 
                  type="submit" 
                  className={`btn share-link-btn ${status === 'success' ? 'btn-success' : 'btn-primary'}`}
                  disabled={status === 'sending' || phone.length !== 10}
                >
                  {status === 'idle' && (
                    <>Send App Link <ArrowRight size={16} /></>
                  )}
                  {status === 'sending' && (
                    <><Loader className="animate-spin" size={16} /> Sending...</>
                  )}
                  {status === 'success' && (
                    <><Check size={16} /> Link Sent!</>
                  )}
                </button>
              </form>
              
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div 
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="sms-success-msg"
                  >
                    🎉 SMS sent! Check your inbox for the direct download link.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Store Badges */}
            <div className="store-badges">
              <motion.a 
                href="#" 
                className="store-btn text-white"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Apple size={24} />
                <div className="store-text">
                  <span>Download on the</span>
                  <strong>App Store</strong>
                </div>
              </motion.a>
              <motion.a 
                href="#" 
                className="store-btn text-white"
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Play size={22} fill="white" />
                <div className="store-text">
                  <span>GET IT ON</span>
                  <strong>Google Play</strong>
                </div>
              </motion.a>
            </div>
          </div>
          
          {/* Right Side: layered 3D-styled iPhone Mockup */}
          <div className="app-promo-image-container">
            <motion.div 
              className="iphone-mockup-wrapper"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              {/* Glowing ring backdrop */}
              <div className="mockup-ring-glow"></div>
              
              {/* iPhone Hardware Container */}
              <div className="iphone-hardware">
                <div className="iphone-speaker"></div>
                <div className="iphone-camera-notch"></div>
                <div className="iphone-screen">
                  {/* APP MOCK UI */}
                  <div className="mock-app-header">
                    <div className="logo-text">KD</div>
                    <span className="mock-user-phone">Hi, Prathamesh</span>
                  </div>
                  
                  <div className="mock-app-body">
                    {/* Live delivery status widget */}
                    <div className="mock-app-card delivery-track-card">
                      <div className="card-top">
                        <span className="live-pill animate-pulse">LIVE TRACKING</span>
                        <span className="time-text">12:35 PM</span>
                      </div>
                      <h4>Your Tiffin is on the way!</h4>
                      <p>Delivery Agent Suhas is 200m away.</p>
                      <div className="mock-progress-bar">
                        <div className="progress-fill" style={{ width: '85%' }}></div>
                        <div className="progress-bike">🚴</div>
                      </div>
                    </div>

                    {/* Mini Calendar Scheduler */}
                    <div className="mock-app-card mini-calendar-card">
                      <h5>Pause / Resume Delivery</h5>
                      <div className="mock-cal-grid">
                        <span className="mock-day past">1</span>
                        <span className="mock-day past">2</span>
                        <span className="mock-day past">3</span>
                        <span className="mock-day delivered">4</span>
                        <span className="mock-day active-del">5</span>
                        <span className="mock-day paused-del">6</span>
                        <span className="mock-day active-del">7</span>
                      </div>
                      <span className="cal-subtext">*Tap date to pause. Refund goes to wallet.</span>
                    </div>

                    {/* Wallet card widget */}
                    <div className="mock-app-card mini-wallet-card">
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span>Dabewala Wallet</span>
                        <strong className="wallet-sum">₹380</strong>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating Badge 1: Delivery status */}
              <motion.div 
                className="floating-card active-delivery-card"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="card-icon-round veg">🍱</div>
                <div>
                  <strong>Suvarna Mess Veg Thali</strong>
                  <span>Dispatched • 12:15 PM</span>
                </div>
              </motion.div>

              {/* Floating Badge 2: Refund statement */}
              <motion.div 
                className="floating-card wallet-credit-card"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              >
                <div className="card-icon-round orange">⏸️</div>
                <div>
                  <strong>Tiffin Paused Successfully</strong>
                  <span className="credit-text">₹73 Credited to Wallet</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
