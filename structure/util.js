exports.equals = function(obj0, obj1) 
{  
  for (var attr in obj0) {
    if (typeof obj0[attr] === 'object') {
      if (typeof obj1[attr] !== 'object' || !this.equals(obj0[attr], obj1[attr])) {
        return false;
      }
    }
    else {
      if (!(attr in obj1) || obj0[attr] != obj1[attr]) {
        return false;
      }
    }
  }
  return true;
}