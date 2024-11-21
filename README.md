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
- - [Ejecución de los tests con Jenkins](#ejecución-de-los-tests-con-jenkins)
- [Descripción de los Servicios](#descripción-de-los-servicios)
- - [POST /pacientes](#post-pacientes)
- - [POST /registro](#post-registro)
- - [GET /historia?ci={user_ci}&&page={page_number}](#get-historiaciuser_cipagepage_number)
- - [GET /registro?tipo={tipo}&diagnostico={diagnostico}&medico={medico}&institucion={institucion}](#get-registrotipotipodiagnosticodiagnosticomedicomedicoinstitucioninstitucion)
- [Construcción](#construcción)
- - [Software utilizado](#software-utilizado)
- - [Limitaciones](#limitaciones)


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

### Ejecución de los tests con Jenkins
Si es la primera vez que desea ejecutar los test con Jenkins, deberá seguir los siguientes pasos:
1. Después de haber ejecutado `docker-compose up --build` al menos una vez, y con el contenedor levantado, dirigirse a http://localhost:8080/jenkins/
2. En caso de no tener cuenta, completar el registro en Jenkins. De lo contrario, iniciar sesión.
3. Click en "New Item"
4. Ingresar un nombre para la suite de tests y elegir la opción "Freestyle project", luego clickear "Ok"
5. En Build Steps, seleccionar "Execute shell". Esto abrirá un campo de texto. En el campo "command" ingresar el siguiente comando:

```shell
newman run /app/postman-collections/Tests.postman_collectionConVariables.json -e /app/postman-collections/variables.postman_environment.json -r cli | tee "reporte-$(date +%d-%m-%y--%H:%M).txt"
```

Si no es la primera vez que abre el panel de Jenkins, simplemente clickear en "build now". Jenkins correrá los tests. Al finalizar puede clickear en el build para ver los resultados de los tests.

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
* **Postman:** Una herramienta para el diseño, desarrollo, prueba y documentación de APIs. En este proyecto, se utilizó para crear y ejecutar pruebas de endpoints, simulando peticiones HTTP para verificar su correcto funcionamiento.
* **Jenkins:** Una herramienta de integración continua y entrega continua (CI/CD). Se configuró para automatizar las pruebas y despliegues de la aplicación, asegurando la calidad del código mediante la ejecución regular de pipelines.

### Limitaciones

En esta sección documentaremos algunas limitaciones de las herramientas utilizadas y los problemas que generaron al momento de la construcción del software.

#### Limitación en el filtrado y ordenamiento
Firebase Realtime Database no permite filtrar por más de un campo simultáneamente, y el ordenamiento solo puede aplicarse sobre el campo que se utiliza para filtrar. Esto complicaba el acceso a los registros de un paciente específico y su ordenamiento por fecha.

**Problema:**
Obtener los registros de un paciente y ordenarlos cronológicamente requería soluciones alternativas debido a esta limitación.

**Solución:**
Decidimos almacenar los registros en dos ubicaciones:
1. Una colección general `/registros`, que contiene todos los registros.
2. Una colección específica dentro de cada paciente, donde se guardan únicamente los registros asociados a ese paciente.

Esto nos permite:
* Filtrar los registros directamente desde la URL del paciente.
* Aplicar ordenamiento por fecha en el contexto específico del paciente, aunque sigue siendo necesario un trabajo adicional para realizar esta tarea fuera de Firebase.

#### Almacenamiento de fechas como cadenas
Firebase Realtime Database no admite el tipo de dato *fecha*. Por lo tanto, nos vimos obligados a guardar las fechas como cadenas de texto (strings).

**Problema:**
Al guardar fechas como cadenas, el ordenamiento no es correcto porque se realiza en orden lexicográfico en lugar de cronológico.

**Solución:**
Actualmente no encontramos una solución ideal dentro de las limitaciones de Firebase. Optamos por asegurarnos de almacenar las fechas en un formato ISO8601 (`YYYY-MM-DDTHH: mm:ssZ`) para facilitar su procesamiento en el backend o en otros entornos externos que permitan manipulación y ordenamiento correcto de fechas.

#### Paginación basada en punteros

Firebase utiliza el método `startAfter()` para implementar paginación, que requiere una referencia al último elemento devuelto para recuperar los elementos siguientes.

**Problema:**
En un backend sin estado, no podemos mantener una referencia al último elemento procesado entre peticiones.

**Solución:**
Para resolver este problema:
1. Recuperamos todos los elementos desde el inicio hasta completar la cantidad requerida para la página solicitada.
2. Enviamos al cliente únicamente los elementos correspondientes a esa página.

Reconocemos que esta solución podría generar problemas de rendimiento en conjuntos de datos muy grandes. Sin embargo, en un entorno con frontend, este problema se resolvería, ya que el frontend podría recordar la referencia del último elemento visto, optimizando el proceso de paginación.
