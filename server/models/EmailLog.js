const mongoose = require('mongoose');

const emailLogSchema = new mongoose.Schema({
  jobId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true,
  },
  candidates: [{ type: String, required: true }],
  sentAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('EmailLog', emailLogSchema);
