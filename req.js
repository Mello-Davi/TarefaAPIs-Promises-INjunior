async function getProducts(page = 1, limit = 5) {
    const url = `http://localhost:3000/products?_limit=${limit}&_page=${page}`;
    try {
        const response = await fetch(url);
        const products = await response.json();
        const total = response.headers.get('X-Total-Count');
        console.log(response.headers)
        console.log('Produtos:', products);
        console.log('Total de produtos:', total);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

// Exemplo de uso 
getProducts(1, 5);