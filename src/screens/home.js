export default class Home {
    render() {
        const container = document.createElement('div');
        container.className = 'screen-home';
        container.style.padding = '20px';
        container.style.paddingBottom = '80px'; // Space for nav

        // Header Section
        const header = document.createElement('header');
        header.style.marginBottom = '20px';
        header.style.display = 'flex';
        header.style.justifyContent = 'space-between';
        header.style.alignItems = 'center';

        const username = localStorage.getItem('chess_username') || 'Invitado';

        const userMeta = document.createElement('div');
        userMeta.innerHTML = `
            <h2 style="margin:0; font-size: 24px;">Hola, ${username} 👋</h2>
            <p style="margin:0; color: var(--text-secondary); font-size: 14px;">¿Listo para jugar?</p>
        `;

        const settingsBtn = document.createElement('button');
        settingsBtn.className = 'btn btn-secondary';
        settingsBtn.innerHTML = '⚙️';
        settingsBtn.style.padding = '8px';
        settingsBtn.style.borderRadius = '50%';
        settingsBtn.style.width = '40px';
        settingsBtn.style.height = '40px';
        settingsBtn.onclick = () => alert('Configuración en desarrollo');

        header.appendChild(userMeta);
        header.appendChild(settingsBtn);
        container.appendChild(header);

        // Stats Row
        const statsRow = document.createElement('div');
        statsRow.style.display = 'grid';
        statsRow.style.gridTemplateColumns = '1fr 1fr';
        statsRow.style.gap = '15px';
        statsRow.style.marginBottom = '25px';

        const elo = localStorage.getItem('chess_user_elo') || 500;
        const puzSolved = localStorage.getItem('chess_puz_solved_today') || 0;

        statsRow.innerHTML = `
            <div class="card" style="padding: 15px; text-align: center; background: linear-gradient(180deg, var(--bg-surface) 0%, rgba(255,255,255,0.02) 100%);">
                <div style="font-size: 24px; color: var(--primary); font-weight: bold; margin-bottom: 4px;">${elo}</div>
                <div style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">ELO Rápido</div>
            </div>
            <div class="card" style="padding: 15px; text-align: center; background: linear-gradient(180deg, var(--bg-surface) 0%, rgba(255,255,255,0.02) 100%);">
                 <div style="font-size: 24px; color: var(--warning); font-weight: bold; margin-bottom: 4px;">${puzSolved}</div>
                 <div style="font-size: 12px; color: var(--text-secondary); text-transform: uppercase; letter-spacing: 0.5px; font-weight: 600;">Puzzles Hoy</div>
            </div>
        `;
        container.appendChild(statsRow);

        // Quick Actions
        const actionsTitle = document.createElement('h3');
        actionsTitle.innerText = 'Acciones Rápidas';
        actionsTitle.style.marginBottom = '15px';
        actionsTitle.style.fontSize = '18px';
        container.appendChild(actionsTitle);

        const actionsGrid = document.createElement('div');
        actionsGrid.style.display = 'grid';
        actionsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';
        actionsGrid.style.gap = '12px';
        actionsGrid.style.marginBottom = '30px';

        const actions = [
            { icon: '⚔️', label: 'Jugar', action: 'play' },
            { icon: '🧩', label: 'Puzzles', action: 'puzzles' },
            { icon: '🔍', label: 'Analizar', action: 'analysis' },
            { icon: '🎓', label: 'Academia', action: 'academy', secondary: true },
            { icon: '👶', label: 'Niños', action: 'kids', secondary: true },
            { icon: '📖', label: 'Aperturas', action: 'openings', secondary: true }
        ];

        actions.forEach(act => {
            const btn = document.createElement('button');
            btn.className = 'card';
            btn.style.display = 'flex';
            btn.style.flexDirection = 'column';
            btn.style.alignItems = 'center';
            btn.style.justifyContent = 'center';
            btn.style.padding = '15px';
            btn.style.height = '100px';
            btn.style.border = '1px solid rgba(255,255,255,0.05)';
            btn.style.cursor = 'pointer';

            btn.innerHTML = `
                <span style="font-size: 30px; margin-bottom: 8px;">${act.icon}</span>
                <span style="font-size: 11px; font-weight: 600; color: var(--text-primary); text-align:center;">${act.label}</span>
            `;

            btn.onclick = () => {
                if (act.action === 'kids') {
                    window.location.href = 'kids/kids.html'; // Direct link for now
                } else if (['academy', 'openings'].includes(act.action)) {
                    alert(`Sección ${act.label} en construcción`);
                } else {
                    if (window.chessApp) window.chessApp.navigateTo(act.action);
                }
            };
            actionsGrid.appendChild(btn);
        });
        container.appendChild(actionsGrid);

        // Featured Card
        const featured = document.createElement('div');
        featured.className = 'card';
        featured.style.background = 'linear-gradient(135deg, var(--primary-dark), var(--primary))';
        featured.style.marginBottom = '30px';
        featured.style.padding = '20px';
        featured.style.color = 'white';
        featured.style.marginBottom = '80px'; // Space for activity (optional) or nav

        featured.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                    <h3 style="margin:0 0 5px 0; font-size: 18px;">Reto Diario</h3>
                    <p style="margin:0; opacity:0.9; font-size:14px;">Mate en 3 • Difícil</p>
                </div>
                <span style="font-size:42px;">🏆</span>
            </div>
            <button class="btn" style="background:white; color:var(--primary); margin-top:20px; width:100%; font-weight:bold; box-shadow: 0 4px 10px rgba(0,0,0,0.2);">
                Resolver Ahora
            </button>
        `;
        featured.querySelector('button').onclick = () => {
            if (window.chessApp) window.chessApp.navigateTo('puzzles');
        };
        container.appendChild(featured);

        return container;
    }
}
