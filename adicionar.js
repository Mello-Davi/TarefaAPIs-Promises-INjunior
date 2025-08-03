document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Captura os valores dos inputs
        const nome = document.getElementById('name').value;
        const imagem = document.getElementById('image').value;
        const categoria = document.getElementById('category').value;
        const descricao = document.getElementById('description').value;

        // VALIDAÇÃO E FORMATAÇÃO DO PREÇO
        let precoString = document.getElementById('price').value.replace(',', '.');
        const preco = parseFloat(precoString);
        
        if (isNaN(preco) || !/^\d+(\.\d{1,2})?$/.test(precoString)) {
            alert('Por favor, insira um preço válido com no máximo duas casas decimais.');
            return; // Impede o envio do formulário
        }

        // VALIDAÇÃO E FORMATAÇÃO DA AVALIAÇÃO (RATING)
        let ratingString = document.getElementById('rating').value.replace(',', '.');
        const rating = parseFloat(ratingString);

        if (isNaN(rating) || rating < 1 || rating > 5 || !/^\d+(\.\d{1})?$/.test(ratingString)) {
            alert('Por favor, insira uma avaliação válida entre 1 e 5, com no máximo uma casa decimal.');
            return; // Impede o envio do formulário
        }

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
                window.location.href = './index.html';
            } else {
                alert('Erro ao adicionar produto. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Não foi possível conectar com o servidor. Verifique se o json-server está rodando na porta 3000.');
        }
    });
});