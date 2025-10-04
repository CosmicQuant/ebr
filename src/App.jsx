import { useState, useEffect } from 'react';
import './styles-professional.css';
import './programs-vertical-animate.css';
import './about-hero-animated.css';
import { animateOnScroll, initScrollAnimations, animateProgramsVerticalOnScroll } from './scrollAnimation-professional';

const navigationItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'about', label: 'About', icon: '🏖️' },
  { id: 'products', label: 'Products', icon: '🏕️' },
  { id: 'contact', label: 'Contact', icon: '📧' }
];

const heroImages = {
  home: '/assets/vace.jpg',
  about: '/assets/landing3.jpeg',
  products: '/assets/twotents.jpeg',
  contact: '/assets/landingch1.jpg'
};

const impactStats = [
  { number: '100+', label: 'Events Completed', icon: '🎉' },
  { number: '500+', label: 'Happy Clients', icon: '😊' },
  { number: '5', label: 'Years Experience', icon: '⭐' },
  { number: '50+', label: 'Beach Setups', icon: '🏖️' }
];

function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialFading, setTestimonialFading] = useState(false);

  // Carousel images and subtitles for homepage hero
  const carouselImages = [
    {
      url: '/assets/landing1.png',
      subtitle: 'BEACH SETUP ONE',
      text: 'Professional beach event setup with elegant styling.'
    },
    {
      url: '/assets/landing2.jpeg',
      subtitle: 'BEACH SETUP TWO',
      text: 'Beautiful coastal arrangements for memorable occasions.'
    },
    {
      url: '/assets/landing3.jpeg',
      subtitle: 'BEACH SETUP THREE',
      text: 'Stunning beachside configurations for special events.'
    },
    {
      url: '/assets/landing4.png',
      subtitle: 'BEACH SETUP FOUR',
      text: 'Elegant beach rental setups for perfect celebrations.'
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      text: "EcoFriendly Beach Rentals made our beach wedding absolutely magical! Their attention to detail and sustainable approach was exactly what we wanted. Highly recommended!",
      author: "Sarah & James, Beach Wedding 2024"
    },
    {
      text: "Perfect setup for our family gathering! The team was professional, punctual, and the equipment was top quality. Made our celebration unforgettable.",
      author: "Maria K., Family Gathering 2024"
    },
    {
      text: "Outstanding service! The eco-friendly approach and beautiful beach setup exceeded our expectations. Will definitely book again for future events.",
      author: "David & Lisa, Beach Party 2024"
    }
  ];

  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    if (currentPage !== 'home') return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentPage, carouselImages.length]);

  // Auto-advance testimonials every 5 seconds
  useEffect(() => {
    if (currentPage !== 'home') return;
    
    console.log('Setting up testimonial rotation...');
    
    const interval = setInterval(() => {
      console.log('Rotating testimonial...');
      setTestimonialFading(true);
      
      setTimeout(() => {
        setTestimonialIndex((prev) => {
          const nextIndex = (prev + 1) % testimonials.length;
          console.log(`Testimonial changed to index: ${nextIndex}`);
          return nextIndex;
        });
        setTestimonialFading(false);
      }, 300);
    }, 5000);
    
    return () => {
      console.log('Cleaning up testimonial rotation...');
      clearInterval(interval);
    };
  }, [currentPage]);

  // Scroll to top when changing page
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Statistics and scroll animations
  useEffect(() => {
    if (currentPage === 'home') {
      setTimeout(() => {
        // Setup scroll-triggered animations
        const setupScrollAnimations = () => {
          const scrollElements = document.querySelectorAll('.scroll-animate');
          
          const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                  entry.target.classList.add('animate-in');
                }, parseInt(delay));
              } else {
                // Reset animation when out of view for replay
                entry.target.classList.remove('animate-in');
              }
            });
          }, {
            threshold: 0.3,
            rootMargin: '0px 0px -50px 0px'
          });
          
          scrollElements.forEach(element => {
            observer.observe(element);
          });
          
          // Trigger intro section immediately since it's at the top
          const introElements = document.querySelectorAll('.intro-section .scroll-animate');
          introElements.forEach(element => {
            const delay = element.dataset.delay || 0;
            setTimeout(() => {
              element.classList.add('animate-in');
            }, parseInt(delay));
          });
        };
        
        setupScrollAnimations();
        
        animateOnScroll();
        initScrollAnimations();
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setAnimatedStats(true);
              const counters = document.querySelectorAll('.counter');
              counters.forEach(counter => {
                const target = parseInt(counter.dataset.target);
                const increment = target / 100;
                let current = 0;
                const countTimer = setInterval(() => {
                  current += increment;
                  if (current >= target) {
                    current = target;
                    clearInterval(countTimer);
                  }
                  if (target >= 100) {
                    counter.textContent = Math.floor(current) + '+';
                  } else {
                    counter.textContent = Math.floor(current) + '+';
                  }
                }, 50);
              });
            }
          });
        }, { threshold: 0.3 });

        const statsSection = document.querySelector('.stats-grid');
        if (statsSection) {
          observer.observe(statsSection);
        }
      }, 300);
    }
  }, [currentPage]);

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return (
          <div className="page-content">
            <section className="intro-section">
              <h2 className="section-title carousel-title-animate scroll-animate" data-delay="200" style={{ textAlign: 'center' }}>
                EcoFriendly Beach Rentals
              </h2>
              <p className="section-subtitle home-centered scroll-animate" data-delay="400">
                Located in Diani Beach, Kenya, we offer sustainable rentals for beach weddings, parties, and events.
              </p>
              <p className="section-description scroll-animate" data-delay="600">
                Our eco-friendly products ensure minimal environmental impact while providing elegance and comfort for your special occasions.
              </p>
            </section>

            <section className="features-vertical">
              <div className="container" style={{ textAlign: 'center' }}>
                <h2 className="section-title scroll-animate" data-delay="200" style={{ textAlign: 'center', marginBottom: '1rem' }}>Our Signature Beach Services</h2>
                <p className="section-subtitle scroll-animate" data-delay="400" style={{ textAlign: 'center', marginBottom: '3rem' }}>Discover our three core offerings that make every beach event extraordinary</p>
              </div>
              
              <div className="features-viewport">
                <div className="feature-row full-page-feature">
                  <img src="/assets/landing3.jpeg" alt="Beach Weddings" className="feature-img-large" />
                  <div className="feature-desc">
                    <h3>Weddings</h3>
                    <p>
                      Create the wedding of your dreams with our romantic beach ceremony setups. From intimate vow exchanges to grand celebrations, we provide elegant decorations, comfortable seating, and stunning backdrops that capture the magic of Diani Beach. Our sustainable approach ensures your special day is both beautiful and environmentally conscious.
                    </p>
                  </div>
                </div>
                <div className="feature-row full-page-feature">
                  <img src="/assets/landing1.png" alt="Beach Events" className="feature-img-large" />
                  <div className="feature-desc">
                    <h3>Events</h3>
                    <p>
                      Transform any occasion into an unforgettable beachside celebration. Whether it's a corporate retreat, birthday party, anniversary celebration, or family reunion, our comprehensive event packages include premium seating, dining setups, and entertainment areas. We handle every detail so you can focus on creating memories with your loved ones.
                    </p>
                  </div>
                </div>
                <div className="feature-row full-page-feature">
                  <img src="/assets/vace.jpg" alt="Beach Experiences" className="feature-img-large" />
                  <div className="feature-desc">
                    <h3>Experiences</h3>
                    <p>
                      Indulge in curated beach experiences that go beyond ordinary events. From romantic sunset dinners and proposal setups to wellness retreats and photoshoot arrangements, we create bespoke experiences tailored to your vision. Our attention to detail and elegant touch points ensure every moment is picture-perfect and meaningful.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            
            <style>{`
              /* Beach rental specific styles */
              .features-vertical {
                min-height: 300vh; /* Allows for scroll-based animation */
                position: relative;
              }

              /* Scroll down button animation */
              @keyframes bounce {
                0%, 20%, 50%, 80%, 100% {
                  transform: translateY(0);
                }
                40% {
                  transform: translateY(-10px);
                }
                60% {
                  transform: translateY(-5px);
                }
              }

              .scroll-down-button:hover div {
                background-color: rgba(255, 255, 255, 0.2) !important;
                border-color: rgba(255, 255, 255, 1) !important;
                transform: scale(1.1);
              }

              .scroll-down-button:hover span {
                color: rgba(255, 255, 255, 1) !important;
              }
              
              .features-viewport {
                position: sticky;
                top: 0;
                height: 100vh;
                overflow: hidden;
              }
              
              .feature-row {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 2rem;
                padding: 1rem;
                box-sizing: border-box;
                opacity: 0;
                transform: translateX(100px);
                transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
              }
              
              .feature-row.visible {
                opacity: 1;
                transform: translateX(0);
              }
              
              .feature-row.hidden {
                opacity: 0;
                transform: translateX(-100px);
              }
              
              .feature-img-large {
                width: 50%;
                max-width: 600px;
                height: auto;
                max-height: 80vh;
                object-fit: contain;
                object-position: center;
                border-radius: 18px;
                box-shadow: 0 4px 24px rgba(45,90,39,0.10);
              }
              
              .feature-desc {
                flex: 1;
                padding: 1rem 2rem;
                max-width: 50%;
                display: flex;
                flex-direction: column;
                justify-content: center;
                min-height: 400px;
              }
              
              /* Responsive adjustments */
              @media (max-width: 768px) {
                .feature-row {
                  flex-direction: column;
                  text-align: center;
                  padding: 1rem;
                }
                
                .feature-img-large {
                  width: 90%;
                  max-width: 400px;
                }
                
                .feature-desc {
                  max-width: 100%;
                  padding: 1rem;
                }
                
                /* Show hamburger menu on mobile */
                .mobile-menu-btn {
                  display: flex !important;
                }
                
                /* Hide desktop navigation on mobile */
                .desktop-nav {
                  display: none !important;
                }
              }
              
              /* Desktop navigation styling */
              @media (min-width: 769px) {
                .desktop-nav {
                  display: flex !important;
                }
                
                .mobile-menu-btn {
                  display: none !important;
                }
              }
              
              /* Scroll-triggered animations */
              .scroll-animate {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease-out;
              }
              
              .scroll-animate.animate-in {
                opacity: 1;
                transform: translateY(0);
              }
              
              /* Simplified scroll animations that actually work */
              .scroll-animate {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.8s ease-out;
              }
              
              .scroll-animate.animate-in {
                opacity: 1;
                transform: translateY(0);
              }
              
              /* Enhanced intro section styling */
              .intro-section {
                padding: 4rem 0;
                text-align: center;
              }
              
              .intro-section h2 {
                font-size: 3rem;
                font-weight: 700;
                color: #2d5a27;
                margin-bottom: 1.5rem;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
              }
              
              .intro-section .section-subtitle {
                font-size: 1.3rem;
                color: #555;
                font-weight: 500;
                margin-bottom: 1.5rem;
                max-width: 800px;
                margin-left: auto;
                margin-right: auto;
                line-height: 1.6;
              }
              
              .intro-section .section-description {
                font-size: 1.1rem;
                color: #666;
                max-width: 700px;
                margin-left: auto;
                margin-right: auto;
                line-height: 1.7;
              }
                backface-visibility: hidden;
                perspective: 1000px;
              }
            `}</style>

            <section className="impact-stats-section" style={{
              backgroundImage: 'url(/assets/landing2.jpeg)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              position: 'relative',
              padding: '8rem 0',
              textAlign: 'center',
              width: '100vw',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)'
            }}>
              {/* No overlay for transparent background */}
              
              <div style={{ 
                position: 'relative', 
                zIndex: 2,
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '0 2rem'
              }}>
                <h2 className="section-title" style={{ 
                  textAlign: 'center',
                  color: 'white',
                  fontSize: '3.5rem',
                  marginBottom: '2rem',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)',
                  letterSpacing: '1px'
                }}>Our Experience in Numbers</h2>
                
                <p className="section-subtitle" style={{
                  color: 'white',
                  fontSize: '1.4rem',
                  marginBottom: '3rem',
                  maxWidth: '900px',
                  margin: '0 auto 3rem auto',
                  lineHeight: '1.7',
                  textShadow: '1px 1px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)',
                  fontWeight: '500'
                }}>Trusted by hundreds of clients for their special beach events</p>
                
                <div className="stats-grid" ref={(el) => {
                  if (el && animatedStats) {
                    setTimeout(() => animateCounters(), 500);
                  }
                }}>
                  {impactStats.map((stat, index) => (
                    <div 
                      key={index} 
                      className={`stat-card ${animatedStats ? 'animated' : ''}`}
                      style={{ 
                        animationDelay: `${index * 0.2}s`,
                        background: 'transparent',
                        border: 'none',
                        padding: '2rem',
                        textAlign: 'center'
                      }}
                    >
                      <div className="stat-icon" style={{
                        fontSize: '3rem',
                        marginBottom: '1rem'
                      }}>{stat.icon}</div>
                      <div className="stat-number counter" 
                           data-target={stat.number.replace(/[^0-9]/g, '')}
                           style={{
                             color: '#000000',
                             fontSize: '3.5rem',
                             fontWeight: '900',
                             marginBottom: '0.5rem',
                             textShadow: 'none',
                             letterSpacing: '1px'
                           }}>0</div>
                      <div className="stat-label" style={{
                        color: '#000000',
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        textShadow: 'none',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                      }}>{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section id="why-choose-us" className="scroll-animation">
              <div className="container">
                <h2 className="section-title scroll-animate" data-delay="200" style={{ textAlign: 'center' }}>Why Choose EcoFriendly Beach Rentals?</h2>
                <p className="section-subtitle scroll-animate" data-delay="400" style={{ textAlign: 'center' }}>Experience the difference with Diani Beach's premier sustainable rental service</p>
                <div className="why-choose-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                  <div className="why-choose-item scroll-animate" data-delay="600" style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                    <div className="why-choose-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🌱</div>
                    <h3>100% Eco-Friendly</h3>
                    <p>All our products are made from sustainable materials, ensuring minimal environmental impact while maintaining luxury and comfort for your special occasions.</p>
                  </div>
                  <div className="why-choose-item scroll-animate" data-delay="700" style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                    <div className="why-choose-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏖️</div>
                    <h3>Diani Beach Experts</h3>
                    <p>With deep local knowledge of Diani Beach, we know the best spots, weather patterns, and regulations to make your event perfect and hassle-free.</p>
                  </div>
                  <div className="why-choose-item scroll-animate" data-delay="800" style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                    <div className="why-choose-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>⚡</div>
                    <h3>Quick Setup & Service</h3>
                    <p>Professional team ensures fast, efficient setup and breakdown. We arrive early, set up perfectly, and clean up completely so you can focus on enjoying your event.</p>
                  </div>
                  <div className="why-choose-item scroll-animate" data-delay="900" style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                    <div className="why-choose-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>💎</div>
                    <h3>Premium Quality</h3>
                    <p>High-quality, well-maintained equipment and decorations. Every item is inspected and cleaned to ensure your event looks elegant and professional.</p>
                  </div>
                  <div className="why-choose-item scroll-animate" data-delay="1000" style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                    <div className="why-choose-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎨</div>
                    <h3>Custom Packages</h3>
                    <p>Flexible packages tailored to your needs and budget. From intimate gatherings to large celebrations, we create the perfect setup for your vision.</p>
                  </div>
                  <div className="why-choose-item scroll-animate" data-delay="1100" style={{ background: 'white', padding: '2rem', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', textAlign: 'center' }}>
                    <div className="why-choose-icon" style={{ fontSize: '3rem', marginBottom: '1rem' }}>💬</div>
                    <h3>24/7 Support</h3>
                    <p>Always available for consultation, booking, and support. Quick response times via WhatsApp, phone, or email for all your questions and needs.</p>
                  </div>
                </div>
              </div>
            </section>

            <section className="testimonials-section">
              <div className="container">
                <h2 className="section-title scroll-animate" data-delay="200" style={{ textAlign: 'center' }}>What Our Clients Say</h2>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
                  <div className="rotating-testimonial-card scroll-animate" data-delay="400" style={{ 
                    background: 'linear-gradient(135deg, #2d5a27, #4a7c59)',
                    color: 'white',
                    padding: '3rem',
                    borderRadius: '20px',
                    boxShadow: '0 8px 32px rgba(45,90,39,0.3)',
                    maxWidth: '600px',
                    width: '100%',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div className="testimonial-content" style={{ 
                      transition: 'opacity 0.3s ease-in-out, transform 0.3s ease-in-out',
                      minHeight: '150px',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'center',
                      opacity: testimonialFading ? 0 : 1,
                      transform: testimonialFading ? 'translateY(10px)' : 'translateY(0)'
                    }}>
                      <p style={{ 
                        fontSize: '1.2rem', 
                        fontStyle: 'italic', 
                        marginBottom: '1.5rem',
                        lineHeight: '1.6'
                      }}>
                        "{testimonials[testimonialIndex].text}"
                      </p>
                      <div style={{ 
                        fontWeight: 'bold', 
                        fontSize: '1rem',
                        opacity: '0.9'
                      }}>
                        - {testimonials[testimonialIndex].author}
                      </div>
                    </div>
                    <div style={{
                      position: 'absolute',
                      bottom: '1rem',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      display: 'flex',
                      gap: '0.5rem'
                    }}>
                      {testimonials.map((_, index) => (
                        <span 
                          key={index}
                          className="testimonial-dot" 
                          style={{ 
                            width: '8px', 
                            height: '8px', 
                            borderRadius: '50%', 
                            backgroundColor: index === testimonialIndex ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.4)',
                            transition: 'background-color 0.3s ease'
                          }}
                        ></span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Spacing between testimonials and CTA */}
            <div style={{ height: '4rem' }}></div>

            {/* Call to Action Section */}
            <section className="cta-section" style={{
              backgroundImage: 'url(/assets/landing1.png)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed',
              position: 'relative',
              padding: '8rem 0',
              textAlign: 'center',
              width: '100vw',
              margin: '0',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)'
            }}>
              {/* Removed overlay for transparent background */}
              
              <div style={{ 
                position: 'relative', 
                zIndex: 2,
                width: '100%',
                maxWidth: 'none',
                padding: '0 2rem'
              }}>
                <h2 className="section-title scroll-animate" data-delay="200" style={{ 
                  textAlign: 'center',
                  color: 'white',
                  fontSize: '3.5rem',
                  marginBottom: '2rem',
                  fontWeight: 'bold',
                  textShadow: '2px 2px 8px rgba(0,0,0,0.8), 0 0 20px rgba(0,0,0,0.6)',
                  letterSpacing: '1px'
                }}>
                  Ready to Plan Your Beach Event?
                </h2>
                
                <p className="scroll-animate" data-delay="400" style={{
                  color: 'white',
                  fontSize: '1.4rem',
                  marginBottom: '3rem',
                  maxWidth: '900px',
                  margin: '0 auto 3rem auto',
                  lineHeight: '1.7',
                  textShadow: '1px 1px 4px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.5)',
                  fontWeight: '500'
                }}>
                  Contact us to discuss your requirements and get a customized quote for your perfect beach setup
                </p>
                
                <div className="cta-buttons scroll-animate" data-delay="600" style={{
                  display: 'flex',
                  gap: '2rem',
                  justifyContent: 'center',
                  flexWrap: 'wrap'
                }}>
                  <a 
                    href="https://wa.me/254797185854" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="whatsapp-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      backgroundColor: 'transparent',
                      color: 'white',
                      border: '3px solid white',
                      padding: '1.2rem 2.5rem',
                      borderRadius: '50px',
                      textDecoration: 'none',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                      boxShadow: '0 4px 15px rgba(255,255,255,0.2)'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.color = '#25d366';
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.textShadow = 'none';
                      e.target.style.boxShadow = '0 8px 25px rgba(255,255,255,0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.textShadow = '1px 1px 3px rgba(0,0,0,0.5)';
                      e.target.style.boxShadow = '0 4px 15px rgba(255,255,255,0.2)';
                    }}
                  >
                    <img 
                      src="/assets/whatsapp.png" 
                      alt="WhatsApp" 
                      style={{ 
                        width: '24px', 
                        height: '24px',
                        filter: 'none'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.filter = 'brightness(0) invert(1)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.filter = 'none';
                      }}
                    />
                    Chat on WhatsApp
                  </a>
                  
                  <button 
                    onClick={() => setCurrentPage('contact')}
                    className="quote-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.8rem',
                      backgroundColor: 'transparent',
                      color: 'white',
                      border: '3px solid white',
                      padding: '1.2rem 2.5rem',
                      borderRadius: '50px',
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textShadow: '1px 1px 3px rgba(0,0,0,0.5)',
                      boxShadow: '0 4px 15px rgba(255,255,255,0.2)'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = 'white';
                      e.target.style.color = '#2d5a27';
                      e.target.style.transform = 'translateY(-3px)';
                      e.target.style.textShadow = 'none';
                      e.target.style.boxShadow = '0 8px 25px rgba(255,255,255,0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = 'transparent';
                      e.target.style.color = 'white';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.textShadow = '1px 1px 3px rgba(0,0,0,0.5)';
                      e.target.style.boxShadow = '0 4px 15px rgba(255,255,255,0.2)';
                    }}
                  >
                    Get Quote
                  </button>
                </div>
              </div>
            </section>
          </div>
        );

      case 'about':
        return (
          <div className="page-content">
            <section className="about-section">
              <div className="container">
                <h2 className="section-title" style={{ textAlign: 'center' }}>About EcoFriendly Beach Rentals</h2>
                <p className="section-description">
                  Located in Diani Beach, Kenya, we offer sustainable rentals for beach weddings, parties, and events. Our eco-friendly products ensure minimal environmental impact while providing elegance and comfort.
                </p>
                
                <div className="about-cards-grid" style={{display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '3rem'}}>
                  <div className="about-card" style={{background: 'white', borderRadius: '16px', boxShadow: '0 2px 16px rgba(45,90,39,0.07)', padding: '2rem', minWidth: '260px', maxWidth: '340px', textAlign: 'center'}}>
                    <h3 style={{color: '#2d5a27'}}>🌱 Mission</h3>
                    <p>To provide sustainable and elegant beach event rentals while protecting the beautiful Diani Beach environment for future generations.</p>
                  </div>
                  <div className="about-card" style={{background: 'white', borderRadius: '16px', boxShadow: '0 2px 16px rgba(45,90,39,0.07)', padding: '2rem', minWidth: '260px', maxWidth: '340px', textAlign: 'center'}}>
                    <h3 style={{color: '#2d5a27'}}>🌍 Vision</h3>
                    <p>To be Diani Beach's leading eco-friendly event rental service, setting the standard for sustainable beach celebrations.</p>
                  </div>
                  <div className="about-card" style={{background: 'white', borderRadius: '16px', boxShadow: '0 2px 16px rgba(45,90,39,0.07)', padding: '2rem', minWidth: '260px', maxWidth: '340px', textAlign: 'center'}}>
                    <h3 style={{color: '#2d5a27'}}>⭐ Values</h3>
                    <p>Sustainability, quality, customer satisfaction, and environmental responsibility guide everything we do.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      case 'products':
        return (
          <div className="page-content">
            <section className="products-section">
              <h2 className="section-title" style={{ textAlign: 'center' }}>Our Eco-Friendly Rentals for Events</h2>
              <p className="section-description">
                Choose from our range of sustainable beach event packages, each designed to create magical moments while respecting the environment.
              </p>
              
              <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
                <div className="product-item" style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', overflow: 'hidden', cursor: 'pointer' }}>
                  <img src="/assets/Landing1_compressed.jpg" alt="Beach Wedding Package" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem' }}>
                    <h3>Beach Weddings</h3>
                    <p>Elegant wedding setups for your perfect seaside ceremony. Complete romantic arrangements with decorations, seating, and magical ambiance.</p>
                  </div>
                </div>
                <div className="product-item" style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', overflow: 'hidden', cursor: 'pointer' }}>
                  <img src="/assets/Landing2_compressed.jpg" alt="Gatherings Package" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem' }}>
                    <h3>Gatherings</h3>
                    <p>Ideal for medium-sized social events. Complete setup with seating arrangements, dining area, and entertainment space for memorable beach gatherings.</p>
                  </div>
                </div>
                <div className="product-item" style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', overflow: 'hidden', cursor: 'pointer' }}>
                  <img src="/assets/landing4.jpeg" alt="Beach Experience" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem' }}>
                    <h3>Beach Experience</h3>
                    <p>Enjoy our signature beach setup for unforgettable events and gatherings, perfect for any special occasion.</p>
                  </div>
                </div>
                <div className="product-item" style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 16px rgba(0,0,0,0.1)', overflow: 'hidden', cursor: 'pointer' }}>
                  <img src="/assets/tentwedding2.jpeg" alt="Tent Wedding" style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
                  <div style={{ padding: '1.5rem' }}>
                    <h3>Tent Wedding Setup</h3>
                    <p>Elegant tent wedding setup for your special day, combining style and comfort by the ocean.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        );

      case 'contact':
        return (
          <div className="page-content">
            <section className="contact-section">
              <h2 className="section-title" style={{ textAlign: 'center' }}>Contact Us</h2>
              <p className="section-description">
                Ready to plan your perfect beach event? Get in touch with us today!
              </p>
              
              <div className="contact-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', marginTop: '3rem' }}>
                <div className="contact-info">
                  <h3>Get in Touch</h3>
                  <div className="contact-details" style={{ marginTop: '1.5rem' }}>
                    <div className="contact-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                      <span className="icon" style={{ fontSize: '1.5rem', marginRight: '1rem' }}>📧</span>
                      <div>
                        <strong>Email</strong>
                        <p style={{ margin: 0 }}>Ecofriendlybeachrentals@gmail.com</p>
                      </div>
                    </div>
                    <div className="contact-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                      <span className="icon" style={{ fontSize: '1.5rem', marginRight: '1rem' }}>📞</span>
                      <div>
                        <strong>Phone</strong>
                        <p style={{ margin: 0 }}>+254797185854</p>
                      </div>
                    </div>
                    <div className="contact-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                      <span className="icon" style={{ fontSize: '1.5rem', marginRight: '1rem' }}>📍</span>
                      <div>
                        <strong>Address</strong>
                        <p style={{ margin: 0 }}>Diani Beach Road<br />Diani Beach, Kenya</p>
                      </div>
                    </div>
                    <div className="contact-item" style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
                      <span className="icon" style={{ fontSize: '1.5rem', marginRight: '1rem' }}>🕒</span>
                      <div>
                        <strong>Business Hours</strong>
                        <p style={{ margin: 0 }}>Mon - Sun: 8:00 AM - 6:00 PM</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="social-links" style={{ marginTop: '2rem' }}>
                    <h4>Follow Us</h4>
                    <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                      <a href="https://wa.me/254797185854?text=Hello%20EcoFriendly%20Beach%20Rentals!%20I'm%20interested%20in%20your%20services." target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img src="/assets/whatsapp.png" alt="WhatsApp" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> WhatsApp
                      </a>
                      <a href="https://instagram.com/Ecofriendlybeachrentals" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img src="/assets/ig.PNG" alt="Instagram" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> Instagram
                      </a>
                      <a href="https://tiktok.com/@Ecofriendlybeachrentals" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img src="/assets/tiktok.png" alt="TikTok" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> TikTok
                      </a>
                      <a href="https://facebook.com/Ecofriendlybeachrentals" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <img src="/assets/fb.png" alt="Facebook" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> Facebook
                      </a>
                    </div>
                  </div>
                </div>
                
                <div className="contact-form-container">
                  <h3>Send us a Message</h3>
                  <form className="contact-form" onSubmit={(e) => {
                    e.preventDefault();
                    setShowSuccess(true);
                    setTimeout(() => setShowSuccess(false), 5000);
                  }}>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Full Name *</label>
                      <input type="text" id="name" name="name" required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Email Address *</label>
                      <input type="email" id="email" name="email" required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label htmlFor="phone" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Phone Number</label>
                      <input type="tel" id="phone" name="phone" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label htmlFor="event-type" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Event Type</label>
                      <select id="event-type" name="event-type" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }}>
                        <option value="">Select Event Type</option>
                        <option value="wedding">Beach Wedding</option>
                        <option value="party">Beach Party</option>
                        <option value="corporate">Corporate Event</option>
                        <option value="photoshoot">Photo Shoot</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label htmlFor="date" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Event Date</label>
                      <input type="date" id="date" name="date" style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px' }} />
                    </div>
                    <div className="form-group" style={{ marginBottom: '1rem' }}>
                      <label htmlFor="message" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>Message *</label>
                      <textarea id="message" name="message" rows="5" placeholder="Tell us about your event requirements..." required style={{ width: '100%', padding: '0.8rem', border: '1px solid #ddd', borderRadius: '8px', resize: 'vertical' }}></textarea>
                    </div>
                    <button type="submit" className="submit-btn" style={{ width: '100%', padding: '1rem', background: '#2d5a27', color: 'white', border: 'none', borderRadius: '8px', fontSize: '1rem', fontWeight: 'bold', cursor: 'pointer' }}>Send Message</button>
                    {showSuccess && (
                      <div style={{marginTop: '1.5rem', color: '#2d5a27', fontWeight: 600, fontSize: '1.1rem', background: '#e8f5e8', padding: '1rem', borderRadius: '8px', textAlign: 'center'}}>
                        Thank you for contacting us! We have received your message and will get back to you soon.
                      </div>
                    )}
                  </form>
                </div>
              </div>
            </section>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="app">
      <header className="header" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: 'transparent',
        border: 'none',
        padding: '0.5rem 0'
      }}>
        <div className="container">
          <div className="header-content">
            <div className="logo" style={{ color: 'white', textShadow: '2px 2px 4px rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img 
                src="/assets/logo.png" 
                alt="EcoFriendly Beach Rentals Logo" 
                style={{ 
                  height: '70px', 
                  width: 'auto', 
                  cursor: 'pointer',
                  filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.3))'
                }} 
                onClick={() => setCurrentPage('home')}
              />
            </div>
            
            {/* Desktop navigation */}
            <nav className="nav nav-centered desktop-nav" style={{
              background: 'transparent',
              borderRadius: '25px',
              padding: '0.5rem',
              border: 'none'
            }}>
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => setCurrentPage(item.id)}
                  style={{
                    color: currentPage === item.id ? '#fff' : 'rgba(255, 255, 255, 0.9)',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '20px',
                    padding: '0.6rem 1.2rem',
                    transition: 'all 0.3s ease',
                    fontWeight: '600',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                  }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </button>
              ))}
            </nav>
            
            {/* Hamburger icon for mobile */}
            <button 
              className="mobile-menu-btn"
              aria-label="Open menu"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                padding: '0.8rem',
                marginLeft: '1rem',
                cursor: 'pointer',
                display: 'none', // Hidden by default on desktop
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: '8px'
              }}
            >
              <span style={{ width: '28px', height: '4px', background: '#fff', margin: '3px 0', borderRadius: '2px' }}></span>
              <span style={{ width: '28px', height: '4px', background: '#fff', margin: '3px 0', borderRadius: '2px' }}></span>
              <span style={{ width: '28px', height: '4px', background: '#fff', margin: '3px 0', borderRadius: '2px' }}></span>
            </button>

            {/* Mobile menu overlay */}
            {isMenuOpen && (
              <nav className="mobile-nav" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(45,90,39,0.97)', zIndex: 2000, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                {navigationItems.map((item) => (
                  <button
                    key={item.id}
                    className={`nav-item${currentPage === item.id ? ' active' : ''}`}
                    style={{ color: 'white', fontSize: '1.5rem', margin: '1rem 0', background: 'none', border: 'none' }}
                    onClick={() => { setCurrentPage(item.id); setIsMenuOpen(false); }}
                  >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                  </button>
                ))}
                <button onClick={() => setIsMenuOpen(false)} style={{ marginTop: '2rem', color: '#fff', fontSize: '1.2rem', background: 'none', border: '2px solid #fff', borderRadius: '8px', padding: '0.7rem 2rem' }}>Close</button>
              </nav>
            )}
          </div>
        </div>
      </header>

      <main className="main">
        {currentPage === 'home' ? (
          <section className="hero carousel-hero" style={{backgroundImage: `url(${carouselImages[carouselIndex].url})`}}>
            <div className="hero-overlay">
              <div className="container">
                <div className="hero-content">
                  {/* Text removed for cleaner carousel display */}
                </div>
              </div>
            </div>
            
            {/* Animated scroll down button */}
            <div className="scroll-down-button" style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'pointer',
              zIndex: 10,
              animation: 'bounce 2s infinite'
            }} onClick={() => {
              const nextSection = document.querySelector('.intro-section');
              if (nextSection) {
                nextSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}>
              <div style={{
                width: '40px',
                height: '40px',
                border: '2px solid rgba(255, 255, 255, 0.8)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease'
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255, 255, 255, 0.8)" strokeWidth="2">
                  <path d="M7 13l5 5 5-5M7 6l5 5 5-5"/>
                </svg>
              </div>
              <span style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '12px',
                marginTop: '8px',
                fontWeight: '500',
                letterSpacing: '1px'
              }}>SCROLL</span>
            </div>
          </section>
        ) : (
          <section className="hero" style={{backgroundImage: `url(${heroImages[currentPage]})`}}>
            <div className="hero-overlay">
              <div className="container">
                <div className="hero-content">
                  <h1 className="hero-title">
                    {navigationItems.find(item => item.id === currentPage)?.label}
                  </h1>
                </div>
              </div>
            </div>
          </section>
        )}

        <div className="container">
          {renderPageContent()}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'left'}}>
            <div className="footer-section">
              <h3>EcoFriendly Beach Rentals</h3>
              <p>Sustainable beach event rentals in Diani Beach, Kenya</p>
              <p>📍 Diani Beach Road, Diani Beach, Kenya</p>
              <p>📞 +254797185854 | 📧 Ecofriendlybeachrentals@gmail.com</p>
            </div>
            <div className="footer-section">
              <h3>Our Services</h3>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li>🏖️ Beach Weddings</li>
                <li>🎉 Beach Parties</li>
                <li>👥 Corporate Events</li>
                <li>📸 Photo Shoots</li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li><a href="#" onClick={() => setCurrentPage('about')}>About Us</a></li>
                <li><a href="#" onClick={() => setCurrentPage('products')}>Products</a></li>
                <li><a href="#" onClick={() => setCurrentPage('contact')}>Contact Us</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h3>Follow Us</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <a href="https://wa.me/254797185854?text=Hello%20EcoFriendly%20Beach%20Rentals!%20I'm%20interested%20in%20your%20services." target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src="/assets/whatsapp.png" alt="WhatsApp" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> WhatsApp
                </a>
                <a href="https://instagram.com/Ecofriendlybeachrentals" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src="/assets/ig.PNG" alt="Instagram" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> Instagram
                </a>
                <a href="https://tiktok.com/@Ecofriendlybeachrentals" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src="/assets/tiktok.png" alt="TikTok" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> TikTok
                </a>
                <a href="https://facebook.com/Ecofriendlybeachrentals" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <img src="/assets/fb.png" alt="Facebook" style={{ width: '22px', height: '22px', objectFit: 'contain' }} /> Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="footer-bottom" style={{textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)', opacity: 0.9}}>
            <p>&copy; 2025 EcoFriendly Beach Rentals. All rights reserved. | Designed for sustainable beach events</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;