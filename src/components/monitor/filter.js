app.component("filter", {
    templateUrl: 'src/components/monitor/filter.html',
    bindings: {
        onFilterChanged: "&"
    },
    controller: function(DTA) {
        this.clients = ["CLN0001", "CLN0002"]
        this.symbols = ["AAPL", "MSFT"]
        this.baskets = ["BSK0001"]
        this.desks = ["DSK0001"]
    }
});

app.component("dropdown", {
    template: `
        <select ng-model="selectedItem" 
                ng-options="item for item in $ctrl.items" 
                ng-change="$ctrl.onSelected({item:selectedItem})"></select>

        <button ng-click="$ctrl.onSelected({item:null}); selectedItem=null">x</button>
    `,
    bindings: {
        items: "<",
        onSelected: "&"
    }
});