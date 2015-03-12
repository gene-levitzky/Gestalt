var util = require("./util");

/**
 * Defines a Hash Table object. Used primarily to implement the Set.
 */
function HashTable() {
  
  /*
   * The container for this table's elements.
   */
  var table = [];
  
  /*
   * Number of elements in the table.
   */
  var size = 0;
  
  
  /**
   * Returns the number of elements in the table.
   *
   * @return {number} The number of elements in the table.
   */
  this.size = function() {
    return size;
  }
  
  
  /** 
   * Inserts the given object into the table.
   *
   * @param `obj` {object} The object to be inserted.
   */
  this.insert = function(obj) {
    var key = getKey(obj);
    if (table[key]) {
      if (table[key] instanceof Array) {
        table[key].push(obj);
      }
      else {
        table[key] = [table[key], obj];
      }
    }
    else {
      table[key] = obj;
    }
    size++;
  }
  
  
  /**
   * Checks whether the given object is in the table.
   *
   * @param `obj` {object} The object to check.
   * @return {boolean} True if the object is in the table, false otherwise.
   */
  this.containsValue = function(obj) {
    var key = getKey(obj);
    if (!table[key]) {
      return false;
    }
    if (table[key] instanceof Array) {
      for (var i in table[key]) {
        if (util.equals(table[key][i], obj)) {
          return true;
        }
      }
      return false;
    }
    else {
      return util.equals(table[key], obj);
    }
  }
  
  
  /**
   * Returns true if the given key is in the table.
   *
   * @param `key` {string} The key to check.
   * @return {boolean} True if the key is in the table, false otherwise.
   */
  this.containsKey = function(key) {
    if (typeof key !== 'string') 
      throw "Argument must be of type 'string'."
    return table[key] !== 'undefined';
  }
  
  /**
   * Removes the specified object from this table.
   *
   * @param `obj` {object} The object to remove.
   * @return {boolean} True if object removed, false if it could not be found.
   */
  this.remove = function(obj) {
    var key = getKey(obj);
    
    // In bucket.
    if (table[key] instanceof Array) {
    
      // Check from the end, so that resizing is easier.
      for (var i = table[key].length - 1; i >= 0; i--) {
        if (util.equals(table[key][i], obj)) {
            
          // Resize the bucket
          for (var j = i; i < table[key].length - 1; j++) {
            table[key][j] = table[key][j - 1];
          }
          break;
        }
      }
      size--;
      return true;
    }
    
    // No bucket, easy remove.
    else if (table[key]) {
      delete table[key];
      size--;
      return true;
    }
    
    // Not in the table
    return false;
  }
  
  
  /**
   * Computes a string representation of the object that is likely to be unique.
   *
   * @param `obj` {object} The object whos key is to be computed.
   * @return {string} The pseudo-unique key for this object.
   */
  function getKey(obj) {
    return JSON.stringify(obj).split('').sort().toString().replace(/[,]+/g, '');
  }
}

exports.HashTable = HashTable;