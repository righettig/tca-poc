angular.module('tca').component("filter", {
    templateUrl: 'src/components/monitor/filter.html',
    bindings: {
        onFilterChanged: "&"
    }
});