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
    constructor(DTA, CriteriaBuilder) {
        super(
            "ALL_ORDERS", 
            ["status", "startDate", "endDate", "client"], 
            DTA, CriteriaBuilder
        );
        
        // TODO: read from localstorage
        this.params.status = "any";
        this.params.client = "";
        this.params.startDate = "15-05-2016";
        this.params.endDate = "";
    }
    
    method() {
        return "PARENT_CHILD == 'C'";
    }
}

RoutesManager.$inject = ["DTA", "CriteriaBuilder"];

app.service("RoutesManager", RoutesManager);