allCertifications = function(req, res) {

	res.render(client_folder(req.hostname)+"certificates/allCertificates", {
					courses: courses,
                    user : client_session(req)
                });
}

getAllCertification = function(req, res) {
	var url = KME_API.all_certifications(req.hostname)
	var str = ""

	var data = http.get(url+"?token="+req.session.user.token+"&user="+req.session.user.info.username, function(response) {
		response.on('error', function(err) {
			res.status(response.statusCode).send(err)
		});

		response.on('data', function(data) {
			str = data
		});

		response.on('end', function() {
			try{
				response = JSON.parse(str);
				if (response.status == "ok"){
					res.send(response);
				}
			}catch(err){
				response = {
					"status": "error",
					"message": "Server Error - check endpoint server"
				}
				res.status(500).send(response)
			}
		});
	});

	data.end();	
}