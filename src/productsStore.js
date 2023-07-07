

const productsArray = [
    {
        id: "price_1NB2XuHoeFzh7hwruNCpNS1p",
        title: "Asaanghar Inspection",
        price: 1000
    },
   
];

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData == undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { productsArray, getProductData };