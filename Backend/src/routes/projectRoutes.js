const router = require('express').Router();
const { json } = require('express');
const fs = require('fs');
const uuid = require('uuid');
const times = require('./timeRoutes');

const projects = require('../data/projects.json');

router.use(
  '/:projectId/times',
  (req, res, next) => {
    req.projectId = req.params.projectId;
    next();
  },
  times
);

// GET project
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    res.send({ error: 'Project not found' });
    res.status(404);
    return;
  }

  res.send(project);
  res.status(200);
});

// GET projects
router.get('', (req, res) => {
  res.send(projects);
  console.log(projects);
});

// POST project
router.post('', (req, res) => {
  const uid = uuid.v4();
  const newProject = { id: uid, ...req.body };
  projects.push(newProject);
  const data = JSON.stringify(projects, null, 2);

  fs.writeFile('src/data/projects.json', data, (err) => {
    if (err) throw err;
    res.status(200);
    console.log('Project ADDED');
  });
});

// UPDATE project
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;
  const project = update ? projects.find((p) => p.id === id) : null;

  if (!update) {
    res.send({ error: 'Bad request' });
    res.status(400);
    return;
  }

  if (!project) {
    res.send({ error: 'Project not found' });
    res.status(404);
    return;
  }

  const index = projects.findIndex((p) => p.id == id);
  if (index < 0) {
    res.send({ error: 'Server error' });
    res.status(500);
    return;
  }

  projects[index] = { id, ...update };
  const data = JSON.stringify(projects, null, 2);

  fs.writeFile('src/data/projects.json', data, (err) => {
    if (err) throw err;
    res.status(200);
    console.log('Project UPDATED');
  });
});

// DELETE project
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  index = projects.findIndex((p) => p.id === id);

  if (index < 0) {
    res.send({ error: 'Project not found' });
    res.status(404);
    return;
  }

  projects.splice(index, 1);

  const data = JSON.stringify(projects, null, 2);

  fs.writeFile('src/data/projects.json', data, (err) => {
    if (err) throw err;
    res.status(200);
    console.log('Project REMOVED');
  });
});

module.exports = router;
