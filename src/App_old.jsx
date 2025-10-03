import { useState, useEffect } from  // Carousel images and subtitles for homepage hero
  const carouselImages = [
    {
      url: '/assets/vace.jpg',
      subtitle: 'ELEGANT FLOWER VASES',
      text: 'Add a touch of elegance to your event with our beautiful vases.'
    },
    {
      url: '/assets/landing3.jpeg',
      subtitle: 'MEMORABLE EXPERIENCES',
      text: 'Create unique memories with our curated beach experiences.'
    },
    {
      url: '/assets/twotents.jpeg',
      subtitle: 'DOUBLE TENT SETUP',
      text: 'Spacious and stylish tent arrangements for any occasion.'
    },
    {
      url: '/assets/landingch1.jpg',
      subtitle: 'CHIC BEACH SEATING',
      text: 'Relax and enjoy with our stylish beach chairs.'
    },
  ];./styles-professional.css';
import './programs-vertical-animate.css';
import './about-hero-animated.css';
import { animateOnScroll, initScrollAnimations, animateProgramsVerticalOnScroll } from './scrollAnimation-professional';

const navigationItems = [
  { id: 'home', label: 'Home', icon: '🏠' },
  { id: 'about', label: 'About', icon: '�️' },
  { id: 'products', label: 'Products', icon: '�️' },
  { id: 'contact', label: 'Contact', icon: '📧' }
];

const heroImages = {
  home: '/assets/vace.jpg',
  about: '/assets/landing3.jpeg',
  products: '/assets/twotents.jpeg',
  contact: '/assets/landingch1.jpg'
};

const impactStats = [
  { number: '100+', label: 'Events Completed', icon: '�' },
  { number: '500+', label: 'Happy Clients', icon: '�' },
  { number: '5', label: 'Years Experience', icon: '⭐' },
  { number: '50+', label: 'Beach Setups', icon: '🏖️' }
];

