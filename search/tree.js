class BST {
  constructor(key = null, value = null, parent = null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }

  insert(key, value) {
    if (!this.key) {
      this.key = key;
      this.value = value;
    } else if (key < this.key) {
      if (this.left === null) {
        this.left = new BST(key, value, this);
      } else {
        this.left.insert(key, value);
      }
    } else {
      if (this.right === null) {
        this.right = new BST(key, value, this);
      } else {
        this.right.insert(key, value);
      }
    }
  }

  find(key) {
    if (this.key === key) {
      return this.value;
    } else if (key > this.key && this.left) {
      this.left.find(key);
    } else if (key < this.key && this.right) {
      this.right.find(key);
    } else {
      throw new Error('Key Error');
    }
  }

  remove(key) {
    if (this.key === key) {
      if (this.left && this.right) {
        const candidate = this.right._findMin();
        this.key = candidate.key;
        this.value = candidate.value;
        candidate.remove(candidate.key);
      } else if (this.left) {
        this._replaceWith(this.left);
      } else if (this.right) {
        this._replaceWith(this.right);
      } else {
        this._replaceWith(null);
      }
    } else if (key > this.key && this.left) {
      this.left.remove(key);
    } else if (key < this.key && this.right) {
      this.right.remove(key);
    } else {
      throw new Error('Key Error');
    }
  }
}

let bstTree = new BST;
bstTree.insert(25, 25)
bstTree.insert(15, 15)
bstTree.insert(50, 50)
bstTree.insert(10, 10)
bstTree.insert(24, 24)
bstTree.insert(35, 35)
bstTree.insert(70, 70)
bstTree.insert(4, 4)
bstTree.insert(12, 12)
bstTree.insert(18, 18)
bstTree.insert(31, 31)
bstTree.insert(44, 44)
bstTree.insert(66, 66)
bstTree.insert(90, 90)
bstTree.insert(22, 22)

function preOrder(tree) {
  if (tree === null) {
    return;
  }
  console.log(tree.value)
  if(tree.left){
    preOrder(tree.left);
  }
  if(tree.right){
    preOrder(tree.right);
  }
}

function inOrder(tree){
  if (tree === null) {
    return;
  }
  if(tree.left){
    inOrder(tree.left);
  }
  console.log(tree.value)
  if(tree.right){
    inOrder(tree.right);
  }
}

function postOrder(tree){
  if (tree === null) {
    return;
  }
  if(tree.left){
    postOrder(tree.left);
  }
  if(tree.right){
    postOrder(tree.right);
  }
  console.log(tree.value)
}

postOrder(bstTree)
