
(function() {
    function search(type, start, nodes, fn) {
        var visited = [start];
        function _notVisited(value, index, self) { 
            return visited.indexOf(value) < 0;
        }
        var nodes_to_visit = nodes[start].slice(0);
        while( nodes_to_visit.length > 0) {
            var current = nodes_to_visit.shift();
            visited.push(current);
            if(type == "dfs") // prepend to the searchlist
                nodes_to_visit = nodes[current].slice(0).concat(nodes_to_visit).filter(_notVisited);
            else // append to the searchlist
                nodes_to_visit = nodes_to_visit.concat(nodes[current].slice(0)).filter(_notVisited);
            if(fn(current)) return;
        }
    };

    function search_recur(type,start,nodes,fn) {
       var blacklist = [start];
       (function _search_recur(current) {
            for (var i = 0; i < nodes[current].length; i++) {
                var num = nodes[current][i];
                if(blacklist.indexOf(num) > -1) return;
                blacklist.push(num);
                if(fn(num)) return;
                // I'm pushing the function on the callback queue 
                // with setTimeout
                // the inner loop is on the call stack
                // -> 0 , 1, 2, 3, 4 function ends and 
                // the callback queue returns the first level recursive search
                // puts them on the call stack            
                if(type == 'bfs') setTimeout(_search_recur,0,num);
                // if i don't do setTimeout it pushes every call on the call stack
                // -> 1 -> 5,6 -> 2 
                else _search_recur(num);
            }
        })(start);
    }


    var nodes = [
        [1, 2, 3, 4], 
        [5, 6],
        [7],
        [8, 9],
        [10], 
        [],
        [],
        [11, 12],
        [13],
        [],
        [],
        [],
        [],
        []
    ];



    function randomTree(depth,breadth) {
        var count = 0;
        var nodes = [];
        while(depth >= 0) {
            var children = [];
            var rbreadth = (Math.random() * breadth) | 0;
            for (var i = 0; i < rbreadth; i++) {
                children.push(++count);
            }
            nodes.push(children);
            depth -= 1;
        }
        for (i = nodes.length; i < count; i++) {
            nodes.push([]);
        }
        return nodes;
    }

    function cbFactory(message,search) {
        var visited = [];
        return function(n) {
            if(n == search) {
                lineWriter([message,"found",n, "visited",visited.join(', ')])
                return true;
            }
            visited.push(n);
            return false;

        }
    }
    nodes = randomTree(4,100);
    find =  (Math.random() * nodes.length) | 0

    //lineWriter(["nodes",nodes]);

    search('dfs',0, nodes, cbFactory('dfs',find));

    search('bfs',0, nodes, cbFactory('bfs',find));

    // note that it will display AFTER dfs recursive because its pushed on the queue
    // by setTiemout
    search_recur('bfs',0, nodes, cbFactory('bfs recursive',find));

    search_recur('dfs',0, nodes, cbFactory('dfs recursive',find));


})()

