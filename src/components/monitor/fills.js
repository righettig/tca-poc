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

app.service("FillsManager", function(OrderStateCriteria, StartDateCriteria, DTA) {
});