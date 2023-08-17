const express = require('express');
const router = express.Router();

const conn = require('../database');


router.get('/', (req, res) => { 
    conn.query('SELECT publicacion_animal.imagen_animal, publicacion_animal.descripcion_animal, publicacion_animal.nombre_animal, publicacion_animal.id_publicacion, tipo_estado.nombre_estado FROM publicacion_animal INNER JOIN tipo_estado ON tipo_estado.id_estado = publicacion_animal.id_estado;', (err, resp, campos) => {
        if (!err) {
            res.render("index.ejs", {
                publicaciones: resp
            })
        } else {
            console.log(err);
        }
    });
});


router.get('/adpub/:id_usuario', (req, res) => { 
    const { id_usuario } = req.params;
    conn.query('Select * from publicacion_animal WHERE id_usuario = ?', [id_usuario], (err, resp, campos) => {
        if (!err) {
            res.render("publicaciones.ejs", {
                publicaciones: resp
            })
        } else {
            console.log(err);
        }
    });
});


router.get('/addpub', function (req,res) {
    conn.query("select * from usuario",(error, resp, fields) => {
            if (error) throw error;
            res.render("addpub.ejs",{  
                usuario:resp
            })
    })
});

router.post('/publicacion',(req, res) => { 
    const {id_usuario, nombre_animal,descripcion_animal, id_estado, id_sexo, id_tipo_animal, imagen_animal} = req.body;
    conn.query('insert into publicacion_animal set?',{
        id_usuario : "1",
        nombre_animal : nombre_animal,
        descripcion_animal : descripcion_animal,
        id_estado : id_estado,
        id_sexo : id_sexo,
        id_tipo_animal : id_tipo_animal,
        imagen_animal : nombre_animal + ".jpg"
    },(err,resp,campos) =>{
        if(!err) {
            res.redirect("/addpub");
          } else {
            console.log(err);
          }
    });
});

module.exports = router;