'use strict';

class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._slots = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  static _hashString(string) {
    let hash = 5381;
    for (let i=0; i<string.length; i++) {
      hash = (hash << 5) + hash + string.charCodeAt(i);
      hash = hash & hash;
    }
    return hash >>> 0;
  }

  get(key) {
    const index = this._findSlot(key);
    if (this._slots[index] === undefined) {
      return false
    }
    return this._slots[index].value;
  }

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    const index = this._findSlot(key);
    if (this._slots[index]) this.length--;
    this._slots[index] = {
      key,
      value,
      deleted: false
    };
    this.length++;
  }

  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i=start; i<start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._slots[index];
      if (slot === undefined || slot.key === key) {
        return index;
      }
    }
  }

  _resize(size) {
    const oldSlots = this._slots;
    this._capacity = size;
    this.length = 0;
    this._slots = [];

    for (const slot of oldSlots) {
      if (slot !== undefined) {
        this.set(slot.key, slot.value);
      }
    }
  }

  remove(key) {
    const index = this._findSlot(key);
    const slot = this._slots[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.deleted = true;
    this.length--;
    this._deleted++;
  }
}

HashMap.MAX_LOAD_RATIO = 0.9;
HashMap.SIZE_RATIO = 3;

function main () {
   //const lor = new HashMap();
  // lor.set('Hobbit', 'Bilbo');
  // lor.set('Hobbit', 'Frodo');
  // lor.set('Wizard', 'Gandalf');
  // lor.set('Human', 'Aragon');
  // lor.set('Elf', 'Legolas');
  // lor.set('Maiar', 'Sauron');
  // lor.set('Maiar', 'The Necromancer');
  // lor.set('Ringbearer', 'Gollum');
  // lor.set('Lady of Light', 'Galadriel');
  // lor.set('HalfElven', 'Arwen');
  // lor.set('Ent', 'Treebeard');
  // console.log(lor);
}

main();

function palindrome(str) {
  const pal = new HashMap();
  let oddNum = 0;
  str = str.toLowerCase().replace(/[^a-zA-Z0-9]/g, '');
  for (let i = 0; i < str.length; i++) {
    try {
      let value = pal.get(str[i]);
      pal.set(str[i], value + 1);
    } catch (error) {
      pal.set(str[i], 1);
    }
  }
  for (let i = 0; i < str.length; i++) {
    let value = pal.get(str[i]);
    if (value % 2 !== 0) oddNum++;
    if (oddNum > 1) return false;
  }
  return true;
}

 console.log(palindrome('a man a plan a canal panama'));


function anagrams(arr) {
  let keys = []
  const ana = new HashMap();

  const sorted = arr.map(word => word.split('').sort().join(''))

  sorted.forEach((anaKey, index) => {
    const word = arr[index];
    const anaArray = ana.get(anaKey);
    if(!anaArray){
      ana.set(anaKey, [word]);
      keys.push(anaKey);
    } else {
      ana.set(anaKey, anaArray.concat([word]));
    }
  })

  return keys.map(key => ana.get(key));
}

// sort arr so all anograms are same word
// add to HashMap
// if the sorted word is already added in the HashMap
// then add original word as a value to that key
// return values aka original word arrays
// [['east', 'teas', 'eats'] ['cars', 'arcs'] ['race', 'acre']]
// sorted = [ 'aest', 'acrs', 'acer', 'acrs', 'aest', 'aest', 'acer' ]

console.log(anagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']))
