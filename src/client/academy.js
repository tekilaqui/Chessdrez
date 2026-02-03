/**
 * academy.js - Sistema educativo de Academia
 * Gestiona lecciones, progreso y logros de los usuarios
 */

import { ACADEMY_CONFIG } from './constants.js';
import { debugLog } from './utils.js';

/**
 * Estructura de lecciones (se puede expandir desde JSON externo)
 */
const ACADEMY_LESSONS = {
    0: [ // Fundamentos
        { id: 1, title: 'Las Piezas', description: 'Aprende cómo se mueve cada pieza' },
        { id: 2, title: 'Valores de Piezas', description: 'Peones=1, Caballos=3, Alfiles=3, Torres=5, Dama=9' },
        { id: 3, title: 'Notación Algebraica', description: 'Sistema de notación estándar' },
        { id: 4, title: 'Control del Centro', description: 'Por qué el centro es importante' },
        { id: 5, title: 'Desarrollo de Piezas', description: 'Orden correcto de desarrollo' }
    ],
    1: [ // Tácticas Básicas
        { id: 6, title: 'El Tenedor', description: 'Ataca dos piezas a la vez' },
        { id: 7, title: 'La Clavada', description: 'Inmoviliza una pieza detrás de otra' },
        { id: 8, title: 'La Enfilada', description: 'Ataca dos piezas en línea' },
        { id: 9, title: 'El Sacrificio', description: 'Entregar material por ventaja' },
        { id: 10, title: 'Trampas Comunes', description: 'Aprende a evitar errores típicos' },
        { id: 11, title: 'Combinaciones', description: 'Secuencias de tácticas' },
        { id: 12, title: 'Más Tácticas', description: 'Ejercicios prácticos' },
        { id: 13, title: 'Táctica Avanzada', description: 'Patrones complejos' }
    ],
    2: [ // Aperturas
        { id: 14, title: 'Principios de Aperturas', description: 'Qué hacer en el inicio' },
        { id: 15, title: 'Aperturas Abiertas', description: '1.e4 e5' },
        { id: 16, title: 'Aperturas Semiabiertas', description: '1.e4 respuestas diversas' },
        { id: 17, title: 'Aperturas Cerradas', description: '1.d4' },
        { id: 18, title: 'Gambitos', description: 'Sacrificios en la apertura' },
        { id: 19, title: 'Tu Repertorio', description: 'Prepara tus aperturas' },
        { id: 20, title: 'Errores en Aperturas', description: 'Trampas comunes' }
    ],
    3: [ // Finales
        { id: 21, title: 'Finales Básicos', description: 'Rey y peones' },
        { id: 22, title: 'Rey vs Pieza', description: 'Posiciones ganadoras' },
        { id: 23, title: 'Torre y Peón', description: 'Técnicas esenciales' },
        { id: 24, title: 'Dama y Peón', description: 'Posiciones críticas' },
        { id: 25, title: 'Finales de Alfiles', description: 'Pares de alfiles' },
        { id: 26, title: 'Finales Prácticos', description: 'Casos reales' },
        { id: 27, title: 'Tablas Teóricas', description: 'Posiciones de empate' }
    ],
    4: [ // Estrategia
        { id: 28, title: 'Plan Estratégico', description: 'Busca tu plan en la partida' },
        { id: 29, title: 'Estructura de Peones', description: 'Fortalezas y debilidades' },
        { id: 30, title: 'Piezas Fuertes y Débiles', description: 'Cazadores de peones' },
        { id: 31, title: 'Posiciones Cerradas', description: 'Juego lento y calculado' },
        { id: 32, title: 'Posiciones Abiertas', description: 'Juego táctico' },
        { id: 33, title: 'Ataque al Rey', description: 'Iniciativa ofensiva' },
        { id: 34, title: 'Defensa', description: 'Resistencia y contrajuego' },
        { id: 35, title: 'Finales Estratégicos', description: 'Planes en los finales' },
        { id: 36, title: 'Mitad de Juego', description: 'Transición de fase' },
        { id: 37, title: 'Estudio de Partidas', description: 'Aprende de los maestros' }
    ]
};

class AcademySystem {
    constructor() {
        this.currentLevel = parseInt(localStorage.getItem('chess_academy_level')) || 0;
        this.completedLessons = JSON.parse(localStorage.getItem('chess_academy_completed')) || [];
        this.lessonProgress = JSON.parse(localStorage.getItem('chess_academy_progress')) || {};
        this.achievements = JSON.parse(localStorage.getItem('chess_academy_achievements')) || [];
    }

    /**
     * Obtiene la lección actual
     * @returns {object} Lección actual
     */
    getCurrentLesson() {
        if (this.currentLevel >= Object.keys(ACADEMY_CONFIG).length) {
            return null;
        }

        const lessons = ACADEMY_LESSONS[this.currentLevel] || [];
        const completedInLevel = this.completedLessons.filter(id => 
            lessons.map(l => l.id).includes(id)
        ).length;

        if (completedInLevel >= lessons.length) {
            return null; // Nivel completado
        }

        // Retorna la primera lección no completada
        return lessons.find(l => !this.completedLessons.includes(l.id));
    }

