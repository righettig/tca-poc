app.service("_", function() {
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
        
    this.guid = 
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
});