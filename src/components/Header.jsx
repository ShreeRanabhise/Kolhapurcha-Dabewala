import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled glassmorphism' : ''}`}>
      <div className="container header-container">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Kolhapurcha Dabewala Logo" className="logo-image" />
        </Link>

        <nav className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/find-mess" onClick={() => setMobileMenuOpen(false)}>Find Mess</Link>
          <a href="/#plans" onClick={() => setMobileMenuOpen(false)}>Subscription Plans</a>
          <a href="/#how-it-works" onClick={() => setMobileMenuOpen(false)}>How It Works</a>
          <a href="/become-partner" className="text-secondary font-bold" onClick={() => setMobileMenuOpen(false)}>Become a Partner</a>
        </nav>

        <div className="auth-buttons">
          <button className="btn btn-outline login-btn">Login</button>
          <button className="btn btn-primary">Sign Up</button>
        </div>

        <button className="mobile-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
