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

let nextId = 6;

// GET / - Bienvenida
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de Experiences' });
});

// GET Ver todas las experiences
app.get('/experiences', (req, res) => {
  res.json(experiences);
});

// GET Ver una experience específica
app.get('/experiences/:id', (req, res) => {
  const experience = experiences.find(p => p.id === parseInt(req.params.id));

  if (!experience) {
    return res.status(404).json({ error: 'There is no experience' });
  }

  res.json(experience);
});

// POST Crear una experience
app.post('/experiences', (req, res) => {
  const { company, role, endDate, tech, highlights } = req.body;

  if (!company || !role) {
    return res.status(400).json({ error: 'Los campos "company" y "role" son requeridos' });
  }

  const newExperience = {
    id: nextId++,
    company,
    role,
    endDate: endDate || '',
    tech: tech || [],
    highlights: highlights || [],
  };

  experiences.push(newExperience);
  res.status(201).json(newExperience);
});

// PATCH Actualizar una experience
app.patch('/experiences/:id', (req, res) => {
  const index = experiences.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Experience no encontrada' });
  }

  experiences[index] = { ...experiences[index], ...req.body };
  res.json(experiences[index]);
});

// DELETE Eliminar una experience
app.delete('/experiences/:id', (req, res) => {
  const index = experiences.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: 'Experience no encontrada' });
  }

  const deleted = experiences.splice(index, 1);
  res.json({ message: 'Experience eliminada', experience: deleted[0] });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});