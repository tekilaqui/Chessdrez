/**
 * analysisLoader.js
 * Carga el nuevo sistema de análisis v2.0
 * Se importa como módulo en el index.html
 */

(async () => {
    try {
        console.log('🔄 Cargando nuevo sistema de análisis...');

        // Importar módulos
        const { analysisSystem, boardEditor, advancedAnalysis } = await import('./src/client/analysis.js');
        const { analysisMaster } = await import('./src/client/analysisMaster.js');
        const { analysisUI } = await import('./src/client/analysisUI.js');

        // Exponer globalmente
        window.analysisSystem = analysisSystem;
        window.boardEditor = boardEditor;
        window.advancedAnalysis = advancedAnalysis;
        window.analysisMaster = analysisMaster;
        window.analysisUI = analysisUI;

        console.log('✅ Sistema de análisis cargado exitosamente');
        console.log('Disponible en: window.analysisSystem, window.boardEditor, etc.');

        // Inicializar UI si existe el contenedor
        if (document.getElementById('analysisContainer')) {
            console.log('📊 Inicializando interfaz de análisis...');
            await analysisUI.initialize();
            console.log('✅ Interfaz lista');
        }

    } catch (error) {
        console.error('❌ Error cargando análisis:', error);
    }
})();
