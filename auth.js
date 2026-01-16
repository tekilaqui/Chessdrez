// AUTHENTICATION MODULE
// Isolated to ensure reliability regardless of other script errors

window.isAuth = false;
window.userName = "Invitado";
window.userElo = 500;
window.userPuzzleElo = 500;

// Socket Init
window.socket = null;
try {
    const socketUrl = (window.location.protocol === 'file:') ? 'http://localhost:3000' : window.location.origin;
    if (typeof io !== 'undefined') {
        window.socket = io(socketUrl, {
            auth: { token: localStorage.getItem('chess_token') },
            transports: ['websocket', 'polling']
        });
        console.log("🔌 Socket initialized in Auth Module");

        window.socket.on('connect_error', (err) => {
            console.error("❌ Socket Error:", err.message);
        });
    } else {
        console.warn("⚠️ Socket.io not loaded");
    }
} catch (e) { console.error("Socket Init Failed:", e); }

// Global Auth Functions
window.openAuth = function () {
    console.log("🔓 Opening Auth Modal");
    $('#auth-modal').css('display', 'flex');
    $('#side-drawer').removeClass('open');
    $('#side-drawer-overlay').fadeOut();
};

window.switchAuthMode = function (mode) {
    $('.auth-tab-btn').removeClass('active');

    if (mode === 'login') {
        $('.auth-tab-btn:first-child').addClass('active');
        $('#group-email, #group-phone').slideUp();
        $('#label-user').text("USUARIO O EMAIL");
        $('#auth-user').attr('placeholder', "Nombre o email");
        $('#btn-auth-submit').text("ENTRAR AHORA");
        $('#auth-title').text("¡Hola de nuevo!");
        $('#auth-subtitle').text("Inicia sesión para jugar");
        $('#remember-me-row').slideDown();
    } else {
        $('.auth-tab-btn:last-child').addClass('active');
        $('#group-email, #group-phone').slideDown();
        $('#label-user').text("USUARIO");
        $('#auth-user').attr('placeholder', "Crea un nombre de usuario");
        $('#btn-auth-submit').text("CREAR CUENTA");
        $('#auth-title').text("Únete a la élite");
        $('#auth-subtitle').text("Crea tu cuenta en segundos");
        $('#remember-me-row').slideUp();
    }
};

window.togglePasswordVisibility = function (id) {
    const input = document.getElementById(id);
    if (input.type === "password") {
        input.type = "text";
        $(input).next('.password-toggle').text("🙈");
    } else {
        input.type = "password";
        $(input).next('.password-toggle').text("👁️");
    }
};

window.handleProfileClick = function () {
    console.log("👤 Profile Clicked. Auth:", window.isAuth);
    if (!window.isAuth) {
        window.openAuth();
    }
};

window.handleGoogleLogin = function () {
    // Basic toast simulation if showToast not avail
    if (window.showToast) window.showToast("Conectando con Google...", "⌛", "info");
    else alert("Conectando con Google...");

    setTimeout(() => {
        if (window.showToast) window.showToast("Esta función requiere configuración de API", "⚠️", "warning");
        else alert("Esta función requiere configuración de API");
    }, 1500);
};

window.submitAuth = function () {
    console.log("👉 submitAuth invocado");
    const name = $('#auth-user').val().trim();
    const pass = $('#auth-pass').val().trim();
    const email = $('#auth-email').val().trim();
    const phone = $('#auth-phone').val().trim();

    // Check mode based on visibility of email field
    const isRegister = $('#group-email').is(':visible');

    if (!name || !pass) return alert("Por favor introduce usuario y contraseña.");
    if (isRegister && !email) return alert("Por favor introduce tu email.");

    if (isRegister) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) return alert("Email no válido.");

        if (window.socket && window.socket.connected !== false) {
            window.socket.emit('register', {
                user: name,
                pass: pass,
                email: email,
                phone: phone
            });
        } else {
            alert("Error: No hay conexión con el servidor. Revisa tu internet o recarga.");
        }
    } else {
        if (window.socket && window.socket.connected !== false) {
            window.socket.emit('login', { user: name, pass: pass });
        } else {
            alert("Error: No hay conexión con el servidor. Revisa tu internet o recarga.");
        }

        if ($('#auth-remember').is(':checked')) {
            localStorage.setItem('chess_remembered_user', name);
        } else {
            localStorage.removeItem('chess_remembered_user');
        }
    }
};

window.updateAuthUI = function () {
    // Check Remember Me persistence first
    const rememberedUser = localStorage.getItem('chess_remembered_user');
    if (rememberedUser && !localStorage.getItem('chess_is_auth')) {
        $('#auth-user').val(rememberedUser);
        $('#auth-remember').prop('checked', true);
    }

    if (localStorage.getItem('chess_is_auth') === 'true') {
        window.isAuth = true;
        window.userName = localStorage.getItem('chess_username');
        window.userElo = parseInt(localStorage.getItem('chess_user_elo')) || 500;
        window.userPuzzleElo = parseInt(localStorage.getItem('chess_puz_elo')) || 500;

        $('#btn-auth-trigger').text("👤 " + window.userName);
        $('#my-name-display').text(window.userName);
        $('#btn-auth-drawer').text("CERRAR SESIÓN").off('click').click(() => {
            localStorage.removeItem('chess_token');
            localStorage.removeItem('chess_is_auth');
            location.reload();
        });
        $('#drawer-user-name').text(window.userName);
        $('#drawer-user-elo, #header-elo').text(window.userElo + " ELO");
        $('#header-elo-puz, #puz-elo-display').text(window.userPuzzleElo + "🧩");
    }
};

// Initialize Auth Events Safe Mode
document.addEventListener('DOMContentLoaded', () => {
    console.log("🔗 Auth Module: DOM Content Loaded - Initializing Events");

    const submitBtn = document.getElementById('btn-auth-submit');
    if (submitBtn) {
        // Remove old listeners to be safe (clone node trick or just add new one)
        // We will just add a new robust one.
        submitBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("🖱️ CLICK DETECTED on Native Listener");
            window.submitAuth();
        });
        console.log("✅ Submit Button Listener Attached via Native JS");
    } else {
        console.error("❌ CRTICAL: Submit Button NOT FOUND in DOM");
    }

    // Attach User Profile Click Logic
    const profileCard = document.getElementById('drawer-user-card');
    if (profileCard) {
        profileCard.addEventListener('click', (e) => {
            console.log("👤 Profile Card Clicked");
            window.handleProfileClick();
        });
    }

    // Attach Header Auth Button
    const headerAuthBtn = document.getElementById('btn-auth-trigger');
    if (headerAuthBtn) {
        headerAuthBtn.addEventListener('click', () => {
            console.log("🔓 Header Button Clicked");
            window.openAuth();
        });
    }

    // Auth UI Init
    if (window.updateAuthUI) window.updateAuthUI();
});

// Auto-run on load to verify
console.log("✅ Auth Module Loaded (v2 - Event Listeners)");
