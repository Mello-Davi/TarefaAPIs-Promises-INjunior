document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // **Ajustado para capturar os IDs corretos do seu HTML:**
        const nome = document.getElementById('name').value;
        const preco = parseFloat(document.getElementById('price').value);
        const imagem = document.getElementById('image').value;
        const categoria = document.getElementById('category').value;
        const descricao = document.getElementById('description').value;
        const rating = document.getElementById('rating').value;

        const novoProduto = {
            id: Date.now(),
            name: nome,
            price: preco,
            image: imagem,
            category: categoria,
            description: descricao,
            inStock: true,
            rating: rating
        };

        const url = 'http://localhost:3000/products';

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(novoProduto)
            });

            if (response.ok) {
                alert('Produto adicionado com sucesso!');
                form.reset();
            } else {
                alert('Erro ao adicionar produto. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Não foi possível conectar com o servidor. Verifique se o json-server está rodando na porta 3000.');
        }
    });
});