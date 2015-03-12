var util = require("./util");
var util = new util.util();

/**
 * Defines the basic container for data objects.
 *
 * @param `type` {function} Specifies the type of object that is allowed in this set. I.e., only objects created by calling 
 *                          `type` are allowed in this set.
 *
 * @param 'elements' {object} (Optional) A list of elements with which to initialize this set.
 */
var Set = function(type, elements) {
  this.type = type;
  this.storage = [];
  this.holes = [];
  
  elements = elements || [];
  for (var i in elements) {
    if (this.isValidElement(elements[i])) {
      storage.push(elements[i]);
    }
  }
  
  this.isValidElement = function(element) {
    return element instanceof type;
  }
  
  /**
   * Tests whether the given element is in this set.
   *
   * @param `element` {object} The element to be tested.
   * @return {boolean} True if the element is in this set, false otherwise.
   */
  this.contains = function(element) {
      for (var i in storage) {
        if (util.equals(storage[i], element)) {
          return true;
        }
      }
      return false;
  }
  
  /**
   * Inserts the given element if it is not already a member of this set.
   *
   * @param `element` {object} The element to be inserted.
   * @return {boolean} True if inserted, false if already contained.
   */
  this.add = function(element) {
    if (!this.contains(element)) {
      if (this.holes.length > 0) {
        this.storage[this.holes.pop()] = element;
      }
      else {
        this.storage.push(element);
      }
      return true;
    }
    return false;
  }
  
  this.remove = function(filter) {
    if (typeof filter === 'number') {
      if (!this.storage[filter]) {
        return false;
      }
      this.storage[filter] = undefined;
      holes.push[filter];
      return true;
    }
    else if (filter instanceof this.type) {
      for (var i in this.storage) {
        if (util.equals(this.storage[i], filter)) {
          return remove(i);
        }
      }
    }
    else {
      throw "Argument must be a numerical key or an instance of this set's type.";
    }
  }
}

var set = new Set(Set);
console.log(set.isValidType(new Set("sds")));