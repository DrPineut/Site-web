function addItem() {
    // Récupérez les valeurs des champs du formulaire
    const itemName = document.getElementById('itemName').value;
    const itemImage = document.getElementById('itemImage').value;
    const itemLink = document.getElementById('itemLink').value;

    // Créez un nouvel élément HTML pour le nouveau produit
    const newItem = document.createElement('div');
    newItem.classList.add('saleitem');

    newItem.innerHTML = `
        <div class="image">
            <img src="${itemImage}" alt="${itemName}">
        </div>
        <footer>
            <div class="info">
                <h2>${itemName}</h2>
                <a href="${itemLink}" target="_blank" rel="noopener noreferrer">
                    <button>Acheter</button>
                </a>
            </div>
        </footer>
    `;

    // Ajoutez le nouvel élément à la liste existante
    const saleList = document.querySelector('.salelist');
    saleList.appendChild(newItem);

    // Effacez les champs du formulaire après l'ajout
    document.getElementById('itemName').value = '';
    document.getElementById('itemImage').value = '';
    document.getElementById('itemLink').value = '';
}