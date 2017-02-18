// TODO: service to deal with INSERT, MODIFY, and DELETE messages 

app.component('genesisGrid', {
    templateUrl: 'src/components/common/grid.html',
    bindings: {
        name: "@",
        options: "<"
    },
    controller: function() {
        this.mandatoryFields = [];
            
        this.loadData = () => {
            var columns = 
                this.merge(
                    this.options.columnApi.getAllDisplayedColumns().map(c => c.colId), this.mandatoryFields);
            
            this.options.manager.init(data => {
                console.log("received data");

                this.options.api.setRowData(data);
                
            }, columns);
        }
        
        this.$onInit = () => {
            this.options.onGridReady = event => {
                this.mandatoryFields = 
                    this.options.columnDefs
                        .filter(c => c.isMandatory)
                        .map(c => c.field);
                
                this.loadData();
            }
                        
            this.options.onColumnVisible =                     
            this.options.onColumnGroupOpened = 
                event => { 
                    this.loadData();
                }
        }
        
        // a,b,c + a,d=> a,b,c,d
        this.merge = 
            (i,x) => {
                h={};
                n=[];
                i.concat(x)
                    .map(b => {
                        h[b] = h[b] || n.push(b)
                    });
                return n;
            }
    }
});