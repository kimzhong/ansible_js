const Playbook = require('../models/playbook.model');
const logger = require('../utils/logger');
const { validatePlaybook } = require('../services/ansible.service');

// Create new playbook
exports.createPlaybook = async (req, res, next) => {
  try {
    const { name, description, content, variables } = req.body;

    // Validate playbook content
    const validationResult = await validatePlaybook(content);
    if (!validationResult.valid) {
      return res.status(400).json({
        error: {
          message: 'Invalid playbook content',
          details: validationResult.errors
        }
      });
    }

    const playbook = new Playbook({
      name,
      description,
      content,
      variables
    });

    const savedPlaybook = await playbook.save();
    logger.info(`New playbook created: ${savedPlaybook._id}`);

    res.status(201).json(savedPlaybook);
  } catch (error) {
    next(error);
  }
};

// Get all playbooks
exports.getPlaybooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const playbooks = await Playbook.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Playbook.countDocuments();

    res.json({
      playbooks,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (error) {
    next(error);
  }
};

// Get playbook by ID
exports.getPlaybook = async (req, res, next) => {
  try {
    const playbook = await Playbook.findById(req.params.id);
    if (!playbook) {
      return res.status(404).json({
        error: {
          message: 'Playbook not found'
        }
      });
    }
    res.json(playbook);
  } catch (error) {
    next(error);
  }
};

// Update playbook
exports.updatePlaybook = async (req, res, next) => {
  try {
    const { name, description, content, variables } = req.body;

    if (content) {
      // Validate new content
      const validationResult = await validatePlaybook(content);
      if (!validationResult.valid) {
        return res.status(400).json({
          error: {
            message: 'Invalid playbook content',
            details: validationResult.errors
          }
        });
      }
    }

    const playbook = await Playbook.findByIdAndUpdate(
      req.params.id,
      { name, description, content, variables },
      { new: true, runValidators: true }
    );

    if (!playbook) {
      return res.status(404).json({
        error: {
          message: 'Playbook not found'
        }
      });
    }

    logger.info(`Playbook updated: ${playbook._id}`);
    res.json(playbook);
  } catch (error) {
    next(error);
  }
};

// Delete playbook
exports.deletePlaybook = async (req, res, next) => {
  try {
    const playbook = await Playbook.findByIdAndDelete(req.params.id);

    if (!playbook) {
      return res.status(404).json({
        error: {
          message: 'Playbook not found'
        }
      });
    }

    logger.info(`Playbook deleted: ${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
