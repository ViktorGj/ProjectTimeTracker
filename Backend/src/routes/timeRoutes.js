const router = require('express').Router();
const { json } = require('express');
const fs = require('fs');
const uuid = require('uuid');
const projects = require('../data/projects.json');

// GET times for project
router.get('', (req, res) => {
  const projectId = req.projectId;
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    res.send({ error: 'Project not found' });
    res.status(404);
    return;
  }

  if (!project.times.length) {
    res.send({ error: 'Times not found' });
    res.status(404);
    return;
  }

  res.send(project.times);
});

// POST time
router.post('', (req, res) => {
  const projectId = req.projectId;
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    res.send({ error: 'Project not found' });
    res.status(404);
    return;
  }

  const uid = uuid.v4();
  const newTime = { id: uid, ...req.body };

  project.times.push(newTime);
  const data = JSON.stringify(projects, null, 2);

  fs.writeFile('src/data/projects.json', data, (err) => {
    if (err) throw err;
    res.status(200);
    console.log('Time ADDED');
  });
});

// DELETE time
router.delete('/:id', (req, res) => {
  const timeId = req.params.id;
  const projectId = req.projectId;
  const project = projects.find((p) => p.id === projectId);
  const projectIndex = projects.findIndex((p) => p.id === projectId);

  if (!project) {
    res.send({ error: 'Project not found' });
    res.status(404);
    return;
  }

  if (!project.times) {
    res.send({ error: 'Times not found' });
    res.status(404);
    return;
  }

  index = project.times.findIndex((t) => t.id === timeId);

  if (index < 0) {
    res.send({ error: 'Time not found' });
    res.status(404);
    return;
  }

  project.times.splice(index, 1);

  projects[projectIndex] = project;
  const data = JSON.stringify(projects, null, 2);

  fs.writeFile('src/data/projects.json', data, (err) => {
    if (err) throw err;
    res.status(200);
    console.log('Time REMOVED');
  });
});

module.exports = router;
