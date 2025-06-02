# 📋 Encuestas API - Ejemplos de uso

## 🎯 Crear encuesta (`POST /surveys`)

```
POST /surveys
Content-Type: application/json
```
El cuerpo de la petición debe ser un objeto JSON con la siguiente estructura:

```json
{
  "title": "Encuesta para devs Frontend",
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
  
`questions` (obligatorio): Un array que contiene al menos una pregunta. Cada objeto dentro de este array representa una pregunta y debe tener la siguiente estructura:

 - `text` (obligatorio): El texto de la pregunta.
 - `type` (obligatorio): El tipo de la pregunta. Los valores posibles son:
	- `SINGLE_CHOICE`: Para preguntas con una única selección posible.
	- `MULTIPLE_CHOICE`: Para preguntas con múltiples selecciones posibles.
	- `OPEN`: Para preguntas de respuesta abierta (texto libre).
- `options` (condicional): Un array de objetos que representan las opciones de respuesta. Este campo es obligatorio si el `type` de la pregunta es `SINGLE_CHOICE` o `MULTIPLE_CHOICE`, y debe contener al menos dos opciones. Cada objeto de opción debe tener el siguiente campo:
    - `text` (obligatorio): El texto de la opción.


**En resumen:**

El campo `title` es obligatorio.

El campo `questions` es obligatorio y debe contener al menos un objeto de pregunta.

Cada pregunta debe tener los campos `text` y `type`.

Si el `type` de una pregunta es `SINGLE_CHOICE` o `MULTIPLE_CHOICE`, debe incluir un array `options` con al menos dos objetos, cada uno con un campo `text`.

Para preguntas de tipo `OPEN`, el campo `options` no debe estar presente.

## 🔄 Actualizar encuesta (`PUT /surveys/:id`)

```
PUT /surveys/{id}
Content-Type: application/json
```

Este endpoint permite modificar una encuesta existente identificada por su `id`. El cuerpo de la petición (`Content-Type: application/json`) debe contener un objeto JSON con la estructura de la encuesta que se desea actualizar.

**Campos:**

* `title` (opcional): Nuevo título para la encuesta. Si se incluye, el título de la encuesta será actualizado. Si se omite, el título permanecerá sin cambios.
* `questions` (opcional): Un array de objetos que representan las preguntas de la encuesta. Al actualizar las preguntas, se deben tener en cuenta los siguientes comportamientos:
    * **Creación de nuevas preguntas:** Para agregar una nueva pregunta, simplemente incluye un nuevo objeto de pregunta en el array `questions` sin el campo `id`. El servidor generará un nuevo ID para esta pregunta.
    * **Actualización de preguntas existentes:** Para modificar una pregunta existente, incluye en el array `questions` un objeto de pregunta que contenga el `id` de la pregunta que deseas actualizar, junto con los campos (`text`, `type`, `options`) que quieras modificar. Si un campo se omite, permanecerá sin cambios.
    * **Eliminación de preguntas:** Para eliminar una pregunta, simplemente omite el objeto de esa pregunta del array `questions`. El servidor interpretará la ausencia de la pregunta con ese `id` como una solicitud de eliminación.

    Dentro de cada objeto de pregunta, se definen los siguientes campos:

    * `id` (opcional, pero requerido para actualizar una pregunta existente): Identificador único de la pregunta.
    * `text` (opcional): Nuevo texto para la pregunta.
    * `type` (opcional): Nuevo tipo de la pregunta (`SINGLE_CHOICE`, `MULTIPLE_CHOICE`, `OPEN`).
    * `options` (opcional, solo para `SINGLE_CHOICE` y `MULTIPLE_CHOICE`): Un array de objetos que representan las opciones de la pregunta. Al igual que con las preguntas, se aplican los siguientes comportamientos:
        * **Creación de nuevas opciones:** Incluye un nuevo objeto de opción sin el campo `id`.
        * **Actualización de opciones existentes:** Incluye un objeto de opción con su `id` y los campos (`text`) que quieras modificar.
        * **Eliminación de opciones:** Omite el objeto de la opción que deseas eliminar del array `options` de la pregunta correspondiente.

**Comportamiento esperado:**

* Si se proporciona un `title`, la encuesta actualizará su título.
* Si se proporciona el array `questions`, el servidor comparará las preguntas existentes con las proporcionadas.
    * Las preguntas con un `id` existente se actualizarán con los nuevos datos proporcionados.
    * Las preguntas sin `id` se crearán como nuevas preguntas.
    * Las preguntas existentes cuyo `id` no se encuentre en el nuevo array `questions` serán eliminadas.
* De manera similar, dentro de cada pregunta de tipo `SINGLE_CHOICE` o `MULTIPLE_CHOICE`, el array `options` se procesará para crear, actualizar o eliminar opciones basándose en la presencia o ausencia del campo `id` en cada objeto de opción.

Los ejemplos proporcionados ilustran diferentes escenarios de actualización, desde cambiar solo el título hasta modificar preguntas y sus opciones, así como agregar o eliminar elementos.

### 1️⃣ Solo cambiar el título

```json
{
  "title": "Encuesta actualizada para devs",
  "questions": [ /* mantener las preguntas actuales con sus IDs */ ]
}
```

### 2️⃣ Actualizar solo una pregunta existente

```json
{
  "title": "Encuesta para devs Frontend",
  "questions": [
    {
      "id": "UUID_PREGUNTA_EXISTENTE",
      "text": "¿Cuál es tu framework de frontend favorito?",
      "type": "SINGLE_CHOICE",
      "options": [ /* mantener opciones actuales con IDs */ ]
    },
    { /* otras preguntas sin cambios */ }
  ]
}
```

### 3️⃣ Actualizar solo una opción de una pregunta

```json
{
  "title": "Encuesta para devs Frontend",
  "questions": [
    {
      "id": "UUID_PREGUNTA",
      "text": "¿Cuál es tu framework favorito?",
      "type": "SINGLE_CHOICE",
      "options": [
        {
          "id": "UUID_OPCION_ANGULAR",
          "text": "Angular (v16+)"
        },
        { "id": "UUID_OPCION_REACT", "text": "React" },
        { "id": "UUID_OPCION_VUE", "text": "Vue" }
      ]
    },
    { /* otras preguntas */ }
  ]
}
```

### 4️⃣ Agregar una nueva pregunta

```json
{
  "title": "Encuesta para devs Frontend",
  "questions": [
    { /* preguntas existentes con IDs */ },
    {
      "text": "¿Usás TypeScript?",
      "type": "OPEN"
    }
  ]
}
```

### 5️⃣ Agregar una nueva opción a una pregunta existente

```json
{
  "title": "Encuesta para devs Frontend",
  "questions": [
    {
      "id": "UUID_PREGUNTA",
      "text": "¿Cuál es tu framework favorito?",
      "type": "SINGLE_CHOICE",
      "options": [
        { "id": "UUID_REACT", "text": "React" },
        { "id": "UUID_VUE", "text": "Vue" },
        { "id": "UUID_ANGULAR", "text": "Angular" },
        { "text": "Svelte" }
      ]
    },
    { /* otras preguntas */ }
  ]
}
```

### 6️⃣ Eliminar una pregunta (no incluirla en el array)

```json
{
  "title": "Encuesta para devs Frontend",
  "questions": [
    { /* preguntas que se quieren mantener con su ID */ }
  ]
}
```

### 7️⃣ Eliminar una opción de una pregunta

```json
{
  "title": "Encuesta para devs Frontend",
  "questions": [
    {
      "id": "UUID_PREGUNTA",
      "text": "¿Cuál es tu framework favorito?",
      "type": "SINGLE_CHOICE",
      "options": [
        { "id": "UUID_REACT", "text": "React" },
        { "id": "UUID_VUE", "text": "Vue" }
      ]
    }
  ]
}
```