    /**
     * Obtiene todas las lecciones de un nivel
     * @param {number} level - Nivel (0-4)
     * @returns {array} Lecciones del nivel
     */
    getLessonsForLevel(level) {
        return ACADEMY_LESSONS[level] || [];
    }

    /**
     * Obtiene información de una lección específica
     * @param {number} lessonId - ID de la lección
     * @returns {object|null} Información de la lección
     */
    getLessonInfo(lessonId) {
        for (const level in ACADEMY_LESSONS) {
            const lessons = ACADEMY_LESSONS[level];
            const lesson = lessons.find(l => l.id === lessonId);
            if (lesson) {
                return {
                    ...lesson,
                    level: parseInt(level),
                    levelName: ACADEMY_CONFIG[level].name,
                    completed: this.completedLessons.includes(lessonId)
                };
            }
        }
        return null;
    }

    /**
     * Completa una lección
     * @param {number} lessonId - ID de la lección
     * @returns {object} Resultado
     */
    completeLesson(lessonId) {
        if (this.completedLessons.includes(lessonId)) {
            return { success: false, message: 'Lección ya completada' };
        }

        this.completedLessons.push(lessonId);
        this.saveProgress();

        // Verificar si completó el nivel
        const currentLevelLessons = ACADEMY_LESSONS[this.currentLevel] || [];
        const completedInLevel = this.completedLessons.filter(id => 
            currentLevelLessons.map(l => l.id).includes(id)
        ).length;

        let levelCompleted = false;
        if (completedInLevel >= currentLevelLessons.length) {
            levelCompleted = true;
            this.currentLevel++;
            localStorage.setItem('chess_academy_level', this.currentLevel.toString());
            this.addAchievement(`level_${this.currentLevel - 1}_complete`);
        }

        debugLog('AcademySystem', `Lección ${lessonId} completada${levelCompleted ? ' - NIVEL SUBIDO' : ''}`);

        return {
            success: true,
            levelCompleted,
            nextLevel: this.currentLevel,
            message: levelCompleted 
                ? `¡Felicidades! Completaste ${ACADEMY_CONFIG[this.currentLevel - 1].name}` 
                : 'Lección completada'
        };
    }

    /**
     * Obtiene el progreso del usuario
     * @returns {object} Progreso general
     */
    getProgress() {
        const totalLessons = Object.values(ACADEMY_LESSONS)
            .reduce((sum, lessons) => sum + lessons.length, 0);
        const completed = this.completedLessons.length;

        return {
            currentLevel: this.currentLevel,
            levelName: ACADEMY_CONFIG[this.currentLevel]?.name || 'Completado',
            lessonsCompleted: completed,
            totalLessons: totalLessons,
            percentage: Math.round((completed / totalLessons) * 100),
            achievements: this.achievements.length
        };
    }

    /**
     * Obtiene el progreso por nivel
     * @returns {object} Progreso desglosado por nivel
     */
    getProgressByLevel() {
        const progress = {};

        for (const level in ACADEMY_CONFIG) {
            const levelNum = parseInt(level);
            const lessons = ACADEMY_LESSONS[levelNum] || [];
            const completed = this.completedLessons.filter(id => 
                lessons.map(l => l.id).includes(id)
            ).length;

            progress[levelNum] = {
                name: ACADEMY_CONFIG[levelNum].name,
                completed: completed,
                total: lessons.length,
                percentage: Math.round((completed / lessons.length) * 100) || 0
            };
        }

        return progress;
    }

    /**
     * Agrega un logro
     * @param {string} achievementId - ID del logro
     */
    addAchievement(achievementId) {
        if (!this.achievements.includes(achievementId)) {
            this.achievements.push(achievementId);
            this.saveProgress();
            debugLog('AcademySystem', `Logro desbloqueado: ${achievementId}`);
        }
    }

    /**
     * Obtiene todos los logros
     * @returns {array} Array de logros desbloqueados
     */
    getAchievements() {
        return this.achievements;
    }

    /**
     * Guarda el progreso en localStorage
     */
    saveProgress() {
        localStorage.setItem('chess_academy_completed', JSON.stringify(this.completedLessons));
        localStorage.setItem('chess_academy_achievements', JSON.stringify(this.achievements));
    }

    /**
     * Reinicia el progreso (usar con cuidado)
     */
    resetProgress() {
        this.currentLevel = 0;
        this.completedLessons = [];
        this.achievements = [];
        this.saveProgress();
        localStorage.removeItem('chess_academy_level');
        debugLog('AcademySystem', 'Progreso reiniciado');
    }

    /**
     * Obtiene datos para exportar
     * @returns {object} Datos de progreso
     */
    exportData() {
        return {
            level: this.currentLevel,
            completed: this.completedLessons,
            achievements: this.achievements,
            progress: this.getProgress()
        };
    }
}

// Singleton
export const academy = new AcademySystem();

export default AcademySystem;
