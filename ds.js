//  1.1 Is Unique: Implement an algorithm to determine if a string has all unique characters. What if you
// cannot use additional data structures?

exports.isUnique = (inputStr) => {
	let strCheck = 0;
	let strLength = inputStr.length;
	for (let idx = 0; idx < strLength; idx++) {

		let val = inputStr.charCodeAt(idx) - 'a'.charCodeAt(0);
		console.log(`${inputStr[idx]} --- ${val}`);

		if ((strCheck & (1 << val)) > 0) {
			return false;
		}
		strCheck |= (1 << val);
	}

	return true;
}

function ListNode(value) {
	this.data = value;
	this.next = null;
}



function BinaryTreeNode(value) {
	this.data = value;
	this.left = null;
	this.right = null;
}


exports.BinaryTreeNode = BinaryTreeNode;
exports.ListNode = ListNode;

exports.printList = (head, reset) => {
	if (reset) head = null;
	let ret = null;
	while (head !== null) {
		ret = `${ret ? ret : ""}${head.data} ${head.next ? " -> " : ""}`;
		head = head.next;
	}
	console.log(ret);
}
exports.reverse = (node) => {
	let head = new ListNode(node.data);
	while (node !== null && node.next !== null) {
		let temp = new ListNode(node.next.data);
		temp.next = head;
		head = temp;
		node = node.next;
	}
	return head;
}

exports.addHead = (list, newHead) => {
	let head = new ListNode(newHead);
	if (!list) return head;
	head.next = list;
	return head;
}

exports.addTail = (list, newTail) => {
	let tail = new ListNode(newTail);
	let last = list;
	while (last.next !== null) {
		last = last.next;
	}
	last.next = tail;
	return list;
}
exports.middleElement = (head) => {
	let slow = head;
	let fast = head;
	let middle = null;
	while (fast !== null && fast.next != null) {
		slow = slow.next;
		fast = fast.next.next;
		if (slow === fast) {
			break;
		}
	}

	if (fast === null || fast.next === null) {
		middle = slow;
		return {
			cycle: false,
			middle: middle
		}
	}

	//find cyrcle start;
	slow = head;
	while (slow !== fast) {
		slow = slow.next;
		fast = fast.next;
	}

	return {
		cycle: true,
		cyrcle: slow
	};
}

exports.inOrderTraversal = function inOrderTraversal(root) {
	if (root) {
		inOrderTraversal(root.left);
		console.log(root.data);
		inOrderTraversal(root.right);
	}
}

exports.inOrderTraversalIterative = function inOrderTraversalIterative(root) {
	let stack = [root];
	let currNode = root.left;
	while (stack.length || currNode) {
		while (currNode) {
			//console.log(currNode.data);[1,2,4]
			stack.push(currNode);
			currNode = currNode.left;
		}
		currNode = stack.pop();
		console.log(currNode.data);
		currNode = currNode.right;
	}
}

exports.preOrderTraversal = function preOrderTraversal(root) {
	if (root) {
		console.log(root.data);
		preOrderTraversal(root.left);
		preOrderTraversal(root.right);
	}
}

exports.preOrderTraversalIterative = function preOrderTraversalIterative(root) {
	let stack = [root];
	let currNode = root;
	while (stack.length) {
		while (currNode) {
			console.log(currNode.data);
			stack.push(currNode);
			currNode = currNode.left;
		}
		currNode = stack.pop();
		currNode = currNode.right;
	}
}

exports.postOrderTraversal = function postOrderTraversal(root) {
	if (root) {
		postOrderTraversal(root.left);
		postOrderTraversal(root.right);
		console.log(root.data);
	}
}

exports.levelOrderTraversal = (root) => {
	let queue = [root];
	let visited = {};
	let level = 0;

	while (queue.length) {
		console.log("------ LEVEL " + level + " ------- ")
		let levelSize = queue.length;
		while (levelSize > 0) {
			let node = queue.shift();
			if (!visited[node.data]) {
				visited[node.data] = true;
				process.stdout.write(node.data + " ");
				if (node.left) queue.push(node.left);
				if (node.right) queue.push(node.right);
			}
			levelSize--;
		}
		level++;
		console.log("");
	}
}


