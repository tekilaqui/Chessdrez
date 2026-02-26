# Guía de Despliegue y GitHub (ARQ 3)

Has completado los cambios técnicos de ARQ 3. Aquí tienes los pasos a seguir para GitHub y Render:

## 1. GitHub
He actualizado el archivo `.github/workflows/pipeline.yml` para incluir:
- **Lint & Typecheck**: Para asegurar la calidad del código.
- **Tests Unitarios e Integración**: Para validar la lógica de negocio y la base de datos.
- **Build**: Para asegurar que todo compila correctamente.

**Acción requerida**: Haz un `git push` de estos cambios a tu repositorio. El pipeline se ejecutará automáticamente.

## 2. Render (Despliegue)
Para que la aplicación funcione correctamente en Render, asegúrate de configurar las siguientes variables de entorno:

| Variable | Descripción |
| --- | --- |
| `DATABASE_URL` | La URL de tu base de datos (puedes usar Turso para escalar, como pide ARQ 3). |
| `REDIS_URL` | La URL de tu instancia de Redis (necesaria para BullMQ/Workers). |
| `JWT_SECRET` | Una clave secreta para la autenticación JTW. |

**Nota sobre Redis**: Render ofrece un servicio de Redis administrado que puedes conectar fácilmente.

## 3. Próximos Pasos
Una vez que el pipeline pase y hayas configurado Render, el siguiente paso será crear el archivo de signoff final:
`/docs/signoffs/ARQ_3_DONE.md`
