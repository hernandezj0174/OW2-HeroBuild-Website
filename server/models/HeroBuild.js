import mongoose from 'mongoose';

const BuildSchema = new mongoose.Schema({
  hero: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const Build = mongoose.model('Build', BuildSchema);
export default Build;
