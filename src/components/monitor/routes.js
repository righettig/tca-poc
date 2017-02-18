app.component("routes", {
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
        
        this.$onDestroy = function() {
            RoutesManager.cleanup();
        }
    }
})

class RoutesManager extends ResourceManager {
    constructor(
        OrderStateCriteria, 
        StartDateCriteria,
        DTA) {
        super(DTA);
            
        this.OrderStateCriteria = OrderStateCriteria;
        this.StartDateCriteria = StartDateCriteria;
    }
    
    createNewSubscription() {
        var params = {
            columns: this.columns,
            criteria: "PARENT_CHILD == 'C'" + 
                this.OrderStateCriteria.build(this.params['status']) +
                this.StartDateCriteria.build(this.params['startDate'])
        }
    
        this.cleanup();
        
        this.stream = 
            this.DTA.stream("ALL_ORDERS", params);
        
        this.stream.subscribe(this.onDataFn);
    }
}
RoutesManager.$inject = ["OrderStateCriteria", "StartDateCriteria", "DTA"];

app.service("RoutesManager", RoutesManager);