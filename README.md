# NTT DATA Challenge - Talent Management Pool

## Descripcion del Proyecto
El presente repositorio contiene la solucion desarrollada para el desafio tecnico del Bootcamp de NTT DATA. El proyecto implementa una arquitectura Cliente/Servidor distribuida en dos capas independientes. El backend funciona como un servicio REST que consume, procesa y unifica datos en tiempo real provenientes de la API publica randomuser.me. Por su parte, el frontend actua como una aplicacion de pagina unica (SPA) encargada de la renderizacion dinamica, presentacion corporativa y filtrado avanzado de la informacion.

## Tecnologias Utilizadas
- Backend: Node.js, Express Framework, Axios, CORS.
- Frontend: HTML5, CSS3 (Variables nativas y Flexbox), JavaScript Moderno (Vanilla JS - ES6+).

## Caracteristicas de la Implementacion
- Filtro de busqueda por texto: Permite la busqueda concurrente de registros por los campos de nombre, correo electronico y ubicacion geografica.
- Clasificacion por Etapas de Vida: Logica de negocio integrada en el servidor que evalua la edad de cada individuo y le asigna una etiqueta categorial automatizada (Universitario/Joven, Adulto Joven, Adulto Pleno, Adulto Mayor).
- Interfaz Corporativa: Maquetacion web adaptada a la linea estetica e identidad visual de NTT DATA utilizando componentes estructurados y diseño responsive.

## Instrucciones de Instalacion y Despliegue Local

### Requisitos Previos
Es necesario contar con el entorno de ejecucion Node.js instalado en el sistema (version 18 o superior).

### Paso 1: Configurar y Levantar el Backend
1. Abrir la terminal y dirigirse al directorio del servidor:
   ```bash
   cd backend
