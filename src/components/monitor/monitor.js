app.component('monitor', {
    templateUrl: 'src/components/monitor/monitor.html',
    controller: function($state, OrdersManager, RoutesManager, FillsManager, Session) {        
        this.onFilterChanged = function (name, value) {
            Session.onFilterChanged("monitor", name, value);
            
            var manager;
            
            switch (this.page) {
                case "orders":
                    manager = OrdersManager;
                    break;
                    
                case "routes":
                    manager = RoutesManager;
                    break;
                    
                case "fills":
                    manager = FillsManager;
                    break;
                    
                default:
                    throw new Error("unknown page: " + page);
            }
                    
            manager.onFilterChanged();
        }
        
        this.$onInit = function() {
            this.page = "orders";
            
            var params = Session.get("monitor").params;
            
            OrdersManager.init(params);
            RoutesManager.init(params);
            FillsManager.init(params);
        }
        
        this.show = page => {
            this.page = page;
            
            switch (this.page) {
                case "orders":
                    $state.go("auth.monitor.orders");
                    break;
                    
                case "routes":
                    $state.go("auth.monitor.routes");
                    break;
                    
                case "fills":
                    $state.go("auth.monitor.fills");
                    break;
                    
                default:
                    throw new Error("unknown page: " + this.page);
            }
        }
    }
});