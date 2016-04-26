var certificates = require('../apps/certificates');

module.exports = {
	set: function(app) {
		app.get('/all_certifications', allCertifications);
		app.get('/certification/get/', getAllCertification);
		app.get('/certification/details/:slug', getInfoCertification);
		app.get('/certification/inscribe/:slug', inscribeCertification);
	}
}
