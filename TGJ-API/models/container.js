const { until } = require('async');
var mongoose = require('mongoose');

var Schema = mongoose.Schema;

// Base function that allows extensions.
function BaseSchema() {
    Schema.apply(this, arguments);

    this.add({
        type: {type: String, required: true, enum: ['Text', 'Image'], default: 'Text'}
    });
}
until.inherits(BaseSchema, Schema);


var ContainerSchema = new BaseSchema();
var TextContainerSchema = new BaseSchema({ 
    text: {type: String, required: true} 
});
var ImageContainerSchema = new BaseSchema({
    image_url: {type: String, required: true},
    caption: {type: String}
});


//Export models
var Container =  mongoose.model('Container', ContainerSchema);
module.exports = Container.discriminator('TextContainer', TextContainerSchema);
module.exports = Container.discriminator('ImageContainer', ImageContainerSchema);