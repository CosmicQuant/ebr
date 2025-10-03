// Animate vertical program cards on scroll
export function animateProgramsVerticalOnScroll() {
  const cards = document.querySelectorAll('.program-card-vertical');
  if (!cards.length) return;
  const observer = new window.IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.2 });
  cards.forEach(card => observer.observe(card));
}
// Professional scroll animation with smooth page-flip effects
export function animateOnScroll() {
  const featuresContainer = document.querySelector('.features-vertical');
  const viewport = document.querySelector('.features-viewport');
  const elements = document.querySelectorAll('.feature-row');

  if (!featuresContainer || !viewport || elements.length === 0) return;

  let currentIndex = 0;
  let isAnimating = false;

  // Hide all elements except the first
  elements.forEach((el, idx) => {
    el.classList.remove('visible', 'hidden');
    if (idx === 0) {
      el.classList.add('visible');
    } else {
      el.classList.add('hidden');
    }
  });

  const handleScroll = () => {
    if (isAnimating) return;

    const containerRect = featuresContainer.getBoundingClientRect();
    const viewportTop = containerRect.top;
    const containerHeight = containerRect.height;
    const windowHeight = window.innerHeight;

    // Only animate when the features container is in viewport
    if (viewportTop <= 0 && viewportTop + containerHeight > windowHeight) {
      // Calculate scroll progress within the container (0 to 1)
      const scrollProgress = Math.abs(viewportTop) / (containerHeight - windowHeight);
      const targetIndex = Math.min(
        Math.floor(scrollProgress * elements.length),
        elements.length - 1
      );

      // Change feature when crossing thresholds
      if (targetIndex !== currentIndex && targetIndex >= 0) {
        isAnimating = true;

        // Hide all elements
        elements.forEach((el, idx) => {
          el.classList.remove('visible', 'hidden');
          if (idx === targetIndex) {
            el.classList.add('visible');
          } else {
            el.classList.add('hidden');
          }
        });

        currentIndex = targetIndex;
        // End animation after transition duration
        setTimeout(() => {
          isAnimating = false;
        }, 400);
      }
    }
  };

  // Throttled scroll handler for better performance
  let ticking = false;
  const scrollHandler = () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        handleScroll();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', scrollHandler, { passive: true });

  // Cleanup function
  return () => {
    window.removeEventListener('scroll', scrollHandler);
  };
}

// Initialize scroll-triggered animations for other elements
export function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);
  
  // Observe cards and other elements that should animate on scroll
  const animatedElements = document.querySelectorAll('.feature-card, .program-card, .stat-card, .impact-card, .partner-card, .value-card');
  animatedElements.forEach(el => {
    el.classList.add('animate-on-scroll');
    observer.observe(el);
  });
}