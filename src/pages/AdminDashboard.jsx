import React, { useState, useEffect } from 'react';
import { 
  BarChart, Users, Store, ShieldAlert, Award, 
  CheckCircle, XCircle, FileText, Send, AlertTriangle, 
  MapPin, HelpCircle, UserCheck, DollarSign, RefreshCw, Settings,
  Trash2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { db } from '../config/firebase';
import { collection, onSnapshot, doc, updateDoc, deleteDoc, setDoc } from 'firebase/firestore';
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
  const { userRole, loading } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!loading && userRole !== 'admin') {
      navigate('/');
    }
  }, [navigate, userRole, loading]);

  const [activeTab, setActiveTab] = useState('overview'); 
  const [applications, setApplications] = useState([]);
  const [disputes, setDisputes] = useState(INITIAL_DISPUTES);
  const [vendors, setVendors] = useState([]);
  const [usersList, setUsersList] = useState([]);

  // Platform global counts
  const [totalRevenue, setTotalRevenue] = useState(345200);
  const [totalSubscribers, setTotalSubscribers] = useState(1240);
  const [activeVendors, setActiveVendors] = useState(0);

  // Global platform pricing rate states
  const [dailyRate, setDailyRate] = useState(70);
  const [monthlyRate, setMonthlyRate] = useState(2100);
  const [isSavingRates, setIsSavingRates] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (userRole !== 'admin') return;

    const unsubApps = onSnapshot(collection(db, 'applications'), (snapshot) => {
      setApplications(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    const unsubVendors = onSnapshot(collection(db, 'vendors'), (snapshot) => {
      const v = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVendors(v);
      setActiveVendors(v.filter(x => x.status === 'Active').length);
    });

    const unsubSettings = onSnapshot(doc(db, 'settings', 'globalPricing'), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.dailyRate) setDailyRate(data.dailyRate);
        if (data.monthlyRate) setMonthlyRate(data.monthlyRate);
      }
    });

    return () => {
      unsubApps();
      unsubVendors();
      unsubSettings();
    };
  }, [userRole]);



  const handleDeleteUser = (phone) => {
    if (window.confirm("Are you sure you want to delete this user registration permanently?")) {
      const updated = usersList.filter(u => u.phone !== phone);
      setUsersList(updated);
      localStorage.setItem('userAccounts', JSON.stringify(updated));
      alert("User registration deleted successfully.");
    }
  };

  const handleSaveRates = async (e) => {
    e.preventDefault();
    setIsSavingRates(true);
    
    try {
      await setDoc(doc(db, 'settings', 'globalPricing'), {
        dailyRate,
        monthlyRate
      });
      setIsSavingRates(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      setIsSavingRates(false);
    }
  };

  // Handle partner onboarding approvals
  const handleApprovePartner = async (id, approved = true) => {
    const targetApp = applications.find(app => app.id === id);
    if (!targetApp) return;

    if (approved) {
      const isGrowthPlan = targetApp.plan?.includes('999');
      const newApprovedVendor = {
        name: targetApp.messName,
        ownerName: targetApp.ownerName,
        area: targetApp.area || targetApp.location || "Rajarampuri",
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
        selectedPlan: targetApp.plan || "",
        description: targetApp.description || "Authentic home-style food prepared fresh daily with local ingredients.",
        nearArea: targetApp.nearArea || "Near College",
        image: targetApp.image || "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
        status: "Active",
        vendorId: targetApp.vendorId || id,
        coords: { top: `${30 + Math.random() * 40}%`, left: `${20 + Math.random() * 60}%` }
      };

      try {
        await setDoc(doc(db, 'vendors', targetApp.vendorId || id), newApprovedVendor);
        await deleteDoc(doc(db, 'applications', id));
        if (isGrowthPlan) {
          alert(`Growth Plan Partner Approved! "${targetApp.messName}" is now active and listed in the Featured Mess section with a Premium badge.`);
        } else {
          alert(`Starter Partner Approved! "${targetApp.messName}" is now active in the directory list.`);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        await deleteDoc(doc(db, 'applications', id));
        alert("Vendor onboarding request rejected.");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleDeleteVendor = async (id) => {
    if (window.confirm("Are you sure you want to delete/remove this vendor permanently from the marketplace?")) {
      try {
        await deleteDoc(doc(db, 'vendors', id));
        alert("Vendor deleted successfully.");
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleToggleHoldVendor = async (id, currentStatus) => {
    const newStatus = currentStatus === "On Hold" ? "Active" : "On Hold";
    try {
      await updateDoc(doc(db, 'vendors', id), { status: newStatus });
      alert(`Vendor status changed to: ${newStatus}`);
    } catch (err) {
      console.error(err);
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
              className={`db-tab-btn ${activeTab === 'vendors' ? 'active' : ''}`}
              onClick={() => setActiveTab('vendors')}
            >
              <Store size={18} /> Manage Vendors
            </button>
            <button 
              className={`db-tab-btn ${activeTab === 'users' ? 'active' : ''}`}
              onClick={() => setActiveTab('users')}
            >
              <Users size={18} /> User Registrations
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
                      <div key={app.id} className="approval-card-item" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {/* Top row with meta and image */}
                        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'space-between', alignItems: 'flex-start', width: '100%' }}>
                          <div style={{ flex: 1 }}>
                            <div className="app-meta">
                              <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}>
                                <div className="badge-area"><MapPin size={12} /> {app.area}</div>
                                <div className="badge-plan" style={{ fontSize: '0.75rem', fontWeight: '700', padding: '2px 8px', borderRadius: '4px', background: app.plan?.includes('999') ? 'rgba(255, 107, 0, 0.1)' : 'rgba(0,0,0,0.05)', color: app.plan?.includes('999') ? 'var(--color-orange)' : '#666' }}>
                                  ⚡ {app.plan || "Starter Plan"}
                                </div>
                              </div>
                              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', fontWeight: '850' }}>{app.messName}</h3>
                              <p style={{ margin: 0, color: 'var(--color-gray-500)', fontSize: '0.9rem' }}>Owner: <strong>{app.ownerName}</strong> | FSSAI: <code>{app.fssai}</code></p>
                              {app.description && <p style={{ marginTop: '0.5rem', fontStyle: 'italic', fontSize: '0.85rem', color: '#888' }}>"{app.description}"</p>}
                            </div>
                          </div>
                          {app.image && (
                            <div className="approval-app-image-wrap" style={{ flexShrink: 0, marginTop: '0.5rem' }}>
                              <img 
                                src={app.image} 
                                alt="Kitchen Upload" 
                                style={{ width: '120px', height: '90px', borderRadius: '8px', objectFit: 'cover', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }} 
                              />
                            </div>
                          )}
                        </div>
                        
                        {/* Footer row with documents and action buttons */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', borderTop: '1px solid #EEE', paddingTop: '1rem', flexWrap: 'wrap', gap: '1rem', width: '100%' }}>
                          <div className="app-documents" style={{ display: 'flex', gap: '1rem' }}>
                            <button className="doc-link-btn" style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', background:'#F8F9FA', border:'1px solid #DDD', borderRadius:'6px', padding:'0.4rem 0.8rem', fontSize:'0.8rem', cursor:'pointer' }}>
                              <FileText size={14} /> FSSAI Certificate.pdf
                            </button>
                            <button className="doc-link-btn" style={{ display:'inline-flex', alignItems:'center', gap:'0.4rem', background:'#F8F9FA', border:'1px solid #DDD', borderRadius:'6px', padding:'0.4rem 0.8rem', fontSize:'0.8rem', cursor:'pointer' }}>
                              <FileText size={14} /> Kitchen_Inspection.jpg
                            </button>
                          </div>

                          <div className="app-actions" style={{ display:'flex', gap:'1rem' }}>
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
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            )}

            {/* TAB 5: MANAGE VENDORS */}
            {activeTab === 'vendors' && (
              <motion.div
                key="vendors"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="db-panel-card"
              >
                <h2>Manage Marketplace Vendors</h2>
                <p>View active messes, put partners on hold/suspend them, or remove them permanently from the directory listings.</p>

                <div className="vendors-management-table-wrapper" style={{ overflowX: 'auto', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', background: 'white', marginTop: '1.5rem' }}>
                  <table className="db-custom-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr>
                        <th>Mess Info</th>
                        <th>Location</th>
                        <th>Base Price</th>
                        <th>Rating</th>
                        <th>Status</th>
                        <th style={{ textAlign: 'right' }}>Actions Control</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendors.map((v) => (
                        <tr key={v.id}>
                          <td>
                            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                              <img src={v.image} alt={v.name} style={{ width: '50px', height: '50px', borderRadius: '8px', objectFit: 'cover' }} />
                              <div>
                                <h4 style={{ margin: 0, fontWeight: '800' }}>{v.name || v.messName}</h4>
                                {v.isPremium && <span style={{ fontSize: '0.65rem', fontWeight: '800', color: '#B25E00', background: '#FFF3D6', padding: '2px 6px', borderRadius: '4px', display: 'inline-block', marginTop: '2px' }}>👑 PREMIUM</span>}
                              </div>
                            </div>
                          </td>
                          <td><MapPin size={12} style={{ display: 'inline', marginRight: '4px' }} /> {v.area}</td>
                          <td><strong>₹{v.price}</strong></td>
                          <td>⭐ {v.rating || 4.7}</td>
                          <td>
                            <span 
                              className={`tag ${v.status === 'On Hold' ? 'nonveg' : 'veg'}`} 
                              style={{ 
                                padding: '4px 10px', 
                                borderRadius: '20px', 
                                fontSize: '0.75rem', 
                                fontWeight: '800', 
                                background: v.status === 'On Hold' ? '#FEF2F2' : '#ECFDF5', 
                                color: v.status === 'On Hold' ? '#DC2626' : '#10B981' 
                              }}
                            >
                              {v.status === 'On Hold' ? '⏸ On Hold' : '✓ Active'}
                            </span>
                          </td>
                          <td style={{ textAlign: 'right' }}>
                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                              <button
                                onClick={() => handleToggleHoldVendor(v.id, v.status)}
                                className="btn-status-hold"
                                style={{
                                  padding: '0.4rem 0.8rem',
                                  fontSize: '0.75rem',
                                  fontWeight: '700',
                                  borderRadius: '6px',
                                  border: '1.5px solid #DDD',
                                  background: 'white',
                                  cursor: 'pointer',
                                  color: '#333',
                                  transition: 'all 0.2s'
                                }}
                              >
                                {v.status === 'On Hold' ? '▶ Resume' : '⏸ Put Hold'}
                              </button>
                              <button
                                onClick={() => handleDeleteVendor(v.id)}
                                className="btn-status-delete"
                                style={{
                                  padding: '0.4rem 0.8rem',
                                  fontSize: '0.75rem',
                                  fontWeight: '700',
                                  borderRadius: '6px',
                                  border: '1.5px solid #FEE2E2',
                                  background: '#FEF2F2',
                                  cursor: 'pointer',
                                  color: '#DC2626',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  transition: 'all 0.2s'
                                }}
                              >
                                <Trash2 size={12} /> Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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

            {/* TAB 5: USER REGISTRATIONS */}
            {activeTab === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="db-panel-card"
              >
                <h2>User Registrations Database</h2>
                <p>View and manage all registered customer accounts who have signed up on the platform.</p>

                <div className="vendors-management-table-wrapper" style={{ overflowX: 'auto', border: '1px solid rgba(0,0,0,0.05)', borderRadius: '12px', background: 'white', marginTop: '1.5rem' }}>
                  <table className="db-custom-table" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                      <tr>
                        <th>Username</th>
                        <th>Email Address</th>
                        <th>Phone Number</th>
                        <th>Registered Date</th>
                        <th style={{ textAlign: 'right' }}>Actions Control</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersList.length === 0 ? (
                        <tr>
                          <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: '#666' }}>
                            No users registered yet on the platform.
                          </td>
                        </tr>
                      ) : (
                        usersList.map((u, index) => (
                          <tr key={u.phone || index}>
                            <td>
                              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: '#FFF0E6', color: '#FF6B00', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.85rem' }}>
                                  {u.username?.charAt(0).toUpperCase() || 'U'}
                                </div>
                                <span style={{ fontWeight: '800', color: '#333' }}>{u.username}</span>
                              </div>
                            </td>
                            <td>{u.email}</td>
                            <td><strong>{u.phone}</strong></td>
                            <td>{new Date(u.registeredAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</td>
                            <td style={{ textAlign: 'right' }}>
                              <button
                                onClick={() => handleDeleteUser(u.phone)}
                                className="btn-status-delete"
                                style={{
                                  padding: '0.4rem 0.8rem',
                                  fontSize: '0.75rem',
                                  fontWeight: '700',
                                  borderRadius: '6px',
                                  border: '1.5px solid #FEE2E2',
                                  background: '#FEF2F2',
                                  cursor: 'pointer',
                                  color: '#DC2626',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '0.25rem',
                                  transition: 'all 0.2s'
                                }}
                              >
                                <Trash2 size={12} /> Delete User
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
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
