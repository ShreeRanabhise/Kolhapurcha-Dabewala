import React, { useState, useEffect } from 'react';
import { 
  Users, TrendingUp, Megaphone, CreditCard, 
  FileText, ShieldCheck, Store, Award, 
  Eye, Star, Smartphone, Settings, 
  ChevronDown, Phone, Mail, Building, 
  MapPin, Check, Headphones, ArrowRight, X, ChefHat, Bike, Shield
} from 'lucide-react';
import './BecomePartner.css';

const BecomePartner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Form state
  const [messName, setMessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');
  const [capacity, setCapacity] = useState('');
  const [mealTypes, setMealTypes] = useState('');
  const [description, setDescription] = useState('');
  const [photosUploaded, setPhotosUploaded] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);



  // FAQ state (accordion index tracking)
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // 1. Save onboarding application to pendingVendorApplications for Admin Dashboard
    const savedApps = localStorage.getItem('pendingVendorApplications');
    let currentApps = [];
    if (savedApps) {
      try {
        currentApps = JSON.parse(savedApps);
      } catch (err) {
        console.error(err);
      }
    }
    const newApp = {
      id: Date.now(),
      messName: messName,
      ownerName: ownerName,
      fssai: "FSSAI-" + Math.floor(10000000000000 + Math.random() * 90000000000000),
      area: location,
      status: "Pending",
      plan: capacity.includes("2000+") ? "Growth Plan (₹999/mo)" : "Starter Plan (₹499/mo)"
    };
    const updatedApps = [newApp, ...currentApps];
    localStorage.setItem('pendingVendorApplications', JSON.stringify(updatedApps));

    // 2. Add notification for Admin Panel
    const savedNotifs = localStorage.getItem('notifications');
    let currentNotifs = [];
    if (savedNotifs) {
      try {
        currentNotifs = JSON.parse(savedNotifs);
      } catch (err) {
        console.error(err);
      }
    }
    const newNotif = {
      id: Date.now(),
      title: "New Partner Request 🤝",
      desc: `${messName} by ${ownerName} is pending verification.`,
      time: "Just now",
      read: false,
      type: "info"
    };
    const updatedNotifs = [newNotif, ...currentNotifs];
    localStorage.setItem('notifications', JSON.stringify(updatedNotifs));

    // 3. Dispatch real-time custom event to update Header
    window.dispatchEvent(new CustomEvent('notifications-updated', { detail: updatedNotifs }));

    // 4. Show success screen
    setFormSubmitted(true);
  };

  // Scroll to Form helper
  const handleScrollToForm = () => {
    const element = document.getElementById('become-partner-form-card');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="bp-page-outer-wrapper">
      
      {/* 1. HERO SECTION */}
      <section className="bp-hero-section">
        <div className="bp-container hero-grid-wrapper">
          
          <div className="bp-hero-left">
            <div className="bp-hero-badge">
              <span className="badge-emoji">🤝</span>
              <span className="badge-text">Become a Partner</span>
            </div>
            
            <h1 className="bp-hero-title">
              Grow Your <span className="title-orange-highlight">Mess Business</span> <br />
              With Kolhapurcha Dabewala
            </h1>
            
            <p className="bp-hero-subtitle">
              Reach thousands of students, working professionals, bachelors and families looking for trusted home-style meals in Kolhapur.
            </p>

            <div className="bp-hero-cta-buttons">
              <button onClick={handleScrollToForm} className="bp-btn bp-btn-primary">
                Become a Partner <ArrowRight size={18} />
              </button>
              <a href="tel:+918888888888" className="bp-btn bp-btn-outline">
                <Headphones size={18} /> Talk To Our Team
              </a>
            </div>
          </div>

          <div className="bp-hero-right-visual">
            <div className="chef-image-wrap">
              <img 
                src="/happy_chef.jpg" 
                alt="Smiling Indian lady chef holding traditional lunch box tiffins representing Kolhapurcha Dabewala partner" 
                className="chef-photo" 
              />
              
              {/* Floating stats cards over the image */}
              <div className="floating-stat-card card-customers">
                <div className="stat-icon-circle orange">
                  <Users size={16} />
                </div>
                <div className="stat-content">
                  <h4>1200+</h4>
                  <p>Active Customers</p>
                </div>
              </div>

              <div className="floating-stat-card card-partners">
                <div className="stat-icon-circle orange">
                  <Store size={16} />
                </div>
                <div className="stat-content">
                  <h4>50+</h4>
                  <p>Verified Mess Partners</p>
                </div>
              </div>

              <div className="floating-stat-card card-revenue">
                <div className="stat-icon-circle green">
                  <TrendingUp size={16} />
                </div>
                <div className="stat-content">
                  <h4>Grow</h4>
                  <p>Your Monthly Orders</p>
                </div>
              </div>

              <div className="floating-stat-card card-trusted">
                <div className="stat-icon-circle orange">
                  <Star size={16} fill="#FF6B00" stroke="none" />
                </div>
                <div className="stat-content">
                  <h4>Trusted</h4>
                  <p>Local Platform</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. SPLIT LAYOUT CONTAINER */}
      <section className="bp-split-body-section">
        <div className="bp-container split-layout-wrapper">
          
          {/* LEFT COLUMN: Educational & Verification Info */}
          <div className="bp-left-info-column">
            
            {/* Why Partner With Us? */}
            <div className="bp-left-section-block">
              <h2 className="bp-section-title">Why Partner With Us?</h2>
              
              <div className="why-partner-cards-grid">
                
                <div className="why-card">
                  <div className="why-icon-box">
                    <Users size={24} className="icon-orange" />
                  </div>
                  <h3>More Customers</h3>
                  <p>Get discovered by students and professionals searching for mess services.</p>
                </div>

                <div className="why-card">
                  <div className="why-icon-box">
                    <TrendingUp size={24} className="icon-orange" />
                  </div>
                  <h3>Grow Revenue</h3>
                  <p>Increase subscriptions and recurring monthly income.</p>
                </div>

                <div className="why-card">
                  <div className="why-icon-box">
                    <Megaphone size={24} className="icon-orange" />
                  </div>
                  <h3>Free Marketing</h3>
                  <p>We promote your mess across our platform and digital channels.</p>
                </div>

                <div className="why-card">
                  <div className="why-icon-box">
                    <CreditCard size={24} className="icon-orange" />
                  </div>
                  <h3>Easy Payments</h3>
                  <p>Receive secure and transparent payouts directly in your account.</p>
                </div>

              </div>
            </div>

            {/* How It Works */}
            <div className="bp-left-section-block">
              <h2 className="bp-section-title">How It Works</h2>
              
              <div className="how-it-works-timeline-row">
                
                {/* Step 1 */}
                <div className="timeline-step-col">
                  <div className="timeline-circle-icon orange">
                    <FileText size={20} className="icon-white" />
                  </div>
                  <span className="step-label-number">Step 01</span>
                  <h4>Submit Application</h4>
                  <p>Fill out a simple partner registration form.</p>
                </div>

                <div className="timeline-arrow-spacer"></div>

                {/* Step 2 */}
                <div className="timeline-step-col">
                  <div className="timeline-circle-icon orange">
                    <ShieldCheck size={20} className="icon-white" />
                  </div>
                  <span className="step-label-number">Step 02</span>
                  <h4>Verification</h4>
                  <p>Our team verifies your kitchen and food quality.</p>
                </div>

                <div className="timeline-arrow-spacer"></div>

                {/* Step 3 */}
                <div className="timeline-step-col">
                  <div className="timeline-circle-icon orange">
                    <Store size={20} className="icon-white" />
                  </div>
                  <span className="step-label-number">Step 03</span>
                  <h4>Profile Creation</h4>
                  <p>We create your mess listing and subscription plans.</p>
                </div>

                <div className="timeline-arrow-spacer"></div>

                {/* Step 4 */}
                <div className="timeline-step-col">
                  <div className="timeline-circle-icon orange">
                    <Bike size={20} className="icon-white" />
                  </div>
                  <span className="step-label-number">Step 04</span>
                  <h4>Start Receiving Orders</h4>
                  <p>Begin getting customers through the platform.</p>
                </div>

              </div>
            </div>

            {/* Partner Benefits */}
            <div className="bp-left-section-block">
              <h2 className="bp-section-title">Partner Benefits</h2>
              
              <div className="benefits-grid-layout">
                
                <div className="benefit-cell">
                  <Eye size={20} className="benefit-icon" />
                  <span>More Visibility</span>
                </div>

                <div className="benefit-cell">
                  <Users size={20} className="benefit-icon" />
                  <span>Monthly Subscribers</span>
                </div>

                <div className="benefit-cell">
                  <TrendingUp size={20} className="benefit-icon" />
                  <span>Business Growth</span>
                </div>

                <div className="benefit-cell">
                  <Star size={20} className="benefit-icon" />
                  <span>Customer Reviews</span>
                </div>

                <div className="benefit-cell">
                  <Smartphone size={20} className="benefit-icon" />
                  <span>Digital Presence</span>
                </div>

                <div className="benefit-cell">
                  <Settings size={20} className="benefit-icon" />
                  <span>Easy Management</span>
                </div>

                <div className="benefit-cell">
                  <ShieldCheck size={20} className="benefit-icon" />
                  <span>Secure Payments</span>
                </div>

                <div className="benefit-cell">
                  <Award size={20} className="benefit-icon" />
                  <span>Local Brand Recognition</span>
                </div>

              </div>
            </div>

            {/* Success Stories */}
            <div className="bp-left-section-block">
              <h2 className="bp-section-title">Partner Success Stories</h2>
              
              <div className="success-stories-cards-row">
                
                {/* Story 1 */}
                <div className="success-story-card">
                  <div className="story-header-details">
                    <img src="/partner_success_1.jpg" alt="Shivneri Mess Owner" className="story-avatar" />
                    <div className="story-identity">
                      <h4>Shivneri Mess</h4>
                      <div className="stars-rating-pill">
                        <Star size={11} fill="#EAB308" stroke="none" />
                        <Star size={11} fill="#EAB308" stroke="none" />
                        <Star size={11} fill="#EAB308" stroke="none" />
                        <Star size={11} fill="#EAB308" stroke="none" />
                        <Star size={11} fill="#EAB308" stroke="none" />
                      </div>
                    </div>
                  </div>
                  <h3 className="story-achievement-heading">3X Increase In Monthly Orders</h3>
                  <p className="story-desc">
                    Increased customer base and stable monthly income.
                  </p>
                </div>

                {/* Story 2 */}
                <div className="success-story-card">
                  <div className="story-header-details">
                    <img src="/partner_success_2.jpg" alt="Aai's Kitchen Owner" className="story-avatar" />
                    <div className="story-identity">
                      <h4>Aai's Kitchen</h4>
                      <div className="stars-rating-pill">
                        <Star size={11} fill="#EAB308" stroke="none" />
                        <Star size={11} fill="#EAB308" stroke="none" />
                        <Star size={11} fill="#EAB308" stroke="none" />
                        <Star size={11} fill="#EAB308" stroke="none" />
                        <Star size={11} fill="#EAB308" stroke="none" />
                      </div>
                    </div>
                  </div>
                  <h3 className="story-achievement-heading">250+ New Subscribers</h3>
                  <p className="story-desc">
                    Got regular subscribers within the first month.
                  </p>
                </div>

                {/* Story 3 */}
                <div className="success-story-card">
                  <div className="story-header-details">
                    <img src="/partner_success_3.jpg" alt="Gharandaaz Meals Owner" className="story-avatar" />
                    <div className="story-identity">
                      <h4>Gharandaaz Meals</h4>
                      <div className="stars-rating-pill">
                        <Star size={11} fill="#EAB308" stroke="none" />
                        <Star size={11} fill="#EAB308" stroke="none" />
                        <Star size={11} fill="#EAB308" stroke="none" />
                        <Star size={11} fill="#EAB308" stroke="none" />
                        <Star size={11} fill="#EAB308" stroke="none" />
                      </div>
                    </div>
                  </div>
                  <h3 className="story-achievement-heading">Consistent Monthly Revenue</h3>
                  <p className="story-desc">
                    Steady growth and better business management.
                  </p>
                </div>

              </div>
            </div>

            {/* Who Can Join? */}
            <div className="bp-left-section-block">
              <h2 className="bp-section-title">Who Can Join?</h2>
              
              <div className="who-join-wrapper-layout">
                
                <div className="who-cards-flex-row">
                  <div className="who-join-card">
                    <span className="who-icon">🏪</span>
                    <h4>Mess Owners</h4>
                  </div>
                  <div className="who-join-card">
                    <span className="who-icon">👩‍🍳</span>
                    <h4>Home Chefs</h4>
                  </div>
                  <div className="who-join-card">
                    <span className="who-icon">🍱</span>
                    <h4>Tiffin Services</h4>
                  </div>
                  <div className="who-join-card">
                    <span className="who-icon">🏢</span>
                    <h4>Canteens</h4>
                  </div>
                  <div className="who-join-card">
                    <span className="who-icon">🍛</span>
                    <h4>Small Restaurants</h4>
                  </div>
                </div>

                <div className="requirements-card-box">
                  <h3 className="req-card-title">Requirements</h3>
                  <ul className="req-bullets-list">
                    <li>
                      <Check size={14} className="check-green" />
                      <span>Valid Food Business</span>
                    </li>
                    <li>
                      <Check size={14} className="check-green" />
                      <span>Clean Kitchen</span>
                    </li>
                    <li>
                      <Check size={14} className="check-green" />
                      <span>Quality Food</span>
                    </li>
                    <li>
                      <Check size={14} className="check-green" />
                      <span>Reliable Delivery</span>
                    </li>
                    <li>
                      <Check size={14} className="check-green" />
                      <span>Customer Friendly Service</span>
                    </li>
                  </ul>
                </div>

              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Sticky Partner Registration Form & FAQ */}
          <div className="bp-right-sidebar-column">
            
            {/* Form Card */}
            <div className="bp-sidebar-sticky-card glassmorphism" id="become-partner-form-card">
              <div className="form-card-header">
                <h2>Become Our Partner</h2>
                <p>Fill out the form and our team will get in touch with you.</p>
              </div>

              {formSubmitted ? (
                <div className="form-success-state-container">
                  <div className="success-checkmark-circle">
                    <Check size={36} className="icon-white" />
                  </div>
                  <h3>Application Submitted!</h3>
                  <p>
                    Thank you for applying. Our verification team will contact you within 24 hours to schedule a kitchen inspection.
                  </p>
                  <button onClick={() => setFormSubmitted(false)} className="btn-resubmit-form">
                    Register Another Business
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="partner-registration-form-element">
                  
                  {/* Mess Name */}
                  <div className="bp-form-field-group">
                    <label>Mess / Business Name*</label>
                    <div className="field-input-icon-wrap">
                      <Building size={16} className="field-icon" />
                      <input 
                        type="text" 
                        placeholder="Mess / Business Name" 
                        required 
                        value={messName}
                        onChange={(e) => setMessName(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Owner Name */}
                  <div className="bp-form-field-group">
                    <label>Owner Name*</label>
                    <div className="field-input-icon-wrap">
                      <span className="field-icon-placeholder-user">👤</span>
                      <input 
                        type="text" 
                        placeholder="Owner Name" 
                        required 
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        style={{ paddingLeft: '2.5rem' }}
                      />
                    </div>
                  </div>

                  {/* Mobile Number */}
                  <div className="bp-form-field-group">
                    <label>Mobile Number*</label>
                    <div className="field-input-icon-wrap">
                      <Phone size={16} className="field-icon" />
                      <input 
                        type="tel" 
                        placeholder="Mobile Number" 
                        required 
                        pattern="[0-9]{10}"
                        value={mobileNumber}
                        onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g,''))}
                      />
                    </div>
                  </div>

                  {/* Email Address */}
                  <div className="bp-form-field-group">
                    <label>Email Address*</label>
                    <div className="field-input-icon-wrap">
                      <Mail size={16} className="field-icon" />
                      <input 
                        type="email" 
                        placeholder="Email Address" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Location Area */}
                  <div className="bp-form-field-group">
                    <label>Location / Area*</label>
                    <div className="field-input-icon-wrap">
                      <MapPin size={16} className="field-icon" />
                      <input 
                        type="text" 
                        placeholder="Location / Area" 
                        required 
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Monthly Meal Capacity */}
                  <div className="bp-form-field-group">
                    <label>Monthly Meal Capacity*</label>
                    <div className="field-input-icon-wrap select-wrapper">
                      <select 
                        required 
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                      >
                        <option value="" disabled hidden>Monthly Meal Capacity</option>
                        <option value="Under 500 meals">Under 500 meals</option>
                        <option value="500 - 1000 meals">500 - 1000 meals</option>
                        <option value="1000 - 2000 meals">1000 - 2000 meals</option>
                        <option value="2000+ meals">2000+ meals</option>
                      </select>
                      <ChevronDown size={16} className="select-arrow" />
                    </div>
                  </div>

                  {/* Meal Types */}
                  <div className="bp-form-field-group">
                    <label>Meal Types*</label>
                    <div className="field-input-icon-wrap select-wrapper">
                      <select 
                        required 
                        value={mealTypes}
                        onChange={(e) => setMealTypes(e.target.value)}
                      >
                        <option value="" disabled hidden>Meal Types</option>
                        <option value="Veg Only">Veg Only</option>
                        <option value="Non-Veg Only">Non-Veg Only</option>
                        <option value="Veg & Non-Veg">Veg & Non-Veg</option>
                      </select>
                      <ChevronDown size={16} className="select-arrow" />
                    </div>
                  </div>

                  {/* Short Description */}
                  <div className="bp-form-field-group">
                    <label>Short Description*</label>
                    <textarea 
                      placeholder="Tell us about your mess..." 
                      required 
                      rows="3"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="form-textarea-field"
                    />
                  </div>

                  {/* Upload Kitchen Photos */}
                  <div className="bp-form-field-group">
                    <label>Upload Kitchen Photos*</label>
                    <div 
                      onClick={() => setPhotosUploaded(true)} 
                      className={`form-upload-dashed-dropzone ${photosUploaded ? 'uploaded' : ''}`}
                    >
                      {photosUploaded ? (
                        <div className="uploaded-success-inner">
                          <Check size={20} className="icon-green" />
                          <span>3 Photos Uploaded Successfully</span>
                        </div>
                      ) : (
                        <div className="upload-prompt-inner">
                          <span className="upload-arrow-cloud-icon">📤</span>
                          <span className="upload-main-text">Click to upload or drag & drop</span>
                          <span className="upload-sub-text">PNG, JPG up to 5MB each</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button type="submit" className="btn-form-submit-partner">
                    Become a Partner →
                  </button>

                  {/* Bottom secure footnote */}
                  <div className="form-secure-footnote">
                    <Lock size={12} className="lock-icon" />
                    <span>Your Information is 100% secure and will never be shared.</span>
                  </div>

                </form>
              )}
            </div>

            {/* Frequently Asked Questions */}
            <div className="bp-sidebar-faq-block-wrapper">
              <h3 className="faq-section-heading">Frequently Asked Questions</h3>
              
              <div className="bp-faq-accordion-stack">
                
                {/* FAQ 1 */}
                <div className="bp-faq-item-box">
                  <button onClick={() => toggleFaq(0)} className="faq-trigger-btn">
                    <span>How much does partnership cost?</span>
                    <span className={`faq-operator ${openFaq === 0 ? 'rotate' : ''}`}>+</span>
                  </button>
                  {openFaq === 0 && (
                    <div className="faq-content-dropdown">
                      We offer simple registration models starting at zero upfront marketing fees. We only charge a small platform commission on monthly active subscription revenues generated.
                    </div>
                  )}
                </div>

                {/* FAQ 2 */}
                <div className="bp-faq-item-box">
                  <button onClick={() => toggleFaq(1)} className="faq-trigger-btn">
                    <span>How do I receive payments?</span>
                    <span className={`faq-operator ${openFaq === 1 ? 'rotate' : ''}`}>+</span>
                  </button>
                  {openFaq === 1 && (
                    <div className="faq-content-dropdown">
                      All subscription payments are collected upfront from customers and settled securely directly to your linked bank account every Monday morning.
                    </div>
                  )}
                </div>

                {/* FAQ 3 */}
                <div className="bp-faq-item-box">
                  <button onClick={() => toggleFaq(2)} className="faq-trigger-btn">
                    <span>How long does verification take?</span>
                    <span className={`faq-operator ${openFaq === 2 ? 'rotate' : ''}`}>+</span>
                  </button>
                  {openFaq === 2 && (
                    <div className="faq-content-dropdown">
                      Our verification team will review your application details, arrange a kitchen hygiene check, and activate your platform storefront within 24-48 hours.
                    </div>
                  )}
                </div>

                {/* FAQ 4 */}
                <div className="bp-faq-item-box">
                  <button onClick={() => toggleFaq(3)} className="faq-trigger-btn">
                    <span>Can home chefs join?</span>
                    <span className={`faq-operator ${openFaq === 3 ? 'rotate' : ''}`}>+</span>
                  </button>
                  {openFaq === 3 && (
                    <div className="faq-content-dropdown">
                      Yes! Home chefs with active FSSAI registration cooking clean, home-style foods are highly welcome to subscribe and share their meal plans.
                    </div>
                  )}
                </div>

                {/* FAQ 5 */}
                <div className="bp-faq-item-box">
                  <button onClick={() => toggleFaq(4)} className="faq-trigger-btn">
                    <span>How do customers find my mess?</span>
                    <span className={`faq-operator ${openFaq === 4 ? 'rotate' : ''}`}>+</span>
                  </button>
                  {openFaq === 4 && (
                    <div className="faq-content-dropdown">
                      Customers use the Find Mess search tool, filtering results by location (e.g. Rajarampuri), meal type, budget constraints, and delivery area preferences to find your listing.
                    </div>
                  )}
                </div>

              </div>
              
              <a href="#faq" className="view-all-faqs-link">
                View All FAQs →
              </a>
            </div>

          </div>

        </div>
      </section>

      {/* 3. FINAL CTA: Large Orange Gradient Banner */}
      <section className="bp-full-width-cta-banner-wrapper">
        <div className="bp-cta-gradient-card">
          <div className="banner-left-visual-icon">
            <ChefHat size={80} className="cta-chef-watermark" />
          </div>
          
          <div className="banner-center-titles">
            <h2>Ready To Grow Your Food Business?</h2>
            <p>Join Kolhapur's fastest growing mess discovery platform.</p>
          </div>

          <div className="banner-right-buttons-row">
            <button onClick={handleScrollToForm} className="btn-cta solid-white">
              Become a Partner
            </button>
            <a href="tel:+918888888888" className="btn-cta outline-white">
              Contact Team
            </a>
          </div>

          <div className="banner-floating-tiffins-image">
            {/* Visual steel tiffins stacking representation */}
            <div className="tiffin-piles">
              <div className="tiffin-handle"></div>
              <div className="tiffin-ring"></div>
              <div className="tiffin-ring"></div>
              <div className="tiffin-ring"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRUST BAR / FOOTER STATS */}
      <footer className="bp-bottom-trust-stats-bar">
        <div className="bp-container footer-stats-row">
          
          <div className="footer-stat-unit">
            <div className="stat-unit-icon-wrapper">
              <Users size={20} className="icon-orange" />
            </div>
            <div className="stat-unit-text">
              <h3>50+</h3>
              <p>Verified Partners</p>
            </div>
          </div>

          <div className="footer-stat-unit">
            <div className="stat-unit-icon-wrapper">
              <Users size={20} style={{ opacity: 0 }} />
              <span className="stat-smile-icon">😊</span>
            </div>
            <div className="stat-unit-text">
              <h3>1200+</h3>
              <p>Happy Subscribers</p>
            </div>
          </div>

          <div className="footer-stat-unit">
            <div className="stat-unit-icon-wrapper">
              <Bike size={20} className="icon-orange" />
            </div>
            <div className="stat-unit-text">
              <h3>99%</h3>
              <p>Delivery Success</p>
            </div>
          </div>

          <div className="footer-stat-unit">
            <div className="stat-unit-icon-wrapper">
              <Star size={18} fill="#FF6B00" stroke="none" />
            </div>
            <div className="stat-unit-text">
              <h3>4.8★</h3>
              <p>Average Rating</p>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
};

// SVG Icon replacement if required or standard Lucide
const Lock = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
);

export default BecomePartner;
