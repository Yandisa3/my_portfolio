// ========== HAMBURGER MENU TOGGLE ==========
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('active'));
        });
    }
});

// ========== PROJECT FILTER ==========
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    const buttons = document.querySelectorAll('.filter-btn');
    
    buttons.forEach(btn => {
        btn.classList.remove('active');
    });
    
    if (event && event.target) {
        event.target.classList.add('active');
    }
    
    projects.forEach(project => {
        if (category === 'all' || project.getAttribute('data-category') === category) {
            project.style.display = 'block';
            project.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
            project.style.display = 'none';
        }
    });
}

// ========== PROJECT DETAILS MODAL ==========
function showProjectDetails(title, description) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    if (modal && modalTitle && modalDescription) {
        modalTitle.textContent = title;
        modalDescription.textContent = description;
        modal.style.display = 'block';
        modal.style.animation = 'fadeIn 0.3s ease-in-out';
    }
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// ========== CONTACT FORM VALIDATION ==========
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    
    if (nameError) nameError.style.display = 'none';
    if (emailError) emailError.style.display = 'none';
    if (subjectError) subjectError.style.display = 'none';
    if (messageError) messageError.style.display = 'none';
    
    if (name) name.classList.remove('error');
    if (email) email.classList.remove('error');
    if (subject) subject.classList.remove('error');
    if (message) message.classList.remove('error');
    
    let isValid = true;
    
    if (name && name.value.trim() === '') {
        if (nameError) nameError.style.display = 'block';
        name.classList.add('error');
        isValid = false;
    }
    
    if (email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '' || !emailPattern.test(email.value)) {
            if (emailError) emailError.style.display = 'block';
            email.classList.add('error');
            isValid = false;
        }
    }
    
    if (subject && subject.value.trim() === '') {
        if (subjectError) subjectError.style.display = 'block';
        subject.classList.add('error');
        isValid = false;
    }
    
    if (message && message.value.trim() === '') {
        if (messageError) messageError.style.display = 'block';
        message.classList.add('error');
        isValid = false;
    }
    
    if (isValid) {
        const form = document.getElementById('contactForm');
        const successMsg = document.getElementById('successMessage');
        
        if (form) form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
        
        saveMessage(name.value, email.value, subject.value, message.value);
        playNotificationSound();
    }
    
    return false;
}

function resetForm() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMessage');
    
    if (form) {
        form.reset();
        form.style.display = 'block';
    }
    if (successMsg) successMsg.style.display = 'none';
    
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
        el.classList.remove('error');
    });
}

function saveMessage(name, email, subject, message) {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toLocaleString()
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    console.log('Message saved to localStorage!');
}

function playNotificationSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.frequency.value = 880;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
        console.log('Notification sound played');
    }
}

// ========== SLIDESHOW FUNCTIONALITY ==========
let slideIndex = 1;
let autoSlideInterval;

// Initialize slideshow
window.addEventListener('DOMContentLoaded', function() {
    showSlides(slideIndex);
    startAutoSlide();
});

function changeSlide(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    const slides = document.getElementsByClassName("slide");
    const dots = document.getElementsByClassName("dot");
    
    if (!slides.length) return;
    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    
    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active-dot", "");
    }
    
    if (slides[slideIndex - 1]) {
        slides[slideIndex - 1].style.display = "block";
        if (dots[slideIndex - 1]) {
            dots[slideIndex - 1].className += " active-dot";
        }
    }
}

function startAutoSlide() {
    stopAutoSlide();
    autoSlideInterval = setInterval(function() {
        changeSlide(1);
    }, 3000);
}

function stopAutoSlide() {
    if (autoSlideInterval) {
        clearInterval(autoSlideInterval);
        autoSlideInterval = null;
    }
}

function toggleAutoSlide() {
    const btn = document.getElementById('autoSlideBtn');
    if (!btn) return;
    
    if (autoSlideInterval) {
        stopAutoSlide();
        btn.className = 'btn btn-secondary';
        btn.innerHTML = '<i class="fas fa-pause"></i> Paused';
    } else {
        startAutoSlide();
        btn.className = 'btn btn-primary';
        btn.innerHTML = '<i class="fas fa-play"></i> Auto Play';
    }
}

function resetSlideShow() {
    stopAutoSlide();
    slideIndex = 1;
    showSlides(slideIndex);
    startAutoSlide();
    
    const btn = document.getElementById('autoSlideBtn');
    if (btn) {
        btn.className = 'btn btn-primary';
        btn.innerHTML = '<i class="fas fa-play"></i> Auto Play';
    }
}

