import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentUser, userRole, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const getDashboardLink = () => {
    if (userRole === 'admin') return '/admin';
    if (userRole === 'vendor') return '/vendor';
    return '/dashboard';
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled glassmorphism' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Kolhapurcha Dabewala Logo" className="logo-image" />
        </Link>

        <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/find-mess">Find Mess</Link>
          <a href="/#plans">Subscription Plans</a>
          <a href="/#how-it-works">How It Works</a>
          {!currentUser && <a href="/#partner" className="text-secondary font-bold">Become a Partner</a>}
        </nav>

        <div className="auth-buttons">
          {currentUser ? (
            <>
              <Link to={getDashboardLink()} className="btn btn-outline">Dashboard</Link>
              <button onClick={handleLogout} className="btn btn-primary">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline login-btn">Login</Link>
              <Link to="/signup" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>

        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
