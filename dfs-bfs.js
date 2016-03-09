

function dfs(start, nodes, fn) {
    var visited = [start];
    function _notVisited(value, index, self) { 
        return visited.indexOf(value) < 0;
    }
    var nodes_to_visit = nodes[start].slice(0);
    while( nodes_to_visit.length > 0) {
        var current = nodes_to_visit.shift();
        visited.push(current);
        nodes_to_visit = nodes[current].slice(0).concat(nodes_to_visit).filter(_notVisited);
        if(fn(current)) return;
    }
};

function bfs(start, nodes, fn) {
    var visited = [start];
    function _notVisited(value, index, self) { 
        return visited.indexOf(value) < 0;
    }
    var nodes_to_visit = nodes[start].slice(0);
    while( nodes_to_visit.length > 0) {
        var current = nodes_to_visit.shift();
        visited.push(current);
        nodes_to_visit = nodes_to_visit.concat(nodes[current].slice(0)).filter(_notVisited);
        if(fn(current)) return;
    }
};

function helloWriter(o) {
    document.getElementById('hello').innerHTML += "</br>" + JSON.stringify(o);
}

var nodes = [
    [1, 2, 3, 4], 
    [5, 6],
    [7,0],
    [8, 9],
    [10], 
    [],
    [],
    [11, 12],
    [13],
    [],
    [],
    [],
    [3],
    []
];

helloWriter(["nodes",nodes]);

var visited = [];
dfs(0, nodes, function (n) {
    if(n == 10) {
        helloWriter(["DFS found",n, "visited",visited.join(', ')])
        return true;
    }
    visited.push(n);
    return false;
});

visited = [];
bfs(0, nodes, function (n) {
    if(n == 10) {
        helloWriter(["BFS found",n, "visited",visited.join(', ')])
        return true;
    }
    visited.push(n);
    return false;
});

