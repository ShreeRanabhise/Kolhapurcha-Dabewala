import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import './FAQ.css';

const faqs = [
  {
    question: "How does the subscription work?",
    answer: "Choose a plan, select your preferred mess, and make the payment. Once subscribed, your meals will be delivered daily to your doorstep at the specified time."
  },
  {
    question: "Can I change my mess?",
    answer: "Yes! You can change your mess provider at any time from the app. The remaining balance will be adjusted accordingly."
  },
  {
    question: "Can I pause the service if I go out of town?",
    answer: "Absolutely. You can easily pause your subscription for specific days. Those meals will be added back to your balance."
  },
  {
    question: "What if the food quality is poor?",
    answer: "We have a strict quality policy. If you receive subpar food, you can report it via the app for an immediate replacement or refund. Consistently poorly rated messes are removed from our platform."
  },
  {
    question: "How do refunds work?",
    answer: "If you decide to cancel your subscription, the amount for unconsumed meals will be refunded to your original payment method within 5-7 business days."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="section-header text-center flex-col">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">Everything you need to know about the service.</p>
        </div>
        
        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`faq-item ${openIndex === index ? 'active' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                {openIndex === index ? <ChevronUp className="text-orange" /> : <ChevronDown className="text-gray" />}
              </div>
              
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
