/**
 * Project Nexus Café - Core Client-Side Logic
 * Feature 1: Dynamic Category Filtering
 * Feature 2: Floating Dark/Light Mode Theme Toggle with Caching
 * Feature 3: Custom Reservation Form Validation
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize core app features
    initMenuFilter();
    initThemeToggle();
    initFormValidation();
});

/**
 * Feature 1: Filters Café Menu items smoothly based on data-category attributes
 */
function initMenuFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    if (!filterButtons.length || !menuItems.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCategory = button.getAttribute('data-target');

            filterButtons.forEach(btn => {
                btn.classList.replace('btn-primary', 'btn-outline-secondary');
            });
            button.classList.replace('btn-outline-secondary', 'btn-primary');

            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (targetCategory === 'all' || itemCategory === targetCategory) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.display = 'none';
                }
            });
        });
    });
}

/**
 * Feature 2: Inject Floating Theme Toggle Button and Handle State Shifting
 */
function initThemeToggle() {
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle-btn';
    toggleBtn.setAttribute('aria-label', 'Toggle theme mode');
    
    toggleBtn.style.position = 'fixed';
    toggleBtn.style.bottom = '25px';
    toggleBtn.style.right = '25px';
    toggleBtn.style.zIndex = '2000';
    toggleBtn.style.padding = '12px 16px';
    toggleBtn.style.borderRadius = '50px';
    toggleBtn.style.border = '2px solid var(--accent-gold)';
    toggleBtn.style.cursor = 'pointer';
    toggleBtn.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    toggleBtn.style.transition = 'var(--transition-smooth)';

    const currentTheme = localStorage.getItem('nexus-theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-theme');
        toggleBtn.innerHTML = '☀️ Light Mode';
        toggleBtn.style.backgroundColor = 'var(--light-cream)';
        toggleBtn.style.color = 'var(--dark-charcoal)';
    } else {
        toggleBtn.innerHTML = '🌙 Dark Mode';
        toggleBtn.style.backgroundColor = 'var(--primary-coffee)';
        toggleBtn.style.color = 'var(--pure-white)';
    }

    document.body.appendChild(toggleBtn);

    toggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('nexus-theme', 'dark');
            toggleBtn.innerHTML = '☀️ Light Mode';
            toggleBtn.style.backgroundColor = 'var(--light-cream)';
            toggleBtn.style.color = 'var(--dark-charcoal)';
        } else {
            localStorage.setItem('nexus-theme', 'light');
            toggleBtn.innerHTML = '🌙 Dark Mode';
            toggleBtn.style.backgroundColor = 'var(--primary-coffee)';
            toggleBtn.style.color = 'var(--pure-white)';
        }
    });
}

/**
 * Feature 3: Vanilla JS Form Validation with Bootstrap State Feedback
 */
function initFormValidation() {
    const form = document.getElementById('reservation-form');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        event.stopPropagation();

        let isFormValid = true;

        // 1. Validate Full Name field
        const nameInput = document.getElementById('form-name');
        if (nameInput.value.trim() === '') {
            nameInput.classList.add('is-invalid');
            isFormValid = false;
        }
        else {
            nameInput.classList.remove('is-invalid');
            nameInput.classList.add('is-valid');
        }

        // 2. Validate Email format
        const emailInput = document.getElementById('form-email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.classList.add('is-invalid');
            isFormValid = false;
        } else {
            emailInput.classList.remove('is-invalid');
            isFormValid = false || emailRegex.test(emailInput.value.trim());
            emailInput.classList.add('is-valid');
        }

        // 3. Validate Date (Must be present or future)
        const dateInput = document.getElementById('form-date');
        const selectedDate = new Date(dateInput.value);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset local clock to match clean day inputs

        if (!dateInput.value || selectedDate < today) {
            dateInput.classList.add('is-invalid');
            isFormValid = false;
        } else {
            dateInput.classList.remove('is-invalid');
            dateInput.classList.add('is-valid');
        }

        // 4. Validate Party Size select option
        const guestsSelect = document.getElementById('form-guests');
        if (guestsSelect.value === '') {
            guestsSelect.classList.add('is-invalid');
            isFormValid = false;
        } else {
            guestsSelect.classList.remove('is-invalid');
            guestsSelect.classList.add('is-valid');
        }

        // If all variables clear validation loops, simulate success callback state
        if (isFormValid) {
            alert(`☕ Reservation Success! Thank you, ${nameInput.value}. Our floor team will lock in your slot for ${dateInput.value}.`);
            form.reset();
            
            // Clear validation design flags after submission cycle completes
            const inputs = form.querySelectorAll('.form-control, .form-select');
            inputs.forEach(input => input.classList.remove('is-valid'));
        }
    });
}