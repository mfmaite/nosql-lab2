const { sql_consultar_pacientes } = require('../models/pacientes');

async function controllerCrearPaciente(datos) {
    const { nombre, apellido, ci, fecha_nacimiento, sexo, telefono, direccion, email } = datos;
    return {
        data: {
            result: "Endpoint para agregar un paciente nuevo",
            datos: {
                nombre,
                apellido,
                ci,
                fecha_nacimiento,
                sexo,
                telefono,
                direccion,
                email
            }
        }, status: 200
    };
}

async function controllerConsultarHistoria(datos) {
    const { ci } = datos;
    return {
        data: {
            result: "Historia clinica del paciente " + ci
        }, status: 200
    };
}


module.exports = { controllerCrearPaciente, controllerConsultarHistoria};