# Home Budget Manager

**Home Budget Manager** es una aplicación para registrar y rastrear precios de productos a lo largo del tiempo, incluyendo coordenadas y referencias. 

## Estado del Proyecto

[![Build Status](https://gitlab.com/pablosilvab/home-budget-manager/badges/main/pipeline.svg)](https://gitlab.com/pablosilvab/home-budget-manager/-/commits/main)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=pablosilvab_home-budget-manager&metric=coverage)](https://sonarcloud.io/summary/new_code?id=pablosilvab_home-budget-manager)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=pablosilvab_home-budget-manager&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=pablosilvab_home-budget-manager)

---

## 🚀 Características

- Registro de precios con historial.
- Soporte para coordenadas geográficas y referencias.
- API REST robusta utilizando **NestJS**.
- Cobertura de código con **SonarCloud**.

---

## 📦 Instalación

### Prerrequisitos
Asegúrate de tener instalados los siguientes elementos en tu sistema:
- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- [Git](https://git-scm.com/)

### Pasos para instalar

1. Clona el repositorio:
```bash
git clone https://github.com/pablosilvab/home-budget-manager.git
cd home-budget-manager
```

2. Instalar dependencias:
```bash
npm install
```

3. Configura las variables de entorno creando un archivo .env:
```
DATABASE_URL=<tu-base-de-datos>
```


## ⚙️ Scripts

### Desarrollo  

```bash
npm run start:dev
```
Ejecuta la aplicación en modo de desarrollo.

### Pruebas  

```bash
npm run test
```

### Coverage  

```bash
npm run test:cov
```
Genera un reporte de cobertura de código.

## 🌐 Despliegue

El despliegue de este proyecto se realiza automáticamente en Render al ejecutar un webhook. Para habilitarlo, asegúrate de configurar la URL del webhook en las variables de entorno:

```
RENDER_URL=https://api.render.com/deploy/<id>?key=<key>
```

El proceso CI/CD incluye:
- Ejecución de tests unitarios.
- Verificación del umbral de cobertura de código.
- Despliegue a producción si todo está correcto.

## 🛠 Tecnologías Utilizadas
- NestJS: Framework de backend.
- Jest: Para pruebas unitarias.
- SonarCloud: Análisis de calidad y cobertura de código.
- Render: Para despliegue en producción.