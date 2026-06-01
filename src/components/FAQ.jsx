import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  HelpCircle, Calendar, RefreshCw, Truck, MapPin, 
  DollarSign, Sparkles, MessageCircle, ArrowRight, Check,
  ThumbsUp, ThumbsDown, ShieldCheck, Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './FAQ.css';

const faqs = [
  {
    id: "sub-work",
    icon: <Calendar size={18} />,
    category: "Subscription Setup",
    question: "How does the subscription work?",
    answer: "Choose a tiffin plan, select your preferred verified local mess, and securely pay online. Your meals are prepared fresh and delivered daily within your selected time slot.",
    proTip: "Subscriptions can be customized to run only on weekdays (Mon-Fri) if you travel or go home on weekends!",
    actionText: "Browse Mess Plans",
    actionPath: "/subscription-plans"
  },
  {
    id: "sub-pause",
    icon: <Zap size={18} />,
    category: "Schedule Pause",
    question: "Can I pause the service if I go out of town?",
    answer: "Absolutely. Using your dashboard, you can pause your subscription with a single tap. The paused days will be credited back, extending your billing cycle automatically.",
    proTip: "Pause requests must be made before 8:00 AM for lunch and 4:00 PM for dinner to prevent food wastage.",
    actionText: "Manage Dashboard Calendar",
    actionPath: "/dashboard/user"
  },
  {
    id: "sub-swap",
    icon: <RefreshCw size={18} />,
    category: "Provider Swap",
    question: "Can I change my tiffin mess provider?",
    answer: "Yes, flexibility is our core feature. If you want to try a different flavor, you can swap your mess partner at the end of any week without paying extra. Your balance transfers instantly.",
    proTip: "Swapping is 100% free. Any unused subscription balance transfers to the new mess instantly.",
    actionText: "Transfer Subscription Partner",
    actionPath: "/dashboard/user"
  },
  {
    id: "sub-delivery",
    icon: <Truck size={18} />,
    category: "Delivery Logistics",
    question: "Is delivery free of charge?",
    answer: "Yes! Delivery is entirely free for all active subscription plans. The price you see on our subscription cards is the final price you pay—no hidden service fees, delivery charges, or GST additions.",
    proTip: "Our delivery network is optimized to deliver tiffins warm using insulated carrier cases.",
    actionText: "View Popular Messes",
    actionPath: "/find-mess"
  },
  {
    id: "sub-areas",
    icon: <MapPin size={18} />,
    category: "Coverage Map",
    question: "What areas in Kolhapur do you deliver to?",
    answer: "We currently deliver to all major areas including Rajarampuri, Shivaji University Area, Tarabai Park, Shahupuri, MIDC Gokul Shirgaon, Kadamwadi, Uchgaon, and C-Ward.",
    proTip: "If your area is not listed, contact support. We frequently expand routes based on hostel requests.",
    actionText: "Explore Delivery Map",
    actionPath: "/find-mess"
  },
  {
    id: "sub-refund",
    icon: <DollarSign size={18} />,
    category: "Cancellations & Safety",
    question: "How do refunds and cancellations work?",
    answer: "If you need to cancel your plan, we will refund the value of your unconsumed meals directly to your bank account or UPI wallet within 3-5 business days, zero questions asked.",
    proTip: "No cancellation fees! You only pay for the meals that have already been prepared and delivered.",
    actionText: "Wallet & Cashouts desk",
    actionPath: "/dashboard/user"
  }
];

