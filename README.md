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

Contiene archivos de  como la conexión a la base de datos, variables de entorno, o cualquier configuración del servidor.

#### 3. **/front**

Contiene archivos de la aplicación generada con la tecnología Angular como la conexión a la base de datos, variables de entorno, o cualquier configuración del servidor.

#### 4. **README.md**

Instrucciones y documentación básica sobre cómo ejecutar el proyecto.

#### 5. **.gitignore**

Archivo que define qué archivos o carpetas deben ser ignorados por Git (como node_modules o archivos de configuración locales).

## Dependencias (Back)

Este proyecto usa las siguientes librerías:

### Librerías para el usuario final


### Librerías de desarrollo


## Dependencias (Front)

Este proyecto usa las siguientes librerías:

### Librerías para el usuario final


### Librerías de desarrollo


## Instalación y Configuración

Para instalar y configurar el proyecto, sigue estos pasos:

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/Maure-dev/Trabajo-DAW.git
   ```

2. **Instala las dependencias**

   2.1 **Back**

   ```bash
    cd back 
   ```

   ```bash
    npm install
   ```

   2.2 **Front**

   ```bash
    cd front 
   ```

   ```bash
    npm install
   ```
   
3. **Genera las variables de entorno - Back**

   Creá un archivo `.env` en la raíz del proyecto de **back** con las siguientes variables:

   ```env
   PORT=3000
   DATABASE_HOST=db
   DATABASE_PORT=5432
   DATABASE_USER=your-db-user
   DATABASE_PASSWORD=your-db-password
   DATABASE_NAME=encuestas_db
   ```

   > Estas variables son utilizadas por el módulo de configuración (`ConfigModule`) y el módulo de conexión a base de datos (`TypeOrmModule`).

4. **Inicia el servidor**

   ```bash
   ./deploy.sh start
   ```

5. **Detener el servidor**

   ```bash
   ./deploy.sh stop
   ```

## Uso del Proyecto

Una vez iniciado el proyecto, puedes acceder a la página principal en http://localhost:4200/. Si haces cambios en el proyecto, el servidor se reiniciará automáticamente.

## Licencia

Este proyecto está bajo la Licencia MIT. Véase el archivo LICENSE.