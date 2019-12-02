const router = require("express").Router();
const workoutRoutes = require("./workouts");

// Book routes
router.use("/workouts", workoutRoutes);

module.exports = router;