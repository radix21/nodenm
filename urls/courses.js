courses = require("../apps/courses");

module.exports = {
    set : function(app){
        app.post("/api/my_courses/", getMyCourses);
        app.get("/api/my_courses/", getMyCourses);

    }
}
