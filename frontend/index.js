import { getStorage, setStorage } from './storage.js';

async function loadUnits() {
  try {
    const response = await fetch('http://localhost:3000/api/units');
    const units = await response.json();

    const container = document.querySelector('.unit-container');
    if (!container) {
      console.log('No .unit-container on this page, skipping loadUnits');
      return;
    }

    let cardsHTML = '';

    units.forEach(function (unit) {
      cardsHTML += `
        <div class="unit-card">
          <img src="${unit.image}" alt="${unit.name}">
          <h3>${unit.name}</h3>
          <p>Rarity: ${unit.rarity}</p>
          <p>Value: ${unit.value}</p>
          <p>Demand: ${unit.demand}</p>   
          <p>Trend: ${unit.trend}</p>
          <button class="add-to-inventory" data-id="${unit.id}">Add to Inventory</button>
        </div>
      `;
    });

    container.innerHTML = cardsHTML;

  } catch (error) {
    console.log('Error fetching unit data:', error);
  }
}

// Only load units if on homepage (i.e., .unit-container exists)
if (document.querySelector('.unit-container')) {
  loadUnits();
}

// Listen for add-to-inventory clicks anywhere on the document
document.addEventListener('click', function (event) {
  if (event.target.classList.contains('add-to-inventory')) {
    const unitId = event.target.getAttribute('data-id');
    console.log(`Unit with id: ${unitId} added to inventory`);

    let inventory = getStorage();

    const existingUnit = inventory.find(function (item) {
      return item.id === unitId;
    });

    if (existingUnit) {
      existingUnit.quantity += 1;
    } else {
      inventory.push({ id: unitId, quantity: 1 });
    }

    setStorage(inventory);
  }
});
