/**
 * ============================================
 * MOBILE INTERACTIONS & GESTURES - Chess Drez
 * ============================================
 */

class MobileController {
  constructor() {
    this.isMenuOpen = false;
    this.isInfoPanelOpen = false;
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.currentView = 'home';
    
    this.init();
  }

  init() {
    this.setupHamburgerMenu();
    this.setupBottomNavigation();
    this.setupInfoPanel();
    this.setupSwipeGestures();
    this.setupTouchOptimizations();
    this.setupViewportFix();
    this.setupOrientationHandler();
  }

  // ========== HAMBURGER MENU ==========
  setupHamburgerMenu() {
    const hamburger = document.getElementById('hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    
    // Crear overlay si no existe
    if (!document.querySelector('.sidebar-overlay')) {
      const overlay = document.createElement('div');
      overlay.className = 'sidebar-overlay';
      document.body.appendChild(overlay);
      
      overlay.addEventListener('click', () => this.closeMenu());
    }

    // Toggle menu
    hamburger?.addEventListener('click', (e) => {
      e.stopPropagation();
      this.toggleMenu();
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isMenuOpen) {
        this.closeMenu();
      }
    });

    // Swipe para cerrar
    sidebar?.addEventListener('touchstart', (e) => {
      this.touchStartX = e.touches[0].clientX;
    });

    sidebar?.addEventListener('touchmove', (e) => {
      const touchX = e.touches[0].clientX;
      const diff = this.touchStartX - touchX;
      
      if (diff > 50 && this.isMenuOpen) {
        this.closeMenu();
      }
    });
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    sidebar?.classList.toggle('open', this.isMenuOpen);
    overlay?.classList.toggle('active', this.isMenuOpen);
    
    // Prevenir scroll del body
    document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
  }

  closeMenu() {
    this.isMenuOpen = false;
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    
    sidebar?.classList.remove('open');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // ========== BOTTOM NAVIGATION ==========
  setupBottomNavigation() {
    // Crear bottom nav si no existe
    if (!document.querySelector('.mobile-bottom-nav')) {
      const nav = document.createElement('div');
      nav.className = 'mobile-bottom-nav';
      nav.innerHTML = `
        <div class="mobile-nav-item active" data-view="home">
          <div class="mobile-nav-icon">🏠</div>
          <span>Inicio</span>
        </div>
        <div class="mobile-nav-item" data-view="play">
          <div class="mobile-nav-icon">⚔️</div>
          <span>Jugar</span>
        </div>
        <div class="mobile-nav-item" data-view="puzzles">
          <div class="mobile-nav-icon">🧩</div>
          <span>Tácticas</span>
        </div>
        <div class="mobile-nav-item" data-view="more">
          <div class="mobile-nav-icon">⋯</div>
          <span>Más</span>
        </div>
      `;
      
      document.body.appendChild(nav);
      
      // Event listeners
      nav.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.addEventListener('click', () => {
          const view = item.dataset.view;
          this.navigateToView(view);
        });
      });
    }

