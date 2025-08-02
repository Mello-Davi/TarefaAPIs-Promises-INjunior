async function getProducts(page = 1, limit = 9) {
    const url = `http://localhost:3000/products?_limit=${limit}&_page=${page}`;
    try {
        const response = await fetch(url);
        const products = await response.json();
        const total = response.headers.get('X-Total-Count');

        const container = document.querySelector(".produtos");
        container.innerHTML = ""; // limpa os cards anteriores

        products.forEach(produto => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.innerHTML = `
                <div class="imagemComBotoesEpop" style="background-image: url('${produto.image}'); background-size: cover;">
                    <div class="botoesEpop">
                        <div class="pop">
                            <p>${produto.rating}</p>
                            <img src="../assets/products/Star.png" alt="">
                        </div>
                        <div class="botoes">
                            <button onclick="excluirProduto(${produto.id})"><img src="../assets/products/delete.png" alt="Excluir"></button>
                            <a href="./editar.html?id=${produto.id}"><img src="../assets/products/editar.png" alt="Editar"></a>
                        </div>
                    </div>
                </div>
                <div class="descProd">
                    <div class="nameEdesc">
                        <h2>${produto.name.toUpperCase()}</h2>
                        <h3>${produto.category.toUpperCase()}</h3>
                    </div>
                    <div class="desc">
                        <p>${produto.description}</p>
                    </div>
                    <div class="preco">
                        <p>R$ ${produto.price.toFixed(2)}</p>
                    </div>
                </div>
            `;
            container.appendChild(card);
        });

        console.log('Produtos carregados:', products);
        console.log('Total de produtos:', total);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

getProducts(1, 9); // chamada inicial
