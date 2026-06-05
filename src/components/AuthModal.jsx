import React, { useState, useEffect } from 'react';
import { X, User, Mail, Lock, Phone, Shield, ArrowRight, Loader, LogIn, UserPlus, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../hooks/useAuth';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onLoginSuccess, initialPhone = '' }) => {
  const { login, signup, loginWithGoogle } = useAuth();
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'
  const [step, setStep] = useState('form'); // 'form', 'success'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Login form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Sign up form states
  const [regUsername, setRegUsername] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState(initialPhone);

  useEffect(() => {
    if (isOpen) {
      setError('');
      setSuccessMsg('');
      setStep('form');
      setEmail('');
      setPassword('');
      setRegUsername('');
      setRegEmail('');
      setRegPassword('');
      setRegPhone(initialPhone || '');
    }
  }, [isOpen, initialPhone]);

  const handleRegPhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setRegPhone(value);
      setError('');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Email and Password are required.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await login(email.trim(), password);
      setLoading(false);
      
      setSuccessMsg('Logged in successfully!');
      setStep('success');

      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess();
        onClose();
        setStep('form');
        setEmail('');
        setPassword('');
      }, 1800);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Invalid credentials.');
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    if (!regUsername.trim() || !regEmail.trim() || !regPassword || regPhone.length !== 10) {
      setError('Please fill all fields correctly.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await signup(regEmail.trim(), regPassword, 'customer', regUsername.trim(), regPhone);
      setLoading(false);
      setSuccessMsg('Account registered successfully!');
      setStep('success');

      setTimeout(() => {
        if (onLoginSuccess) onLoginSuccess();
        onClose();
        setStep('form');
        setRegUsername('');
        setRegEmail('');
        setRegPassword('');
        setRegPhone('');
      }, 1800);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Failed to create an account.');
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="auth-overlay">
        <motion.div 
          className="auth-backdrop" 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div 
          className="auth-modal-card glassmorphism"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
        >
          <div className="auth-modal-header">
            <div className="auth-logo-pill">
              <span className="bullet"></span> SECURE AUTHENTICATION
            </div>
            <button className="auth-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <div className="auth-modal-body">
            {step === 'form' ? (
              <div>
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
                      <p>Enter your email and password to log in.</p>
                    </div>

                    <form onSubmit={handleLoginSubmit} className="auth-form">
                      <div className="auth-input-container">
                        <Mail className="auth-input-icon" size={18} />
                        <input 
                          type="email" 
                          placeholder="Email Address" 
                          value={email}
                          onChange={(e) => { setEmail(e.target.value); setError(''); }}
                          className="auth-text-input"
                          disabled={loading}
                          autoFocus
                          required
                        />
                      </div>

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
                        disabled={loading || !email.trim() || !password}
                      >
                        {loading ? <Loader className="animate-spin" size={20} /> : <>Log In <ArrowRight size={18} /></>}
                      </button>
                      
                      <button 
                        type="button" 
                        onClick={async () => {
                          try {
                            await loginWithGoogle('customer');
                            onLoginSuccess && onLoginSuccess();
                            onClose();
                          } catch (err) {
                            setError('Google Login failed.');
                          }
                        }}
                        className="btn btn-outline"
                        style={{ marginTop: '10px', width: '100%', padding: '12px', borderRadius: '12px', background: 'white', color: '#333', fontWeight: 'bold' }}
                      >
                        Sign in with Google
                      </button>
                    </form>
                  </motion.div>
                )}

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
                      <p>Sign up to subscribe to verified messes.</p>
                    </div>

                    <form onSubmit={handleSignUpSubmit} className="auth-form">
                      <div className="auth-input-container">
                        <User className="auth-input-icon" size={18} />
                        <input 
                          type="text" 
                          placeholder="Full Name" 
                          value={regUsername}
                          onChange={(e) => { setRegUsername(e.target.value); setError(''); }}
                          className="auth-text-input"
                          disabled={loading}
                          required
                        />
                      </div>

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
                      
                      <div className="auth-input-container">
                        <Lock className="auth-input-icon" size={18} />
                        <input 
                          type="password" 
                          placeholder="Create Password" 
                          value={regPassword}
                          onChange={(e) => { setRegPassword(e.target.value); setError(''); }}
                          className="auth-text-input"
                          disabled={loading}
                          required
                        />
                      </div>

                      {error && <div className="auth-message-toast error">{error}</div>}

                      <button 
                        type="submit" 
                        className="btn btn-primary auth-submit-btn"
                        disabled={loading || !regUsername.trim() || !regEmail.trim() || !regPassword || regPhone.length !== 10}
                      >
                        {loading ? <Loader className="animate-spin" size={20} /> : <>Register <ArrowRight size={18} /></>}
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
