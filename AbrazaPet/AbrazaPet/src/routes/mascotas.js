const express = require('express');
const router = express.Router();

const conn = require('../database');



  router.get('/mismas/:id_usuario', (req,res) =>{ 
    const { id_usuario } = req.params;
    conn.query('Select * from mascota WHERE id_usuario = ?', [id_usuario], (err, resp, campos) => {
        if(!err){
            res.render("mismas.ejs",{
                mascotas:resp
            })
        }else{
            console.log(err);
        }
    });
});



router.get('/addmas', function (req,res) {
    conn.query("select * from usuario",(error, resp, fields) => {
            if (error) throw error;
            res.render("addmascota.ejs",{  
                usuario:resp
            })
    })
});

router.post('/mascota',(req, res) => { 
    const {id_usuario,nombre_mascota, id_sexo, id_tipo_animal, descripcion_mascota, color_mascota, imagen_mascota} = req.body;
    conn.query('insert into mascota set?',{
        id_usuario : "1",
        nombre_mascota : nombre_mascota,
        id_sexo : id_sexo,
        id_tipo_animal : id_tipo_animal,
        descripcion_mascota : descripcion_mascota,
        color_mascota : color_mascota,
        imagen_mascota : nombre_mascota + ".jpg"
    },(err,resp,campos) =>{
        if(!err) {
            res.redirect("/addmas");
          } else {
            console.log(err);
          }
    });
});

module.exports = router;