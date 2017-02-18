angular.module('tca').service("StartDateCriteria", function() {
    this.build = function(value) {
        var result = ""        
        
        if (value) {
            result = " && Date.isExprGreaterEqual('ENTRY_DATETIME', 'PLACEHOLDER')"    
        }
        
        return result;
    }
});    
    
angular.module('tca').service("OrderStateCriteria", function() {
    this.build = function(value) {
        var result = "";
        
        switch (value && value.toLowerCase()) {
            case "active":
                result = " && (ORDER_STATE == 'OPEN' || ORDER_STATE == 'ASSIGNED')"
        }
        
        return result;
    }
});