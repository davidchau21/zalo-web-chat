function intersection(arr1, arr2) {
  return arr1.filter((value) => arr2.includes(value.user_id));
}

module.exports = intersection;
