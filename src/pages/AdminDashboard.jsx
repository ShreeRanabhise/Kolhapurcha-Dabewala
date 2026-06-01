import React, { useState, useEffect } from 'react';
import { 
  BarChart, Users, Store, ShieldAlert, Award, 
  CheckCircle, XCircle, FileText, Send, AlertTriangle, 
  MapPin, HelpCircle, UserCheck, DollarSign, RefreshCw, Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

// Mock Onboarding Applications
const INITIAL_APPLICATIONS = [
  { id: 401, messName: "Aai's Tiffin Center", ownerName: "Meenakshi Shinde", fssai: "21526084000301", area: "Rajarampuri", status: "Pending" },
  { id: 402, messName: "Chhatrapati Student Mess", ownerName: "Digvijay Ghadge", fssai: "21526084000412", area: "Shivaji University Area", status: "Pending" }
];

// Mock Support Disputes
const INITIAL_DISPUTES = [
  { id: 501, userName: "Vaibhav Sawant", phone: "9020412345", vendorName: "Suvarna Mess", issue: "Tiffin arrived 40 mins late and was cold", refundRequested: 73, status: "Open" },
  { id: 502, userName: "Archana Patil", phone: "9821456012", vendorName: "Kolhapuri Tadka Mess", issue: "Food was extremely spicy, student requested Veg alternative", refundRequested: 86, status: "Open" }
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const phone = localStorage.getItem('userPhone');
    if (phone !== '9999999999') {
      localStorage.setItem('triggerLogin', 'admin');
      navigate('/');
    }
  }, [navigate]);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview', 'approvals', 'disputes', 'pricing'
  const [applications, setApplications] = useState(() => {
    const localApps = localStorage.getItem('pendingVendorApplications')
      ? JSON.parse(localStorage.getItem('pendingVendorApplications'))
      : [];
    const defaults = INITIAL_APPLICATIONS.map(app => ({
      ...app,
      plan: app.id === 401 ? "Growth Plan (₹999/mo)" : "Starter Plan (₹499/mo)"
    }));
    return [...localApps, ...defaults];
  });
  const [disputes, setDisputes] = useState(INITIAL_DISPUTES);
  
  // Platform global counts
  const [totalRevenue, setTotalRevenue] = useState(345200);
  const [totalSubscribers, setTotalSubscribers] = useState(1240);
  const [activeVendors, setActiveVendors] = useState(52);

  // Global platform pricing rate states
  const [dailyRate, setDailyRate] = useState(() => {
    return localStorage.getItem('vendorDailyRate') ? parseInt(localStorage.getItem('vendorDailyRate')) : 70;
  });
  const [monthlyRate, setMonthlyRate] = useState(() => {
    return localStorage.getItem('vendorMonthlyRate') ? parseInt(localStorage.getItem('vendorMonthlyRate')) : 2100;
  });
  const [isSavingRates, setIsSavingRates] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveRates = (e) => {
    e.preventDefault();
    setIsSavingRates(true);
    localStorage.setItem('vendorDailyRate', dailyRate);
    localStorage.setItem('vendorMonthlyRate', monthlyRate);
    
    // Simulate database write
    setTimeout(() => {
      setIsSavingRates(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  // Handle partner onboarding approvals
  const handleApprovePartner = (id, approved = true) => {
    const targetApp = applications.find(app => app.id === id);
    setApplications(applications.filter(app => app.id !== id));

    const localApps = localStorage.getItem('pendingVendorApplications')
      ? JSON.parse(localStorage.getItem('pendingVendorApplications'))
      : [];
    localStorage.setItem('pendingVendorApplications', JSON.stringify(localApps.filter(app => app.id !== id)));

    if (approved && targetApp) {
      setActiveVendors(prev => prev + 1);

      const isGrowthPlan = targetApp.plan?.includes('999');
      const newApprovedVendor = {
        id: targetApp.id,
        name: targetApp.messName,
        area: targetApp.area,
        price: targetApp.price || 2100,
        rating: 4.8,
        reviews: 1,
        subscribers: 0,
        isVeg: targetApp.foodType ? targetApp.foodType.toLowerCase().includes('veg') : true,
        mealType: "Lunch + Dinner",
        hasFreeDelivery: true,
        onTimeRate: 100,
        isPopular: false,
        isPremium: isGrowthPlan,
        selectedPlan: targetApp.plan,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        coords: { top: `${30 + Math.random() * 40}%`, left: `${20 + Math.random() * 60}%` }
      };

      const existingApproved = localStorage.getItem('approvedVendors')
        ? JSON.parse(localStorage.getItem('approvedVendors'))
        : [];

      localStorage.setItem('approvedVendors', JSON.stringify([...existingApproved, newApprovedVendor]));

      if (isGrowthPlan) {
        alert(`Growth Plan Partner Approved! "${targetApp.messName}" is now active and listed in the Featured Mess section with a Premium badge.`);
      } else {
        alert(`Starter Partner Approved! "${targetApp.messName}" is now active in the directory list.`);
      }
    } else {
      alert("Vendor onboarding request rejected.");
    }
  };

  // Handle dispute ticket resolution
  const handleResolveDispute = (id, issueRefund = false) => {
    const disputeItem = disputes.find(d => d.id === id);
    if (!disputeItem) return;

    setDisputes(disputes.filter(d => d.id !== id));
    
    if (issueRefund) {
      setTotalRevenue(prev => prev - disputeItem.refundRequested);
      alert(`Refund of ₹${disputeItem.refundRequested} credited back to subscriber's UPI ID successfully.`);
    } else {
      alert("Dispute ticket resolved without refund. Notice sent to vendor.");
    }
  };

  return (
    <div className="dashboard-page">
      <div className="container dashboard-container">
        
        {/* SIDEBAR */}
        <div className="db-sidebar glassmorphism">
          <div className="db-user-profile">
            <div className="db-user-avatar admin">
              <Award size={32} />
            </div>
            <div className="db-user-info">
              <h4>KD Admin Panel</h4>
              <p>Master Controller</p>
            </div>
          </div>
          <hr className="db-divider" />
          <nav className="db-nav-links">
            <button 
              className={`db-tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <BarChart size={18} /> Platform Analytics
            </button>
            <button 
              className={`db-tab-btn ${activeTab === 'approvals' ? 'active' : ''}`}
              onClick={() => setActiveTab('approvals')}
            >
              <UserCheck size={18} /> Partner Onboarding
            </button>
            <button 
              className={`db-tab-btn ${activeTab === 'disputes' ? 'active' : ''}`}
              onClick={() => setActiveTab('disputes')}
            >
              <ShieldAlert size={18} /> Dispute Tickets
            </button>
            <button 
              className={`db-tab-btn ${activeTab === 'pricing' ? 'active' : ''}`}
              onClick={() => setActiveTab('pricing')}
            >
              <Settings size={18} /> Global Pricing Control
            </button>
          </nav>
        </div>

        {/* CONTENT */}
        <div className="db-content-panel">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="db-panel-card"
              >
                <h2>Kolhapurcha Dabewala System Analytics</h2>
                <p>Real-time platform subscriptions volume, operational partner count, and gross revenues ledger.</p>

                {/* Dashboard Stats row */}
                <div className="admin-stats-grid">
                  <div className="admin-stat-card glassmorphism">
                    <div style={{ display:'flex', justifyContent:'space-between', color:'#7A1F1F', marginBottom:'0.5rem' }}>
                      <span>GROSS SUB VOLUME</span>
                      <DollarSign size={18} />
                    </div>
                    <h3>₹{totalRevenue.toLocaleString()}</h3>
                    <p style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: '700' }}>+18.4% monthly growth</p>
                  </div>

                  <div className="admin-stat-card glassmorphism">
                    <div style={{ display:'flex', justifyContent:'space-between', color:'#E65C00', marginBottom:'0.5rem' }}>
                      <span>ACTIVE SUBSCRIBERS</span>
                      <Users size={18} />
                    </div>
                    <h3>{totalSubscribers} Users</h3>
                    <p style={{ fontSize: '0.8rem', color: '#10B981', fontWeight: '700' }}>92% active dispatch rate</p>
                  </div>

                  <div className="admin-stat-card glassmorphism">
                    <div style={{ display:'flex', justifyContent:'space-between', color: '#1565C0', marginBottom:'0.5rem' }}>
                      <span>ONBOARDED MESSES</span>
                      <Store size={18} />
                    </div>
                    <h3>{activeVendors} Kitchens</h3>
                    <p style={{ fontSize: '0.8rem', color: '#666' }}>Across 8 Kolhapur areas</p>
                  </div>
                </div>

                {/* System Activity Feed */}
                <div className="system-activity-feed" style={{ marginTop: '3.5rem' }}>
                  <h3>System Activity Feed</h3>
                  <div className="activity-list" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="activity-item" style={{ display:'flex', gap:'1rem', alignItems:'center', padding:'1rem 1.25rem', background:'#F8F9FA', borderRadius:'12px' }}>
                      <span style={{ fontSize: '1.25rem' }}>🔥</span>
                      <div>
                        <h4 style={{ margin:0, fontWeight:'700', fontSize:'0.95rem' }}>New Subscription Registered</h4>
                        <p style={{ margin:0, fontSize:'0.8rem', color:'#666' }}>User +91 9921**** purchased professional plan (Suvarna Mess) for ₹3,299.</p>
                      </div>
                    </div>
                    
                    <div className="activity-item" style={{ display:'flex', gap:'1rem', alignItems:'center', padding:'1rem 1.25rem', background:'#F8F9FA', borderRadius:'12px' }}>
                      <span style={{ fontSize: '1.25rem' }}>❄️</span>
                      <div>
                        <h4 style={{ margin:0, fontWeight:'700', fontSize:'0.95rem' }}>Tiffin delivery paused</h4>
                        <p style={{ margin:0, fontSize:'0.8rem', color:'#666' }}>Subscriber paused delivery for June 5. ₹73 credited back to wallet.</p>
                      </div>
                    </div>

                    <div className="activity-item" style={{ display:'flex', gap:'1rem', alignItems:'center', padding:'1rem 1.25rem', background:'#F8F9FA', borderRadius:'12px' }}>
                      <span style={{ fontSize: '1.25rem' }}>🚀</span>
                      <div>
                        <h4 style={{ margin:0, fontWeight:'700', fontSize:'0.95rem' }}>Vendor application submitted</h4>
                        <p style={{ margin:0, fontSize:'0.8rem', color:'#666' }}>Aai's Tiffin Center submitted onboarding documentations & FSSAI license details.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 2: PARTNER APPROVALS */}
            {activeTab === 'approvals' && (
              <motion.div
                key="approvals"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="db-panel-card"
              >
                <h2>Partner Onboarding Approvals Queue</h2>
                <p>Review mess provider registrations, FSSAI certificate details, and kitchen images before approval.</p>

                <div className="approvals-ledger-list">
                  {applications.length === 0 ? (
                    <div className="empty-state-card text-center" style={{ padding:'3rem 1.5rem', border:'1px dashed #CCC', borderRadius:'12px' }}>
                      <CheckCircle size={32} color="#10B981" style={{ marginBottom:'0.5rem' }} />
                      <h3>Approvals Queue is Empty</h3>
                      <p style={{ color:'#666', fontSize:'0.9rem' }}>All pending partner registrations have been verified.</p>
                    </div>
                  ) : (
                    applications.map((app) => (
                      <div key={app.id} className="approval-card-item">
                        <div className="app-meta">
                          <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                            <div className="badge-area"><MapPin size={12} /> {app.area}</div>
                            <div className="badge-plan" style={{ fontSize: '0.75rem', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', background: app.plan?.includes('999') ? 'rgba(255, 107, 0, 0.1)' : 'rgba(0,0,0,0.05)', color: app.plan?.includes('999') ? 'var(--color-orange)' : '#666' }}>
                              ⚡ {app.plan || "Starter Plan"}
                            </div>
                          </div>
                          <h3>{app.messName}</h3>
                          <p>Owner: <strong>{app.ownerName}</strong> | FSSAI: <code>{app.fssai}</code></p>
                        </div>
                        
                        <div className="app-documents" style={{ display: 'flex', gap: '1rem', margin: '1rem 0' }}>
                          <button className="doc-link-btn" style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', background:'#F8F9FA', border:'1px solid #DDD', borderRadius:'6px', padding:'0.4rem 0.8rem', fontSize:'0.8rem', cursor:'pointer' }}>
                            <FileText size={14} /> FSSAI Certificate.pdf
                          </button>
                          <button className="doc-link-btn" style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', background:'#F8F9FA', border:'1px solid #DDD', borderRadius:'6px', padding:'0.4rem 0.8rem', fontSize:'0.8rem', cursor:'pointer' }}>
                            <FileText size={14} /> Kitchen_Inspection.jpg
                          </button>
                        </div>

                        <div className="app-actions" style={{ display:'flex', gap:'1rem', justifyContent:'flex-end' }}>
                          <button 
                            onClick={() => handleApprovePartner(app.id, false)}
                            className="btn btn-outline" 
                            style={{ padding:'0.5rem 1.25rem', border:'1px solid #C62828', color:'#C62828', fontSize:'0.85rem' }}
                          >
                            <XCircle size={16} /> Reject Application
                          </button>
                          <button 
                            onClick={() => handleApprovePartner(app.id, true)}
                            className="btn btn-primary" 
                            style={{ padding:'0.5rem 1.25rem', background:'#2E7D32', border:'none', fontSize:'0.85rem' }}
                          >
                            <CheckCircle size={16} /> Verify & Approve Partner
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 3: DISPUTE TICKETS */}
            {activeTab === 'disputes' && (
              <motion.div
                key="disputes"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="db-panel-card"
              >
                <h2>Customer Disputes & Refund Desk</h2>
                <p>Initiate direct Razorpay UPI balance refunds or warn mess partners regarding delivery reports.</p>

                <div className="disputes-ledger-list">
                  {disputes.length === 0 ? (
                    <div className="empty-state-card text-center" style={{ padding:'3rem 1.5rem', border:'1px dashed #CCC', borderRadius:'12px' }}>
                      <CheckCircle size={32} color="#10B981" style={{ marginBottom:'0.5rem' }} />
                      <h3>Zero Open Disputes</h3>
                      <p style={{ color:'#666', fontSize:'0.9rem' }}>Great job! No unresolved customer complaints in the queue.</p>
                    </div>
                  ) : (
                    disputes.map((ticket) => (
                      <div key={ticket.id} className="dispute-card-item">
                        <div className="dispute-header-row">
                          <div>
                            <span className="dispute-id-badge">TICKET #DISP{ticket.id}</span>
                            <h3>Customer: {ticket.userName} (+91 {ticket.phone})</h3>
                          </div>
                          <div className="refund-amount-tag">Refund request: <strong>₹{ticket.refundRequested}</strong></div>
                        </div>

                        <div className="dispute-body-details" style={{ margin: '1rem 0', padding: '1rem', background: '#FFF5F5', borderLeft: '3px solid #DC2626', borderRadius: '4px' }}>
                          <p style={{ margin:0, fontSize:'0.95rem', color:'#333' }}>
                            <strong>Complaint Detail:</strong> "{ticket.issue}"
                          </p>
                          <p style={{ margin:'0.5rem 0 0 0', fontSize:'0.85rem', color:'#666' }}>
                            Tiffin provider responsible: <strong>{ticket.vendorName}</strong>
                          </p>
                        </div>

                        <div className="dispute-actions" style={{ display:'flex', gap:'1rem', justifyContent:'flex-end' }}>
                          <button 
                            onClick={() => {
                              const note = prompt("Enter warning warning note for vendor:");
                              if (note) alert("Warning notification dispatched to vendor account.");
                            }}
                            className="btn btn-outline" 
                            style={{ padding:'0.5rem 1.25rem', border:'1px solid #E65C00', color:'#E65C00', fontSize:'0.85rem' }}
                          >
                            <AlertTriangle size={16} /> Warn Vendor
                          </button>
                          <button 
                            onClick={() => handleResolveDispute(ticket.id, false)}
                            className="btn btn-outline" 
                            style={{ padding:'0.5rem 1.25rem', border:'1px solid #555', color:'#555', fontSize:'0.85rem' }}
                          >
                            Resolve Ticket (No Refund)
                          </button>
                          <button 
                            onClick={() => handleResolveDispute(ticket.id, true)}
                            className="btn btn-primary" 
                            style={{ padding:'0.5rem 1.25rem', background:'#7A1F1F', border:'none', fontSize:'0.85rem' }}
                          >
                            <Send size={16} /> Issue Refund to UPI
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 4: GLOBAL PRICING CONTROL */}
            {activeTab === 'pricing' && (
              <motion.div
                key="pricing"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="db-panel-card"
              >
                <h2>Global Tiffin Plan Rates Control</h2>
                <p>As the platform Administrator, you have exclusive authorization to modify the pricing structure of on-boarded messes. Changes published here are dynamically broadcast live across the customer portal.</p>

                <div className="pricing-controller-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', marginTop: '2rem' }}>
                  <div className="pricing-fields-card glassmorphism" style={{ border: '1px solid rgba(255, 107, 0, 0.15)', borderRadius: '16px', padding: '2rem', background: '#FFFDFB' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '1.5rem', color: 'var(--color-orange)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <DollarSign size={20} /> Modify Marketplace Plan Prices
                    </h3>
                    <form onSubmit={handleSaveRates}>
                      <div className="db-form-group" style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#374151', marginBottom: '0.5rem' }}>Daily Tiffin Rate (₹)</label>
                        <input 
                          type="number" 
                          className="db-inline-input" 
                          value={dailyRate} 
                          onChange={(e) => setDailyRate(parseInt(e.target.value) || 0)} 
                          style={{ height: '44px', padding: '0 1rem', width: '100%', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '1rem', background: '#fff' }} 
                        />
                        <span style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '6px', display: 'block' }}>
                          Platform Commission fee (12%): <strong>-₹{(dailyRate * 0.12).toFixed(2)}</strong> | Mess Partner net payout: <strong>₹{(dailyRate * 0.88).toFixed(2)}</strong>
                        </span>
                      </div>
                      
                      <div className="db-form-group" style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', fontWeight: '700', fontSize: '0.9rem', color: '#374151', marginBottom: '0.5rem' }}>Monthly Tiffin Subscription Rate (₹)</label>
                        <input 
                          type="number" 
                          className="db-inline-input" 
                          value={monthlyRate} 
                          onChange={(e) => setMonthlyRate(parseInt(e.target.value) || 0)} 
                          style={{ height: '44px', padding: '0 1rem', width: '100%', border: '1.5px solid #E5E7EB', borderRadius: '8px', fontSize: '1rem', background: '#fff' }} 
                        />
                        <span style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '6px', display: 'block' }}>
                          Platform Commission fee (12%): <strong>-₹{(monthlyRate * 0.12).toFixed(2)}</strong> | Mess Partner net payout: <strong>₹{(monthlyRate * 0.88).toFixed(2)}</strong>
                        </span>
                      </div>

                      <button 
                        type="submit" 
                        className="btn btn-primary" 
                        disabled={isSavingRates}
                        style={{ width: '100%', background: 'var(--color-orange)', padding: '0.8rem 1.5rem', border: 'none', borderRadius: '8px', color: 'white', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                      >
                        {isSavingRates ? (
                          <>
                            <RefreshCw size={14} className="animate-spin" /> Saving Global Rates...
                          </>
                        ) : 'Publish Rates Live'}
                      </button>

                      {saveSuccess && (
                        <div style={{ marginTop: '1rem', padding: '0.75rem', background: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', fontSize: '0.85rem', fontWeight: '700', textAlign: 'center', borderRadius: '8px' }}>
                          ✓ Global platform rates successfully updated & published live!
                        </div>
                      )}
                    </form>
                  </div>

                  <div className="pricing-info-card glassmorphism" style={{ border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem', height: 'fit-content' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#333' }}>Marketplace Guidelines</h3>
                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5', margin: 0 }}>
                      Rates published here represent the baseline prices for our Featured Mess Partners (e.g., Shivneri Mess veg thali details).
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5', margin: 0 }}>
                      Commission fee splits are automatically calculated at a flat rate of <strong>12%</strong>. These fees cover delivery network support, platform maintenance, and secure transaction handling costs.
                    </p>
                    <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: '1.5', margin: 0 }}>
                      Adjustments will apply immediately to all new subscriptions. Existing subscribers will remain on their active billing rates until renewal.
                    </p>
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

export default AdminDashboard;
