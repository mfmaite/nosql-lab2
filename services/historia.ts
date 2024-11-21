import { ApiError, errors } from '../utils/index.js';
import { getPatientId, getRegistros } from './pacientes.js';

async function getHistoriaPaciente({
  ci,
  limit = 5,
  page = 1,
}: {
  ci: string;
  limit?: number;
  page?: number;
}) {
  try {
    const pacienteId = await getPatientId(ci);
    const registros = await getRegistros(pacienteId, page, limit);

    return {
      status: 200,
      data: registros ? registros : 'No existen registros para el usuario con cédula ' + ci,
    };
  } catch (error) {
    console.error('Error al consultar la historia del paciente', error);
    throw new ApiError(errors.ERROR_CONSULTA_CI)
  }
}

export { getHistoriaPaciente };
