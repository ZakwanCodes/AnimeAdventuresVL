async function loadUnits() {
  try {
    const response = await fetch('http://localhost:3000/api/units');
    const units = await response.json();

    const container = document.getElementById('unit-container');

    let cardsHTML = '';

    units.forEach((unit) => {
        cardsHTML += `
        <div class="unit-card">
          <img src="${unit.image}" alt="${unit.name}">
          <h3>${unit.name}</h3>
          <p>Rarity: ${unit.rarity}</p>
          <p>Value: ${unit.value}</p>
          <p>Demand: ${unit.demand}</p>   
          <p>Trend: ${unit.trend}</p>
          <button>Add to Inventory</button>
        </div>
      `;
    });

    container.innerHTML = cardsHTML;

  } catch (error) {
    console.log('Error fetching unit data:', error);
  }
}

loadUnits();
