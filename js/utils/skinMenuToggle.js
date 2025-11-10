/**
 * Skin Menu Toggle - Handles collapsible skin menu functionality
 */
export function initSkinMenuToggle() {
    const toggleBtn = document.getElementById('skinMenuToggle');
    const skinMenu = document.getElementById('skinMenu');

    if (!toggleBtn || !skinMenu) {
        console.error('Skin menu toggle elements not found');
        return;
    }

    // Toggle menu visibility
    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent event bubbling to canvas
        skinMenu.classList.toggle('collapsed');

        // Update aria label
        const isCollapsed = skinMenu.classList.contains('collapsed');
        toggleBtn.setAttribute('aria-label', isCollapsed ? 'Skin-Menü öffnen' : 'Skin-Menü schließen');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!skinMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
            skinMenu.classList.add('collapsed');
            toggleBtn.setAttribute('aria-label', 'Skin-Menü öffnen');
        }
    });

    // Prevent menu clicks from closing it
    skinMenu.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}
