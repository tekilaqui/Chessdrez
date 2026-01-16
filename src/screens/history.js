import Board from '../components/board.js';

export default class History {
    render() {
        const container = document.createElement('div');
        container.className = 'screen-history';
        container.style.padding = '20px';
        container.style.paddingBottom = '80px';

        // Header
        const header = document.createElement('div');
        header.innerHTML = `
            <div style="display:flex; gap:15px; align-items:center; margin-bottom: 20px;">
                <button class="btn btn-secondary" style="border-radius:50%; width:40px; height:40px; padding:0; display:flex; align-items:center; justify-content:center;" onclick="window.chessApp.navigateTo('home')">←</button>
                <h2 style="margin:0; font-size: 20px;">Historial</h2>
            </div>
        `;
        container.appendChild(header);

        // Stats Summary
        const summary = document.createElement('div');
        summary.className = 'card';
        summary.style.padding = '15px';
        summary.style.marginBottom = '20px';
        summary.style.display = 'flex';
        summary.style.justifyContent = 'space-around';
        summary.innerHTML = `
            <div style="text-align:center;">
                <div style="font-size:20px; font-weight:bold; color:var(--success);">12</div>
                <div style="font-size:12px; color:var(--text-secondary);">Victorias</div>
            </div>
            <div style="text-align:center;">
                <div style="font-size:20px; font-weight:bold; color:var(--warning);">5</div>
                <div style="font-size:12px; color:var(--text-secondary);">Tablas</div>
            </div>
            <div style="text-align:center;">
                <div style="font-size:20px; font-weight:bold; color:var(--error);">8</div>
                <div style="font-size:12px; color:var(--text-secondary);">Derrotas</div>
            </div>
        `;
        container.appendChild(summary);

        // Game List
        const list = document.createElement('div');

        // Mock Data
        const games = [
            { id: 1, vs: 'Stockfish Lvl 5', result: 'Win', date: 'Hoy, 10:30 AM', moves: 34 },
            { id: 2, vs: 'Stockfish Lvl 5', result: 'Loss', date: 'Ayer, 8:15 PM', moves: 22 },
            { id: 3, vs: 'Jugador Invitado', result: 'Draw', date: '14 Ene, 2:00 PM', moves: 56 },
        ];

        if (games.length === 0) {
            list.innerHTML = `<div style="text-align:center; padding:40px; color:var(--text-secondary);">No hay partidas recientes.</div>`;
        } else {
            games.forEach(g => {
                const item = document.createElement('div');
                item.className = 'card';
                item.style.marginBottom = '10px';
                item.style.padding = '15px';
                item.style.display = 'flex';
                item.style.alignItems = 'center';
                item.style.gap = '15px';
                item.onclick = () => {
                    // Navigate to analysis or replay
                    alert('Revisar partida: ' + g.id);
                };

                const icon = g.result === 'Win' ? '🏆' : g.result === 'Loss' ? '❌' : '🤝';
                const color = g.result === 'Win' ? 'var(--success)' : g.result === 'Loss' ? 'var(--error)' : 'var(--warning)';

                item.innerHTML = `
                    <div style="font-size:24px;">${icon}</div>
                    <div style="flex:1;">
                        <div style="font-weight:600; font-size:14px;">vs ${g.vs}</div>
                        <div style="font-size:12px; color:var(--text-secondary);">${g.date} • ${g.moves} movs</div>
                    </div>
                    <div style="font-weight:bold; font-size:12px; color:${color};">${g.result.toUpperCase()}</div>
                `;
                list.appendChild(item);
            });
        }
        container.appendChild(list);

        return container;
    }
}
