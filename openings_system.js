/**
 * Sistema Mejorado de Aperturas
 * Maneja modo teoría, entrenamiento y visualización en análisis
 */

let openingTheoryState = {
    currentOpening: null,
    currentStep: 0,
    mode: null, // 'theory', 'training'
    moveHistory: []
};

/**
 * Inicializa el modo teoría de aperturas
 */
function initTheoryMode(opening) {
    if (!opening || !opening.moves || !opening.steps) {
        console.error('Apertura inválida para modo teoría');
        return;
    }

    // Actualizar propiedades del objeto existente (para no perder la referencia global en window)
    openingTheoryState.currentOpening = opening;
    openingTheoryState.currentStep = -1;
    openingTheoryState.mode = 'theory';
    openingTheoryState.moveHistory = [];
    openingTheoryState.userColor = 'w';

    // Resetear tablero
    game.reset();
    board.position('start');

    // Mostrar controles de navegación
    showTheoryControls();

    // Mostrar explicación inicial
    showTheoryExplanation(-1);

    // Actualizar UI
    updateUI(false);

    showToast('📚 Modo Teoría activado. Usa los controles para navegar.', 'info');
}

/**
 * Muestra los controles de navegación para modo teoría
 */
function showTheoryControls() {
    let controlsHtml = `
        <div id="theory-controls" style="background: linear-gradient(135deg, rgba(78, 205, 199, 0.15) 0%, rgba(50, 160, 155, 0.1) 100%);
            border: 2px solid rgba(78, 205, 199, 0.3);
            border-radius: 16px;
            padding: 15px;
            margin: 15px 0;
            display: flex;
            flex-direction: column;
            gap: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                <h4 style="color: var(--accent); font-weight: 800; font-size: 0.9rem; margin: 0;">
                    📖 ${openingTheoryState.currentOpening.name}
                </h4>
                <span style="color: var(--text-secondary); font-size: 0.75rem; font-weight: 600;">
                    Movimiento ${openingTheoryState.currentStep === -1 ? 0 : openingTheoryState.currentStep + 1} / ${openingTheoryState.currentOpening.moves.length}
                </span>
            </div>
            <div style="display: flex; gap: 8px; justify-content: center;">
                <button onclick="theoryGoToStart()" class="btn-theory-nav" title="Principio">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="11 17 6 12 11 7"></polyline>
                        <polyline points="18 17 13 12 18 7"></polyline>
                    </svg>
                </button>
                <button onclick="theoryPrevious()" class="btn-theory-nav" title="Atrás">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="15 18 9 12 15 6"></polyline>
                    </svg>
                </button>
                <button onclick="theoryNext()" class="btn-theory-nav" title="Adelante">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                </button>
                <button onclick="theoryGoToEnd()" class="btn-theory-nav" title="Fin">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="13 17 18 12 13 7"></polyline>
                        <polyline points="6 17 11 12 6 7"></polyline>
                    </svg>
                </button>
            </div>
            <div id="theory-explanation" style="background: rgba(0, 0, 0, 0.2);
                border-radius: 12px;
                padding: 12px;
                font-size: 0.85rem;
                line-height: 1.6;
                color: var(--text-primary);
                min-height: 60px;">
                Cargando explicación...
            </div>
        </div>
    `;

    // Insertar en el panel lateral o crear contenedor
    const panel = document.querySelector('.side-panel') || document.getElementById('side-panel');
    if (panel) {
        const existing = document.getElementById('theory-controls');
        if (existing) existing.remove();
        panel.insertAdjacentHTML('afterbegin', controlsHtml);
    }
}

/**
 * Navega al principio de la línea
 */
function theoryGoToStart() {
    openingTheoryState.currentStep = -1;
    applyTheoryPosition(-1);
}

/**
 * Navega al final de la línea
 */
function theoryGoToEnd() {
    const maxSteps = openingTheoryState.currentOpening.moves.length;
    openingTheoryState.currentStep = maxSteps - 1;
    applyTheoryPosition(maxSteps - 1);
}

/**
 * Movimiento anterior
 */
function theoryPrevious() {
    if (openingTheoryState.mode === 'theory') {
        if (openingTheoryState.currentStep >= 0) {
            openingTheoryState.currentStep--;
            applyTheoryPosition(openingTheoryState.currentStep);
        }
    } else if (openingTheoryState.mode === 'training') {
        // En modo entrenamiento, retroceder deshace jugadas
        game.undo(); // Deshacer respuesta IA
        game.undo(); // Deshacer jugada usuario
        board.position(game.fen());
        updateUI(false);
    }
}

/**
 * Movimiento siguiente
 */
