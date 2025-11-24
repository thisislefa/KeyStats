 // --- Animation Logic ---
        document.addEventListener("DOMContentLoaded", () => {
            
            const observerOptions = {
                threshold: 0.2 // Trigger when 20% visible
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        startAnimations(entry.target);
                        observer.unobserve(entry.target); // Run once
                    }
                });
            }, observerOptions);

            const grid = document.getElementById('metricsGrid');
            observer.observe(grid);

            function startAnimations(container) {
                const cards = container.querySelectorAll('.metric-card');
                
                cards.forEach((card, index) => {
                    // 1. Trigger the CSS Slide Down animation (staggered)
                    setTimeout(() => {
                        card.classList.add('is-visible');
                        
                        // 2. Trigger the Number Counting animation
                        const numberEl = card.querySelector('[data-target]');
                        if (numberEl) {
                            animateValue(numberEl, 0, parseInt(numberEl.dataset.target), 2000);
                        }
                    }, index * 150); // 150ms stagger delay between items
                });
            }

            // Linear interpolation counter
            function animateValue(obj, start, end, duration) {
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    
                    // Ease-out effect for the counter specifically
                    const easeProgress = 1 - Math.pow(1 - progress, 3); 
                    
                    obj.innerHTML = Math.floor(easeProgress * (end - start) + start);
                    
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
            }
        });