import { getStorage } from './storage.js';

async function renderInventory() {
  const inventory = getStorage();
  try {
    const response = await fetch('http://localhost:3000/api/units');
    const allUnits = await response.json();

    const container = document.querySelector('.inventory-container');
    if (!container) {
      console.log('No #inventory-container found on this page, skipping renderInventory');
      return;
    }

    let html = '';

    inventory.forEach(function (invItem) {
      const unit = allUnits.find(function (u) {
        return u.id === invItem.id;
      });
      if (unit) {
        html += `
          <div class="inventory-item">
            <img src="${unit.image}" alt="${unit.name}">
            <h3>${unit.name}</h3>
            <h3>${unit.value}</h3>
            <p>Quantity: ${invItem.quantity}</p>
          </div>
        `;
      }
    });

    container.innerHTML = html;
  } catch (error) {
    console.log('Error fetching unit data:', error);
  }
}

renderInventory();
