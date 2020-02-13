export const categoryFilter = (category, list) => {
  if (category === "All") {
    return list;
  } else {
    let filteredList = list.filter(value => value.category === category);
    return filteredList.map((u, i) => Object.assign({}, u, { id: i + 1 }));
  }
};

export const getCat = list => {
  let array = list.map(val => val.category);
  let unique = [...new Set(array)];
  unique.unshift("All");
  return unique;
};
