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
            columnDefs: columnDefs,
            manager: OrdersManager
        };
        
        this.$onDestroy = function() {
            OrdersManager.cleanup();
        }
    }
})

class ResourceManager {
    constructor(DTA) {
        if (new.target === ResourceManager) {
            throw new TypeError("Cannot construct ResourceManager instances directly");
        }
        
        if (this.createNewSubscription === undefined) {
            // or maybe test typeof this.method === "function"
            throw new TypeError("Must override method");
        }
        
        this.params = {};
    
        this.stream = null;
        this.onDataFn = null;
        this.columns = null;
        
        this.DTA = DTA;
    }
        
    onFilterChanged(name, value) {
        this.params[name] = value;
        
        this.createNewSubscription();
    }
    
    init(onDataFn, columns) {
        this.onDataFn = onDataFn;
        this.columns = columns.join(" ");
        
        // TODO: read from localstorage
        this.params.status = "any";
        this.params.startDate = "15-05-2016";
        
        this.createNewSubscription();
    }
    
    cleanup() {
        if (this.stream) {
            this.stream.dispose();    
        }
    }
}

class OrdersManager extends ResourceManager {
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
            criteria: "PARENT_CHILD == 'P'" + 
                this.OrderStateCriteria.build(this.params['status']) +
                this.StartDateCriteria.build(this.params['startDate'])
        }
    
        this.cleanup();
        
        this.stream = 
            this.DTA.stream("ALL_ORDERS", params);
        
        this.stream.subscribe(this.onDataFn);
    }
}
OrdersManager.$inject = ["OrderStateCriteria", "StartDateCriteria", "DTA"];

app.service("OrdersManager", OrdersManager);