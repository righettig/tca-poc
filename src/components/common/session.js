app.service("Session", function() {
    this.data = { // TODO: read from local storage
        monitor: {
            params: {
                status: "any",
                client: "",
                startDate: "19-02-2017",
                endDate: ""
            }
        }
    };
       
    this.get = page => {
        return this.data[page];
    }
    
    this.onFilterChanged = (page, name, value) => {
        this.data[page].params[name] = value;
    }
});