    // Crear FAB de análisis
    if (!document.querySelector('.mobile-fab-analysis')) {
      const fab = document.createElement('div');
      fab.className = 'mobile-fab-analysis';
      fab.innerHTML = '📊';
      fab.style.display = 'none'; // Mostrar solo en partida
      
      fab.addEventListener('click', () => this.toggleInfoPanel());
      document.body.appendChild(fab);
    }
  }

  navigateToView(view) {
    this.currentView = view;
    
    // Actualizar bottom nav
    document.querySelectorAll('.mobile-nav-item').forEach(item => {
      item.classList.toggle('active', item.dataset.view === view);
    });

    // Navegar según la vista
    switch(view) {
      case 'home':
        if (typeof goBackToMenu === 'function') goBackToMenu();
        break;
      case 'play':
        if (typeof showSubMenu === 'function') showSubMenu('jugar');
        break;
      case 'puzzles':
        if (typeof showSubMenu === 'function') showSubMenu('puzzles');
        break;
      case 'more':
        this.showMoreMenu();
        break;
    }

    this.closeMenu();
  }

  showMoreMenu() {
    // Mostrar menú con más opciones
    const moreOptions = [
      { icon: '🎓', text: 'Academia', action: () => showSubMenu('academy') },
      { icon: '📖', text: 'Aperturas', action: () => showSubMenu('aperturas') },
      { icon: '📊', text: 'Análisis', action: () => showSubMenu('analisis') },
      { icon: '📈', text: 'Historial', action: () => showSubMenu('historial') },
      { icon: '⚙️', text: 'Ajustes', action: () => this.showSettings() }
    ];

    // Crear modal temporal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.style.display = 'flex';
    modal.innerHTML = `
      <div class="modal-card" style="max-width: 100%; width: 100%;">
        <h3 style="margin-bottom: 20px; text-align: center;">Más Opciones</h3>
        <div class="grid-menu" style="grid-template-columns: 1fr;">
          ${moreOptions.map(opt => `
            <div class="card-option" data-action="${opt.text}">
              <span class="opt-icon">${opt.icon}</span>
              <h4>${opt.text}</h4>
            </div>
          `).join('')}
        </div>
        <button class="btn-secondary" style="width: 100%; margin-top: 16px;">Cancelar</button>
      </div>
    `;

    document.body.appendChild(modal);

    // Event listeners
    modal.querySelectorAll('.card-option').forEach((card, idx) => {
      card.addEventListener('click', () => {
        moreOptions[idx].action();
        modal.remove();
      });
    });

    modal.querySelector('.btn-secondary').addEventListener('click', () => {
      modal.remove();
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.remove();
    });
  }

  // ========== INFO PANEL MÓVIL ==========
  setupInfoPanel() {
    const modal = document.getElementById('mobile-info-modal');
    if (!modal) return;

    // Crear tabs si no existen
    if (!modal.querySelector('.mobile-info-tabs')) {
      const tabs = document.createElement('div');
      tabs.className = 'mobile-info-tabs';
      tabs.innerHTML = `
        <div class="mobile-info-tab active" data-tab="analysis">Análisis</div>
        <div class="mobile-info-tab" data-tab="moves">Mejores Jugadas</div>
        <div class="mobile-info-tab" data-tab="maestro">Maestro</div>
        <div class="mobile-info-tab" data-tab="comments">Comentarios</div>
      `;
      
      modal.querySelector('.mobile-info-content').before(tabs);

      // Tab switching
      tabs.querySelectorAll('.mobile-info-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          tabs.querySelectorAll('.mobile-info-tab').forEach(t => 
            t.classList.remove('active')
          );
          tab.classList.add('active');
          this.switchInfoTab(tab.dataset.tab);
        });
      });
    }

    // Swipe down para cerrar
    let startY = 0;
    const content = modal.querySelector('.mobile-info-content');

    modal.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
    });

    modal.addEventListener('touchmove', (e) => {
      const currentY = e.touches[0].clientY;
      const diff = currentY - startY;

      if (diff > 100 && content.scrollTop === 0) {
        this.closeInfoPanel();
      }
    });
  }

  toggleInfoPanel() {
    this.isInfoPanelOpen = !this.isInfoPanelOpen;
    const modal = document.getElementById('mobile-info-modal');
    
    modal?.classList.toggle('open', this.isInfoPanelOpen);
    document.body.style.overflow = this.isInfoPanelOpen ? 'hidden' : '';
  }

  closeInfoPanel() {
    this.isInfoPanelOpen = false;
    const modal = document.getElementById('mobile-info-modal');
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  }

  switchInfoTab(tab) {
    const content = document.getElementById('mobile-info-modal')?.querySelector('.mobile-info-content');
    if (!content) return;

    // Ocultar todas las secciones
    content.querySelectorAll('.panel-section').forEach(section => {
      section.style.display = 'none';
    });

    // Mostrar la sección correcta
    switch(tab) {
      case 'analysis':
        content.querySelector('#mobile-analysis-content')?.parentElement.style.display = 'block';
        break;
      case 'moves':
        content.querySelector('#mobile-moves-content')?.parentElement.style.display = 'block';
        break;
      case 'maestro':
        content.querySelector('#mobile-maestro-content')?.parentElement.style.display = 'block';
        break;
      case 'comments':
        content.querySelector('#mobile-logs-content')?.parentElement.style.display = 'block';
        break;
    }
  }

  // ========== SWIPE GESTURES ==========
  setupSwipeGestures() {
    let startX = 0;
    let startY = 0;
    let isSwiping = false;

    document.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isSwiping = true;
    });

    document.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;
      const diffX = currentX - startX;
      const diffY = currentY - startY;

      // Swipe desde el borde izquierdo para abrir menú
      if (startX < 20 && diffX > 50 && Math.abs(diffY) < 50 && !this.isMenuOpen) {
        this.toggleMenu();
        isSwiping = false;
      }
    });

    document.addEventListener('touchend', () => {
      isSwiping = false;
    });
  }

  // ========== TOUCH OPTIMIZATIONS ==========
  setupTouchOptimizations() {
    // Prevenir doble tap zoom en botones
    document.addEventListener('touchend', (e) => {
      if (e.target.closest('button, .btn, .card-option, .nav-item')) {
        e.preventDefault();
      }
    }, { passive: false });

    // Drag & drop optimizado para piezas de ajedrez
    this.setupChessPieceDrag();

    // Pull to refresh deshabilitado
    let lastY = 0;
    document.addEventListener('touchstart', (e) => {
      lastY = e.touches[0].clientY;
    });

    document.addEventListener('touchmove', (e) => {
      const currentY = e.touches[0].clientY;
      if (currentY > lastY && window.scrollY === 0) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  setupChessPieceDrag() {
    // Mejorar el drag and drop del tablero
    const board = document.getElementById('myBoard');
    if (!board) return;

    let draggedPiece = null;
    let touchIdentifier = null;

    board.addEventListener('touchstart', (e) => {
      const square = e.target.closest('.square-55d63');
      if (!square) return;

      const piece = square.querySelector('.piece-417db');
      if (!piece) return;

      draggedPiece = piece;
      touchIdentifier = e.touches[0].identifier;

      // Visual feedback
      piece.style.opacity = '0.7';
      piece.style.transform = 'scale(1.1)';
    });

    board.addEventListener('touchmove', (e) => {
      if (!draggedPiece) return;

      e.preventDefault(); // Prevenir scroll

      const touch = Array.from(e.touches).find(t => t.identifier === touchIdentifier);
      if (!touch) return;

      // Mover pieza visualmente (opcional)
      // Podrías crear un elemento fantasma que siga el dedo
    });

    board.addEventListener('touchend', (e) => {
      if (!draggedPiece) return;

      const touch = Array.from(e.changedTouches).find(t => t.identifier === touchIdentifier);
      if (!touch) return;

      // Resetear visual
      draggedPiece.style.opacity = '';
      draggedPiece.style.transform = '';

      // Determinar casilla destino
      const targetSquare = document.elementFromPoint(touch.clientX, touch.clientY)?.closest('.square-55d63');
      
      if (targetSquare) {
        // Disparar evento de movimiento
        const sourceSquare = draggedPiece.closest('.square-55d63').dataset.square;
        const destSquare = targetSquare.dataset.square;
        
        // Llamar a la función de movimiento del juego
        if (typeof window.onPieceMove === 'function') {
          window.onPieceMove(sourceSquare, destSquare);
        }
      }

      draggedPiece = null;
      touchIdentifier = null;
    });
  }

  // ========== VIEWPORT FIX ==========
  setupViewportFix() {
    // Fix para el problema de viewport en móviles (barra de direcciones)
    const setViewportHeight = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setViewportHeight();
    window.addEventListener('resize', setViewportHeight);
    window.addEventListener('orientationchange', setViewportHeight);
  }

  // ========== ORIENTATION HANDLER ==========
  setupOrientationHandler() {
    const handleOrientation = () => {
      const isLandscape = window.innerWidth > window.innerHeight;
      document.body.classList.toggle('landscape', isLandscape);

      // Ajustar tablero en landscape
      if (isLandscape && this.currentView === 'game') {
        this.optimizeBoardForLandscape();
      }
    };

    handleOrientation();
    window.addEventListener('orientationchange', () => {
      setTimeout(handleOrientation, 100);
    });
  }

  optimizeBoardForLandscape() {
    const boardContainer = document.querySelector('.board-container');
    if (!boardContainer) return;

    // En landscape, hacer el tablero más pequeño para que quepa todo
    boardContainer.style.width = 'min(70vh, 400px)';
  }

  // ========== UTILITIES ==========
  showSettings() {
    // Abrir modal de configuración
    console.log('Abrir configuración móvil');
  }

  showGameInProgress() {
    // Mostrar FAB y ocultar bottom nav durante partida
    const fab = document.querySelector('.mobile-fab-analysis');
    const bottomNav = document.querySelector('.mobile-bottom-nav');
    
    if (fab) fab.style.display = 'flex';
    if (bottomNav) bottomNav.style.display = 'none';
  }

  hideGameUI() {
    // Ocultar FAB y mostrar bottom nav
    const fab = document.querySelector('.mobile-fab-analysis');
    const bottomNav = document.querySelector('.mobile-bottom-nav');
    
    if (fab) fab.style.display = 'none';
    if (bottomNav) bottomNav.style.display = 'flex';
  }

  vibrate(pattern = 50) {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  }

  toast(message, type = 'info') {
    // Mostrar toast notification
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }
}

// ========== PERFORMANCE OPTIMIZATIONS ==========
class MobilePerformance {
  constructor() {
    this.init();
  }

  init() {
    this.lazyLoadImages();
    this.debounceResizeEvents();
    this.optimizeAnimations();
  }

  lazyLoadImages() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img.lazy').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  debounceResizeEvents() {
    let resizeTimer;
    window.addEventListener('resize', () => {
      document.body.classList.add('resize-animation-stopper');
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        document.body.classList.remove('resize-animation-stopper');
      }, 400);
    });
  }

  optimizeAnimations() {
    // Reducir animaciones si el usuario lo prefiere
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    }
  }
}

// ========== INITIALIZATION ==========
let mobileController;
let mobilePerformance;

// Inicializar solo en móvil
if (window.innerWidth <= 768) {
  document.addEventListener('DOMContentLoaded', () => {
    mobileController = new MobileController();
    mobilePerformance = new MobilePerformance();
    
    console.log('📱 Mobile optimizations loaded');
  });
}

// Exportar para uso global
window.MobileController = MobileController;
window.mobileController = mobileController;