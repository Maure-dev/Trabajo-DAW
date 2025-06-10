# 📋 Encuestas API - Ejemplos de uso

# 📚 Índice

- [📘 Obtener encuesta (`GET /surveys/:id`)](#-obtener-encuesta-get-surveysid)
- [📘 Obtener encuesta por enlace de participación (`GET /surveys/participate/:id`)](#-obtener-encuesta-por-enlace-de-participación-get-surveysparticipateid)
- [📘 Obtener encuesta por enlace de visualización (`GET /surveys/results/:id`)](#-obtener-encuesta-por-enlace-de-visualización-get-surveysresultsid)
- [📘 Obtener encuestas (`GET /surveys?status=...`)](#-obtener-encuestas-get-surveysstatus)
- [🎯 Crear encuesta (`POST /surveys`)](#-crear-encuesta-post-surveys)
- [🔄 Actualizar encuesta (`PUT /surveys/:id`)](#-actualizar-encuesta-put-surveysid)
- [🗑️ Eliminar encuesta (`DELETE /surveys/:id`)](#-eliminar-encuesta-delete-surveysid)
- [🔁 Cambiar estado de encuesta (`PATCH /surveys/:id/status`)](#-cambiar-estado-de-encuesta-patch-surveysidstatus)
- [📝 Responder encuesta (`POST /answers`)](#-responder-encuesta-post-answers)

## 📘 Obtener encuesta (`GET /surveys/:id`)

Obtiene una encuesta completa por su ID.

### 🔗 Endpoint
```
GET /surveys/:id
```

### 🔸 Parámetros de ruta

| Nombre | Tipo   | Requerido | Descripción        |
|--------|--------|-----------|--------------------|
| `id`   | string (UUID) | ✅        | ID único de la encuesta |

### ✅ Ejemplo de request
```
GET /surveys/f46e2f3d-7b9d-4c99-98c6-bd2f8b98a3cd
```

### 📦 Ejemplo de respuesta `200 OK`
```json
{
  "id": "f46e2f3d-7b9d-4c99-98c6-bd2f8b98a3cd",
  "title": "Encuesta de satisfacción",
  "status": "published",
  "questions": [
    {
      "id": "1",
      "text": "¿Cómo calificarías nuestro servicio?",
      "type": "SINGLE_CHOICE",
      "options": [
        { "id": "a", "text": "Bueno" },
        { "id": "b", "text": "Regular" },
        { "id": "c", "text": "Malo" }
      ]
    },
    {
      "id": "2",
      "text": "¿Comentarios adicionales?",
      "type": "OPEN",
      "options": []
    }
  ]
}
```

### ⚠️ Posibles errores

- `404 Not Found`: si no se encuentra la encuesta con ese ID.
- `400 Bad Request`: si el ID no es un UUID válido.

---

## 📘 Obtener encuesta por enlace de participación (`GET /surveys/participate/:id`)

Obtiene una encuesta por su ID de enlace de participación.

### 🔗 Endpoint
```
GET /surveys/participate/:id
```

### 🔸 Parámetros de ruta

| Nombre | Tipo   | Requerido | Descripción        |
|--------|--------|-----------|--------------------|
| `id`   | string (UUID) | ✅        | ID único del enlace |

### ✅ Ejemplo de request
```
GET /surveys/participate/294c2a3b-30d9-4015-82a7-ffa3985f7592
```

### ⚠️ Posibles errores

- `404 Not Found`: si no se encuentra la encuesta con ese ID.
- `400 Bad Request`: si el ID no es un UUID válido.

---

## 📘 Obtener encuesta por enlace de visualización (`GET /surveys/results/:id`)

Obtiene una encuesta con sus respuestas por su ID de enlace de visualización.

### 🔗 Endpoint
```
GET /surveys/results/:id
```

### 🔸 Parámetros de ruta

| Nombre | Tipo   | Requerido | Descripción        |
|--------|--------|-----------|--------------------|
| `id`   | string (UUID) | ✅        | ID único del enlace |

### ✅ Ejemplo de request
```
GET /surveys/results/c3e07c7d-84b1-4481-b5b0-d9507d173f07
```

### ⚠️ Posibles errores

- `404 Not Found`: si no se encuentra la encuesta con ese ID.
- `400 Bad Request`: si el ID no es un UUID válido.

---

## 📘 Obtener encuestas (`GET /surveys?status=...`)

Obtiene todas las encuestas filtradas por estado.

### 🔗 Endpoint
```
GET /surveys?status={status}
```

### 🔸 Parámetros de query

| Nombre   | Tipo   | Requerido | Descripción                                |
|----------|--------|-----------|--------------------------------------------|
| `status` | string | ✅        | Estado de la encuesta (`DRAFT`, `PUBLISHED`, `CLOSED`) |

### ✅ Ejemplo de request
```
GET /surveys?status=PUBLISHED
```

### 📦 Ejemplo de respuesta `200 OK`
```json
[
  {
    "id": "abc123",
    "title": "Encuesta de producto",
    "status": "PUBLISHED",
    "questions": [
      {
        "id": "q1",
        "text": "¿Qué tan útil te pareció el producto?",
        "type": "SINGLE_CHOICE",
        "options": [
          { "id": "1", "text": "Muy útil" },
          { "id": "2", "text": "Poco útil" }
        ]
      }
    ]
  },
  {
    "id": "def456",
    "title": "Encuesta de soporte técnico",
    "status": "PUBLISHED",
    "questions": []
  }
]
```

### ⚠️ Posibles errores

- `400 Bad Request`: si el valor de `status` no es válido (`DRAFT`, `PUBLISHED`, `CLOSED`).

---

## 🎯 Crear encuesta (`POST /surveys`)

```
POST /surveys
Content-Type: application/json
```
El cuerpo de la petición debe ser un objeto JSON con la siguiente estructura:

```json
{
  "title": "Encuesta para devs Frontend",
  "duration": "2025-06-15T23:59:59.000Z",
  "questions": [
    {
      "text": "¿Cuál es tu framework favorito?",
      "type": "SINGLE_CHOICE",
      "options": [
        { "text": "React" },
        { "text": "Vue" },
        { "text": "Angular" }
      ]
    },
    {
      "text": "¿Qué herramientas usás en tu día a día?",
      "type": "MULTIPLE_CHOICE",
      "options": [
        { "text": "Visual Studio Code" },
        { "text": "Docker" },
        { "text": "Postman" }
      ]
    },
    {
      "text": "¿Alguna sugerencia?",
      "type": "OPEN"
    }
  ]
}
```

**Campos:**

`title` (obligatorio): El título de la encuesta.

`duration` (obligatorio): Fecha y hora de expiración de la encuesta (en formato ISO 8601).
  
`questions` (obligatorio): Un array que contiene al menos una pregunta. Cada objeto dentro de este array representa una pregunta y debe tener la siguiente estructura:

 - `text` (obligatorio): El texto de la pregunta.
 - `type` (obligatorio): El tipo de la pregunta. Los valores posibles son:
	- `SINGLE_CHOICE`: Para preguntas con una única selección posible.
	- `MULTIPLE_CHOICE`: Para preguntas con múltiples selecciones posibles.
	- `OPEN`: Para preguntas de respuesta abierta (texto libre).
- `options` (condicional): Un array de objetos que representan las opciones de respuesta. Este campo es obligatorio si el `type` de la pregunta es `SINGLE_CHOICE` o `MULTIPLE_CHOICE`, y debe contener al menos dos opciones. Cada objeto de opción debe tener el siguiente campo:
    - `text` (obligatorio): El texto de la opción.



---

## 🔄 Actualizar encuesta (`PUT /surveys/:id`)

```
PUT /surveys/{id}
Content-Type: application/json
```

Este endpoint permite **reemplazar completamente** una encuesta existente identificada por su `id`.

### 📌 Comportamiento

- Se sobrescriben todos los datos de la encuesta, incluyendo preguntas y opciones.
- Se **usa el mismo esquema de datos** que en la creación (`POST /surveys`).

---

### 🧾 Cuerpo de la petición

```json
{
  "title": "Encuesta para devs Frontend",
  "duration": "2025-06-15T23:59:59.000Z",
  "questions": [
    {
      "text": "¿Cuál es tu framework favorito?",
      "type": "SINGLE_CHOICE",
      "options": [
        { "text": "React" },
        { "text": "Nextjs" },
        { "text": "Angular" },
        { "text": "Svelte" }      ]
    },
    {
      "text": "¿Qué herramientas usás en tu día a día?",
      "type": "MULTIPLE_CHOICE",
      "options": [
        { "text": "VSCode" },
        { "text": "Docker" },
        { "text": "Figma" }
      ]
    },
    {
      "text": "¿Alguna sugerencia?",
      "type": "OPEN"
    }
  ]
}
```

---

### 🧱 Campos

| Campo | Tipo | Obligatorio | Descripción |
| --- | --- | --- | --- |
| `title` | `string` | ✅ | Título de la encuesta. |
| `duration` | `string` (ISO 8601) | ✅ | Fecha y hora de expiración de la encuesta (ej: `"2025-06-15T23:59:59.000Z"`). |
| `questions` | `Question[]` | ✅ | Array de preguntas. Debe contener al menos una. |

Cada objeto `Question` incluye:

| Campo | Tipo | Obligatorio | Descripción |
| --- | --- | --- | --- |
| `text` | `string` | ✅ | Texto de la pregunta. |
| `type` | `SINGLE_CHOICE` | `MULTIPLE_CHOICE` | `OPEN` | ✅ | Tipo de pregunta. |
| `options` | `Option[]` | ⚠️ *(condicional)* | Solo requerido si el tipo es `SINGLE_CHOICE` o `MULTIPLE_CHOICE`. Debe haber al menos dos. |

Cada `Option` incluye:

| Campo | Tipo | Obligatorio | Descripción |
| --- | --- | --- | --- |
| `text` | `string` | ✅ | Texto de la opción. |

---

## 🗑️ Eliminar encuesta (`DELETE /surveys/:id`)

Elimina una encuesta existente identificada por su ID.

### 🔗 Endpoint

```
DELETE /surveys/:id
```

### 🔸 Parámetros de ruta

| Nombre | Tipo | Requerido | Descripción |
| --- | --- | --- | --- |
| `id` | string (UUID) | ✅ | ID único de la encuesta |

### ✅ Ejemplo de request

```
DELETE /surveys/f46e2f3d-7b9d-4c99-98c6-bd2f8b98a3cd
```

### 📦 Respuesta `204 No Content`

No se retorna contenido en la respuesta.

### ⚠️ Posibles errores

- `404 Not Found`: si no se encuentra la encuesta con ese ID.
- `400 Bad Request`: si el ID no es un UUID válido.

---

## 🔁 Cambiar estado de encuesta (`PATCH /surveys/:id/status`)

Este endpoint cambia el estado de una encuesta de forma automática:

- Si el estado actual es `DRAFT`, lo cambia a `PUBLISHED`.
- Si el estado actual es `PUBLISHED`, lo cambia a `CLOSED`.
- Si el estado es `CLOSED`, no realiza ningún cambio.

> ⚠️ Este endpoint no recibe body. Solo opera en base al estado actual de la encuesta.
> 

### 🔗 Endpoint

```bash
PATCH /surveys/:id/status
```

### 🔸 Parámetros de ruta

| Nombre | Tipo | Requerido | Descripción |
| --- | --- | --- | --- |
| `id` | string (UUID) | ✅ | ID único de la encuesta |

### ✅ Ejemplo de request

```
PATCH /surveys/f46e2f3d-7b9d-4c99-98c6-bd2f8b98a3cd/status
```

### 🔄 Ejemplo de respuesta exitosa (`200 OK`)

```json
{
  "id": "18cce632-6add-4daa-8358-2eb6d025d39c",
  "title": "Backend Technology Preferences",
  "status": "PUBLISHED",
  "linkParticipation": "eee4a46c-2802-45ec-b6e0-9d5f6fe0b166",
  "linkResults": "6ff0a4b5-4ce5-471f-aa53-4d6a6224f684"
}
```

### ⚠️ Posibles errores

- `404 Not Found`: si no se encuentra la encuesta.
- `400 Bad Request`: si la encuesta ya está en estado `CLOSED` y no puede cambiarse.

---

## 📝 Responder encuesta (`POST /answers`)

Permite registrar respuestas a una encuesta publicada. Cada entrada representa la respuesta a una pregunta específica.

### 🔗 Endpoint

```
POST /answers
Content-Type: application/json
```

### 🔸 Cuerpo (JSON)

Es un array de objetos, donde cada uno contiene:

| Campo | Tipo | Descripción |
| --- | --- | --- |
| `questionId` | string (UUID) | ID de la pregunta que se está respondiendo. |
| `text` | string (opcional) | Texto de respuesta para preguntas abiertas. |
| `selectedOptionId` | string (UUID) | ID de la opción seleccionada (solo para preguntas de opción única). |
| `selectedOptionIds` | array de strings | Lista de IDs de opciones seleccionadas (solo para preguntas de opción múltiple). |

> ⚠️ Solo uno de los campos text, selectedOptionId o selectedOptionIds debe ser enviado por respuesta, según el tipo de la pregunta.
> 

---

### ✅ Ejemplo de request

```json
[
  {
    "questionId": "question-open-id",
    "text": "Me parece una excelente herramienta."
  },
  {
    "questionId": "question-single-choice-id",
    "selectedOptionId": "option-a-id"
  },
  {
    "questionId": "question-multiple-choice-id",
    "selectedOptionIds": [
      "option-a-id",
      "option-c-id"
    ]
  }
]
```

### ⚠️ Posibles errores

- `400 Bad Request`: Si el formato es inválido, se omite `questionId`, o se combinan campos incorrectamente.
- `404 Not Found`: Si el `questionId` o alguna de las opciones seleccionadas no existen o no corresponden a la encuesta.