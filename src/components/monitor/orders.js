angular.module("tca").component("orders", {
    template: 
    '<genesis-grid name="Orders" options="$ctrl.gridOptions"></genesis-grid>',
    
    controller: function(OrdersManager) {
        var columnDefs = [
            {headerName: "Id", field: "ORDER_ID"},
            {headerName: "Entry Datetime", field: "ENTRY_DATETIME"},
            {headerName: "State", field: "ORDER_STATE"},
            {headerName: "Client", field: "CLIENT_ID"},
            {headerName: "Symbol", field: "INSTRUMENT_CODE"},
            {headerName: "Basket Id", field: "BASKET_ID"},
            {headerName: "Desk Id", field: "DESK_ID"},
        ];
        
        this.gridOptions = {
            columnDefs: columnDefs,
            manager: OrdersManager
        };
    }
})

angular.module('tca').service("OrdersManager", function(OrderStateCriteria, StartDateCriteria, DTA) {
    this.params = {};
    
    this.stream = null;
    this.onDataFn = null;
    
    this.onFilterChanged = function (name, value) {
        this.params[name] = value;
        
        this.createNewSubscription();
    }
    
    this.init = function(onDataFn) {
        this.onDataFn = onDataFn;
        
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
    
        this.cleanup();
        
        this.stream = 
            DTA.stream("ALL_ORDERS", params);
        
        this.stream.subscribe(this.onDataFn);
    }
});