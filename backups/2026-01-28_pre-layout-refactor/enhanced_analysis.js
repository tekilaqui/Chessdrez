/**
 * lichess_style_analysis.js
 * Sistema de análisis estilo Lichess
 * PC: Panel izquierdo con apertura, derecho con análisis
 * Móvil: Pestañas toggle debajo del tablero
 */

const LichessStyleAnalysis = {
    isInitialized: false,
    activeTabs: new Set(),
    currentOpening: null,
    currentDefense: null,

    /**
     * Inicializa el sistema
     */
    initialize() {
        if (this.isInitialized) return;

        console.log('📊 Inicializando Lichess Style Analysis...');

        // Crear panel de apertura (PC - izquierda)
        this.createOpeningPanel();

        // Crear panel derecho (PC - derecha)
        this.createRightPanel();

        // Crear pestañas móviles
        this.createMobileTabs();

        // Crear paneles móviles colapsables
        this.createMobilePanels();

        this.isInitialized = true;
        console.log('✅ Lichess Style Analysis listo');
    },

    /**
     * Crea el panel de apertura estilo Lichess (PC - lateral izquierdo)
     */
    createOpeningPanel() {
        // Solo en PC - se inserta antes del tablero
        const boardLayout = document.getElementById('board-layout');
        if (!boardLayout || document.getElementById('opening-wiki-panel')) return;

        const panel = document.createElement('div');
        panel.id = 'opening-wiki-panel';
        panel.className = 'opening-wiki-panel desktop-only';
        panel.innerHTML = `
            <div class="owp-header">
                <span class="owp-title">WikiBook</span>
            </div>
            <div class="owp-content">
                <h3 class="owp-opening-name" id="owp-opening-name">
                    Posición inicial
                </h3>
                <div class="owp-description" id="owp-description">
                    <p>Haz un movimiento para ver información sobre la apertura.</p>
                </div>
            </div>
        `;

        // Insertar al inicio del board-layout (Columna 1)
        boardLayout.insertBefore(panel, boardLayout.firstChild);
    },

    /**
     * Crea el panel derecho de análisis (PC - lateral derecho)
     */
    createRightPanel() {
        const boardLayout = document.getElementById('board-layout');
        if (!boardLayout || document.getElementById('analysis-right-panel')) return;

        const panel = document.createElement('div');
        panel.id = 'analysis-right-panel';
        panel.className = 'analysis-right-panel desktop-only';
        panel.innerHTML = `
            <div class="arp-header">
                <div class="arp-eval-box" id="arp-eval-display">0.0</div>
                <div style="font-size:0.8rem; color:#888;">Stockfish 16</div>
            </div>
            <div class="eval-bar-container" style="margin:0;">
                <div class="eval-bar-fill" id="arp-eval-bar" style="width:50%;"></div>
            </div>
            <div class="arp-moves-container" id="arp-moves-container">
                <!-- Movimientos aquí -->
            </div>
            <div class="arp-controls" style="padding:10px; border-top:1px solid #404040;">
                <button class="btn-action-primary" style="width:100%; font-size:0.9rem;" onclick="state.resetBoard()">
                    Reiniciar Tablero
                </button>
            </div>
        `;

        // Insertar al final del board-layout (Columna 3)
        boardLayout.appendChild(panel);
    },

    /**
     * Crea las pestañas móviles estilo Lichess
     */
    createMobileTabs() {
        const boardLayout = document.getElementById('board-layout');
        if (!boardLayout || document.getElementById('analysis-tabs-mobile')) return;

        // Buscar donde insertar (después de nav-controls)
        const navControls = boardLayout.querySelector('.nav-controls');

        const tabsContainer = document.createElement('div');
        tabsContainer.id = 'analysis-tabs-mobile';
        tabsContainer.className = 'analysis-tabs-mobile mobile-only';
        tabsContainer.innerHTML = `
            <button class="atm-tab" data-tab="opening" onclick="LichessStyleAnalysis.toggleTab('opening')">
                <span class="atm-icon">📖</span>
                <span class="atm-label">Apertura</span>
            </button>
            <button class="atm-tab" data-tab="engine" onclick="LichessStyleAnalysis.toggleTab('engine')">
                <span class="atm-icon">⚙️</span>
                <span class="atm-label">Motor</span>
            </button>
            <button class="atm-tab" data-tab="moves" onclick="LichessStyleAnalysis.toggleTab('moves')">
                <span class="atm-icon">🎯</span>
                <span class="atm-label">Jugadas</span>
            </button>
            <button class="atm-tab" data-tab="traps" onclick="LichessStyleAnalysis.toggleTab('traps')">
                <span class="atm-icon">⚠️</span>
                <span class="atm-label">Trampas</span>
            </button>
        `;

        if (navControls) {
            navControls.insertAdjacentElement('afterend', tabsContainer);
        } else {
            boardLayout.appendChild(tabsContainer);
        }
    },

    /**
     * Crea los paneles colapsables para móvil
     */
    createMobilePanels() {
        const boardLayout = document.getElementById('board-layout');
        if (!boardLayout || document.getElementById('analysis-panels-mobile')) return;

        const tabsContainer = document.getElementById('analysis-tabs-mobile');

        const panelsContainer = document.createElement('div');
        panelsContainer.id = 'analysis-panels-mobile';
        panelsContainer.className = 'analysis-panels-mobile mobile-only';
        panelsContainer.innerHTML = `
            <!-- Panel Apertura -->
            <div class="apm-panel" id="panel-opening" data-panel="opening">
                <div class="apm-header">
                    <span class="apm-title" id="mobile-opening-name">Posición inicial</span>
                </div>
                <div class="apm-content" id="mobile-opening-desc">
                    Haz un movimiento para ver la apertura.
                </div>
            </div>

            <!-- Panel Motor/Análisis -->
            <div class="apm-panel" id="panel-engine" data-panel="engine">
                <div class="apm-header">
                    <div class="apm-engine-info">
                        <span class="apm-engine-name">SF 16</span>
                        <span class="apm-engine-depth" id="mobile-engine-depth">Profundidad: --</span>
                    </div>
                </div>
                <div class="apm-content">
                    <div class="apm-eval-bar">
                        <div class="apm-eval-fill" id="mobile-eval-fill-bar"></div>
                        <span class="apm-eval-text" id="mobile-eval-text">0.0</span>
                    </div>
                    <div class="apm-best-line" id="mobile-best-line">
                        Calculando...
                    </div>
                </div>
            </div>

            <!-- Panel Mejores Jugadas -->
            <div class="apm-panel" id="panel-moves" data-panel="moves">
                <div class="apm-header">
                    <span class="apm-title">Mejores Jugadas</span>
                </div>
                <div class="apm-content">
                    <div class="apm-moves-list" id="mobile-moves-list">
                        <div class="apm-move-item loading">Calculando líneas...</div>
                    </div>
                </div>
            </div>

            <!-- Panel Trampas -->
            <div class="apm-panel" id="panel-traps" data-panel="traps">
                <div class="apm-header">
                    <span class="apm-title">⚠️ Trampas Disponibles</span>
                </div>
                <div class="apm-content">
                    <div class="apm-traps-list" id="mobile-traps-list">
                        <div class="apm-no-traps">✅ Sin trampas en esta posición</div>
                    </div>
                </div>
            </div>
        `;

        if (tabsContainer) {
            tabsContainer.insertAdjacentElement('afterend', panelsContainer);
        } else {
            boardLayout.appendChild(panelsContainer);
        }
    },

    /**
     * Toggle de pestaña (móvil)
     */
    toggleTab(tabId) {
        const tab = document.querySelector(`.atm-tab[data-tab="${tabId}"]`);
        const panel = document.getElementById(`panel-${tabId}`);

        if (!tab || !panel) return;

        if (this.activeTabs.has(tabId)) {
            // Desactivar
            this.activeTabs.delete(tabId);
            tab.classList.remove('active');
            panel.classList.remove('visible');
        } else {
            // Activar
            this.activeTabs.add(tabId);
            tab.classList.add('active');
            panel.classList.add('visible');
        }
    },

    /**
     * Base de datos de aperturas con explicaciones
     */
    openingsDatabase: {
        // Aperturas de Blancas
        'e4': {
            name: "King's Pawn Opening",
            nameEs: "Apertura del Peón de Rey",
            description: "1.e4 es la apertura más popular. Controla el centro y libera el alfil y la dama. Bobby Fischer dijo: 'Best by test' (La mejor, probada)."
        },
        'd4': {
            name: "Queen's Pawn Opening",
            nameEs: "Apertura del Peón de Dama",
            description: "1.d4 conduce a posiciones más cerradas y estratégicas. El peón está protegido por la dama desde el inicio."
        },
        'c4': {
            name: "English Opening",
            nameEs: "Apertura Inglesa",
            description: "1.c4 prepara un fianchetto del alfil o transpone a sistemas de peón dama. Muy flexible."
        },
        'Nf3': {
            name: "Réti Opening",
            nameEs: "Apertura Reti",
            description: "1.Cf3 es una apertura hipermoderna que retrasa la ocupación del centro con peones."
        },

        // Defensas contra e4
        'e4 e5': {
            name: "Open Game",
            nameEs: "Juego Abierto",
            description: "1...e5 crea simetría y abre líneas para el desarrollo rápido. Conduce a posiciones tácticas."
        },
        'e4 c5': {
            name: "Sicilian Defence",
            nameEs: "Defensa Siciliana",
            description: "1...c5 es la defensa más popular contra 1.e4. Negras luchan por el control de d4 sin crear simetría. Conduce a posiciones muy complejas y desequilibradas."
        },
        'e4 e6': {
            name: "French Defence",
            nameEs: "Defensa Francesa",
            description: "1...e6 prepara d5, creando una estructura de peones sólida pero cerrando el alfil de c8. Negras buscan contrajuego en el flanco de dama."
        },
        'e4 c6': {
            name: "Caro-Kann Defence",
            nameEs: "Defensa Caro-Kann",
            description: "1...c6 prepara d5 manteniendo abierta la diagonal del alfil de c8. Es una defensa muy sólida favorecida por jugadores posicionales."
        },
        'e4 d5': {
            name: "Scandinavian Defence",
            nameEs: "Defensa Escandinava",
            description: "1...d5 desafía inmediatamente el centro. Después de 2.exd5 Dxd5, la dama sale temprano pero negras tienen juego activo."
        },

        // Líneas específicas
        'e4 e5 Nf3': {
            name: "King's Knight Opening",
            nameEs: "Apertura del Caballo de Rey",
            description: "2.Cf3 desarrolla una pieza atacando e5. Prepara múltiples sistemas como la Italiana, Española o Escocesa."
        },
        'e4 e5 Nf3 Nc6': {
            name: "King's Knight Game",
            nameEs: "Defensa del Caballo de Rey",
            description: "2...Cc6 defiende e5 de forma natural. Es la respuesta más común que permite múltiples continuaciones."
        },
        'e4 e5 Nf3 Nc6 Bc4': {
            name: "Italian Game",
            nameEs: "Apertura Italiana",
            description: "El alfil apunta a f7, el punto más débil de las negras al inicio. Es una de las aperturas más antiguas y sigue siendo muy popular."
        },
        'e4 e5 Nf3 Nc6 Bb5': {
            name: "Ruy López (Spanish Game)",
            nameEs: "Apertura Española (Ruy López)",
            description: "La Española es una de las aperturas más importantes del ajedrez. Blancas ejercen presión sobre el caballo que defiende e5, creando tensión duradera."
        },

        // Defensa Siciliana variantes
        'e4 c5 Nf3': {
            name: "Sicilian Defence: Open",
            nameEs: "Siciliana Abierta",
            description: "2.Cf3 permite la Siciliana Abierta después de 2...d6/Cc6/e6 y 3.d4. Es la línea más crítica."
        },
        'e4 c5 Nf3 d6': {
            name: "Sicilian: Najdorf/Dragon Setup",
            nameEs: "Siciliana: Sistema Najdorf/Dragón",
            description: "2...d6 es flexible y puede llevar al Najdorf (5...a6) o al Dragón (g6). Son las variantes más populares."
        },

        // Defensa contra d4
        'd4 d5': {
            name: "Closed Game",
            nameEs: "Juego Cerrado",
            description: "1...d5 iguala en el centro. Puede conducir al Gambito de Dama o sistemas cerrados."
        },
        'd4 Nf6': {
            name: "Indian Defence",
            nameEs: "Defensa India",
            description: "1...Cf6 es una respuesta flexible. Dependiendo de la continuación puede ser India de Rey, Nimzo-India, o India de Dama."
        },
        'd4 Nf6 c4 g6': {
            name: "King's Indian Defence",
            nameEs: "Defensa India de Rey",
            description: "La India de Rey es una defensa agresiva donde negras permiten que blancas dominen el centro inicialmente, para luego atacar en el flanco de rey."
        },
        'd4 Nf6 c4 e6': {
            name: "Nimzo/Queen's Indian",
            nameEs: "Nimzo-India / India de Dama",
            description: "Con e6, negras se preparan para Ab4 (Nimzo) o b6 (India de Dama). Ambas son defensas muy sólidas."
        },
        'd4 d5 c4': {
            name: "Queen's Gambit",
            nameEs: "Gambito de Dama",
            description: "El Gambito de Dama no es un gambito real - blancas siempre pueden recuperar el peón. Es una de las aperturas más clásicas."
        }
    },

    /**
     * Detecta la apertura basándose en los movimientos
     */
    detectOpening(moves) {
        if (!moves || moves.length === 0) {
            return {
                name: "Starting Position",
                nameEs: "Posición Inicial",
                description: "El tablero está listo. Blancas mueven primero. Las aperturas más populares son 1.e4 y 1.d4."
            };
        }

        // Construir el key desde los movimientos
        const movesStr = moves.join(' ');

        // Buscar coincidencia más específica primero
        let bestMatch = null;
        let bestMatchLen = 0;

        for (const [key, data] of Object.entries(this.openingsDatabase)) {
            const keyMoves = key.split(' ');
            if (keyMoves.length > bestMatchLen && keyMoves.length <= moves.length) {
                // Verificar si los movimientos coinciden
                let match = true;
                for (let i = 0; i < keyMoves.length; i++) {
                    if (moves[i] !== keyMoves[i]) {
                        match = false;
                        break;
                    }
                }
                if (match) {
                    bestMatch = data;
                    bestMatchLen = keyMoves.length;
                }
            }
        }

        if (bestMatch) {
            return bestMatch;
        }

        // Fallback genérico
        const phase = moves.length < 10 ? 'apertura' : 'medio juego';
        return {
            name: "Unknown Position",
            nameEs: "Posición Desconocida",
            description: `Estás en la fase de ${phase}. Esta línea no está en nuestra base de datos, pero puedes continuar desarrollando tus piezas.`
        };
    },

    /**
     * Detecta trampas disponibles
     */
    detectTraps(moves) {
        const traps = [];

        if (!window.OPENINGS_ENHANCED) return traps;

        try {
            // Convertir SAN a LAN para comparar
            const tempGame = new Chess();
            const lanMoves = [];
            for (const san of moves) {
                const move = tempGame.move(san);
                if (move) lanMoves.push(move.from + move.to);
            }

            for (const group of window.OPENINGS_ENHANCED) {
                if (group.group && (group.group.includes('Trampa') || group.group.includes('Mate'))) {
                    for (const trap of (group.items || [])) {
                        const trapMoves = trap.moves || [];

                        // Verificar coincidencia de prefijo
                        let matches = true;
                        for (let i = 0; i < lanMoves.length && i < trapMoves.length; i++) {
                            if (lanMoves[i] !== trapMoves[i]) {
                                matches = false;
                                break;
                            }
                        }

                        if (matches && lanMoves.length < trapMoves.length) {
                            const nextMove = trapMoves[lanMoves.length];
                            const from = nextMove.substring(0, 2);
                            const to = nextMove.substring(2, 4);

                            traps.push({
                                name: trap.name,
                                nextMove: nextMove,
                                nextMoveDisplay: `${from}→${to}`,
                                remaining: trapMoves.length - lanMoves.length
                            });
                        }
                    }
                }
            }
        } catch (e) {
            console.error('Error detectando trampas:', e);
        }

        return traps;
    },

    /**
     * Actualiza toda la UI
     */
    update(moves, evaluation) {
        if (!this.isInitialized) {
            this.initialize();
        }

        // Detectar apertura
        const opening = this.detectOpening(moves);
        this.currentOpening = opening;

        // Actualizar panel PC
        const pcName = document.getElementById('owp-opening-name');
        const pcDesc = document.getElementById('owp-description');
        if (pcName) pcName.textContent = opening.nameEs || opening.name;
        if (pcDesc) pcDesc.innerHTML = `<p>${opening.description}</p>`;

        // Actualizar panel móvil apertura
        const mobileName = document.getElementById('mobile-opening-name');
        const mobileDesc = document.getElementById('mobile-opening-desc');
        if (mobileName) mobileName.textContent = opening.nameEs || opening.name;
        if (mobileDesc) mobileDesc.textContent = opening.description;

        // Actualizar evaluación
        const ev = evaluation || 0;
        const evalText = document.getElementById('mobile-eval-text');
        const evalFill = document.getElementById('mobile-eval-fill-bar');

        if (evalText) {
            const sign = ev >= 0 ? '+' : '';
            evalText.textContent = `${sign}${ev.toFixed(1)}`;
        }

        if (evalFill) {
            // Convertir evaluación a porcentaje (50% = igual, >50% = ventaja blancas)
            const percentage = Math.max(5, Math.min(95, 50 + (ev * 10)));
            evalFill.style.width = `${percentage}%`;
        }

        // Actualizar mejores jugadas
        this.updateBestMoves();

        // Actualizar trampas
        this.updateTraps(moves);
    },

    /**
     * Actualiza las mejores jugadas
     */
    updateBestMoves() {
        const container = document.getElementById('mobile-moves-list');
        if (!container) return;

        if (!window.topMoves || window.topMoves.length === 0) {
            container.innerHTML = '<div class="apm-move-item loading">Calculando líneas...</div>';
            return;
        }

        let html = '';
        const colors = ['#4ecdc7', '#ffd93d', '#74b9ff'];

        for (let i = 0; i < Math.min(3, window.topMoves.length); i++) {
            const move = window.topMoves[i];
            if (move) {
                html += `
                    <div class="apm-move-item" onclick="LichessStyleAnalysis.showArrow('${move.lan}', '${colors[i]}')" style="border-left: 3px solid ${colors[i]};">
                        <span class="apm-move-san">${move.move || '?'}</span>
                        <span class="apm-move-score">${move.score || '?'}</span>
                    </div>
                `;
            }
        }

        container.innerHTML = html || '<div class="apm-move-item loading">Sin datos del motor</div>';

        // También actualizar la mejor línea
        const bestLine = document.getElementById('mobile-best-line');
        if (bestLine && window.topMoves[0]) {
            bestLine.textContent = `Mejor: ${window.topMoves[0].move} (${window.topMoves[0].score})`;
        }

        // Actualizar Panel Derecho Desktop (Barra y Texto)
        const arpEvalBox = document.getElementById('arp-eval-display');
        const arpEvalBar = document.getElementById('arp-eval-bar');

        if (arpEvalBox && window.topMoves[0]) {
            const score = window.topMoves[0].score; // Ej: +0.5
            arpEvalBox.textContent = score;

            // Parse score for bar width
            let val = parseFloat(score);
            if (isNaN(val)) val = 0; // Mate handle later
            const percentage = Math.max(5, Math.min(95, 50 + (val * 10)));
            if (arpEvalBar) arpEvalBar.style.width = `${percentage}%`;
        }
    },

    /**
     * Actualiza la lista de movimientos (PGN) en el panel derecho
     */
    updateMoveList(history) {
        const container = document.getElementById('arp-moves-container');
        if (!container || !history) return;

        let html = '';
        for (let i = 0; i < history.length; i += 2) {
            const num = Math.floor(i / 2) + 1;
            const wMove = history[i];
            const bMove = history[i + 1] || '';

            html += `
                <div class="arp-move-row">
                    <div class="arp-move-num">${num}</div>
                    <div class="arp-move-cell">${wMove}</div>
                    <div class="arp-move-cell">${bMove}</div>
                </div>
            `;
        }
        container.innerHTML = html;
        // Scroll to bottom
        container.scrollTop = container.scrollHeight;
    },

    /**
     * Actualiza las trampas
     */
    updateTraps(moves) {
        const container = document.getElementById('mobile-traps-list');
        const tabTraps = document.querySelector('.atm-tab[data-tab="traps"]');

        if (!container) return;

        const traps = this.detectTraps(moves);

        if (traps.length === 0) {
            container.innerHTML = '<div class="apm-no-traps">✅ Sin trampas en esta posición</div>';
            if (tabTraps) tabTraps.classList.remove('has-alert');
            return;
        }

        // Indicador visual en la pestaña
        if (tabTraps) tabTraps.classList.add('has-alert');

        let html = '';
        for (const trap of traps) {
            html += `
                <div class="apm-trap-item" onclick="LichessStyleAnalysis.executeTrap('${trap.nextMove}', '${trap.name}')">
                    <div class="apm-trap-name">${trap.name}</div>
                    <div class="apm-trap-info">
                        <span class="apm-trap-next">▶ ${trap.nextMoveDisplay}</span>
                        <span class="apm-trap-remaining">${trap.remaining} mov</span>
                    </div>
                </div>
            `;
        }

        container.innerHTML = html;
    },

    /**
     * Muestra flecha de un movimiento
     */
    showArrow(lanMove, color) {
        if (lanMove && typeof window.drawBestMoveArrow === 'function') {
            const canvas = document.getElementById('arrowCanvas');
            if (canvas) {
                const ctx = canvas.getContext('2d');
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
            window.hintsActive = true;
            window.drawBestMoveArrow(lanMove, color || '#4ecdc7');
        }
    },

    /**
     * Ejecuta una trampa
     */
    executeTrap(nextMove, trapName) {
        this.showArrow(nextMove, '#ff6b6b');
        if (window.showToast) {
            window.showToast(`Trampa: ${trapName}`, '⚠️', 'warning');
        }
    },

    /**
     * Hook principal - llamar después de cada movimiento
     */
    onMove(fen, moves, ev = 0) {
        this.update(moves, ev);

        // Actualizar lista de movimientos en desktop
        // Necesitamos el historial completo (moves param is usually just array of SAN)
        this.updateMoveList(moves);
    }
};

// Exponer globalmente
window.LichessStyleAnalysis = LichessStyleAnalysis;

// Auto-inicializar
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => LichessStyleAnalysis.initialize(), 500);
});

// También intentar inicializar si el DOM ya está listo
if (document.readyState !== 'loading') {
    setTimeout(() => LichessStyleAnalysis.initialize(), 500);
}
