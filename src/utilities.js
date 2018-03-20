// binds array of component methods to supplied component context
export const bindAll = function(methodsToBeBound=[], thisArg){
  if(!Array.isArray(methodsToBeBound)){
    console.warn('methodsToBeBound must be an array');
    return;
  }
  if(!thisArg){
    console.warn('no this context supplied');
    return;
  }
  methodsToBeBound.forEach( function(func){
    if(typeof func !== 'string'){
      console.warn(func, 'supplied in methodsToBeBound Array is not a string');
      return;
    }
    if(typeof this[func] !== 'function'){
      console.warn('method', func, 'not found in component');
      return;
    }
    this[func] = this[func].bind(this);
  }, thisArg);
};

/**
 * getById - gets an object by id from array
 * @param {array} arr - the array we are mutating
 * @param {int} id - the id to search for
 * @return {object} matching object
 */
export const getById = (arr, id) => {
    const filteredArray = arr.filter((obj) => {
        return obj.id === parseInt(id, 10); 
    });

    return filteredArray.length ? filteredArray[0] : null;
};

/**
 * getMaxId - gets next is in array
 * @param {array} the array we are mutating
 * @return {int} next id to use
 */
export const getMaxId = (arr) => {
  let maxVal = 0;
  arr.forEach((obj, i) => {
      if(obj.id > maxVal) {
        maxVal = obj.id
      }
  });

  return maxVal + 1;
};

/**
 * addOrRemoveFromArray
 * @param {array} array the array we are mutating
 * @param {any} item the item you want to add or remove
 * @return {array} new array
 * @example
 * let arr = [12,13,14]
 * addOrRemoveFromArray(arr, 15) // [12,13,14,15] adds 15 to the array
 * addOrRemoveFromArray(arr, 12) // [13,14,15] removes 12 from the array
 */
export const addOrRemoveFromArray = (array, item) => {
    const itemPosInArray = array.indexOf(item);

    if (itemPosInArray >= 0) {
        array.splice(itemPosInArray, 1);
    } else {
        array.push(item);
    }

    return array;
}
