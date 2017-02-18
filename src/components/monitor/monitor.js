app.component('monitor', {
    templateUrl: 'src/components/monitor/monitor.html',
    controller: function(OrdersManager, RoutesManager, FillsManager) {        
        this.onFilterChanged = function (name, value) {
            var manager;
            
            switch (this.page) {
                case "orders":
                    manager = OrdersManager;
                    break;
                    
                case "routes":
                    manager = RoutesManager;
                    
                case "fills":
                    manager = FillsManager;
                    
                default:
                    throw new Error("unknown page: " + page);
            }
                    
            manager.onFilterChanged(name, value);
        }
                
        this.onPageChanging = function() {
            var manager;
            
            switch (this.page) {
                case "orders":
                    manager = OrdersManager;
                    break;
                    
                case "routes":
                    manager = RoutesManager;
                    
                case "fills":
                    manager = FillsManager;
                    
                default:
                    throw new Error("unknown page: " + page);
            }
                    
            manager.cleanup();
        }
        
        this.$onInit = function() {
            this.page = "orders";
        }
    }
});