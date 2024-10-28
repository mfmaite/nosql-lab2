import firebaseClient from '../config/firebase.js';
import BD_REFERENCES from '../networking/references.js';
import { ApiError, errors, orderByDate } from '../utils/index.js';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';

async function getHistoriaPaciente(ci: string) {
  try {
    const registrosRef = ref(firebaseClient, BD_REFERENCES.registro);
    const q = query(registrosRef, equalTo(ci), orderByChild('ci'))
    const snapshot = await get(q);
    // TODO Add pagination

    return {
      status: 200,
      data: snapshot.exists() ? orderByDate(snapshot.val()) : 'No existen registros para el usuario con cédula ' + ci,
    };
  } catch (error) {
    console.error('Error al consultar si el ci ya existe:', error);
    throw new ApiError(errors.ERROR_CONSULTA_CI)
  }
}

export { getHistoriaPaciente };
