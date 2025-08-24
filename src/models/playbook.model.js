const mongoose = require('mongoose');

const playbookSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: false,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  variables: {
    type: Map,
    of: String,
    default: {}
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  }
}, {
  timestamps: true
});

// Add indexes
playbookSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Playbook', playbookSchema);
