/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'bg-main': '#1e293b',    // Slate 800 - Fondo principal (modo oscuro)
                'bg-card': '#0f172a',    // Slate 900 - Fondo de tarjetas
                'bg-sidebar': '#0f172a', // Slate 900 - Fondo de barra lateral
                'text-main': '#f8fafc',  // Slate 50 - Texto principal
                'text-muted': '#94a3b8', // Slate 400 - Texto secundario
                'text-light': '#ffffff', // Blanco puro
                'primary': '#3b82f6',    // Blue 500 - Acentos principales
                'primary-hover': '#2563eb', // Blue 600 - Hover en acentos
                'secondary': '#334155',  // Slate 700 - Color secundario/botones
                'secondary-hover': '#475569', // Slate 600
                'border': '#334155',     // Slate 700 - Bordes
                'danger': '#ef4444',     // Red 500 - Errores/rendirse
                'success': '#10b981',    // Emerald 500 - Éxito/listo
            },
        },
    },
    plugins: [],
}
