import { useState, useEffect } from 'react';
import { Menu, X, Heart, Bell, User, LogOut, ChevronDown } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import AuthModal from './AuthModal';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [userPhone, setUserPhone] = useState(localStorage.getItem('userPhone') || '');
  const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
  const [authPrefillPhone, setAuthPrefillPhone] = useState('');
  const [likedMesses, setLikedMesses] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [isLikesOpen, setIsLikesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    // Initial load
    const savedLikes = localStorage.getItem('likedMesses');
    if (savedLikes) {
      try { setLikedMesses(JSON.parse(savedLikes)); } catch (e) { console.error(e); }
    }

    // Load or initialize notifications
    const initNotifications = () => {
      const savedNotifs = localStorage.getItem('notifications');
      if (savedNotifs) {
        try {
          setNotifications(JSON.parse(savedNotifs));
          return;
        } catch (e) {
          console.error(e);
        }
      }
      
      // Default notifications based on logged-in role
      const phone = localStorage.getItem('userPhone') || '';
      let defaults = [];
      if (phone === '9999999999') {
        defaults = [
          { id: 1, title: "New Mess Application 📝", desc: "Mauli Tiffin Service applied as partner.", time: "5 mins ago", read: false, type: "info" },
          { id: 2, title: "Verification Scheduled 📅", desc: "Kitchen check for Gharandaaz Meals at 2 PM.", time: "1 hour ago", read: false, type: "info" },
          { id: 3, title: "Report Filed ⚠️", desc: "A subscriber reported a late delivery.", time: "1 day ago", read: true, type: "warning" }
        ];
      } else if (phone === '8888888888') {
        defaults = [
          { id: 1, title: "New Subscriber! 🎉", desc: "Rohan Patil subscribed to Veg Plan.", time: "10 mins ago", read: false, type: "success" },
          { id: 2, title: "Payment Disbursed 💰", desc: "Weekly payout of ₹12,500 settled.", time: "4 hours ago", read: false, type: "payment" },
          { id: 3, title: "Hygiene Review Passed ⭐", desc: "Your kitchen scored 4.9 in the inspection.", time: "2 days ago", read: true, type: "review" }
        ];
      } else {
        defaults = [
          { id: 1, title: "Tiffin is on the way! 🛵", desc: "Your delivery from Shivneri Mess has started.", time: "15 mins ago", read: false, type: "delivery" },
          { id: 2, title: "Subscription Renewed 💳", desc: "Monthly payment processed successfully.", time: "1 day ago", read: false, type: "success" },
          { id: 3, title: "FSSAI Inspection Passed ✅", desc: "All messes verified for food hygiene.", time: "3 days ago", read: true, type: "info" }
        ];
      }
      setNotifications(defaults);
      localStorage.setItem('notifications', JSON.stringify(defaults));
    };

    initNotifications();

    // Listeners for updates from other components
    const handleLikesUpdated = (e) => {
      setLikedMesses(e.detail || []);
    };
    
    const handleNotifsUpdated = (e) => {
      setNotifications(e.detail || []);
    };

    window.addEventListener('favorites-updated', handleLikesUpdated);
    window.addEventListener('notifications-updated', handleNotifsUpdated);

    // Click outside handler
    const handleClickOutside = (e) => {
      if (!e.target.closest('.popover-wrapper')) {
        setIsLikesOpen(false);
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('favorites-updated', handleLikesUpdated);
      window.removeEventListener('notifications-updated', handleNotifsUpdated);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [userPhone]);

  const handleRemoveFavorite = (id, e) => {
    e.stopPropagation();
    const updated = likedMesses.filter(item => item.id !== id);
    setLikedMesses(updated);
    localStorage.setItem('likedMesses', JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('favorites-updated', { detail: updated }));
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map(n => ({ ...n, read: true }));
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  const handleClearAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem('notifications', JSON.stringify([]));
  };

  const handleToggleNotification = (id) => {
    const updated = notifications.map(n => n.id === id ? { ...n, read: true } : n);
    setNotifications(updated);
    localStorage.setItem('notifications', JSON.stringify(updated));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Listen to redirect triggers from protected dashboard pages
  useEffect(() => {
    const trigger = localStorage.getItem('triggerLogin');
    if (trigger) {
      localStorage.removeItem('triggerLogin');
      if (trigger === 'vendor') {
        setAuthPrefillPhone('8888888888');
      } else if (trigger === 'admin') {
        setAuthPrefillPhone('9999999999');
      } else {
        setAuthPrefillPhone('');
      }
      setIsAuthOpen(true);
    }
  }, [navigate]);

  const handleLoginSuccess = (phone, name) => {
    localStorage.setItem('userPhone', phone);
    if (name) {
      localStorage.setItem('userName', name);
      setUserName(name);
    }
    setUserPhone(phone);
    setIsAuthOpen(false);
    setAuthPrefillPhone('');
    
    // Role-based smart redirection
    if (phone === '9999999999') {
      navigate('/dashboard/admin');
    } else if (phone === '8888888888') {
      navigate('/dashboard/vendor');
    } else {
      navigate('/dashboard/user');
    }
  };

  const handleCloseAuth = () => {
    setIsAuthOpen(false);
    setAuthPrefillPhone('');
  };

  const handleLogout = () => {
    localStorage.removeItem('userPhone');
    localStorage.removeItem('userName');
    setUserPhone('');
    setUserName('');
    navigate('/');
  };

  const getDashboardRoute = () => {
    if (userPhone === '9999999999') return '/dashboard/admin';
    if (userPhone === '8888888888') return '/dashboard/vendor';
    return '/dashboard/user';
  };

  const getProfileButtonText = () => {
    if (userName) return userName;
    if (userPhone === '9999999999') return 'Admin Panel';
    if (userPhone === '8888888888') return 'Vendor Panel';
    return 'My Account';
  };

  return (
    <>
      <header className={`header ${isScrolled ? 'scrolled glassmorphism' : ''}`}>
        <div className="container header-container">
          <Link to="/" className="logo">
            <img src="/logo.png" alt="Kolhapurcha Dabewala Logo" className="logo-image" />
            <div className="logo-text-block">
              <span className="logo-text">KOLHAPURCHA <span className="logo-text-highlight">DABEWALA</span></span>
              <span className="logo-subtext">घरच्या जेवणाची खात्री</span>
            </div>
          </Link>
 
          <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
            <Link to="/" className={isActive('/') && !location.hash ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Home</Link>
            <Link to="/find-mess" className={isActive('/find-mess') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Find Mess</Link>
            <Link to="/how-it-works" className={isActive('/how-it-works') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>How It Works</Link>
            <Link to="/become-partner" className={isActive('/become-partner') ? 'active' : ''} onClick={() => setMobileMenuOpen(false)}>Partner With Us</Link>
          </nav>
 
          <div className="auth-buttons" style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <div className="popover-wrapper">
              <button 
                onClick={() => {
                  setIsLikesOpen(!isLikesOpen);
                  setIsNotificationsOpen(false);
                }} 
                className={`icon-btn ${isLikesOpen ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                title="Favorite Messes"
              >
                <Heart size={20} fill={likedMesses.length > 0 ? "#FF6B00" : "none"} stroke={likedMesses.length > 0 ? "#FF6B00" : "currentColor"} />
                {likedMesses.length > 0 && (
                  <span className="badge-count">{likedMesses.length}</span>
                )}
              </button>
              
              {isLikesOpen && (
                <div className="header-popover likes-popover glassmorphism">
                  <div className="popover-header">
                    <h4>Favorites ({likedMesses.length})</h4>
                  </div>
                  <div className="popover-body">
                    {likedMesses.length === 0 ? (
                      <div className="popover-empty-state">
                        <span className="empty-emoji">❤️</span>
                        <p>Your favorites list is empty.</p>
                        <Link to="/find-mess" className="popover-cta-btn" onClick={() => setIsLikesOpen(false)}>Browse Messes</Link>
                      </div>
                    ) : (
                      <div className="popover-list">
                        {likedMesses.map(mess => (
                          <div key={mess.id} className="popover-item favorited-mess-item" onClick={() => { navigate('/find-mess'); setIsLikesOpen(false); }}>
                            <img src={mess.image} alt={mess.name} className="item-thumbnail" />
                            <div className="item-details">
                              <h5 className="item-title">{mess.name}</h5>
                              <span className="item-subtitle">📍 {mess.area}</span>
                              <span className="item-price">₹{mess.price}/mo</span>
                            </div>
                            <button 
                              onClick={(e) => handleRemoveFavorite(mess.id, e)} 
                              className="item-remove-btn"
                              title="Remove from favorites"
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            <div className="popover-wrapper">
              <button 
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsLikesOpen(false);
                }} 
                className={`icon-btn ${isNotificationsOpen ? 'active' : ''}`}
                style={{ background: 'none', border: 'none', cursor: 'pointer', position: 'relative', display: 'flex', alignItems: 'center' }}
                title="Notifications"
              >
                <Bell size={20} />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="badge-count bell-badge">{notifications.filter(n => !n.read).length}</span>
                )}
              </button>

              {isNotificationsOpen && (
                <div className="header-popover notifications-popover glassmorphism">
                  <div className="popover-header">
                    <h4>Notifications</h4>
                    {notifications.length > 0 && (
                      <div className="popover-header-actions">
                        <button onClick={handleMarkAllRead} className="text-action-btn">Mark all read</button>
                        <span className="divider">|</span>
                        <button onClick={handleClearAllNotifications} className="text-action-btn">Clear all</button>
                      </div>
                    )}
                  </div>
                  <div className="popover-body">
                    {notifications.length === 0 ? (
                      <div className="popover-empty-state">
                        <span className="empty-emoji">🔔</span>
                        <p>No new notifications.</p>
                      </div>
                    ) : (
                      <div className="popover-list">
                        {notifications.map(notif => (
                          <div 
                            key={notif.id} 
                            className={`popover-item notification-item ${notif.read ? 'read' : 'unread'}`}
                            onClick={() => handleToggleNotification(notif.id)}
                          >
                            <div className="notification-icon-wrap">
                              {notif.type === 'success' && <span className="notif-icon success">✅</span>}
                              {notif.type === 'delivery' && <span className="notif-icon delivery">🛵</span>}
                              {notif.type === 'info' && <span className="notif-icon info">ℹ️</span>}
                              {notif.type === 'warning' && <span className="notif-icon warning">⚠️</span>}
                              {notif.type === 'payment' && <span className="notif-icon payment">💰</span>}
                              {notif.type === 'review' && <span className="notif-icon review">⭐</span>}
                            </div>
                            <div className="item-details">
                              <h5 className="item-title">{notif.title}</h5>
                              <p className="item-desc">{notif.desc}</p>
                              <span className="item-time">{notif.time}</span>
                            </div>
                            {!notif.read && <span className="unread-dot"></span>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
 
            {userPhone ? (
              <div className="user-logged-in-badge" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Link to={getDashboardRoute()} className="btn btn-get-started" style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                  <User size={15} /> {getProfileButtonText()} <ChevronDown size={13} />
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="icon-btn logout-header-btn" 
                  title="Logout"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', padding: '0.5rem', background: 'rgba(255, 107, 0, 0.08)', border: 'none', borderRadius: '50%', color: '#FF6B00' }}
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <button 
                onClick={() => setIsAuthOpen(true)} 
                className="btn btn-get-started"
                style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <User size={15} /> Login / Sign Up
              </button>
            )}
          </div>

          <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Auth Verification Modal Portal */}
      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={handleCloseAuth} 
        onLoginSuccess={handleLoginSuccess} 
        initialPhone={authPrefillPhone}
      />
    </>
  );
};

export default Header;
