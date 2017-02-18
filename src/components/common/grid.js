// TODO: service to deal with INSERT, MODIFY, and DELETE messages 

app.component('genesisGrid', {
    templateUrl: 'src/components/common/grid.html',
    bindings: {
        name: "@",
        options: "<"
    },
    controller: function() {
        this.loadData = () => {
            var columns = 
                this.options.columnApi.getAllDisplayedColumns().map(c => c.colId);
                
            this.options.manager.init(data => {
                console.log("received data");

                this.options.api.setRowData(data);
            }, columns);
        }
        
        this.$onInit = () => {
            this.options.onColumnVisible = event => {
                console.log(event);
                
                this.loadData();
            }
            
            this.options.onGridReady = event => { 
                this.loadData();
            }
            
            this.options.onColumnGroupOpened = event => { 
                this.loadData();
            }
        }
    }
});