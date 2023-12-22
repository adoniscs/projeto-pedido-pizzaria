const query = (element) => {
    return document.querySelector(element);
}
const queryAll = (element) => {
    return document.querySelectorAll(element);
}

pizzaJson.map((item, index) => {
    const pizzaItem = query('.models .pizza-item').cloneNode(true);

    // preencher as informações em pizzaItem
    //Imagem
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;

    //Preço
    pizzaItem.querySelector('.pizza-item--price').innerHTML = item.price.toLocaleString('pt-br', {
            minimumFractionDigits: 2, style: 'currency', currency: 'BRL'
        }
    );

    //Nome
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;

    //Descrição
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;

    // mostrar as pizzas na tela
    query('.pizza-area').append(pizzaItem);
});