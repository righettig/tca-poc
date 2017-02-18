angular.module('tca').component('monitor', {
    templateUrl: 'src/components/monitor/monitor.html',
    controller: function(OrdersManager, RoutesManager, FillsManager) {        
        this.onFilterChanged = function (name, value) {
            var manager;
            
            switch (this.page) {
                case "orders":
                    manager = OrdersManager;
                    break;
                    
                case "routes":
                    manager = RoutesManager;
                    
                case "fills":
                    manager = FillsManager;
                    
                default:
                    throw new Error("unknown page: " + page);
            }
                    
            manager.onFilterChanged(name, value);
        }
                
        this.onPageChanging = function() {
            var manager;
            
            switch (this.page) {
                case "orders":
                    manager = OrdersManager;
                    break;
                    
                case "routes":
                    manager = RoutesManager;
                    
                case "fills":
                    manager = FillsManager;
                    
                default:
                    throw new Error("unknown page: " + page);
            }
                    
            manager.cleanup();
        }
        
        this.$onInit = function() {
            this.page = "orders";
            
            var columnDefs = [
                {headerName: "Id", field: "ORDER_ID"},
                {headerName: "Entry Datetime", field: "ENTRY_DATETIME"},
                {headerName: "State", field: "ORDER_STATE"},
                {headerName: "Client", field: "CLIENT_ID"},
                {headerName: "Symbol", field: "INSTRUMENT_CODE"},
                {headerName: "Basket Id", field: "BASKET_ID"},
                {headerName: "Desk Id", field: "DESK_ID"},
            ];

            var rowData = [
                {
                    ORDER_ID: "ORD0001", 
                    ENTRY_DATETIME: "20-02-2017", 
                    ORDER_STATE: "OPEN",
                    CLIENT_ID: "CLN0001",
                    INSTRUMENT_CODE: "AAPL",
                    BASKET_ID: "BSK0001",
                    DESK_ID: "DSK0001"
                }
            ];

            this.ordersGridOptions = {
                columnDefs: columnDefs,
                rowData: rowData
            };
            
            var manager;
            
            switch (this.page) {
                case "orders":
                    manager = OrdersManager;
                    break;
                    
                case "routes":
                    manager = RoutesManager;
                    
                case "fills":
                    manager = FillsManager;
                    
                default:
                    throw new Error("unknown page: " + page);
            }
                    
            manager.init();
        }
    }
});

angular.module('tca').service("OrdersManager", function(OrderStateCriteria, StartDateCriteria, DTA) {
    this.params = {};
    this.stream = null;
    
    this.onFilterChanged = function (name, value) {
        this.params[name] = value;
        
        this.createNewSubscription();
    }
    
    this.init = function() {
        // TODO: read from localstorage
        this.params.status = "any";
        this.params.startDate = "15-05-2016";
        
        this.createNewSubscription();
    }
    
    this.cleanup = function() {
        if (this.stream) {
            this.stream.dispose();    
        }
    }
    
    this.createNewSubscription = function () {
        var params = {
            criteria: "PARENT_CHILD == 'P'" + 
                OrderStateCriteria.build(this.params['status']) +
                StartDateCriteria.build(this.params['startDate'])
        }
    
        this.stream = 
            DTA.stream("ALL_ORDERS", params);
    }
});

angular.module('tca').service("RoutesManager", function(OrderStateCriteria, StartDateCriteria, DTA) {
});

angular.module('tca').service("FillsManager", function(OrderStateCriteria, StartDateCriteria, DTA) {
});

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