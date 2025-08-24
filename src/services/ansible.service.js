const YAML = require('yaml');
const { exec } = require('child_process');
const util = require('util');
const logger = require('../utils/logger');

const execPromise = util.promisify(exec);

// Validate Playbook content
exports.validatePlaybook = async (content) => {
  try {
    // First validate YAML syntax
    try {
      YAML.parse(content);
    } catch (error) {
      return {
        valid: false,
        errors: [{
          message: 'Invalid YAML syntax',
          details: error.message
        }]
      };
    }

    // Create temporary file for ansible-playbook validation
    const tempFile = `/tmp/playbook-${Date.now()}.yml`;
    await require('fs').promises.writeFile(tempFile, content);

    // Validate with ansible-playbook
    try {
      await execPromise(`ansible-playbook --syntax-check ${tempFile}`);
      return { valid: true };
    } catch (error) {
      return {
        valid: false,
        errors: [{
          message: 'Invalid Ansible Playbook syntax',
          details: error.stderr
        }]
      };
    } finally {
      // Cleanup temp file
      await require('fs').promises.unlink(tempFile);
    }
  } catch (error) {
    logger.error('Error validating playbook:', error);
    throw error;
  }
};

// Generate Playbook from template
exports.generatePlaybook = async (template, variables) => {
  try {
    // Apply variables to template
    let content = template;
    Object.entries(variables).forEach(([key, value]) => {
      content = content.replace(new RegExp(`{{${key}}}`, 'g'), value);
    });

    // Validate generated playbook
    const validationResult = await this.validatePlaybook(content);
    if (!validationResult.valid) {
      throw new Error('Generated playbook is invalid');
    }

    return content;
  } catch (error) {
    logger.error('Error generating playbook:', error);
    throw error;
  }
};
