const express = require('express');
const router = express.Router();
const {
  createPlaybook,
  getPlaybooks,
  getPlaybook,
  updatePlaybook,
  deletePlaybook
} = require('../controllers/playbook.controller');

// Create new playbook
router.post('/', createPlaybook);

// Get all playbooks
router.get('/', getPlaybooks);

// Get single playbook
router.get('/:id', getPlaybook);

// Update playbook
router.put('/:id', updatePlaybook);

// Delete playbook
router.delete('/:id', deletePlaybook);

module.exports = router;
