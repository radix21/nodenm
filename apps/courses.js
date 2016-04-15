/**
 * @api{get} /api/courses/my_courses Get my courses
 * @apiName getMyCourses
 * @apiDescription Get user Courses
 * @apiGroup Courses
 * @apiVersion 0.1.0
 *
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok,
 *      "courses" : {JSON[]}
 *  }
 * @apiErrorExample {Object} AuthenticationFailed:
 *  HTTP/1.1 400 ERROR
 *  {
 *      "status" : "failed",
 *      "message" : "User is not authenticated"
 *
 *  }
 *
 *  @apiErrorExample {Object} ServerError
 *  HTTP/1.1 500 ERROR
 *  {
 *      "status" : "error",
 *      "message" : "Server Error - check endpoint server"
 *  }
 *
 * */
getMyCourses = function(req, res){
    if(req.session.user == undefined || !req.session.user.logged){
        response = {
            "status" : "failed",
            "message" : "User is not authenticated"
        }
        res.send(response);
    }else{
        str = "";
        data = http.get(KME_API.my_courses(req.hostname)+"?token="+req.session.user.token+"&user="+req.session.user.info.username, function(response){
            response.on("error", function(err){
                response = {
                    "status" : "failed",
                "message" : err
                }
                res.status(400).send(response);
            });
            response.on("data", function(data){
                str += data;
            });
            response.on("end", function(){
                try{
                    response =  JSON.parse(str);
                    if(response.status == "ok"){

                        res.send(response);
                    }else{
                        res.status(400).send(response);
                    }
                }catch(err){
                    response = {
                        "status" : "error",
                "message" : "Server Error - check endpoint server"
                    }
                    res.status(500).send(response)
                }
            })
        });

        data.end();
    }

};
/**
 * @api{get} /api/courses/public_courses Get public courses
 * @apiName getPublicCourses
 * @apiDescription Get public courses list
 * @apiGroup Courses
 * @apiVersion 0.1.0
 *
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok,
 *      "courses" : {JSON[]}
 *  }
 *  @apiErrorExample {Object} ServerError
 *  HTTP/1.1 500 ERROR
 *  {
 *      "status" : "error",
 *      "message" : "Server Error - check endpoint server"
 *  }
 *
 * */

getPublicCourses = function(req, res){
    url = KME_API.public_courses(req.hostname);
    str = "";
    data = http.get(url, function(response){
        response.on("error", function(err){
            res.status(500).send(err);
        });
        response.on("data", function(data){
            str += data;
        });

        response.on("end", function(){
            try{
                res.send(JSON.parse(str));
            }catch(err){
                response = {
                    "status" : "error",
            "message" : "Server Error - check endpoint server"
                }
                res.status(500).send(response)

            }
        })

    });
    data.on("error", function(err){
        response = {
            "status" : "error",
            "message" : "check endpoint service - connection refused"
        }
        res.status(500).send(response);
    }).end();

}

/**
 * @api{get} /api/courses/all_courses Get all courses
 * @apiName getAllCourses
 * @apiDescription Get all courses list
 * @apiGroup Courses
 * @apiVersion 0.1.0
 *
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok,
 *      "courses" : {JSON[]}
 *  }
 *  @apiErrorExample {Object} ServerError
 *  HTTP/1.1 500 ERROR
 *  {
 *      "status" : "error",
 *      "message" : "Server Error - check endpoint server"
 *  }
 *
 * */

getAllCourses = function(req, res){
    url = KME_API.all_courses(req.hostname);
    str = "";
    data = http.get(url, function(response){
        response.on("error", function(err){
            res.status(500).send(err);
        });
        response.on("data", function(data){
            str += data;
        });

        response.on("end", function(){
            try{
                res.send(JSON.parse(str));
            }catch(err){
                response = {
                    "status" : "error",
            "message" : "Server Error - check endpoint server"
                }
                res.status(500).send(response)

            }
        })

    });
    data.end();

}
/**
 * @api{get} /all_courses AllCourses
 * @apiName allCoursesViews
 * @apiDescription Load all courses template
 * @apiGroup    Courses
 * @apiVersion  0.1.0
 *
 * @apiSuccess {Object[]} 200 Params related with user
 * @apiSuccessExample 
 * {
 *      status :  {String},
 *      courses : {JSON[]}
 * }
 **/