const FAQ = () => {
  const [selectedId, setSelectedId] = useState(faqs[0].id);
  const [feedback, setFeedback] = useState({}); // Stores { [id]: 'yes' | 'no' }
  const navigate = useNavigate();

  const activeFaq = faqs.find(f => f.id === selectedId) || faqs[0];

  const handleFeedback = (id, type) => {
    setFeedback(prev => ({
      ...prev,
      [id]: type
    }));
  };

  return (
    <section className="faq-section" id="faq">
      <div className="faq-blur-bg s1"></div>
      <div className="faq-blur-bg s2"></div>
      
      <div className="container">
        {/* Header Title */}
        <div className="faq-header-center">
          <div className="faq-pre-title">
            <HelpCircle size={16} className="text-orange" />
            <span>KOLHAPUR SUPPORT DESK</span>
          </div>
          <h2 className="faq-main-title text-center">
            Got Questions? We Have <span className="text-gradient">Solutions</span>
          </h2>
          <p className="faq-main-subtitle text-center">
            Interact with our support console below to find answers and take actions instantly.
          </p>
        </div>

        {/* Dashboard split screen layout */}
        <div className="faq-console-grid">
          
          {/* Left Panel: Question Selectors */}
          <div className="faq-selectors-panel">
            <div className="panel-badge">SELECT A TOPIC</div>
            <div className="selectors-list">
              {faqs.map((faq) => {
                const isActive = faq.id === selectedId;
                return (
                  <button
                    key={faq.id}
                    onClick={() => setSelectedId(faq.id)}
                    className={`faq-selector-item ${isActive ? 'active' : ''}`}
                  >
                    <div className="selector-icon">{faq.icon}</div>
                    <div className="selector-meta">
                      <span className="selector-category">{faq.category}</span>
                      <h4>{faq.question}</h4>
                    </div>
                  </button>
                );
              })}
            </div>
            
            {/* Happiness team group card */}
            <div className="faq-support-box-small glassmorphism">
              <div className="avatar-ping-wrapper">
                <div className="support-avatars">
                  <div className="av s1"></div>
                  <div className="av s2"></div>
                </div>
                <span className="live-support-indicator"></span>
              </div>
              <div className="support-box-text">
                <h5>Happiness Desk Online</h5>
                <p>Chat with our local Kolhapur agents for custom requests.</p>
                <a href="https://wa.me/919999999999" target="_blank" rel="noreferrer" className="support-whatsapp-link">
                  <MessageCircle size={14} /> WhatsApp Support <ArrowRight size={12} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Panel: Resolution Display Console */}
          <div className="faq-display-console glassmorphism-dark">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFaq.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="console-content-card"
              >
                {/* Header info */}
                <div className="console-card-header">
                  <div className="console-category-tag">
                    {activeFaq.icon} {activeFaq.category}
                  </div>
                  <h2>{activeFaq.question}</h2>
                </div>

                {/* Primary answer */}
                <p className="console-primary-answer">
                  {activeFaq.answer}
                </p>

                {/* Pro-Tip Box */}
                <div className="console-pro-tip-box">
                  <div className="pro-tip-label">
                    <Sparkles size={16} /> <span>PRO-TIP ADVICE</span>
                  </div>
                  <p>{activeFaq.proTip}</p>
                </div>

                {/* Quick Action Trigger */}
                <div className="console-action-row">
                  <div className="action-text-info">
                    <h5>Resolve this directly:</h5>
                    <p>Click below to open the corresponding panel in the app.</p>
                  </div>
                  <button 
                    onClick={() => navigate(activeFaq.actionPath)}
                    className="console-action-btn"
                  >
                    {activeFaq.actionText} <ArrowRight size={16} />
                  </button>
                </div>

                {/* Feedback Desk */}
                <div className="console-feedback-footer">
                  <span className="feedback-question">Was this helpful?</span>
                  <div className="feedback-buttons-wrapper">
                    {feedback[activeFaq.id] ? (
                      <span className="feedback-thank-badge animate-fade-in">
                        <Check size={14} /> Resolution Registered
                      </span>
                    ) : (
                      <>
                        <button 
                          onClick={() => handleFeedback(activeFaq.id, 'yes')}
                          className="feedback-pill-btn yes"
                        >
                          👍 Yes
                        </button>
                        <button 
                          onClick={() => handleFeedback(activeFaq.id, 'no')}
                          className="feedback-pill-btn no"
                        >
                          👎 No
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQ;
