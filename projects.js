const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Base de datos en memoria
let experiences = [
{ id: 1, company:'Apple', role:'Software Developer', endDate:'12/10/2019', tech:['Angular','Python','HTML'], highlights:['Developed responsive web interfaces using Angular and HTML', 'Built backend scripts in Python to automate internal processes', 'Collaborated with cross-functional teams to deliver scalable features']},
{ id: 2, company:'Microsoft', role:'Backend Developer', endDate:'02/03/2021', tech:['Angular','Python','HTML', 'C'], highlights:['Designed RESTful APIs for internal services', 'Improved backend performance using optimized Python and C modules', 'Implemented secure data processing pipelines']},
{ id: 3, company:'Samsung', role:'Programmer', endDate:'04/08/2023', tech:['Angular','Python','HTML', 'C', 'C++'], highlights:['Developed cross-platform applications using C++', 'Optimized system performance through low-level programming in C', 'Maintained and improved legacy codebases']},
{ id: 4, company:'Tigo', role:'Frontend Developer', endDate:'06/08/2024', tech:['Angular','Python','HTML', 'C', 'C++', 'Javascript'], highlights:['Built dynamic user interfaces with Angular and JavaScript', 'Improved UI performance and responsiveness across devices', 'Integrated frontend applications with REST APIs']},
{ id: 5, company:'Microsoft', role:'Programmer', endDate:'10/11/2025', tech:['Angular','Python','HTML', 'C', 'C++', 'Javascript', 'Bootstrap'], highlights:['Developed full-stack web applications using Angular and Bootstrap', 'Enhanced user experience through responsive design principles', 'Collaborated in agile teams to deliver scalable software solutions']},
];

let nextId = 4;

// GET / - Bienvenida
app.get('/', (req, res) => {
res.json({ message: 'Bienvenido a la API de Proyectos' });
});

// GET /projects - Ver todos los proyectos
app.get('/experience', (req, res) => {
res.json(experiences);
});

// GET /projects/:id - Ver un proyecto específico
app.get('/experience/:id', (req, res) => {
const experiences = experiences.find(p => p.id === parseInt(req.params.id));

if (!experiences) {
return res.status(404).json({ error: 'There is no experience' });
}

res.json(experiences);
});

// POST /projects - Crear un proyecto
app.post('/experience', (req, res) => {
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