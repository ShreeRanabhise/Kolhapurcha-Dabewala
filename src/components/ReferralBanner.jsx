import React, { useState } from 'react';
import { Share2, Copy, Check, Send, Smartphone, Gift, Users, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './ReferralBanner.css';

const ReferralBanner = () => {
  const [friendsCount, setFriendsCount] = useState(5);
  const [referralCode] = useState('DABBA100');
  const [copied, setCopied] = useState(false);
  const [phone, setPhone] = useState('');
  const [inviteSent, setInviteSent] = useState(false);
  const [sendingInvite, setSendingInvite] = useState(false);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSendInvite = (e) => {
    e.preventDefault();
    if (!phone || phone.length < 10) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }
    setSendingInvite(true);
    setTimeout(() => {
      setSendingInvite(false);
      setInviteSent(true);
      setPhone('');
      setTimeout(() => setInviteSent(false), 3000);
    }, 1200);
  };

  // Earnings calculations
  const totalEarned = friendsCount * 100;
  
  // Calculate equivalent free meals
  const getFreeMealsText = (count) => {
    const total = count * 100;
    const avgMealCost = 70;
    const meals = Math.floor(total / avgMealCost);
    if (meals <= 0) return "Start inviting to earn free meals!";
    if (meals < 5) return `Equivalent to ${meals} free daily meals!`;
    if (count >= 15) return `Equivalent to 1 Full Month of FREE Tiffins!`;
    if (count >= 8) return `Equivalent to 2 Weeks of FREE Tiffins!`;
    return `Equivalent to ${meals} days of FREE meals!`;
  };

  return (
    <section className="referral-section">
      <div className="container">
        <div className="referral-bento-container">
          
          {/* Header row */}
          <div className="referral-header-wrap">
            <div className="ref-badge">
              <Gift size={14} color="var(--color-orange)" fill="var(--color-orange)" />
              <span>COLHAPUR SHARE CLUB</span>
            </div>
            <h2>Spread the Taste, <span className="text-orange">Earn Rewards.</span></h2>
            <p>Invite your friends, flatmates, and hostel buddies to subscribe. Everyone wins!</p>
          </div>

          <div className="referral-grid-bento">
            
            {/* CARD 1: Invite Console */}
            <div className="bento-card card-invite-console glassmorphism">
              <h3>Referral Sharing Dashboard</h3>
              <p className="card-subtitle-text">Share your unique code to give your friends ₹50 off their first subscription, and get ₹100 inside your wallet.</p>
              
              {/* Copy Code Section */}
              <div className="ref-code-box">
                <span className="ref-code-label">YOUR REFERRAL CODE</span>
                <div className="ref-code-action-row">
                  <code className="ref-code-display">{referralCode}</code>
                  <button onClick={handleCopyCode} className={`ref-copy-btn ${copied ? 'copied' : ''}`}>
                    {copied ? (
                      <>
                        <Check size={16} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={16} />
                        <span>Copy Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Direct Invite Form */}
              <form onSubmit={handleSendInvite} className="ref-invite-form">
                <label className="ref-form-label">Send Invitation SMS</label>
                <div className="ref-input-group">
                  <Smartphone size={18} className="ref-phone-icon" />
                  <input 
                    type="tel" 
                    placeholder="Enter friend's 10-digit number" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="ref-phone-input"
                  />
                  <button type="submit" className="ref-send-btn" disabled={sendingInvite}>
                    {sendingInvite ? (
                      <span className="spinner"></span>
                    ) : (
                      <>
                        <Send size={16} />
                        <span>Send</span>
                      </>
                    )}
                  </button>
                </div>
                <AnimatePresence>
                  {inviteSent && (
                    <motion.div 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="ref-success-msg"
                    >
                      ✓ Invitation SMS sent successfully!
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>

              {/* Quick Social Shares */}
              <div className="quick-shares">
                <span className="share-label">Quick Share:</span>
                <div className="share-pills-row">
                  <a 
                    href={`https://wa.me/?text=Hey!%20Try%20Kolhapurcha%20Dabewala%20for%20fresh%20home-cooked%20daily%20meals.%20Use%20my%20code%20${referralCode}%20to%20get%20%E2%82%B950%20off%20your%20first%20order!%20Subscribe%20here:%20https://kolhapurchadabewala.in`} 
                    target="_blank" 
                    rel="noreferrer"
                    className="share-pill whatsapp"
                  >
                    WhatsApp
                  </a>
                  <button onClick={handleCopyCode} className="share-pill link-copy">
                    Copy Link
                  </button>
                </div>
              </div>
            </div>

            {/* CARD 2: Interactive Earnings Calculator */}
            <div className="bento-card card-rewards-calc glassmorphism">
              <div className="rewards-header">
                <h3>Reward Estimator</h3>
                <span className="calculator-pill">REAL-TIME</span>
              </div>
              
              <div className="calc-slider-group">
                <div className="calc-labels">
                  <span>Friends you invite</span>
                  <strong className="text-orange">{friendsCount} Friends</strong>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="15" 
                  value={friendsCount} 
                  onChange={(e) => setFriendsCount(parseInt(e.target.value))}
                  className="ref-range-input"
                />
                <div className="slider-limits">
                  <span>1 Friend</span>
                  <span>15 Friends</span>
                </div>
              </div>

              {/* Earnings output widget */}
              <div className="earnings-output-card">
                <span className="wallet-badge">WALLET CREDIT EARNED</span>
                <div className="earnings-amount">
                  <span className="symbol">₹</span>
                  <span className="number">{totalEarned}</span>
                </div>
                <div className="equivalent-tag">
                  <Gift size={16} />
                  <span>{getFreeMealsText(friendsCount)}</span>
                </div>
              </div>

              {/* Step Timeline */}
              <div className="ref-timeline">
                <div className="timeline-step">
                  <div className="step-num">01</div>
                  <div className="step-content">
                    <h4>Share Code</h4>
                    <p>Send code to friends.</p>
                  </div>
                </div>
                <div className="timeline-arrow"><ArrowRight size={16} /></div>
                <div className="timeline-step">
                  <div className="step-num">02</div>
                  <div className="step-content">
                    <h4>Friend Joins</h4>
                    <p>Friend gets ₹50 off.</p>
                  </div>
                </div>
                <div className="timeline-arrow"><ArrowRight size={16} /></div>
                <div className="timeline-step">
                  <div className="step-num">03</div>
                  <div className="step-content">
                    <h4>Get Paid</h4>
                    <p>You get ₹100 wallet credit!</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ReferralBanner;