// Pause auto slide when user hovers over slideshow
document.querySelector('.slideshow-container')?.addEventListener('mouseenter', function() {
    stopAutoSlide();
});

document.querySelector('.slideshow-container')?.addEventListener('mouseleave', function() {
    startAutoSlide();
});

// ========== LIGHTBOX FUNCTIONALITY ==========
let lightboxImages = [];
let currentLightboxIndex = 0;

function openLightbox(imageSrc, title, description) {
    const galleryItems = document.querySelectorAll('.gallery-item');
    lightboxImages = [];
    
    galleryItems.forEach(item => {
        const img = item.querySelector('img');
        const overlay = item.querySelector('.gallery-overlay p');
        lightboxImages.push({
            src: img ? img.src : '',
            title: overlay ? overlay.textContent : 'Image',
            description: img ? img.alt : 'Gallery image'
        });
    });
    
    currentLightboxIndex = lightboxImages.findIndex(img => img.src === imageSrc);
    if (currentLightboxIndex === -1) currentLightboxIndex = 0;
    
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = "flex";
        lightbox.style.animation = "fadeIn 0.3s ease-in-out";
        updateLightboxContent();
        stopAutoSlide();
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.style.display = "none";
        startAutoSlide();
    }
}

function navigateLightbox(direction) {
    if (!lightboxImages.length) return;
    
    currentLightboxIndex += direction;
    if (currentLightboxIndex >= lightboxImages.length) {
        currentLightboxIndex = 0;
    }
    if (currentLightboxIndex < 0) {
        currentLightboxIndex = lightboxImages.length - 1;
    }
    updateLightboxContent();
}

function updateLightboxContent() {
    const image = lightboxImages[currentLightboxIndex];
    if (image) {
        const img = document.getElementById('lightboxImage');
        const title = document.getElementById('lightboxTitle');
        const description = document.getElementById('lightboxDescription');
        
        if (img) img.src = image.src;
        if (title) title.textContent = image.title;
        if (description) description.textContent = image.description;
    }
}

// Close lightbox with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === "Escape") {
        closeLightbox();
        closeModal();
    }
    if (e.key === "ArrowLeft") {
        navigateLightbox(-1);
    }
    if (e.key === "ArrowRight") {
        navigateLightbox(1);
    }
});

// ========== AUTO-FILL CONTACT FORM FROM URL ==========
window.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const subjectParam = urlParams.get('subject');
    if (subjectParam) {
        const subjectField = document.getElementById('subject');
        if (subjectField) {
            subjectField.value = subjectParam;
        }
    }
});

// ========== PROJECT VIEWS COUNTER ==========
let projectViews = parseInt(localStorage.getItem('projectViews') || '0');

function trackProjectView() {
    projectViews++;
    localStorage.setItem('projectViews', projectViews.toString());
    console.log(`Total project views: ${projectViews}`);
}

// Track views on page load
if (document.querySelector('.project-card')) {
    trackProjectView();
}

// ========== ADD ANIMATION CSS DYNAMICALLY ==========
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(styleSheet);

console.log('✅ JavaScript loaded successfully!');
console.log('📊 Project views:', projectViews);
console.log('💬 Contact messages stored:', JSON.parse(localStorage.getItem('contactMessages') || '[]').length);
// ========== VIEW SAVED MESSAGES ==========
function viewSavedMessages() {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const display = document.getElementById('messageDisplay');
    const list = document.getElementById('messageList');
    
    if (messages.length === 0) {
        list.innerHTML = `
            <div style="text-align: center; padding: 20px; color: #999;">
                <i class="fas fa-inbox" style="font-size: 40px;"></i>
                <p>No messages yet. Send a test message!</p>
            </div>
        `;
    } else {
        let html = '';
        messages.forEach((msg, index) => {
            html += `
                <div style="background: white; padding: 15px; margin-bottom: 10px; border-radius: 8px; border-left: 4px solid #667eea;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <strong style="color: #667eea;">${msg.name}</strong>
                        <small style="color: #999;">${msg.date}</small>
                    </div>
                    <div style="margin-top: 5px;">
                        <strong>Subject:</strong> ${msg.subject}
                    </div>
                    <div style="margin-top: 5px; color: #666;">
                        <strong>Message:</strong> ${msg.message}
                    </div>
                    <div style="margin-top: 5px; color: #999; font-size: 12px;">
                        <strong>Email:</strong> ${msg.email}
                    </div>
                </div>
            `;
        });
        list.innerHTML = html;
    }
    
    display.style.display = 'block';
    display.scrollIntoView({ behavior: 'smooth' });
}

