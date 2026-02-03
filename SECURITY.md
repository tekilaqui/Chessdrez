# 🔐 Guía de Seguridad - Chess Tricks

## Variables de Entorno Críticas

Todas estas variables **DEBEN estar definidas en producción**:

```bash
# REQUERIDO - JWT Secret (mínimo 32 caracteres aleatorios)
JWT_SECRET="debe-cambiar-en-produccion-String-Largo-Y-Aleatorio-Min32"

# REQUERIDO - Database URL
DATABASE_URL="postgresql://user:pass@hostname:5432/dbname"

# RECOMENDADO
NODE_ENV="production"
PORT=3000
```

⚠️ **NUNCA** pushear `.env` a git. Usar `.env.example` como template.

## Seguridad Implementada ✅

### 1. Helmet CSP (Content Security Policy)
- Previene ataques XSS
- Controla fuentes permitidas para scripts, estilos, imágenes
- Activado en línea 33-50 de `server.js`

### 2. Protección de Archivos Sensibles
- `.env` y `.git` **NO** expuestos públicamente
- `dotfiles: 'deny'` en línea 53 de `server.js`

### 3. Autenticación JWT
- Expiración automática: 7 días
- Secret requerido (no fallback a default)
- Validación en cada conexión Socket.io

### 4. Rate Limiting
- 100 peticiones/15min por IP en endpoints generales
- 10 intentos/hora por IP en login/registro
- Rate limiting por socket: 10 eventos/seg máximo

### 5. Validación de Inputs
- Módulo centralizado en `src/lib/validators.js`
- Username: 3-20 caracteres, alfanuméricos + guiones
- Password: 6-100 caracteres, requiere letras y números
- Email: validación regex + máximo 100 caracteres

### 6. Sanitización
- Prevención de inyección HTML en `sanitize()`
- Escapado de caracteres especiales

## Checklist de Deployment

Antes de hacer deploy a producción:

- [ ] JWT_SECRET definido (> 32 caracteres, aleatorio)
- [ ] DATABASE_URL correcta y con credenciales seguras
- [ ] NODE_ENV = "production"
- [ ] HTTPS habilitado (certificado SSL/TLS)
- [ ] Helmet CSP activo (no comentado)
- [ ] Rate limiting activo
- [ ] Logs no exponen información sensible
- [ ] `.env` y `.git` nunca en static files
- [ ] Backup de base de datos configurado
- [ ] Monitoreo y alertas activos

## Mejoras Futuras (Roadmap)

- [ ] 2FA (autenticación de dos factores)
- [ ] Email verification
- [ ] Password reset mechanism
- [ ] Account lockout después de intentos fallidos
- [ ] Refresh tokens rotables
- [ ] Audit logging de acciones críticas
- [ ] CORS más restrictivo en producción
- [ ] Rate limiting por usuario (no solo por IP)

## Reportar Vulnerabilidades

Si encuentras una vulnerabilidad, **NO** la hagas pública. Contacta a [security@chesstricks.dev]

## Referencias

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Express Security Best Practices](https://expressjs.com/en/advanced/best-practice-security.html)
- [Helmet.js Documentation](https://helmetjs.github.io/)
