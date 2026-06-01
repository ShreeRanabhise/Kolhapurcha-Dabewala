import React, { useState, useEffect } from 'react';
import { 
  Calendar, CreditCard, RefreshCw, Clock, MapPin, 
  User, CheckCircle, AlertTriangle, ArrowRight, ShieldCheck, 
  ChevronRight, Pause, Play, Edit3, Trash2, Wallet
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

// Swappable verified messes list
const AVAILABLE_MESSES = [
  { id: 1, name: "Suvarna Mess", price: 2199, rating: 4.8, type: "Pure Veg" },
  { id: 2, name: "Sai Home Food", price: 2499, rating: 4.7, type: "Pure Veg" },
  { id: 3, name: "Shivaji Student Mess", price: 1999, rating: 4.6, type: "Pure Veg" },
  { id: 4, name: "Kolhapuri Tadka Mess", price: 2599, rating: 4.7, type: "Veg & Non-Veg" },
  { id: 5, name: "Gharandaaz Executive Meals", price: 3299, rating: 4.9, type: "Pure Veg" }
];

const UserDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const phone = localStorage.getItem('userPhone');
    if (!phone) {
      localStorage.setItem('triggerLogin', 'user');
      navigate('/');
    }
  }, [navigate]);

  const [activeTab, setActiveTab] = useState('scheduler'); // 'scheduler', 'subscription', 'wallet', 'history'
  const [userPhone, setUserPhone] = useState(localStorage.getItem('userPhone') || '9876543210');
  
  // Subscription Info States
  const [currentMess, setCurrentMess] = useState(AVAILABLE_MESSES[0]); // Suvarna Mess
  const [daysRemaining, setDaysRemaining] = useState(18);
  const [timeSlot, setTimeSlot] = useState('Lunch (12:30 PM - 1:30 PM)');
  const [address, setAddress] = useState('Flat 402, Shivneri Heights, Rajarampuri 4th Lane, Kolhapur');
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInput, setAddressInput] = useState(address);
  
  // Interactive Tiffin Scheduler States
  // Let's generate dates for June 2026
  const [pausedDates, setPausedDates] = useState(['2026-06-05', '2026-06-06']); // Initially paused dates
  const [walletBalance, setWalletBalance] = useState(380);
  const [showCalendarToast, setShowCalendarToast] = useState(null); // { message, type }

  // Swap Mess states
  const [selectedSwapTarget, setSelectedSwapTarget] = useState('');
  const [showSwapConfirm, setShowSwapConfirm] = useState(false);
  const [swapResult, setSwapResult] = useState(null);

  // Address edit handler
  const saveAddress = () => {
    setAddress(addressInput);
    setIsEditingAddress(false);
    triggerToast('Delivery address updated successfully.', 'success');
  };

  const triggerToast = (msg, type = 'success') => {
    setShowCalendarToast({ message: msg, type });
    setTimeout(() => setShowCalendarToast(null), 3000);
  };

  // Toggle calendar dates to pause/resume delivery
  const toggleDatePause = (dateString) => {
    const isPaused = pausedDates.includes(dateString);
    const dailyRefund = Math.round(currentMess.price / 30);

    if (isPaused) {
      // Resume delivery
      setPausedDates(pausedDates.filter(d => d !== dateString));
      setWalletBalance(prev => Math.max(0, prev - dailyRefund));
      setDaysRemaining(prev => prev + 1);
      triggerToast(`Delivery resumed for ${formatDate(dateString)}. ₹${dailyRefund} adjusted.`, 'info');
    } else {
      // Pause delivery
      setPausedDates([...pausedDates, dateString]);
      setWalletBalance(prev => prev + dailyRefund);
      setDaysRemaining(prev => prev - 1);
      triggerToast(`Tiffin paused for ${formatDate(dateString)}. ₹${dailyRefund} credited to Wallet.`, 'success');
    }
  };

  // Handle Mess Swapping calculation
  const handleSwapSelection = (e) => {
    const targetId = parseInt(e.target.value);
    const target = AVAILABLE_MESSES.find(m => m.id === targetId);
    if (!target) return;

    setSelectedSwapTarget(target);

    // Swap adjustments:
    // Remaining value = daysRemaining * (currentMess.price / 30)
    // New days remaining = Remaining value / (target.price / 30)
    const currentDaily = currentMess.price / 30;
    const targetDaily = target.price / 30;
    const remainingValue = daysRemaining * currentDaily;
    const newDays = Math.round(remainingValue / targetDaily);

    setSwapResult({
      previousDays: daysRemaining,
      newDays: newDays,
      priceDiff: target.price - currentMess.price,
      valueChange: Math.round(remainingValue)
    });
  };

  const confirmSwap = () => {
    if (!selectedSwapTarget || !swapResult) return;
    setCurrentMess(selectedSwapTarget);
    setDaysRemaining(swapResult.newDays);
    setSelectedSwapTarget('');
    setSwapResult(null);
    setShowSwapConfirm(false);
    triggerToast(`Switched mess provider to ${selectedSwapTarget.name}!`, 'success');
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
  };

  // Calendar dates generator for June 2026
  const getJune2026Dates = () => {
    const dates = [];
    for (let day = 1; day <= 30; day++) {
      const dayStr = day < 10 ? `0${day}` : `${day}`;
      dates.push(`2026-06-${dayStr}`);
    }
    return dates;
  };

  const juneDates = getJune2026Dates();

  return (
    <div className="dashboard-page">
      <div className="container dashboard-container">
        
        {/* SIDEBAR NAVIGATION */}
        <div className="db-sidebar glassmorphism">
          <div className="db-user-profile">
            <div className="db-user-avatar">
              <User size={32} />
            </div>
            <div className="db-user-info">
              <h4>Active Subscriber</h4>
              <p>+91 {userPhone}</p>
            </div>
          </div>
          <hr className="db-divider" />
          <nav className="db-nav-links">
            <button 
              className={`db-tab-btn ${activeTab === 'scheduler' ? 'active' : ''}`}
              onClick={() => setActiveTab('scheduler')}
            >
              <Calendar size={18} /> Tiffin Scheduler
            </button>
            <button 
              className={`db-tab-btn ${activeTab === 'subscription' ? 'active' : ''}`}
              onClick={() => setActiveTab('subscription')}
            >
              <RefreshCw size={18} /> Swap Mess Partner
            </button>
            <button 
              className={`db-tab-btn ${activeTab === 'wallet' ? 'active' : ''}`}
              onClick={() => setActiveTab('wallet')}
            >
              <CreditCard size={18} /> Wallet & Statements
            </button>
            <button 
              className={`db-tab-btn ${activeTab === 'history' ? 'active' : ''}`}
              onClick={() => setActiveTab('history')}
            >
              <Clock size={18} /> Delivery History
            </button>
          </nav>
        </div>

        {/* MAIN PANEL CONTENT */}
        <div className="db-content-panel">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: CALENDAR TIFFIN SCHEDULER */}
            {activeTab === 'scheduler' && (
              <motion.div
                key="scheduler"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="db-panel-card"
              >
                <div className="panel-header-row">
                  <div>
                    <h2>Tiffin Scheduler Calendar</h2>
                    <p>Click on calendar dates below to pause tiffin delivery. Paused meals credit money directly to your wallet.</p>
                  </div>
                  <div className="days-counter-badge glassmorphism">
                    <span>Days Remaining:</span>
                    <strong>{daysRemaining} Days</strong>
                  </div>
                </div>

                {/* Sub info grid */}
                <div className="sub-quick-grid">
                  <div className="quick-info-box">
                    <MapPin size={18} className="text-secondary" />
                    <div>
                      <h5>Deliver To:</h5>
                      {isEditingAddress ? (
                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.25rem' }}>
                          <input 
                            type="text" 
                            value={addressInput} 
                            onChange={(e) => setAddressInput(e.target.value)} 
                            className="db-inline-input"
                          />
                          <button onClick={saveAddress} className="btn-save-inline">Save</button>
                        </div>
                      ) : (
                        <p>{address} <button onClick={() => setIsEditingAddress(true)} className="edit-inline-btn"><Edit3 size={12}/></button></p>
                      )}
                    </div>
                  </div>
                  <div className="quick-info-box">
                    <Clock size={18} className="text-secondary" />
                    <div>
                      <h5>Delivery Slot:</h5>
                      <p>{timeSlot}</p>
                    </div>
                  </div>
                </div>

                {/* Calendar Layout */}
                <div className="db-calendar-wrapper">
                  <div className="calendar-month-indicator">
                    <h3>June 2026</h3>
                    <div className="calendar-legends">
                      <span className="legend"><span className="legend-dot active"></span> Delivery</span>
                      <span className="legend"><span className="legend-dot paused"></span> Paused (Credited)</span>
                    </div>
                  </div>

                  <div className="calendar-days-header">
                    <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
                  </div>
                  
                  <div className="calendar-grid">
                    {/* Empty cells to pad for June 2026 starting on a Monday (1 cell padding for Sunday) */}
                    <div className="calendar-day empty"></div>
                    
                    {juneDates.map((dateStr, idx) => {
                      const dayNumber = idx + 1;
                      const isPaused = pausedDates.includes(dateStr);
                      // Let's assume past days are before June 5, 2026
                      const isPast = dayNumber < 5;

                      return (
                        <button
                          key={dateStr}
                          className={`calendar-day ${isPast ? 'past' : ''} ${isPaused ? 'paused' : 'delivering'}`}
                          disabled={isPast}
                          onClick={() => toggleDatePause(dateStr)}
                        >
                          <span className="day-number">{dayNumber}</span>
                          <span className="day-status-text">
                            {isPast ? 'Delivered' : isPaused ? 'Paused (+₹73)' : 'Deliver'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Floating Action Toast notifications */}
                {showCalendarToast && (
                  <div className={`calendar-toast ${showCalendarToast.type}`}>
                    <CheckCircle size={16} />
                    <span>{showCalendarToast.message}</span>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 2: SWAP MESS PARTNER */}
            {activeTab === 'subscription' && (
              <motion.div
                key="subscription"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="db-panel-card"
              >
                <h2>Swap Mess Partner</h2>
                <p>Transfer your active subscription remaining balance to another verified local provider instantly. Remaining days will be automatically calculated.</p>

                <div className="swap-messes-comparison-deck">
                  {/* Left card: Current partner */}
                  <div className="swap-partner-card current">
                    <div className="card-badge current-label">CURRENT PROVIDER</div>
                    <h3>{currentMess.name}</h3>
                    <div className="card-sub-meta">
                      <span>Rate: ₹{currentMess.price}/month</span>
                      <span>Type: {currentMess.type}</span>
                    </div>
                    <div className="card-days-status">
                      <div className="status-label">Subscription Value Left:</div>
                      <div className="status-amount">₹{Math.round(daysRemaining * (currentMess.price / 30))}</div>
                      <p>Based on {daysRemaining} days left at ₹{Math.round(currentMess.price/30)}/day</p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="swap-arrow-icon">
                    <RefreshCw size={24} />
                  </div>

                  {/* Right card: Swap options selection */}
                  <div className="swap-partner-card select">
                    <div className="status-label">Select New Provider:</div>
                    <select 
                      className="db-select-dropdown" 
                      onChange={handleSwapSelection}
                      defaultValue=""
                    >
                      <option value="" disabled>-- Select Tiffin Vendor --</option>
                      {AVAILABLE_MESSES.filter(m => m.id !== currentMess.id).map(mess => (
                        <option key={mess.id} value={mess.id}>
                          {mess.name} (₹{mess.price}/mo — {mess.type})
                        </option>
                      ))}
                    </select>

                    {selectedSwapTarget ? (
                      <div className="target-preview-metrics animate-fade-in" style={{ marginTop: '1.5rem' }}>
                        <h3>{selectedSwapTarget.name}</h3>
                        <div className="card-sub-meta">
                          <span>Rate: ₹{selectedSwapTarget.price}/month</span>
                          <span>Rating: ★ {selectedSwapTarget.rating}</span>
                        </div>
                        <div className="comparison-math-box">
                          <div className="math-row">
                            <span>Your Remaining Balance:</span>
                            <strong>₹{swapResult.valueChange}</strong>
                          </div>
                          <div className="math-row">
                            <span>New Daily Rate:</span>
                            <strong>₹{Math.round(selectedSwapTarget.price/30)}/day</strong>
                          </div>
                          <hr />
                          <div className="math-row highlight">
                            <span>New Plan Days:</span>
                            <strong className="text-secondary">{swapResult.newDays} Days</strong>
                          </div>
                          <p className="math-footnote">
                            *Plan adjusted from {swapResult.previousDays} to {swapResult.newDays} days due to price shift.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="swap-placeholder-box">
                        <AlertTriangle size={24} className="text-secondary" />
                        <p>Please select a new mess partner above to compare calculations.</p>
                      </div>
                    )}
                  </div>
                </div>

                {selectedSwapTarget && (
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '2rem' }}>
                    <button onClick={() => setShowSwapConfirm(true)} className="btn btn-primary btn-swap-action">
                      Proceed to Transfer Subscription <ChevronRight size={18} />
                    </button>
                  </div>
                )}

                {/* Confirm swap modal overlay */}
                {showSwapConfirm && (
                  <div className="auth-overlay">
                    <div className="auth-backdrop" onClick={() => setShowSwapConfirm(false)}></div>
                    <div className="auth-modal-card glassmorphism text-center" style={{ maxWidth: '400px' }}>
                      <div className="auth-logo-pill" style={{ marginBottom: '1.5rem' }}>👑 Secure Swap</div>
                      <h3 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1rem' }}>Confirm Subscription Swap</h3>
                      <p style={{ fontSize: '0.95rem', color: '#666', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                        You are changing your daily tiffin provider to <strong>{selectedSwapTarget.name}</strong>. Your remaining plan length will adjust to <strong>{swapResult.newDays} days</strong>.
                      </p>
                      <div style={{ display: 'flex', gap: '1rem' }}>
                        <button onClick={() => setShowSwapConfirm(false)} className="btn btn-outline w-full" style={{ border: '1px solid #CCC', color: '#666' }}>Cancel</button>
                        <button onClick={confirmSwap} className="btn btn-primary w-full" style={{ background: '#7A1F1F' }}>Confirm Swap</button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 3: WALLET & STATEMENTS */}
            {activeTab === 'wallet' && (
              <motion.div
                key="wallet"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="db-panel-card"
              >
                <h2>Wallet & Transactions</h2>
                <p>Track your paused credits, subscription adjustments, and refer & earn bonuses.</p>

                <div className="wallet-card-grid">
                  {/* Premium Bank Card Layout */}
                  <div className="premium-wallet-card">
                    <div className="card-chip-row">
                      <Wallet size={36} color="rgba(255,255,255,0.8)" />
                      <span className="card-brand-label">DABEWALA PAY</span>
                    </div>
                    <div className="card-balance-display">
                      <p>WALLET BALANCE</p>
                      <h3>₹{walletBalance.toLocaleString()}</h3>
                    </div>
                    <div className="card-user-details-row">
                      <div>
                        <p>SUBSCRIBER</p>
                        <h4>+91 {userPhone.substring(0,5)}*****</h4>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <p>EXPIRES</p>
                        <h4>06/2028</h4>
                      </div>
                    </div>
                  </div>

                  {/* Wallet quick CTAs */}
                  <div className="wallet-quick-actions glassmorphism">
                    <h3>Quick Cashout</h3>
                    <p>Refund your wallet balance directly to your linked UPI address or bank account instantly.</p>
                    <button className="btn btn-primary wallet-cashout-btn" disabled={walletBalance === 0}>
                      Cashout Balance to UPI
                    </button>
                    <div className="secured-badges">
                      <ShieldCheck size={14} className="text-secondary" /> Secured by Razorpay & UPI
                    </div>
                  </div>
                </div>

                {/* Transactions Ledger */}
                <div className="wallet-transactions-ledger">
                  <h3>Transaction History</h3>
                  <div className="transactions-list">
                    <div className="transaction-item">
                      <div className="tx-left">
                        <span className="tx-icon pause-icon"><Pause size={12}/></span>
                        <div>
                          <h4>Tiffin Paused: June 6</h4>
                          <p>Refund Credit (Suvarna Mess)</p>
                        </div>
                      </div>
                      <span className="tx-amount credit">+ ₹73</span>
                    </div>

                    <div className="transaction-item">
                      <div className="tx-left">
                        <span className="tx-icon pause-icon"><Pause size={12}/></span>
                        <div>
                          <h4>Tiffin Paused: June 5</h4>
                          <p>Refund Credit (Suvarna Mess)</p>
                        </div>
                      </div>
                      <span className="tx-amount credit">+ ₹73</span>
                    </div>

                    <div className="transaction-item">
                      <div className="tx-left">
                        <span className="tx-icon promo-icon">🎁</span>
                        <div>
                          <h4>Referral Rewards Promo</h4>
                          <p>Credited code: WELCOME100</p>
                        </div>
                      </div>
                      <span className="tx-amount credit">+ ₹100</span>
                    </div>

                    <div className="transaction-item">
                      <div className="tx-left">
                        <span className="tx-icon sub-icon"><Play size={12}/></span>
                        <div>
                          <h4>Subscription Initial Purchase</h4>
                          <p>UPI reference: TXN8091823</p>
                        </div>
                      </div>
                      <span className="tx-amount debit">- ₹2,199</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: DELIVERY HISTORY */}
            {activeTab === 'history' && (
              <motion.div
                key="history"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="db-panel-card"
              >
                <h2>Delivery History & Ratings</h2>
                <p>Track your past tiffin dispatches, rate food flavors, and report quality issues directly to our control desk.</p>

                <div className="history-ledger-list">
                  <div className="history-item-row">
                    <div className="hist-meta-left">
                      <span className="hist-status-icon-ok">✓</span>
                      <div>
                        <h4>June 4, 2026 — Delivered</h4>
                        <p>Tiffin: {currentMess.name} (Veg Thali)</p>
                      </div>
                    </div>
                    <div className="hist-actions-right">
                      <span className="star-display">★★★★★</span>
                      <button className="btn-hist-action">Report Issue</button>
                    </div>
                  </div>

                  <div className="history-item-row">
                    <div className="hist-meta-left">
                      <span className="hist-status-icon-ok">✓</span>
                      <div>
                        <h4>June 3, 2026 — Delivered</h4>
                        <p>Tiffin: {currentMess.name} (Veg Thali)</p>
                      </div>
                    </div>
                    <div className="hist-actions-right">
                      <div className="add-rating-btn-group">
                        <button className="rating-star-btn">★</button>
                        <button className="rating-star-btn">★</button>
                        <button className="rating-star-btn">★</button>
                        <button className="rating-star-btn">★</button>
                        <button className="rating-star-btn">★</button>
                      </div>
                      <button className="btn-hist-action">Report Issue</button>
                    </div>
                  </div>

                  <div className="history-item-row paused-day">
                    <div className="hist-meta-left">
                      <span className="hist-status-icon-paused">II</span>
                      <div>
                        <h4>June 2, 2026 — Paused by User</h4>
                        <p>No delivery dispatched</p>
                      </div>
                    </div>
                    <div className="hist-actions-right">
                      <span className="refund-credited-badge">₹73 Credited</span>
                    </div>
                  </div>

                  <div className="history-item-row">
                    <div className="hist-meta-left">
                      <span className="hist-status-icon-ok">✓</span>
                      <div>
                        <h4>June 1, 2026 — Delivered</h4>
                        <p>Tiffin: {currentMess.name} (Veg Thali)</p>
                      </div>
                    </div>
                    <div className="hist-actions-right">
                      <span className="star-display">★★★★★</span>
                      <button className="btn-hist-action">Report Issue</button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default UserDashboard;
