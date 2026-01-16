/**
 * ============================================
 * MOBILE DATA SYNC - Chess Drez
 * Sincroniza datos entre versiones desktop y móvil
 * ============================================
 */

class MobileDataSync {
  constructor() {
    this.syncInterval = null;
    this.isMobile = window.innerWidth <= 768;
    this.init();
  }

  init() {
    // Sincronizar cada vez que cambia algo importante
    this.setupSyncListeners();
    
    // Sync inicial
    this.syncAll();
    
    // Sync periódico (cada 2 segundos durante partida)
    this.startPeriodicSync();
  }

  // ========== LISTENERS ==========
  setupSyncListeners() {
    // Escuchar cambios en el juego
    document.addEventListener('gameStateChanged', () => this.syncGameState());
    document.addEventListener('userDataChanged', () => this.syncUserData());
    document.addEventListener('analysisUpdated', () => this.syncAnalysis());
    
    // Detectar cambios de viewport
    window.addEventListener('resize', () => {
      const wasMobile = this.isMobile;
      this.isMobile = window.innerWidth <= 768;
      
      if (wasMobile !== this.isMobile) {
        this.syncAll(); // Re-sync completo al cambiar
      }
    });
  }

  startPeriodicSync() {
    this.syncInterval = setInterval(() => {
      if (window.gameInProgress) {
        this.syncGameState();
        this.syncAnalysis();
      }
    }, 2000);
  }

  stopPeriodicSync() {
    if (this.syncInterval) {
      clearInterval(this.syncInterval);
      this.syncInterval = null;
    }
  }

  // ========== SYNC ALL ==========
  syncAll() {
    this.syncUserData();
    this.syncGameState();
    this.syncAnalysis();
    this.syncPuzzleData();
  }

  // ========== USER DATA ==========
  syncUserData() {
    const userData = {
      name: this.getText('#my-name-display') || 'Invitado',
      elo: this.getText('#header-elo') || '500',
      avatar: this.getText('#my-avatar') || '👤'
    };

    // Actualizar sidebar móvil
    this.setText('#sidebar-user-name', userData.name);
    this.setText('#sidebar-elo', `ELO: ${userData.elo}`);
    this.setText('.sidebar-avatar', userData.avatar);
  }

  // ========== GAME STATE ==========
  syncGameState() {
    // Timers
    const whiteTime = this.getText('#my-timer');
    const blackTime = this.getText('#opp-timer');
    
    if (whiteTime) this.setText('#mobile-white-timer', whiteTime);
    if (blackTime) this.setText('#mobile-black-timer', blackTime);

    // Player names
    const myName = this.getText('#my-name-display');
    const oppName = this.getText('#opp-name');
    
    if (myName) this.setText('#mobile-my-name', myName);
    if (oppName) this.setText('#mobile-opp-name', oppName);

    // Avatars
    const myAvatar = this.getText('#my-avatar');
    const oppAvatar = this.getText('#opp-avatar');
    
    if (myAvatar) this.setText('#mobile-my-avatar', myAvatar);
    if (oppAvatar) this.setText('#mobile-opp-avatar', oppAvatar);
  }

  // ========== ANALYSIS DATA ==========
  syncAnalysis() {
    // Evaluación
    const evalText = this.getText('#eval-text-overlay');
    if (evalText) {
      this.setText('#mobile-eval-text', evalText);
    }

    // Barra de evaluación
    const evalBar = document.getElementById('eval-bar-fill');
    const mobileEvalBar = document.getElementById('mobile-eval-fill');
    
    if (evalBar && mobileEvalBar) {
      const width = evalBar.style.width;
      const bg = evalBar.style.background;
      
      mobileEvalBar.style.width = width;
      mobileEvalBar.style.background = bg;
    }

    // Precisión y profundidad
    const accuracy = this.getText('#eval-accuracy');
    const depth = this.getText('#eval-depth');
    
    if (accuracy) this.setText('#mobile-accuracy', accuracy);
    if (depth) this.setText('#mobile-depth', depth);

    // Mejores jugadas
    this.syncBestMoves();

    // Perspectiva del maestro
    this.syncMaestroInsights();

    // Comentarios del coach
    this.syncCoachComments();
  }

