// Sample project data - replace with your actual projects
const projects = [
    {
        title: "Smart Enroll Project",
        description: "Integrating AI-powered tools to generate optimal academic schedules based on individual student preferences, academic progress, and workload consideration.",
        image: "https://via.placeholder.com/300x200",
        technologies: ["Database Management", "AI", "Python", "SQL"],
        github: "https://github.com/yourusername/smart-enroll"
    },
    {
        title: "Wine Rating Classification Project",
        description: "Led the analysis on a Kaggle wine dataset as Project Lead, employing Decision Tree, Naive Bayes, and Random Forest classifiers to achieve a top accuracy rate of 90% with the Decision Tree model. Overcame significant data challenges including missing values and skewed distributions.",
        image: "https://via.placeholder.com/300x200",
        technologies: ["Python", "Machine Learning", "Data Science", "Statistical Analysis"],
        links: {
            presentation: "#",
            process: "#"
        },
        github: "https://github.com/yourusername/wine-classification"
    }
];

// Function to create project cards
function createProjectCards() {
    const projectsGrid = document.querySelector('.projects-grid');
    
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        
        card.innerHTML = `
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="skill-tags">
                    ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
                </div>
                <a href="${project.github}" target="_blank" class="cta-button">View Project</a>
            </div>
        `;
        
        projectsGrid.appendChild(card);
    });
}

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Smooth scroll function
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animation for the hero section
gsap.from('.hero-content h1', {
    duration: 1,
    y: 100,
    opacity: 0,
    ease: 'power3.out'
});

gsap.from('.hero-details p', {
    duration: 1,
    y: 50,
    opacity: 0,
    stagger: 0.2,
    delay: 0.5,
    ease: 'power3.out'
});

gsap.from('.cta-container', {
    duration: 1,
    y: 50,
    opacity: 0,
    delay: 1,
    ease: 'power3.out'
});

// Scroll indicator animation
gsap.to('.scroll-indicator', {
    y: 20,
    repeat: -1,
    duration: 1.5,
    yoyo: true,
    ease: 'power1.inOut'
});

// Parallax effect for sections
gsap.utils.toArray('.section-content').forEach(section => {
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
        },
        y: 100,
        opacity: 0
    });
});

// Project cards animation
gsap.utils.toArray('.project-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
        },
        y: 50,
        opacity: 0,
        duration: 1
    });
});

// Skills tags stagger animation
gsap.from('.skill-tags span', {
    scrollTrigger: {
        trigger: '.skills-container',
        start: 'top 80%'
    },
    opacity: 0,
    y: 20,
    stagger: 0.1,
    duration: 0.5
});

// Contact cards animation
gsap.utils.toArray('.contact-card').forEach(card => {
    gsap.from(card, {
        scrollTrigger: {
            trigger: card,
            start: 'top 90%'
        },
        opacity: 0,
        y: 30,
        duration: 0.8
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// Dark mode toggle (optional)
let isDarkMode = false;
const darkModeToggle = document.createElement('button');
darkModeToggle.className = 'dark-mode-toggle';
darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener('click', () => {
    isDarkMode = !isDarkMode;
    document.body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = isDarkMode ? 
        '<i class="fas fa-sun"></i>' : 
        '<i class="fas fa-moon"></i>';
});

// Mouse cursor effect
const cursor = document.createElement('div');
cursor.className = 'custom-cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// Hover effect for interactive elements
const interactiveElements = document.querySelectorAll('a, button, .project-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-hover');
    });
    el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-hover');
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Preloader animation (optional)
    const preloader = document.createElement('div');
    preloader.className = 'preloader';
    preloader.innerHTML = '<div class="loader"></div>';
    document.body.appendChild(preloader);

    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);

    createProjectCards();
});

// Skills section animations
gsap.utils.toArray('.skills-section').forEach(section => {
    // Fade in and slide up animation
    gsap.from(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            scrub: 1
        },
        y: 50,
        opacity: 0,
        duration: 1
    });

    // Stagger animation for skill tags within each section
    gsap.from(section.querySelectorAll('.skill-tags span'), {
        scrollTrigger: {
            trigger: section,
            start: 'top 75%'
        },
        y: 20,
        opacity: 0,
        duration: 0.5,
        stagger: {
            amount: 0.5,
            from: "start"
        }
    });

    // Add hover effect for section titles
    const title = section.querySelector('h3');
    title.addEventListener('mouseenter', () => {
        gsap.to(title, {
            color: 'var(--primary-color)',
            duration: 0.3
        });
    });
    title.addEventListener('mouseleave', () => {
        gsap.to(title, {
            color: 'var(--text-primary)',
            duration: 0.3
        });
    });
});

// Enhanced scroll animations for skills sections
ScrollTrigger.batch('.skills-section', {
    interval: 0.1,
    batchMax: 3,
    onEnter: batch => gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.15,
        overwrite: true
    }),
    onLeave: batch => gsap.set(batch, {
        autoAlpha: 0,
        y: -50,
        overwrite: true
    }),
    onEnterBack: batch => gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        stagger: 0.15,
        overwrite: true
    }),
    onLeaveBack: batch => gsap.set(batch, {
        autoAlpha: 0,
        y: 50,
        overwrite: true
    })
});

// Add subtle parallax effect to skills sections
gsap.utils.toArray('.skills-section').forEach(section => {
    gsap.to(section, {
        scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        },
        y: 20,
        ease: 'none'
    });
});
