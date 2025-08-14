import { Produto } from './produto.js';

const produtos = new Produto();

document.getElementById('btnSalvar').addEventListener('click', () => {
  const nome = document.getElementById('produto').value;
  const descricao = document.getElementById('descricao').value;
  const codigo = document.getElementById('codigo').value;
  const preco = document.getElementById('preco').value;
  const link = document.getElementById('linkAmazon').value;

  produtos.adicionarProduto(nome, descricao, codigo, preco, link);

  alert("Produto adicionado com sucesso!");

  document.getElementById('produto').value = '';
  document.getElementById('descricao').value = '';
  document.getElementById('codigo').value = '';
  document.getElementById('preco').value = '';
  document.getElementById('linkAmazon').value = '';
});

// Exemplo de uso para montar os produtos na tela
function montarProdutosNaTela() {
  const todos = produtos.getTodosProdutos();

  const container = document.getElementById('produtos-container');
  todos.forEach((prod, i) => {
    const article = document.createElement('article');
    article.classList.add('card');
    article.innerHTML = `
      <div class="product-image" style="background-image: url(imagens/img${i}.jpg)" onclick="window.open('https://amazon.com.br/${prod.link}', '_blank')"></div>
      <h3>${prod.nome}</h3>
      <p>R$ <span>${prod.preco.toFixed(2).replace('.', ',')}</span></p>
      <a class="btn" href="#" onclick="adicionarAoCarrinho(${i})">Comprar</a>
    `;
    container.appendChild(article);
  });
}

window.adicionarAoCarrinho = (pos) => {
  const qtd = parseInt(prompt("Digite a quantidade desejada:", "1"));
  if (!isNaN(qtd) && qtd > 0) {
    const total = produtos.calcularTotalCompra(pos, qtd);
    alert(`Produto adicionado. Total: R$ ${total.toFixed(2).replace('.', ',')}`);
  }
};

montarProdutosNaTela();
