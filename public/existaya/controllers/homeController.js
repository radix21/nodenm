app.controller("homeController",[ "$scope","$sce","$http", function($scope, $sce, $http){
    // Evaluation
    $scope.getLetter = function (index) {
    return String.fromCharCode(65 + index);
    }
    $scope.EnableDiagnostic=true;
	$http.get('/api/get_diagnostics/')
	        .success(function(data){
	        	if (data.status == 'failed' || data.status == 'complete'){
	        		$scope.EnableDiagnostic=false;
	        	}
	            $scope.moduleId=data.module_id;
	            $scope.contentId = data.content_id;
	            $scope.courseId = data.course_id;
	            $scope.ubs = data.ubs;
	            $scope.contentDuration = data.content_duration;
	            $scope.contentQuestions = data.content_questions;
	            $scope.EvaluationName = data.content_name

	        })
	
	$scope.courseId = null;
    $scope.studentId = null;
    $scope.actual_position = null;
    $scope.isTutorReview = "{{isTutorReview}}";
    $scope.isReview = "{{isReview}}";
    $scope.review_course = "{{reviewing}}";
    $scope.max_grade = "{{max_grade}}";
    $scope.weight_question="";
    $scope.hasOpenQuestion="{{hasOpQ}}";
    $scope.type_view = "{{course.view_type}}";
    $scope.show_test = false; 
    $scope.examData;
    $scope.EXAM_REFRESH_FAILURES = 0;
    $scope.choices = {};
    $scope.last_viewed_position = 0;
    $scope.exam_percentage = 0;
    $scope.disableChoices = false;
    $scope.endpoint = config.SERVICE_SERVER;
    $scope.loader = true;

    //
    //
    $scope.saveAnswer = function(val){
        for(key in $scope.question_choices){

            $scope.question_choices[key] = null;
        }
        $scope.question_choices[""+val] = val; 

        //styles
        $(".letter").each(function(){
            $(this).removeClass("activeAnswer");
        });
        $(".letterId-" + val).addClass("activeAnswer");
        $(".btnFinish").removeClass("not-active-button");

        //percentage

        $scope.exam_percentage = (100 * $scope.numberQuestion) / $scope.numberAllslide;

    }
    $scope.options ={
        data: {
            course_id: $scope.courseId,
            module_id: $scope.moduleId,
            content_id: $scope.contentId,
            exam_id: ($scope.examData ? $scope.examData.pk : null),
            position: ($scope.prev_position ? $scope.prev_position : null),
            choices: $scope.question_choices,
            actual_position: $scope.actual_position -1 
        },
        success: function(response){			
            choices={};
            $scope.user_answers = JSON.parse(slide.extras.json_user_answers);
            $scope.disableChoices = false;
            for(choice in $scope.user_answers){
                if($scope.user_answers[choice].selected){
                    $scope.disableChoices = true;
                }
            }
            try{
                img = document.querySelector("#questionImage");

                src = $scope.examSlide.fields.question.extras.get_image_data.split(",")[0];
                img.src =config.SERVICE_SERVER+ "/content/question/images/"+ $scope.examSlide.fields.question.pk+"/"+src;
                img.style.border = "8px solid #ccc"; 
            }catch(err){
                console.log(err);
            }
            for(val in $scope.user_answers){
                $scope.question_choices[$scope.user_answers[val].id] = null;
            }
        },
        success_slide : function(response, params){
            $http.get('/api/content/json_fetch_exam/?'+params)
                .success(function(data){
                    choices={};
                    var slide = response[0];
                    $scope.examSlide = slide;
                    $scope.user_answers = JSON.parse(slide.extras.json_user_answers);
                    for(val in $scope.user_answers){
                        $scope.question_choices[$scope.user_answers[val].id] = null;
                    }
                })
        }

    } 
    $scope.saveAnswermu = function(val){
        if($(".letterId-" + val).hasClass("activeAnswer")){
           $(".letterId-" + val).removeClass("activeAnswer");
           $scope.question_choices[""+val] = null; 
        }else{
            $(".letterId-" + val).addClass("activeAnswer");
            $scope.question_choices[""+val] = val; 
        }
        
        //styles
        $(".letter").each(function(){
        
        });
        
        $(".btnFinish").removeClass("not-active-button");

        //percentage

        $scope.exam_percentage = (100 * $scope.numberQuestion) / $scope.numberAllslide;

    }
    $scope.options ={
        data: {
            course_id: $scope.courseId,
            module_id: $scope.moduleId,
            content_id: $scope.contentId,
            exam_id: ($scope.examData ? $scope.examData.pk : null),
            position: ($scope.prev_position ? $scope.prev_position : null),
            choices: $scope.question_choices,
            actual_position: $scope.actual_position -1 
        },
        success: function(response){            
            choices={};
            $scope.user_answers = JSON.parse(slide.extras.json_user_answers);
            $scope.disableChoices = false;
            for(choice in $scope.user_answers){
                if($scope.user_answers[choice].selected){
                    $scope.disableChoices = true;
                }
            }
            try{
                img = document.querySelector("#questionImage");
                src = $scope.examSlide.fields.question.extras.get_image_data.split(",")[0];
                img.src =config.SERVICE_SERVER+ "/content/question/images/"+ $scope.examSlide.fields.question.pk+"/"+src;
                img.style.border = "8px solid #ccc"; 
            }catch(err){
                console.log(err);
            }
            for(val in $scope.user_answers){
                $scope.question_choices[$scope.user_answers[val].id] = null;
            }
        },
        success_slide : function(response, params){
            $http.get('/api/content/json_fetch_exam/?'+params)
                .success(function(data){
                    choices={};
                    var slide = response[0];
                    $scope.examSlide = slide;
                    $scope.user_answers = JSON.parse(slide.extras.json_user_answers);
                    for(val in $scope.user_answers){
                        $scope.question_choices[$scope.user_answers[val].id] = null;
                    }
                })
        }

    } 
    $scope.ajax_fetch_user_slide = function(options, params) {
        $scope.loader = true;
        $scope.numberQuestion = 1;
        $scope.arrowLeft = false;
        $scope.arrowRight = true;
        $scope.finish = false;
        $scope.finishExam=false;
        $scope.confirmFinish = false;
        prev_choices = $scope.question_choices;
        prev_position = $scope.actual_position;
        prev_position = $scope.actual_position;
        $scope.question_choices = {};
        if(params == undefined){
            params = ""
        }
        $scope.user_answers = null;
        $http.get('/api/content/json_fetch_user_slide/?exam='+$scope.examData.pk+params)
            .success(function(response) {
                options.success(response, params);
                $scope.loader = false;
            });

    };
    $scope.nextSlide = function(){
        /**prev_position = $scope.actual_position;
          $scope.options_exam["position"] = $scope.actual_position;
          $scope.options_exam["actual_position"] = prev_position;
          prev_position = $scope.actual_position;
          params= "&position="+$scope.actual_position+"&actual_position="+prev_position+'&course_id='+$scope.courseId+"&content="+$scope.contentId;
          params += '&course='+$scope.courseId+"&ubs="+$scope.studentId+'&module='+$scope.moduleId+'&contentId='+$scope.contentId+"&exam="+$scope.examData.pk+"&choices="+JSON.stringify($scope.question_choices);
          $scope.actual_position +=1;
          $scope.ajax_fetch_user_slide($scope.options, "&position="+$scope.actual_position+"&actual_position="+prev_position+'&course_id='+$scope.courseId);**/


        prev_choices = $scope.question_choices;
        prev_position = $scope.actual_position;


        $scope.actual_position +=1;
        $scope.question_choices = {};
        params += "&exam="+$scope.examData.pk+"&contentId="+$scope.contentId;
        $http.get('/api/content/json_fetch_exam/?'+params)
            .success(function(response){
                $scope.user_answers = null;
                $scope.ajax_fetch_user_slide($scope.options, "&position="+$scope.actual_position+"&actual_position="+prev_position+'&course_id='+$scope.courseId+"&choices="+JSON.stringify(prev_choices));
                $scope.arrowLeft = true;

                $scope.numberQuestion = 1 + $scope.actual_position;
                if($scope.numberAllslide == $scope.numberQuestion){
                    $scope.arrowRight = false;
                    $scope.finish = true;
                    $scope.finishExam = true;
                }
            }).error(function(){
            })
        //TODO: create in options JSON success functions for nextSlide, prevSlide and finishExam 

    }

    $scope.finishExam = function(){
        $scope.confirmFinish = true;
        prev_position = $scope.actual_position;

        params= "&position="+$scope.actual_position+"&actual_position="+prev_position+'&course_id='+$scope.courseId+"&content="+$scope.contentId;

        params += '&course='+$scope.courseId+"&ubs="+$scope.studentId+'&module='+$scope.moduleId+'&contentId='+$scope.contentId+"&exam="+$scope.examData.pk+"&choices="+JSON.stringify($scope.question_choices);
        $http.get('/api/content/json_fetch_exam/?'+params)
            .success(function(response){
                $http.get('/api/content/json_finish_exam/?exam='+$scope.examData.pk+params)
                .success(function(response) {
                    $(".BlockTest").css({"background":"gray","pointer-events":"none"});
                    $scope.examData = undefined;
                    $scope.show_test = false;   
                })
                .error(function(err){
                })
            })
    }
   

    $scope.prevSlide = function(){
        //$scope.numberQuestion = 1 - $scope.actual_position;
        //prev_position = $scope.actual_position;
        //$scope.actual_position -=1;
        //$scope.ajax_fetch_user_slide($scope.options, "&position="+$scope.actual_position+"&actual_position="+prev_position+'&course_id='+$scope.courseId);

        prev_choices = $scope.question_choices;
        prev_position = $scope.actual_position;

        $scope.actual_position -=1;
        $scope.question_choices = {};
        params += "&exam="+$scope.examData.pk+"&contentId="+$scope.contentId;
        $http.get('/api/content/json_fetch_exam/?'+params)
            .success(function(response){

                $scope.ajax_fetch_user_slide($scope.options, "&position="+$scope.actual_position+"&actual_position="+prev_position+'&course_id='+$scope.courseId+"&choices="+JSON.stringify(prev_choices));
                $scope.arrowLeft = true;
                $scope.numberQuestion = 1 + $scope.actual_position;
                if($scope.numberQuestion == 1){
                    $scope.arrowLeft = false;
                }
            })
    }


    /**
     *  CONTENTS
     * */
    $scope.finish_exam = function(content, module, exam, callback){
        $scope.confirmFinish = true;
        if(callback){
            $http.get("/api/content/json_finish_exam/?content="+content+"&module="+module+"&exam="+exam+"&choices="+JSON.stringify($scope.question_choices)+"&actual_position="+$scope.position)
                .success(response)

        }else{
            $http.get("/api/content/json_finish_exam/?content="+content+"&module="+module+"&exam="+exam+"&choices="+JSON.stringify($scope.question_choices)+"&actual_position="+$scope.position)
                .success(function(response){
                    $scope.ShowResults=true;
                    $scope.score=response.score;
                    if (response.score>=response.aprobation || response.aprobation == null){
                        $scope.pass=true;
                    }else{
                        $scope.color="red"
                    }
                    
                })
        }
        return null; 
    }

    $scope.fetch_user_slide = function(course, ubs, module, content, exam, choices, callback){
        
        $scope.arrowLeft = $scope.position > 0;
        $scope.arrowRight = $scope.position < $scope.examData.extras.nr_slides - 1;
        $scope.finishExam = $scope.position == $scope.examData.extras.nr_slides - 1;
        $scope.loader = true;
        $scope.unique = true;
        $scope.multiple = false;
        $scope.parseHtml =  function(html){
        return $sce.trustAsHtml(html); 
        }
        $scope.question_choices = {};
        if(callback != undefined){

            $http.get("/api/content/json_fetch_user_slide?course="+course+"&ubs="+ubs+"&module="+module+"&content="+content+"&exam="+exam+"&choices="+JSON.stringify(choices)+"&position="+$scope.position)
                .success(callback)
        }else{
        
            $http.get("/api/content/json_fetch_user_slide?course="+course+"&ubs="+ubs+"&module="+module+"&content="+content+"&exam="+exam+"&choices="+JSON.stringify(choices)+"&actual_position="+$scope.actual_position+"&position="+$scope.position)
                .success(function(response){
                    var slide = response[0];
                    if(slide.fields.question.fields.type=="SM"){
                        $scope.unique = false;
                        $scope.multiple = true;
                    }
                    $scope.examSlide = slide;
                    $scope.user_answers = JSON.parse(slide.extras.json_user_answers);
                    $scope.questionvideo = slide.fields.diapositive.fields.text;
                    $scope.disableChoices = false;
                    for(choice in $scope.user_answers){
                        if($scope.user_answers[choice].selected){
                            $scope.disableChoices = true;
                        }
                    }
                    try{
                        img = document.querySelector("#questionImage");
                        src = $scope.examSlide.fields.question.extras.get_image_data.split(",")[0];
                        img.src =config.SERVICE_SERVER+ "/content/question/images/"+ $scope.examSlide.fields.question.pk+"/"+src;
                        img.style.border = "8px solid #ccc"; 
                    }catch(err){
                        console.log(err);
                    }
                    for(val in $scope.user_answers){
                        $scope.question_choices[$scope.user_answers[val].id] = null;
                    }
                    $scope.loader = false;
                    $scope.fetch_exam($scope.courseId, $scope.ubs, $scope.moduleId, $scope.contentId, $scope.exam_info.exam);
                })
        }

    }
    $scope.prev_slide = function(){
        $scope.position = $scope.position -1;
        $scope.actual_position = $scope.actual_position +1;
        $scope.fetch_user_slide($scope.courseId, $scope.ubs, $scope.moduleId, $scope.contentId, $scope.examData.pk, $scope.question_choices);
        $scope.question_choices = {};
        $scope.user_answers = [];

    }
    $scope.next_slide = function(){
        $scope.actual_position = $scope.position;
        $scope.position = $scope.position +1
        $scope.fetch_user_slide($scope.courseId, $scope.ubs, $scope.moduleId, $scope.contentId, $scope.examData.pk, $scope.question_choices);
        $scope.question_choices = {}

        $scope.user_answers = [];
    }

    $scope.fetch_exam = function(course, ubs, module, content, exam, callback){
        
        if(callback != undefined){
            $http.get("/api/content/json_fetch_exam?course="+course+"&ubs="+ubs+"&module="+module+"&content="+content+"&exam="+exam)
                .success(callback)
        }else{
            $http.get("/api/content/json_fetch_exam?course="+course+"&ubs="+ubs+"&module="+module+"&content="+content+"&exam="+exam)
                .success(function(response){
                    response = response[0];

                    $scope.examData = typeof(response) == "string" ? JSON.parse(response) : response;
                })
        }
        return null;
    }
    $scope.launch_fetch_user_slide = function(response){
        $scope.confirmFinish = false;
        response = response[0];
        $scope.examData = typeof(response) == "string" ? JSON.parse(response) : response;
        $scope.exam_id = $scope.examData.pk;

        $scope.fetch_user_slide($scope.courseId, $scope.ubs, $scope.moduleId, $scope.contentId, $scope.exam_info.exam, $scope.choices);
    }
    $scope.launchExam = function(response_data){

        $scope.position = 0;
        $scope.actual_position = -1;
        $scope.choices = {};
        $scope.exam_info = response_data;

        $scope.fetch_exam($scope.courseId, $scope.ubs, $scope.moduleId, $scope.contentId, response_data.exam, $scope.launch_fetch_user_slide);
        
        return null
    }
    // This function start the exam
    $scope.init_userSlideContainer = function(position, cb){
        $scope.actual_position = 0;
        var dict_choices = JSON.stringify($scope.choices);
        already_graded=false;
        //$scope.ajax_fetch_user_slide($scope.options);

    };

    $scope.updateExam = function(custom_opts){
        ajax_options = {
            error: function() {
                $scope.EXAM_REFRESH_FAILURES = $scope.EXAM_REFRESH_FAILURES + 1;
            },

            success: function(response){

                $scope.EXAM_REFRESH_FAILURES = 0;

                var first_load = ($scope.examData == undefined);
                var modalTimeOut = $("#modalTimeOut");
                $scope.examData = response[0];
                $scope.numberAllslide = $scope.examData.extras.nr_slides;

                if($scope.numberAllslide == $scope.numberQuestion){
                }
                $scope.init_userSlideContainer();
                if ($scope.isReview){
                    $scope.examData.time_test_begins = new Date();
                    if ($scope.examData.extras.seconds_left) {
                        $scope.examData.time_test_ends = new Date();
                        $scope.examData.time_test_ends.setTime($scope.examData.time_test_begins.getTime() + ($scope.examData.extras.seconds_left*1000));

                        secondsTickerCallbacks["exam_counter"] = function(){
                            draw_countDown(countDownDiv, $scope.examData.time_test_ends, modalTimeOut)
                        };
                    }
                }else {
                    first_load=false;
                }
            }

        }

        $.extend(ajax_options, custom_opts || {});
        $scope.options_exam = ajax_options;
        if($scope.examData && $scope.examData.fields.end_date&& $scope.isTutorReview) {
            return false;
        }
        //$scope.ajax_fetch_exam(ajax_options);
        
        //$scope.fetch_exam(data.course.pk, data.course.ubs, $scope.moduleId, $scope.contentId, $scope.examData.exam, true);


    }
    $scope.start_exam = function(){
        params = 'course='+$scope.courseId+"&ubs="+$scope.studentId+'&module='+$scope.moduleId+'&content='+$scope.contentId;
        if($scope.examData!=undefined){
            params += '&exam='+$scope.examData.pk;
        }
        $http.get('/api/content/take_test/?'+params)
            .success(function(response){
                if(response.status == 'ok'){
                    //$scope.updateExam(response); 
                    $scope.launchExam(response);

                }
            }).error(function(a,b,c,d){
                console.log(b,d);

            });
    }
    $scope.open_test = function(){

        $scope.modulePosition = 0;
        $scope.submodulePosition = 0;
        $scope.packItemPosition = 0;
        $scope.show_test = true;
        $('#js-evaluacion').modal('hide');
        $scope.start_exam();
        courseContent = $(".menuTab>li")[0];
        $(courseContent).addClass("active");

    }

    $scope.close_test = function(){

        $scope.show_test = false;   
        location.reload();
    }
    $scope.show_feedback = function(exam){
        $http.get("/api/content/exam_data/"+exam+"/")
                .success(function(response){
                    $scope.examResData = response;
                    

                })

        $scope.feedback = true;   
    }
    $scope.hide_feedback = function(exam){
        $scope.feedback = false;   
    }

    // This function update exam status
    $scope.ajax_fetch_exam = function(options) {
        var data = options.data;
        if (!data) data ={};

        var params = "";
        for(key in options ){
            if(key == 'exam' || key == "contentId"){
                params += ("&"+key+"="+options[key]);
            }

        }
        $http.get('/api/content/json_fetch_exam/?'+params)
            .success(function(response){
                options.success(response);
            })

    }



    // END

}])








