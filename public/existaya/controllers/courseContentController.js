app.controller("courseContentController",[ "$scope", "$http", function($scope, $http){
    $scope.dataSimpleCourse = data;
    $scope.modulesPack = split_array_for_slides($scope.dataSimpleCourse.modules, 4);
    $scope.resources = [];
    for(module in data.modules){
        for(submodule in data.modules[module].submodules){
            for(content in data.modules[module].submodules[submodule].contents){
                if(content > 0){
                    $scope.resources.push(data.modules[module].submodules[submodule].contents[content]);
                }
            }
        }
    }
    $scope.downloadFile = function(id){
        document.querySelector("#content"+id).click();
    }
    $scope.json_modules = {}
    $scope.evaluations = [];
    for(module in data.modules){
        if(data.modules[module].contents.length > 0){
            $scope.evaluations.push(data.modules[module].contents[0]);
            $scope.json_modules[data.modules[module].contents[0].content_pk] =[ data.modules[module].module_pk, data.modules[module].contents[0].content_pk];
        }
    }
    // Evaluation
    $scope.markContentAsSeen = function(content, module){
        if(content !=undefined  && module != undefined){
        for(m in $scope.dataSimpleCourse.modules){
            for(s in $scope.dataSimpleCourse.modules[m].submodules){
                sub = $scope.dataSimpleCourse.modules[m].submodules[s];
                if(sub.module_pk == module){
                    $scope.dataSimpleCourse.modules[m].submodules[s].completed = true;
                }
            }
        }
        $http.get("/api/content/take_test/?content="+content+"&module="+module)
            .success(function(response){
                exam = response.exam;
                $http.get("/api/content/json_finish_exam/?content="+content+"&module="+module+"&exam="+exam)
                .success(function(response){
                })
                .error(function(a,b,c,d){
                    console.log(b,d);
                })
            })
            .error(function(a,b,c,d){
                console.log(b,d);

            })
        }
    }
    $scope.markContentAsSeen(data.modules[0].submodules[0].contents[0].content_pk, data.modules[0].submodules[0].module_pk);

    $scope.courseId = null;
    $scope.studentId = null;
    $scope.moduleId = null;
    $scope.contentId = null;
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
    $scope.ajax_fetch_user_slide = function(options, params) {
        $scope.loader = true;
        $scope.numberQuestion = 1;
        $scope.arrowLeft = false;
        $scope.arrowRight = true;
        $scope.finish = false;
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
                })
        }
        return null; 
    }
    $scope.fetch_user_slide = function(course, ubs, module, content, exam, choices, callback){
        $scope.arrowLeft = $scope.position > 0;
        $scope.arrowRight = $scope.position < $scope.examData.extras.nr_slides - 1;
        $scope.loader = true;
        $scope.question_choices = {};
        if(callback != undefined){

            $http.get("/api/content/json_fetch_user_slide?course="+course+"&ubs="+ubs+"&module="+module+"&content="+content+"&exam="+exam+"&choices="+JSON.stringify(choices)+"&position="+$scope.position)
                .success(callback)
        }else{
        
            $http.get("/api/content/json_fetch_user_slide?course="+course+"&ubs="+ubs+"&module="+module+"&content="+content+"&exam="+exam+"&choices="+JSON.stringify(choices)+"&actual_position="+$scope.actual_position+"&position="+$scope.position)
                .success(function(response){
                    var slide = response[0];
                    $scope.examSlide = slide;
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
                    $scope.loader = false;
                    $scope.fetch_exam(data.course.pk, data.course.ubs, $scope.moduleId, $scope.contentId, $scope.exam_info.exam);
                })
        }

    }
    $scope.prev_slide = function(){
        $scope.position = $scope.position -1;
        $scope.actual_position = $scope.actual_position +1;
        $scope.fetch_user_slide(data.course.pk, data.course.ubs, $scope.moduleId, $scope.contentId, $scope.examData.pk, $scope.question_choices);
        $scope.question_choices = {};
        $scope.user_answers = [];

    }
    $scope.next_slide = function(){
        $scope.actual_position = $scope.position;
        $scope.position = $scope.position +1
        $scope.fetch_user_slide(data.course.pk, data.course.ubs, $scope.moduleId, $scope.contentId, $scope.examData.pk, $scope.question_choices);
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
        $scope.fetch_user_slide(data.course.pk, data.course.ubs, $scope.moduleId, $scope.contentId, $scope.exam_info.exam, $scope.choices);
    }
    $scope.launchExam = function(response_data){

        $scope.position = 0;
        $scope.actual_position = -1;
        $scope.choices = {};
        $scope.exam_info = response_data;
        $scope.fetch_exam(data.course.pk, data.course.ubs, $scope.moduleId, $scope.contentId, response_data.exam, $scope.launch_fetch_user_slide);
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
    $scope.open_test = function(input){
        $scope.moduleId = input[0];
        $scope.contentId = input[1];
        $scope.modulePosition = 0;
        $scope.submodulePosition = 0;
        $scope.packItemPosition = 0;
        $scope.show_test = true;
        $scope.start_exam();
        courseContent = $(".menuTab>li")[0];
        $(courseContent).addClass("active");

    }

    $scope.close_test = function(){

        $scope.show_test = false;   
        location.reload();
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

app.controller('courseContentController-ori', ['$http','$scope', 'courses','$sce', '$rootScope',"$location", function ($http, $scope, courses, $sce, $rootScope, $location) {
    // paginador Recursos   
    $scope.slug = slug;
    $scope.pag = 0;
    $scope.modulePosition = 0;
    $scope.submodulePosition= 0 ;
    $scope.exam_score = 0;
    $scope.upSubmodule = function(){
        $scope.submodulePosition++;   
    }


    $scope.downSubmodule = function(){
        if($scope.submodulePosition > 0){
            $scope.submodulePosition--;    
        }
    }

    $scope.isModuleComplete = function(module){

        return $http.jsonp(config.SERVICE_SERVER+ "/api/courses/isModuleComplete/?module="+module+"&slug="+$routeParams.slug+"&callback=JSON_CALLBACK");

    }

    $scope.markContentAsSeen = function(content, module){
        $http.get("/api/contents/take_test/"+content+"/"+module)
            .success(function(response){
                exam = response.exam;
                $http.get("/api/contents/json_finish_exam/"+content+"/"+module+"/"+exam)
                .success(function(response){
                })
            })
        .error(function(a,b,c,d){
            console.log(b,d);

        })
    }
    $scope.jumpSubmodulePosition = function(pos){
        $scope.submodulePosition = pos;   

    }
    $scope.jumpModulePosition = function(pos){
        $scope.modulePosition = pos;    
    }
    $scope.packItemPosition = 0;
    $scope.upPackItem = function(){
        $scope.packItemPosition++;    
    }
    $scope.downPackItem = function(){
        $scope.packItemPosition--;    
    }
    $scope.$watch("packItemPosition", function(){
        $scope.modulePosition = $scope.packItemPosition * 4;
    });

    $rootScope.courseId = data.course.pk;
    $rootScope.studentId = data.course.ubs;
    //modules

    $scope.dataSimpleCourse = data;
    $scope.$watch("embed", function(_new, _old){
        if($scope.embed != null){
        }
    });
    $scope.$watch("modulePosition",function(){
        //TODO: check all submodule for complete
        try{
            $scope.submodulePosition = 0;
            $scope.exam_score = $scope.modules[$scope.modulePosition].contents[0].content_button_info.exam_score;
            if($scope.modules[$scope.modulePosition].contents[0].content_button_info.passed){

                $scope.exam_score = 100;    
            }
            $scope.$watch("submodulePosition", function(){
                var intervalEmbed = setInterval(function(){
                    try{
                        if(document.querySelectorAll("#embedVideo").length > 0 && $scope.dataSimpleCourse ){

                            clearInterval(intervalEmbed);
                            embed = document.querySelector("#embedVideo");
                            embed.innerHTML = $scope.dataSimpleCourse.modules[$scope.modulePosition].submodules[$scope.submodulePosition].contents[0].text;
                        }
                    }catch(err){

                    }
                },100);   
            });

            $scope.exam_url = config.SERVICE_SERVER + '/lms/course/' + $scope.uuid + '/module/' + $scope.modules[$scope.modulePosition].module_pk+'/content/' + $scope.modules[$scope.modulePosition].contents[0].content_pk+ '/sit/';
        }catch(err){

        }
    });
    $scope.$watch("submodulePosition", function(){
        var intervalEmbed = setInterval(function(){
            try{
                if(document.querySelectorAll("#embedVideo").length > 0){
                    clearInterval(intervalEmbed);
                    embed = document.querySelector("#embedVideo");
                    embed.innerHTML = $scope.dataSimpleCourse.modules[$scope.modulePosition].submodules[$scope.submodulePosition].contents[0].text;

                }
            }catch(err){

            }
        },100);    

    });

    // submodules
    $scope.moduleStatus = {};
    dataModules = $scope.dataSimpleCourse.modules;
    $scope.modules = dataModules;
    $scope.$watch("modules", function(){

    })
    $scope.simpleItems = split_array_for_slides(dataModules,4);

    $rootScope.moduleId = $scope.modules[$scope.modulePosition].module_pk;

    $rootScope.contentId = $scope.modules[$scope.modulePosition].contents[0].content_pk;
    $scope.$watch("simpleItems", function(_new, _old){
    });
    $scope.markAsSeen = function(module_pk){
        for(var i=0; i< $scope.modules.length; i++){
            exam_available = true; 
            for(var j=0; j< $scope.modules[i].submodules.length; j++){
                if($scope.modules[i].submodules[j].module_pk == module_pk){
                    $scope.modules[i].submodules[j].has_seen = true;
                }

                exam_available = exam_available && $scope.modules[i].submodules[j].has_seen;
            }
            $scope.modules[i].can_open = exam_available;
        }
    }
    for(var i=0; i< $scope.modules.length; i++){

        for(var j=0; j<$scope.modules[i].submodules.length;j++){

            $scope.isModuleComplete($scope.modules[i].submodules[j].module_pk).success(function(response){
                if(response.is_complete){
                    $scope.markAsSeen(response.module);
                }
            })

        }
    }


    // Evaluations

    var AllEvaluations = [];

    for(index in dataModules){
        AllEvaluations.push(data.modules[index].contents);
    }

    $scope.evaluations = AllEvaluations;

    // resources  

    var resources = [];
    var resourcesModule = [];
    var resourcesSubmodule = [];

    $scope.resourcesSubmodule = resourcesSubmodule;

    for(module of data.modules ){
        resources.push(module);
    } 

    for(item in resources){
        for(contents of resources[item].submodules){
            resourcesSubmodule.push(contents.contents);
        }
    }
    $scope.is_disabled = function(){
        module = $scope.modules[$scope.modulePosition];
        for(submodule of module.submodules){
            if(!submodule.has_seen){
                return true;
            }    
        }
        return false;
    }
    // navigation for Resources of the Course

    $scope.posLesson = 1;

    $scope.functionRun = function(){
        var tableFirst = $("#recursos").find(">table:first").hasClass("ng-hide");
        if(tableFirst === false){
            $(".btn--prev").hide();
        }
        var loadItem = setInterval(function(){
            var tableEnd = $("#recursos").find(">table:last");
            tableEnd.addClass("posLast");
            if(tableEnd.length != 0){
                clearInterval(loadItem);
            }
        },500);
    }


    function checkResources(){
        var textInEle = $(".resourceTable").not(".ng-hide").find("tr").eq(1).find("td");

        if(textInEle.length == 0){
            $(".alertContent").show();
        }else{
            $(".alertContent").hide();
        }
    }

    $scope.nextResource = function(){
        var table_End = $("#recursos").find(">table:last");
        $scope.posLesson += 1;
        $(".btn--prev").show();
        $(".resourceTable").not('.ng-hide').addClass("hideBack");
        $(".resourceTable").not('.ng-hide').next().removeClass("ng-hide");
        $(".hideBack").addClass("ng-hide").removeClass("hideBack");
        if($(".posLast").hasClass("ng-hide") === false){
            $(".btn--next").hide();
        }

        checkResources();
    }

    $scope.prevResource = function(){
        $scope.posLesson -= 1;
        var tableFirst = $("#recursos").find(">table:first").hasClass("ng-hide");
        if(tableFirst === true && $scope.posLesson === 1){
            $(".btn--prev").hide();
        }
        $(".resourceTable").not('.ng-hide').addClass("showBack");
        $(".resourceTable").not('.ng-hide').prev().removeClass("ng-hide");
        $(".showBack").addClass("ng-hide").removeClass("showBack");
        if($(".posLast").hasClass("ng-hide") === true){
            $(".btn--next").show();
        }

        checkResources();

    }



    // carousel
    $scope.intervalTime = 0;

    //modal
    $scope.parseHtml =  function(html){
        return $sce.trustAsHtml(html); 
    }

}]);

app.controller('tribes',['$scope','courses','$http', '$rootScope','$sce','$timeout', function($scope,courses,$http, $rootScope,$sce,$timeout){
        $scope.tribesModule = data.tribes;
        try{
            $scope.tribeId = data.tribes[0].id;

        }catch(err){
            $scope.tribeId = null;
        }
        $http.get('/api/tribes/get_tribe/'+$scope.tribeId )
        .success(function(response){
            $scope.tribesDetails = response;

            $scope.open = false;
            $scope.showTopics = true;

            $scope.loaderTribe = true;
            $scope.commentsVisible = false;
            $scope.alertComment = false;


            $scope.openTopic = function(position){
                $scope.positionTopic = position;
                $timeout(function(){
                    $scope.loaderTribe = false;
                    $scope.commentsVisible = true;
                    $scope.alertComment = true;
                }, 2000);
                if(position != undefined){
                    $scope.showTopics = false;
                    var pos = position - 1; 
                    $http.get('/api/tribes/get_topic/' + position)
                        .success(function(response){
                            $scope.comments = response.comments;
                            $scope.parseHtml =  function(html){
                                return $sce.trustAsHtml(html); 
                            }
                        });
                    topic = null;
                    for(var i=0; i<$scope.tribesDetails.topics.length; i++){
                        if($scope.tribesDetails.topics[i].id == pos){
                            $scope.topicDescription = $scope.tribesDetails.topics[i].description; 
                            $scope.topicName = $scope.tribesDetails.topics[i].name; 
                            $scope.open == true ?  $scope.open = false : $scope.open = true;  

                        }
                    }
                }else{
                    $scope.comments = null;
                    $scope.loaderTribe = true;
                    $scope.commentsVisible = false;
                    $scope.alertComment = false;
                    $scope.showTopics = true;
                    $scope.open == true ?  $scope.open = false : $scope.open = true;
                } 

                $scope.idTopic = position;
            }    

        });
    if(data.tribes.length > 0){
        $scope.tribeId = data.tribes[0].id;

        $http.get('/api/tribes/get_tribe/' + $scope.tribeId)
            .success(function(response){
                $scope.tribesDetails = response;

                $scope.open = false;
                $scope.showTopics = true;

                $scope.loaderTribe = true;
                $scope.commentsVisible = false;
                $scope.alertComment = false;


                $scope.openTopic = function(position){
                    $scope.confirm_post = false;
                    document.querySelector("#message-box").value="";
                    $timeout(function(){
                        $scope.loaderTribe = false;
                        $scope.commentsVisible = true;
                        $scope.alertComment = true;
                    }, 2000);
                    if(position != undefined){
                        $scope.showTopics = false;
                        var pos = position - 1; 
                        $http.get('/api/tribes/get_topic/' + position)
                            .success(function(response){
                                $scope.comments = response.comments;
                                $scope.parseHtml =  function(html){
                                    return $sce.trustAsHtml(html); 
                                }
                            })  
                        .error(function(a,b,c,d){
                            console.log(b,d);
                        });
                        for(var i=0; i<$scope.tribesDetails.topics.length; i++){
                            if(position == $scope.tribesDetails.topics[i].id){
                                $scope.topicId = position;
                                $scope.topicDescription = $scope.tribesDetails.topics[i].description; 
                                $scope.topicName = $scope.tribesDetails.topics[i].name; 
                                $scope.open == true ?  $scope.open = false : $scope.open = true;  

                            }
                        }
                    }else{
                        $scope.comments = null;
                        $scope.loaderTribe = true;
                        $scope.commentsVisible = false;
                        $scope.alertComment = false;
                        $scope.showTopics = true;
                        $scope.open == true ?  $scope.open = false : $scope.open = true;
                    } 
                }    

            });
    }
    $scope.post = '';
    $scope.confirm_post = false;
    $scope.alert_post = false;
    $scope.addPost = function(post,id){
        if(post != ''){
            $http.post('/api/tribes/send_post/' + id + '/' + post)
                .success(function(response){
                    $scope.confirm_post = true;
                    document.querySelector("#message-box").innerHTML = "";
                    $http.get('/api/tribes/get_topic/' + id)
                    .success(function(response){
                        $scope.comments = response.comments;
                        $scope.parseHtml =  function(html){
                            return $sce.trustAsHtml(html); 
                        }
                    });
                });
            $(".boxPost").toggleClass("paddingNone");
        }else{
            $(".boxPost").toggleClass("paddingNone");
            $scope.alert_post = true;
        }
    }
    $scope.closeAlert = function(){
        $(".boxPost").toggleClass("paddingNone");
        $scope.post = '';
        $scope.confirm_post = false;
        $scope.alert_post = false;
    }
}]);

app.controller("tutors",['$scope','courses',function ($scope, courses){
    var response = courses.get(null,slug);
    response.success(function(data){
        $scope.tutorsData = data[0].tutors;   
    });

}]);


app.controller("courseDetails", ["$http", "$scope","$location", "$rootScope","courses",function($http, $scope, $location, $rootScope, courses){
    //TODO: incribeUser
    $scope.inscribeUserOnCOurse = function(){
        document.querySelector(".loader").style.display="auto";
        /**courses.inscribe($routeParams.slug).success(function(response){
            if(response.status == "ok"){
                $location.path("#/course/"+$routeParams.slug);
            }
        });*/
    }
    $scope.slug=  slug;
    $rootScope.detailGetInCourse = false;
    $rootScope.detailRegisterCourse = false;
    $scope.url = "#/course/"+$routeParams.slug;
    $rootScope.$watch("detailGetInCourse", function(){
        $scope.showGetInButton = $rootScope.detailGetInCourse;
    });
    $rootScope.$watch("detailRegisterCourse", function(){
        $scope.showRegisterButton = $rootScope.detailRegisterCourse;

    })
    var dataSessionInitial,
        dataSessionFinal;

    var url = config.SERVICE_SERVER + '/api/courses/get/?callback=JSON_CALLBACK&slug=' + $routeParams.slug;
    $http.jsonp(encodeURI(url)).success(function(response){
        $scope.dataDetails = response[0];
        $scope.dataSessionDates = []
    if(response.length > 0){
        for (var i = 0; i < response[0].sessions.length; i++) {
            session = response[0].sessions[i];
            init = new Date(session.initial_date);
            end = new Date(session.final_date);
            $scope.dataSessionDates.push({
                "dates" : init.toDateString() + " - " + end.toDateString(),
                "initial_date" : session.initial_date,
                "final_date" : session.final_date
            });


        };
    };
    })
    .error(function(data, status, headers, config){
        console.log(data, status, headers, config);
    });	
}]);

app.factory('scrolltop', [function () {

    return function scrollTop(){
        $('html,body').animate({scrollTop: 0}, 1000);
    };
}])

app.factory('sessionsFactory', function(){
    return {
        inscribe : function(uuid, user_id, session_id){
        },
    firstAvailable : function(sessions){
        _aux = null;
        now = new Date();
        for(session of sessions){

            if(now < session.initial_date){
                if(_aux && session.initial_date < _aux.initial_date){
                    _aux = session;
                }
            }
        }
        return _aux;
    }
    }     

});
app.controller("comments", function($scope, $http, $routeParams){
    var url = config.SERVICE_SERVER + '/api/community/?uuid='+$routeParams.uuid+'&callback=JSON_CALLBACK';
    $http.jsonp(encodeURI(url)).success(function(response){
        $scope.commentsForCourse= JSON.stringify(response);
    })
    .error(function(data, status, headers, config){
        //console.log(data, status, headers, config);
    });

});

