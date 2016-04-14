var organizations = require('../apps/organizations'),
    multer = require('multer'),
    upload = multer({dest: "./public/temp/uploads/"}).fields([{name: "logoUpload", maxCount:1}, {name: "bannerUpload", maxCount:1}]);

module.exports = {
    set: function(app) {
        app.get('/organization/add', addOrganization);
        app.post('/api/organization/add', upload, createOrganization);
        app.get('/api/organization/validate_name', validateName);
        app.get('/api/organization/get/:url', getOrganization);
    }
}