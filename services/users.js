const utils = require("../db/utils");
const bcrypt = require('bcrypt');

// Liste des functions que l'on souhaite 
// rendre visible à l'exterieur du module
module.exports = {
  create,
  authenticate
};
function create({username,password}, callback) {
  // @TODO: Verifier que les paratrès sont renseignés
 /* if(username ==null || password == null || lastname ==null ||email == null || firstname == null){
      return
  }*/
  bcrypt.hash(password, 10, (err, encryptedPasswordHash) => {

    var keep = encryptedPasswordHash;
    var verify = Math.floor((Math.random() * 10000000000000) + 1);
    const query = "INSERT INTO users ( username, encrypted_password, is_valide, confirmation_hash ) VALUES ($1, $2, $3 ,$4) RETURNING *";
    utils.executeQuery(query, [username,encryptedPasswordHash,false, verify], (err, result) => {
      if (err) {
        callback(true, err);
      } else {
        const createdUser = result.rows[0];
        delete createdUser.encrypted_password;
        callback(undefined, createdUser);
      }
    });

  }); 
}

function authenticate({ username, password }, callback) {
  
  utils.executeQuery("SELECT * FROM users WHERE username=$1", [username], (err, result) => {
    if (err) {
      callback(true, err);
    } 
    else 
    {
      const userFound = result.rows[0];
      bcrypt.compare(password, userFound.encrypted_password, function (err, result) {
        if (result == true) {
          delete userFound.encrypted_password; // On retire le password de l'objet user que l'on va retourner afin de pas risquer de l'exposer 
          callback(false, userFound);
        } else {
          callback(true, 'Incorrect password');
        }
      });
    }  

  });
}