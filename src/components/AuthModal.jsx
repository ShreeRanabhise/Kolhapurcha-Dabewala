import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, Phone, Shield, ArrowRight, Loader, LogIn, UserPlus, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onLoginSuccess, initialPhone = '' }) => {
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [step, setStep] = useState('form'); // 'form', 'success'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Login form states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Sign up form states
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState(initialPhone);

  useEffect(() => {
    if (isOpen) {
      setError('');
      setSuccessMsg('');
      setStep('form');
      // Set default credentials on open for convenient user testing
      setUsername('');
      setPassword('');
      setRegUsername('');
      setRegEmail('');
      setRegPhone(initialPhone || '');
    }
  }, [isOpen, initialPhone]);

  // Handle Sign Up form fields
  const handleRegPhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setRegPhone(value);
      setError('');
    }
  };

  // Submit Login
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      setError('Username is required.');
      return;
    }
    if (!password) {
      setError('Password is required.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate login API validation
    setTimeout(() => {
      setLoading(false);
      const cleanUser = username.trim().toLowerCase();

      // Maps usernames to dashboard role phone numbers to keep dashboard integration intact
      let targetPhone = '';
      let displayMessage = '';

      // Check dynamic vendor accounts first
      const vendorAccounts = JSON.parse(localStorage.getItem('vendorAccounts') || '[]');
      const foundVendor = vendorAccounts.find(v => v.vendorId.toLowerCase() === cleanUser && v.password === password);

      if (foundVendor) {
        targetPhone = '8888888888'; // Route to Vendor Dashboard
        displayMessage = `Welcome back, ${foundVendor.ownerName}!`;
        
        localStorage.setItem('vendor_owner_name', foundVendor.ownerName);
        
        // Find their actual mess name from pending applications or approved vendors
        const pendingApps = JSON.parse(localStorage.getItem('pendingVendorApplications') || '[]');
        const approvedVendors = JSON.parse(localStorage.getItem('approvedVendors') || '[]');
        
        const theirApp = pendingApps.find(a => a.ownerName?.toLowerCase() === foundVendor.ownerName?.toLowerCase()) || 
                         approvedVendors.find(v => v.ownerName?.toLowerCase() === foundVendor.ownerName?.toLowerCase());
                         
        if (theirApp) {
          localStorage.setItem('vendor_mess_name', theirApp.name || theirApp.messName);
        } else {
          // If not found, at least don't default to Shivneri Mess if they are a new dynamic user
          localStorage.setItem('vendor_mess_name', `${foundVendor.ownerName}'s Mess`);
        }

      } else if (cleanUser === 'admin' && password === 'password') {
        targetPhone = '9999999999'; // KD Admin Role
        displayMessage = 'Welcome back, Administrator!';
      } else if (cleanUser === 'vendor' && password === 'password') {
        targetPhone = '8888888888'; // Vendor Partner Role
        displayMessage = 'Welcome back, Partner!';
      } else if (cleanUser === 'customer' && password === 'password') {
        targetPhone = '9876543210'; // Customer Role
        displayMessage = 'Login successful!';
      } else {
        // Validate against registered users
        const userAccounts = JSON.parse(localStorage.getItem('userAccounts') || '[]');
        const foundUser = userAccounts.find(u => u.username.toLowerCase() === cleanUser);
        
        if (foundUser) {
          targetPhone = foundUser.phone;
          displayMessage = `Logged in as Customer: ${foundUser.username}`;
        } else {
          setError('Invalid credentials or account not found. Please sign up first.');
          return;
        }
      }

      setSuccessMsg(displayMessage);
      setStep('success');

      setTimeout(() => {
        onLoginSuccess(targetPhone, foundVendor ? foundVendor.ownerName : username);
        onClose();
        // Reset
        setStep('form');
        setUsername('');
        setPassword('');
      }, 1800);
    }, 1500);
  };

  // Submit Sign Up
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    if (!regUsername.trim()) {
      setError('Username is required.');
      return;
    }
    if (!regEmail.trim()) {
      setError('Email address is required.');
      return;
    }
    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(regEmail.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    if (regPhone.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate sign up / registration API
    setTimeout(() => {
      // Save user account to localStorage
      const userAccounts = JSON.parse(localStorage.getItem('userAccounts') || '[]');
      const exists = userAccounts.some(u => u.phone === regPhone || u.username.toLowerCase() === regUsername.trim().toLowerCase());
      if (!exists) {
        userAccounts.push({
          username: regUsername.trim(),
          email: regEmail.trim(),
          phone: regPhone,
          registeredAt: new Date().toISOString()
        });
        localStorage.setItem('userAccounts', JSON.stringify(userAccounts));
      }

      setLoading(false);
      setSuccessMsg('Account registered successfully! Welcome aboard.');
      setStep('success');

      setTimeout(() => {
        // Log in the user using the registered phone number and username
        onLoginSuccess(regPhone, regUsername);
        onClose();
        // Reset
        setStep('form');
        setRegUsername('');
        setRegEmail('');
        setRegPhone('');
      }, 1800);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="auth-overlay">
        {/* Backdrop overlay */}
        <motion.div 
          className="auth-backdrop" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal Card */}
        <motion.div 
          className="auth-modal-card glassmorphism"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        >
          {/* Header row */}
          <div className="auth-modal-header">
            <div className="auth-logo-pill">
              <span className="bullet"></span> SECURE AUTHENTICATION
            </div>
            <button className="auth-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Body container */}
          <div className="auth-modal-body">
            {step === 'form' ? (
              <div>
                {/* Tab Switcher */}
                <div className="auth-tabs-row">
                  <button 
                    onClick={() => { setActiveTab('login'); setError(''); }}
                    className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
                  >
                    <LogIn size={15} />
                    <span>Login</span>
                  </button>
                  <button 
                    onClick={() => { setActiveTab('signup'); setError(''); }}
                    className={`auth-tab-btn ${activeTab === 'signup' ? 'active' : ''}`}
                  >
                    <UserPlus size={15} />
                    <span>Sign Up</span>
                  </button>
                </div>

                {/* Tab Content: LOGIN */}
                {activeTab === 'login' && (
                  <motion.div
                    key="tab-login"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="auth-intro">
                      <h2>Welcome back!</h2>
                      <p>Enter your username and password to log in to your account dashboard.</p>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="auth-form">
                      {/* Username input */}
                      <div className="auth-input-container">
                        <User className="auth-input-icon" size={18} />
                        <input 
                          type="text" 
                          placeholder="Username" 
                          value={username}
                          onChange={(e) => { setUsername(e.target.value); setError(''); }}
                          className="auth-text-input"
                          disabled={loading}
                          autoFocus
                          required
                        />
                      </div>

                      {/* Password input */}
                      <div className="auth-input-container">
                        <Lock className="auth-input-icon" size={18} />
                        <input 
                          type="password" 
                          placeholder="Password" 
                          value={password}
                          onChange={(e) => { setPassword(e.target.value); setError(''); }}
                          className="auth-text-input"
                          disabled={loading}
                          required
                        />
                      </div>

                      {error && <div className="auth-message-toast error">{error}</div>}

                      <button 
                        type="submit" 
                        className="btn btn-primary auth-submit-btn"
                        disabled={loading || !username.trim() || !password}
                      >
                        {loading ? (
                          <Loader className="animate-spin" size={20} />
                        ) : (
                          <>Log In <ArrowRight size={18} /></>
                        )}
                      </button>
                    </form>

                    {/* Quick Demo Helper credentials details */}
                    <div className="auth-demo-helper" style={{
                      marginTop: '1.25rem',
                      padding: '0.85rem 1rem',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: '12px',
                      fontSize: '0.8rem'
                    }}>
                      <p style={{ margin: '0 0 0.4rem 0', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.8)' }}>💡 Demo Credentials (Password: <strong>password</strong>):</p>
                      <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                        <button 
                          type="button"
                          onClick={() => { setUsername('customer'); setPassword('password'); setError(''); }}
                          style={{ padding: '0.3rem 0.65rem', background: username === 'customer' ? '#7A1F1F' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '15px', color: 'white', cursor: 'pointer', fontSize: '0.7rem' }}
                        >
                          Customer
                        </button>
                        <button 
                          type="button"
                          onClick={() => { setUsername('vendor'); setPassword('password'); setError(''); }}
                          style={{ padding: '0.3rem 0.65rem', background: username === 'vendor' ? '#7A1F1F' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '15px', color: 'white', cursor: 'pointer', fontSize: '0.7rem' }}
                        >
                          Vendor Partner
                        </button>
                        <button 
                          type="button"
                          onClick={() => { setUsername('admin'); setPassword('password'); setError(''); }}
                          style={{ padding: '0.3rem 0.65rem', background: username === 'admin' ? '#7A1F1F' : 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '15px', color: 'white', cursor: 'pointer', fontSize: '0.7rem' }}
                        >
                          KD Admin
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Tab Content: SIGN UP */}
                {activeTab === 'signup' && (
                  <motion.div
                    key="tab-signup"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="auth-intro">
                      <h2>Create Account</h2>
                      <p>Sign up to start subscribing to verified local messes and planning your meals.</p>
                    </div>

                    <form onSubmit={handleSignUpSubmit} className="auth-form">
                      {/* Username */}
                      <div className="auth-input-container">
                        <User className="auth-input-icon" size={18} />
                        <input 
                          type="text" 
                          placeholder="Choose Username" 
                          value={regUsername}
                          onChange={(e) => { setRegUsername(e.target.value); setError(''); }}
                          className="auth-text-input"
                          disabled={loading}
                          required
                        />
                      </div>

                      {/* Email ID */}
                      <div className="auth-input-container">
                        <Mail className="auth-input-icon" size={18} />
                        <input 
                          type="email" 
                          placeholder="Email Address" 
                          value={regEmail}
                          onChange={(e) => { setRegEmail(e.target.value); setError(''); }}
                          className="auth-text-input"
                          disabled={loading}
                          required
                        />
                      </div>

                      {/* Phone No */}
                      <div className="auth-input-container">
                        <Phone className="auth-input-icon" size={18} />
                        <input 
                          type="tel" 
                          placeholder="10-Digit Mobile Number" 
                          value={regPhone}
                          onChange={handleRegPhoneChange}
                          className="auth-text-input"
                          disabled={loading}
                          required
                        />
                      </div>

                      {error && <div className="auth-message-toast error">{error}</div>}

                      <button 
                        type="submit" 
                        className="btn btn-primary auth-submit-btn"
                        disabled={loading || !regUsername.trim() || !regEmail.trim() || regPhone.length !== 10}
                      >
                        {loading ? (
                          <Loader className="animate-spin" size={20} />
                        ) : (
                          <>Register & Get Started <ArrowRight size={18} /></>
                        )}
                      </button>
                    </form>
                  </motion.div>
                )}

                <div className="auth-disclaimer">
                  <Shield size={14} className="text-secondary" />
                  <span>Secure 256-Bit SSL connection to protect your data.</span>
                </div>
              </div>
            ) : (
              /* Success Screen */
              <motion.div
                key="step-success"
                className="auth-success-screen"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 10, delay: 0.1 }}
                >
                  <CheckCircle size={80} className="success-lottie-replacement" />
                </motion.div>
                <h2>Successful</h2>
                <p>{successMsg}</p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
