let ch1 = require("../chapter1/index") 
let expect = require("expect");
describe.only("is unique", function () {
	// it("cyrcle and middle", function () {
	// 	let node = new ch1.ListNode(12);
	// 	let node2 = new ch1.ListNode(7);
	// 	let node3 = new ch1.ListNode(4);
	// 	let node4 = new ch1.ListNode(65);
	// 	let node5 = new ch1.ListNode(33);
	// 	let node6 = new ch1.ListNode(22);
	// 	node.next = node2;
	// 	node2.next = node3;
	// 	node3.next = node4;
	// 	node4.next = node5;
	// 	node5.next = node6;
	// 	node6.next = node2;
	// 	let res = ch1.middleElement(node);
	// 	//console.log(node);
	// 	console.log(res);
	// });

	// it("reverse", function () {
	// 	let node = new ch1.ListNode(12);
	// 	let node2 = new ch1.ListNode(7);
	// 	let node3 = new ch1.ListNode(4);
	// 	let node4 = new ch1.ListNode(65);
	// 	let node5 = new ch1.ListNode(33);
	// 	let node6 = new ch1.ListNode(22);
	// 	node.next = node2;
	// 	node2.next = node3;
	// 	node3.next = node4;
	// 	node4.next = node5;
	// 	node5.next = node6;
	// 	let res = ch1.reverse(node);
	// 	ch1.printList(node);
	// 	ch1.printList(res);
	// });

	// it("add head", function () {
	// 	let node = new ch1.ListNode(12);
	// 	let node2 = new ch1.ListNode(7);
	// 	let node3 = new ch1.ListNode(4);
	// 	let node4 = new ch1.ListNode(65);
	// 	let node5 = new ch1.ListNode(33);
	// 	let node6 = new ch1.ListNode(22);
	// 	node.next = node2;
	// 	node2.next = node3;
	// 	node3.next = node4;
	// 	node4.next = node5;
	// 	node5.next = node6;
	// 	let res = ch1.addHead(node, 44);
	// 	ch1.printList(node);
	// 	ch1.printList(res);
	// });

	// it("add tail", function () {
	// 	let node = new ch1.ListNode(12);
	// 	let node2 = new ch1.ListNode(7);
	// 	let node3 = new ch1.ListNode(4);
	// 	let node4 = new ch1.ListNode(65);
	// 	let node5 = new ch1.ListNode(33);
	// 	let node6 = new ch1.ListNode(22);
	// 	node.next = node2;
	// 	node2.next = node3;
	// 	node3.next = node4;
	// 	node4.next = node5;
	// 	node5.next = node6;
	// 	ch1.printList(node, true);
	// 	let res = ch1.addTail(node, 44);
		
	// 	ch1.printList(res);
	// });

	// it("tree DFS and bfs", function () {
	// 	let root = new ch1.TreeNode("root");
	// 	let node2 = new ch1.TreeNode("root-ch1");
	// 	let node3 = new ch1.TreeNode("root-ch2");
	// 	let node4 = new ch1.TreeNode("root-ch3");
	// 	let node5 = new ch1.TreeNode("ch1-ch1");
	// 	let node6 = new ch1.TreeNode("ch1-ch2");
	// 	root.addChild(node2);
	// 	root.addChild(node3);
	// 	root.addChild(node4);
	// 	node2.addChild(node5);
	// 	node2.addChild(node6);
	// 	node3.addChild(new ch1.TreeNode("ch2-ch1"));
	// 	node3.addChild(new ch1.TreeNode("ch2-ch2"));
	// 	node3.addChild(new ch1.TreeNode("ch2-ch3"));
	// 	// console.log("----------DFS----------")
	// 	// ch1.treeDFS(root);
	// 	// console.log("----------DFS REC----------")
	// 	// ch1.treeDFSRecursive(root);
	// 	console.log("----------BFS ----------")
	// 	ch1.treeBFS(root);
	// });

	// it("binary tree traversal", function () {
	// 	debugger;
	// 	let root = new ch1.BinaryTreeNode("10");
	// 	let node2 = new ch1.BinaryTreeNode("8");
	// 	let node3 = new ch1.BinaryTreeNode("13");
	// 	let node4 = new ch1.BinaryTreeNode("7");
	// 	let node5 = new ch1.BinaryTreeNode("9");
	// 	root.left = node2;
	// 	root.right = node3;
	// 	node2.left = node4;
	// 	node2.right = node5;
	// 	node3.left = new ch1.BinaryTreeNode("12");
	// 	node3.right = new ch1.BinaryTreeNode("14");
	// 	node3.left.left = new ch1.BinaryTreeNode("11");
	// 	console.log("----------INORDER----------")
	// 	ch1.inOrderTraversal(root);
	// 	console.log("----------INORDERITERATIVE----------")
	// 	ch1.inOrderTraversalIterative(root);
	// 	console.log("----------PREORDER----------")
	// 	ch1.preOrderTraversal(root);
	// 	console.log("----------PREORDERITER----------")
	// 	ch1.preOrderTraversalIterative(root);
	// 	console.log("----------POSTORDER----------")
	// 	ch1.postOrderTraversal(root);
	// 	console.log("----------LEVELORDER----------")
	// 	ch1.levelOrderTraversal(root);
		
	// });
	// it("binary heap", function () {
	// 	var heap = new ch1.BinaryHeap(function(x){return x;});
	// 	[10, 3, 4, 8, 2, 9, 7, 1, 2, 6, 5].forEach(el => {
	// 		heap.push(el);
	// 	});

	// 	while(heap.size()){
	// 		console.log(heap.pop())
	// 	}
	// })
	// it("Graph BFS DFS", function () {
	// 	debugger;
	// 	let g = new ch1.Graph();
	// 	g.addNode('a');
	// 	g.addNode('b');
	// 	g.addNode('c');
	// 	g.addNode('d');
	// 	g.addNode('e');
	// 	g.addNode('f');
	// 	g.addNode('g');

	// 	g.addEdge('a','b');
	// 	g.addEdge('a','d');
	// 	g.addEdge('b','d');
	// 	g.addEdge('b','e');
	// 	g.addEdge('c','a');
	// 	g.addEdge('c','f');
	// 	g.addEdge('d','g');
	// 	g.addEdge('d','f');
	// 	g.addEdge('e','g');
	// 	g.addEdge('g','f');
		
	
	// 	console.log("----------DFS-----------")
	// 	let res = g.DFS("a");
	// 	console.log(res);

	// 	console.log("----------BFS-----------")
	// 	let resbf = g.BFS("a");
	// 	console.log(resbf);
	// });

	// it("TOP SORT", function () {
	// 	debugger;
	// 	let g = new ch1.Graph();
	// 	g.addNode('7');
	// 	g.addNode('5');
	// 	g.addNode('3');
	// 	g.addNode('11');
	// 	g.addNode('8');
	// 	g.addNode('2');
	// 	g.addNode('9');
	// 	g.addNode('10');

	// 	g.addEdge('7','8');
	// 	g.addEdge('7','11');
	// 	g.addEdge('5','11');
	// 	g.addEdge('3','8');
	// 	g.addEdge('3','10');
	// 	g.addEdge('11','10');
	// 	g.addEdge('11','9');
	// 	g.addEdge('11','2');
	// 	g.addEdge('8','9');
		
	
	// 	console.log("----------TOPSPORT-----------")
	// 	let res = g.topSort();
	// 	console.log(res);
	// });

	// it("Prim algo", function () {
	// 	let g = new ch1.WGraph();
	// 	g.addNode('a');
	// 	g.addNode('b');
	// 	g.addNode('c');
	// 	g.addNode('d');
	// 	g.addNode('e');

	// 	g.addEdge('a','b',4);
	// 	g.addEdge('a','c',1);
	// 	g.addEdge('c','b',2);
	// 	g.addEdge('b','e',4);
	// 	g.addEdge('c','d',4);
	// 	g.addEdge('d','e',4);
	// 	console.log("----------MST ----------")
	// 	let res = g.dijkstra("a");
	// 	console.log(res);
	// });

	// it("Prim algo", function () {
	// 	ch1.searchstr("AABA","AABAACAADAABAABA")
	// 	let res = ch1.mergesort([34, 203, 3, 746, 200, 984, 198, 764, 9]);
	// 	console.log(res);
	// });

	it("Trie", function () {
		let trie = new ch1.Trie();
		trie.add("pietro");
		trie.add("piero");
		trie.add("pino");
		trie.add("somar");
		trie.add("somaro");
		trie.add("omar");
		trie.add("omero");
	
		console.log(trie.getWords());
		console.log(trie.search("pi"));
		console.log(trie.search("so"));
		console.log(trie.search("pie"));
	});
});
