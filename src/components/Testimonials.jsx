import React from 'react';
import { Star } from 'lucide-react';
import './Testimonials.css';

const reviews = [
  {
    id: 1,
    name: "Rahul Deshmukh",
    role: "Student, SUK",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "Just like home! The quality is consistently amazing, and the delivery is always on time. Best mess subscription in Kolhapur."
  },
  {
    id: 2,
    name: "Priya Patil",
    role: "IT Professional",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 5,
    text: "I love the flexibility. I can easily pause my subscription when I travel to Pune on weekends. The food is absolutely delicious and hygienic."
  },
  {
    id: 3,
    name: "Amit Kadam",
    role: "Bank Employee",
    image: "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&q=80",
    rating: 4,
    text: "Very affordable pricing for the quality they offer. The weekend special sweet dishes are my absolute favorite!"
  }
];

const Testimonials = () => {
  return (
    <section id="reviews" className="testimonials-section">
      <div className="container">
        <div className="section-header text-center flex-col">
          <h2 className="section-title">What Our Subscribers Say</h2>
          <p className="section-subtitle">Real feedback from Kolhapur's food lovers.</p>
        </div>
        
        <div className="reviews-grid">
          {reviews.map((review) => (
            <div key={review.id} className="review-card glassmorphism">
              <div className="review-rating">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} fill="#FFB800" stroke="none" size={16} />
                ))}
              </div>
              
              <p className="review-text">"{review.text}"</p>
              
              <div className="review-author">
                <img src={review.image} alt={review.name} className="author-image" />
                <div className="author-info">
                  <h4 className="author-name">{review.name}</h4>
                  <p className="author-role">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
