courses = require("../apps/courses");

module.exports = {
    set : function(app){
        app.post("/api/my_courses/", getMyCourses);
        app.post("/api/public_courses/", getPublicCourses);
        app.post("/api/all_courses",  getAllCourses);
        app.get("/all_courses", allCoursesViews);
        app.get("/course/:slug/details", courseDetails);
    }
}