allCoursesViews = function(req, res){

    url = KME_API.all_courses(req.hostname);
    str = "";
    data = http.get(url, function(response){
        response.on("error", function(err){
            res.status(500).send(err);
        });
        response.on("data", function(data){
            str += data;
        });

        response.on("end", function(){
            try{
                courses =JSON.parse(str).courses;
                res.render(client_folder(req.hostname)+"courses/allcourses", {
                    courses : courses,
                    user : client_session(req),
                })

            }catch(err){
                response = {
                    "status" : "error",
            "message" : "Server Error - check endpoint server"
                }
                res.status(500).send(response)

            }
        })

    });
    data.end();


}

/**
 * @api{get} /course/:slug/details Course Details
 * @apiName  courseDetails
 * @apiDescription Load course details and allows render course details params
 * @apiGroup Courses
 * @apiVersion  0.1.0
 * @apiSuccess {JSON[]} 200 params related with course information
 * @apiSuccessExample success-response
 * HTTP/1.1 200 OK
 *  params = {
 *      course : {JSON},
 *      user :  {JSON}
 *
 *  }
 *
 **/
courseDetails = function(req, res){
    course = "";
    data = http.get(KME_API.course_details(req.hostname)+"/"+req.params.slug, function(response){
        response.on("error", function(err){
            console.log(err);
        })
        response.on("data", function(data){
            course += data;
        });
        response.on("end", function(){
            try{
                course = JSON.parse(course);
                res.render(client_folder(req.hostname)+"courses/courseDetails",{
                    user : client_session(req),
                    course : course,
                    slug : req.params.slug,

                })

            }catch(err){
                console.log(err)
            }

        });
    }).end();


}
/**
 * @api{get} /api/courses/related_courses/:slug Get all related courses
 * @apiName related_courses
 * @apiDescription Get all related courses list
 * @apiGroup Courses
 * @apiVersion 0.1.0
 *
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok,
 *      "courses" : {JSON[]}
 *  }
 *  @apiErrorExample {Object} ServerError
 *  HTTP/1.1 500 ERROR
 *  {
 *      "status" : "error",
 *      "message" : "Server Error - check endpoint server"
 *  }
 *
 * */

related_courses = function(req, res){
    url = KME_API.related_courses(req.hostname) + "/" + req.params.slug;
    str = "";
    data = http.get(url, function(response){
        response.on("error", function(err){
            res.status(500).send(err);
        });
        response.on("data", function(data){
            str += data;
        });

        response.on("end", function(){
            try{
                res.send(JSON.parse(str));
            }catch(err){
                response = {
                    "status" : "error",
                    "message" : "Server Error - check endpoint server"
                }
                res.status(500).send(response)

            }
        })

    });
    data.end();

}
/**
 * @api{get} /api/courses/completed_courses/ Get all completed courses
 * @apiName completed_courses
 * @apiDescription Get all completed courses list
 * @apiGroup Courses
 * @apiVersion 0.1.0
 *
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok,
 *      "courses" : {JSON[]}
 *  }
 *  @apiErrorExample {Object} ServerError
 *  HTTP/1.1 500 ERROR
 *  {
 *      "status" : "error",
 *      "message" : "Server Error - check endpoint server"
 *  }
 *
 * */

completed_courses = function(req, res){
    if(req.session.user == undefined || !req.session.user.logged){
        response = {
            "status" : "failed",
            "message" : "User is not authenticated"
        }
        res.send(response);
    }else{
        str = "";
        data = http.get(KME_API.completed_courses(req.hostname)+"?token="+req.session.user.token+"&user="+req.session.user.info.username, function(response){
            response.on("error", function(err){
                response = {
                    "status" : "failed",
                "message" : err
                }
                res.status(400).send(response);
            });
            response.on("data", function(data){
                str = data;
            });
            response.on("end", function(){
                try{
                    response =  JSON.parse(str);

                    if(response.status == "ok"){

                        res.send(response);
                    }else{
                        res.status(400).send(response);
                    }
                }catch(err){
                    response = {
                        "status" : "error",
                        "message" : "Server Error - check endpoint server"
                    }
                    res.status(500).send(response)
                }
            })
        });

        data.end();
    }

};
/**
 * @api{get} /api/courses/available_courses/ Returns list of courses where the user is not registered
 * @apiName available_courses
 * @apiDescription Returns list of courses where the user is not registered
 * @apiGroup Courses
 * @apiVersion 0.1.0
 *
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok,
 *      "courses" : {JSON[]}
 *  }
 *  @apiErrorExample {Object} ServerError
 *  HTTP/1.1 500 ERROR
 *  {
 *      "status" : "error",
 *      "message" : "Server Error - check endpoint server"
 *  }
 *
 * */

