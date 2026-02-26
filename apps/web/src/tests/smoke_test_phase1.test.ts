import { test, expect } from '@playwright/test';

test.describe('Fase 1: Smoke Tests - ChessDrez', () => {

    test.beforeEach(async ({ page }: { page: any }) => {
        // Asumimos que la app corre en localhost:5173 (Vite default)
        await page.goto('http://localhost:5173/login');
    });

    test('debería mostrar el formulario de login', async ({ page }: { page: any }) => {
        await expect(page.locator('h2')).toContainText('Iniciar Sesión');
        await expect(page.locator('input[type="email"]')).toBeVisible();
        await expect(page.locator('input[type="password"]')).toBeVisible();
    });

    test('debería permitir navegar al registro', async ({ page }: { page: any }) => {
        await page.click('text=¿No tienes cuenta? Registrate');
        await expect(page).toHaveURL(/.*register/);
        await expect(page.locator('h2')).toContainText('Crear Cuenta');
    });

    test.describe('Pruebas con Autenticación', () => {
        // Estas pruebas requieren un usuario de prueba o mockear la API
        // Por ahora las dejamos como placeholders si no hay entorno de test configurado

        test('debería ver el dashboard tras login', async ({ page }: { page: any }) => {
            // Mock de login si fuera necesario
            // await page.fill('input[type="email"]', 'test@example.com');
            // await page.fill('input[type="password"]', 'password123');
            // await page.click('button[type="submit"]');
            // await expect(page).toHaveURL(/.*dashboard/);
        });

        test('debería poder iniciar una partida vs CPU', async ({ page }: { page: any }) => {
            // Este test asume que ya estamos en la home/dashboard
            // await page.goto('http://localhost:5173/');
            // await page.click('text=Jugar');
            // await expect(page).toHaveURL(/.*play/);
            // await expect(page.locator('.chessboard')).toBeVisible();
        });
    });
});
