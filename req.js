async function getProducts(page = 1, limit = 9) {
    const url = `http://localhost:3000/products?_limit=${limit}&_page=${page}`;
    try {
        const response = await fetch(url);
        const products = await response.json();
        const total = parseInt(response.headers.get('X-Total-Count')) || 0;

        const container = document.querySelector(".produtos");
        container.innerHTML = ""; // limpa os cards anteriores

        // Gera os cards de produtos
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

        // Gera a paginação dinâmica
        const paginacaoContainer = document.querySelector(".paginacao");
        paginacaoContainer.innerHTML = "";

        const totalPaginas = Math.ceil(total / limit);

        // Botão "<"
        const btnAnterior = document.createElement("button");
        btnAnterior.innerHTML = `<img src="../assets/products/pageBefore.png" alt="Anterior">`;
        btnAnterior.disabled = page === 1;
        btnAnterior.addEventListener("click", () => getProducts(page - 1, limit));
        paginacaoContainer.appendChild(btnAnterior);

        // Lógica de páginas visíveis (máx. 5)
        let startPage = Math.max(1, page - 2);
        let endPage = Math.min(totalPaginas, startPage + 4);
        if (endPage - startPage < 4) {
            startPage = Math.max(1, endPage - 4);
        }

        for (let i = startPage; i <= endPage; i++) {
            const botao = document.createElement("button");
            botao.textContent = i;
            if (i === page) {
                botao.classList.add("botaoDaPagina");
            }
            botao.addEventListener("click", () => getProducts(i, limit));
            paginacaoContainer.appendChild(botao);
        }

        // Botão ">"
        const btnProximo = document.createElement("button");
        btnProximo.innerHTML = `<img src="../assets/products/pageNext.png" alt="Próximo">`;
        btnProximo.disabled = page === totalPaginas;
        btnProximo.addEventListener("click", () => getProducts(page + 1, limit));
        paginacaoContainer.appendChild(btnProximo);

    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

// Chamada inicial
getProducts(1, 9);
