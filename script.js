// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li a');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('active');
});

navItems.forEach(item => {
  item.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Sticky Navbar & Active States
const navbar = document.getElementById('navbar');
const sections = document.querySelectorAll('section, header');

window.addEventListener('scroll', () => {
  // Navbar bg
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active Link
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (pageYOffset >= (sectionTop - 300)) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').includes(current) && current !== '') {
      item.classList.add('active');
    }
  });
});

// Intersection Observer for scroll animations
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('appear');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.fade-in, .slide-up').forEach(el => {
  observer.observe(el);
});

// Contact Form Submit Interaction
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('.submit-btn');
    const originalContent = btn.innerHTML;
    
    btn.innerHTML = '<span>Message Sent</span> <i class="fas fa-check"></i>';
    btn.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
    
    setTimeout(() => {
      form.reset();
      btn.innerHTML = originalContent;
      btn.style.background = ''; // Reverts to CSS default gradient
    }, 3000);
  });
}

// Certificate Modal Logic
const modal = document.getElementById("certModal");
const modalImg = document.getElementById("modalImg");
const captionText = document.getElementById("modalCaption");
const closeModal = document.querySelector(".close-modal");

function openCertModal(imageSrc, caption) {
  modal.style.display = "block";
  modalImg.src = imageSrc;
  captionText.innerHTML = caption;
  document.body.style.overflow = "hidden"; // Prevent scrolling in background
}

if(closeModal) {
  closeModal.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
  }
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
}

