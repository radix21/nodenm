courses = require("../apps/courses");
module.exports = {
    set : function(app){
        app.get("/api/courses/my_courses/", getMyCourses);
        app.get("/api/courses/public_courses/", getPublicCourses);
        app.get("/api/courses/all_courses",  getAllCourses);
        app.get("/api/courses/related_courses/:slug", related_courses);
        app.get("/api/courses/completed_courses", completed_courses);
        app.get("/api/courses/available_courses", available_courses);
        app.get("/api/courses/next_courses", next_courses);
        app.get("/all_courses", allCoursesViews);
        app.get("/course/:slug/details", courseDetails);
        app.get("/course/:slug", courseView);
        app.get("/api/course/:slug", course_data_student);
        app.get("/api/certifications/my_certifications", my_certifications);
        app.get("/api/course/inscribe/:user/:slug", inscribe_on_course);
    }
}


