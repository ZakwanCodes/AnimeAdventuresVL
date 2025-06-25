import { getStorage } from './storage.js';

// 1) Fetch all units from backend
async function fetchUnits() {
  const response = await fetch('http://localhost:3000/api/units');
  return await response.json();
}

// 2) Calculate total inventory value
function calculateTotalValue(inventory, allUnits) {
  let total = 0;
  inventory.forEach(invItem => {
    const unit = allUnits.find(u => u.id === invItem.id);
    if (unit && typeof unit.value === 'number') {
      total += unit.value * invItem.quantity;
    }
  });
  return total;
}

// 3) Generate HTML, now with two buttons per item
function generateInventoryHTML(inventory, allUnits) {
  let html = '';
  inventory.forEach(invItem => {
    const unit = allUnits.find(u => u.id === invItem.id);
    if (!unit) return;

    html += `
      <div class="inventory-item" data-id="${unit.id}">
        <img src="${unit.image}" alt="${unit.name}">
        <h3>Name: ${unit.name}</h3>
        <h3>Value: ${unit.value}</h3>
        <p>Quantity: ${invItem.quantity}</p>
        <button class="remove-one">Remove One</button>
        <button class="remove-all">Remove All</button>
      </div>
    `;
  });
  return html;
}

// 4) Render function
async function renderInventory() {
  const inventory = getStorage();
  try {
    const allUnits = await fetchUnits();
    const container = document.querySelector('.inventory-container');
    const valueDisplay = document.querySelector('.inventory-right-section');

    container.innerHTML = generateInventoryHTML(inventory, allUnits);

    const totalValue = calculateTotalValue(inventory, allUnits);
    valueDisplay.innerHTML = `<h4 class="total-value">Total Value: ${totalValue.toLocaleString()}</h4>`;
  } catch (error) {
    console.error('Error rendering inventory:', error);
  }
}

// 5) Setup event delegation for both buttons
document.addEventListener('click', event => {
  const removeOne = event.target.classList.contains('remove-one');
  const removeAll = event.target.classList.contains('remove-all');
  if (!removeOne && !removeAll) return;

  const card = event.target.closest('.inventory-item');
  const unitId = card.getAttribute('data-id');

  let inventory = getStorage();

  if (removeOne) {
    inventory = inventory.map(item => {
      if (item.id === unitId) {
        return { id: item.id, quantity: item.quantity - 1 };
      }
      return item;
    })
    .filter(item => item.quantity > 0);
  }

  if (removeAll) {
    inventory = inventory.filter(item => item.id !== unitId);
  }

  // Save updated inventory and re-render
  localStorage.setItem('inventory', JSON.stringify(inventory));
  renderInventory();
});

// Initial call
renderInventory();
