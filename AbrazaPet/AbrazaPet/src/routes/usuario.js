const express = require('express');
const router = express.Router();

const conn = require('../database');


router.get('/user', function (req,res) {
    conn.query("select * from usuario",(error, resp, fields) => {
            if (error) throw error;
            res.render("usuario.ejs",{  
                usuario:resp,
            })
    })
});


module.exports = router;