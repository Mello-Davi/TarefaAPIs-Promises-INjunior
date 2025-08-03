document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário e o recarregamento da página

        // Captura os valores dos campos do formulário
        const nome = document.getElementById('nome').value;
        const preco = parseFloat(document.getElementById('preco').value);
        const imagem = document.getElementById('imagem').value;
        const categoria = document.getElementById('categoria').value;
        const descricao = document.getElementById('descricao').value;

        // Cria o novo objeto de produto
        const novoProduto = {
            // Um ID pode ser gerado automaticamente pelo json-server, mas podemos criar um
            // um ID simples para este exemplo. Na prática, é melhor deixar o servidor gerenciar.
            // Para ter a certeza de que a nova entrada será adicionada ao final,
            // podemos fazer uma pequena alteração
            id: Date.now(),
            name: nome,
            price: preco,
            image: imagem,
            category: categoria,
            description: descricao,
            inStock: true, // Define como verdadeiro por padrão
            rating: 0 // Define a avaliação inicial como 0
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
                form.reset(); // Limpa o formulário após o envio
            } else {
                alert('Erro ao adicionar produto. Tente novamente.');
            }
        } catch (error) {
            console.error('Erro na requisição:', error);
            alert('Não foi possível conectar com o servidor. Verifique se o json-server está rodando na porta 3000.');
        }
    });
});