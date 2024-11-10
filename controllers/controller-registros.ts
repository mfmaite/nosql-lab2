import { equalTo, orderByChild, get, ref, query } from 'firebase/database';
import { ApiError, errors, orderByDate } from '../utils/index.js';
import BD_REFERENCES from '../networking/references.js';
import firebaseClient from '../config/firebase.js';

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