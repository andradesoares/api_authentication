const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  method: {
    type: String,
    enum: ['local', 'google', 'facebook', 'twitter'],
    required: true
  },
  local: {
    email: {
      type: String,
      lowercase: true
    },
    password: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false 
    }
  },
  google: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  facebook: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  twitter: {
    id: {
      type: String
    },
    email: {
      type: String,
      lowercase: true
    }
  },
  }, {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id
        if (ret.local) delete ret.local.password
        delete ret.__v
      }
    }
  }
)

userSchema.pre('save', async function save(next) {
  if (this.method !== 'local') next()

  if (!this.isModified('local.password')) next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.local.password = await bcrypt.hash(this.local.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.local.password);
};

const User = mongoose.model('user', userSchema)

module.exports = User