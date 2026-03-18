const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Base de datos en memoria
let projects = [
{ id: 1, name: 'Mi App Angular', stars: 5 },
{ id: 2, name: 'Mi API Express', stars: 8 },
{ id: 3, name: 'Portfolio Web', stars: 4 },
{ id: 4, name: 'Portfolio', stars: 3 },
];

let nextId = 4;

// GET / - Bienvenida
app.get('/', (req, res) => {
res.json({ message: 'Bienvenido a la API de Proyectos' });
});

// GET /projects - Ver todos los proyectos
app.get('/projects', (req, res) => {
res.json(projects);
});

// GET /projects/:id - Ver un proyecto específico
app.get('/projects/:id', (req, res) => {
const project = projects.find(p => p.id === parseInt(req.params.id));

if (!project) {
return res.status(404).json({ error: 'Proyecto no encontrado' });
}

res.json(project);
});

// POST /projects - Crear un proyecto
app.post('/projects', (req, res) => {
const { name, stars } = req.body;

if (!name) {
return res.status(400).json({ error: 'El campo "name" es requerido' });
}

const newProject = {
id: nextId++,
name,
stars: stars || 0,
};

projects.push(newProject);
res.status(201).json(newProject);
});

// PATCH /projects/:id - Actualizar un proyecto
app.patch('/projects/:id', (req, res) => {
const index = projects.findIndex(p => p.id === parseInt(req.params.id));

if (index === -1) {
return res.status(404).json({ error: 'Proyecto no encontrado' });
}

projects[index] = { ...projects[index], ...req.body };
res.json(projects[index]);
});

// DELETE /projects/:id - Eliminar un proyecto
app.delete('/projects/:id', (req, res) => {
const index = projects.findIndex(p => p.id === parseInt(req.params.id));

if (index === -1) {
return res.status(404).json({ error: 'Proyecto no encontrado' });
}

const deleted = projects.splice(index, 1);
res.json({ message: 'Proyecto eliminado', project: deleted[0] });
});

app.listen(PORT, () => {
console.log(`Servidor corriendo en http://localhost:${PORT}`);
});