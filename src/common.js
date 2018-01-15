export default ({
    apiConnect: function (obj, response) {
        if (response.status === 201) {
            obj.status.message = "Created";
            obj.status.bootstrapPanelColor = "success";
            obj.status.status = "Success";
        } else if (response.status === 200) {
            obj.status.message = "Successful Update";
            obj.status.bootstrapPanelColor = "success";
            obj.status.status = "Success";
        } else if (response.status === 204) {
            obj.status.message = "Delete successful";
            obj.status.bootstrapPanelColor = "success";
            obj.status.status = "Success";
        } else if (response.status === 400) {
            console.log('400');
            obj.status.message = "Bad request - The query syntax is incorrect";
            obj.status.bootstrapPanelColor = "danger";
            obj.status.status = "Error";
        } else if (response.status === 404) {
            obj.status.message = "Not Found - The resource does not exist";
            obj.status.bootstrapPanelColor = "danger";
            obj.status.status = "Error";
        } else if (response.status === 409) {
            this.status = "Conflict - Already exists";
            obj.status.bootstrapPanelColor = "danger";
            obj.status.status = "Error";
        }
    },
    apiUnreachable: function (obj, response) {
        obj.status.message = "Internal server error - " + response.statusText;
        obj.status.bootstrapPanelColor = "danger";
        obj.status.status = "Error";
    }
});