  syncBestMoves() {
    const desktopMoves = document.getElementById('best-moves-list');
    const mobileMoves = document.getElementById('mobile-best-moves');
    
    if (desktopMoves && mobileMoves) {
      mobileMoves.innerHTML = desktopMoves.innerHTML;
    }
  }

  syncMaestroInsights() {
    // Apertura
    const opening = this.getText('#maestro-opening-name');
    if (opening) {
      this.setText('#mobile-maestro-opening', opening);
    }

    // Plan
    const plan = this.getText('#maestro-plan');
    if (plan) {
      this.setText('#mobile-maestro-plan', plan);
    }

    // Trampa
    const trap = this.getText('#maestro-trap');
    const trapContainer = document.getElementById('maestro-trap-container');
    const mobileTrapContainer = document.getElementById('mobile-maestro-trap-box');
    
    if (trap && trapContainer && mobileTrapContainer) {
      this.setText('#mobile-maestro-trap', trap);
      mobileTrapContainer.style.display = trapContainer.style.display;
    }

    // Estadísticas
    const statsContainer = document.getElementById('maestro-stats-container');
    if (statsContainer && statsContainer.style.display !== 'none') {
      this.syncOpeningStats();
    }
  }

  syncOpeningStats() {
    // Copiar stats de apertura a móvil
    const stats = {
      white: this.getStyle('#stat-white', 'width'),
      draw: this.getStyle('#stat-draw', 'width'),
      black: this.getStyle('#stat-black', 'width'),
      txtWhite: this.getText('#txt-white'),
      txtDraw: this.getText('#txt-draw'),
      txtBlack: this.getText('#txt-black')
    };

    if (stats.white) {
      this.setStyle('#mobile-stat-white', 'width', stats.white);
      this.setStyle('#mobile-stat-draw', 'width', stats.draw);
      this.setStyle('#mobile-stat-black', 'width', stats.black);
      
      this.setText('#mobile-txt-white', stats.txtWhite);
      this.setText('#mobile-txt-draw', stats.txtDraw);
      this.setText('#mobile-txt-black', stats.txtBlack);
      
      const mobileStatsContainer = document.getElementById('mobile-maestro-stats-container');
      if (mobileStatsContainer) {
        mobileStatsContainer.style.display = 'block';
      }
    }
  }

  syncCoachComments() {
    const desktopLogs = document.getElementById('coach-txt');
    const mobileLogs = document.getElementById('mobile-coach-logs');
    
    if (desktopLogs && mobileLogs) {
      mobileLogs.innerHTML = desktopLogs.innerHTML;
    }
  }

  // ========== PUZZLE DATA ==========
  syncPuzzleData() {
    // Descripción del puzzle
    const puzzleDesc = this.getText('#puz-desc-main');
    if (puzzleDesc) {
      this.setText('#mobile-puzzle-desc', puzzleDesc);
    }

    // Timer del puzzle
    const puzzleTimer = this.getText('#puz-timer-main');
    if (puzzleTimer) {
      this.setText('#mobile-puzzle-timer', puzzleTimer);
    }

    // Feedback del puzzle
    const puzzleFeedback = document.getElementById('puzzle-feedback-content');
    const mobileFeedback = document.getElementById('mobile-puzzle-feedback');
    
    if (puzzleFeedback && mobileFeedback) {
      mobileFeedback.innerHTML = puzzleFeedback.innerHTML;
    }

    // Stats de puzzles
    this.syncPuzzleStats();
  }

