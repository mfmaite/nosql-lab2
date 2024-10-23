function sql_consultar_pacientes() {
    // esto no funciona. Es solo un ejemplo
    const sql = "SELECT * FROM pacientes";
    const rows = mysql.query(sql); // rows = [{nombre: "Juan", apellido: "Perez"}, {nombre: "Maria", apellido: "Gomez"}]
    return rows;
}

module.exports = { sql_consultar_pacientes };