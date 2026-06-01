import React from 'react';
import { Heart, Star, Users, ShieldCheck, Truck, ChevronLeft, ChevronRight, CheckCircle2, Quote, ArrowRight } from 'lucide-react';
import './Testimonials.css';

const trustMetrics = [
  {
    id: 1,
    icon: <Star size={24} color="#FF6B00" fill="#FF6B00" />,
    value: "4.8/5",
    title: "Average Rating",
    subtitle: "Based on 500+ reviews"
  },
  {
    id: 2,
    icon: <Users size={24} color="#FF6B00" fill="#FF6B00" />,
    value: "1200+",
    title: "Happy Subscribers",
    subtitle: "Trust us every month"
  },
  {
    id: 3,
    icon: <ShieldCheck size={24} color="#FF6B00" />,
    value: "50+",
    title: "Verified Mess Partners",
    subtitle: "Quality & hygiene checked"
  },
  {
    id: 4,
    icon: <Truck size={24} color="#FF6B00" />,
    value: "99%",
    title: "On-Time Delivery",
    subtitle: "We deliver, you enjoy"
  }
];

const featuredReview = {
  quote: "As a student living away from home, this is the closest thing to homemade food I've found in Kolhapur.",
  highlight: "The food is tasty, fresh and the delivery is always on time.",
  name: "Rahul Deshmukh",
  role: "Engineering Student, SUK",
  location: "Rajarampuri, Kolhapur",
  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
  foodImage: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
};

const otherReviews = [
  {
    id: 1,
    quote: "The flexibility to pause my subscription when I travel is super helpful. The food is absolutely delicious and hygienic. Totally recommend!",
    name: "Priya Patil",
    role: "IT Professional",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 2,
    quote: "Very affordable pricing for the quality they offer. The weekend special sweet dishes are my absolute favorite!",
    name: "Amit Kadam",
    role: "Bank Employee",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  },
  {
    id: 3,
    quote: "I've been a subscriber for 6 months and the experience has been amazing. Keep up the great work Kolhapurcha Dabewala!",
    name: "Sneha Jadhav",
    role: "Working Professional",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
  }
];

const Testimonials = () => {
  return (
    <section className="testimonials-section" id="testimonials">
      <div className="container">
        
        {/* Header */}
        <div className="section-header">
          <div className="community-badge">
            <Heart size={14} fill="#FF6B00" color="#FF6B00" />
            <span>LOVED BY OUR COMMUNITY</span>
          </div>
          <h2 className="section-title">What Our <span className="text-orange">Subscribers</span> Say</h2>
          <p className="section-subtitle">
            Real feedback from students and professionals<br/>
            who enjoy our home-style meals every day.
          </p>
        </div>



        {/* Large Featured Review */}
        <div className="featured-review-container">
          <button className="carousel-nav-btn left">
            <ChevronLeft size={24} />
          </button>
          
          <div className="featured-review-card">
            <div className="featured-review-content">
              <div className="review-top-meta">
                <Quote size={40} className="quote-icon" fill="#FF6B00" color="#FF6B00" />
                <div className="rating-and-badge">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill="#FFB800" color="#FFB800" />
                    ))}
                  </div>
                  <div className="verified-badge">
                    <CheckCircle2 size={14} color="#FF6B00" />
                    Verified Subscriber
                  </div>
                </div>
              </div>

              <blockquote className="featured-quote">
                "{featuredReview.quote}"
              </blockquote>
              <p className="featured-highlight">{featuredReview.highlight}</p>

              <div className="reviewer-profile">
                <img src={featuredReview.image} alt={featuredReview.name} className="reviewer-img" />
                <div className="reviewer-details">
                  <h4>{featuredReview.name}</h4>
                  <span>{featuredReview.role}</span>
                  <span className="location">📍 {featuredReview.location}</span>
                </div>
              </div>
            </div>
            
            <div className="featured-review-image">
              <img src={featuredReview.foodImage} alt="Home style thali" />
            </div>
          </div>

          <button className="carousel-nav-btn right">
            <ChevronRight size={24} />
          </button>
        </div>

        {/* 3-Card Grid */}
        <div className="review-grid">
          {otherReviews.map((review) => (
            <div key={review.id} className="small-review-card">
              <div className="card-top-row">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} fill="#FFB800" color="#FFB800" />
                  ))}
                </div>
                <Quote size={32} className="faded-quote" />
              </div>
              <p className="small-quote">{review.quote}</p>
              
              <div className="small-reviewer-footer">
                <div className="small-profile">
                  <img src={review.image} alt={review.name} />
                  <div>
                    <h5>{review.name}</h5>
                    <span>{review.role}</span>
                  </div>
                </div>
                <div className="verified-badge-small">
                  <CheckCircle2 size={12} color="#FF6B00" />
                  Verified
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="testimonial-cta-banner">
          <div className="cta-left">
            <div className="cta-icon-cluster">
               <img src="https://illustrations.popsy.co/amber/surreal-hourglass.svg" alt="Happy" style={{width: 60, height: 60, borderRadius: '50%', background: 'white', padding: 5}}/>
            </div>
            <div className="cta-text">
              <h3>Join 1200+ Happy Subscribers</h3>
              <p>Enjoy home-style meals, delivered fresh to your doorstep.</p>
            </div>
          </div>
          
          <div className="cta-right">
            <button className="btn-find-mess-solid">
              Find Your Mess Now <ArrowRight size={16} />
            </button>
            <div className="avatar-group-container">
              <div className="avatar-group">
                <img src={otherReviews[0].image} alt="User" />
                <img src={otherReviews[1].image} alt="User" />
                <img src={otherReviews[2].image} alt="User" />
              </div>
              <span>Trusted by students<br/>and professionals</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
