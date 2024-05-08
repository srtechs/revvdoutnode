const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const sequelize = db.sequelize;

exports.create = async (req, res) => {
  // Validate request
  if (!req.body.cognitoId) {
    res.status(400).send({
      message: "cognitoId field cannot be empty!",
    });
    return;
  }

  const oldUser = await User.findOne({
    where: { cognitoId: req.body.cognitoId },
  });

  if (oldUser !== null) {
    res.status(400).send({
      message: `User already exists with cognitoId = ${cognitoId}`,
    });
    return;
  }

  const user = {
    name: req.body.name,
    cognitoId: req.body.cognitoId,
    email: req.body.email,
    password: req.body.password,
    age: req.body.age,
    phone: req.body.phone,
    socialMedia: req.body.socialMedia,
    check1: req.body.check1,
    check2: req.body.check2,
    street: req.body.street,
    streetNo: req.body.streetNo,
    street2: req.body.street2,
    zipCode: req.body.zipCode,
    city: req.body.city,
    country: req.body.country,
    intlPrefix1: req.body.intlPrefix1,
    intlPrefix2: req.body.intlPrefix2,
    intlPrefix3: req.body.intlPrefix3,
    prefix1: req.body.prefix1,
    prefix2: req.body.prefix2,
    prefix3: req.body.prefix3,
    fax: req.body.fax,
    mobilePhone: req.body.mobilePhone,
    role: req.body.role,
  };
  // Save user in the database
  User.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
};
exports.findAll = (req, res) => {
  // const title = req.query.title;
  // var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  // Car.findAll({ where: condition })
  User.findAll()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving communities.",
      });
    });
};

exports.update = (req, res) => {
  const cognitoId = req.params.cognitoId;

  User.update(req.body, {
    where: { cognitoId: cognitoId },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

exports.findSelected = (req, res) => {
  let condition = {};
  const make = req.query.make;
  const model = req.query.model;
  const production_years = req.query.productionYear;
  if (make && model && production_years) {
    condition = {
      make: make,
      model: model,
      production_years: production_years,
    };
  } else if (make && model) {
    condition = { make: make, model: model };
  } else if (make) {
    condition = { make: make };
  }

  User.findAll({
    where: condition,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving communities.",
      });
    });
};

// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};

exports.updateLikes = (req, res) => {
  const id = req.body.id;

  User.update({ likes: sequelize.literal("likes + 1") }, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Likes updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Likes with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Likes with id=" + id,
      });
    });
};

exports.updateDislikes = (req, res) => {
  const id = req.body.id;

  User.update({ likes: sequelize.literal("likes - 1") }, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Like removed successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Likes with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Likes with id=" + id,
      });
    });
};

exports.updateViews = (req, res) => {
  const id = req.body.id;

  User.update({ views: sequelize.literal("views + 1") }, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Views updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Views with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Views with id=" + id,
      });
    });
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Car was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Car with id=${id}. Maybe Car was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Car with id=" + id,
      });
    });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Car were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Cars.",
      });
    });
};

exports.findByCognitoId = (req, res) => {
  const cognitoId = req.query.cognitoId;
  User.findOne({ where: { cognitoId: cognitoId } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving User.",
      });
    });
};
