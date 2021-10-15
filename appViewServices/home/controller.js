const viewPaths = require("../../views/views.js");

module.exports  = {
    async getHome(req, res){
        return res.status(200).sendFile(viewPaths.home);
    }
}
