import { Paciente } from '../types/paciente';
import { Registro } from '../types/registro';
import firebaseClient from '../config/firebase';
import BD_REFERENCES from '../networking/references';
import { ref, get, query, orderByChild, equalTo, push, set } from 'firebase/database';


async function ciAlreadyExists(ci: string) {
  try {
    const q = query(ref(firebaseClient, 'pacientes'), orderByChild('ci'), equalTo(ci));
    const snapshot = await get(q);

    return snapshot.exists();
  } catch (error) {
    console.error('Error al consultar si el ci ya existe:', error);
    throw new Error('Error al consultar el ci en la base de datos');
  }
}

async function createPatient(paciente: Paciente) {
  const { nombre, apellido, ci, fecha_nacimiento, sexo, telefono, direccion, email } = paciente;
  try {
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
  const { ci, fecha, tipo, diagnostico, medico, institucion, descripcion, medicacion } = registro;

  try {
    const registroRef = await push(ref(firebaseClient, BD_REFERENCES.registro));

    await set(registroRef, {
      ci,
      fecha,
      tipo,
      diagnostico,
      medico,
      institucion,
      descripcion,
      medicacion
    });

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
export { ciAlreadyExists, createPatient, createPatientRegistry };