available_courses = function(req, res){
    if(req.session.user == undefined || !req.session.user.logged){
        response = {
            "status" : "failed",
            "message" : "User is not authenticated"
        }
        res.send(response);
    }else{
        str = "";
        data = http.get(KME_API.available_courses(req.hostname)+"?token="+req.session.user.token+"&user="+req.session.user.info.username, function(response){
            response.on("error", function(err){
                response = {
                    "status" : "failed",
                "message" : err
                }
                res.status(400).send(response);
            });
            response.on("data", function(data){
                str = data;
            });
            response.on("end", function(){
                try{
                    response =  JSON.parse(str);

                    if(response.status == "ok"){

                        res.send(response);
                    }else{
                        res.status(400).send(response);
                    }
                }catch(err){
                    response = {
                        "status" : "error",
                        "message" : "Server Error - check endpoint server"
                    }
                    res.status(500).send(response)
                }
            })
        });

        data.end();
    }

};
/**
 * @api{get} /api/courses/next_courses/ Returns the list of courses that none of its sessions has started
 * @apiName next_courses
 * @apiDescription Returns the list of courses that none of its sessions has started
 * @apiGroup Courses
 * @apiVersion 0.1.0
 *
 * @apiSuccessExample success-response:
 *  HTTP/1.1 200 OK
 *  {
 *      "status" : ok,
 *      "courses" : {JSON[]}
 *  }
 *  @apiErrorExample {Object} ServerError
 *  HTTP/1.1 500 ERROR
 *  {
 *      "status" : "error",
 *      "message" : "Server Error - check endpoint server"
 *  }
 *
 * */
next_courses = function(req, res){
    if(req.session.user == undefined || !req.session.user.logged){
        response = {
            "status" : "failed",
            "message" : "User is not authenticated"
        }
        res.send(response);
    }else{
        str = "";
        data = http.get(KME_API.next_courses(req.hostname)+"?token="+req.session.user.token+"&user="+req.session.user.info.username, function(response){
            response.on("error", function(err){
                response = {
                    "status" : "failed",
                "message" : err
                }
                res.status(400).send(response);
            });
            response.on("data", function(data){
                str = data;
            });
            response.on("end", function(){
                try{
                    response =  JSON.parse(str);

                    if(response.status == "ok"){

                        res.send(response);
                    }else{
                        res.status(400).send(response);
                    }
                }catch(err){
                    response = {
                        "status" : "error",
                        "message" : "Server Error - check endpoint server"
                    }
                    res.status(500).send(response)
                }
            })
        });

        data.end();
    }

};

/**
 * @api {get} /api/courses/:slug Get Course Data Student
 * @apiName course_data_student,
 * @apiDescription Load data student on course
 * @apiSuccessExample success-response
 * HTTP/1.1 200 OK
 * {
 *      status : {String},
 *      course : {JSON}
 * }
 **/
course_data_student = function(req, res){
//    res.send("TODO: load course data student data")
    if(req.session.user != undefined && req.session.user.logged == true){
    str = "";
    url = KME_API.get_course_data_student(req.hostname) + "/"+req.params.slug+"?user="+req.session.user.info.username+"&token="+req.session.user.token;
    data = http.get(url, function(response){
        response.on("error", function(err){
            console.log(err);
        })
        response.on("data", function(data){
            str += data;
        })
        response.on("end", function(){
            try{
                str = JSON.parse(str);
                res.send(str);

            }catch(err){
                res.send({
                    "status" : "error",
                    "message" : "Error Parsing data"
                })
            }
        })
    
    }).on("error", function(err){
        res.send({
            status : "error",
            message : err
        })
    }).end();
    }else{
        res.send({
            "status" : "ok",
            "message" : "User is not authenticated"
        })
    }
}
/**
 * @api{get} /course/:slug Course View
 * @apiName courseView
 * @apiDescription load course template
 **/

courseView = function(req, res){
    if(req.session.user == undefined){
        res.redirect("/");
    }else{
        str = "";
        url = KME_API.get_course_data_student(req.hostname) + "/"+req.params.slug+"?user="+req.session.user.info.username+"&token="+req.session.user.token;
        data = http.get(url, function(response){
            response.on("error", function(err){
                console.log(err);
            })
            response.on("data", function(data){
                str += data;
            })
            response.on("end", function(){
                try{
                    str = JSON.parse(str);
                    res.render(client_folder(req.hostname) + "courses/simpleCourse.html",{
                        user : req.session.user,
                        slug : req.params.slug,
                        dataStudent : str

                    })
                }catch(err){
                    res.send({
                        "status" : "error",
                        "message" : "Error Parsing data"
                    })
                }
            })
        
        }).on("error", function(err){
            res.send({
                status : "error",
                message : err
            })
        }).end();

    }
}
