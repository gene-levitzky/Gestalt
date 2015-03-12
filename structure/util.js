exports.util = function() {

  this.equals = function(obj0, obj1) 
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
  
  function sortByValue(desc) {
    return function(a,b){
      return desc ? ~~(a < b) : ~~(a > b);
    };
  }
  
  this.getArrayDescription = function(obj) {
    var out = [];
    for (var attr in obj) {
      if (typeof obj[attr] === 'object') {
        out[attr] = this.translateToArrayForm(obj[attr]).sort(sortByValue);
      }
      else {
        out [attr] = 0;
      }
    }
    return out.sort(sortByValue);
  }
  
}