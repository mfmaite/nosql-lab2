export interface ErrorData {
  status: number,
  description: string,
}

export class ApiError extends Error {
  status: number;
  description: string;

  constructor(error: ErrorData, additionalInfo: unknown = null, stack = '') {
    super(error.description);
    this.status = error.status;
    this.description = error.description;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export const errors: Record<string, ErrorData> = {
  INVALID_PACIENTE: {
    status: 400,
    description: "Paciente invalido",
  },
  INVALID_REGISTRO: {
    status: 400,
    description: "Registro invalido",
  },
  PACIENTE_ALREADY_EXISTS: {
    status: 401,
    description: "Ya existe un paciente con esta cédula",
  },
  CI_NOT_FOUND: {
    status: 402,
    description: 'No existe un paciente con esta cedula',
  },
  // 500, Server Errors
  ERROR_CONSULTA_CI: {
    status: 500,
    description: "Error al consultar la CI",
  }
}
