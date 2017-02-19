app.component("filter", {
    templateUrl: 'src/components/monitor/filter.html',
    bindings: {
        onFilterChanged: "&"
    },
    controller: function(DTA) {
        this.clients = ["c1", "c2"]
    }
});