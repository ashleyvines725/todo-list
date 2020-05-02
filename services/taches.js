const utils = require("../db/utils");

// Liste des functions que l'on souhaite 
// rendre visible à l'exterieur du module
module.exports = {
  getAll,
  getById,
  save,
  update,
  deleteById
};

// ---------------------------------
//  Function CRUD d'un Projet
// --------------------------------

// Retourne la liste des projets
function getAll(sortBy, callback) {
  let orderByString = "id DESC";

  switch (sortBy) {
    case "name_asc":
      orderByString = "name ASC";
      break;

    case "name_desc":
      orderByString = "name DESC";
      break;

    case "createdAt_asc":
      orderByString = "created_at ASC";
      break;

    case "createdAt_desc":
      orderByString = "created_at DESC";
      break;
  }

  const query = `SELECT id, name FROM tache ORDER BY ${orderByString} LIMIT 100`;
  utils.executeQuery(query, [], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, result.rows);
    }
  });
}

// Retourn le detail d'un projet
function getById(projectId, callback) {
  const query = "SELECT * FROM tache WHERE id=$1";
  utils.executeQuery(query, [projectId], (err, result) => {
    if (err) {
      callback(true, err);
    } else if (result.rows.length === 0) {
      callback(true, `Impossible de retrouver le projet ${projectId}`);
    } else {
      callback(undefined, result.rows[0]);
    }
  });
}
function save({ id, name, id_liste, liste_name,username, description }, callback) {
  const query = "INSERT INTO tache (id ,name ,id_liste ,liste_name ,username, description) VALUES ($1, $2 ,$3 ,$4 ,$5) RETURNING *";
  utils.executeQuery(query, [ id, name, id_liste, liste_name,username, description ], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, { projectId: result.rows[0].id });
    }
  });
}

// Mise à jour d'un projet en BD
function update({ projectId, name, description }, callback) {
  const query = "UPDATE tache SET name=$1, description=$2 WHERE id=$3 RETURNING *";
  utils.executeQuery(query, [name, description, projectId], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined, result.rows[0]);
    }
  });
}

// Supprimer un projet
function deleteById(projectId, callback) {
  const query = "DELETE FROM tache WHERE id=$1";
  utils.executeQuery(query, [projectId], (err, result) => {
    if (err) {
      callback(true, err);
    } else {
      callback(undefined);
    }
  });
}

