const Departments = require("../models/departments");

const app = require("express")();

app.get("/departments", async (req, res) => {
  try {
    const departments = await Departments.findAll();
    res.status(200).json({ data: departments });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch departments",
      details: error.message,
    });
  }
});

app.post("/departments", async (req, res) => {
  try {
    const department = await Departments.create({
      department_name: req.body.department_name,
      department_head_id: req.body.department_head_id,
      description: req.body.description,
      contact_email: req.body.contact_email,
      contact_phone: req.body.contact_phone,
      building_name: req.body.building_name,
      campus_map_location: req.body.campus_map_location,
    });
    res.status(201).json({ data: department });
  } catch (error) {
    res.status(500).json({
      error: "Failed to create department",
      details: error.message,
    });
  }
});

app.get("/departments/:id", async (req, res) => {
  try {
    const department = await Departments.findByPk(req.params.id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    res.status(200).json({ data: department });
  } catch (error) {
    res.status(500).json({
      error: "Failed to fetch department",
      details: error.message,
    });
  }
});

app.put("/departments/:id", async (req, res) => {
  try {
    const department = await Departments.findByPk(req.params.id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    await department.update({
      department_name: req.body.department_name,
      department_head_id: req.body.department_head_id,
      description: req.body.description,
      contact_email: req.body.contact_email,
      contact_phone: req.body.contact_phone,
      building_name: req.body.building_name,
      campus_map_location: req.body.campus_map_location,
    });
    res.status(200).json({ data: department });
  } catch (error) {
    res.status(500).json({
      error: "Failed to update department",
      details: error.message,
    });
  }
});

app.delete("/departments/:id", async (req, res) => {
  try {
    const department = await Departments.findByPk(req.params.id);
    if (!department) {
      return res.status(404).json({ error: "Department not found" });
    }
    await department.destroy();
    res.status(200).json({ message: "Department deleted successfully" });
  } catch (error) {
    res.status(500).json({
      error: "Failed to delete department",
      details: error.message,
    });
  }
});

module.exports = app;