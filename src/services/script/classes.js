class Produto {
    constructor(id, nome, preco, categoria, descricao, link) {
      this.id = id;
      this.nome = nome;
      this.preco = preco;
      this.categoria = categoria;
      this.descricao = descricao;
      this.link = link;
    }
  
    // Getters
    getId() {
      return this.id;
    }
  
    getNome() {
      return this.nome;
    }
  
    getPreco() {
      return this.preco;
    }
  
    getCategoria() {
      return this.categoria;
    }
  
    getDescricao() {
      return this.descricao;
    }
  
    getLink() {
      return this.link;
    }
  
    // Setters
    setId(id) {
      this.id = id;
    }
  
    setNome(nome) {
      this.nome = nome;
    }
  
    setPreco(preco) {
      this.preco = preco;
    }
  
    setCategoria(categoria) {
      this.categoria = categoria;
    }
  
    setDescricao(descricao) {
      this.descricao = descricao;
    }
  
    setLink(link) {
      this.link = link;
    }
  }
  
  // Substituindo o array de produtos por instâncias da classe Produto
  let produtos = [];
  
  // Se já houver produtos no localStorage, converta-os para instâncias da classe Produto
  if (localStorage.prodArr) {
    const produtosData = JSON.parse(localStorage.getItem('prodArr'));
    produtos = produtosData.map((prod, index) => {
      return new Produto(
        index, // ID gerado automaticamente
        prod, // Nome do produto
        preco[index] || 0, // Preço correspondente
        "Categoria Padrão", // Categoria padrão (pode ser ajustada)
        descricao[index] || "", // Descrição correspondente
        link[index] || "" // Link correspondente
      );
    });
  }
  
  // Exemplo de como acessar os produtos usando os métodos get
  produtos.forEach((produto) => {
    console.log(`Produto: ${produto.getNome()}, Preço: ${produto.getPreco()}`);
  });
  
  // Atualize o método getDados para criar instâncias da classe Produto
  function getDados() {
    let prod = document.getElementById('produto').value;
    let descri = document.getElementById('descricao').value;
    let codig = document.getElementById('codigo').value;
    let prec = parseFloat(document.getElementById('preco').value.replace(',', '.'));
    let lnk = document.getElementById('linkAmazon').value;
  
    // Crie uma nova instância da classe Produto
    const novoProduto = new Produto(codig, prod, prec, "Categoria Padrão", descri, lnk);
  
    // Adicione ao array de produtos
    produtos.push(novoProduto);
  
    // Atualize o localStorage
    localStorage.prodArr = JSON.stringify(produtos.map((produto) => produto.getNome()));
    localStorage.descArr = JSON.stringify(produtos.map((produto) => produto.getDescricao()));
    localStorage.codArr = JSON.stringify(produtos.map((produto) => produto.getId()));
    localStorage.precoArr = JSON.stringify(produtos.map((produto) => produto.getPreco()));
    localStorage.linkArr = JSON.stringify(produtos.map((produto) => produto.getLink()));
  
    // Limpe os campos do formulário
    document.getElementById('produto').value = '';
    document.getElementById('descricao').value = '';
    document.getElementById('codigo').value = '';
    document.getElementById('preco').value = '';
    document.getElementById('linkAmazon').value = '';
  
    alert("Dados inseridos com Sucesso!");
  }