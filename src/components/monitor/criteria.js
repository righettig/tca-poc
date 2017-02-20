app.run(function(FiltersCache) {
    FiltersCache.register("status", {
        apply: value => {
            var result = "";
            
            if (value.toLowerCase() === "active") {
                result = '(ORDER_STATE === "OPEN" || ORDER_STATE === "ASSIGNED")';
                
            } else if (value.toLowerCase() === "closed") {
                result = '(ORDER_STATE === "CLOSED" || ORDER_STATE === "FILLED")';
            }
            
            return result;
        },
        
        // PLACEHOLDER
        execute: (value, row) => {
            return true;
        }
    });
    
    FiltersCache.register("client", {
        apply: value => {
            var result = "";
            
            if (value) {
                result = 'CLIENT_ID == "' + value + '"';
            }
            
            return result;
        },
        
        execute: (value, row) => {
            if (!value) {
                return true;
            }
            
            return row.CLIENT_ID === value;
        }
    });
    
    FiltersCache.register("startDate", {
        apply: value => {
            var result = "";
            
            if (value) {
                result = "Date.isExprGreaterEqual('ENTRY_DATETIME', '" + value + "')";
            }
            
            return result;
        },
        
        // PLACEHOLDER
        execute: (value, row) => {
            return true;
        }
    });
    
    FiltersCache.register("endDate", {
        apply: value => {
            var result = "";
            
            if (value) {
                result = "Date.isExprLessEqual('ENTRY_DATETIME', '" + value + "')";
            }
            
            return result;
        },
        
        // PLACEHOLDER
        execute: (value, row) => {
            return true;
        }
    });
});