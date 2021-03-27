const Container = require('../models/container');

// CREATE POST.
exports.container_create = (req, res, next) => {
  // Create a Container object using request params
  const container = new Container(
    {
      type: req.body.type,
      title: req.body.title,
      text: req.body.text,
      image_url: req.body.image_url,
      caption: req.body.caption,
    },
  );
  container.save((err, newContainer) => {
    if (err) { return next(err); }
    // Successful - send newly formed Id
    return res.send(newContainer);
  });
};

// DELETE POST.
exports.container_delete = (req, res, next) => {
  Container.findByIdAndRemove(req.params.id, (err) => {
    if (err) { return next(err); }
    // Success - set OK status
    return res.status(200).end();
  });
};

// UPDATE POST.
exports.container_update = (req, res, next) => {
  // Create a Container object with data and old id
  const container = new Container(
    {
      type: req.body.type,
      title: req.body.title,
      text: req.body.text,
      image_url: req.body.image_url,
      caption: req.body.caption,
      _id: req.params.id,
    },
  );

  // Update the record
  Container.findByIdAndUpdate(req.params.id, container, {}, (err) => {
    if (err) { return next(err); }
    // Successful - set OK status
    return res.status(200).end();
  });
};
