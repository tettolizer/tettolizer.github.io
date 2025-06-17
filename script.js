document.addEventListener('DOMContentLoaded', () => {
    // --- Scroll Animation Logic ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    const hiddenElements = document.querySelectorAll('.animate-on-scroll');
    hiddenElements.forEach(el => observer.observe(el));

    // --- Typing Effect Logic ---
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const words = JSON.parse(typedTextElement.getAttribute('data-words'));
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            // Use currentChars to build up the string for typing
            const currentChars = isDeleting ?
                currentWord.substring(0, charIndex - 1) :
                currentWord.substring(0, charIndex + 1);
            
            typedTextElement.textContent = currentChars;
            
            if (!isDeleting && charIndex < currentWord.length) {
                // Typing forward
                charIndex++;
                setTimeout(type, 120);
            } else if (isDeleting && charIndex > 0) {
                // Deleting
                charIndex--;
                setTimeout(type, 80);
            } else {
                // Switch between typing and deleting
                isDeleting = !isDeleting;
                if (!isDeleting) {
                    // Move to the next word
                    wordIndex = (wordIndex + 1) % words.length;
                }
                setTimeout(type, 1200);
            }
        }
        type();
    }
});