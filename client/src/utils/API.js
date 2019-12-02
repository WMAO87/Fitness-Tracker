import axios from "axios";

export default {
    getWorkouts: function() {
        return axios.get("/api/workouts");
    },
    getWorkout: function(id) {
        return axios.get("/api/workouts/" + id);
    },
    deleteWorkout: function(id) {
        return axios.delete("/api/workouts/" + id);
    },
    saveWorkout: function(workoutData) {
        return axios.post("/api/workouts", workoutData);
    },
    updateWorkout: function(workoutData) {
        return axios.put("/api/workouts", workoutData);
    }
};