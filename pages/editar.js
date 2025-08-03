document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const productId = new URLSearchParams(window.location.search).get('id');

    if (!productId) {
        alert('ID do produto não encontrado na URL.');
        return;
    }

    // Função para buscar os dados do produto
    async function getProduct(id) {
        const url = `http://localhost:3000/products/${id}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Produto não encontrado');
            }
            const product = await response.json();
            fillForm(product);
        } catch (error) {
            console.error('Erro ao buscar produto:', error);
            alert('Não foi possível carregar os dados do produto.');
        }
    }

    // Função para preencher o formulário com os dados do produto
    function fillForm(product) {
        document.getElementById('name').value = product.name;
        document.getElementById('price').value = product.price;
        document.getElementById('image').value = product.image;
        document.getElementById('category').value = product.category;
        document.getElementById('description').value = product.description;
        document.getElementById('rating').value = product.rating;
    }

    // Função para atualizar o produto
    async function updateProduct(id, updatedData) {
        const url = `http://localhost:3000/products/${id}`;
        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedData)
            });

            if (response.ok) {
                alert('Produto atualizado com sucesso!');
                // Opcional: redirecionar para a página inicial após a edição
                window.location.href = './index.html'; 
            } else {
                alert('Erro ao atualizar produto. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Não foi possível conectar com o servidor. Verifique se o json-server está rodando.');
        }
    }

    // Lida com o envio do formulário de edição
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const updatedData = {
            name: document.getElementById('name').value,
            price: parseFloat(document.getElementById('price').value),
            image: document.getElementById('image').value,
            category: document.getElementById('category').value,
            description: document.getElementById('description').value,
            rating: document.getElementById('rating').value
        };

        updateProduct(productId, updatedData);
    });

    // Inicia o processo buscando os dados do produto
    getProduct(productId);
});