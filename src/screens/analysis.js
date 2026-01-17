import Board from '../components/board.js';

export default class Analysis {
    render() {
        const container = document.createElement('div');
        container.className = 'screen-analysis';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.height = '100%';
        container.style.paddingBottom = '80px';

        // Header
        const header = document.createElement('div');
        header.style.padding = '15px 20px';
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.justifyContent = 'space-between';

        header.innerHTML = `
            <div style="display:flex; gap:15px; align-items:center;">
                <button class="btn btn-secondary" style="border-radius:50%; width:40px; height:40px; padding:0; display:flex; align-items:center; justify-content:center;" onclick="window.chessApp.navigateTo('home')">←</button>
                <h3 style="margin:0; font-size:16px;">Análisis</h3>
            </div>
            <button class="btn btn-sm btn-secondary">📥 PGN</button>
        `;
        container.appendChild(header);

        // Board Area using new Board component
        const boardArea = document.createElement('div');
        boardArea.style.padding = '0 20px';
        boardArea.style.marginBottom = '20px';
        boardArea.style.display = 'flex';
        boardArea.style.justifyContent = 'center';

        const board = new Board('start'); // Start position
        boardArea.appendChild(board.render());
        container.appendChild(boardArea);

        // Eval Bar
        const evalBar = document.createElement('div');
        evalBar.style.margin = '0 20px 20px 20px';
        evalBar.style.height = '6px';
        evalBar.style.background = '#333';
        evalBar.style.borderRadius = '3px';
        evalBar.style.overflow = 'hidden';
        evalBar.innerHTML = `<div style="width: 55%; height: 100%; background: #fff;"></div>`; // +1.0 roughly
        container.appendChild(evalBar);

        // Analysis Lines
        const lines = document.createElement('div');
        lines.style.flex = '1';
        lines.style.background = 'var(--bg-panel)';
        lines.style.padding = '20px';
        lines.style.overflowY = 'auto';

        lines.innerHTML = `
            <div style="margin-bottom:15px; font-family:monospace; font-size:13px;">
                <div style="color:var(--text-secondary); margin-bottom:5px;">Mejor jugada (+0.5)</div>
                <div style="color:var(--text-primary);">1. e4 e5 2. Nf3 Nc6 3. Bb5 a6</div>
            </div>
            <div style="margin-bottom:15px; font-family:monospace; font-size:13px;">
                <div style="color:var(--text-secondary); margin-bottom:5px;">Alternativa (+0.3)</div>
                <div style="color:var(--text-muted);">1. d4 d5 2. c4 e6 3. Nc3 Nf6</div>
            </div>
        `;
        container.appendChild(lines);

        return container;
    }
}
