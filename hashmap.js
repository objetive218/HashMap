function node(e, k) {
  return {
    value: e || null,
    nextNode: null,
    key: k || null,
  };
}
function linkedList() {
  let length = 0;
  let headList = null;

  const append = (value, key) => {
    let newNodo = node(value, key);
    length++;

    if (headList === null) {
      headList = newNodo;
    } else {
      let ref = headList;
      while (ref.nextNode !== null) {
        ref = ref.nextNode;
      }
      ref.nextNode = newNodo;
    }
  };
  const prepend = (value, key) => {
    let newNodo = node(value, key);
    length++;
    if (headList === null) {
      return (headList = newNodo);
    }
    newNodo.nextNode = headList;
    headList = newNodo;
  };
  const size = () => {
    if (headList === null) return null;
    return length;
  };
  const head = () => {
    if (headList === null) return null;
    return headList;
  };
  const tail = () => {
    if (headList === null) return null;
    let ref = headList;
    while (ref.nextNode !== null) {
      ref = ref.nextNode;
    }
    return ref;
  };
  const at = (index) => {
    let count = 0;
    let ref = headList;
    while (count < index) {
      ref = ref?.nextNode;
      count += 1;
    }
    return ref;
  };
  const pop = () => {
    if (headList === null) return null;
    if (headList.nextNode === null) return null;
    at(size() - 2).nextNode = null;
    length--;
  };
  const contain = (key) => {
    let ref = headList;
    while (ref !== null) {
      if (ref.key === key) return true;
      ref = ref.nextNode;
    }
    return false;
  };
  const find = (value) => {
    let ref = headList;
    for (let i = 0; i < length; i++) {
      if (ref.value === value) {
        return i;
      }
      ref = ref.nextNode;
    }
  };
  const getValue = (key) => {
    let ref = headList;
    for (let i = 0; i < length; i++) {
      if (ref.key === key) {
        return ref.value;
      }
      ref = ref.nextNode;
    }
    return false;
  };
  const overWrite = (value, key) => {
    let ref = headList;
    for (let i = 0; i < length; i++) {
      if (ref.key === key) {
        ref.value = value;
        return true;
      }
      ref = ref.nextNode;
    }
  };
  const deletNode = (key) => {
    let ref = headList;
    for (let i = 0; i < length; i++) {
      if (ref.key === key) {
        let previous = at(i - 1);
        ref.value = null;
        ref.key = null;
        ref.nextNode = null;
        previous.nextNode = null;
        return true;
      }
      ref = ref.nextNode;
    }
    return false;
  };
  const toString = () => {
    if (headList === null) {
      return null;
    }
    let ref = headList;

    let textNode = "";
    while (ref.nextNode !== null) {
      textNode += `(${ref?.value}) -->`;
      ref = ref.nextNode;
    }
    let tailElement = tail();
    tailElement ? tailElement : "";
    return `${textNode} ${tailElement.value} --> null`;
  };
  const toArray = (select) => {
    if (headList === null) {
      return null;
    }
    let ref = headList;
    let arrContent = [];
    while (ref.nextNode !== null) {
      arrContent.push(select ? ref.key : ref.value);
      ref = ref.nextNode;
    }
    let tailElement = tail();
    tailElement
      ? arrContent.push(select ? tailElement.key : tailElement.value)
      : "";
    return arrContent;
  };
  const toArrayContent = () => {
    if (headList === null) {
      return null;
    }
    let ref = headList;
    let arrContent = [];
    while (ref.nextNode !== null) {
      arrContent.push([ref?.key, ref?.value]);
      ref = ref.nextNode;
    }
    let tailElement = tail();
    tailElement ? arrContent.push([tailElement.key, tailElement.value]) : "";
    return arrContent;
  };

  return {
    append,
    prepend,
    size,
    head,
    tail,
    at,
    pop,
    contain,
    find,
    getValue,
    overWrite,
    toString,
    toArray,
    toArrayContent,
    deletNode,
  };
}

function HashMap() {
  let hashMapSize = 16;
  let lengthHash = 0;
  let loadFactor = 0.75;
  const hashMapArr = Array(hashMapSize).fill(null);
  const hash = (key) => {
    let hashCode = 0;
    for (let i = 0; i < key.length; i++) {
      hashCode = i * key.charCodeAt(i);
    }
    return hashCode % hashMapArr.length;
  };
  const set = (key, value) => {
    let newKey = hash(key);
    if (hashMapArr[newKey] === null) {
      hashMapArr[newKey] = window["hash" + newKey] = linkedList();
      window["hash" + newKey].prepend(value, key);
      lengthHash++;
    } else if (hashMapArr[newKey] !== null) {
      if (window["hash" + newKey].overWrite()) return "ok";
      window["hash" + newKey].append(value, key);
      resizeHash();
    }
  };
  function get(key) {
    let newKey = hash(key);
    return window["hash" + newKey]?.getValue(key) ? true : null;
  }
  function has(key) {
    let newKey = hash(key);
    return window["hash" + newKey]?.contain(key) ? true : false;
  }
  function remove(key) {
    let newKey = hash(key);
    return window["hash" + newKey]?.deletNode(key) ? true : false;
  }
  function length() {
    return lengthHash;
  }
  function clear() {
    hashMapArr.fill(null);
    lengthHash = 0;
  }
  function keys() {
    let arrKeys = [];
    hashMapArr.forEach((element) => {
      if (element !== null) {
        arrKeys.push(element.toArray(true));
      }
    });
    return arrKeys;
  }
  function values() {
    let arrValue = [];
    hashMapArr.forEach((element) => {
      if (element !== null) {
        arrValue.push(element.toArray(false));
      }
    });
    return arrValue;
  }
  function entries() {
    let arrAllContent = [];
    hashMapArr.forEach((element) => {
      if (element !== null) {
        arrAllContent.push(element.toArrayContent());
      }
    });
    return arrAllContent;
  }
  function resizeHash() {
    let currentLoad = lengthHash / hashMapSize;
    if (currentLoad > loadFactor) {
      hashMapArr = [...hashMapArr, Array(hashMapSize).fill(null)];
    }
  }
  return {
    set,
    get,
    has,
    remove,
    length,
    clear,
    keys,
    values,
    entries,
  };
}

let newHashMap = HashMap();
newHashMap.set("hello", "345");
newHashMap.set("dog", "457");
newHashMap.set("NewYork", "783");
console.log(newHashMap.entries());
newHashMap.set("Andres", "301");
console.log("antes de Andres");
console.log(newHashMap.get("Andres"));
console.log(newHashMap.get("Carlos"));
console.log(newHashMap.has("Andres"));
console.log(newHashMap.has("Carlos"));
console.log(newHashMap.remove("Andres"));
console.log(newHashMap.remove("Carlos"));
console.log(newHashMap.has("Andres"));
newHashMap.set("Andres", "301");
console.log(newHashMap.keys());
console.log(newHashMap.values());
console.log(newHashMap.entries());
newHashMap.clear();
console.log(newHashMap.entries());
