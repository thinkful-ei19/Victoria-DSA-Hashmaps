class _Node {
   constructor(value) {
     this.value = value;
     this.next = null;
   }
 }

 class LinkedList {
   constructor() {
     this.head = null;
   }

   insertLast(value) {
     let node = new _Node(value);
     if (this.head === null) return (this.head = node);
     let tempNode = this.head;
     while (tempNode.next !== null) {
       tempNode = tempNode.next;
     }
     tempNode.next = node;
   }
 }

 class ChainHash {
   constructor(initialCapacity = 8) {
     this.length = 0;
     this._slots = [];
     this._capacity = initialCapacity;
     this._deleted = 0;
   }

   _findSlot(key) {
     const hash = ChainHash._hashString(key);
     return hash % this._capacity;
   }

   get(key) {
     const index = this._findSlot(key);

     if (this._slots[index] === undefined) {
       throw new Error('Key error');
     }
     let tempNode = this._slots[index].head;
     while (tempNode !== null) {
       if (tempNode.value.key === key) {
         return tempNode.value.value;
       }
       tempNode = tempNode.next;
     }
     return null;
   }

   set(key, value) {
     const loadRatio = (this.length + this._deleted + 1) / this._capacity;
     if (loadRatio > ChainHash.MAX_LOAD_RATIO) {
       this._resize(this._capacity * ChainHash.SIZE_RATIO);
     }

     const index = this._findSlot(key);
     if (!this._slots[index]) {
       let list = new LinkedList();
       this._slots[index] = list;
       this.length++;
       return this._slots[index].insertLast({ key, value, deleted: false });
     }
     let tempNode = this._slots[index].head;
     while (tempNode !== null) {
       if (tempNode.value.key === key) {
         return (tempNode.value = { key, value, deleted: false });
       }
       tempNode = tempNode.next;
     }
     this._slots[index].insertLast({ key, value, deleted: false });
   }

   remove(key) {
     const index = this._findSlot(key);
     if (index === undefined) {
       throw new Error('Key error');
     }
     index.value.deleted = true;
     this.length--;
     this._deleted++;
   }

   static _hashString(string) {
     let hash = 5381;
     for (let i = 0; i < string.length; i++) {
       hash = (hash << 5) + hash + string.charCodeAt(i);
       hash = hash & hash;
     }
     return hash >>> 0;
   }

   _resize(size) {
     const oldSlots = this._slots;
     this._capacity = size;
     this.length = 0;
     this._deleted = 0;
     this._slots = [];

     for (const slot of oldSlots) {
       if (slot !== undefined && !slot.deleted) {
         this.set(slot.value.key, slot.value.value);
       }
     }
   }
 }

 ChainHash.MAX_LOAD_RATIO = 0.9;
 ChainHash.SIZE_RATIO = 3;

 function main2() {
   const hash = new ChainHash();
   hash.set('Hobbit', 'Bilbo');
   hash.set('Hobbit', 'Frodo');
   hash.set('Wizard', 'Gandolf');
   hash.set('Human', 'Aragon');
   hash.set('Elf', 'Legolas');
   hash.set('Maiar', 'The Necromancer');
   hash.set('Maiar', 'Sauron');
   hash.set('RingBearer', 'Gollum');
   hash.set('LadyOfLight', 'Galadriel');
   hash.set('HalfElven', 'Arwen');
   hash.set('Ent', 'Treebeard');
   console.log(hash);
   console.log(hash.get('Maiar'));
 }

 main2();
