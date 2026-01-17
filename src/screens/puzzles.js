import Board from '../components/board.js';

export default class Puzzles {
    constructor() {
        this.filter = 'all';
        this.view = 'list'; // list | playing
        this.currentPuzzle = null;
    }

    render() {
        this.container = document.createElement('div');
        this.container.className = 'screen-puzzles';
        this.container.style.height = '100%';
        this.container.style.paddingBottom = '80px';
        this.container.style.display = 'flex';
        this.container.style.flexDirection = 'column';

        if (this.view === 'list') {
            this.renderList();
        } else {
            this.renderPlaying();
        }
        return this.container;
    }

    renderList() {
        this.container.innerHTML = '';
        this.container.style.padding = '20px';

        // Header
        const header = document.createElement('div');
        header.innerHTML = `
            <h2 style="margin-bottom:15px">Puzzles</h2>
        `;
        this.container.appendChild(header);

        // Filters (Horizontal Scroll)
        const filters = ['all', 'Mate', 'Fork', 'Pin', 'Endgame', 'Opening'];
        const filterContainer = document.createElement('div');
        filterContainer.style.display = 'flex';
        filterContainer.style.gap = '10px';
        filterContainer.style.overflowX = 'auto';
        filterContainer.style.paddingBottom = '10px';
        filterContainer.style.marginBottom = '20px';
        filterContainer.style.scrollbarWidth = 'none';

        filters.forEach(f => {
            const chip = document.createElement('button');
            chip.innerText = f === 'all' ? 'Todos' : f;
            chip.className = `btn btn-sm ${this.filter === f ? 'btn-primary' : 'btn-secondary'}`;
            chip.style.borderRadius = '20px';
            chip.style.whiteSpace = 'nowrap';
            chip.onclick = () => {
                this.filter = f;
                this.renderList(); // Re-render logic
            };
            filterContainer.appendChild(chip);
        });
        this.container.appendChild(filterContainer);

        // List
        const listContainer = document.createElement('div');
        listContainer.className = 'puzzle-list';

        // Mock Data
        const puzzles = Array.from({ length: 15 }, (_, i) => ({
            id: 1000 + i,
            rating: 400 + (i * 50),
            theme: i % 2 === 0 ? 'Mate in 2' : 'Fork',
            solved: i < 3,
            fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1' // dummy fen
        }));

        puzzles.forEach(p => {
            const item = document.createElement('div');
            item.className = 'card';
            item.style.marginBottom = '12px';
            item.style.padding = '15px';
            item.style.display = 'flex';
            item.style.justifyContent = 'space-between';
            item.style.alignItems = 'center';
            item.style.cursor = 'pointer';

            item.innerHTML = `
                <div style="display:flex; gap:15px; align-items:center;">
                    <div style="width:40px; height:40px; background:rgba(255,255,255,0.05); border-radius:8px; display:flex; align-items:center; justify-content:center; font-size:20px;">
                        ${p.theme.includes('Mate') ? '🏁' : '🧩'}
                    </div>
                    <div>
                        <div style="font-weight:600; font-size:16px;">Puzzle #${p.id}</div>
                        <div style="font-size:12px; color:var(--text-secondary);">${p.theme} • Rating: ${p.rating}</div>
                    </div>
                </div>
                <div>
                     ${p.solved ? '<span style="color:var(--success); font-weight:bold;">✓</span>' : '<span style="color:var(--text-secondary); font-size:18px;">›</span>'}
                </div>
             `;
            item.onclick = () => {
                this.currentPuzzle = p;
                this.view = 'playing';
                this.renderPlaying();
            };
            listContainer.appendChild(item);
        });
        this.container.appendChild(listContainer);
    }

    renderPlaying() {
        this.container.innerHTML = '';
        this.container.style.padding = '0';

        // Header
        const header = document.createElement('div');
        header.style.padding = '15px 20px';
        header.style.display = 'flex';
        header.style.alignItems = 'center';
        header.style.gap = '15px';
        header.innerHTML = `
            <button class="btn btn-secondary" style="border-radius:50%; width:40px; height:40px; padding:0; display:flex; align-items:center; justify-content:center;">←</button>
            <div>
                <h3 style="margin:0; font-size:16px;">Puzzle #${this.currentPuzzle?.id}</h3>
                <span style="font-size:12px; color:var(--text-secondary);">Te tocan blancas</span>
            </div>
        `;
        header.querySelector('button').onclick = () => {
            this.view = 'list';
            this.renderList();
        };
        this.container.appendChild(header);

        // Board Area
        const boardArea = document.createElement('div');
        boardArea.style.flex = '1';
        boardArea.style.display = 'flex';
        boardArea.style.justifyContent = 'center';
        boardArea.style.alignItems = 'center';
        boardArea.style.padding = '0 20px';

        const board = new Board(this.currentPuzzle?.fen);
        boardArea.appendChild(board.render());
        this.container.appendChild(boardArea);

        // Controls
        const controls = document.createElement('div');
        controls.style.padding = '20px';
        controls.style.display = 'flex';
        controls.style.justifyContent = 'space-between';
        controls.style.gap = '10px';

        // Correct buttons per user request: Solution / Next
        controls.innerHTML = `
             <button class="btn btn-secondary" style="flex:1">💡 Solución</button>
             <button class="btn btn-primary" style="flex:2">Siguiente ➔</button>
        `;
        // Setup simple click handlers
        controls.querySelector('.btn-primary').onclick = () => {
            // Mock loading next
            alert('Cargando siguiente puzzle...');
        };

        this.container.appendChild(controls);
    }
}