function BinaryHeap(scoreFunction) {
	this.content = [];
	this.score = scoreFunction;
}
exports.BinaryHeap = BinaryHeap;
BinaryHeap.prototype = {
	push: function (element) {
		this.content.push(element);
		this.bubbleUp(this.content.length - 1);
	},

	bubbleUp: function (n) {
		let el = this.content[n];
		let elscore = this.score(el);
		while (n > 0) {
			let parentN = Math.floor((n + 1) / 2) - 1;
			let parent = this.content[parentN];
			// If the parent has a lesser score, things are in order and we
			// are done.
			if (elscore >= this.score(parent))
				break;

			// Otherwise, swap the parent with the current element and
			// continue.
			this.content[parentN] = el;
			this.content[n] = parent;
			n = parentN;
		}
	},

	pop: function () {
		// Store the first element so we can return it later.
		let result = this.content[0];
		// Get the element at the end of the array.
		let end = this.content.pop();
		// If there are any elements left, put the end element at the
		// start, and let it sink down.
		if (this.content.length > 0) {
			this.content[0] = end;
			this.sinkDown(0);
		}
		return result;
	},

	size: function () {
		return this.content.length;
	},

	sinkDown: function (n) {
		// Look up the target element and its score.
		let length = this.content.length;
		let element = this.content[n];
		let elemScore = this.score(element);

		while (true) {
			// Compute the indices of the child elements.
			let child2N = (n + 1) * 2;
			let child1N = child2N - 1;
			let child1Score = 0;
			// This is used to store the new position of the element,
			// if any.
			let swap = null;
			// If the first child exists (is inside the array)...
			if (child1N < length) {
				// Look it up and compute its score.
				let child1 = this.content[child1N];
				child1Score = this.score(child1);
				// If the score is less than our element's, we need to swap.
				if (child1Score < elemScore)
					swap = child1N;
			}
			// Do the same checks for the other child.
			if (child2N < length) {
				let child2 = this.content[child2N];
				let child2Score = this.score(child2);
				if (child2Score < (swap == null ? elemScore : child1Score))
					swap = child2N;
			}

			// No need to swap further, we are done.
			if (swap == null) break;

			// Otherwise, swap and continue.
			this.content[n] = this.content[swap];
			this.content[swap] = element;
			n = swap;
		}

	}
}

function Graph() {
	this.nodes = [];
	this.nodeMap = {};
	this.indegrees = {};
	this.addNode = function (node) {
		this.nodes.push({ id: node, edges: [] });
		this.nodeMap[node] = this.nodes[this.nodes.length - 1];
		this.indegrees[node] = 0;
	};
	this.addEdge = function (source, dest) {
		this.nodeMap[source].edges.push(dest);
		this.indegrees[dest] += 1;
	};

	this.DFS = function (start) {
		let stack = [start];
		let parent = {};
		let visited = {};
		while (stack.length) {
			let id = stack.pop();
			if (!visited[id]) {
				visited[id] = true;
				process.stdout.write(`${id} - `);
				let node = this.nodeMap[id];
				for (let index = 0; index < node.edges.length; index++) {
					let adj = node.edges[index];
					if (!visited[adj]) {
						parent[adj] = id;
						stack.push(adj);
					}
				}
			}
		}
		console.log("");
		return parent;
	};

	this.BFS = function (start) {
		let queue = [start];
		let parent = {};
		let visited = {};
		while (queue.length) {
			let id = queue.shift();
			if (!visited[id]) {
				visited[id] = true;
				process.stdout.write(`${id} - `);
				let node = this.nodeMap[id];
				for (let index = 0; index < node.edges.length; index++) {
					let adj = node.edges[index];
					if (!visited[adj]) {
						parent[adj] = id;
						queue.push(adj);
					}
				}
			}
		}
		console.log("");
		return parent;
	};

	this.topSort = function () {
		let queue = [];
		let result = [];
		for (let index = 0; index < this.nodes.length; index++) {
			let el = this.nodes[index];
			if (this.indegrees[el.id] === 0) {
				queue.push(el.id);
			}
		}

		while (queue.length) {
			let curr = queue.shift();
			result.push(curr);
			let node = this.nodeMap[curr];
			for (let index = 0; index < node.edges.length; index++) {
				let adj = node.edges[index];
				this.indegrees[adj] -= 1;
				if (this.indegrees[adj] === 0) {
					queue.push(adj);
				}
			}
		}

		return {
			cycle: result.length !== this.nodes.length,
			sort: result
		}
	}
}

exports.Graph = Graph;

