import Home from './screens/home.js';
import Navigation from './components/navigation.js';

class App {
    constructor() {
        this.appElement = document.getElementById('app');
        this.currentScreen = null;
        this.nav = new Navigation();
        this.init();
    }

    init() {
        // Layout structure
        this.appElement.innerHTML = '';
        this.mainContent = document.createElement('main');
        this.mainContent.style.paddingBottom = '80px';
        this.mainContent.style.height = '100%';
        this.mainContent.style.overflowY = 'auto';

        this.appElement.appendChild(this.mainContent);
        this.appElement.appendChild(this.nav.render());

        this.navigateTo('home');

        // PWA Registration
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then(reg => {
                console.log('SW registered', reg);
            }).catch(err => {
                console.warn('SW failed', err);
            });
        }

        // Keyboard Shortcuts (Maestro Spec)
        document.addEventListener('keydown', (e) => {
            // Ignore if input is active
            if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

            const key = e.key.toLowerCase();
            switch (key) {
                case 'h':
                    this.navigateTo('home');
                    break;
                case 'p':
                    this.navigateTo('puzzles');
                    break;
                case 'a':
                    this.navigateTo('analysis');
                    break;
                case 'arrowleft':
                    // TODO: Implement move navigation
                    console.log('Previous move');
                    break;
                case 'arrowright':
                    console.log('Next move');
                    break;
                case '?':
                    alert('Atajos:\nH: Home\nP: Puzzles\nA: Análisis\n←/→: Mover');
                    break;
            }
        });
    }

    navigateTo(screenName) {
        this.nav.activeTab = screenName;
        // Re-render nav to update active state safely
        const oldNav = this.appElement.querySelector('.bottom-nav');
        if (oldNav) oldNav.remove();
        this.appElement.appendChild(this.nav.render());

        this.mainContent.innerHTML = '';

        switch (screenName) {
            case 'home':
                import('./screens/home.js').then(module => {
                    this.currentScreen = new module.default();
                    this.mainContent.appendChild(this.currentScreen.render());
                });
                break;
            case 'play':
                import('./screens/play.js').then(module => {
                    const screen = new module.default();
                    this.mainContent.appendChild(screen.render());
                });
                break;
            case 'puzzles':
                import('./screens/puzzles.js').then(module => {
                    const screen = new module.default();
                    this.mainContent.appendChild(screen.render());
                });
                break;
            case 'analysis':
                import('./screens/analysis.js').then(module => {
                    const screen = new module.default();
                    this.mainContent.appendChild(screen.render());
                });
                break;
            case 'history': // Added History route
                import('./screens/history.js').then(module => {
                    const screen = new module.default();
                    this.mainContent.appendChild(screen.render());
                });
                break;
            case 'profile':
                this.mainContent.innerHTML = '<div style="padding:20px; text-align:center; color:var(--text-secondary)">Perfil de Usuario (Próximamente)</div>';
                break;
            default:
                import('./screens/home.js').then(module => {
                    this.currentScreen = new module.default();
                    this.mainContent.appendChild(this.currentScreen.render());
                });
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.chessApp = new App();
});
