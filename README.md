# TT-25257
Proyecto final del Curso de BackEnd con NodeJS - Talento Tech 2025

## PASO 1  
Clonar repositorio:
```bash
git clone https://github.com/mtk-gonza/TT-25257_final-project.git
```
Cambiar al directorio del repositorio:
```bash
cd TT-25257_final-project
```

## PASO 2  
Renombrar y colocar las variables de entorno:
```bash
cp .env.example .env
```

## PASO 3 
Instalar dependencias:
```bash
npm install
```

## PASO 4 
Ejecutar la aplicacion:
```bash
npm start
```
En modo desarrollador:
```bash
npm run dev
```

# ENDPOINTS
Para realizar distintas pruebas
## Home
Donde estan todos los links disponibles para las distintas funciones de la API
```
http://localhost:3000
```
## Docs
Para visualizar todos los endpoints
```
http://localhost:3000/docs
```
## Registrarse
Podra registrarse para luego poder realizar las operaciones CRUD de los endpoints
```
http://localhost:3000/register
```
## Login
Autorizarse para realizar operaciones CRUD
```
http://localhost:3000/login
```
## Dashboard
Panel para el usuario registrado para realizar las operaciones CRUD
```
http://localhost:3000/dashboard
```
## About
Una breve descripción del proyecto
```
http://localhost:3000/about
```