// ========== CLEAR ALL MESSAGES ==========
function clearMessages() {
    if (confirm('Are you sure you want to delete all messages?')) {
        localStorage.removeItem('contactMessages');
        viewSavedMessages();
        // Show success notification
        alert('✅ All messages have been cleared!');
    }
}

// ========== UPDATE THE SAVE MESSAGE FUNCTION ==========
// Replace your existing saveMessage function with this:
function saveMessage(name, email, subject, message) {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    messages.push({
        name: name,
        email: email,
        subject: subject,
        message: message,
        date: new Date().toLocaleString()
    });
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    console.log('✅ Message saved to localStorage!');
    console.log('📊 Total messages:', messages.length);
}

// ========== CONTACT FORM VALIDATION ==========
function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const subject = document.getElementById('subject');
    const message = document.getElementById('message');
    
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const subjectError = document.getElementById('subjectError');
    const messageError = document.getElementById('messageError');
    
    // Reset errors
    if (nameError) nameError.style.display = 'none';
    if (emailError) emailError.style.display = 'none';
    if (subjectError) subjectError.style.display = 'none';
    if (messageError) messageError.style.display = 'none';
    
    if (name) name.classList.remove('error');
    if (email) email.classList.remove('error');
    if (subject) subject.classList.remove('error');
    if (message) message.classList.remove('error');
    
    let isValid = true;
    
    if (name && name.value.trim() === '') {
        if (nameError) nameError.style.display = 'block';
        name.classList.add('error');
        isValid = false;
    }
    
    if (email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email.value.trim() === '' || !emailPattern.test(email.value)) {
            if (emailError) emailError.style.display = 'block';
            email.classList.add('error');
            isValid = false;
        }
    }
    
    if (subject && subject.value.trim() === '') {
        if (subjectError) subjectError.style.display = 'block';
        subject.classList.add('error');
        isValid = false;
    }
    
    if (message && message.value.trim() === '') {
        if (messageError) messageError.style.display = 'block';
        message.classList.add('error');
        isValid = false;
    }
    
    if (isValid) {
        const form = document.getElementById('contactForm');
        const successMsg = document.getElementById('successMessage');
        
        if (form) form.style.display = 'none';
        if (successMsg) successMsg.style.display = 'block';
        
        saveMessage(name.value, email.value, subject.value, message.value);
        playNotificationSound();
    }
    
    return false;
}

function resetForm() {
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('successMessage');
    
    if (form) {
        form.reset();
        form.style.display = 'block';
    }
    if (successMsg) successMsg.style.display = 'none';
    
    document.querySelectorAll('.error-message').forEach(el => {
        el.style.display = 'none';
    });
    document.querySelectorAll('.form-group input, .form-group textarea').forEach(el => {
        el.classList.remove('error');
    });
}

function playNotificationSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        oscillator.frequency.value = 880;
        oscillator.type = 'sine';
        gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.3);
        
        oscillator.start(audioCtx.currentTime);
        oscillator.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
        console.log('🔊 Notification sound played');
    }
}
// ========== TYPING EFFECT ==========
document.addEventListener('DOMContentLoaded', function() {
    // Typing effect
    const textElement = document.getElementById('typed-text');
    const introParagraph = document.getElementById('intro-text');
    const texts = [
        'Web Developer',
        'Creative Thinker',
        'Problem Solver',
        'Application Developer'
    ];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentText = texts[textIndex];
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let speed = 100;
        if (isDeleting) speed = 50;

        if (!isDeleting && charIndex === currentText.length) {
            speed = 1500; // pause before deleting
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();

    // Show the intro paragraph after typing starts
    setTimeout(() => {
        if (introParagraph) {
            introParagraph.style.display = 'block';
            introParagraph.style.animation = 'fadeIn 1s ease';
        }
    }, 500);

    // ========== FADE-IN ON SCROLL ==========
    const fadeElements = document.querySelectorAll('.hero, .stats, .info-section, .highlights');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // ========== STATS COUNTER ANIMATION ==========
    const statNumbers = document.querySelectorAll('.stat-item h3');
    let statsAnimated = false;

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                statNumbers.forEach(stat => {
                    const target = parseInt(stat.textContent);
                    if (!isNaN(target)) {
                        animateCounter(stat, target);
                    }
                });
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    function animateCounter(element, target) {
        let current = 0;
        const increment = Math.ceil(target / 50);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = current + '+';
            }
        }, 30);
    }
});