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
    constructor(resource, filters, DTA, CriteriaBuilder) {
        if (new.target === ResourceManager) {
            throw new TypeError("Cannot construct ResourceManager instances directly");
        }
            
        this.resource = resource;
        this.filters = filters;
            
        this.stream = null;
        this.onDataFn = null;
        this.columns = null;
        
        this.DTA = DTA;
        this.CriteriaBuilder = CriteriaBuilder;
    }
      
    init(params) {
        this.params = params;
    }
    
    onFilterChanged() {
        this.createNewSubscription();
    }
    
    loadData(onDataFn, columns) {
        this.onDataFn = onDataFn;
        this.columns = columns.join(" ");
            
        this.createNewSubscription();
    }
    
    createNewSubscription() {
        var params = {
            columns: this.columns                
        }
    
        if (this.method) {
            params.criteria = 
                this.method() + this.CriteriaBuilder.build(this.filters, this.params)
        } else {
            params.criteria = 
                this.CriteriaBuilder.build(this.filters, this.params)
        }
        
        this.cleanup();
        
        this.stream = 
            this.DTA.stream(this.resource, params);
        
        this.stream.subscribe(this.onDataFn);
    }
    
    cleanup() {
        if (this.stream) {
            this.stream.dispose();
        }
    }
}

class OrdersManager extends ResourceManager {
    constructor(DTA, CriteriaBuilder) {
        super(
            "ALL_ORDERS", 
            ["status", "startDate", "endDate", "client"], 
            DTA, CriteriaBuilder
        );
    }
    
    method() {
        return "PARENT_CHILD == 'P'";
    }
}

OrdersManager.$inject = ["DTA", "CriteriaBuilder"];

app.service("OrdersManager", OrdersManager);

app.service("FiltersCache", function() {
    this.filters = [];

    this.register = 
        (name, filter) => {
            this.filters[name] = filter;
        }
    
    this.get = 
        (name) => {
            return this.filters[name];
        }    
});

app.run(function(FiltersCache) {
    FiltersCache.register("status", {
        apply: value => {
            var result = "";
            
            if (value === "active") {
                result = '(ORDER_STATE === "OPEN" || ORDER_STATE === "ASSIGNED")';    
            }
            
            return result;
        }
    });
    
    FiltersCache.register("client", {
        apply: value => {
            var result = "";
            
            if (value) {
                result = 'CLIENT_CODE == "' + value + '"';
            }
            
            return result;
        }
    });
    
    FiltersCache.register("startDate", {
        apply: value => {
            var result = "";
            
            if (value) {
                result = "Date.isExprGreaterEqual('ENTRY_DATETIME', '" + value + "')";
            }
            
            return result;
        }
    });
    
    FiltersCache.register("endDate", {
        apply: value => {
            var result = "";
            
            if (value) {
                result = "Date.isExprLessEqual('ENTRY_DATETIME', '" + value + "')";
            }
            
            return result;
        }
    });
})

class CriteriaBuilder {
    constructor(FiltersCache) {
        this.filtersCache = FiltersCache;
    }
    
    build(filters, params) {
		return filters
			.map(f => this.filtersCache.get(f).apply(params[f]))
			.reduce((a,p, i) => {
                if (p) {
                    if (a) {
                        if (i === 1) {
                            return " && " + a + " && " + p;
                        }
                        
                        return a + " && " + p;
                        
                    } else {
                        return a + " && " + p;
                    }

                } else {
                    return a;
                }
            })
	}
}

app.service("CriteriaBuilder", CriteriaBuilder)