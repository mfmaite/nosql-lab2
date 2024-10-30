import { ApiError, errors } from '../utils/index.js';
import { ciAlreadyExists, getHistoriaPaciente } from '../services/index.js';

//obtiene todos los registros asociados a un criterio de búsqueda. El criterio se pasa como parámetro y se pueden combinar criterios
/////////////////////////////////////////////////////////idea formándose://///////////////////////////////////////////////////////////

async function getHistoriaPaciente(ci: string) {
    try {
        const registrosRef = ref(firebaseClient, BD_REFERENCES.registro);
        const q = query(registrosRef, equalTo(ci), orderByChild('ci'))
        const snapshot = await get(q);

    } catch (error) {
        console.error('Error al consultar si el ci ya existe:', error);
        throw new ApiError(errors.ERROR_CONSULTA_CI)
    }
}

/////////////////////////////////////////////////////////sacado de controller-historia/////////////////////////////////////////////////////////////
async function consultarRegistros({ ci }: { ci: string }) {
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


/////////////////////////////////////////////////////////estructura registro/////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////sacado de chatgpt/////////////////////////////////////////////////////////////
import { Request, Response } from 'express';

// Ejemplo de interfaz para los registros médicos
interface MedicalRecord {
    id: number;
    tipo: 'Consulta' | 'Examen' | 'Internación';
    diagnóstico: string;
    médico: string;
    institución: string;
    // otros campos que puedas necesitar...
}

// Ejemplo de función mock para obtener registros (en realidad iría a una base de datos)
const medicalRecords: MedicalRecord[] = [
    { id: 1, tipo: 'Consulta', diagnóstico: 'Gripa', médico: 'Dr. Smith', institución: 'Clínica A' },
    { id: 2, tipo: 'Examen', diagnóstico: 'Fractura', médico: 'Dra. Pérez', institución: 'Hospital B' },
    // Otros registros
];


export const getMedicalRecordsByCriteria = (req: Request, res: Response) => {
    // Extracción de los parámetros opcionales de consulta 
    /////////////////////////////////////////////////////////(VER COMO SE HARIA ESTO DE TOMAR LOS PARAMETROS)/////////////////////////////////////////////////////////////
    const { tipo, diagnóstico, médico, institución } = req.query;

    // Filtrado de registros basado en los criterios proporcionados
    let filteredRecords = medicalRecords;

    if (tipo) {
        filteredRecords = filteredRecords.filter(record => record.tipo === tipo);
    }
    if (diagnóstico) {
        filteredRecords = filteredRecords.filter(record => record.diagnóstico === diagnóstico);
    }
    if (médico) {
        filteredRecords = filteredRecords.filter(record => record.médico === médico);
    }
    if (institución) {
        filteredRecords = filteredRecords.filter(record => record.institución === institución);
    }

    res.json(filteredRecords);
};



 /////////////////////////////////////////////////////////(TAmbién chatgpt pero ahora si las cosas son strings)/////////////////////////////////////////////////////////////

export const getMedicalRecordsByCriteria = (req: Request, res: Response) => {
    const { tipo, diagnóstico, médico, institución } = req.query;

    // Función para realizar una coincidencia parcial
    const matchesCriteria = (field: string | undefined, value: string) => {
        if (!field) return true;  // Si no se pasó el criterio, no filtra por él
        const regex = new RegExp(field, 'i');  // 'i' para coincidencia sin mayúsculas/minúsculas
        return regex.test(value);
    };

    // Filtrado de registros basados en los criterios proporcionados
    const filteredRecords = medicalRecords.filter(record =>
        matchesCriteria(tipo as string, record.tipo) &&
        matchesCriteria(diagnóstico as string, record.diagnóstico) &&
        matchesCriteria(médico as string, record.médico) &&
        matchesCriteria(institución as string, record.institución)
    );

    res.json(filteredRecords);
};