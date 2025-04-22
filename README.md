# Repositorio de Avances - Desarrollo de Aplicaciones Web en JavaScript

Este repositorio contiene los avances de la materia **Desarrollo de Aplicaciones Web Escritos en JavaScript**, incluyendo principalmente lo trabajado en **GraphQL** durante las clases. Su propósito es proporcionar al curso una versión en línea y actualizada del código que estamos creando a lo largo del curso.

---

## 🚀 Instalación de Dependencias

Antes de comenzar, asegúrate de tener instalado [Node.js](https://nodejs.org/) y [Git](https://git-scm.com/downloads) en tu equipo. Luego, sigue estos pasos:

1. Clona este repositorio en tu máquina local:
   
   ```bash
   git clone https://github.com/antonionatusch/si416-js-pub.git
   ```
   
3. Navega al directorio del proyecto que deseas probar:
   
   ```cpp
   cd si416-js-pub/crm-project-antonio 
   cd si416-js-pub/crm-project-tito
   ```
5. Instala las dependencias necesarias utilizando **npm dentro de cualquiera de los 2 directorios**:
   
   ```bash
   npm install
   ```

---

## 📁 Estructura del Repositorio

Este repositorio está organizado en dos directorios principales, cada uno con un propósito específico:

### **1. `crm-project-tito`**
Este directorio contiene todo el código y ejemplos proporcionados por el profesor **Tito Zuñiga** durante las clases. Es una referencia directa de lo que aprendemos en las clases.

### **2. `crm-project-antonio`**
Este directorio contiene mi implementación personalizada del proyecto, escrita siguiendo mi propio estilo de programación. Este proyecto está desarrollado utilizando **React** y contiene un subdirectorio llamado `graphql`, diseñado para una posible futura integración con un frontend en React, idea que fue sugerida en clases. Aunque el objetivo es el mismo que el código del profesor, esta versión incluye algunos ajustes que van con mis preferencias.

---

## 🛠️ Scripts Disponibles

Cada directorio incluye un archivo `package.json` con scripts que permiten ejecutar y probar el proyecto. Aquí se explican los scripts más importantes para cada uno:

### En **`crm-project-tito`**:
- **`npm start`**: Inicia la aplicación en modo de producción ejecutando el archivo principal (`index.js`).
- **`npm run dev`**: Inicia el servidor en modo de desarrollo utilizando **nodemon**, que reinicia automáticamente el servidor cuando detecta cambios en los archivos.

Estos scripts están diseñados para trabajar con el código proporcionado por el profesor.

---

### En **`crm-project-antonio`**:
- **`npm run dev`**: Inicia el frontend de React en modo de desarrollo utilizando **Vite**, con soporte para hot-reloading.
- **`npm run build`**: Genera una versión optimizada del proyecto React lista para ser desplegada.
- **`npm run preview`**: Sirve la aplicación React generada con `build` para realizar pruebas locales.
- **`npm run lint`**: Ejecuta ESLint para analizar y verificar la calidad del código.
- **`npm run dev:server`**: Inicia el servidor de GraphQL ubicado en el subdirectorio `graphql` utilizando **nodemon**.

La principal diferencia aquí es que `crm-project-antonio` combina un frontend en React con un servidor de GraphQL, lo que lo deja preparado para una futura integración entre el cliente y el servidor.

---

## 📂 Gestión de Archivos `.env`

En este repositorio, se tomaron diferentes decisiones en relación a los archivos `.env` para cada proyecto:

### En **`crm-project-antonio`**:
Se incluyó un archivo `.env.template` en lugar del archivo `.env` real. Esta decisión se tomó para proteger información confidencial como claves API, cadenas de conexión a bases de datos y otras credenciales sensibles. El archivo `.env.template` sirve como guía para que otros desarrolladores puedan crear su propio archivo `.env` con las variables necesarias.

Para usar este archivo, simplemente copia el contenido de `.env.template` y crea un archivo `.env` en el mismo directorio. Luego, completa las variables con tus propios valores:

```bash
cp .env.template .env
```

### En **`crm-project-tito`**:
El código del profesor se dejó exactamente como fue proporcionado, incluyendo su gestión de variables de entorno.

---

## ℹ️ Cómo Utilizar Este Repositorio

1. **Explora los directorios:** Dependiendo de tu preferencia, puedes trabajar con el código del profesor (`crm-project-tito`) o con mi versión personalizada (`crm-project-antonio`).
2. **Ejecuta los scripts:** Navega al directorio correspondiente y utiliza los scripts descritos anteriormente según lo que necesites ejecutar.

   Para el mio:
   ```cpp
   cd crm-project-antonio
   npm run dev:server // GraphQL
   npm run dev // React
   ```

   Para el del profesor:
   ```cpp
   cd crm-project-tito
   npm run dev // GraphQL
   ```
   
4. **Mantente actualizado:** Este repositorio se actualizará regularmente con los avances del curso. Asegúrate de hacer `git pull` para obtener los últimos cambios:
   
   ```bash
   git pull origin main
   ```

---

## 🤝 Contribuciones

Si encuentras errores o deseas aportar algo al repositorio, siéntete libre de abrir un **Issue** o crear un **Pull Request**. Este proyecto está pensado para contar con una copia del avance en GitHub, así que cualquier contribución es bienvenida.

---

## 🛠️ Tecnologías Utilizadas

- **JavaScript** 
- **CSS** 
- **HTML** 
- **React**
- **GraphQL**
- **Vite**
- **Nodemon**

---

## 📬 Contacto

Si tienes dudas o sugerencias, puedes contactarme directamente a través de mi perfil de GitHub: [antonionatusch](https://github.com/antonionatusch) o en persona.

---
