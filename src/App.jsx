import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import FindMess from './pages/FindMess';
import BecomePartner from './pages/BecomePartner';
import SubscriptionPlans from './pages/SubscriptionPlans';
import HowItWorksPage from './pages/HowItWorksPage';
import UserDashboard from './pages/UserDashboard';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';

function App() {
  // One-time cleanup to remove all mock or pre-existing vendors and seed "Ajay Maskes Mess" (v6)
  if (!localStorage.getItem('db_wiped_force_clear_v6')) {
    localStorage.setItem('approvedVendors', JSON.stringify([]));
    
    // Seed "Ajay Maskes Mess" pending application
    const seededPendingApp = {
      id: 999991,
      messName: "Ajay Maskes Mess",
      ownerName: "Ajay Maske",
      fssai: "21526084000512",
      area: "Shahupuri",
      status: "Pending",
      plan: "Growth Plan (₹999/mo)",
      price: 2399,
      foodType: "Veg & Non-Veg",
      description: "Delicious home-style meals prepared with authentic Kolhapuri spices. Special Sunday mutton thali.",
      nearArea: "Near Office",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
    };
    localStorage.setItem('pendingVendorApplications', JSON.stringify([seededPendingApp]));
    
    // Seed vendor login credentials (ajaymaske / password)
    const seededVendorAccount = {
      vendorId: "ajaymaske",
      password: "password",
      ownerName: "Ajay Maske"
    };
    localStorage.setItem('vendorAccounts', JSON.stringify([seededVendorAccount]));
    
    localStorage.setItem('activeSubscriptions', JSON.stringify([]));
    localStorage.setItem('likedMesses', JSON.stringify([]));
    localStorage.removeItem('userAccounts');
    localStorage.removeItem('vendor_mess_name');
    localStorage.removeItem('vendor_owner_name');
    localStorage.setItem('db_wiped_force_clear_v6', 'true');
  }

  return (
    <Router>
      <div className="app-container">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/find-mess" element={<FindMess />} />
            <Route path="/become-partner" element={<BecomePartner />} />
            <Route path="/subscription-plans" element={<SubscriptionPlans />} />
            <Route path="/how-it-works" element={<HowItWorksPage />} />
            <Route path="/dashboard/user" element={<UserDashboard />} />
            <Route path="/dashboard/vendor" element={<VendorDashboard />} />
            <Route path="/dashboard/admin" element={<AdminDashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
