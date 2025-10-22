// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80, // Adjust for fixed header
                behavior: 'smooth'
            });
        }
    });
});

// About section tabs functionality
const tabButtons = document.querySelectorAll('.tab-button');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));

        // Add active class to clicked button and corresponding pane
        this.classList.add('active');
        const tabId = this.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Add active class to navigation on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Typing effect for hero section
const heroText = "Hello, I'm Jayesh Dhariyal";
let i = 0;
const typeWriter = () => {
    if (i < heroText.length) {
        document.querySelector('.hero-name').innerHTML = heroText.substring(0, i + 1) + '<span class="cursor">|</span>';
        i++;
        setTimeout(typeWriter, 100);
    } else {
        document.querySelector('.cursor').style.animation = 'blink 1s infinite';
    }
};

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeWriter, 1000);
});

// Hero animations
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.hero-text > *, .hero-visual > *, .feature-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    heroObserver.observe(el);
});

// Floating particles animation
const particles = document.querySelectorAll('.particle');
particles.forEach((particle, index) => {
    particle.style.animationDelay = `${index * 0.5}s`;
});

// Scroll indicator animation
const scrollIndicator = document.querySelector('.scroll-indicator');
if (scrollIndicator) {
    setInterval(() => {
        scrollIndicator.classList.toggle('bounce');
    }, 2000);
}

// Add some animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('section > .container > *').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    hero.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
});

// Skill progress bars animation
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skills = entry.target.querySelectorAll('li');
            skills.forEach((skill, index) => {
                setTimeout(() => {
                    skill.style.animation = 'slideInLeft 0.5s ease forwards';
                }, index * 100);
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
    skillObserver.observe(category);
});

// Add CSS animation for cursor blink
const style = document.createElement('style');
style.textContent = `
    @keyframes blink {
        0%, 50% { opacity: 1; }
        51%, 100% { opacity: 0; }
    }
    @keyframes slideInLeft {
        from { transform: translateX(-100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes fadeInUp {
        from { opacity: 0; transform: translateY(30px); }
        to { opacity: 1; transform: translateY(0); }
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Project modal functionality
const projectItems = document.querySelectorAll('.project-item');
const modal = document.createElement('div');
modal.className = 'project-modal';
modal.innerHTML = `
    <div class="modal-content">
        <span class="close-modal">&times;</span>
        <div class="modal-body"></div>
    </div>
`;
document.body.appendChild(modal);

projectItems.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h3').textContent;
        const description = item.querySelector('p').textContent;
        const image = item.querySelector('img').src;
        const tech = Array.from(item.querySelectorAll('.project-tech span')).map(span => span.textContent);

        modal.querySelector('.modal-body').innerHTML = `
            <img src="${image}" alt="${title}" style="width: 100%; border-radius: 10px; margin-bottom: 20px;">
            <h2 style="color: #007bff; margin-bottom: 15px;">${title}</h2>
            <p style="margin-bottom: 20px; line-height: 1.6;">${description}</p>
            <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
                ${tech.map(t => `<span style="background: linear-gradient(45deg, #007bff, #6610f2); color: white; padding: 5px 12px; border-radius: 20px; font-size: 0.85rem;">${t}</span>`).join('')}
            </div>
            <div style="display: flex; gap: 15px;">
                <a href="#" class="project-link" style="background: #007bff; color: white; padding: 10px 20px; border-radius: 25px; text-decoration: none;">View Live Demo</a>
                <a href="#" class="project-link" style="border: 2px solid #007bff; color: #007bff; padding: 10px 20px; border-radius: 25px; text-decoration: none;">View Code</a>
            </div>
        `;

        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
});

modal.querySelector('.close-modal').addEventListener('click', () => {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Contact form functionality
const contactForm = document.createElement('form');
contactForm.className = 'contact-form';
contactForm.innerHTML = `
    <h3 style="color: #007bff; margin-bottom: 20px;">Get In Touch</h3>
    <div style="margin-bottom: 15px;">
        <input type="text" placeholder="Your Name" required style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem;">
    </div>
    <div style="margin-bottom: 15px;">
        <input type="email" placeholder="Your Email" required style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem;">
    </div>
    <div style="margin-bottom: 15px;">
        <textarea placeholder="Your Message" required style="width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 1rem; min-height: 120px; resize: vertical;"></textarea>
    </div>
    <button type="submit" style="background: linear-gradient(45deg, #007bff, #6610f2); color: white; border: none; padding: 12px 30px; border-radius: 25px; font-size: 1rem; cursor: pointer; transition: transform 0.3s ease;">Send Message</button>
