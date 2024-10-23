const { ref, get, query, orderByChild, equalTo } = require('firebase/database');
const { firebaseClient } = require('../config/firebase');

async function ciAlreadyExists(ci) {
  try {
    const q = query(ref(firebaseClient, 'pacientes'), orderByChild('ci'), equalTo(ci));
    const snapshot = await get(q);

    return snapshot.exists();
  } catch (error) {
    console.error('Error al consultar si el ci ya existe:', error);
    throw new Error('Error al consultar el ci en la base de datos');
  }
}

module.exports = { ciAlreadyExists };
