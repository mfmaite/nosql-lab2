import { Paciente } from '../types/paciente.js';
import { Registro } from '../types/registro.js';
import firebaseClient from '../config/firebase.js';
import BD_REFERENCES from '../networking/references.js';
import { ApiError, errors, validateInput } from '../utils/index.js';
import { pacienteSchema, registroSchema } from '../schema/index.js';
import { ref, get, query, orderByChild, equalTo, push, set, remove } from 'firebase/database';



async function ciAlreadyExists(ci: string) {
  try {
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

    await set(registroRef, registro);

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


async function deletePatient(ci: string) {
  try {
    const q = query(ref(firebaseClient, BD_REFERENCES.pacientes), orderByChild('ci'), equalTo(ci));
    const snapshot = await get(q); 

    if (!snapshot.exists()) {
      throw new ApiError(errors.PACIENTE_NO_ENCONTRADO);
    }

    const patientsToDelete: string[] = [];
    snapshot.forEach((childSnapshot) => {
      patientsToDelete.push(childSnapshot.key as string);
    });

    for (const key of patientsToDelete) {
      const patientRef = ref(firebaseClient, `${BD_REFERENCES.pacientes}/${key}`);
      await remove(patientRef); 
    }
    await deletePatientRegistry(ci);

    return {
      data: {
        message: 'Paciente eliminado exitosamente'
      },
      status: 200
    };

  } catch (error) {
    console.error('Error al eliminar el paciente:', error);
    const err = error as { message: string; status?: number };
    return {
      data: {
        message: 'Hubo un error al eliminar el paciente',
        error: err.message
      },
      status: err.status,
    };
  }
}

async function deletePatientRegistry(ci: string) {
  try {
    const q = query(ref(firebaseClient, BD_REFERENCES.registro), orderByChild('ci'), equalTo(ci));
    const snapshot = await get(q);
    if (snapshot.exists()) {
      const registrosToDelete: string[] = [];
      snapshot.forEach((childSnapshot) => {
        registrosToDelete.push(childSnapshot.key as string);
      });

      for (const key of registrosToDelete) {
        const registroRef = ref(firebaseClient, `${BD_REFERENCES.registro}/${key}`);
        await remove(registroRef);
      }
    }
  } catch (error) {
    console.error('Error al eliminar los registros del paciente:', error);
    const err = error as { message: string; status?: number };
    return{
      data: {
        message: 'Hubo un error al eliminar los registros del paciente',
        error: err.message
      },
      status: err.status,
    }
  }
}

export { ciAlreadyExists, createPatient, createPatientRegistry, deletePatient };
