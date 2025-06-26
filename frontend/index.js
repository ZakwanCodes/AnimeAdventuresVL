let allUnits = []; // global unit data

// Fetch units from backend
async function loadUnits() {
  try {
    const response = await fetch('http://localhost:3000/api/units');
    allUnits = await response.json();
    renderUnits(allUnits); // render all units at start
  } catch (error) {
    console.log('Error fetching unit data:', error);
  }
}

// Render given list of units
function renderUnits(unitsToRender) {
  const container = document.querySelector('.unit-container');
  let cardsHTML = '';

  unitsToRender.forEach(function (unit) {
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
}

// Handle search input
const searchInput = document.querySelector('.search-input');

searchInput.addEventListener('input', function () {
  const searchTerm = searchInput.value.trim().toLowerCase();

  const filteredUnits = allUnits.filter(function (unit) {
    return unit.name.toLowerCase().includes(searchTerm);
  });

  renderUnits(filteredUnits);
});

loadUnits();
