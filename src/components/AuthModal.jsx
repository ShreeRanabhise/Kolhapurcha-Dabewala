import React, { useState, useEffect, useRef } from 'react';
import { X, Smartphone, CheckCircle, Shield, ArrowRight, Loader } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './AuthModal.css';

const AuthModal = ({ isOpen, onClose, onLoginSuccess, initialPhone = '' }) => {
  const [step, setStep] = useState('phone'); // 'phone', 'otp', 'success'
  const [phoneNumber, setPhoneNumber] = useState(initialPhone);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const otpInputsRef = useRef([]);

  useEffect(() => {
    if (isOpen) {
      setPhoneNumber(initialPhone || '');
    }
  }, [isOpen, initialPhone]);

  useEffect(() => {
    let interval;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  // Handle phone change
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 10) {
      setPhoneNumber(value);
      setError('');
    }
  };

  // Submit phone to trigger mock OTP sending
  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setTimer(30);
      setOtp(['', '', '', '']);
      // Focus first input
      setTimeout(() => {
        if (otpInputsRef.current[0]) {
          otpInputsRef.current[0].focus();
        }
      }, 100);
    }, 1500);
  };

  // Handle single digit OTP input
  const handleOtpChange = (index, value) => {
    const digit = value.slice(-1).replace(/\D/g, '');
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (digit && index < 3) {
      otpInputsRef.current[index + 1].focus();
    }
  };

  // Handle backspace navigation in OTP grid
  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputsRef.current[index - 1].focus();
    }
  };

  // Submit OTP for mock verification
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length !== 4) {
      setError('Please enter the full 4-digit code.');
      return;
    }

    setLoading(true);
    setError('');

    // Simulate OTP verification API
    setTimeout(() => {
      setLoading(false);
      if (otpCode === '1234') { // Mock verification code
        setStep('success');
        setTimeout(() => {
          onLoginSuccess(phoneNumber);
          onClose();
          // Reset
          setStep('phone');
          setPhoneNumber('');
        }, 1800);
      } else {
        setError('Incorrect verification code. Hint: Use 1234');
      }
    }, 1500);
  };

  // Trigger resend
  const handleResendOtp = () => {
    if (timer === 0) {
      setTimer(30);
      setOtp(['', '', '', '']);
      setError('A new OTP has been sent to your number.');
      setTimeout(() => setError(''), 3000);
      if (otpInputsRef.current[0]) {
        otpInputsRef.current[0].focus();
      }
    }
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

        {/* Modal Sheet */}
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
              <span className="bullet"></span> Verified Login
            </div>
            <button className="auth-close-btn" onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* Steps container */}
          <div className="auth-modal-body">
            {step === 'phone' && (
              <motion.div
                key="step-phone"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="auth-intro">
                  <h2>Welcome back!</h2>
                  <p>Enter your phone number to manage your daily tiffin schedules and subscriptions.</p>
                </div>

                <form onSubmit={handleSendOtp} className="auth-form">
                  <div className="auth-input-container">
                    <span className="auth-country-code">+91</span>
                    <span className="auth-input-divider"></span>
                    <input 
                      type="tel" 
                      placeholder="Enter mobile number" 
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      className="auth-phone-input"
                      disabled={loading}
                      autoFocus
                    />
                    <Smartphone className="auth-smartphone-icon" size={20} />
                  </div>

                  {error && <div className={`auth-message-toast ${error.includes('sent') ? 'success' : 'error'}`}>{error}</div>}

                  <button 
                    type="submit" 
                    className="btn btn-primary auth-submit-btn"
                    disabled={loading || phoneNumber.length !== 10}
                  >
                    {loading ? (
                      <Loader className="animate-spin" size={20} />
                    ) : (
                      <>Send OTP Verification <ArrowRight size={18} /></>
                    )}
                  </button>
                </form>

                {/* Demo Logins Section */}
                <div className="auth-demo-helper" style={{
                  marginTop: '1.5rem',
                  padding: '1rem',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '12px',
                  fontSize: '0.85rem'
                }}>
                  <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold', color: 'rgba(255, 255, 255, 0.8)' }}>💡 Demo Quick Login (OTP: 1234):</p>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <button 
                      type="button"
                      onClick={() => { setPhoneNumber('9876543210'); setError(''); }}
                      style={{
                        padding: '0.35rem 0.75rem',
                        background: phoneNumber === '9876543210' ? '#7A1F1F' : 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '20px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      Customer
                    </button>
                    <button 
                      type="button"
                      onClick={() => { setPhoneNumber('8888888888'); setError(''); }}
                      style={{
                        padding: '0.35rem 0.75rem',
                        background: phoneNumber === '8888888888' ? '#7A1F1F' : 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '20px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      Vendor Partner
                    </button>
                    <button 
                      type="button"
                      onClick={() => { setPhoneNumber('9999999999'); setError(''); }}
                      style={{
                        padding: '0.35rem 0.75rem',
                        background: phoneNumber === '9999999999' ? '#7A1F1F' : 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '20px',
                        color: 'white',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        transition: 'all 0.2s'
                      }}
                    >
                      KD Admin
                    </button>
                  </div>
                </div>

                <div className="auth-disclaimer">
                  <Shield size={14} className="text-secondary" />
                  <span>Your connection is 256-bit SSL encrypted & secure.</span>
                </div>
              </motion.div>
            )}

            {step === 'otp' && (
              <motion.div
                key="step-otp"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
              >
                <div className="auth-intro">
                  <h2>Enter Verification Code</h2>
                  <p>We've sent a 4-digit code to <strong>+91 {phoneNumber.substring(0,5)}-{phoneNumber.substring(5)}</strong>.</p>
                </div>

                <form onSubmit={handleVerifyOtp} className="auth-form">
                  <div className="auth-otp-grid">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(idx, e)}
                        ref={(el) => (otpInputsRef.current[idx] = el)}
                        className="auth-otp-input-box"
                        disabled={loading}
                      />
                    ))}
                  </div>

                  {error && <div className={`auth-message-toast ${error.includes('sent') ? 'success' : 'error'}`}>{error}</div>}

                  <button 
                    type="submit" 
                    className="btn btn-primary auth-submit-btn"
                    disabled={loading || otp.join('').length !== 4}
                  >
                    {loading ? (
                      <Loader className="animate-spin" size={20} />
                    ) : (
                      "Confirm & Verify"
                    )}
                  </button>
                </form>

                <div className="auth-otp-timer-box">
                  {timer > 0 ? (
                    <p className="timer-text">Resend verification code in <span>{timer}s</span></p>
                  ) : (
                    <button className="resend-otp-btn" onClick={handleResendOtp}>
                      Resend Verification Code
                    </button>
                  )}
                </div>
              </motion.div>
            )}

            {step === 'success' && (
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
                <h2>Verification Successful</h2>
                <p>
                  {phoneNumber === '9999999999' 
                    ? 'Welcome back, Administrator! Opening Control Panel...' 
                    : phoneNumber === '8888888888' 
                    ? 'Welcome back, Partner! Opening Vendor Dashboard...' 
                    : 'Welcome back! Redirecting you to your tiffin scheduler...'}
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
