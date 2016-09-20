/**
 * @api{get} /api/courses/my_courses getMyCourses
 * @apiName getMyCourses
 * @apiDescription Get user Courses
 * @apiGroup Courses
 * @apiVersion 0.1.0
 * @apiSuccessExample {json} success-response
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
    str = "";
    if(req.session.user == undefined || !req.session.user.logged){
        response = {
            "status" : "failed",
            "message" : "User is not authenticated"
        }
        res.send(response);
    }else{
         request('GET', KME_API.my_courses(req.hostname)+"?token="+req.session.user.token+"&user="+req.session.user.info.username).done(function (response) {
            var respo= JSON.parse(response.getBody());
            respo['diagnostic'] = DIAGNOSTIC_URL;
            res.send(respo);
        });

    }

};
getDiagnostic= function(req, res){
    str = "";
    if(req.session.user == undefined || !req.session.user.logged){
        response = {
            "status" : "failed",
            "message" : "User is not authenticated"
        }
        res.send(response);
    }else{
         request('GET', KME_API.get_diagnostic(req.hostname)+"?token="+req.session.user.token+"&user="+req.session.user.info.username+"&uuid="+DIAGNOSTIC_URL).done(function (response) {
            res.send(JSON.parse(response.getBody()))
        });

    }

};
/**
 * @api{get} /api/courses/public_courses getPublicCourses
 * @apiName getPublicCourses
 * @apiDescription Get public courses list
 * @apiGroup Courses
 * @apiVersion 0.1.0
 * @apiSuccessExample {json} success-response
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
    url_public = KME_API.public_courses(req.hostname);
    str = "";
    data = http.get(url_public, function(response){
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
 * @api{get} /api/courses/all_courses getAllCourses
 * @apiName getAllCourses
 * @apiDescription Get all courses list
 * @apiGroup Courses
 * @apiVersion 0.1.0
 * @apiSuccessExample {json} success-response
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
    url_all = KME_API.all_courses(req.hostname);
    str = "";
    data = http.get(url_all, function(response){
        response.on("error", function(err){
            res.status(500).send(err);
        });
        response.on("data", function(data){
            str += data;
        });

        response.on("end", function(){
            try{
                console.log(str);
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
 * @api{get} /all_courses allCourses
 * @apiName allCoursesViews
 * @apiDescription Load all courses template
 * @apiGroup    Courses
 * @apiVersion  0.1.0
 * @apiSuccess {Object[]} 200 Params related with user
 * @apiSuccessExample {json} Success-response 
 * {
 *      status :  {String},
 *      courses : {JSON[]}
 * }
 **/

