let cart = [];
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
        modalKey = key;

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

// ação para mudar o tamanho da pizza
queryAll('.pizzaInfo--size').forEach((size, sizeIndex) => {
    size.addEventListener('click', (e) => {
        query('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
    });
});

// ação no botão adicionar no carrinho
query('.pizzaInfo--addButton').addEventListener('click', () => {
    // saber a quantidade de pizzas
    let size = parseInt(query('.pizzaInfo--size.selected').getAttribute('data-key'));

    // gerar identificador para quando adicionar mais pizza do mesmo, incluir a qtd no carrinho
    let identifier = pizzaJson[modalKey].id + '@' + size;

    let key = cart.findIndex((item) => {
        return item.identifier === identifier;
    });

    // verificar se o item já esta acicionado, se estiver, inclui mais
    if (key > -1) {
        cart[key].qtd += modalQtd;
    } else { // se não, adiciona mais um no carrinho

        // adicionando todos as informaçoes no carrinho
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qtd: modalQtd
        });
    }

    // atualizar o carrinho antes de fechar
    updateCart();

    // fechar o mados após adicionar a pizza a carrinho
    closeModal();
});

// função para atualizar o carrinho
function updateCart() {
    // verificar se tem itens no carrinho, se tiver, mostrar o carrinho
    if (cart.length > 0) {
        query('aside').classList.add('show');

        query('.cart').innerHTML = '';

        // mostrar os itens que estão no carrinho
        for (let i in cart) {
            let pizzaItem = pizzaJson.find((item) => item.id === cart[i].id);
            let cartItem = query('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch (cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;

                case 1:
                    pizzaSizeName = 'M';
                    break;

                case 2:
                    pizzaSizeName = 'G';
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;
            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qtd;

            query('.cart').append(cartItem);

        }

    } else {// se não tiver, removerá a classe e esconderá o carrinho
        query('aside').classList.remove('show');
    }
}