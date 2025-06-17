document.addEventListener('DOMContentLoaded', () => {

    // --- THEME SWITCHER LOGIC ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const themeIcon = themeToggleButton ? themeToggleButton.querySelector('i') : null;
    const currentTheme = localStorage.getItem('theme');

    // Function to set the theme
    const setTheme = (isDark) => {
        document.body.classList.toggle('dark-mode', isDark);
        if (themeIcon) {
            themeIcon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
        }
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
    };

    // Check for saved theme in localStorage, or OS preference
    if (currentTheme) {
        setTheme(currentTheme === 'dark');
    } else {
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setTheme(prefersDark);
    }

    // Add click event listener to the toggle button
    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-mode');
            setTheme(!isDark);
        });
    }

    // --- SCROLL ANIMATION LOGIC ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach(el => observer.observe(el));

    // --- TYPING EFFECT LOGIC ---
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const words = JSON.parse(typedTextElement.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            const currentChars = isDeleting ?
                currentWord.substring(0, charIndex - 1) :
                currentWord.substring(0, charIndex + 1);
            
            typedTextElement.textContent = currentChars;
            
            if (!isDeleting && charIndex < currentWord.length) {
                charIndex++;
                setTimeout(type, 120);
            } else if (isDeleting && charIndex > 0) {
                charIndex--;
                setTimeout(type, 80);
            } else {
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(type, 1200);
            }
        }
        type();
    }
});