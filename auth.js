// ===== AUTH MODULE - VERSIÓN CORREGIDA =====
// Eliminamos conflictos de event listeners

window.isAuth = false;
window.userName = "Invitado";
window.userElo = 500;
window.userPuzzleElo = 500;

// Socket Init
window.socket = null;
try {
    const socketUrl = (window.location.protocol === 'file:')
        ? 'http://localhost:3000'
        : window.location.origin;

    if (typeof io !== 'undefined') {
        window.socket = io(socketUrl, {
            auth: { token: localStorage.getItem('chess_token') || '' },
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionDelay: 1000
        });

        console.log("🔌 Socket initialized");

        window.socket.on('connect', () => {
            console.log("✅ Socket conectado");
        });

        window.socket.on('connect_error', (err) => {
            console.error("❌ Socket Error:", err.message);
        });

        // ✅ LISTENERS DE RESPUESTA AUTH
        window.socket.on('register_success', (data) => {
            console.log("✅ Registro exitoso:", data);
            // alert(`¡Cuenta creada! Bienvenido ${data.username}`);

            // Auto-login
            localStorage.setItem('chess_is_auth', 'true');
            localStorage.setItem('chess_username', data.username);
            localStorage.setItem('chess_token', data.token);
            localStorage.setItem('chess_user_elo', data.elo || 500);

            window.updateAuthUI();
            $('#auth-modal').fadeOut();
        });

        window.socket.on('register_error', (data) => {
            console.error("❌ Error registro:", data.message);
            // alert("Error: " + data.message);
        });

        window.socket.on('login_success', (data) => {
            console.log("✅ Login exitoso:", data);

            localStorage.setItem('chess_is_auth', 'true');
            localStorage.setItem('chess_username', data.username);
            localStorage.setItem('chess_token', data.token);
            localStorage.setItem('chess_user_elo', data.elo || 500);
            localStorage.setItem('chess_puz_elo', data.puzzleElo || 500);

            window.updateAuthUI();
            $('#auth-modal').fadeOut();

            if (typeof showToast === 'function') {
                // showToast(`¡Bienvenido ${data.username}!`, "👋", "success");
            }
        });

        window.socket.on('login_error', (data) => {
            console.error("❌ Error login:", data.message);
            // alert("Error: " + data.message);
        });

    } else {
        console.warn("⚠️ Socket.io no cargado");
    }
} catch (e) {
    console.error("Socket Init Failed:", e);
}

// ===== FUNCIONES GLOBALES =====

window.openAuth = function () {
    console.log("🔐 Abriendo modal auth");
    // Usar Vanilla JS para mayor fiabilidad si jQuery falla
    const modal = document.getElementById('auth-modal');
    if (modal) {
        modal.style.display = 'flex';
        modal.style.opacity = '1';
        modal.style.visibility = 'visible';
        modal.style.pointerEvents = 'auto';

        const card = modal.querySelector('.modal-card');
        if (card) card.style.pointerEvents = 'auto';
    } else {
        console.error("❌ ERROR: No se encontró #auth-modal en el DOM");
    }

    // Reset form
    $('#auth-user').val('');
    $('#auth-pass').val('');
    $('#auth-email').val('');
    $('#auth-phone').val('');

    // Check remembered user
    const remembered = localStorage.getItem('chess_remembered_user');
    if (remembered) {
        $('#auth-user').val(remembered);
        $('#auth-remember').prop('checked', true);
    }
};

window.switchAuthMode = function (mode) {
    console.log("🔄 Cambiando a modo:", mode);

    $('.auth-tab-btn').removeClass('active');

    if (mode === 'login') {
        $('.auth-tab-btn:first-child').addClass('active');
        $('#group-email, #group-phone').slideUp(200);
        $('#label-user').text("USUARIO O EMAIL");
        $('#auth-user').attr('placeholder', "Nombre o email");
        $('#btn-auth-submit').text("ENTRAR AHORA");
        $('#auth-title').text("¡Hola de nuevo!");
        $('#auth-subtitle').text("Inicia sesión para jugar");
        $('#remember-me-row').slideDown(200);
    } else {
        $('.auth-tab-btn:last-child').addClass('active');
        $('#group-email, #group-phone').slideDown(200);
        $('#label-user').text("USUARIO");
        $('#auth-user').attr('placeholder', "Crea un nombre de usuario");
        $('#btn-auth-submit').text("CREAR CUENTA");
        $('#auth-title').text("Únete a la élite");
        $('#auth-subtitle').text("Crea tu cuenta en segundos");
        $('#remember-me-row').slideUp(200);
    }
};

