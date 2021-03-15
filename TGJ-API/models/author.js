const { DateTime } = require('luxon');

const mongoose = require('mongoose');

const { Schema } = mongoose;

const AuthorSchema = new Schema(
  {
    first_name: { type: String, required: true, maxlength: 100 },
    family_name: { type: String, required: true, maxlength: 100 },
    date_of_birth: { type: Date, default: null },
    bio: { type: String, default: null },
    date_joined: { type: Date, default: Date.now },
    pic_url: { type: String, default: null },
  },
);

// Index for name search
AuthorSchema.index({ first_name: 'text', family_name: 'text' });

// Virtual for author's full name
AuthorSchema
  .virtual('name')
  .get(function getName() {
    return `${this.family_name}, ${this.first_name}`;
  });

// Virtual for author's URL
AuthorSchema
  .virtual('url')
  .get(function getUrl() {
    return `/author/${this._id}`;
  });

// Virtual for author's Date of Birth formatted
AuthorSchema
  .virtual('date_of_birth_formatted')
  .get(function getDateFormatted() {
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
  });

// Export model
module.exports = mongoose.model('Author', AuthorSchema);
