var organizations = require('../apps/organizations'),
    multer = require('multer'),
    upload = multer({dest: "./public/temp/uploads/"}).fields([{name: "logoUpload", maxCount:1}, {name: "bannerUpload", maxCount:1}]);

module.exports = {
    set: function(app) {
        app.post('/api/orgs/add', upload, organizations.createOrganization);
        app.get('/api/orgs/validate', organizations.validateName);
        app.get('/api/orgs/get/:url', organizations.getOrganization);
        app.post('/api/orgs/edit/:url', upload, organizations.editOrganization);
        app.post('/api/orgs/delete/:url', organizations.deleteOrganization);
        app.post('/api/orgs/state/:url', organizations.changeStateOrganization);
    }
}