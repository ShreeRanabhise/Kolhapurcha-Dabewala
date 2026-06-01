import React from 'react';
import { ConciergeBell, Users, Bike, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import './TrustBar.css';

const stats = [
  {
    icon: <ConciergeBell size={28} strokeWidth={1.5} />,
    value: "75+",
    title: "Home-Style\nMess Partners",
    desc: "Verified local kitchens serving authentic regional flavors daily."
  },
  {
    icon: <Users size={28} strokeWidth={1.5} />,
    value: "1,200+",
    title: "Happy Students\n& Professionals",
    desc: "Your friends and colleagues trust us for healthy daily nutrition."
  },
  {
    icon: <Bike size={28} strokeWidth={1.5} />,
    value: "99.4%",
    title: "On-Time Delivery\nSuccess Rate",
    desc: "Hot food delivered right to your doorstep, rain or shine."
  },
  {
    icon: <ShieldCheck size={28} strokeWidth={1.5} />,
    value: "100%",
    title: "Hygienic &\nFreshly Cooked",
    desc: "No preservatives, clean local water, and zero compromise on safety."
  }
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { type: 'spring', stiffness: 80, damping: 15 }
  }
};

const TrustBar = () => {
  return (
    <section className="wcu-section" id="why-choose-us">
      {/* Background glowing elements */}
      <div className="wcu-glowing-glow wcu-glow-left"></div>
      <div className="wcu-glowing-glow wcu-glow-right"></div>
      
      <div className="container relative z-10">
        
        <div className="wcu-header">
          <div className="wcu-badge-premium">
            <Sparkles size={14} className="text-secondary" />
            <span>WHY CHOOSE US</span>
          </div>
          <h2 className="wcu-title">
            Trusted by Thousands,<br/>
            <span className="gradient-text-orange-yellow">Loved for Our Service</span>
          </h2>
          <p className="wcu-subtitle-text">
            We bridge the gap between regional mess providers and tiffin subscribers with technology.
          </p>
        </div>

        <motion.div 
          className="wcu-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((stat, index) => (
            <motion.div 
              key={index} 
              className="wcu-card-premium glassmorphism-dark"
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 20px 40px rgba(255, 107, 0, 0.12)",
                borderColor: "rgba(255, 107, 0, 0.3)"
              }}
            >
              <div className="wcu-icon-outer-ring">
                <div className="wcu-icon-inner-glow">
                  {stat.icon}
                </div>
              </div>
              <h3 className="wcu-stat-value">{stat.value}</h3>
              <h4 className="wcu-stat-title">{stat.title}</h4>
              <div className="wcu-card-line"></div>
              <p className="wcu-stat-desc">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default TrustBar;
