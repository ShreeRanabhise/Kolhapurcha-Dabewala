import React from 'react';
import { Camera, Globe, MessageCircle, Play, ArrowRight, MapPin, Apple, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="mega-footer" id="footer">
      <div className="container">
        
        {/* Top Section: Newsletter & App Download */}
        <div className="footer-top-row">
          <div className="newsletter-box">
            <h3>Subscribe to our Newsletter</h3>
            <p>Get the latest updates on new mess partners, discounts, and Kolhapur food news.</p>
            <div className="newsletter-input-group">
              <input type="email" placeholder="Enter your email address" />
              <button className="btn btn-primary"><ArrowRight size={20} /></button>
            </div>
          </div>
          
          <div className="footer-app-box">
            <h3>Get the KD App</h3>
            <p>Order food on the go. Available for iOS & Android.</p>
            <div className="footer-store-badges">
              <button className="footer-store-btn">
                <Apple size={20} /> App Store
              </button>
              <button className="footer-store-btn">
                <Play size={18} /> Google Play
              </button>
            </div>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Middle Section: Mega Grid */}
        <div className="footer-mega-grid">
          <div className="footer-col brand-col">
            <div className="logo footer-logo">
              {/* If you have a white logo, use it here, otherwise text */}
              <span className="text-white text-xl font-bold">Kolhapurcha Dabewala</span>
            </div>
            <p className="footer-tagline">"घरगुती जेवण, रोज तुमच्या दारात"</p>
            <p className="footer-desc">
              Kolhapur's largest and most trusted platform for finding authentic, hygienic home-cooked meals.
            </p>
            <div className="social-links mt-4">
              <a href="#" className="social-icon"><Camera size={18} /></a>
              <a href="#" className="social-icon"><Globe size={18} /></a>
              <a href="#" className="social-icon"><MessageCircle size={18} /></a>
            </div>
          </div>
          
          <div className="footer-col">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Team</a></li>
              <li><a href="#">Kolhapur Blog</a></li>
              <li><a href="#">Contact Us</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3 className="footer-heading">For Partners</h3>
            <ul className="footer-links">
              <li><Link to="/become-partner">Register a Mess</Link></li>
              <li><a href="#">Partner Guidelines</a></li>
              <li><Link to="/dashboard/vendor">Vendor Dashboard</Link></li>
              <li><Link to="/dashboard/admin">Admin Dashboard</Link></li>
              <li><a href="#">Success Stories</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links">
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">Cookie Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        {/* Areas We Serve Section (SEO Boost) */}
        <div className="footer-areas-section">
          <h3 className="areas-heading"><MapPin size={18} className="text-orange" /> Areas We Serve in Kolhapur</h3>
          <ul className="areas-list">
            <li>Rajarampuri</li>
            <li>Shahupuri</li>
            <li>Tarabai Park</li>
            <li>Shivaji University</li>
            <li>Rankala</li>
            <li>Kasaba Bawada</li>
            <li>Nagala Park</li>
            <li>Bindu Chowk</li>
            <li>Ruikar Colony</li>
            <li>Kadamwadi</li>
            <li>Udyamnagar</li>
            <li>Pratibhanagar</li>
            <li>Rajarampuri 1st Lane</li>
            <li>Kavala Naka</li>
          </ul>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© 2026 Kolhapurcha Dabewala Technologies Pvt. Ltd. All Rights Reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Help Center</a>
            <a href="#">Support</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
