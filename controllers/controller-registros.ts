import { ApiError, errors, orderByDate } from '../utils/index.js';
import { ciAlreadyExists, getHistoriaPaciente } from '../services/index.js';
import firebaseClient from '../config/firebase.js';
import { Request, Response } from 'express';
import { equalTo, orderByChild, get, ref, query } from 'firebase/database';
import BD_REFERENCES from '../networking/references.js';
//obtiene todos los registros asociados a un criterio de búsqueda. El criterio se pasa como parámetro y se pueden combinar criterios
/////////////////////////////////////////////////////////idea formándose://///////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////sacado de historia.ts/////////////////////////////////////////////////////////////

async function getRegistrosOrdenados({ tipo, diagnostico, medico, institucion }: {
    tipo?: 'Consulta' | 'Examen' | 'Internacion',
    diagnostico?: string,
    medico?: string,
    institucion?: string
}) {
    try {
        const registrosRef = ref(firebaseClient, BD_REFERENCES.registro);
        const filtroExiste = [];
        if (tipo) filtroExiste.push(orderByChild('tipo'), equalTo(tipo))
        if (diagnostico) filtroExiste.push(orderByChild('diagnostico'), equalTo(diagnostico));
        if (medico) filtroExiste.push(orderByChild('medico'), equalTo(medico));
        if (institucion) filtroExiste.push(orderByChild('institucion'), equalTo(institucion));
        console.log(...filtroExiste)
        const q = query(registrosRef,...filtroExiste)
        const snapshot = await get(q);
        return {
            status: 200,
            data: snapshot.exists() ? orderByDate(snapshot.val()) : 'No existen registros que mostrar con estos criterios',
        };
    } catch (error) {
        console.error('Error al consultar registros:', error);
        throw new ApiError(errors.ERROR_CONSULTA_CI)
    }
}

export { getRegistrosOrdenados }
/*
async function mostrarPaginaPacientes(ci: string, orderByField: string, pagina: number, tamañoPagina: number) {
    // Obtener todos los datos solo una vez (podrías almacenarlos en el estado si estás usando React/Vue/etc.)
    const datosCompletos = await getRegistrosOrdenados(ci, orderByField);

    // Paginar los datos
    //const datosPaginados = paginarDatos(datosCompletos, pagina, tamañoPagina);
    return datosPaginados;
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
*/