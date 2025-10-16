// Reading Progress Bar
// Add this to post layout
(function() {
  if (document.querySelector('.post-container')) {
    // Create progress bar
    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress-bar';
    progressBar.innerHTML = '<div class="reading-progress-fill"></div>';
    document.body.appendChild(progressBar);
    
    // Update progress on scroll
    function updateProgress() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = documentHeight - windowHeight;
      const progress = (scrollTop / maxScroll) * 100;
      
      const fill = document.querySelector('.reading-progress-fill');
      if (fill) {
        fill.style.width = progress + '%';
      }
    }
    
    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    updateProgress();
  }
})();

// Smooth anchor scrolling
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href !== '#0') {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
});

// Add "Back to Top" button
(function() {
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  backToTop.title = 'Back to top';
  document.body.appendChild(backToTop);
  
  function toggleBackToTop() {
    if (window.pageYOffset > 300) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
  
  window.addEventListener('scroll', toggleBackToTop);
  toggleBackToTop();
  
  backToTop.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
})();
