Array.prototype.swap = function(x,y) {
    var b = this[y];
    this[y] = this[x];
    this[x] = b;
}

setTimeout(function() {

    function selection_sort(arr) {
        var sorted = [];
        var unsorted = arr.slice(0);
        var smallest, smallest_idx;
        while(unsorted.length > 0) {
            // find smallest number in sorted
            smallest_idx = -1;
            smallest = undefined; 
            for (var i = 0; i < unsorted.length; i++) {
                if(typeof smallest === 'undefined' || smallest > unsorted[i] ) {
                    smallest_idx = i;
                    smallest = unsorted[i];
                } 
            }
            // remove from unsorted
            unsorted.splice(smallest_idx,1);
            // add to sorted
            sorted.push(smallest);
        }
        return sorted;
    }

    function bubble_sort(arr) {
        var sorted = [];
        var unsorted = arr.slice(0)
        while(unsorted.length > 0) {
            // got through unsorted array from left to right
            // and swap two adjacent elements if they are in the wrong order
            for (var i = 0; i < unsorted.length-1; i++) {
                if(unsorted[i] > unsorted[i+1]) {
                    unsorted.swap(i,i+1);
                }
            }
            // last element is biggest -> append it to sorted
            sorted.unshift(unsorted.pop());
        }
        return sorted;
    }

    function insertion_sort(arr) {
        var sorted = [arr[0]];
        var unsorted = arr.slice(1)
        while(unsorted.length > 0) {
            // get first unsorted 
            var next = unsorted.shift();
            // find correct place in sorted and insert
            for (var i = 0; i < sorted.length; i++) {
                if(sorted[i] >= next) {
                    sorted.splice(i,0,next);
                    break;
                }
            }
        }
        return sorted;
    }

    function quick_sort(arr) {
        // return list if there is only one element
        if(arr.length <= 1) return arr;
        // get first element as pivot
        var pivot = arr[0];
        var left = [];
        var right = [];
        for (var i = 1; i < arr.length; i++) {
            // make a list of values smaller than pivot
            if( arr[i] < pivot) {
                left.push(arr[i]);
            } else {
            // make a list of values bigger and equal to pivot
                right.push(arr[i]);
            }
        }
        // sorting and combine partial lists 
        return quick_sort(left).concat(pivot,quick_sort(right));
    }

    var a = [10, 5, 6, 7, 8, 1, 8, 3, 1, 9,10, 5, 6, 7, 8, 1, 8, 3, 1, 9];
    var b = a.slice(0);
    var c = a.slice(0);
    var d = a.slice(0);
    lineWriter(["tosort",a]);
    lineWriter(["selection sort",selection_sort(a)]);
    lineWriter(["bubble sort",bubble_sort(a)]);
    lineWriter(["quick sort",quick_sort(b)]);
    lineWriter(["insertion sort",insertion_sort(c)]);
},0)