public virtual Node lcaBynarySearchTree(Node root, int n1, int n2)  
{  
    while (root != null)  
    {  
        // If both n1 and n2 are smaller than 
        // root, then LCA lies in left  
        if (root.data > n1 && root.data > n2)  
        root = root.left;  
  
        // If both n1 and n2 are greater than  
        // root, then LCA lies in right  
        else if (root.data < n1 && root.data < n2)  
        root = root.right;  
  
        else break;  
    }  
    return root;  
} 
Node findLCABynaryTree(Node node, int n1, int n2) 
    { 
        // Base case 
        if (node == null) 
            return null; 
  
        // If either n1 or n2 matches with root's key, report 
        // the presence by returning root (Note that if a key is 
        // ancestor of other, then the ancestor key becomes LCA 
        if (node.data == n1 || node.data == n2) 
            return node; 
  
        // Look for keys in left and right subtrees 
        Node left_lca = findLCA(node.left, n1, n2); 
        Node right_lca = findLCA(node.right, n1, n2); 
  
        // If both of the above calls return Non-NULL, then one key 
        // is present in once subtree and other is present in other, 
        // So this node is the LCA 
        if (left_lca!=null && right_lca!=null) 
            return node; 
  
        // Otherwise check if left subtree or right subtree is LCA 
        return (left_lca != null) ? left_lca : right_lca; 
    } 

// exports.treeDFSRecursive = function treeDFSRec(root) {
// 	if (root) {
// 		console.log(root.data);
// 		for (var index = 0; index < root.children.length; index++) {
// 			treeDFSRec(root.children[index]);
// 		}

// 	}
// }

// exports.treeBFS = (root) => {
// 	let queue = [root];
// 	let visited = {};
// 	let parent = {};
// 	let level = 0;

// 	while (queue.length) {
// 		console.log("------ LEVEL " + level + " ------- ")
// 		let levelSize = queue.length;
// 		while (levelSize > 0) {
// 			let node = queue.shift();
// 			if (!visited[node.data]) {
// 				visited[node.data] = true;
// 				process.stdout.write(node.data + " ");
// 				for (var index = 0; index < node.children.length; index++) {
// 					var element = node.children[index];
// 					if (!visited[element.data]) {
// 						parent[element.data] = node.data;
// 						queue.push(element);
// 					}
// 				}
// 			}
// 			levelSize--;
// 		}
// 		level++;
// 		//console.log(parent);
// 		console.log("");
// 	}
// 	return parent;
// }

function WGraph() {
	this.nodes = [];
	this.nodeMap = {};
	this.addNode = function (node) {
		this.nodes.push({ id: node, edges: [] });
		this.nodeMap[node] = this.nodes[this.nodes.length - 1];
	};
	this.addEdge = function (source, dest, value) {
		this.nodeMap[source].edges.push({ src: source, dest: dest, val: value });
		this.nodeMap[dest].edges.push({ src: dest, dest: source, val: value, back: true });

	};

	this.prim = function (start) {
		let heap = new BinaryHeap(function (x) { return x.val; });
		let result = [];
		let startnode = this.nodeMap[start];
		result.push({ id: startnode.id, dist: 0 });
		for (let index = 0; index < startnode.edges.length; index++) {
			let edge = startnode.edges[index];
			heap.push(edge);
		};
		let totaldist = 0;
		while (heap.size()) {
			let min = heap.pop();
			let minNode = this.nodeMap[min.dest];
			if (result.findIndex(n => n.id === minNode.id) < 0) {
				totaldist = totaldist + min.val;
				result.push({ id: minNode.id, dist: min.val });
				for (let index = 0; index < minNode.edges.length; index++) {
					let edge = minNode.edges[index];
					heap.push(edge);
				};
			}
		}
		console.log(totaldist);
		return result;
	};

	this.dijkstra = function (start) {
		let distances = {};
		let heap = new BinaryHeap(function (x) { return x.val; });

		let startnode = this.nodeMap[start];
		distances[start] = { dist: 0, from: "-" };
		for (let index = 0; index < startnode.edges.length; index++) {
			let edge = startnode.edges[index];
			distances[edge.dest] = { dist: edge.val, from: edge.src }
			heap.push(edge);
		};
		while (heap.size()) {
			let min = heap.pop();
			let minNode = this.nodeMap[min.dest];
			for (let index = 0; index < minNode.edges.length; index++) {
				let edge = minNode.edges[index];
				if (!edge.back) {
					let oldDistance = distances[edge.dest] ? distances[edge.dest].dist : null;
					let newDistance = distances[edge.src].dist + edge.val;
					if (!oldDistance || oldDistance > newDistance) {
						distances[edge.dest] = { dist: newDistance, from: edge.src }
						heap.push(edge);
					}
				}
			};
		}
		return distances;
	};
}

