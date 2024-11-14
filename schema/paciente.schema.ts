import * as yup from 'yup';

const pacienteSchema = yup.object({
  ci: yup.string().required('El campo cédula es obligatorio'),
  nombre: yup.string().required('El campo nombre es obligatorio'),
  apellido: yup.string().required('El campo apellido es obligatorio'),
  fecha_nacimiento: yup.string().required('El campo fecha de nacimiento es obligatorio'),
  sexo: yup.string().oneOf(['Masculino', 'Femenino'], 'El campo sexo debe ser "Masculino" o "Femenino"').required('El campo sexo es obligatorio'),
  telefono: yup.string().required('El campo telefono es obligatorio'),
  direccion: yup.string().required('El campo dirección es obligatorio'),
  email: yup.string().required('El campo email es obligatorio'),
});

const getPacienteSchema = yup.object({
  ci: yup.string().required('El campo cédula es obligatorio'),
});

export { pacienteSchema, getPacienteSchema };
