var HashTable = require("./HashTable");

/**
 * Defines the basic container for data objects.
 *
 * @param `type` {function} Specifies the type of object that is allowed in this set. I.e., only objects created by calling 
 *                          `type` are allowed in this set.
 *
 * @param 'elements' {object} (Optional) A list of elements with which to initialize this set.
 */
var Set = function(type, elements) {
  
  /*
   * The hash table that stores the elements of this set.
   */
  var table = new HashTable.HashTable();
  
  elements = elements || [];
  for (var i in elements) {
    this.add(elements[i]);
  }
  
  
  /**
   * Checks whether the given object can be added to this set.
   *
   * @param `element` {object} The object to be tested.
   * @return {boolean} True if this set can accept this object, false otherwise.
   */
  this.isValidElement = function(element) {
    return element instanceof type;
  }
  
  
  /**
   * Returns the number of elements in this set.
   *
   * @return {number} The cardinality of this set.
   */
  this.size = function() {
    return table.size();
  }
  
  
  /**
   * Tests whether the given element is in this set.
   *
   * @param `element` {object} The element to be tested.
   * @return {boolean} True if the element is in this set, false otherwise.
   */
  this.contains = function(element) {
    return table.containsValue(element);
  }
  
  
  /**
   * Inserts the given element if it is not already a member of this set.
   *
   * @param `element` {object} The element to be inserted.
   * @return {boolean} True if inserted, false otherwise.
   */
  this.add = function(element) {
    if (!(element instanceof type)) {
      throw "Element given must be of type " + type + ".";
    }
    if (!this.contains(element)) {
      table.insert(element);
      return true;
    }
    return false;
  }
  
  
  /**
   * Removes the given element from the set.
   *
   * @param `element` {object} The object to be removed.
   * @return {boolean} True if object removed successfully, false otherwise.
   */
  this.remove = function(element) {
    if (element instanceof type) {
      return table.remove(element);
    }
    else {
      throw "Argument must be an instance of " + type + ".";
    }
  }
  
  
  /**
   * Checks recursively if the two objects have the same attributes.
   *
   * @param `obj0` {object} The first object to check.
   * @param `obj1` {object} The second object to check.
   * @return {boolean} True if the objects have the same attributes, false otherwise.
   */
  function sameType(obj0, obj1) 
  {  
    for (var attr in obj0) {
      if (typeof obj0[attr] === 'object') {
        if (typeof obj1[attr] !== 'object' || !this.equals(obj0[attr], obj1[attr])) {
          return false;
        }
      }
      else {
        if (!(attr in obj1)) {
          return false;
        }
      }
    }
    return true;
  }
}