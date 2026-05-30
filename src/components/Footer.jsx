import React from 'react';
import { Camera, Globe, MessageCircle, Play } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="partner" className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col brand-col">
            <div className="logo footer-logo">
              <img src="/logo.png" alt="Kolhapurcha Dabewala Logo" className="logo-image" />
            </div>
            <p className="footer-tagline">"घरगुती जेवण, रोज तुमच्या दारात"</p>
            <p className="footer-desc">
              Your trusted partner for fresh, hygienic, and authentic home-cooked meals delivered daily across Kolhapur.
            </p>
          </div>
          
          <div className="footer-col">
            <h3 className="footer-heading">Company</h3>
            <ul className="footer-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Partner With Us</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3 className="footer-heading">Services</h3>
            <ul className="footer-links">
              <li><a href="#">Find Mess</a></li>
              <li><a href="#">Meal Plans</a></li>
              <li><a href="#">Corporate Subscriptions</a></li>
              <li><a href="#">Refer & Earn</a></li>
            </ul>
          </div>
          
          <div className="footer-col">
            <h3 className="footer-heading">Legal</h3>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Conditions</a></li>
              <li><a href="#">Refund Policy</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="social-links">
            <a href="#" className="social-icon"><Camera size={20} /></a>
            <a href="#" className="social-icon"><Globe size={20} /></a>
            <a href="#" className="social-icon"><MessageCircle size={20} /></a>
            <a href="#" className="social-icon"><Play size={20} /></a>
          </div>
          <p className="copyright">© 2026 Kolhapurcha Dabewala. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