function theoryNext() {
    if (openingTheoryState.mode === 'theory') {
        const maxSteps = openingTheoryState.currentOpening.moves.length;
        if (openingTheoryState.currentStep < maxSteps - 1) {
            openingTheoryState.currentStep++;
            applyTheoryPosition(openingTheoryState.currentStep);
        }
    } else if (openingTheoryState.mode === 'training') {
        // En modo entrenamiento, el botón adelante actúa como pista
        const nextMove = getNextTheoryMove();
        if (nextMove) {
            const from = nextMove.substring(0, 2);
            const to = nextMove.substring(2, 4);
            const promotion = nextMove.length > 4 ? nextMove.substring(4) : 'q';

            const moveResult = game.move({ from, to, promotion });
            if (moveResult) {
                board.position(game.fen());
                if (typeof playSnd === 'function') playSnd('move');
                updateUI(false);

                // Auto-respuesta de la IA tras la pista
                setTimeout(() => {
                    const aiMove = getNextTheoryMove();
                    if (aiMove && game.turn() !== openingTheoryState.userColor) {
                        const aFrom = aiMove.substring(0, 2);
                        const aTo = aiMove.substring(2, 4);
                        game.move({ from: aFrom, to: aTo, promotion: 'q' });
                        board.position(game.fen());
                        if (typeof playSnd === 'function') playSnd('move');
                        updateUI(false);
                    }
                }, 500);
            }
        } else {
            showToast("Línea teórica completada", "info");
        }
    }
}

/**
 * Aplica una posición específica de la teoría
 */
function applyTheoryPosition(stepIndex) {
    game.reset();
    // board.position('start'); // ELIMINADO PARA EVITAR PARPADEO
    const moves = openingTheoryState.currentOpening.moves;
    const steps = openingTheoryState.currentOpening.steps;

    // Aplicar todos los movimientos hasta el paso actual
    for (let i = 0; i <= stepIndex && i < moves.length; i++) {
        const moveUCI = moves[i];
        const from = moveUCI.substring(0, 2);
        const to = moveUCI.substring(2, 4);
        const promotion = moveUCI.length > 4 ? moveUCI.substring(4) : 'q';

        const move = game.move({ from, to, promotion });
        if (!move) {
            console.error(`Movimiento inválido en paso ${i}: ${moveUCI}`);
            break;
        }
    }

    board.position(game.fen());
    showTheoryExplanation(stepIndex);
    updateUI(false);

    // Actualizar contador
    const counter = document.querySelector('#theory-controls span');
    if (counter) {
        const stepDisplay = stepIndex === -1 ? 0 : stepIndex + 1;
        counter.textContent = `Movimiento ${stepDisplay} / ${moves.length}`;
    }
}

/**
 * Muestra la explicación del movimiento actual
 */
function showTheoryExplanation(stepIndex) {
    const steps = openingTheoryState.currentOpening.steps;
    const explanationDiv = document.getElementById('theory-explanation');

    if (!explanationDiv) return;

    if (stepIndex === -1) {
        explanationDiv.innerHTML = `
            <div style="color: var(--accent); font-weight: 700; margin-bottom: 8px;">Principio de la Apertura</div>
            <div style="color: var(--text-primary); line-height: 1.6;">
                Estudia la línea teórica de la <b>${openingTheoryState.currentOpening.name}</b>.<br>
                Usa el botón <b>Siguiente</b> o haz el primer movimiento para comenzar.
            </div>
        `;
        return;
    }

    if (!steps || !steps[stepIndex]) return;

    const step = steps[stepIndex];
    let html = `<div style="color: var(--accent); font-weight: 700; margin-bottom: 8px;">
        Movimiento ${stepIndex + 1}
    </div>`;

    if (step.comment) {
        html += `<div style="color: var(--text-primary); line-height: 1.6;">
            ${step.comment}
        </div>`;
    }

    if (step.marks && step.marks.length > 0) {
        html += `<div style="margin-top: 8px; font-size: 0.75rem; color: var(--text-secondary);">
            <strong>Marcas:</strong> ${step.marks.join(', ')}
        </div>`;
    }

    explanationDiv.innerHTML = html;

    // Aplicar marcas en el tablero si existen
    if (step.marks) {
        applyTheoryMarks(step.marks);
    }
}

/**
 * Aplica marcas visuales en el tablero
 */
function applyTheoryMarks(marks) {
    // Limpiar marcas anteriores
    $('.square-55d63').removeClass('highlight-selected highlight-hint highlight-last-move');

    marks.forEach(mark => {
        const [square, color] = mark.split('-');
        const squareEl = $(`.square-${square}`);
        if (squareEl.length) {
            squareEl.addClass(`highlight-${color || 'hint'}`);
        }
    });
}

/**
 * Verifica si el movimiento del usuario sigue la teoría
 */
