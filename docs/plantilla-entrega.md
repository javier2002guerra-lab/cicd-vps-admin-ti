# Documento de entrega

## Nombre completo

TU NOMBRE COMPLETO

## Arquitectura utilizada

Se implemento una arquitectura simple de despliegue continuo basada en GitHub, GitHub Actions, GitHub Container Registry y una VPS Ubuntu. El repositorio contiene el codigo fuente de una aplicacion Node.js/TypeScript. GitHub Actions valida el proyecto, construye una imagen Docker, la publica en GHCR y luego se conecta por SSH a la VPS para actualizar el contenedor con Docker Compose.

## Flujo CI/CD implementado

El pipeline se ejecuta automaticamente cuando hay cambios en la rama `main`. Primero instala dependencias con `npm ci`, luego ejecuta pruebas con Vitest y compila el codigo TypeScript. Si la validacion es correcta, construye una imagen Docker, la publica en GitHub Container Registry y despliega la nueva version en la VPS. Al final ejecuta una prueba de humo contra `/health` para verificar que el servicio quedo funcionando.

## VPS y entorno de despliegue

Proveedor: Google Cloud Compute Engine.

Sistema operativo: Ubuntu en Google Cloud.

Servicios instalados:

- Docker Engine.
- Docker Compose v2.
- Usuario `deploy` para despliegues por SSH.
- Aplicacion expuesta en el puerto `80`.

URL/IP de la aplicacion:

```text
http://IP_DE_LA_VPS
http://34.30.111.245
```

## Enlace al video en Google Drive

PEGAR ENLACE AQUI

## Enlace al repositorio publico de GitHub

PEGAR ENLACE AQUI
