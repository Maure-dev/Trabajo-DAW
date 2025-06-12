### Trabajo Integrador - Desarrollo de Aplicaciones Web

# Índice

1. [Integrantes del Proyecto](#integrantes-del-proyecto)
2. [Descripción del Proyecto](#descripción-del-proyecto)
3. [Objetivo](#objetivo)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Dependencias (back)](#dependencias-back)
6. [Dependencias (Front)](#dependencias-front)
7. [Instalación y Configuración](#instalación-y-configuración)
8. [Uso del Proyecto](#uso-del-proyecto)
9. [Licencia](#licencia)

## Integrantes del Proyecto

- **Gerardi, Mauro Alejandro**

- **Gerol, Javier Ignacio**

- **Retamar, Brian Leonel**


## Descripción del Proyecto

La consultora en la que usted realiza su pasantía ha decidido participar en una licitación abierta para desarrollar un sistema de encuestas anónimas para facultades nacionales.

Tras la apertura de sobres, la consultora resultó adjudicada gracias a su equilibrio entre precio y calidad del servicio. Como parte del equipo de desarrollo, usted y su grupo han sido seleccionados para llevar adelante este proyecto, el cual servirá como evaluación clave para determinar su contratación en la empresa.

## Objetivo

Se espera que el equipo diseñe e implemente un sistema funcional que cumpla con estos requerimientos, aplicando buenas prácticas de desarrollo de software y asegurando una experiencia fluida para los usuarios. 

Para el desarrollo se deben utilizar las siguientes tecnologías: NestJS, TypeORM, PostgreSQL, nginx, PM2, y Angular. 

## Estructura del Proyecto

La estructura del proyecto es la siguiente:

#### 1. **/deploy**

Contiene archivos de configuración como la conexión a la base de datos, variables de entorno, o cualquier configuración del servidor.

#### 2. **/back**

Contiene el código fuente del backend desarrollado en NestJS, incluyendo módulos de la aplicación, configuración de la base de datos y variables de entorno

#### 3. **/front**

Contiene el código fuente del frontend desarrollado en Angular, incluyendo componentes, servicios, rutas y configuraciones específicas de Angular y Nginx.

#### 4. **README.md**

Instrucciones y documentación básica sobre cómo ejecutar el proyecto.

#### 5. **.gitignore**

Archivo que define qué archivos o carpetas deben ser ignorados por Git (como node_modules o archivos de configuración locales).

## Dependencias (Back)

Este proyecto usa las siguientes librerías:

### Librerías para el usuario final
- `@nestjs/common`, `@nestjs/core`, `@nestjs/platform-express`: Núcleo del framework NestJS.
- `@nestjs/config`: Gestión de variables de entorno.
- `@nestjs/typeorm` y `typeorm`: ORM para acceso a base de datos.
- `pg`: Driver de PostgreSQL.
- `class-validator` y `class-transformer`: Validación y transformación de DTOs.
- `nodemailer` + `nodemailer-express-handlebars`: Envío de correos con plantillas.


### Librerías de desarrollo
- `@nestjs/cli` y `@nestjs/schematics`: CLI y generadores para NestJS.
- `typescript`, `ts-node`, `tsconfig-paths`: Entorno TypeScript.
- `eslint`, `prettier`, `eslint-plugin-prettier`: Linter y formateo automático.
- `@swc/core`: Compilador alternativo para TypeScript.

## Dependencias (Front)

Este proyecto usa las siguientes librerías:

### Librerías para el usuario final
- `@angular/core`, `@angular/forms`, `@angular/router`: Núcleo del framework Angular.
- `@angular/material`: Componentes UI preconstruidos.
- `tailwindcss`: Framework de utilidades CSS.
- `rxjs`: Manejo de programación reactiva.


### Librerías de desarrollo
- `@angular/cli`: Herramienta para crear, compilar y testear la app.
- `@angular-devkit/build-angular`: Build system oficial de Angular.
- `typescript`: Lenguaje principal del proyecto.


## Instalación y Configuración

Para instalar y configurar el proyecto, sigue estos pasos:

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/Maure-dev/Trabajo-DAW.git
   ```
   
2. **Genera las variables de entorno - Back**

   Creá un archivo `.env` en la raíz del proyecto de **back** con las siguientes variables:

   ```env
   PORT=3000
   DATABASE_HOST=db
   DATABASE_PORT=5432
   DATABASE_USER=your-db-user
   DATABASE_PASSWORD=your-db-password
   DATABASE_NAME=encuestas_db
   EMAIL_USER=your-gmail-address (opcional)
   EMAIL_PASS=your-gmail-pass    (opcional)
   ```

   > Estas variables son utilizadas por el módulo de configuración (`ConfigModule`) y el módulo de conexión a base de datos (`TypeOrmModule`).

3. **Iniciar los servicios**

   ```bash
   ./deploy.sh start
   ```

5. **Detener los servicios**

   ```bash
   ./deploy.sh stop
   ```

## Uso del Proyecto

Una vez iniciado el proyecto, puedes acceder a la página principal en http://localhost:80. Si haces cambios en el proyecto, el servidor se reiniciará automáticamente.

## Licencia

Este proyecto está bajo la Licencia MIT. Véase el archivo LICENSE.