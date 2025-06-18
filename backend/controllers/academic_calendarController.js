const AcademicCalendar = require("./academic_calendar");

const app = require("express")();

app.get("/academic-calendar", async (req, res) => {
  try {
    const calendars = await AcademicCalendar.findAll();
    res.status(200).json({ data: calendars });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to fetch academic calendars",
      details: error.message,
    });
  }
});

app.post("/academic-calendar", async (req, res) => {
  try {
    const calendar = await AcademicCalendar.create({
      eventName: req.body.eventName,
      date: req.body.date,
      description: req.body.description,
      semester: req.body.semester,
      location: req.body.location,
      isHoliday: req.body.isHoliday,
      durationDays: req.body.durationDays,
      createdBy: req.body.createdBy,
    });
    res.status(201).json({ data: calendar });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to create academic calendar",
      details: error.message,
    });
  }
});

app.get("/academic-calendar/:id", async (req, res) => {
  try {
    const calendar = await AcademicCalendar.findByPk(req.params.id);
    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }
    res.status(200).json({ data: calendar });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to fetch calendar",
      details: error.message,
    });
  }
});

app.put("/academic-calendar/:id", async (req, res) => {
  try {
    const calendar = await AcademicCalendar.findByPk(req.params.id);
    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }
    await calendar.update(req.body);
    res.status(200).json({ data: calendar });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to update calendar",
      details: error.message,
    });
  }
});

app.delete("/academic-calendar/:id", async (req, res) => {
  try {
    const calendar = await AcademicCalendar.findByPk(req.params.id);
    if (!calendar) {
      return res.status(404).json({ error: "Calendar not found" });
    }
    await calendar.destroy();
    res.status(200).json({ message: "Calendar deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Failed to delete calendar",
      details: error.message,
    });
  }
});

module.exports = app;