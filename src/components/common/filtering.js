app.service("FiltersCache", function() {
    this.filters = {};

    this.register = 
        (name, filter) => {
            this.filters[name] = filter;
        }
    
    this.get = 
        (name) => {
            return this.filters[name];
        }    
});

class CriteriaBuilder {
    constructor(FiltersCache) {
        this.filtersCache = FiltersCache;
    }
    
    build(filters, params) {
		return filters
			.map(f => {
                return this.filtersCache.get(f).apply(params[f]);
            })
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
    
    apply(filters, params, row) {
        return filters
			.map(f => {
                return this.filtersCache.get(f).execute(params[f], row);
            })
            .reduce((a,p) => {
                return a && p;
            });
    }
}

app.service("CriteriaBuilder", CriteriaBuilder);