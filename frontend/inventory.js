import { getStorage } from './storage.js';

async function fetchUnits() {
  const response = await fetch('http://localhost:3000/api/units');
  return await response.json();
}

function calculateTotalValue(inventory, allUnits) {
  let total = 0;
  inventory.forEach((invItem) => {
    const unit = allUnits.find((unitInfo) => {
      return unitInfo.id === invItem.id;
    });
    if (unit && typeof unit.value === 'number') {
      total += unit.value * invItem.quantity;
    }
  });
  return total;
}

function generateInventoryHTML(inventory, allUnits) {
  let html = '';
  inventory.forEach((invItem) => {
    const unit = allUnits.find((unitInfo) => {
      return unitInfo.id === invItem.id;
    });
    if (unit) {
      html += `
        <div class="inventory-item">
          <img src="${unit.image}" alt="${unit.name}">
          <h3>Name: ${unit.name}</h3>
          <h3>Value: ${unit.value}</h3>
          <p>Quantity: ${invItem.quantity}</p>
        </div>
      `;
    }
  });
  return html;
}

async function renderInventory() {
  const inventory = getStorage();
  try {
    const allUnits = await fetchUnits();
    const container = document.querySelector('.inventory-container');
    const valueDisplay = document.querySelector('.inventory-right-section');

    const html = generateInventoryHTML(inventory, allUnits);
    const totalValue = calculateTotalValue(inventory, allUnits);

    container.innerHTML = html;
    valueDisplay.innerHTML = `<h4 class="total-value">Total Value: ${totalValue}</h4>`;
  } catch (error) {
    console.log('Error rendering inventory:', error);
  }
}

renderInventory();