`;

document.querySelector('#contact .container').appendChild(contactForm);

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Dark mode toggle
const darkModeToggle = document.createElement('button');
darkModeToggle.innerHTML = '🌙';
darkModeToggle.style.position = 'fixed';
darkModeToggle.style.top = '20px';
darkModeToggle.style.right = '20px';
darkModeToggle.style.background = 'rgba(255, 255, 255, 0.9)';
darkModeToggle.style.border = 'none';
darkModeToggle.style.borderRadius = '50%';
darkModeToggle.style.width = '50px';
darkModeToggle.style.height = '50px';
darkModeToggle.style.cursor = 'pointer';
darkModeToggle.style.zIndex = '1001';
darkModeToggle.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
darkModeToggle.style.transition = 'all 0.3s ease';

document.body.appendChild(darkModeToggle);

let isDarkMode = false;
darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = isDarkMode ? '☀️' : '🌙';

    if (isDarkMode) {
        document.body.style.background = 'linear-gradient(135deg, #2c3e50 0%, #34495e 100%)';
        document.body.style.color = '#ecf0f1';
        document.querySelectorAll('section:nth-child(even)').forEach(section => {
            section.style.background = 'rgba(44, 62, 80, 0.1)';
        });
        document.querySelectorAll('section:nth-child(odd)').forEach(section => {
            section.style.background = 'rgba(255, 255, 255, 0.05)';
        });
    } else {
        document.body.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
        document.body.style.color = '#333';
        document.querySelectorAll('section:nth-child(even)').forEach(section => {
            section.style.background = 'rgba(255, 255, 255, 0.05)';
        });
        document.querySelectorAll('section:nth-child(odd)').forEach(section => {
            section.style.background = 'rgba(255, 255, 255, 0.95)';
        });
    }
});

// Skill progress bars
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    const skills = category.querySelectorAll('li');
    skills.forEach(skill => {
        const progressBar = document.createElement('div');
        progressBar.className = 'skill-progress';
        progressBar.innerHTML = '<div class="skill-progress-fill"></div>';
        skill.appendChild(progressBar);
    });
});

// Add styles for new elements
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    .project-modal {
        display: none;
        position: fixed;
        z-index: 2000;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0,0,0,0.8);
        animation: fadeIn 0.3s ease;
    }
    .modal-content {
        background-color: white;
        margin: 5% auto;
        padding: 0;
        border-radius: 15px;
        width: 90%;
        max-width: 600px;
        position: relative;
        animation: slideIn 0.3s ease;
    }
    .close-modal {
        position: absolute;
        top: 10px;
        right: 20px;
        font-size: 30px;
        font-weight: bold;
        cursor: pointer;
        color: #333;
        z-index: 1;
    }
    .modal-body {
        padding: 30px;
    }
    .contact-form {
        max-width: 500px;
        margin: 0 auto;
        background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
        padding: 30px;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
        margin-top: 30px;
    }
    .skill-progress {
        height: 4px;
        background: #e9ecef;
        border-radius: 2px;
        margin-top: 8px;
        overflow: hidden;
    }
    .skill-progress-fill {
        height: 100%;
        background: linear-gradient(45deg, #007bff, #6610f2);
        width: 0;
        transition: width 1s ease;
    }
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    @keyframes slideIn {
        from { transform: translateY(-50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    .dark-mode {
        background: linear-gradient(135deg, #2c3e50 0%, #34495e 100%) !important;
        color: #ecf0f1 !important;
    }
    .dark-mode section:nth-child(even) {
        background: rgba(44, 62, 80, 0.1) !important;
    }
    .dark-mode section:nth-child(odd) {
        background: rgba(255, 255, 255, 0.05) !important;
    }
    .dark-mode .skill-category, .dark-mode .experience-item, .dark-mode .education-item, .dark-mode .certification-item, .dark-mode .project-item {
        background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%) !important;
        color: #ecf0f1 !important;
    }
    .dark-mode .contact-form {
        background: linear-gradient(135deg, #34495e 0%, #2c3e50 100%) !important;
        color: #ecf0f1 !important;
    }
    .dark-mode input, .dark-mode textarea {
        background: #2c3e50 !important;
        color: #ecf0f1 !important;
        border: 1px solid #34495e !important;
    }
`;
document.head.appendChild(additionalStyles);

// Animate skill progress bars on scroll
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fills = entry.target.querySelectorAll('.skill-progress-fill');
            fills.forEach(fill => {
                fill.style.width = Math.random() * 40 + 60 + '%'; // Random progress between 60-100%
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
    progressObserver.observe(category);
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
