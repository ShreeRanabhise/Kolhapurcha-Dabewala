import React, { useState, useEffect } from 'react';
import { 
  Users, CheckCircle2, DollarSign, Store, Clock, 
  MapPin, Phone, MessageSquare, ShieldCheck, Printer, 
  Coffee, AlertCircle, TrendingUp, CheckCircle, RefreshCw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './VendorDashboard.css';

// Mock Subscriber Data feeding Shivaji/Suvarna Messes
const INITIAL_SUBSCRIBERS = [
  { id: 101, name: "Prathamesh Patil", phone: "9823456781", address: "Room 12, Shivaji Hostel, Rajarampuri 6th Lane", preference: "Pure Veg", timeSlot: "Lunch & Dinner", notes: "No onions, extra spicy", status: "Active" },
  { id: 102, name: "Snehal Deshmukh", phone: "9561234789", address: "Flat 201, Shanti Niketan, Tarabai Park", preference: "Pure Veg", timeSlot: "Lunch Only", notes: "2 Extra Chapatis", status: "Active" },
  { id: 103, name: "Aniket More", phone: "8888991234", address: "Shivaji University Hostel No. 3, Room 45", preference: "Non-Veg (Wednesday Special)", timeSlot: "Lunch & Dinner", notes: "Prefers drumsticks", status: "Active" },
  { id: 104, name: "Rahul Jadhav", phone: "7020112233", address: "Midc Gokul Shirgaon, Plot P-80, Staff quarters", preference: "Pure Veg", timeSlot: "Lunch Only", notes: "Deliver by 1:00 PM sharp", status: "Active" },
  { id: 105, name: "Pooja Kadam", phone: "9921456123", address: "Block B, Mauli Niwas, Uchgaon", preference: "Pure Veg", timeSlot: "Lunch & Dinner", notes: "No garlic", status: "Active" }
];

// Mock dispatch checklist items
const INITIAL_DISPATCHES = [
  { id: 201, customerName: "Prathamesh Patil", preference: "Pure Veg", slot: "Lunch", address: "Rajarampuri 6th Lane", status: "Preparing" },
  { id: 202, customerName: "Snehal Deshmukh", preference: "Pure Veg", slot: "Lunch", address: "Tarabai Park", status: "Dispatched" },
  { id: 203, customerName: "Aniket More", preference: "Non-Veg", slot: "Lunch", address: "Shivaji University", status: "Preparing" },
  { id: 204, customerName: "Rahul Jadhav", preference: "Pure Veg", slot: "Lunch", address: "MIDC", status: "Delivered" },
  { id: 205, customerName: "Pooja Kadam", preference: "Pure Veg", slot: "Lunch", address: "Uchgaon", status: "Preparing" }
];

const VendorDashboard = () => {
  const navigate = useNavigate();
  const { userRole, loading } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!loading && userRole !== 'vendor') {
      navigate('/');
    }
  }, [navigate, userRole, loading]);

  const [activeTab, setActiveTab] = useState('dispatches'); // 'dispatches', 'subscribers', 'earnings', 'profile'
  const [subscribers, setSubscribers] = useState(INITIAL_SUBSCRIBERS);
  const [dispatches, setDispatches] = useState(INITIAL_DISPATCHES);
  
  // Kitchen settings states
  const [isKitchenOpen, setIsKitchenOpen] = useState(true);
  const [todaySpecial, setTodaySpecial] = useState("Kolhapuri Veg Maratha + Masala Taak");



  // Counters
  const totalVegDispatches = dispatches.filter(d => d.preference === "Pure Veg").length;
  const totalNonVegDispatches = dispatches.filter(d => d.preference !== "Pure Veg").length;
  const totalDelivered = dispatches.filter(d => d.status === "Delivered").length;
  
  // Toggle status of a tiffin dispatch
  const advanceDispatchStatus = (id) => {
    setDispatches(dispatches.map(item => {
      if (item.id === id) {
        let newStatus = "Preparing";
        if (item.status === "Preparing") newStatus = "Dispatched";
        else if (item.status === "Dispatched") newStatus = "Delivered";
        else if (item.status === "Delivered") newStatus = "Preparing";
        return { ...item, status: newStatus };
      }
      return item;
    }));
  };

  return (
    <div className="dashboard-page">
      <div className="container dashboard-container">
        
        {/* SIDEBAR */}
        <div className="db-sidebar glassmorphism">
          <div className="db-user-profile">
            <div className="db-user-avatar kitchen">
              <Store size={32} />
            </div>
            <div className="db-user-info">
              <h4>Shivneri Mess</h4>
              <p>Vendor Dashboard</p>
            </div>
          </div>

          <div className="kitchen-status-control" style={{ padding: '0.85rem 1rem', background: '#F8F9FA', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '1rem 0' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#555' }}>
              Kitchen: {isKitchenOpen ? <strong style={{ color: '#10B981' }}>OPEN</strong> : <strong style={{ color: '#DC2626' }}>CLOSED</strong>}
            </span>
            <button 
              onClick={() => setIsKitchenOpen(!isKitchenOpen)}
              className={`toggle-switch-btn ${isKitchenOpen ? 'open' : 'closed'}`}
              style={{ padding: '0.25rem 0.6rem', border: 'none', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '700', color: 'white', background: isKitchenOpen ? '#10B981' : '#DC2626', cursor: 'pointer' }}
            >
              Toggle
            </button>
          </div>

          <hr className="db-divider" />
          <nav className="db-nav-links">
            <button 
              className={`db-tab-btn ${activeTab === 'dispatches' ? 'active' : ''}`}
              onClick={() => setActiveTab('dispatches')}
            >
              <CheckCircle2 size={18} /> Daily Dispatches
            </button>
            <button 
              className={`db-tab-btn ${activeTab === 'subscribers' ? 'active' : ''}`}
              onClick={() => setActiveTab('subscribers')}
            >
              <Users size={18} /> Subscribers List
            </button>
            <button 
              className={`db-tab-btn ${activeTab === 'earnings' ? 'active' : ''}`}
              onClick={() => setActiveTab('earnings')}
            >
              <DollarSign size={18} /> Earnings & Payouts
            </button>
            <button 
              className={`db-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              <Store size={18} /> Kitchen Profile
            </button>
          </nav>
        </div>

        {/* CONTENT */}
        <div className="db-content-panel">
          <AnimatePresence mode="wait">
            
            {/* TAB 1: DAILY DISPATCHES */}
            {activeTab === 'dispatches' && (
              <motion.div
                key="dispatches"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="db-panel-card"
              >
                <div className="panel-header-row">
                  <div>
                    <h2>Today's Tiffin Dispatch Ledger</h2>
                    <p>Track preparation, click dispatches, and confirm delivery. Paused subscriber days are hidden automatically.</p>
                  </div>
                  <button className="btn-print-list" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', border: '1px solid #CCC', borderRadius: '8px', padding: '0.5rem 1rem', fontWeight: '600', fontSize: '0.85rem', cursor: 'pointer' }}>
                    <Printer size={16} /> Print Delivery Sheets
                  </button>
                </div>

                {/* Dispatch Statistics counter widget */}
                <div className="dispatch-stats-row">
                  <div className="d-stat-box green">
                    <h3>{totalVegDispatches}</h3>
                    <p>Pure Veg Meals</p>
                  </div>
                  <div className="d-stat-box red">
                    <h3>{totalNonVegDispatches}</h3>
                    <p>Non-Veg Meals</p>
                  </div>
                  <div className="d-stat-box orange">
                    <h3>{totalDelivered} / {dispatches.length}</h3>
                    <p>Delivered Orders</p>
                  </div>
                  <div className="d-stat-box grey">
                    <h3>2</h3>
                    <p>Paused Today</p>
                  </div>
                </div>

                <div className="today-special-menu-bar" style={{ display: 'flex', gap: '1rem', alignItems: 'center', background: '#FFFDF0', border: '1px solid #FFE0B2', borderRadius: '12px', padding: '1.25rem', marginBottom: '2rem' }}>
                  <Coffee size={24} className="text-secondary" />
                  <div style={{ flex: 1 }}>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', textTransform: 'uppercase', color: '#E65C00' }}>Today's Dispatch Menu:</span>
                    <h4 style={{ margin: '2px 0 0 0', fontSize: '1.05rem', color: '#333' }}>{todaySpecial}</h4>
                  </div>
                  <button onClick={() => {
                    const newMenu = prompt("Update today's menu:", todaySpecial);
                    if (newMenu) setTodaySpecial(newMenu);
                  }} className="btn-edit-special" style={{ border: 'none', background: 'none', color: 'var(--color-maroon)', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}>Edit Menu</button>
                </div>

                {/* Dispatches Checklist Grid */}
                <div className="dispatches-table-container">
                  <table className="db-custom-table">
                    <thead>
                      <tr>
                        <th>Tiffin ID</th>
                        <th>Subscriber Name</th>
                        <th>Preference</th>
                        <th>Time Slot</th>
                        <th>Delivery Destination</th>
                        <th>Status Checklist</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dispatches.map((item) => (
                        <tr key={item.id}>
                          <td><strong>#TIF{item.id}</strong></td>
                          <td>{item.customerName}</td>
                          <td>
                            <span className={`tag ${item.preference === 'Pure Veg' ? 'veg' : 'nonveg'}`}>
                              {item.preference}
                            </span>
                          </td>
                          <td><span className="badge-slot">{item.slot}</span></td>
                          <td><MapPin size={12} style={{ display: 'inline', marginRight: '4px', verticalAlign: 'middle' }}/> {item.address}</td>
                          <td>
                            <button 
                              onClick={() => advanceDispatchStatus(item.id)}
                              className={`status-dispatch-btn ${item.status.toLowerCase()}`}
                            >
                              {item.status === 'Preparing' && '🥣 Prep Completed'}
                              {item.status === 'Dispatched' && '🚴 Out for Delivery'}
                              {item.status === 'Delivered' && '✓ Delivered Successfully'}
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* TAB 2: SUBSCRIBERS LIST */}
            {activeTab === 'subscribers' && (
              <motion.div
                key="subscribers"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="db-panel-card"
              >
                <h2>Active Tiffin Subscribers</h2>
                <p>Verify plan timelines, delivery location addresses, and customer notes directly.</p>

                <div className="subscribers-spreadsheet-wrapper">
                  <table className="db-custom-table">
                    <thead>
                      <tr>
                        <th>Subscriber ID</th>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Preferences</th>
                        <th>Delivery Address</th>
                        <th>Special Instruction Notes</th>
                        <th>WhatsApp Connect</th>
                      </tr>
                    </thead>
                    <tbody>
                      {subscribers.map((sub) => (
                        <tr key={sub.id}>
                          <td><strong>#SUB{sub.id}</strong></td>
                          <td><strong>{sub.name}</strong></td>
                          <td><Phone size={12} style={{ display:'inline', marginRight:'4px' }}/> {sub.phone}</td>
                          <td>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                              <span className={`tag ${sub.preference.includes('Veg') ? 'veg' : 'nonveg'}`} style={{ width: 'fit-content' }}>{sub.preference}</span>
                              <span className="badge-slot" style={{ width: 'fit-content', fontSize: '10px' }}>{sub.timeSlot}</span>
                            </div>
                          </td>
                          <td style={{ fontSize: '0.85rem', maxWidth: '250px' }}>{sub.address}</td>
                          <td style={{ fontStyle: 'italic', fontSize: '0.85rem', color: '#666' }}>"{sub.notes}"</td>
                          <td>
                            <a 
                              href={`https://wa.me/91${sub.phone}`} 
                              target="_blank" 
                              rel="noreferrer"
                              className="whatsapp-contact-link-circle"
                              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '32px', height: '32px', borderRadius: '50%', background: '#E8F5E9', color: '#2E7D32', border: 'none' }}
                            >
                              <MessageSquare size={16} />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {/* TAB 3: EARNINGS & PAYOUTS */}
            {activeTab === 'earnings' && (
              <motion.div
                key="earnings"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="db-panel-card"
              >
                <h2>Earnings & Platforms Payout Ledger</h2>
                <p>Payout sums are verified daily and settled to your linked bank account every Monday morning.</p>

                <div className="earnings-summary-grid">
                  <div className="earning-stat-card glassmorphism">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span className="stat-card-title">MONTHLY REVENUE</span>
                      <TrendingUp size={18} className="text-secondary" />
                    </div>
                    <h3>₹82,450</h3>
                    <p style={{ color: '#10B981', fontWeight: '700', fontSize: '0.8rem', margin: '4px 0 0 0' }}>+12% vs last month</p>
                  </div>

                  <div className="earning-stat-card glassmorphism">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span className="stat-card-title">COMMISSION (12%)</span>
                      <AlertCircle size={18} color="#C62828" />
                    </div>
                    <h3 style={{ color: '#C62828' }}>- ₹9,894</h3>
                    <p style={{ color: '#999', fontSize: '0.8rem', margin: '4px 0 0 0' }}>Fixed platform charges</p>
                  </div>

                  <div className="earning-stat-card glassmorphism highlighted">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <span className="stat-card-title">NET PAYOUT SETTLED</span>
                      <ShieldCheck size={18} color="#10B981" />
                    </div>
                    <h3 style={{ color: '#10B981' }}>₹72,556</h3>
                    <p style={{ color: '#10B981', fontWeight: '700', fontSize: '0.8rem', margin: '4px 0 0 0' }}>Paid to State Bank of India</p>
                  </div>
                </div>

                {/* Payout history logs */}
                <div className="payout-history-ledger" style={{ marginTop: '3rem' }}>
                  <h3>Settlement Payout Logs</h3>
                  <div className="payout-log-list">
                    <div className="payout-log-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', background: '#F8F9FA', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)', marginBottom: '1rem' }}>
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', fontWeight: '700' }}>Payout Ref: SET8091823</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>Date settled: May 26, 2026 to A/c ...8902</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#10B981' }}>₹18,245.00</span>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#10B981', background: '#ECFDF5', padding: '2px 8px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' }}>SETTLED</div>
                      </div>
                    </div>

                    <div className="payout-log-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 1.5rem', background: '#F8F9FA', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.02)', marginBottom: '1rem' }}>
                      <div>
                        <h4 style={{ margin: '0 0 4px 0', fontWeight: '700' }}>Payout Ref: SET8091562</h4>
                        <p style={{ margin: 0, fontSize: '0.8rem', color: '#666' }}>Date settled: May 19, 2026 to A/c ...8902</p>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1.1rem', fontWeight: '800', color: '#10B981' }}>₹16,420.00</span>
                        <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#10B981', background: '#ECFDF5', padding: '2px 8px', borderRadius: '4px', marginTop: '4px', display: 'inline-block' }}>SETTLED</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* TAB 4: KITCHEN PROFILE */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="db-panel-card"
              >
                <h2>Kitchen Profile & Credentials</h2>
                <p>Manage your food license verification details, kitchen pictures, and pricing plan options.</p>

                <div className="kitchen-profile-settings-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '2rem', marginTop: '1.5rem' }}>
                  <div className="profile-fields-list" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div className="db-form-group">
                      <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', color: '#555', marginBottom: '0.5rem' }}>Mess / Kitchen Business Name</label>
                      <input type="text" className="db-inline-input" defaultValue="Shivneri Mess" style={{ height: '44px', padding: '0 1rem' }} />
                    </div>
                    <div className="db-form-group">
                      <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', color: '#555', marginBottom: '0.5rem' }}>Owner Full Name</label>
                      <input type="text" className="db-inline-input" defaultValue="Suhas Patil" style={{ height: '44px', padding: '0 1rem' }} />
                    </div>
                    <div className="db-form-group">
                      <label style={{ display: 'block', fontWeight: '700', fontSize: '0.85rem', color: '#555', marginBottom: '0.5rem' }}>FSSAI Registration License Number</label>
                      <input type="text" className="db-inline-input" defaultValue="21526084000192" disabled style={{ height: '44px', padding: '0 1rem', background: '#F8F9FA' }} />
                    </div>
                    <button className="btn btn-primary" style={{ background: '#7A1F1F', alignSelf: 'flex-start', padding: '0.75rem 2rem', border: 'none', borderRadius: '8px', color: 'white', fontWeight: '700', cursor: 'pointer' }}>Update Profile Settings</button>
                  </div>

                  <div className="kitchen-documents-box glassmorphism" style={{ border: '1px solid rgba(0,0,0,0.05)', borderRadius: '16px', padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '1rem' }}>Verification Certificates</h3>
                    <div className="doc-item" style={{ display: 'flex', gap: '0.85rem', alignItems: 'center', marginBottom: '1rem' }}>
                      <ShieldCheck size={28} color="#10B981" />
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700' }}>FSSAI License Approved</h4>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>Valid until Dec 2028</p>
                      </div>
                    </div>
                    <div className="doc-item" style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                      <ShieldCheck size={28} color="#10B981" />
                      <div>
                        <h4 style={{ margin: 0, fontSize: '0.9rem', fontWeight: '700' }}>GSTIN Verified</h4>
                        <p style={{ margin: 0, fontSize: '0.75rem', color: '#666' }}>Approved Partner status active</p>
                      </div>
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

export default VendorDashboard;
