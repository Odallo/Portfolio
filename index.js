// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    menuToggle.addEventListener('click', function() {
      navLinks.classList.toggle('active');
      this.classList.toggle('active');
    });
  
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
      });
    });
  
    // Update current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
  
    // Calculate years of experience
    const startYear = 2021; // Change to your starting year
    const yearsExp = new Date().getFullYear() - startYear;
    document.getElementById('years-experience').textContent = yearsExp;
  
    // Projects data
    const projects = [
      {
        title: "Decoupled Weather App",
        description: "Full Weather Application built with Next.js for the Frontend and PHP Laravel for the Backend",
        tags: ["javascript", "php"],
        github: "https://github.com/Odallo/WeatherApplication",
        demo: "https://weatherapp.com",
        image: "weather-app.jpg"
      },
      {
        title: "AI Assistant",
        description: "Voice-controlled assistant with user recognition built using Python and OpenAI.",
        tags: ["python"],
        github: "https://github.com/Odallo",
        demo: "#",
        image: "ai-assistant.jpg"
      },
      {
        title: "Ayoayo Game",
        description: "Traditional African board game implemented with Python logic and GUI.",
        tags: ["python"],
        github: "https://github.com/Odallo",
        demo: "#",
        image: "ayoayo-game.jpg"
      },
      {
        title: "Hotel Management",
        description: "Full-stack system with PHP/MySQL backend and JavaScript frontend.",
        tags: ["php", "javascript"],
        github: "https://github.com/Odallo",
        demo: "#",
        image: "hotel-system.jpg"
      }
    ];
  
    // Skills data
    const skills = {
      languages: ["Python", "JavaScript", "TypeScript", "PHP", "HTML", "CSS", "Java", "SQL"],
      frameworks: ["TensorFlow", "React", "Node.js", "Flask", "Laravel", "Next.js"],
      tools: ["Git/GitHub", "Docker", "Postman", "VS Code", "Figma"]
    };
  
    // Render projects
    function renderProjects(filter = 'all') {
      const container = document.getElementById('projects-container');
      container.innerHTML = '';
      
      const filteredProjects = filter === 'all' 
        ? projects 
        : projects.filter(project => project.tags.includes(filter));
      
      filteredProjects.forEach(project => {
        const projectEl = document.createElement('div');
        projectEl.className = 'project-card';
        projectEl.innerHTML = `
          <div class="project-img">
            <img src="https://via.placeholder.com/400x250?text=${project.title.replace(' ', '+')}" alt="${project.title}">
          </div>
          <div class="project-info">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="project-tags">
              ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
            </div>
            <div class="project-links">
              <a href="${project.github}" target="_blank"><i class="fab fa-github"></i> Code</a>
              <a href="${project.demo}" ${project.demo === '#' ? 'class="disabled"' : ''} target="_blank">
                <i class="fas fa-external-link-alt"></i> Demo
              </a>
            </div>
          </div>
        `;
        container.appendChild(projectEl);
      });
    }
  
    // Render skills
    function renderSkills() {
      const container = document.querySelector('.skills-container');
      container.innerHTML = `
        <div class="skill-category">
          <h3><i class="fas fa-code"></i> Languages</h3>
          <ul>
            ${skills.languages.map(skill => `<li>${skill}</li>`).join('')}
          </ul>
        </div>
        <div class="skill-category">
          <h3><i class="fas fa-cogs"></i> Frameworks</h3>
          <ul>
            ${skills.frameworks.map(skill => `<li>${skill}</li>`).join('')}
          </ul>
        </div>
        <div class="skill-category">
          <h3><i class="fas fa-tools"></i> Tools</h3>
          <ul>
            ${skills.tools.map(skill => `<li>${skill}</li>`).join('')}
          </ul>
        </div>
      `;
    }
  
    // Filter projects
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        renderProjects(this.dataset.filter);
      });
    });
  
    // Contact form validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Reset errors
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.getElementById('form-success').textContent = '';
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let isValid = true;
        
        // Validate name
        if (name === '') {
          document.getElementById('name-error').textContent = 'Name is required';
          isValid = false;
        }
        
        // Validate email
        if (email === '') {
          document.getElementById('email-error').textContent = 'Email is required';
          isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          document.getElementById('email-error').textContent = 'Please enter a valid email';
          isValid = false;
        }
        
        // Validate message
        if (message === '') {
          document.getElementById('message-error').textContent = 'Message is required';
          isValid = false;
        }
        
        if (isValid) {
          // In a real app, you would send the form data to a server here
          document.getElementById('form-success').textContent = 'Message sent successfully!';
          contactForm.reset();
          
          // Hide success message after 3 seconds
          setTimeout(() => {
            document.getElementById('form-success').textContent = '';
          }, 3000);
        }
      });
    }
  
    // Scroll reveal animation
    const scrollReveal = () => {
      const elements = document.querySelectorAll('.section, .project-card, .skill-category');
      
      elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
          element.classList.add('reveal');
        }
      });
    };
  
    window.addEventListener('scroll', scrollReveal);
  
    // Initial renders
    renderProjects();
    renderSkills();
    scrollReveal();
  });