  syncPuzzleStats() {
    const desktopStats = document.getElementById('puz-stats-list');
    const mobileStats = document.getElementById('puz-stats-list-main');
    
    if (desktopStats && mobileStats) {
      mobileStats.innerHTML = desktopStats.innerHTML;
    }

    const desktopHistory = document.getElementById('puz-history-list');
    const mobileHistory = document.getElementById('puz-history-list-main');
    
    if (desktopHistory && mobileHistory) {
      mobileHistory.innerHTML = desktopHistory.innerHTML;
    }

    // ELO de puzzles
    const puzzleElo = this.getText('#puz-elo-display');
    if (puzzleElo) {
      this.setText('#mobile-tactics-elo', puzzleElo);
      this.setText('#puz-elo-display-main', puzzleElo);
    }
  }

  // ========== THREATS ==========
  syncThreats() {
    const threatsPanel = document.getElementById('threats-panel');
    const mobileThreats = document.getElementById('mobile-threats-section');
    
    if (threatsPanel && mobileThreats) {
      const isVisible = threatsPanel.style.display !== 'none';
      mobileThreats.style.display = isVisible ? 'block' : 'none';
      
      if (isVisible) {
        const threatsList = document.getElementById('threats-list');
        const mobileList = document.getElementById('mobile-threats-list');
        
        if (threatsList && mobileList) {
          mobileList.innerHTML = threatsList.innerHTML;
        }
      }
    }
  }

  // ========== UTILITIES ==========
  getText(selector) {
    const el = document.querySelector(selector);
    return el ? el.textContent.trim() : null;
  }

  setText(selector, text) {
    const el = document.querySelector(selector);
    if (el && text) {
      el.textContent = text;
    }
  }

  getStyle(selector, property) {
    const el = document.querySelector(selector);
    return el ? el.style[property] : null;
  }

  setStyle(selector, property, value) {
    const el = document.querySelector(selector);
    if (el && value) {
      el.style[property] = value;
    }
  }

  copyHTML(fromSelector, toSelector) {
    const from = document.querySelector(fromSelector);
    const to = document.querySelector(toSelector);
    
    if (from && to) {
      to.innerHTML = from.innerHTML;
    }
  }
}

// ========== INTEGRATION HELPERS ==========
class MobileIntegration {
  static updateEvaluation(score, depth, accuracy) {
    // Desktop
    const evalText = document.getElementById('eval-text-overlay');
    if (evalText) evalText.textContent = score;

    const depthEl = document.getElementById('eval-depth');
    if (depthEl) depthEl.textContent = depth;

    const accuracyEl = document.getElementById('eval-accuracy');
    if (accuracyEl) accuracyEl.textContent = accuracy;

    // Mobile (automático con sync)
    if (window.mobileSync) {
      window.mobileSync.syncAnalysis();
    }
  }

  static updateBestMoves(moves) {
    const desktopList = document.getElementById('best-moves-list');
    if (!desktopList) return;

    desktopList.innerHTML = moves.map((move, i) => `
      <div class="move-item" onclick="previewMove('${move.move}')">
        <div class="move-number">${i + 1}</div>
        <div class="move-notation">${move.san}</div>
        <div class="move-eval ${move.eval >= 0 ? 'positive' : 'negative'}">
          ${move.eval > 0 ? '+' : ''}${move.eval}
        </div>
      </div>
    `).join('');

    // Sync a móvil
    if (window.mobileSync) {
      window.mobileSync.syncBestMoves();
    }
  }

  static updateMaestroInsight(type, content) {
    const desktopEl = document.getElementById(`maestro-${type}`);
    if (desktopEl) {
      desktopEl.textContent = content;
    }

    // Sync a móvil
    if (window.mobileSync) {
      window.mobileSync.syncMaestroInsights();
    }
  }

  static addCoachComment(comment, type = 'info') {
    const desktopLogs = document.getElementById('coach-txt');
    if (!desktopLogs) return;

    const commentEl = document.createElement('div');
    commentEl.className = `coach-comment coach-${type}`;
    commentEl.innerHTML = `
      <div class="comment-icon">${this.getCommentIcon(type)}</div>
      <div class="comment-text">${comment}</div>
      <div class="comment-time">${new Date().toLocaleTimeString()}</div>
    `;

    desktopLogs.appendChild(commentEl);
    desktopLogs.scrollTop = desktopLogs.scrollHeight;

    // Sync a móvil
    if (window.mobileSync) {
      window.mobileSync.syncCoachComments();
    }
  }

