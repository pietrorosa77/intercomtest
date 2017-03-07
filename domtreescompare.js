// This function returns a real array of Nodes, so we can use methonds like "indexOf"
function getChildren(node) {
    // or you can use Array.from(node.childNodes);
    return Array.prototype.slice.call(node.childNodes);
}

// This function returns an array of indices from given node to the root
function getPath(root, node) {
    const path = [];
    let curElement = node;

    // This is important as if a node is null or doesn't have a parent
    // there is no need of searching further
    while(curElement !== root && curElement && curElement.parentNode) {
        const index = getChildren(curElement.parentNode).indexOf(curElement);
        path.push(index);
        curElement = curElement.parentNode;
    }

    return path;
}

// Popping all values from the array of indices we go to the symmetrical node
function getNodeByPath(root, originalPath) {
    const path = [].concat(originalPath);
    let element = root;
    while (path.length) {
          element = getChildren(element)[path.pop()];
    }
    return element;
}

// For convenience
function getSymmetricNode(root1, root2, node) {
    const path = getPath(root1, node);
    return getNodeByPath(root2, path);
}

const root1 = document.getElementById('root1');
const root2 = document.getElementById('root2');
const node1 = document.getElementById('node1');
const node2 = document.getElementById('node2');

const nodeX = getSymmetricNode(root1, root2, node1);

console.log(nodeX === node2); // true
