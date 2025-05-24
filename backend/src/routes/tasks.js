const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const auth = require('../middleware/auth');

const prisma = new PrismaClient();

// Get all tasks for logged-in user
router.get('/tasks', auth, async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.userId
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching tasks' });
  }
});

// Create new task
router.post('/tasks', auth, async (req, res) => {
  try {
    const { title, status } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        status: status || 'PENDING',
        userId: req.user.userId
      }
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Error creating task' });
  }
});

module.exports = router; 