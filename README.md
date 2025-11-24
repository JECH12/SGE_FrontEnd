SGE_API — Prueba Técnica Backend .NET + Angular

Proyecto desarrollado angular 19.

Aplicando arquitectura recomendada para proyectos angular, bootstrap, resolvers, interceptores, 
injeccion de dependencias tanto por constructor como por inject().
Formularios reactivos, rutas, sweetalert2 y servcios.


------------------------------------------------------------------------

Objetivo

Proyecto que permite realizar operaciones CRUD sobre empleados,
conectandose a la API Rest SGE_API, capturando sus respuestas mediante un wrapper genérico Result<T>
y mostrandolas en una interfaz minimalista.

------------------------------------------------------------------------

Requisitos previos

-   node 22.15.0
-   Angular 19
-   Visual Studio 2022 o VS Code

------------------------------------------------------------------------

-- Ejecución en local

1. Clonar el repositorio

    --git https://github.com/JECH12/SGE_FrontEnd.git
    cd SGE_FrontEnd

   - Asegúrate ejecutar npm install para la instalacion de todas las dependencias del proyecto
   - Este proyecto esta directamente enlazado con el API desplegada en nube. 
     Si se desea ejecutar localmente junto con el API es necesario editar el archivo enviroment.js y cambiar la constante apiUrl por http://localhost:8080/ 
     si se ha levantado la API mendiante Docker, de no ser asi es necesario verificar la URL.

2. Levantar el proyecto

	Abrir una nueva terminal en la raiz del proyecto y ejecutar
  ng serve


  Con esto la aplicacion se levantara en http://localhost:4200/


El proyecto carece de Login, Guards para la verificacion de rutas pero esta diseñado para que su implementacion sea sencilla con JWT.

------------------------------------------------------------------------

-- Autor --

Esteban Carrillo
Desarrollador .NET / Angular

------------------------------------------------------------------------