# Sistema de Gestión de Tareas

## 📌 Descripción del Proyecto

Este es un **Sistema de Gestión de Tareas** desarrollado con **Next.js**. La aplicación permite a los usuarios autenticarse, gestionar tareas (crear, actualizar, eliminar) y simular la integración con una API de backend utilizando mocks.

## 🚀 Demo en Vivo

👉 [URL de despliegue](https://task-manager-next-five.vercel.app/) 

## 🛠️ Tecnologías Utilizadas

- **Next.js** (Framework de React)
- **Zustand** (Gestión de Estado)
- **Jest / React Testing Library** (Pruebas Unitarias)
- **Mock API** (Simulación de integración con backend)

## 🔧 Instalación y Configuración

### 1️⃣ Clonar el Repositorio

```bash
git clone https://github.com/your-repo/task-management.git
cd task-management
```

### 2️⃣ Instalar Dependencias

```bash
npm install  # o yarn install
```

### 3️⃣ Configurar Variables de Entorno

Crear un archivo `.env.local` y agregar:

```
NEXT_PUBLIC_JWT_SECRET=a2bd7b4f1e1034ca05a8291a87b2193545e5d9496417ddba17531f4f12097480
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4️⃣ Ejecutar la Aplicación

```bash
npm run dev  # o yarn dev
```

La aplicación estará disponible en `http://localhost:3000`.

## 🔐 Autenticación

Para iniciar sesión, utiliza las siguientes credenciales de prueba:

```
Email: test@example.com
Contraseña: test123
```

## 📝 Características

- **Autenticación de Usuario** (Inicio de sesión simulado con JWT)
- **Lista de Tareas**
- **Crear, Actualizar y Eliminar Tareas**
- **Gestión de Estado con Zustand**
- **Cobertura de Pruebas Unitarias (70%)**

## 🧪 Ejecutar Pruebas

```bash
npm run test  # o yarn test
```

Si tienes alguna duda, abre una discusión o un issue en GitHub. 😊