function App() {
  const [showSuccess, setShowSuccess] = useState(false);
  // State declarations must come first
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Carousel images and subtitles for homepage hero
  const carouselImages = [
    {
      url: 'https://plus.unsplash.com/premium_photo-1730037811879-d6594d862eb6?q=80&w=1139&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      subtitle: 'NURTURING NATURE, EMPOWERING COMMUNITIES',
    },
    {
    url: '/assets/women.jpg', // Local women.jpg image
      subtitle: 'EMPOWERING COMMUNITIES FOR GREEN GROWTH',
    },
    {
      url: 'https://images.unsplash.com/photo-1649058799638-e841b3ad7ae1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2VlZGxpbmdzfGVufDB8fDB8fHww', // Unsplash seedling image
      subtitle: 'SUSTAINABLE LAND DEVELOPMENT & SMART AGRICULTURE',
    },
    {
    url: '/assets/tanariver.jpg', // Local tanariver.jpg image
      subtitle: 'CONSERVING KENYA’S NATURAL HERITAGE',
    },
  ];

  // Animate vertical program cards on scroll
  useEffect(() => {
    if (currentPage === 'programs') {
      setTimeout(() => {
        animateProgramsVerticalOnScroll();
      }, 300);
    }
      // Scroll to top when changing page
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  // Auto-advance carousel every 4 seconds (slower)
  useEffect(() => {
    if (currentPage !== 'home') return;
    const interval = setInterval(() => {
      setCarouselIndex((prev) => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [currentPage, carouselImages.length]);

  // Add scroll-triggered animation for program sections
  useEffect(() => {
    const observeElements = () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, { threshold: 0.2 });

      // Observe all program sections
      const programSections = document.querySelectorAll('.full-page-feature');
      programSections.forEach(section => {
        observer.observe(section);
      });

      return () => observer.disconnect();
    };

    if (currentPage === 'home' || currentPage === 'programs') {
      const cleanup = observeElements();
      return cleanup;
    }
  }, [currentPage]);

  // Statistics and page animations
  useEffect(() => {
    if (currentPage === 'impact') {
      // Set up intersection observer for statistics animation
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !animatedStats) {
            setAnimatedStats(true);
            // Start counter animations
            const counters = document.querySelectorAll('.counter');
            counters.forEach(counter => {
              const target = parseInt(counter.dataset.target);
              const increment = target / 100; // Animate over 100 steps
              let current = 0;
              const countTimer = setInterval(() => {
                current += increment;
                if (current >= target) {
                  current = target;
                  clearInterval(countTimer);
                }
                // Format the number based on the original format
                if (target >= 10000) {
                  counter.textContent = Math.floor(current).toLocaleString() + '+';
                } else {
                  counter.textContent = Math.floor(current) + '+';
                }  
              }, 50); // Slower animation - update every 50ms
            });
          }
        });
      }, { threshold: 0.3 });

      // Observe the stats section
      const statsSection = document.querySelector('.stats-grid');
      if (statsSection) {
        observer.observe(statsSection);
      }

      return () => observer.disconnect();
    } else {
      setAnimatedStats(false);
    }
    
    if (currentPage === 'home') {
      setTimeout(() => {
        animateOnScroll();
        initScrollAnimations();
        // Set up intersection observer for home page stats too
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
                  if (target >= 10000) {
                    counter.textContent = Math.floor(current).toLocaleString() + '+';
                  } else {
                    counter.textContent = Math.floor(current) + '+';
                  }
                }, 50); // Slower animation
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
    const partnerTapeItems = [
  { file: 'GARISSA-COUNTY.png', name: 'Garissa County' },
  { file: 'Ishaqbini-Conservancy.png', name: 'Ishaqbini Conservancy' },
  { file: 'Kenya-Forest-Services.jpg', name: 'Kenya Forest Services' },
  { file: 'Kwale-County.png', name: 'Kwale County' },
  { file: 'Ministry-Of-Environment.png', name: 'Ministry of Environment' },
  { file: 'NCDF-Ijara.png', name: 'NCDF Ijara' },
  { file: 'UNEP.png', name: 'UNEP' }
    ];
    switch (currentPage) {
      case 'home':
        return (
        <div className="page-content">
          <section className="intro-section">
            <h2 className="section-title carousel-title-animate">Nature Conservation & Climate Management</h2>
            <p className="section-subtitle home-centered">
              Building a sustainable future through conservation, community empowerment, and climate action.
            </p>
            <p className="section-description">
              Our programs combine community engagement, strategic partnerships, and sustainable land development 
              to safeguard biodiversity and create green economic opportunities.
            </p>
          </section>
          <section className="features-vertical">
            <div className="features-viewport">
              <div className="feature-row full-page-feature">
                <img src="/assets/boniforest.png" alt="Forest Conservation & Protection" className="feature-img-large" />
                <div className="feature-desc">
                  <h3>Forest Conservation & Protection</h3>
                  <p>
                    We are committed to safeguarding Kenya’s natural forests. We actively counter deforestation through continuous awareness campaigns and capacity-building programs for local communities, schools, and youth groups. By collaborating with enforcement agencies like the <b>Kenya Forest Service (KFS)</b>, county environmental departments, and local administrations, we strengthen forest protection measures, reduce illegal logging, and promote sustainable land-use practices. Furthermore, we work closely with established conservancies, such as <b>Ishaqbini Conservancy in Masalani</b>, to implement habitat restoration and wildlife protection awareness campaigns, creating vital synergies for biodiversity conservation.
                  </p>
                </div>
              </div>
              <div className="feature-row full-page-feature">
                <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80" alt="Afforestation & Reforestation" className="feature-img-large" />
                <div className="feature-desc">
                  <h3>Afforestation & Reforestation</h3>
                  <p>
                    Our large-scale afforestation and reforestation projects target critical ecological zones. This includes planting trees in <b>Tana River riparian zones</b> to prevent soil erosion and restore natural water cycles, as well as in the <b>Boni Forest</b> and coastal areas, which are vital biodiversity hotspots. We also implement structured urban greening programs in public spaces across <b>Garissa, Masalani, Ijara, and Kwale Counties</b> to enhance air quality, create shade, and beautify urban environments.
                  </p>
                </div>
              </div>
              <div className="feature-row full-page-feature">
                <img src="/assets/women.jpg" alt="Women-Centered Empowerment" className="feature-img-large" />
                <div className="feature-desc">
                  <h3>Women-Centered Empowerment</h3>
                  <p>
                    Recognizing the pivotal role of women in environmental conservation, we support female-headed households in <b>Garissa (Waberi Ward)</b> and <b>Masalani Municipality</b>. We achieve this by supplying seedlings, providing training in tree nursery management and tree planting techniques, and purchasing tree-based products (e.g., fruits, seedlings, timber substitutes) to provide sustainable income and reduce reliance on destructive activities like charcoal burning.
                  </p>
                </div>
              </div>
              <div className="feature-row full-page-feature">
                <img src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80" alt="Sustainable Land Development & Agriculture" className="feature-img-large" />
                <div className="feature-desc">
                  <h3>Sustainable Land Development & Agriculture</h3>
                  <p>
                    We take a holistic approach to land management and food security. We strategically acquire and develop land for <b>sustainable agricultural ventures</b>, including tree farming, horticulture, and organic farming, as well as for eco-friendly land resale, ensuring parcels are managed to support forest regeneration and sustainable land-use policies. Complementing this, we promote <b>mixed and rotational farming practices</b> within <b>Tana River County</b> to enhance soil fertility, improve water retention, increase crop yields, and create climate-smart farming models that improve food security.
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section className="impact-stats-section">
            <div className="container">
              <h2 className="section-title">Our Impact in Numbers</h2>
              <p className="section-subtitle">Measurable results from our conservation efforts across Kenya</p>
              <div className="stats-grid">
                {impactStats.map((stat, index) => (
                  <div 
                    key={index} 
                    className={`stat-card ${animatedStats ? 'animated' : ''}`}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <div className="stat-icon">{stat.icon}</div>
                    <div className="stat-number counter" data-target={stat.number.replace(/[^0-9]/g, '')}>0</div>
                    <div className="stat-label">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
          <div className="partners-bg">
            <div className="partners-content">
              <section className="partners-summary-section" style={{ textAlign: 'center', marginTop: '3rem', position: 'relative', zIndex: 3 }}>
                <h2 className="section-title carousel-title-animate" style={{ textAlign: 'center', margin: '0 auto', fontWeight: 700, fontSize: '2.5rem' }}>Our Partners</h2>
                <div style={{ height: '2.5rem' }}></div>
                <p className="section-description" style={{ textAlign: 'center', margin: '0 auto', maxWidth: '600px' }}>
                  We work together to protect forests, restore habitats, and empower local communities through strategic partnerships.
                </p>
                <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>🏛️ Government Partners</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>🦓 Conservation Partners</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>👥 Community Partners</span>
                  <span style={{ fontSize: '1.25rem', fontWeight: '600' }}>🌍 International Partners</span>
                </div>
                {/* Partner logos tape below partners section, matching home page */}
                <div className="partners-tape">
                  <div className="tape-track">
                    {partnerTapeItems.map((item, idx) => (
                      <div key={item.file} className="partner-logo-tape-item">
                          <img
                            src={`/assets/${item.file}`}
                          alt={item.file === 'Ministry Of Environment.png' ? 'Ministry of Environment' : item.name}
                          className="partner-logo-tape"
                        />
                        <div className="partner-logo-name">{item.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        );
      case 'programs':
        const flagshipPrograms = [
          {
            title: 'Countering Deforestation & Strengthening Forest Governance',
            image: 'https://images.unsplash.com/photo-1734445007114-0be4c9d2b3b8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'We implement awareness campaigns, training sessions, and information-sharing platforms to reduce illegal logging and unsustainable land use. By working hand-in-hand with Kenya Forest Service (KFS), local administrations, and county enforcement teams, we help protect standing forests and safeguard natural carbon sinks.',
            impacts: [
              'Prevented deforestation preserves millions of tons of stored carbon.',
              'Strengthened forest governance and reduced illegal logging.',
              'Protected natural carbon sinks and biodiversity.'
            ]
          },
          {
            title: 'Strategic Partnerships with Conservancies & Wildlife Areas',
            image: '/assets/giraffe.PNG',
            description: 'Through liaison and joint programs with conservancies such as Ishaqbini Conservancy in Masalani, we engage in tree planting, ecosystem restoration, and wildlife protection campaigns. These collaborations secure critical biodiversity corridors while creating new carbon sequestration zones.',
            impacts: [
              'Secured critical biodiversity corridors.',
              'Created new carbon sequestration zones.',
              'Enabled co-branded conservation programs with measurable carbon capture metrics.'
            ]
          },
          {
            title: 'Afforestation & Large-Scale Tree Planting',
            image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=1200&q=80',
            description: 'We lead high-volume tree planting initiatives along Tana River riparian zones to reduce soil erosion and restore river ecosystems, Kenya’s coastal belt and Boni Forest, and urban centers in Garissa, Masalani, Ijara, and Kwale through structured greening programs.',
            impacts: [
              'Each hectare planted captures an estimated 10–15 tons of CO₂ annually.',
              'Restored river ecosystems and reduced soil erosion.',
              'Enhanced urban greening and biodiversity.'
            ]
          },
          {
            title: 'Urban Greening & Climate-Resilient Cities',
            image: '/assets/urbangreening.jpg',
            description: 'Through town greening projects, we plant climate-smart trees in schools, markets, roadsides, and public parks—cooling urban heat islands, improving air quality, and enhancing community well-being.',
            impacts: [
              'Reduced urban heat islands and improved air quality.',
              'Enhanced community well-being and green spaces.',
              'Enabled branded urban forests and city greening drives.'
            ]
          },
          {
            title: 'Women-Centered Capacity Building & Livelihood Enhancement',
            image: '/assets/women.jpg',
            description: 'In Garissa (Waberi Ward) and Masalani Municipality, we empower female-headed households by supplying tree seedlings, training in tree nursery management, and purchasing tree products to create steady green income streams.',
            impacts: [
              'Supports gender inclusion and social co-benefits for carbon projects.',
              'Created steady green income streams for women.',
              'Empowered female-headed households through training and resources.'
            ]
          },
          {
            title: 'Climate-Smart Agriculture & Soil Carbon Regeneration',
            image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=1200&q=80',
            description: 'We promote mixed and rotational farming in Tana River to increase soil fertility, improve yields, and enhance soil carbon storage.',
            impacts: [
              'Healthy soils capture and retain more carbon, boosting long-term sequestration.',
              'Improved yields and food security for local communities.',
              'Enhanced soil fertility and climate resilience.'
            ]
          },
          {
            title: 'Nursery Beds & Climate-Smart Seedling Production',
            image: 'https://images.unsplash.com/photo-1518931169559-527a99b4074d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjN8fHNlZWRsaW5nfGVufDB8fDB8fHww',
            description: 'Tana Green Investment owns and manages large-scale nursery beds dedicated to drought-tolerant, high-carbon trees for households, institutions, and large-scale planting projects. Seedlings are distributed and sold at subsidized rates to accelerate adoption.',
            impacts: [
              'Bulk purchase for carbon credit generation or branded seedling sponsorship.',
              'Accelerated adoption of drought-tolerant, high-carbon trees.',
              'Supported large-scale planting projects and household greening.'
            ]
          },
          {
            title: 'Sustainable Land Acquisition & Green Agriculture Development',
            image: 'https://images.unsplash.com/photo-1635070865871-2ec2c447988d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            description: 'We strategically acquire and develop land for eco-friendly agriculture and tree farming for carbon offset projects, and conservation-focused resale to partners seeking nature-based carbon credit investments.',
            impacts: [
              'Long-term carbon credit potential from managed reforestation and agroforestry ventures.',
              'Enabled eco-friendly agriculture and tree farming for carbon offset projects.',
              'Supported conservation-focused resale for nature-based investments.'
            ]
          }
        ];
        return (
          <div className="page-content">
            <section className="programs-section">
              <h2 className="section-title carousel-title-animate">Nature Conservation, Forest Propagation & Climate Management Programs</h2>
              <p className="section-description">Tana Green Investment is driving large-scale environmental restoration and community-based climate solutions across Kenya. Our initiatives are designed to capture carbon, regenerate ecosystems, and create measurable social impact—making them ideal for corporate partners, carbon credit buyers, and ESG investors.</p>
              <div className="programs-vertical-list">
                {flagshipPrograms.map((program, idx) => (
                  <div
                    key={program.title}
                    id={
                      idx === 0 ? 'forest' :
                      idx === 1 ? 'afforestation' :
                      idx === 2 ? 'land' :
                      idx === 3 ? 'women' :
                      undefined
                    }
                    className={`program-card-vertical animate-on-scroll${idx % 2 === 0 ? ' left-img' : ' right-img'}`}
                    style={{
                      display: 'flex',
                      flexDirection: idx % 2 === 0 ? 'row' : 'row-reverse',
                      alignItems: 'center',
                      gap: '3.5rem',
                      minHeight: '70vh',
                      width: '100%',
                      maxWidth: '1100px',
                      margin: '0 auto 3rem auto',
                      boxSizing: 'border-box',
                    }}
                  >
                    <img
                      src={program.image}
                      alt={program.title}
                      style={{ width: '50%', height: '60vh', objectFit: 'cover', borderRadius: '18px', boxShadow: '0 4px 24px rgba(45,90,39,0.10)' }}
                    />
                    <div style={{ flex: 1, minWidth: '260px', padding: '2rem 0' }}>
                      <h3 style={{ color: '#2d5a27', fontWeight: 700, fontSize: '1.7rem', marginBottom: '1.1rem' }}>{program.title}</h3>
                      <p style={{ fontSize: '1rem', color: '#444', marginBottom: '1.2rem' }}>{program.description}</p>
                      <ul style={{ fontWeight: 600, color: '#6faf6f', fontSize: '0.97rem', marginBottom: '0.6rem', paddingLeft: '1.2rem', listStyle: 'disc' }}>
                        {program.impacts && program.impacts.map((impact, i) => (
                          <li key={i}>{impact}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        );
      // Impact page removed
      case 'about':
        return (
          <div className="page-content">
            <div>
              <div className="about-cards-grid" style={{display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem'}}>
                <div className="about-card" style={{background: 'white', borderRadius: '16px', boxShadow: '0 2px 16px rgba(45,90,39,0.07)', padding: '2rem', minWidth: '260px', maxWidth: '340px', textAlign: 'center'}}>
                  <h3 style={{color: '#2d5a27'}}>🌱 Mission</h3>
                  <p>To safeguard biodiversity, empower communities, and build a sustainable future through conservation and climate action.</p>
                </div>
                <div className="about-card" style={{background: 'white', borderRadius: '16px', boxShadow: '0 2px 16px rgba(45,90,39,0.07)', padding: '2rem', minWidth: '260px', maxWidth: '340px', textAlign: 'center'}}>
                  <h3 style={{color: '#2d5a27'}}>🌍 Vision</h3>
                  <p>To be a leader in nature conservation, climate management, and green economic development in Kenya and beyond.</p>
                </div>
                <div className="about-card" style={{background: 'white', borderRadius: '16px', boxShadow: '0 2px 16px rgba(45,90,39,0.07)', padding: '2rem', minWidth: '260px', maxWidth: '340px', textAlign: 'center'}}>
                  <h3 style={{color: '#2d5a27'}}>⏳ Values</h3>
                  <p>Integrity, sustainability, inclusivity, and innovation guide everything we do.</p>
                </div>
              </div>
              <h2 className="section-title" style={{marginTop: '3rem', textAlign: 'center'}}>Meet the Team</h2>
              <div className="team-grid" style={{display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '2rem', textAlign: 'center'}}>
                <div className="team-card" style={{background: 'white', borderRadius: '16px', boxShadow: '0 2px 16px rgba(45,90,39,0.07)', padding: '2rem', minWidth: '220px', maxWidth: '260px', textAlign: 'center'}}>
                    <img src={"/assets/Yusuf Ahmed.jpeg"} alt="Yusuf Ahmed" style={{width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: '3px solid #6faf6f'}} />
                  <h4 style={{color: '#2d5a27', marginBottom: '0.5rem'}}>Yusuf Ahmed</h4>
                  <p style={{fontWeight: 600, color: '#666'}}>Founder & CEO</p>
                </div>
                <div className="team-card" style={{background: 'white', borderRadius: '16px', boxShadow: '0 2px 16px rgba(45,90,39,0.07)', padding: '2rem', minWidth: '220px', maxWidth: '260px', textAlign: 'center'}}>
                    <img src={"/assets/Mohamed Ismail.jpeg"} alt="Mohammed Ismail" style={{width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: '3px solid #6faf6f'}} />
                  <h4 style={{color: '#2d5a27', marginBottom: '0.5rem'}}>Mohammed Ismail</h4>
                  <p style={{fontWeight: 600, color: '#666'}}>Operations Manager</p>
                </div>
                <div className="team-card" style={{background: 'white', borderRadius: '16px', boxShadow: '0 2px 16px rgba(45,90,39,0.07)', padding: '2rem', minWidth: '220px', maxWidth: '260px', textAlign: 'center'}}>
                  <img src="https://ui-avatars.com/api/?name=Mohammed+Ahmed&background=6faf6f&color=fff&size=90" alt="Mohammed Ahmed" style={{width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: '3px solid #6faf6f'}} />
                  <h4 style={{color: '#2d5a27', marginBottom: '0.5rem'}}>Mohammed Ahmed</h4>
                  <p style={{fontWeight: 600, color: '#666'}}>Finance Manager</p>
                </div>
                <div className="team-card" style={{background: 'white', borderRadius: '16px', boxShadow: '0 2px 16px rgba(45,90,39,0.07)', padding: '2rem', minWidth: '220px', maxWidth: '260px', textAlign: 'center'}}>
                  <img src="https://ui-avatars.com/api/?name=Ali+Hassan&background=6faf6f&color=fff&size=90" alt="Ali Hassan" style={{width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1rem', border: '3px solid #6faf6f'}} />
                  <h4 style={{color: '#2d5a27', marginBottom: '0.5rem'}}>Ali Hassan</h4>
                  <p style={{fontWeight: 600, color: '#666'}}>Human Resource & Relations Manager</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'partners':
        return (
          <div className="page-content">
            <section className="partners-section">
                <h2 className="section-title" style={{ textAlign: 'center', margin: '0 auto 2.5rem auto', fontWeight: 700, fontSize: '2.5rem', borderBottom: 'none', boxShadow: 'none' }}>Our Partners</h2>
              <p className="section-description">
                We work together to protect forests, restore habitats, and empower local communities through strategic partnerships.
              </p>
              <div className="partners-grid">
                <div className="partner-card">
                  <h3>🏛️ Government Partners</h3>
                  <ul>
                    <li>Kenya Forest Service (KFS)</li>
                    <li>County Environmental Departments</li>
                    <li>Local Administrations</li>
                    <li>Ministry of Environment</li>
                  </ul>
                </div>
                <div className="partner-card">
                  <h3>🦓 Conservation Partners</h3>
                  <ul>
                    <li>Ishaqbini Conservancy</li>
                    <li>Wildlife Conservation Groups</li>
                    <li>Environmental NGOs</li>
                    <li>Research Institutions</li>
                  </ul>
                </div>
                <div className="partner-card">
                  <h3>👥 Community Partners</h3>
                  <ul>
                    <li>Women's Groups</li>
                    <li>Youth Organizations</li>
                    <li>Farmer Cooperatives</li>
                    <li>Local Communities</li>
                  </ul>
                </div>
                <div className="partner-card">
                  <h3>🌍 International Partners</h3>
                  <ul>
                    <li>UN Environment Programme</li>
                    <li>Climate Action Networks</li>
                    <li>Development Organizations</li>
                    <li>Research Collaborations</li>
                  </ul>
                </div>
              </div>
            </section>
            {/* Partner logos tape below partners section */}
            <div className="partners-tape">
              <div className="tape-track">
                    {[
                      { file: 'GARISSA-COUNTY.png', name: 'Garissa County' },
                      { file: 'Ishaqbini-Conservancy.png', name: 'Ishaqbini Conservancy' },
                      { file: 'Kenya-Forest-Services.jpg', name: 'Kenya Forest Services' },
                      { file: 'Kwale-County.png', name: 'Kwale County' },
                      { file: 'Ministry-Of-Environment.png', name: 'Ministry Of Environment' },
                      { file: 'NCDF-Ijara.png', name: 'NCDF Ijara' },
                      { file: 'UNEP.png', name: 'UNEP' }
                    ].map((item, idx) => (
                  <div key={item.file} className="partner-logo-tape-item">
                        <img
                          src={`/assets/${item.file}`}
                      alt={item.name}
                      className="partner-logo-tape"
                    />
                    <div className="partner-logo-name">{item.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="page-content">
            <section className="contact-section">
              <h2 className="section-title" style={{ textAlign: 'center' }}>Get In Touch</h2>
              <p className="section-description">
                Ready to join our mission? Contact us to learn more about our programs or explore partnership opportunities.
              </p>
              
              <div className="contact-container">
                <div className="contact-form-container">
                  <form className="contact-form" name="contact" method="POST" data-netlify="true" onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target;
                    const data = new FormData(form);
                    fetch('/', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                      body: new URLSearchParams(data).toString(),
                    })
                      .then(() => setShowSuccess(true))
                      .catch(() => alert('There was an error submitting the form. Please try again.'));
                  }}>
                    <input type="hidden" name="form-name" value="contact" />
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input type="text" id="name" name="name" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input type="email" id="email" name="email" required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="organization">Organization (Optional)</label>
                      <input type="text" id="organization" name="organization" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" name="message" rows="5" required></textarea>
                    </div>
                    <button type="submit" className="submit-btn">Send Message</button>
                    {showSuccess && (
                      <div style={{marginTop: '1.5rem', color: '#2d5a27', fontWeight: 600, fontSize: '1.1rem', background: '#e8f5e8', padding: '1rem', borderRadius: '8px', textAlign: 'center'}}>
                        Thank you for contacting us! We have received your message and will get back to you soon.
                      </div>
                    )}
                  </form>
                </div>
                
                <div className="contact-info">
                  <div className="info-card">
                    <h3>📧 Email Us</h3>
                    <p><a href="mailto:info@tanagreen.co.ke">info@tanagreen.co.ke</a></p>
                  </div>
                  <div className="info-card">
                    <h3>📱 Call Us</h3>
                    <p>+254 701 789550</p>
                  </div>
                  <div className="info-card">
                    <h3>📍 Our Address</h3>
                    <p>Harambee Road, Garissa, Kenya</p>
                  </div>
                  <div className="info-card">
                    <h3>🌐 Follow Us</h3>
                    <p>Social media links coming soon</p>
                  </div>
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
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1 style={{cursor: 'pointer'}} onClick={() => setCurrentPage('home')}>Tana Green Investments</h1>
              <span className="tagline">Nurturing Nature, Empowering Communities</span>
            </div>
            
            {/* Desktop navigation */}
            <nav className="nav nav-centered desktop-nav">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
                  onClick={() => setCurrentPage(item.id)}
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
              style={{ background: 'none', border: 'none', padding: '0.5rem', marginLeft: '1rem', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            >
              <span style={{ width: '28px', height: '4px', background: '#2d5a27', margin: '5px 0', borderRadius: '2px' }}></span>
              <span style={{ width: '28px', height: '4px', background: '#2d5a27', margin: '5px 0', borderRadius: '2px' }}></span>
              <span style={{ width: '28px', height: '4px', background: '#2d5a27', margin: '5px 0', borderRadius: '2px' }}></span>
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
                  <p className="hero-subtitle carousel-fade" key={carouselIndex}>
                    {carouselImages[carouselIndex].subtitle}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="hero" style={{backgroundImage: `url(${heroImages[currentPage]})`}}>
            {currentPage === 'about' ? (
              <div className="container">
                <div className="hero-content about-hero-animated" style={{textAlign: 'center', maxWidth: '800px', margin: '4rem auto'}}>
                  <h1 className="hero-title" style={{marginBottom: '1.5rem', color: '#fff', fontWeight: 800, fontSize: '2.7rem'}}>About Us</h1>
                  <p style={{fontSize: '1.1rem', color: '#fff', fontWeight: 500}}>
                    Tana Green Investments is dedicated to protecting Kenya’s natural heritage and promoting sustainable land use as a driver of climate resilience. We combine community engagement, strategic partnerships, and innovative programs to create lasting impact for people and nature.
                  </p>
                </div>
              </div>
            ) : (
              <div className="hero-overlay">
                <div className="container">
                  <div className="hero-content">
                    <h1 className="hero-title">
                      {navigationItems.find(item => item.id === currentPage)?.label}
                    </h1>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        <div className="container">
          {renderPageContent()}
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-content" style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', textAlign: 'left'}}>
            {/* Who We Are */}
            <div className="footer-section">
              <h3>Tana Green Investments</h3>
              <p>A team of passionate environmentalists, community leaders, and development experts dedicated to making a positive impact on Kenya's natural heritage.</p>
            </div>
            {/* What We Do */}
            <div className="footer-section">
              <h3>What We Do</h3>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li><a href="#forest" onClick={() => setCurrentPage('programs')}>🌳 Forest Conservation & Protection</a></li>
                <li><a href="#afforestation" onClick={() => setCurrentPage('programs')}>🌱 Afforestation & Reforestation</a></li>
                <li><a href="#women" onClick={() => setCurrentPage('programs')}>👩 Women-Centered Empowerment</a></li>
                <li><a href="#land" onClick={() => setCurrentPage('programs')}>🌾 Sustainable Land Development & Agriculture</a></li>
              </ul>
            </div>
            {/* Quick Links */}
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li><a href="#" onClick={() => setCurrentPage('about')}>About Us</a></li>
                <li><a href="#" onClick={() => setCurrentPage('programs')}>Our Programs</a></li>
                <li><a href="#" onClick={() => setCurrentPage('partners')}>Our Partners</a></li>
                <li><a href="#" onClick={() => setCurrentPage('contact')}>Contact Us</a></li>
              </ul>
            </div>
            {/* Contact Info */}
            <div className="footer-section">
              <h3>Contact Info</h3>
              <ul style={{listStyle: 'none', padding: 0}}>
                <li>📍 Harambee Road, Garissa, Kenya</li>
                <li>📧 <a href="mailto:info@tanagreen.co.ke">info@tanagreen.co.ke</a></li>
                <li>📱 +254 701 789550</li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom" style={{textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.2)', opacity: 0.9}}>
            <p>&copy; 2025 Tana Green Investments Limited. All rights reserved.</p>
          </div>
        </div>
      </footer>
          </div>
        );
}

export default App;