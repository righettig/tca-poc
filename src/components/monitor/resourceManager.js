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
//        if (clientSideFiltering) {
//            grid.api.onFilterChanged();
//        } else {
//            this.createNewSubscription();
//        }
        
        this.createNewSubscription();
    }
    
    loadData(onDataFn, columns) {
        this.onDataFn = onDataFn;
        this.columns = columns.join(" ");
            
        this.createNewSubscription();
    }
    
    loadMoreData() {
        //this.DTA.moreRows(this.stream);
    }
    
    applyFiltering(row) {        
        return this.CriteriaBuilder.apply(this.filters, this.params, row);
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