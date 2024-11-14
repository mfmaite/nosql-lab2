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
        if (tipo) {
            filtroExiste.push(orderByChild('tipo'), equalTo(tipo));
        } 
        else if (diagnostico) {
            filtroExiste.push(orderByChild('diagnostico'), equalTo(diagnostico));
            if (medico) {
                //código para ordenar por el campo médico también
                if (institucion) {
                  //  código para ordenar por el campo institución
                }
            }
            else if (institucion) {
                //código para ordenar por el campo institución
            }
        }
        else if (medico) {
            filtroExiste.push(orderByChild('medico'), equalTo(medico));
            if (institucion) {
                //código para ordenar por el campo institución
            }
        }
        else if (institucion) {
            filtroExiste.push(orderByChild('institucion'), equalTo(institucion));
        }
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
import { equalTo, orderByChild, get, ref, query } from 'firebase/database';
import { ApiError, errors, orderByDate } from '../utils/index.js';
import BD_REFERENCES from '../networking/references.js';
import firebaseClient from '../config/firebase.js';

async function getRegistrosOrdenados({
    tipo,
    diagnostico,
    medico,
    institucion
}: {
    tipo?: 'Consulta' | 'Examen' | 'Internacion',
    diagnostico?: string,
    medico?: string,
    institucion?: string
}) {
    try {
        const registrosRef = ref(firebaseClient, BD_REFERENCES.registro);
        
        // Selección del criterio principal de filtro (el más restrictivo)
        let criterioPrincipal;
        let valorCriterioPrincipal;

        if (tipo) {
            criterioPrincipal = 'tipo';
            valorCriterioPrincipal = tipo;
        } else if (diagnostico) {
            criterioPrincipal = 'diagnostico';
            valorCriterioPrincipal = diagnostico;
        } else if (medico) {
            criterioPrincipal = 'medico';
            valorCriterioPrincipal = medico;
        } else if (institucion) {
            criterioPrincipal = 'institucion';
            valorCriterioPrincipal = institucion;
        }

        // Crear consulta con el criterio principal
        const q = query(registrosRef, orderByChild(criterioPrincipal), equalTo(valorCriterioPrincipal));
        const snapshot = await get(q);

        // Procesar los resultados en el cliente
        let registros = snapshot.exists() ? snapshot.val() : {};
        registros = Object.values(registros); // Convertir a un array para filtrado y ordenación

        // Aplicar filtros adicionales en el cliente
        if (diagnostico && criterioPrincipal !== 'diagnostico') {
            registros = registros.filter(registro => registro.diagnostico === diagnostico);
        }
        if (medico && criterioPrincipal !== 'medico') {
            registros = registros.filter(registro => registro.medico === medico);
        }
        if (institucion && criterioPrincipal !== 'institucion') {
            registros = registros.filter(registro => registro.institucion === institucion);
        }

        // Ordenar los registros por fecha en el cliente
        const registrosOrdenados = orderByDate(registros);

        return {
            status: 200,
            data: registrosOrdenados.length > 0 ? registrosOrdenados : 'No existen registros que mostrar con estos criterios'
        };
    } catch (error) {
        console.error('Error al consultar registros:', error);
        throw new ApiError(errors.ERROR_CONSULTA_CI);
    }
}

export { getRegistrosOrdenados };
*/