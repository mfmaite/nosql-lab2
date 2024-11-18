import { getDatabase, ref, get, query, orderByChild, equalTo, DataSnapshot, Query, DatabaseReference, QueryConstraint } from 'firebase/database';
import { ApiError, errors, orderByDate } from '../utils/index.js';
import BD_REFERENCES from '../networking/references.js';
import firebaseClient from '../config/firebase.js';

interface Registro {
    tipo: 'Consulta' | 'Examen' | 'Internacion';
    diagnostico: string;
    medico: string;
    institucion: string;
}

interface GetRegistrosOrdenadosParams {
    tipo?: 'Consulta' | 'Examen' | 'Internacion';
    diagnostico?: string;
    medico?: string;
    institucion?: string;
}

async function getRegistrosOrdenados({ tipo, diagnostico, medico, institucion }: {
    tipo?: 'Consulta' | 'Examen' | 'Internacion',
    diagnostico?: string,
    medico?: string,
    institucion?: string
}) {
    try {
        const registrosRef = ref(firebaseClient, BD_REFERENCES.registro);
        const filtroExiste: QueryConstraint[] = [];
        let dbQuery: DatabaseReference | Query = registrosRef;
        if (tipo) {
            filtroExiste.push(orderByChild('tipo'), equalTo(tipo));
            dbQuery = query(registrosRef, orderByChild('tipo'), equalTo(tipo));
            // Obtenemos los datos del nodo consultado
            const snapshot = await get(dbQuery);

            if (!snapshot.exists()) {
                return [];
            }

            // Convertimos el snapshot a un array de `Registro`
            const registros: Registro[] = [];
            snapshot.forEach((childSnapshot: DataSnapshot) => {
                const data = childSnapshot.val();
                if (data) {
                    registros.push(data as Registro); // Aquí hacemos el cast explícito al tipo Registro.
                }
            });
            return    registros.filter(registro =>
                (!diagnostico || registro.diagnostico === diagnostico) &&
                (!medico || registro.medico === medico) &&
                (!institucion || registro.institucion === institucion)
            );
        }
        else if (diagnostico) {
            filtroExiste.push(orderByChild('diagnostico'), equalTo(diagnostico));
            dbQuery = query(registrosRef, orderByChild('diagnostico'), equalTo(diagnostico));
            // Obtenemos los datos del nodo consultado
            const snapshot = await get(dbQuery);

            if (!snapshot.exists()) {
                return [];
            }

            // Convertimos el snapshot a un array de `Registro`
            const registros: Registro[] = [];
            snapshot.forEach((childSnapshot: DataSnapshot) => {
                const data = childSnapshot.val();
                if (data) {
                    registros.push(data as Registro); // Aquí hacemos el cast explícito al tipo Registro.
                }
            });
            return registros.filter(registro =>
                (!tipo || registro.tipo === tipo) &&
                (!medico || registro.medico === medico) &&
                (!institucion || registro.institucion === institucion)
            );
        }
        else if (medico) {
            filtroExiste.push(orderByChild('medico'), equalTo(medico));
            dbQuery = query(registrosRef, orderByChild('medico'), equalTo(medico));
            // Obtenemos los datos del nodo consultado
            const snapshot = await get(dbQuery);

            if (!snapshot.exists()) {
                return [];
            }

            // Convertimos el snapshot a un array de `Registro`
            const registros: Registro[] = [];
            snapshot.forEach((childSnapshot: DataSnapshot) => {
                const data = childSnapshot.val();
                if (data) {
                    registros.push(data as Registro); // Aquí hacemos el cast explícito al tipo Registro.
                }
            });

            return registros.filter(registro =>
                (!tipo || registro.tipo === tipo) &&
                (!diagnostico || registro.diagnostico === diagnostico) &&
                (!institucion || registro.institucion === institucion)
            );
        }
        else if (institucion) {
            filtroExiste.push(orderByChild('institucion'), equalTo(institucion));
            dbQuery = query(registrosRef, orderByChild('institucion'), equalTo(institucion));
            // Obtenemos los datos del nodo consultado
            const snapshot = await get(dbQuery);

            if (!snapshot.exists()) {
                return [];
            }

            // Convertimos el snapshot a un array de `Registro`
            const registros: Registro[] = [];
            snapshot.forEach((childSnapshot: DataSnapshot) => {
                const data = childSnapshot.val();
                if (data) {
                    registros.push(data as Registro); // Aquí hacemos el cast explícito al tipo Registro.
                }
            });

            return registros.filter(registro =>
                (!tipo || registro.tipo === tipo) &&
                (!diagnostico || registro.diagnostico === diagnostico) &&
                (!medico || registro.institucion === institucion)
            );
        }
        else {
            /* if (filtroExiste.length > 0) {
                dbQuery = query(registrosRef, ...filtroExiste); // Ahora es seguro.
            } */
            const q = query(registrosRef,...filtroExiste)
            const snapshot = await get(q);
            return {
                status: 200,
                data: snapshot.exists() ? orderByDate(snapshot.val()) : 'No existen registros que mostrar con estos criterios',
            };
        }
        const snapshot = await get(dbQuery);
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