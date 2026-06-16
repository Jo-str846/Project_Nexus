/**
 * Project Nexus Café - Core Client-Side Logic
 * Feature 1: Dynamic Category Filtering
 * Feature 2: Dark/Light Mode Theme Toggle Hook
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize core app features
    initMenuFilter();
    initThemeToggle();
});

/**
 * Feature 1: Filters Café Menu items smoothly based on data-category attributes
 */
function initMenuFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    // Security check to prevent errors if elements aren't present on the current page
    if (!filterButtons.length || !menuItems.length) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetCategory = button.getAttribute('data-target');

            // 1. Update active button visual states smoothly
            filterButtons.forEach(btn => {
                btn.classList.replace('btn-primary', 'btn-outline-secondary');
            });
            button.classList.replace('btn-outline-secondary', 'btn-primary');

            // 2. Filter menu item cards layout
            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');

                if (targetCategory === 'all' || itemCategory === targetCategory) {
                    // Show item using Bootstrap's display block flex utility
                    item.style.display = 'block';
                    // Trigger a micro-animation fade effect
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    // Hide item entirely from responsive grid flow
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
    // 1. Create and style the floating toggle element dynamically
    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'theme-toggle-btn';
    toggleBtn.setAttribute('aria-label', 'Toggle theme mode');
    
    // Inline positioning styles to keep it floating beautifully on the bottom right
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

    // 2. Read user preference memory cache from LocalStorage
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

    // 3. Append button element to body
    document.body.appendChild(toggleBtn);

    // 4. Click listener loop to swap styles and update local memory state
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