window.togglePasswordVisibility = function (id) {
    const input = document.getElementById(id);
    const toggle = $(input).next('.password-toggle');

    if (input.type === "password") {
        input.type = "text";
        toggle.text("🙈");
    } else {
        input.type = "password";
        toggle.text("👁️");
    }
};

window.handleProfileClick = function () {
    console.log("👤 Profile clicked. Auth:", window.isAuth);
    if (!window.isAuth) {
        window.openAuth();
    } else {
        // Show profile menu or go to settings
        if (typeof showSubMenu === 'function') {
            showSubMenu('perfil');
        }
    }
};

window.handleGoogleLogin = function () {
    console.log("🔐 Google login requested");

    if (typeof showToast === 'function') {
        showToast("Conectando con Google...", "⌛", "info");
    }

    setTimeout(() => {
        if (typeof showToast === 'function') {
            // showToast("OAuth de Google requiere configuración del servidor", "⚠️", "warning");
        } else {
            // alert("Esta función requiere configuración OAuth");
        }
    }, 1500);
};

// ===== SUBMIT AUTH - FUNCIÓN PRINCIPAL =====
window.submitAuth = function () {
    console.log("🚀 SUBMIT AUTH INVOCADO");

    // Validación de campos
    const name = $('#auth-user').val().trim();
    const pass = $('#auth-pass').val().trim();
    const email = $('#auth-email').val().trim();
    const phone = $('#auth-phone').val().trim();

    // Detectar modo (register si email visible)
    const isRegister = $('#group-email').is(':visible');

    console.log("📋 Modo:", isRegister ? "REGISTRO" : "LOGIN");
    console.log("📋 Datos:", { name, pass: pass ? "***" : "", email });

    // Validación básica
    if (!name || name.length < 3) {
        // alert("Usuario debe tener al menos 3 caracteres");
        return;
    }

    if (!pass || pass.length < 4) {
        // alert("Contraseña debe tener al menos 4 caracteres");
        return;
    }

    if (isRegister) {
        // REGISTRO
        if (!email) {
            // alert("Por favor introduce tu email");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            // alert("Email no válido");
            return;
        }

        // Verificar conexión socket
        if (!window.socket || !window.socket.connected) {
            // alert("⚠️ No hay conexión con el servidor. Verifica tu internet.");
            console.error("Socket no conectado:", window.socket);
            return;
        }

        console.log("📤 Enviando registro...");
        window.socket.emit('register', {
            user: name,
            pass: pass,
            email: email,
            phone: phone
        });

    } else {
        // LOGIN
        if (!window.socket || !window.socket.connected) {
            // alert("⚠️ No hay conexión con el servidor. Verifica tu internet.");
            console.error("Socket no conectado:", window.socket);
            return;
        }

        console.log("📤 Enviando login...");
        window.socket.emit('login', {
            user: name,
            pass: pass
        });

        // Remember me
        if ($('#auth-remember').is(':checked')) {
            localStorage.setItem('chess_remembered_user', name);
        } else {
            localStorage.removeItem('chess_remembered_user');
        }
    }
};

