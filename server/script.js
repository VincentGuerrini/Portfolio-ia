// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initVisitCounter();
    initProjects();
    initCarousel();
    initFormListener();
    observeElements();
});

// ============================================
// THEME MANAGEMENT
// ============================================

function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Load theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        updateThemeIcon(true);
    }
    
    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        updateThemeIcon(isDarkMode);
    });
}

function updateThemeIcon(isDark) {
    const themeIcon = document.querySelector('.theme-icon');
    themeIcon.textContent = isDark ? '☀️' : '🌙';
}

// ============================================
// VISIT COUNTER
// ============================================

function initVisitCounter() {
    let visits = localStorage.getItem('visitCount');
    
    if (!visits) {
        visits = 1;
    } else {
        visits = parseInt(visits) + 1;
    }
    
    localStorage.setItem('visitCount', visits);
    document.getElementById('visitCount').textContent = visits;
}

// ============================================
// PROJECTS CAROUSEL
// ============================================

const projectsData = [
    {
        title: "The Hangman",
        description: "The classic hangman game in Go and CLI, my first solo project!",
        url: "https://github.com/Yokasashii/The_Hangman",
        category: "game",
        icon: "🎮"
    },
    {
        title: "The Vengeful Blade",
        description: "My very first game project, an RPG game in which you play a little knight who wants to take revenge on his king.",
        url: "https://github.com/Yokasashii/The-Vengeful-Blade",
        category: "game",
        icon: "⚔️"
    },
    {
        title: "Fighting-Tournaments",
        description: "A small tournament in Java, in which each player chooses their characters from among the 10 available. And fight until only one survives...",
        url: "https://github.com/Yokasashii/Fighting-Tournaments",
        category: "game",
        icon: "🥊"
    },
    {
        title: "PlatineThemAll-Bot",
        description: "About the Platine-Them-All bot supports an event created by streamer Nighting, in which several trophy hunters from PS5 games or Steam achievements seek to obtain as many as possible in three weeks.",
        url: "https://github.com/Yokasashii/PlatineThemAll-Bot",
        category: "program",
        icon: "🤖"
    },
    {
        title: "Portfolio IA",
        description: "The website you are currently viewing was created entirely with AI.",
        url: "https://github.com/VincentGuerrini/Portfolio---IA",
        category: "program",
        icon: "🌐"
    },
    {
        title: "Calculator",
        description: "My first Calculator in Golang!",
        url: "https://github.com/Yokasashii/Calculator",
        category: "program",
        icon: "🧮"
    }
];

let currentFilter = 'all';
let currentIndex = 0;
let filteredProjects = [...projectsData];

function initProjects() {
    renderProjects();
    setupFilterButtons();
}

function renderProjects() {
    const track = document.getElementById('carouselTrack');
    track.innerHTML = '';
    
    filteredProjects.forEach((project, index) => {
        const card = createProjectCard(project);
        track.appendChild(card);
    });
    
    updateCarouselPosition();
    updateIndicators();
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
        <div class="project-icon">${project.icon}</div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <a href="${project.url}" target="_blank" rel="noopener noreferrer">Voir le projet →</a>
    `;
    return card;
}

function setupFilterButtons() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.dataset.filter;
            currentIndex = 0;
            
            if (currentFilter === 'all') {
                filteredProjects = [...projectsData];
            } else {
                filteredProjects = projectsData.filter(p => p.category === currentFilter);
            }
            
            renderProjects();
        });
    });
}

// ============================================
// CAROUSEL CONTROLS
// ============================================

function initCarousel() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    prevBtn.addEventListener('click', previousProject);
    nextBtn.addEventListener('click', nextProject);
    
    // Create indicators
    createIndicators();
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') previousProject();
        if (e.key === 'ArrowRight') nextProject();
    });
}

function nextProject() {
    currentIndex = (currentIndex + 1) % filteredProjects.length;
    updateCarouselPosition();
    updateIndicators();
}

function previousProject() {
    currentIndex = (currentIndex - 1 + filteredProjects.length) % filteredProjects.length;
    updateCarouselPosition();
    updateIndicators();
}

function updateCarouselPosition() {
    const track = document.getElementById('carouselTrack');
    const offset = -currentIndex * 100;
    track.style.transform = `translateX(${offset}%)`;
}

function createIndicators() {
    const indicatorsContainer = document.getElementById('indicators');
    indicatorsContainer.innerHTML = '';
    
    filteredProjects.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === currentIndex) {
            indicator.classList.add('active');
        }
        indicator.addEventListener('click', () => {
            currentIndex = index;
            updateCarouselPosition();
            updateIndicators();
        });
        indicatorsContainer.appendChild(indicator);
    });
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((ind, index) => {
        ind.classList.toggle('active', index === currentIndex);
    });
}

// ============================================
// CONTACT FORM
// ============================================

function initFormListener() {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleFormSubmit(form);
    });
}

async function handleFormSubmit(form) {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Show success message (FormSubmit integration)
    // This would require a backend service. For now, we'll use FormSubmit.co
    const formMessage = document.getElementById('formMessage');
    
    try {
        // Using FormSubmit service (https://formsubmit.co/)
        const response = await fetch('https://formsubmit.co/ajax/vincent.dev@gmail.com', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                email: email,
                subject: subject,
                message: message,
                _captcha: 'false'
            })
        });
        
        if (response.ok) {
            formMessage.className = 'form-message success';
            formMessage.textContent = '✓ Message envoyé avec succès! Merci de votre message.';
            form.reset();
            
            // Clear message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        } else {
            throw new Error('Erreur lors de l\'envoi');
        }
    } catch (error) {
        formMessage.className = 'form-message error';
        formMessage.textContent = '✗ Erreur lors de l\'envoi. Veuillez réessayer ou contactez-moi directement.';
        console.error('Erreur:', error);
    }
}

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });
    
    // Observe skill cards and project cards
    document.querySelectorAll('.skill-card, .about-content').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
}

// ============================================
// SMOOTH SCROLL NAVIGATION
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ============================================
// EASTER EGG - KONAMI CODE
// ============================================

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateEasterEgg();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'spin 0.5s ease-in-out';
    
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes spin {
            0% { transform: rotateZ(0deg); }
            100% { transform: rotateZ(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Add some confetti effect
    createConfetti();
}

function createConfetti() {
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = ['#6366f1', '#ec4899', '#f59e0b'][Math.floor(Math.random() * 3)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = '50%';
        confetti.style.zIndex = '9999';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        const duration = 3 + Math.random() * 2;
        confetti.animate([
            { transform: 'translateY(0)', opacity: 1 },
            { transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: duration * 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => confetti.remove();
    }
}
