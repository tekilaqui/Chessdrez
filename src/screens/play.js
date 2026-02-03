import Board from '../components/board.js';

export default class Play {
    constructor() {
        this.gameState = 'setup'; // setup | playing
        this.config = {
            time: '10+0',
            difficulty: 5,
            color: 'w'
        };
    }

    render() {
        this.container = document.createElement('div');
        this.container.className = 'screen-play';
        this.container.style.height = '100%';
        this.container.style.paddingBottom = '80px';
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'column';

        if (this.gameState === 'setup') {
            this.renderSetup();
        } else {
            this.renderGame();
        }

        return this.container;
    }

    renderSetup() {
        this.container.innerHTML = '';
        this.container.style.padding = '20px';

        const header = document.createElement('div');
        header.innerHTML = `
            <h2 style="margin-bottom: 20px;">Configurar Partida</h2>
        `;
        this.container.appendChild(header);

        // Time Control
        const timeGroup = document.createElement('div');
        timeGroup.className = 'form-group';
        timeGroup.innerHTML = `<label class="form-label">CONTROL DE TIEMPO</label>`;
        const timeOptions = document.createElement('div');
        timeOptions.style.display = 'grid';
        timeOptions.style.gridTemplateColumns = 'repeat(2, 1fr)';
        timeOptions.style.gap = '10px';

        ['3+2', '10+0', '30+0', 'Unlimited'].forEach(t => {
            const btn = document.createElement('button');
            btn.className = `btn ${this.config.time === t ? 'btn-primary' : 'btn-secondary'}`;
            btn.innerText = t;
            btn.onclick = () => {
                this.config.time = t;
                this.renderSetup(); // Re-render to update classes
            };
            timeOptions.appendChild(btn);
        });
        timeGroup.appendChild(timeOptions);
        this.container.appendChild(timeGroup);

        // Difficulty
        const diffGroup = document.createElement('div');
        diffGroup.className = 'form-group';
        diffGroup.innerHTML = `<label class="form-label">NIVEL DE STOCKFISH (1-10)</label>`;

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '1';
        slider.max = '10';
        slider.value = this.config.difficulty;
        slider.style.width = '100%';
        slider.style.marginTop = '10px';
        slider.oninput = (e) => {
            this.config.difficulty = parseInt(e.target.value);
            diffVal.innerText = `Nivel: ${this.config.difficulty}`;
        };

        const diffVal = document.createElement('div');
        diffVal.innerText = `Nivel: ${this.config.difficulty}`;
        diffVal.style.textAlign = 'right';
        diffVal.style.color = 'var(--primary)';
        diffVal.style.fontWeight = 'bold';

        diffGroup.appendChild(diffVal);
        diffGroup.appendChild(slider);
        this.container.appendChild(diffGroup);

        // Color
        const colorGroup = document.createElement('div');
        colorGroup.className = 'form-group';
        colorGroup.innerHTML = `<label class="form-label">JUGAR COMO</label>`;
        const colorOpts = document.createElement('div');
        colorOpts.style.display = 'flex';
        colorOpts.style.gap = '10px';

        [
            { id: 'w', label: '⚪ Blancas' },
            { id: 'r', label: '🎲 Azar' },
            { id: 'b', label: '⚫ Negras' }
        ].forEach(c => {
            const btn = document.createElement('button');
            btn.className = `btn ${this.config.color === c.id ? 'btn-primary' : 'btn-secondary'}`;
            btn.style.flex = '1';
            btn.innerText = c.label;
            btn.onclick = () => {
                this.config.color = c.id;
                this.renderSetup();
            };
            colorOpts.appendChild(btn);
        });
        colorGroup.appendChild(colorOpts);
        this.container.appendChild(colorGroup);

        // Start Button
        const startBtn = document.createElement('button');
        startBtn.className = 'btn btn-primary btn-lg';
        startBtn.style.width = '100%';
        startBtn.style.marginTop = '20px';
        startBtn.innerText = 'COMENZAR PARTIDA';
        startBtn.onclick = () => {
            this.gameState = 'playing';
            this.renderGame();
        };
        this.container.appendChild(startBtn);
    }

    renderGame() {
        this.container.innerHTML = '';
        this.container.style.padding = '0'; // Reset padding for full screen feel

        // Header
        const header = document.createElement('div');
        header.style.padding = '15px 20px';
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.gap = '15px';
        header.innerHTML = `
            <button class="btn btn-secondary" style="border-radius:50%; width:40px; height:40px; padding:0; display:flex; align-items:center; justify-content:center;">←</button>
            <div>
                <h3 style="margin:0; font-size:16px;">Partida vs Stockfish</h3>
                <span style="font-size:12px; color:var(--text-secondary);">Nivel ${this.config.difficulty} • ${this.config.time}</span>
            </div>
        `;
        // Back logic
        header.querySelector('button').onclick = () => {
            // Confirm exit?
            if (confirm("¿Salir de la partida?")) {
                this.gameState = 'setup';
                this.renderSetup();
            }
        };
        this.container.appendChild(header);

        // Board Area
        const boardArea = document.createElement('div');
        boardArea.style.flex = '1';
        boardArea.style.display = 'flex';
        boardArea.style.flexDirection = 'column';
        boardArea.style.justifyContent = 'center';
        boardArea.style.padding = '0 20px';

        // Opponent info
        const oppInfo = document.createElement('div');
        oppInfo.style.marginBottom = '10px';
        oppInfo.style.display = 'flex';
        oppInfo.style.justifyContent = 'space-between';
        oppInfo.style.fontSize = '14px';
        oppInfo.innerHTML = `<span>Bot Stockfish (Lvl ${this.config.difficulty})</span> <span>${this.config.time}</span>`;
        boardArea.appendChild(oppInfo);

        // Board Component
        const fen = this.config.color === 'b' ? 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' : 'start';
        // Note: For black, we should flip board. Not implemented in Board.js yet but okay for now.
        const board = new Board(fen);
        const boardEl = board.render();
        boardArea.appendChild(boardEl);

        // Player info
        const playerInfo = document.createElement('div');
        playerInfo.style.marginTop = '10px';
        playerInfo.style.display = 'flex';
        playerInfo.style.justifyContent = 'space-between';
        playerInfo.style.fontSize = '14px';
        playerInfo.innerHTML = `<span>Tú</span> <span>${this.config.time}</span>`;
        boardArea.appendChild(playerInfo);

        this.container.appendChild(boardArea);

        // Controls
        const controls = document.createElement('div');
        controls.style.padding = '20px';
        controls.style.display = 'flex';
        controls.style.justifyContent = 'space-between';
        controls.style.gap = '10px';

        controls.innerHTML = `
            <button class="btn btn-secondary" style="flex:1">↩ Deshacer</button>
            <button class="btn btn-secondary" style="flex:1">🏳️ Rendirse</button>
        `;
        this.container.appendChild(controls);
    }
}