// ===== UPDATE AUTH UI =====
window.updateAuthUI = function () {
    console.log("🔄 Actualizando UI de Auth");

    // Check persistence
    const rememberedUser = localStorage.getItem('chess_remembered_user');
    if (rememberedUser && !localStorage.getItem('chess_is_auth')) {
        $('#auth-user').val(rememberedUser);
        $('#auth-remember').prop('checked', true);
    }

    // Check if logged in
    if (localStorage.getItem('chess_is_auth') === 'true') {
        window.isAuth = true;
        window.userName = localStorage.getItem('chess_username') || 'Usuario';
        window.userElo = parseInt(localStorage.getItem('chess_user_elo')) || 500;
        window.userPuzzleElo = parseInt(localStorage.getItem('chess_puz_elo')) || 500;

        console.log("✅ Usuario autenticado:", window.userName);

        // Update all UI elements
        $('#btn-auth-trigger').html(`👤 ${window.userName}`);
        $('#my-name-display').text(window.userName);
        $('#drawer-user-name').text(window.userName);
        $('#profile-name-display').text(window.userName);

        $('#drawer-user-elo').text(window.userElo + " ELO");
        $('#header-elo').text(window.userElo);
        $('#profile-elo-display').text(window.userElo);

        $('#puz-elo-display').text(window.userPuzzleElo + "🧩");
        $('#drawer-puz-elo-display').text(window.userPuzzleElo + "🧩");
        $('#dash-puz-value').text(window.userPuzzleElo + "🧩");

        // Update dashboard profile card
        $('#btn-profile-dash').removeClass('auth').addClass('settings');
        $('#dash-profile-label').text(window.userName);
        $('#dash-profile-status').text("Conectado").css('color', 'var(--primary)');

        $('#btn-login-perfil').hide();
        $('#btn-logout-perfil').show();

        // Update drawer auth button
        $('#btn-auth-drawer').text("CERRAR SESIÓN").off('click').on('click', () => {
            if (confirm("¿Seguro que quieres cerrar sesión?")) {
                window.logout();
            }
        });
    } else {
        console.log("👤 Usuario no autenticado");

        // Update dashboard profile card to "Guest" state
        $('#dash-profile-label').text("Perfil");
        $('#dash-profile-status').text("Invitado").css('color', 'inherit');

        // Show login buttons inside profile menu
        $('#btn-login-perfil').show();
        $('#btn-logout-perfil').hide();
    }
};

// ===== LOGOUT =====
window.logout = function () {
    console.log("🚪 Cerrando sesión");

    localStorage.removeItem('chess_token');
    localStorage.removeItem('chess_is_auth');
    localStorage.removeItem('chess_username');
    localStorage.removeItem('chess_user_elo');
    localStorage.removeItem('chess_puz_elo');

    window.isAuth = false;
    window.userName = "Invitado";
    window.userElo = 500;

    if (typeof showToast === 'function') {
        // showToast("Sesión cerrada", "👋", "info");
    }

    setTimeout(() => {
        location.reload();
    }, 500);
};

// ===== INICIALIZACIÓN DOM =====
document.addEventListener('DOMContentLoaded', () => {
    // ✅ DELEGACIÓN DE EVENTOS PARA EL MODAL
    $(document).on('click', '#btn-auth-submit', function (e) {
        e.preventDefault();
        e.stopPropagation();
        window.submitAuth();
    });

    $(document).on('click', '.auth-tab-btn', function (e) {
        e.preventDefault();
        const isLogin = $(this).text().includes('ENTRAR');
        window.switchAuthMode(isLogin ? 'login' : 'register');
    });

    // ✅ ATTACH PROFILE CLICK
    const profileCard = document.getElementById('drawer-user-card');
    if (profileCard) {
        profileCard.addEventListener('click', () => {
            window.handleProfileClick();
        });
    }

    // ✅ ATTACH HEADER AUTH BUTTON
    const headerAuthBtn = document.getElementById('btn-auth-trigger');
    if (headerAuthBtn) {
        headerAuthBtn.onclick = (e) => {
            e.preventDefault();
            window.openAuth();
        };
    }

    // ✅ ATTACH DASHBOARD PROFILE CARD
    const dashProfileCard = document.getElementById('btn-profile-dash');
    if (dashProfileCard) {
        dashProfileCard.onclick = (e) => {
            if (typeof window.showSubMenu === 'function') {
                window.showSubMenu('perfil');
            }
        };
    }

    // ✅ ATTACH PROFILE AUTH BUTTON
    const profileLoginBtn = document.getElementById('btn-login-perfil');
    if (profileLoginBtn) {
        profileLoginBtn.onclick = (e) => {
            e.preventDefault();
            window.openAuth();
        };
    }

    // ✅ ATTACH MODAL CLOSE BUTTON
    $('.btn-ghost').on('click', function () {
        $('#auth-modal').fadeOut();
    });

    // ✅ EVITAR PROPAGACIÓN
    $(document).on('click', '#auth-modal .modal-card', function (e) {
        e.stopPropagation();
    });

    // ✅ ENTER KEY SUBMIT
    $('#auth-pass').on('keypress', function (e) {
        if (e.which === 13) {
            e.preventDefault();
            window.submitAuth();
        }
    });

    // ✅ Initialize UI
    setTimeout(() => {
        if (window.updateAuthUI) {
            window.updateAuthUI();
        }
    }, 100);
});

console.log("✅ Auth Module Ready");
