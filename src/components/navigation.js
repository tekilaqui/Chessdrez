export default class Navigation {
    constructor(activeTab = 'home') {
        this.activeTab = activeTab;
    }

    render() {
        // Remove existing nav if any
        const existingNav = document.querySelector('.bottom-nav');
        if (existingNav) existingNav.remove();

        const nav = document.createElement('nav');
        nav.className = 'bottom-nav';
        nav.innerHTML = `
            <button class="nav-item ${this.activeTab === 'home' ? 'active' : ''}" data-tab="home">
                <span class="nav-icon">🏠</span>
                <span class="nav-label">Inicio</span>
            </button>
            <button class="nav-item ${this.activeTab === 'play' ? 'active' : ''}" data-tab="play">
                <span class="nav-icon">♟️</span>
                <span class="nav-label">Jugar</span>
            </button>
            <button class="nav-item ${this.activeTab === 'puzzles' ? 'active' : ''}" data-tab="puzzles">
                <span class="nav-icon">🧩</span>
                <span class="nav-label">Puzzles</span>
            </button>
             <button class="nav-item ${this.activeTab === 'analysis' ? 'active' : ''}" data-tab="analysis">
                <span class="nav-icon">📊</span>
                <span class="nav-label">Análisis</span>
            </button>
        `;

        nav.querySelectorAll('.nav-item').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.currentTarget.dataset.tab;
                if (window.chessApp) {
                    window.chessApp.navigateTo(tab);
                }
            });
        });

        return nav;
    }
}
