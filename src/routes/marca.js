const express = require('express');
const router = express.Router();

const pool = require('../database.js');

// Obtener todos los registros   


router.get('/' , async (req, res) => {
    let listMarcas = await pool.query('SELECT * FROM marca');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listMarcas: listMarcas
    });
});

// Obtener un registro por su id

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    let marca = await pool.query('SELECT * FROM marca WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado la marca",
        marca: marca
    });
});

// Creacion de un registro

router.post('/create', async(req,res)=> {
    const { name } = req.body;

    const marca = {
        name
    };
    await pool.query('INSERT INTO marca SET ?', [marca]);
    res.json({
        status: 200,
        message: "Se ha registrado exitosamente!",
        marca:marca
    });
});

// Actualización de un registro

router.post('update/:id', async(req,res)=>{
    const { id } = req.params;
    const { name } = req.body;

    const marca = { name };

    await pool.query('UPDATE marca SET ? WHERE id = ? ', [marca, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        marca:marca
    });
});




module.exports = router;