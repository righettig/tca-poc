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

app.service("OrdersManager", function(OrderStateCriteria, StartDateCriteria, DTA) {
    this.params = {};
    
    this.stream = null;
    this.onDataFn = null;
    
    this.onFilterChanged = function (name, value) {
        this.params[name] = value;
        
        this.createNewSubscription();
    }
    
    this.init = function(onDataFn, columns) {
        this.onDataFn = onDataFn;
        
        // TODO: read from localstorage
        this.params.status = "any";
        this.params.startDate = "15-05-2016";
        
        this.createNewSubscription(columns);
    }
    
    this.cleanup = function() {
        if (this.stream) {
            this.stream.dispose();    
        }
    }
    
    this.createNewSubscription = function (columns) {
        var params = {
            columns: columns.join(" "),
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