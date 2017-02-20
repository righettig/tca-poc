// TODO: service to deal with INSERT, MODIFY, and DELETE messages 

app.component('genesisGrid', {
    templateUrl: 'src/components/common/grid.html',
    bindings: {
        name: "@",
        options: "<"
    },
    controller: function($element, _) {
        this.$onInit = () => {
            this.id = _.guid();
            $element.attr("id", this.id)
            
            if (this.options.clientSideFiltering) {
/*                this.options.onAfterFilterChanged = () => {
                    if (this.api.inMemoryRowModel.getRowCount() === 0) {
                        this.options.api.showNoRowsOverlay();
                    } else {
                        this.options.api.hideOverlay();
                    }
                }*/
                this.options.isExternalFilterPresent = () => {
                    return true;
                }
                this.options.doesExternalFilterPass = node => {
                    return this.options.manager.applyFiltering(node.data);
                }
            }
            
            this.options.onGridReady = event => {
                // so that the manager can later invoke methods such as "onFilterChanged"
                this.options.manager.grid = this.options;
                
                this.mandatoryFields = 
                    this.options.columnDefs
                        .filter(c => c.isMandatory)
                        .map(c => c.field);
                                                
                if (!this.options.suppressMoreRows) {
                    this.registerMoreRows();
                }
                            
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
                _.merge(
                    this.options.columnApi.getAllDisplayedColumns().map(c => c.colId), this.mandatoryFields);
            
            this.options.manager.loadData(data => {
                console.log("received data");

                this.options.api.setRowData(data);
                
            }, columns);
        }
        
        this.registerMoreRows = () => {
            var viewport = $("#" + this.id + " .ag-body-viewport");
            var gridHeight = $("#" + this.id + " .ag-body-container");
            var prevLeft = 0; // we want to ignore horizontal scrolls

            viewport.scroll(
                _.throttle(() => {
                    var currentLeft = viewport.scrollLeft();
                    if (prevLeft !== currentLeft) {
                        prevLeft = currentLeft;
                        return;
                    }
                    var threshold = 
                        gridHeight.height() - (viewport.height() + viewport.scrollTop());

                    console.log(threshold);
                    if (threshold <= 400) {
                        this.options.api.showLoadingOverlay();
                        
                        this.options.manager.loadMoreData();
                    }
                }, 400));
        }
        
        this.mandatoryFields = [];
    }
});