  static getCommentIcon(type) {
    const icons = {
      brilliant: '✨',
      good: '✅',
      inaccuracy: '⚠️',
      mistake: '❌',
      blunder: '💥',
      info: 'ℹ️',
      book: '📖'
    };
    return icons[type] || 'ℹ️';
  }

  static showThreats(threats) {
    const panel = document.getElementById('threats-panel');
    const list = document.getElementById('threats-list');
    
    if (!panel || !list) return;

    if (threats.length > 0) {
      panel.style.display = 'block';
      list.innerHTML = threats.map(t => `
        <div class="threat-item">
          <span class="threat-icon">⚠️</span>
          <span>${t}</span>
        </div>
      `).join('');
    } else {
      panel.style.display = 'none';
    }

    // Sync a móvil
    if (window.mobileSync) {
      window.mobileSync.syncThreats();
    }
  }

  static updateGameState(whiteTime, blackTime, turn) {
    // Actualizar timers
    const myTimer = document.getElementById('my-timer');
    const oppTimer = document.getElementById('opp-timer');
    
    if (myTimer) myTimer.textContent = this.formatTime(whiteTime);
    if (oppTimer) oppTimer.textContent = this.formatTime(blackTime);

    // Indicar turno
    document.querySelectorAll('.player-top, .player-bottom').forEach(el => {
      el.classList.remove('active-turn');
    });

    const activeSide = turn === 'w' ? '.player-bottom' : '.player-top';
    document.querySelector(activeSide)?.classList.add('active-turn');

    // Sync a móvil
    if (window.mobileSync) {
      window.mobileSync.syncGameState();
    }
  }

  static formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  static onGameStart() {
    // Notificar al controlador móvil
    if (window.mobileController && window.mobileController.isMobile) {
      window.mobileController.showGameInProgress();
    }

    // Iniciar sync periódico
    if (window.mobileSync) {
      window.mobileSync.startPeriodicSync();
    }
  }

  static onGameEnd() {
    // Notificar al controlador móvil
    if (window.mobileController && window.mobileController.isMobile) {
      window.mobileController.hideGameUI();
    }

    // Detener sync periódico
    if (window.mobileSync) {
      window.mobileSync.stopPeriodicSync();
    }
  }
}

// ========== INITIALIZATION ==========
let mobileSync;

document.addEventListener('DOMContentLoaded', () => {
  mobileSync = new MobileDataSync();
  console.log('📱 Mobile data sync initialized');
  
  // Exponer globalmente
  window.mobileSync = mobileSync;
  window.MobileIntegration = MobileIntegration;
});

// ========== GLOBAL HELPERS ==========

// Función helper para actualizar desde cualquier parte del código
window.updateMobileView = function(type, data) {
  if (!window.mobileSync) return;

  switch(type) {
    case 'evaluation':
      MobileIntegration.updateEvaluation(data.score, data.depth, data.accuracy);
      break;
    case 'moves':
      MobileIntegration.updateBestMoves(data);
      break;
    case 'maestro':
      MobileIntegration.updateMaestroInsight(data.type, data.content);
      break;
    case 'coach':
      MobileIntegration.addCoachComment(data.comment, data.type);
      break;
    case 'threats':
      MobileIntegration.showThreats(data);
      break;
    case 'gameState':
      MobileIntegration.updateGameState(data.whiteTime, data.blackTime, data.turn);
      break;
    default:
      window.mobileSync.syncAll();
  }
};

// Ejemplo de uso desde client.js:
// window.updateMobileView('evaluation', { score: '+0.5', depth: 18, accuracy: '95%' });
// window.updateMobileView('coach', { comment: '¡Excelente jugada!', type: 'good' });