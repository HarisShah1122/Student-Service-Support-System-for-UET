const { Sequelize } = require("sequelize");
const sequelize = require("../config/database");

const AcademicCalendar = sequelize.define("AcademicCalendar", {
  eventName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  semester: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  location: {
    type: Sequelize.STRING,
  },
  isHoliday: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  durationDays: {
    type: Sequelize.INTEGER,
  },
  createdBy: {
    type: Sequelize.STRING,
  },
  lastUpdated: {
    type: Sequelize.DATE,
  },
}, {
  timestamps: true,
});

module.exports = AcademicCalendar;