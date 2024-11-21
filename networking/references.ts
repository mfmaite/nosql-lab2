const BD_REFERENCES = {
  paciente: (id: string) => `/pacientes/${id}`,
  pacientes: '/pacientes',
  paciente_registro: (id: string) => `/pacientes/${id}/registro`,
  registro: '/registro'
}

export default BD_REFERENCES;
