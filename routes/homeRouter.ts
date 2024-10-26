import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  try {
    res.send({
      "message": "Bienvenido a la API de registros de pacientes",
      "version": "1.0.0",
      "endpoints": {
        "pacientes": {
          "Nuevo paciente": {
            "descripcion": "Crea un nuevo paciente",
            "protocolo": "POST",
            "endpoint": "/pacientes",
            "parametros": {
              "nombre": "String",
              "ci": "String",
              "edad": "Number",
              "sexo": "String",
              "telefono": "String",
              "direccion": "String"
            }
          },
          "Consultar historial": {
            "descripcion": "Consultar la historia clinica de un paciente",
            "protocolo": "GET",
            "endpoint": "/pacientes/historia/:ci",
            "parametros": {
              "ci": "String"
            }
          },
          "Agregar registro": {
            "descripcion": "Agregar un registro a la historia clinica de un paciente",
            "protocolo": "POST",
            "endpoint": "/pacientes/registro/:ci",
            "parametros": {
              "ci": "String",
              "fecha": "String",
              "tipo": "String",
              "diagnostico": "String",
              "medico": "String",
              "institucion": "String",
              "descripcion": "String",
              "medicacion": "String"
            }
          }
        },
        "registros": {
          "Consultar registro": {
            "descripcion": "Consultar registros por criterios",
            "protocolo": "GET",
            "endpoint": "/registros",
            "parametros": {
              "ci": "String",
              "fecha": "String",
              "tipo": "String",
              "diagnostico": "String",
              "medico": "String",
              "institucion": "String",
              "descripcion": "String",
              "medicacion": "String"
            }
          }
        }
      }
    }
    );
  } catch (err) {
    res.send(err)
  }
});

export default router;
