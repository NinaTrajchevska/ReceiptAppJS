async function fetchData() {
    try {
        const response = await fetch("https://interview-task-api.mca.dev/qr-scanner-codes/alpha-qr-gFpwhsQ8fkY1");
        const data = await response.json();
        processReceiptData(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function processReceiptData(data) {
    const domesticProducts = [];
    const importedProducts = [];

    data.forEach(product => {
        const groupName = product.domestic ? 'Domestic' : 'Imported';
        const name = product.name.length > 10 ? product.name.substring(0, 10) + '...' : product.name;
        const price = `Price: $${product.price.toFixed(2)}`;
        const weight = product.weight ? `Weight: ${product.weight}g` : 'Weight: N/A';
        const description = product.description.length > 10 ? product.description.substring(0, 10) + '...' : product.description;

        const productFormated = `${'.'.repeat(groupName === 'Domestic' ? 2 : 3)} ${name}\n${'.'.repeat(groupName === 'Domestic' ? 3 : 4)} ${price}\n ${description}\n${'.'.repeat(groupName === 'Domestic' ? 3 : 4)} ${weight}\n`;

        if (groupName === 'Domestic') {
            domesticProducts.push(productFormated);
        } else {
            importedProducts.push(productFormated);
        }
    });

    // Sort products alphabetically within each group
    domesticProducts.sort();
    importedProducts.sort();

    // Display grouped and sorted products
    console.log('Domestic');
    console.log(domesticProducts.join(''));
    console.log('Imported');
    console.log(importedProducts.join(''));

    // Calculate and display totals
    const domesticCost = data.reduce((acc, product) => (product.domestic ? acc + product.price : acc), 0).toFixed(2);
    const importedCost = data.reduce((acc, product) => (product.domestic ? acc : acc + product.price), 0).toFixed(2);

    const domesticCount = domesticProducts.length;
    const importedCount = importedProducts.length;

    console.log(`Domestic cost: $${domesticCost}`);
    console.log(`Imported cost: $${importedCost}`);
    console.log(`Domestic count: ${domesticCount}`);
    console.log(`Imported count: ${importedCount}`);
}


fetchData();