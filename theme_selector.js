// Collapsible Section Toggle
window.toggleCollapsible = function (header) {
    const content = header.nextElementSibling;
    const isOpen = content.style.display === 'block';

    if (isOpen) {
        content.style.display = 'none';
        header.classList.remove('active');
    } else {
        content.style.display = 'block';
        header.classList.add('active');
    }
};

window.togglePanelCollapse = function (header) {
    console.log("Toggle panel collapse clicked:", header);
    const $section = $(header).closest('.collapsible-section');
    if ($section.length) {
        $section.toggleClass('collapsed');
        const isCollapsed = $section.hasClass('collapsed');
        console.log("Section", $section.attr('id'), "is now", isCollapsed ? "collapsed" : "expanded");
    }
};

// Dark/Light Mode Toggle
window.toggleThemeMode = function (isDark) {
    const body = document.body;
    const icon = document.getElementById('theme-mode-icon');
    const text = document.getElementById('theme-mode-text');
    const toggle = document.getElementById('theme-mode-toggle');

    if (isDark) {
        // Dark mode (default)
        body.classList.remove('light-mode');
        if (icon) icon.textContent = '🌙';
        if (text) text.textContent = 'Oscuro';
        localStorage.setItem('chess_theme_mode', 'dark');
        // Actualizar slider
        if (toggle) {
            const slider = toggle.nextElementSibling;
            if (slider) {
                slider.style.background = 'var(--bg-input)';
                const thumb = slider.querySelector('span');
                if (thumb) thumb.style.transform = 'translateX(0)';
            }
        }
    } else {
        // Light mode
        body.classList.add('light-mode');
        if (icon) icon.textContent = '☀️';
        if (text) text.textContent = 'Claro';
        localStorage.setItem('chess_theme_mode', 'light');
        // Actualizar slider
        if (toggle) {
            const slider = toggle.nextElementSibling;
            if (slider) {
                slider.style.background = 'var(--primary)';
                const thumb = slider.querySelector('span');
                if (thumb) thumb.style.transform = 'translateX(24px)';
            }
        }
    }
    
    // Forzar actualización de estilos
    setTimeout(() => {
        document.documentElement.style.setProperty('--text-primary', isDark ? '#ffffff' : '#1e293b');
        document.documentElement.style.setProperty('--text-secondary', isDark ? '#d0d0d0' : '#475569');
    }, 10);
};

// Initialize theme on load
$(document).ready(function () {
    const savedTheme = localStorage.getItem('chess_theme_mode') || 'dark';
    const isDark = savedTheme === 'dark';

    $('#theme-mode-toggle').prop('checked', isDark);
    toggleThemeMode(isDark);

    // Show/hide guest CTA banner based on auth status
    updateGuestBanner();
});

// Update Guest Banner Visibility
function updateGuestBanner() {
    const isAuth = localStorage.getItem('chess_is_auth') === 'true';
    const modalClosed = sessionStorage.getItem('guest_modal_closed') === 'true';

    if (!isAuth && !modalClosed) {
        // Show modal after a short delay for better UX
        setTimeout(() => {
            $('#guest-cta-modal').fadeIn();
        }, 2000);
    }
}

// Close Guest Modal
window.closeGuestModal = function () {
    $('#guest-cta-modal').fadeOut();
    // Remember that user closed it (don't show again this session)
    sessionStorage.setItem('guest_modal_closed', 'true');
};

// Make updateGuestBanner available globally
window.updateGuestBanner = updateGuestBanner;
