// TODO create super class for fills/orders/routes
app.component("fills", {
    template: 
    '<genesis-grid name="Fills" options="$ctrl.gridOptions"></genesis-grid>',
    
    controller: function(FillsManager) {
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
            manager: FillsManager
        };
        
        this.$onDestroy = function() {
            FillsManager.cleanup();
        }
    }
})

class FillsManager extends ResourceManager {
    constructor(DTA, CriteriaBuilder) {
        super(
            "ALL_TRADES", 
            ["startDate", "endDate", "client"], 
            DTA, CriteriaBuilder
        );
        
        // TODO: read from localstorage
        this.params.client = "";
        this.params.startDate = "15-05-2016";
        this.params.endDate = "";
    }
}

FillsManager.$inject = ["DTA", "CriteriaBuilder"];

app.service("FillsManager", FillsManager);