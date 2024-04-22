import { encoded, translations } from './data.js';

console.log("Let's rock");
console.log(encoded, translations);

let uniqueIds = new Set();
const decoded = encoded.map(item => {
  let newItem = {};
  uniqueIds.add(item.groupId);

  Object.entries(item).map(([key, value]) => {
    const exceptions = ['groupId', 'service', 'formatSize', 'ca'];

    exceptions.includes(key)
      ? (newItem[key] = value)
      : (newItem[key] = translations[value]);
  });

  return newItem;
});

console.log(decoded, uniqueIds);
