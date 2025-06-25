// storage.js
export function getStorage() {
  const stored = localStorage.getItem('inventory');
  return stored ? JSON.parse(stored) : [];
}

export function setStorage(inventory) {
  localStorage.setItem('inventory', JSON.stringify(inventory));
}
