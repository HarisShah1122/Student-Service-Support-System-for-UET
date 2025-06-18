const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const Departments = sequelize.define("Departments", {
  department_id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  department_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  department_head_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  contact_email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  contact_phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  building_name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  campus_map_location: {
    type: Sequelize.STRING,
  },
  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
}, {
  timestamps: false,
});

module.exports = Departments;