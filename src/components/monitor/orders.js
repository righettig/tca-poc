app.component("orders", {
    template: 
    '<genesis-grid name="Orders" options="$ctrl.gridOptions"></genesis-grid>',
    
    controller: function(OrdersManager) {
        var columnDefs = [
/*            {
                headerName: "Athlete Details",
                children: [
                    {headerName: "Sport", field: "sport"},
                    {headerName: "Gold", columnGroupShow: 'open'},
                    {headerName: "Silver", columnGroupShow: 'open'},
                    {headerName: "Bronze", columnGroupShow: 'open'},
                    {headerName: "Foo",
                        children: [
                            {headerName: "q", field: "sport"},
                            {headerName: "w", columnGroupShow: 'open'},
                            {headerName: "e", columnGroupShow: 'open'},
                            {headerName: "t", columnGroupShow: 'open'}
                        ]
                    }
                ]
            },*/
            {headerName: "Id", field: "ORDER_ID"},
            {headerName: "Entry Datetime", field: "ENTRY_DATETIME"},
            {headerName: "State", field: "ORDER_STATE", isMandatory: true},
            {headerName: "Client", field: "CLIENT_ID", isMandatory: true},
            {headerName: "Symbol", field: "INSTRUMENT_CODE", isMandatory: true},
            {headerName: "Basket Id", field: "BASKET_ID", isMandatory: true},
            {headerName: "Desk Id", field: "DESK_ID", isMandatory: true},
        ];
        
        this.gridOptions = {
            //suppressMoreRows: true,
            clientSideFiltering: true,
            columnDefs: columnDefs,
            manager: OrdersManager
        };
        
        this.$onDestroy = function() {
            OrdersManager.cleanup();
        }
    }
})

class OrdersManager extends ResourceManager {
    constructor(DTA, CriteriaBuilder) {
        super(
            "ALL_ORDERS", 
            //["status", "startDate", "endDate", "client"], 
            ["client"], 
            DTA, CriteriaBuilder
        );
    }
    
    method() {
        return "PARENT_CHILD == 'P'";
    }
}

OrdersManager.$inject = ["DTA", "CriteriaBuilder"];

app.service("OrdersManager", OrdersManager);