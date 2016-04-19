var organizations = require('../apps/organizations'),
    multer = require('multer'),
    upload = multer({dest: "./public/temp/uploads/"}).fields([{name: "logoUpload", maxCount:1}, {name: "bannerUpload", maxCount:1}]);

module.exports = {
    set: function(app) {
        app.post('/api/orgs/add', upload, createOrganization);
        app.get('/api/orgs/validate', validateName);
        app.get('/api/orgs/get/:url', getOrganization);
        app.post('/api/orgs/delete/:url', deleteOrganization);
    }
}