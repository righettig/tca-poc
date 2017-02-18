angular.module('tca').service("DTA", function() {
    this.stream = function(resource, params) {
        console.log(resource);
        console.log(params);
        
        return {
            dispose: () => {
                console.log("stream disposed"); 
            },
            subscribe: function(onDataFn) {
                var rowData = [{
                    ORDER_ID: "ORD0001", 
                    ENTRY_DATETIME: "20-02-2017", 
                    ORDER_STATE: "OPEN",
                    CLIENT_ID: "CLN0001",
                    INSTRUMENT_CODE: "AAPL",
                    BASKET_ID: "BSK0001",
                    DESK_ID: "DSK0001"
                }];
                
                onDataFn(rowData);
            }
        };
    }
});