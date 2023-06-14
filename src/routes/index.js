//const { Router } = require('express');
//const Router = require('express');
const express = require('express');
const router = express.Router(); // El mismo manejo de rutas pero con el método Router de express
const Task = require('../models/tasks');//utilizar el arhivo tasks.js

//Rutas o EndPoints
router.get('/', async (req, res) => {
    //Generar un arreglo de registros con todos los documentos de l acoleccion Tasks
  const tasks = await Task.find();
  res.render('index', {
    tasks
  });
});
//Agregar una tarea
router.post('/add', async (req, res, next) => {
  const task = new Task(req.body);
  await task.save();
  res.redirect('/');
});
//Busca por Id de la tarea y cambia el estado(true o false)
router.get('/turn/:id', async (req, res, next) => {
  let { id } = req.params;
  const task = await Task.findById(id);
  task.status = !task.status;
  await task.save();
  res.redirect('/');
});

//Busca una tarea por Id e invoca la vista para modificar la informacion
router.get('/edit/:id', async (req, res, next) => {
  const task = await Task.findById(req.params.id);
  console.log(task)
  res.render('edit', { task });
});
// Editar(actualiza) la info de la tarea
router.post('/edit/:id', async (req, res, next) => {
  const { id } = req.params;
  await Task.updateOne({_id:id}, req.body);
  res.redirect('/');
});
//Elimina una tarea por
router.get('/delete/:id', async (req, res, next) => {
  const { id } = req.params;
  await Task.deleteOne({ _id: id });
  res.redirect('/');
});

router.get('/edit',(req,res)=>{
  res.render('editar')
})

module.exports = router;
