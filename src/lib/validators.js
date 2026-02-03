/**
 * Validación centralizada de inputs
 * Evita duplicación y asegura consistencia
 */

const VALIDATORS = {
  username: (value) => {
    if (!value || typeof value !== 'string') return false;
    if (value.length < 3 || value.length > 20) return false;
    return /^[a-zA-Z0-9_-]+$/.test(value);
  },

  password: (value) => {
    if (!value || typeof value !== 'string') return false;
    if (value.length < 6 || value.length > 100) return false;
    // Requiere: números + letras para mejor seguridad
    return /[a-zA-Z]/.test(value) && /\d/.test(value);
  },

  email: (value) => {
    if (!value || typeof value !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) && value.length <= 100;
  },

  phone: (value) => {
    if (!value) return true; // Opcional
    if (typeof value !== 'string') return false;
    return /^\+?[\d\s-]{7,20}$/.test(value);
  },

  elo: (value) => {
    const num = parseInt(value);
    return !isNaN(num) && num >= 0 && num <= 3000;
  },

  move: (value) => {
    if (typeof value !== 'string') return false;
    // Validar movimiento en notación estándar (a2a4, e4, etc)
    return /^[a-h][1-8][a-h][1-8][qrbn]?$/.test(value) || /^[KQRBN]?[a-h]?x?[a-h][1-8][+#=]?$/.test(value);
  }
};

const SECURITY_CONFIG = {
  // Rate limiting por socket
  socketRateLimit: {
    maxEventsPerSecond: 10,
    maxEventsPerMinute: 100
  },
  // Tamaños máximos
  maxPayloadSize: '10kb',
  // Timeout de sesión
  sessionTimeout: 7 * 24 * 60 * 60 * 1000, // 7 días
  // Password requirements
  passwordMinLength: 6,
  passwordRequireNumbers: true,
  passwordRequireLetters: true
};

module.exports = { VALIDATORS, SECURITY_CONFIG };
