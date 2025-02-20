import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  avatar: {
    type: String,
    default: '/default-avatar.png'
  },
  teamBadge: {
    type: String,
    default: null
  }
});

export default mongoose.model('User', userSchema);