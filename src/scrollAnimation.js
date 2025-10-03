// Page-flip scroll animation for feature rows
export function animateOnScroll() {
  const featuresContainer = document.querySelector('.features-vertical');
  const elements = document.querySelectorAll('.animate-on-scroll');
  
  if (!featuresContainer || elements.length === 0) return;
  
  let currentIndex = 0;
  
  // Show first element initially
  elements[0].classList.add('visible');
  
  const handleScroll = () => {
    const containerRect = featuresContainer.getBoundingClientRect();
    const containerTop = containerRect.top;
    const containerHeight = containerRect.height;
    const windowHeight = window.innerHeight;
    
    // Only animate when container is in viewport
    if (containerTop <= 0 && containerTop + containerHeight > 0) {
      // Calculate progress within the container
      const scrollProgress = Math.abs(containerTop) / (containerHeight - windowHeight);
      const targetIndex = Math.min(Math.floor(scrollProgress * elements.length), elements.length - 1);
      
      if (targetIndex !== currentIndex) {
        // Hide current element
        elements[currentIndex].classList.remove('visible');
        elements[currentIndex].classList.add('hidden');
        
        // Show new element
        setTimeout(() => {
          elements[targetIndex].classList.remove('hidden');
          elements[targetIndex].classList.add('visible');
          currentIndex = targetIndex;
        }, 300);
      }
    }
  };
  
  window.addEventListener('scroll', handleScroll);
}
