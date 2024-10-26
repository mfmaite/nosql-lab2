import * as yup from 'yup';

const registroSchema = yup.object({
  ci: yup.string().required('El campo cédula es obligatorio'),
  fecha: yup.string().required('El campo fecha es obligatorio'),
  tipo: yup.string().oneOf(['Consulta', 'Examen', 'Internacion'], 'El campo tipo debe ser uno de los siguientes: Consulta, Examen, Internacion').required('El campo tipo es obligatorio'),
  diagnostico: yup.string().required('El campo diagnóstico es obligatorio'),
  medico: yup.string().required('El campo médico es obligatorio'),
  institucion: yup.string().required('El campo institución es obligatorio'),
  descripcion: yup.string().optional(),
  medicacion: yup.string().optional(),
  createdAt: yup.string().required(),
});

type crearRegistroData = Omit<yup.InferType<typeof registroSchema>, 'createdAt'>;

export { registroSchema, crearRegistroData };