exports.WGraph = WGraph;


function search(pat, txt) {
	let M = pat.length;
	let N = txt.length;

	/* A loop to slide pat[] one by one */
	for (let i = 0; i <= N - M; i++) {
		let j;

		/* For current index i, check for pattern match */
		for (j = 0; j < M; j++)
			if (txt[i + j] != pat[j])
				break;

		if (j == M)  // if pat[0...M-1] = txt[i, i+1, ...i+M-1]
			console.log("Pattern found at index " + i);
	}
}

exports.searchstr = search;

exports.mergesort = function mergesort(arr) {
	if (arr.length < 2)
		return arr;

	var middle = parseInt(arr.length / 2);
	var left = arr.slice(0, middle);
	var right = arr.slice(middle, arr.length);
	return merge(mergesort(left), mergesort(right));
}
function merge(left, right) {
	var result = [];

	while (left.length && right.length) {
		if (left[0] <= right[0]) {
			result.push(left.shift());
		} else {
			result.push(right.shift());
		}
	}

	while (left.length)
		result.push(left.shift());

	while (right.length)
		result.push(right.shift());

	return result;
}

exports.quicksort = function quicksort(arr) {
	if (arr.length == 0)
		return [];

	var left = new Array();
	var right = new Array();
	var pivot = arr[0];

	for (var i = 1; i < arr.length; i++) {
		if (arr[i] < pivot) {
			left.push(arr[i]);
		} else {
			right.push(arr[i]);
		}
	}

	return quicksort(left).concat(pivot, quicksort(right));
}


function TrieNode(value) {
	this.value = value;
	this.children = {};
	this.isLeaf = false;

}

exports.Trie = function trie() {
	this.root = new TrieNode(null);

	this.add = function (word) {
		let ptr = this.root;
		for (let i = 0; i < word.length; i++) {
			if (!ptr.children[word[i]]) {
				ptr.children[word[i]] = new TrieNode(word[i]);
			}
			ptr = ptr.children[word[i]];
		}
		ptr.isLeaf = true;
	};

	this.getWords = function () {
		let result = [];
		function traverse(node, path, length) {
			if (!node) return;
			if (node.value) path[length++] = node.value;
			if (node.isLeaf) result.push(path.slice(0,length).join(""));
			Object.keys(node.children).forEach(function (key) {
				traverse(node.children[key], path, length);
			});
		}

		traverse(this.root, [], 0);
    	return result;
	}

	this.search = function (key) {
		let result = [];
		let ptr = this.root;
		if (!key || !key.length) return result;

		 var prefix = key.slice(0, key.length - 1);

		//start search from the found prefix
		for (let i = 0; i < key.length; i++) {
			if(ptr.children[key[i]]){
				ptr = ptr.children[key[i]];
			} else {
				return result;
			}
			
		}
		function traverse(node, path, length) {
			if (!node) return;
			if (node.value) path[length++] = node.value;
			if (node.isLeaf) result.push(prefix + path.slice(0,length).join(""));
			Object.keys(node.children).forEach(function (key) {
				traverse(node.children[key], path, length);
			});
		}

		traverse(ptr, [], 0);
    	return result;
	}
}

public class Solution {
	public ListNode detectCycle(ListNode node) {
	   
	    ListNode slow = node;
	    ListNode fast = node;
	    boolean found = false;
        while (slow != null && fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
            // If slow and fast meet at same point then loop is present
            if (slow == fast) {
                found = true;
                 break;
            }
        }
        
        if(found) {
            slow = node;
            while(fast != slow){
                fast= fast.next;
                slow = slow.next;
            }
            return slow;
        }
        return null;
	}
}

module.exports = { 
	//param A : array of integers
	//param B : integer
	//return an integer
	diffPossible : function(A, B){
	    var size = A.length;
	    var start = 0;
	    var end =1;
        while(start < size && end < size) {
            if(end !== start && A[end] - A[start] === B){
                return 1;
            } else if (A[end] - A[start] < B)
                end++;
            else
                start++;
        }
        return 0;
	}
};

coin change
if(amount>coiin)
	t[amount] = t[amount] + t[amount-coin]

