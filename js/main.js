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
 * Feature 2: Prepares layout hooks for the upcoming ambient theme switch
 */
function initThemeToggle() {
    // This will be expanded with a floating toggle button injection 
    // and localStorage caching once our page layouts are finalized.
    console.log("Nexus Cafe System: Theme engine loaded and listening.");
}