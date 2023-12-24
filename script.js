let modalQtd = 1;
const query = (element) => {
    return document.querySelector(element);
}
const queryAll = (element) => {
    return document.querySelectorAll(element);
}

// Listagem das pizzas
pizzaJson.map((item, index) => {
    const pizzaItem = query('.models .pizza-item').cloneNode(true);

    // preencher as informações em pizzaItem e na modal
    pizzaItem.setAttribute('data-key', index);
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
    // fim da inclusão dos dados na tela

    // adicionar o evento de click ao clicar na pizza e abrir a modal
    pizzaItem.querySelector('.pizza-item a').addEventListener('click', (event) => {
       event.preventDefault();

       // procurar o elemento mais proximo que tenha a classe .pizza-item
       let key = event.target.closest('.pizza-item').getAttribute('data-key');
       modalQtd = 1;

       query('.pizzaBig img').src = pizzaJson[key].img;
       query('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
       query('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
       query('.pizzaInfo--size.selected').classList.remove('selected');
       queryAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
           if (sizeIndex === 2) {
               size.classList.add('selected');
           }
           size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
       });

       query('.pizzaInfo--actualPrice').innerHTML = pizzaJson[key].price.toLocaleString('pt-br', {
           minimumFractionDigits: 2, style: 'currency', currency: 'BRL'
       });

       query('.pizzaInfo--qt').innerHTML = modalQtd;

       query('.pizzaWindowArea').style.opacity = 0;
       query('.pizzaWindowArea').style.display = 'flex';
       setTimeout(() => {
          query('.pizzaWindowArea').style.opacity = 1;
       }, 200);
    });
    // --- fim modal ---

    // mostrar as pizzas na tela
    query('.pizza-area').append(pizzaItem);
});

// Eventos do modal
function closeModal() {
    query('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        query('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

// ação para poder fechar o modal ao clicar no cancel ou voltar
queryAll('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton')
    .forEach((item) => {
    item.addEventListener('click', closeModal);
});

// ação para poder diminuir a qtd de pizza adicionada ao carrinho
query('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if (modalQtd > 1) {
        modalQtd--;
        query('.pizzaInfo--qt').innerHTML = modalQtd;
    }

});

// ação para poder aumentar a qtd de pizza adicionada ao carrinho
query('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQtd++;
    query('.pizzaInfo--qt').innerHTML = modalQtd;
});