function checkTheoryMove(userMove) {
    if (openingTheoryState.mode !== 'theory') return null;

    const moves = openingTheoryState.currentOpening.moves;
    const currentStep = openingTheoryState.currentStep;

    if (currentStep >= moves.length) {
        return { valid: false, message: 'Has completado la línea teórica' };
    }

    const expectedMove = moves[currentStep];
    const userMoveUCI = userMove.from + userMove.to + (userMove.promotion || '');

    if (userMoveUCI === expectedMove ||
        userMoveUCI.toLowerCase() === expectedMove.toLowerCase()) {
        return {
            valid: true,
            message: '✅ Movimiento correcto según la teoría',
            isExact: true
        };
    }

    // Verificar si es una variante conocida
    return {
        valid: false,
        message: '⚠️ Este movimiento no está en la línea principal. La teoría recomienda: ' + expectedMove,
        expected: expectedMove
    };
}

/**
 * Inicializa modo entrenamiento
 */
function initTrainingMode(opening, userColor) {
    if (!opening || !opening.moves) {
        console.error('Apertura inválida para modo entrenamiento');
        return;
    }

    openingTheoryState.currentOpening = opening;
    openingTheoryState.currentStep = 0;
    openingTheoryState.mode = 'training';
    openingTheoryState.moveHistory = [];
    openingTheoryState.userColor = userColor || 'w';

    game.reset();
    board.position('start');

    // Si el usuario juega negras, hacer el primer movimiento automáticamente
    if (userColor === 'b' && opening.moves.length > 0) {
        const firstMove = opening.moves[0];
        const from = firstMove.substring(0, 2);
        const to = firstMove.substring(2, 4);
        game.move({ from, to, promotion: 'q' });
        board.position(game.fen());
        openingTheoryState.currentStep = 1;
    }

    updateUI(false);
    showToast('🎯 Modo Entrenamiento activado. La IA seguirá la línea teórica.', 'info');
}

/**
 * Obtiene el siguiente movimiento teórico para la IA
 */
function getNextTheoryMove() {
    if (openingTheoryState.mode !== 'training' || !openingTheoryState.currentOpening) {
        return null;
    }

    const moves = openingTheoryState.currentOpening.moves;
    const historyLen = game.history().length;

    if (historyLen >= moves.length) {
        return null; // Fuera de la teoría
    }

    return moves[historyLen];
}

/**
 * Muestra información de apertura en el panel de análisis
 */
function displayOpeningInAnalysis(openingInfo) {
    if (!openingInfo || !openingInfo.name) return;

    const analysisContent = document.getElementById('analysis-content');
    if (!analysisContent) return;

    let html = `
        <div style="background: linear-gradient(135deg, rgba(78, 205, 199, 0.15) 0%, rgba(50, 160, 155, 0.1) 100%);
            border: 2px solid rgba(78, 205, 199, 0.3);
            border-radius: 12px;
            padding: 12px;
            margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <h4 style="color: var(--accent); font-weight: 800; font-size: 0.85rem; margin: 0;">
                    📖 ${openingInfo.name}
                </h4>
                ${openingInfo.isExact ? '<span style="color: var(--success); font-size: 0.7rem;">✓ Teoría</span>' :
            '<span style="color: var(--warning); font-size: 0.7rem;">Variante</span>'}
            </div>
            ${openingInfo.progress ? `
                <div style="font-size: 0.75rem; color: var(--text-secondary); margin-bottom: 6px;">
                    Progreso: ${openingInfo.progress}
                </div>
            ` : ''}
            ${openingInfo.nextMove ? `
                <div style="font-size: 0.75rem; color: var(--text-primary);">
                    <strong>Siguiente:</strong> ${openingInfo.nextMove}
                </div>
            ` : ''}
            ${openingInfo.comments && openingInfo.comments.length > 0 ? `
                <div style="margin-top: 8px; padding-top: 8px; border-top: 1px solid rgba(78, 205, 199, 0.2);">
                    <div style="font-size: 0.75rem; color: var(--text-secondary); line-height: 1.5;">
                        ${openingInfo.comments[0]}
                    </div>
                </div>
            ` : ''}
        </div>
    `;

    // Insertar al principio del contenido de análisis
    const existing = analysisContent.querySelector('.opening-info-display');
    if (existing) existing.remove();

    const div = document.createElement('div');
    div.className = 'opening-info-display';
    div.innerHTML = html;
    analysisContent.insertBefore(div, analysisContent.firstChild);
}

// Exponer estado y funciones globalmente
window.openingTheoryState = openingTheoryState;
window.initTheoryMode = initTheoryMode;
window.initTrainingMode = initTrainingMode;
window.theoryGoToStart = theoryGoToStart;
window.theoryGoToEnd = theoryGoToEnd;
window.theoryPrevious = theoryPrevious;
window.theoryNext = theoryNext;
window.checkTheoryMove = checkTheoryMove;
window.getNextTheoryMove = getNextTheoryMove;
window.displayOpeningInAnalysis = displayOpeningInAnalysis;
