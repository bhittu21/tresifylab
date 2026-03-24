/* ========================================
   TRESIFY LAB - MAIN JAVASCRIPT
   Animations & Interactions
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize all functionality
  initNavigation();
  initScrollAnimations();
  initParallax();
  initCursorEffects();
  initFormValidation();
  initCountUp();
});

/* ===== NAVIGATION ===== */
function initNavigation() {
  const nav = document.querySelector('.nav');
  const mobileToggle = document.querySelector('.nav-mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-menu-overlay');
  const mobileClose = document.querySelector('.mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-menu-links a');

  // Scroll effect for navigation
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      mobileOverlay.style.display = 'block';
      setTimeout(() => mobileOverlay.classList.add('active'), 10);
      document.body.style.overflow = 'hidden';
    });
  }

  // Close mobile menu
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    setTimeout(() => {
      mobileOverlay.style.display = 'none';
    }, 300);
    document.body.style.overflow = '';
  }

  if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);
  if (mobileOverlay) mobileOverlay.addEventListener('click', closeMobileMenu);
  
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Active link highlighting based on scroll position
  const sections = document.querySelectorAll('section[id]');
  
  window.addEventListener('scroll', function() {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === '#' + current) {
        link.classList.add('active');
      }
    });
  });
}

/* ===== SCROLL ANIMATIONS ===== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.fade-in, .fade-in-up, .scale-in, .stagger');
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.2
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animatedElements.forEach(el => {
    observer.observe(el);
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });
}

/* ===== PARALLAX EFFECTS ===== */
function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  let ticking = false;

  window.addEventListener('scroll', function() {
    if (!ticking) {
      window.requestAnimationFrame(function() {
        const scrollY = window.scrollY;
        
        orbs.forEach((orb, index) => {
          const speed = 0.3 + (index * 0.1);
          orb.style.transform = `translateY(${scrollY * speed}px)`;
        });
        
        ticking = false;
      });
      
      ticking = true;
    }
  });

  // Floating elements parallax
  const floatingElements = document.querySelectorAll('.floating-element');
  
  window.addEventListener('mousemove', function(e) {
    if (floatingElements.length === 0) return;
    
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    floatingElements.forEach((el, index) => {
      const speed = 0.02 + (index * 0.01);
      const x = (mouseX - 0.5) * 30 * speed;
      const y = (mouseY - 0.5) * 30 * speed;
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

/* ===== CURSOR EFFECTS ===== */
function initCursorEffects() {
  // Only enable on desktop
  if (window.innerWidth < 1024) return;

  const cards = document.querySelectorAll('.card, .case-study-card, .tech-item, .blog-card, .service-column');
  const buttons = document.querySelectorAll('.btn');

  // Card hover effect
  cards.forEach(card => {
    card.addEventListener('mouseenter', function(e) {
      const rect = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      this.style.setProperty('--mouse-x', `${x}px`);
      this.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // Button scale effect
  buttons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-2px) scale(1.02)';
    });
    
    btn.addEventListener('mouseleave', function() {
      this.style.transform = '';
    });
  });
}

/* ===== FORM VALIDATION ===== */
function initFormValidation() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const inputs = form.querySelectorAll('input[required], textarea[required]');
      let isValid = true;
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.classList.add('error');
        } else {
          input.classList.remove('error');
        }
        
        // Email validation
        if (input.type === 'email' && input.value) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(input.value)) {
            isValid = false;
            input.classList.add('error');
          }
        }
      });
      
      if (isValid) {
        // Show success message (replace with actual form submission)
        const submitBtn = form.querySelector('button[type="submit"]');
        if (submitBtn) {
          const originalText = submitBtn.textContent;
          submitBtn.textContent = 'Sent!';
          submitBtn.classList.add('btn-accent');
          
          setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.classList.remove('btn-accent');
            form.reset();
          }, 2000);
        }
      }
    });
    
    // Remove error class on input
    form.querySelectorAll('input, textarea').forEach(input => {
      input.addEventListener('input', function() {
        this.classList.remove('error');
      });
    });
  });
}

/* ===== COUNT UP ANIMATION ===== */
function initCountUp() {
  const stats = document.querySelectorAll('.result-value, .dashboard-stat-value');
  
  if (stats.length === 0) return;
  
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = el.textContent;
        const isPercentage = target.includes('%');
        const isNumber = /^\d+/.test(target);
        
        if (isNumber || isPercentage) {
          const num = parseInt(target.replace(/[^0-9]/g, ''));
          animateValue(el, 0, num, 2000);
        }
        
        observer.unobserve(el);
      }
    });
  }, observerOptions);

  stats.forEach(stat => {
    observer.observe(stat);
  });
}

function animateValue(el, start, end, duration) {
  const isPercentage = el.textContent.includes('%');
  const isPlus = el.textContent.includes('+');
  const isK = el.textContent.includes('K');
  
  let startTime = null;
  
  function step(timestamp) {
    if (!startTime) startTime = timestamp;
    const progress = Math.min((timestamp - startTime) / duration, 1);
    const easeProgress = easeOutQuart(progress);
    const current = Math.floor(easeProgress * (end - start) + start);
    
    if (isPercentage) {
      el.textContent = current + '%';
    } else if (isPlus) {
      el.textContent = current + '+';
    } else if (isK) {
      el.textContent = (current / 1000).toFixed(1) + 'K';
    } else {
      el.textContent = current;
    }
    
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  }
  
  requestAnimationFrame(step);
}

function easeOutQuart(x) {
  return 1 - Math.pow(1 - x, 4);
}

/* ===== SMOOTH SCROLL FOR NAVIGATION ===== */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.startsWith('#') && targetId !== '#') {
      e.preventDefault();
      const target = document.querySelector(targetId);
      if (target) {
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

/* ===== REVEAL ANIMATION FOR SECTIONS ===== */
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  
  window.addEventListener('scroll', function() {
    const windowHeight = window.innerHeight;
    
    reveals.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      const revealPoint = 150;
      
      if (elementTop < windowHeight - revealPoint) {
        el.classList.add('active');
      }
    });
  });
}

// Initialize reveal animation
revealOnScroll();

/* ===== ACCORDION FOR FAQ/PROCESS ===== */
document.querySelectorAll('.accordion-header').forEach(header => {
  header.addEventListener('click', function() {
    const accordion = this.parentElement;
    const content = accordion.querySelector('.accordion-content');
    const icon = this.querySelector('.accordion-icon');
    
    accordion.classList.toggle('active');
    
    if (accordion.classList.contains('active')) {
      content.style.maxHeight = content.scrollHeight + 'px';
      if (icon) icon.style.transform = 'rotate(180deg)';
    } else {
      content.style.maxHeight = '0';
      if (icon) icon.style.transform = 'rotate(0deg)';
    }
  });
});

/* ===== Lazy Loading Images ===== */
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

/* ===== PERFORMANCE OPTIMIZATION ===== */
// Debounce function for scroll events
function debounce(func, wait = 10, immediate = true) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Throttle function for resize events
function throttle(func, limit) {
  let inThrottle;
  return function() {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Apply throttled scroll handler for better performance
window.addEventListener('scroll', throttle(function() {
  // Additional scroll-based effects can be added here
}, 100));

/* ===== UTILITY FUNCTIONS ===== */
// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Get current page URL for active nav highlight
function setActiveNavLink() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// Initialize on load
setActiveNavLink();

/* ===== EXPORT FOR DEBUGGING ===== */
window.TresifyLab = {
  initNavigation,
  initScrollAnimations,
  initParallax,
  initCursorEffects,
  initFormValidation,
  initCountUp
};