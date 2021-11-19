const express = require('express');
const router = express.Router();

const pool = require('../database.js');

router.get('/' , async (req, res) => {
    let listAutos = await pool.query('SELECT * FROM autos');
    res.json({
        status: 200,
        message: "Se ha listado correctamente",
        listAutos:listAutos
    });
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    let auto = await pool.query('SELECT * FROM autos WHERE id = ?', [id]);
    res.json({
        status: 200,
        message: "Se ha encontrado la marca",
        auto:auto
    });
});

router.post('/create', async(req,res)=>{
    const { name, matricula, verificacion, marca } =req.body;
    var dateCreated = new Date().toISOString();
    const auto = {
        name, matricula, verificacion, registered: dateCreated, status: 1, marca
    };
    await pool.query('INSERT INTO autos SET ?', [auto]);
    res.json({
        status:200,
        message: "Se ha registrado correctamente",
        auto:auto
    });
});
router.post('update/:id', async(req,res)=>{
    const { id } = req.params;
    const { name, matricula, verificacion, marca } = req.body;

    const auto = { name, matricula, verificacion, marca };

    await pool.query('UPDATE autos SET ? WHERE id = ? ', [auto, id]);
    res.json({
        status: 200,
        message: "Se ha actualizado correctamente",
        auto:auto
    });
});

router.post('/delete/:id', (req, res) => {
    const { id } = req.params;

    pool.query('UPDATE autos SET status = 0  WHERE id = ?' , [id]);
    res.json({
        status: 200,
        message: "Se ha inactivado correctamente",
    });
})



module.exports = router;