# Encuestas Anónimas API

API para la creación y participación de encuestas anónimas, construida con [NestJS](https://nestjs.com/), [TypeORM](https://typeorm.io/), y PostgreSQL.

## 🧱 Arquitectura General

La aplicación sigue una arquitectura **por capas** con inyección de dependencias basada en el sistema de módulos de NestJS.

### Flujo principal de dependencias

```
Controller → Service → Repository (TypeORM)
```

- **Controller**: expone los endpoints HTTP y recibe las solicitudes del cliente.
- **Service**: contiene la lógica de negocio; orquesta validaciones, transformaciones y uso de los repositorios.
- **Repository**: maneja el acceso a datos usando TypeORM. Las entidades están mapeadas a tablas PostgreSQL.

> Esta separación permite extender la aplicación fácilmente, escribir tests unitarios, y mantener el código desacoplado.

---

## 📦 Estructura del Proyecto

```
src/
│
├── survey/
│   ├── controllers/      # Controladores HTTP (NestJS Controllers)
│   ├── services/         # Lógica de negocio (NestJS Providers)
│   ├── entities/         # Entidades de TypeORM (Survey, Question, Option, etc.)
│   ├── repositories/     # Interfaces y adaptadores para acceder a los datos
│   └── dtos/             # Data Transfer Objects para validación de entradas
│
├── config/               # Configuración de base de datos y entorno
├── app.module.ts         # Módulo raíz de NestJS
└── main.ts               # Punto de entrada de la aplicación
```

---

## ⚙️ Configuración de Entorno

Antes de correr la aplicación, creá un archivo `.env` en la raíz del proyecto con las siguientes variables:

```env
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=your-db-user
DATABASE_PASSWORD=your-db-password
DATABASE_NAME=encuestas_db
```

> Estas variables son utilizadas por el módulo de configuración (`ConfigModule`) y el módulo de conexión a base de datos (`TypeOrmModule`).

---

## 🐳 Docker

Podés levantar todo el entorno (API + Base de Datos) usando `docker-compose`:

```bash
docker-compose up --build
```

Esto levanta:
- Un contenedor con la API de NestJS en modo desarrollo
- Un contenedor con PostgreSQL preconfigurado

---

## 🚀 Comenzar en Local (sin Docker)

Si preferís correrlo directamente:

```bash
# Instalá las dependencias
npm install

# Levantá la API
npm run start:dev
```

Asegurate de que PostgreSQL esté corriendo localmente y que las variables de entorno estén correctamente configuradas.

---
