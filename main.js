document.addEventListener('DOMContentLoaded', function() {
    // Menu mobile
    const menuToggle = document.querySelector('.header__menu-toggle');
    const headerNav = document.querySelector('.header__nav');
    
    menuToggle.addEventListener('click', function() {
        this.classList.toggle('active');
        headerNav.classList.toggle('active');
    });
    
    // Fechar menu ao clicar em um link
    const navLinks = document.querySelectorAll('.header__nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth < 992) {
                menuToggle.classList.remove('active');
                headerNav.classList.remove('active');
            }
        });
    });
    
    // Header scroll
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('header--scrolled');
        } else {
            header.classList.remove('header--scrolled');
        }
    });
    
    // Botão voltar ao topo
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Animar elementos quando entram na viewport
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.animation = 'fadeIn 1s ease forwards';
            }
        });
    };
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();
    
    // Atualizar ano no footer
    document.getElementById('year').textContent = new Date().getFullYear();
    
    // CONTADORES ANIMADOS - VERSÃO MODIFICADA 
    const counters = document.querySelectorAll('.stats__number');
    const animationDuration = 1500; 
    
    const startCounters = () => {
        const startTime = performance.now();
        
        const updateCounters = () => {
            const elapsed = performance.now() - startTime;
            const progress = Math.min(elapsed / animationDuration, 1);
            
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-count');
                const currentValue = Math.floor(progress * target);
                counter.textContent = currentValue.toLocaleString();
            });
            
            if (progress < 1) {
                requestAnimationFrame(updateCounters);
            } else {
                // Garante valores finais exatos
                counters.forEach(counter => {
                    counter.textContent = (+counter.getAttribute('data-count')).toLocaleString();
                });
            }
        };
        
        requestAnimationFrame(updateCounters);
    };
    
    // Observar quando a seção de estatísticas entra na viewport
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            startCounters();
            observer.unobserve(statsSection);
        }
    }, { threshold: 0.5 });
    
    if (statsSection) {
        observer.observe(statsSection);
    }
    
    // Slider
    tns({
        container: '.hero__slider',
        items: 1,
        slideBy: 'page',
        autoplay: true,
        autoplayButtonOutput: false,
        controls: false,
        nav: false,
        speed: 500
    });
});