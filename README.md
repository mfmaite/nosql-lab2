# Bases de Datos noSQL - Segundo Laboratorio
En este repositorio se alojará la solución propuesta para el segundo laboratorio de la materia Bases de Datos NoSQL, en el contexto de la carrera de Tecnólogo en Informática Sede Buceo, año 2024, turno nocturno.
Dicha tarea consiste en la implementación de una solución de software
sin interfaz gráfica, cuyos servicios son ofrecidos y consultados únicamente a
través de servicios REST, y cuyos datos sean almacenados y extraídos de una base
de datos NoSQL.

##### Participantes
* Maité Martínez (ci.: 5.142.074-8)
* Leonardo Vieras (ci.: 4.513.941-8)
* Federico Vigliarolo (ci.: 5.065.179-4)

## Tabla de Contenidos
- [Getting Started](#getting-started)
- - [Precondiciones](#precondiciones)
- - [Instalación](#instalación)
- - [Ejecución](#ejecución)
- [Descripción de los Servicios](#descripción-de-los-servicios)
- - [POST /pacientes](#post-pacientes)
- - [POST /registro](#post-registro)
- - [GET /historia?ci={user_ci}&&page={page_number}](#get-historiaciuser_cipagepage_number)
- [Construcción](#construcción)
- - [Software utilizado](#software-utilizado)


## Getting Started

### Precondiciones
Para el óptimo uso y prueba de la aplicación, deberá instalar previamente las aplicaciones `Postman` (para ejecutar solicitudes HTTP), `Docker` y `Docker compose` (para la ejecución de contenedores).
Además, deberá contar con las variables de entorno necesarias para la ejecución del proyecto.

### Instalación
Si es la primera vez que ejecuta esta aplicación, será necesario seguir los siguientes pasos:
1. Clonar el repositorio
2. Crear el archivo `.env`, que contendrá las variables de entorno
3. Iniciar la aplicación Docker
4. Navegar a la raiz del proyecto y ejecutar el comando `docker-compose up --build`. Este comando creará el contenedor y todas sus dependencias.

### Ejecución
Si no es la primera vez que ejecuta esta aplicación, posicionado en la raíz del proyecto ejecute el comando `docker-compose up`.

## Descripción de los Servicios
A continuación se detallarán los servicios implementados por la aplicación y los parámetros que espera.

### POST /pacientes
Crea un nuevo paciente
- **URL:** /pacientes
- **Método:** `POST`
- **Body (JSON):**
```json
{
	"ci": "string",
	"nombre": "string",
	"apellido": "string",
	"edad": "string",
	"sexo": ["Masculino", "Femenino"],
	"direccion": "string",
	"telefono": "string",
	"email": "string",
	"fecha_nacimiento": "string",
}
```
- **Respuesta:**
- - `200` - Paciente creado
- - `401` - Ya existe un paciente con esta cédula de identidad
- - `500` - Error del servidor

### POST /registro
Crea un nuevo registro a un paciente
- **URL:** /registro
- **Método:** `POST`
- **Body (JSON):**
```json
{
	"ci": "string",
	"fecha": "string",
	"tipo": ["Examen", "Consulta", "Internacion"],
	"edad": "string",
	"diagnostico": "string",
	"medico": "string",
	"institucion": "string",
}
```
- **Respuesta:**
- - `200` - Registro creado
- - `402` - No existe un paciente con esa cédula de identidad
- - `500` - Error del servidor

### GET /historia?ci={user_ci}&&page={page_number}
Obtiene los registros correspondientes al paciente con la cédula `user_ci`, ordenados por fecha de creación y paginados.
- **URL:** /registro
- **Método:** `GET`
- **Query params:**
- - `ci` (requerido) - La cédula del paciente
- - `page` (opcional) - La página de obtención de datos
- **Respuesta:**
- - `200` - Se obtiene la lista de registros
- - `402` - No existe un paciente con esa cédula de identidad
- - `500` - Error del servidor

### GET /registro?tipo={tipo}&diagnostico={diagnostico}&medico={medico}&institucion={institucion}
Obtiene registros. Estos pueden ser filtrados por los parámetros opcionales `tipo`, `diagnostico`, `medico` o `institucion`.
Estos parámetros pueden ser combinados.
- **URL:** /registro
- **Método:** `GET`
- **Query params:**
- - `tipo` (opcional) - El tipo de consulta. Este puede ser `Consulta`,`Examen` o `Internacion`
- - `diagnostico` (opcional) - El diagnóstico recibido
- - `medico` (opcional) - El médico que atendió al paciente
- - `institucion` (opcional) - La institución donde el paciente fue atendido
- **Respuesta:**
- - `200` - Se obtiene la lista de registros
- - `500` - Error del servidor

## Construcción
Esta aplicación fue desarrollada con JavaScript, en el marco del framework NodeJS.

### Software utilizado
Detalle de las librerías y frameworks utilizados para la construcción de esta aplicación:

* **NodeJS:** Un entorno de ejecución para JavaScript en el lado del servidor, que permite ejecutar aplicaciones y scripts fuera de un navegador.
* **Express:** Un framework para Node.js que facilita el desarrollo de aplicaciones web y APIs. Proporciona una serie de características robustas para manejar solicitudes y respuestas HTTP.
* **TypeScript:** Un superconjunto de JavaScript que añade tipado estático y otras características de programación orientada a objetos. Mejora la mantenibilidad y escalabilidad del código al detectar errores en tiempo de compilación.
* **Firebase Realtime Database:** Base de datos NoSQL en tiempo real que permite almacenar y sincronizar datos entre clientes y servidores de manera instantánea.
* **Docker:** Una plataforma de contenedorización que permite desarrollar, enviar y ejecutar aplicaciones en entornos aislados llamados contenedores.
* **Yup:** Una biblioteca para la validación de esquemas en JavaScript. Permite definir esquemas de validación para los datos de entrada, asegurando que cumplan con los requisitos antes de ser procesados.
* **CORS (Cross-Origin Resource Sharing):** Un mecanismo que permite o deniega solicitudes HTTP entre diferentes orígenes. Es fundamental para habilitar la comunicación entre el cliente y el servidor en aplicaciones web.
* **Day.js:** Una biblioteca de manipulación de fechas y horas muy ligera. Proporciona una API sencilla y fácil de usar para formatear, comparar y manipular fechas en JavaScript.
* **ESLint:** Una herramienta de análisis de código estático para identificar y corregir patrones problemáticos en el código JavaScript. Ayuda a mantener un código limpio y consistente mediante la aplicación de reglas de estilo y calidad.