allCoursesViews = function(req, res){

    url_allview = KME_API.all_courses(req.hostname);
    str = "";
    data = http.get(url_allview, function(response){
        response.on("error", function(err){
            res.status(500).send(err);
        });
        response.on("data", function(data){
            str += data;
        });

        response.on("end", function(){
            try{
                courses =JSON.parse(str).courses;
                console.log(courses);
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
 * @api{get} /course/:slug/details courseDetails
 * @apiName  courseDetails
 * @apiDescription Load course details and allows render course details params
 * @apiGroup Courses
 * @apiVersion  0.1.0
 * @apiSuccess {JSON[]} 200 params related with course information
 * @apiSuccessExample {json} success-response
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
    if(req.session.user != undefined && req.session.user.token != undefined){
        url = KME_API.course_details(req.hostname)+"/"+req.params.slug+"?username="+req.session.user.info.username;
    }else{
        url = KME_API.course_details(req.hostname)+"/"+req.params.slug;
    }
    data = http.get(url, function(response){
        response.on("error", function(err){
        })
        response.on("data", function(data){
            course += data;
        });
        response.on("end", function(){
            try{
                course = JSON.parse(course);
                console.log(course);
                res.render(client_folder(req.hostname)+"courses/courseDetails",{
                    user : client_session(req),
                    course : course,
                    slug : req.params.slug,

                })

            }catch(err){
            }

        });
    }).end();


}
/**
 * @api{get} /api/courses/related_courses/:slug getCoursesRelated
 * @apiName related_courses
 * @apiDescription Get all related courses list
 * @apiGroup Courses
 * @apiVersion 0.1.0
 * @apiSuccessExample {json} success-response
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
    url_related = KME_API.related_courses(req.hostname) + "/" + req.params.slug;
    str = "";
    data = http.get(url_related, function(response){
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
 * @api{get} /api/courses/completed_courses/ getCompletedCourses
 * @apiName completed_courses
 * @apiDescription Get all completed courses list
 * @apiGroup Courses
 * @apiVersion 0.1.0
 * @apiSuccessExample {json} success-response
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
    url_completed = (KME_API.completed_courses(req.hostname)+"?token="+req.session.user.token+"&user="+req.session.user.info.username);

    request('GET', url_completed).done(function (response) {
        res.send(response.getBody())
    });

};
/**
 * @api{get} /api/courses/available_courses/ availableCourses
 * @apiName available_courses
 * @apiDescription Returns list of courses where the user is not registered
 * @apiGroup Courses
 * @apiVersion 0.1.0
 * @apiSuccessExample {json} success-response
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
        url = KME_API.available_courses(req.hostname);
        request("GET", url, {
            qs : {
                token : req.session.user.token,
                user : req.session.user.info.username
            }
        }).done(function(response){
            if(response.statusCode > 300){
                res.status(response.statusCode).send(response);
            }else{
                try{
                    response = JSON.parse(response.body);
                    res.send(response);
                }catch(err){
                    res.status(400).send({
                        "status" : "failed",
                        "response" : response.body,
                        "error" : err
                    })
                }
            } 
        })
    }

};
/**
 * @api{get} /api/courses/next_courses/ nextCourses
 * @apiName next_courses
 * @apiDescription Returns the list of courses that none of its sessions has started
 * @apiGroup Courses
 * @apiVersion 0.1.0
 * @apiSuccessExample {json} success-response
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
 * @api {get} /api/courses/:slug getCourseDataStudent
 * @apiName course_data_student,
 * @apiDescription Load data student on course
 * @apiGroup Courses
 * @apiVersion 0.1.0
 * @apiSuccessExample {json} success-response
 * HTTP/1.1 200 OK
 * {
 *      status : {String},
 *      course : {JSON}
 * }
 **/
course_data_student = function(req, res){
    if(req.session.user != undefined && req.session.user.logged == true){
    str = "";
    url_data_student = KME_API.get_course_data_student(req.hostname) + "/"+req.params.slug+"?user="+req.session.user.info.username+"&token="+req.session.user.token;
    data = http.get(url_data_student, function(response){
        response.on("error", function(err){
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
 * @api{get} /course/:slug courseVIews
 * @apiName courseView
 * @apiGroup Courses
 * @apiVesion 0.1.0
 * @apiDescription load course template
 **/

courseView = function(req, res){
    var hrstart = process.hrtime();
    if(req.session.user == undefined){
        res.redirect("/");
    }else{
        str = "";
        url_course_view = KME_API.get_course_data_student(req.hostname) + "/"+req.params.slug+"?user="+req.session.user.info.username+"&token="+req.session.user.token;
        /*data = http.get(url_course_view, function(response){
            response.on("error", function(err){
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
        }).end();*/
        request("GET", url_course_view).done(function(response) {
            if (response.statusCode > 300) {
                res.status(response.statusCode).send(response);
            }else{
                try{
                    str = JSON.parse(response.getBody());    
                    res.render(client_folder(req.hostname) + "courses/simpleCourse.html",{
                        user : req.session.user,
                        slug : req.params.slug,
                        dataStudent : str
                    })
                }catch(err){
                    res.send({
                        status: "error",
                        message : "Error Parsing data"
                    });
                }                
                
            }
        });

    }
    hrend = process.hrtime(hrstart);;
    console.info("Execution time (courseView): %ds %dms", hrend[0], hrend[1]/1000000);
}

/**
 * @api{get} /api/certifications/my_certifications getUserCertifications
 * @apiName my_certifications
 * @apiDescription Get list of user certifications
 * @apiVersion 0.1.0
 * @apiGroup Courses
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
 * {
 *      status : {String},
 *      certifications : {JSON[]}
 * }
 **/
my_certifications = function(req, res){
    str = "";
    url_cert = KME_API.my_certifications(req.hostname) + "?user="+req.session.user.info.username+"&token="+req.session.user.token;
    request('GET', url_cert).done(function (response) {
        if(response.statusCode > 300){
            res.status(response.statusCode).send({
                status : "error",
                error : response.statusCode
            })
        }else{
            try{
                response = JSON.parse(response.getBody());
                res.send(response);
            }catch(err){
                res.send(response.getBody());
            }
        }
    });
}

/**
 * @api{get} /api/course/inscribe/:user/:slug inscribeUser
 * @apiName inscribe_on_course
 * @apiDescription Inscribe user on course
 * @apiVersion 0.1.0
 * @apiGroup Courses
 * @apiSuccessExample {json} Success-response
 * HTTP/1.1 200 OK
 * {
 *      status : {String}
 *
 * }
 *
 * @apiErrorExample {json} ErrorResponse
 * {
 *      status : "failed",
 *      message : {String}
 * }
 **/
inscribe_on_course = function(req, res){
    if (req.params.session!="null"){
    url = KME_API.inscribe_user(req.hostname)+req.params.user+"/?slug="+req.params.slug+"&session="+req.params.session+"&token="+req.session.user.token;
    }else{
    url = KME_API.inscribe_user(req.hostname)+req.params.user+"/?slug="+req.params.slug+"&token="+req.session.user.token;
    }
    request("GET", url).done(function(response){
        if(response.statusCode > 300){
            res.status(response.statusCode).send({
                status : "failed",
                error : response.statusCode
            })
        }else{
            res.send(response.getBody());
        }
    });
}
