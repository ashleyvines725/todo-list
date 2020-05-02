





DROP TABLE IF EXISTS tache;
CREATE TABLE tache(
  id SERIAL PRIMARY KEY,
  name VARCHAR,
  id_liste SERIAL,
  liste_name VARCHAR,
  username VARCHAR,
  description VARCHAR,
  created_at timestamp default current_timestamp
);

INSERT INTO tache (name, description) VALUES 
('manger des pommes', '2 pinkys ladies par jour');


-- INSERT Users
DROP TABLE IF EXISTS users;

CREATE TABLE users (  
  id SERIAL PRIMARY KEY,
  username VARCHAR,
  encrypted_password VARCHAR(60),
  is_valide BOOLEAN,
  confirmation_hash VARCHAR(60),
  created_at timestamp default current_timestamp
);

 