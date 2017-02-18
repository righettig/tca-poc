angular.module('tca').component('genesisGrid', {
    templateUrl: 'src/components/common/grid.html',
    bindings: {
        name: "@",
        options: "<"
    },
    controller: function() {    
        this.$onInit = () => {
            this.options.onGridReady = event => {       
                this.options.manager.init(data => {
                    this.options.api.setRowData(data);
                });      
            }
        }
    }
});