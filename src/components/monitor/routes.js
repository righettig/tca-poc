angular.module("tca").component("routes", {
    template: 
    '<genesis-grid name="Routes" options="$ctrl.gridOptions"></genesis-grid>',
    
    controller: function(RoutesManager) {
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
            manager: RoutesManager
        };
    }
})

angular.module('tca').service("RoutesManager", function(OrderStateCriteria, StartDateCriteria, DTA) {
});