static long coinChange(int []S, int m, int n) 
    { 
        //Time complexity of this function: O(mn) 
        //Space Complexity of this function: O(n) 
  
        // table[i] will be storing the number of solutions 
        // for value i. We need n+1 rows as the table is 
        // constructed in bottom up manner using the base 
        // case (n = 0) 
        int[] table = new int[n+1]; 
  
        // Initialize all table values as 0 
        for(int i = 0; i < table.Length; i++)  
        { 
            table[i] = 0; 
        } 
  
        // Base case (If given value is 0) 
        table[0] = 1; 
  
        // Pick all coins one by one and update the table[] 
        // values after the index greater than or equal to 
        // the value of the picked coin 
        for (int i = 0; i < m; i++) 
            for (int j = S[i]; j <= n; j++) 
                table[j] += table[j - S[i]]; 
  
        return table[n]; 
    } 
public class Knapsack {
    public static void main(String args[]) {
        int w = 10;
        int n = 4;
        int[] val = {10, 40, 30, 50};
        int[] wt = {5, 4, 6, 3};

        // Populate base cases
        int[][] mat = new int[n + 1][w + 1];
        for (int r = 0; r < w + 1; r++) {
            mat[0][r] = 0;
        }
        for (int c = 0; c < n + 1; c++) {
            mat[c][0] = 0;
        }
        
        // Main logic
        for (int item = 1; item <= n; item++) {
            for (int capacity = 1; capacity <= w; capacity++) {
                int maxValWithoutCurr = mat[item - 1][capacity]; // This is guaranteed to exist
                int maxValWithCurr = 0; // We initialize this value to 0
                
                int weightOfCurr = wt[item - 1]; // We use item -1 to account for the extra row at the top
                if (capacity >= weightOfCurr) { // We check if the knapsack can fit the current item
                    maxValWithCurr = val[item - 1]; // If so, maxValWithCurr is at least the value of the current item
                    
                    int remainingCapacity = capacity - weightOfCurr; // remainingCapacity must be at least 0
                    maxValWithCurr += mat[item - 1][remainingCapacity]; // Add the maximum value obtainable with the remaining capacity
                }
                
                mat[item][capacity] = Math.max(maxValWithoutCurr, maxValWithCurr); // Pick the larger of the two
            }
        }
        
        System.out.println(mat[n][w]); // Final answer
        System.out.println(Arrays.deepToString(mat)); // Visualization of the table
    }
}

public static void shuffle(int []card,  
                               int n) 
    { 
          
        Random rand = new Random(); 
          
        for (int i = 0; i < n; i++) 
        { 
              
            // Random for remaining positions. 
            int r = i + rand.Next(52 - i); 
              
            //swapping the elements 
            int temp = card[r]; 
            card[r] = card[i]; 
            card[i] = temp; 
              
        } 
    } 


static int BFSMATRICE(int [,]mat, Point src, 
                           Point dest) 
{ 
    // check source and destination cell 
    // of the matrix have value 1 
    if (mat[src.x, src.y] != 1 ||  
        mat[dest.x, dest.y] != 1) 
        return -1; 
  
    bool [,]visited = new bool[ROW, COL]; 
      
    // Mark the source cell as visited 
    visited[src.x, src.y] = true; 
  
    // Create a queue for BFS 
    Queue<queueNode> q = new Queue<queueNode>(); 
      
    // Distance of source cell is 0 
    queueNode s = new queueNode(src, 0); 
    q.Enqueue(s); // Enqueue source cell 
  
    // Do a BFS starting from source cell 
    while (q.Count != 0) 
    { 
        queueNode curr = q.Peek(); 
        Point pt = curr.pt; 
  
        // If we have reached the destination cell, 
        // we are done 
        if (pt.x == dest.x && pt.y == dest.y) 
            return curr.dist; 
  
        // Otherwise dequeue the front cell  
        // in the queue and enqueue 
        // its adjacent cells 
        q.Dequeue(); 
  
        for (int i = 0; i < 4; i++) 
        { 
            int row = pt.x + rowNum[i]; 
            int col = pt.y + colNum[i]; 
              
            // if adjacent cell is valid, has path  
            // and not visited yet, enqueue it. 
            if (isValid(row, col) &&  
                    mat[row, col] == 1 &&  
               !visited[row, col]) 
            { 
                // mark cell as visited and enqueue it 
                visited[row, col] = true; 
                queueNode Adjcell = new queueNode(new Point(row, col), 
                                                      curr.dist + 1 ); 
                q.Enqueue(Adjcell); 
            } 
        } 
    } 
  
    // Return -1 if destination cannot be reached 
    return -1; 
} 
