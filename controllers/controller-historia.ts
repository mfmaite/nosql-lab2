import { ApiError, errors } from '../utils/index.js';
import { ciAlreadyExists, getHistoriaPaciente } from '../services/index.js';

async function consultarHistoria({ ci }: { ci: string }) {
  try {
    const existsCi = await ciAlreadyExists(ci);
    if (!existsCi) throw new ApiError(errors.CI_NOT_FOUND);
    return getHistoriaPaciente(ci);

  } catch (error) {
    const err = error as ApiError;

    return {
      data: {
        error: err.message || 'Error interno del servidor',
      },
      status: err.status || 500,
    };
  }
}

export { consultarHistoria };
