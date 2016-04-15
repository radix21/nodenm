var certificates = require('../apps/certificates');

module.exports = {
	set: function(app) {
		app.get('/all_certifications', allCertifications);
		app.get('/certification/get/', getAllCertification);
	}
}