// TODO: service to deal with INSERT, MODIFY, and DELETE messages 

app.component('genesisGrid', {
    templateUrl: 'src/components/common/grid.html',
    bindings: {
        name: "@",
        options: "<"
    },
    controller: function($element) {
        this.$onInit = () => {
            this.id = this.createGuid();
            $element.attr("id", this.id)
            
            this.options.onGridReady = event => {
                this.mandatoryFields = 
                    this.options.columnDefs
                        .filter(c => c.isMandatory)
                        .map(c => c.field);
                
                var viewport = $("#" + this.id + " .ag-body-viewport");
                var gridHeight = $("#" + this.id + " .ag-body-container");
                var prevLeft = 0; // we want to ignore horizontal scrolls
                
                viewport.scroll(
                    this.throttle(() => {
                        var currentLeft = viewport.scrollLeft();
                        if (prevLeft !== currentLeft) {
                            prevLeft = currentLeft;
                            return;
                        }
                        var threshold = 
                            gridHeight.height() - (viewport.height() + viewport.scrollTop());
                        
                        console.log(threshold);
                        if (threshold <= 400) {
                            //this.options.api.showLoadingOverlay();
                            console.log("MORE_ROWS");
                        }
                    }, 400));
                
                this.loadData();
            }
                        
            this.options.onColumnVisible =                     
            this.options.onColumnGroupOpened = 
                event => { 
                    this.loadData();
                }
        }
        
        this.loadData = () => {
            var columns = 
                this.merge(
                    this.options.columnApi.getAllDisplayedColumns().map(c => c.colId), this.mandatoryFields);
            
            this.options.manager.loadData(data => {
                console.log("received data");

                this.options.api.setRowData(data);
                
            }, columns);
        }
        
        this.mandatoryFields = []; 
        
        this.throttle = function(callback, limit) {
                var wait = false;               // Initially, we're not waiting
                return function() {             // We return a throttled function
                    if (!wait) {                // If we're not waiting
                        callback.call();        // Execute users function
                        wait = true;            // Prevent future invocations
                        setTimeout(function() { // After a period of time
                            wait = false;       // And allow future invocations
                        }, limit);
                    }
                }
            }
        
        this.createGuid = 
            () =>
                'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {  
                    var r = Math.random()*16|0, v = c === 'x' ? r : (r&0x3|0x8);  
                    return v.toString(16);  
                });
        
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