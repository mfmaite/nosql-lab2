import { Paciente } from '../types/paciente.js';
import { Registro } from '../types/registro.js';
import firebaseClient from '../config/firebase.js';
import BD_REFERENCES from '../networking/references.js';
import { getPacienteSchema } from '../schema/paciente.schema.js';
import { ApiError, errors, validateInput } from '../utils/index.js';
import { pacienteSchema, registroSchema } from '../schema/index.js';
import { ref, get, query, orderByChild, equalTo, push, set, limitToFirst, orderByValue } from 'firebase/database';


async function ciAlreadyExists(ci: string) {
  try {
    validateInput(getPacienteSchema, { ci }, errors.MISSING_CI)
    const q = query(ref(firebaseClient, BD_REFERENCES.pacientes), orderByChild('ci'), equalTo(ci));
    const snapshot = await get(q);

    return snapshot.exists();
  } catch (error) {
    console.error('Error al consultar si el ci ya existe:', error);
    throw new ApiError(errors.ERROR_CONSULTA_CI)
  }
}

async function createPatient(paciente: Paciente) {
  const { nombre, apellido, ci, fecha_nacimiento, sexo, telefono, direccion, email } = paciente;
  try {
    validateInput(pacienteSchema, paciente, errors.INVALID_PACIENTE);

    const pacientesRef = await push(ref(firebaseClient, BD_REFERENCES.pacientes));

    await set(pacientesRef, {
      nombre,
      apellido,
      ci,
      fecha_nacimiento,
      sexo,
      telefono,
      direccion,
      email
    });

    return {
      data: {
        message: 'Paciente creado exitosamente',
        pacienteId: pacientesRef.key
      },
      status: 200
    };
  } catch (error) {
    console.error('Error al crear el paciente:', error);
    const err = error as { message: string; status?: number };
    return {
      data: {
        message: 'Hubo un error al crear el paciente',
        error: err.message
      },
      status: err.status,
    };
  }
}

async function createPatientRegistry(registro: Registro) {
  try {
    validateInput(registroSchema, registro, errors.INVALID_REGISTRO);

    const registroRef = await push(ref(firebaseClient, BD_REFERENCES.registro));
    const patientId = await getPatientId(registro.ci);

    // Guarda el registro tanto en /registros como en /pacientes/[id]/registros
    // Esto facilitará el filtrado de datos por paciente
    await set(registroRef, registro);
    await push(ref(firebaseClient, BD_REFERENCES.paciente_registro(patientId)), registro);

    return {
      data: {
        message: 'Registro creado exitosamente',
        registroId: registroRef.key
      },
      status: 200
    };

  } catch (error) {
    console.error('Error al crear el registro:', error);
    const err = error as { message: string; status?: number };
    return {
      data: {
        message: 'Hubo un error al crear el registro',
        error: err.message
      },
      status: err.status,
    };
  }

}

const getPatientId = async (ci: string) => {
  try {
    validateInput(getPacienteSchema, { ci }, errors.MISSING_CI);

    const q = query(ref(firebaseClient, BD_REFERENCES.pacientes), orderByChild('ci'), equalTo(ci));
    const snapshot = await get(q);
    const pacientId = Object.keys(snapshot.val())[0];

    return pacientId;
  } catch (e) {
    console.error('Error al obtener paciente:', e);
    throw new ApiError(errors.ERROR_GET_PACIENTE);
  }
}

const getPatient = async (ci: string): Promise<Paciente | null> => {
  try {
    validateInput(getPacienteSchema, { ci }, errors.MISSING_CI);

    const q = query(ref(firebaseClient, BD_REFERENCES.pacientes), orderByChild('ci'), equalTo(ci));
    const snapshot = await get(q);

    const patientData = snapshot.exists() ? Object.values(snapshot.val())[0] as Paciente : null;

    if (patientData && patientData.registro) {
      // Convertir los registros en un array de objetos
      const registrosArray = Object.values(patientData.registro);
      patientData.registro = registrosArray;  // Reemplazar los registros con el arreglo
    }

    return patientData;
  } catch (e) {
    console.error('Error al obtener paciente:', e);
    throw new ApiError(errors.ERROR_GET_PACIENTE);
  }
}

const getRegistros = async (idPaciente: string, page: number, limit: number): Promise<Registro[] | null> => {
  try {
    const q = query(ref(
      firebaseClient,
      BD_REFERENCES.paciente_registro(idPaciente)),
      limitToFirst(limit * page),
    );
    const snapshot = await get(q);

    if (!snapshot.exists()) return null;

    const registros = Object.values(snapshot.val()) as Registro[];

    return registros.slice(limit * (page - 1), registros.length);
  } catch (e) {
    console.error('Error al obtener registros:', e);
    throw new ApiError(errors.ERROR_GET_PACIENTE);
  }
}

export {
  ciAlreadyExists,
  createPatient,
  createPatientRegistry,
  getPatientId,
  getPatient,
  getRegistros,
};
