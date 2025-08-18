export class Produto {
  constructor() {
    this.produto = JSON.parse(localStorage.getItem('prodArr')) || [];
    this.cod = JSON.parse(localStorage.getItem('codArr')) || [];
    this.preco = JSON.parse(localStorage.getItem('precoArr')) || [];
    this.link = JSON.parse(localStorage.getItem('linkArr')) || [];
    this.descricao = JSON.parse(localStorage.getItem('descArr')) || [];
    this.qtd = JSON.parse(localStorage.getItem('qtdArr')) || [];
    this.totalCompra = JSON.parse(localStorage.getItem('totCompArr')) || [];
  }

  salvarNoLocalStorage() {
    localStorage.setItem('prodArr', JSON.stringify(this.produto));
    localStorage.setItem('codArr', JSON.stringify(this.cod));
    localStorage.setItem('precoArr', JSON.stringify(this.preco));
    localStorage.setItem('linkArr', JSON.stringify(this.link));
    localStorage.setItem('descArr', JSON.stringify(this.descricao));
    localStorage.setItem('qtdArr', JSON.stringify(this.qtd));
    localStorage.setItem('totCompArr', JSON.stringify(this.totalCompra));
  }

  adicionarProduto(nome, descricao, codigo, preco, link) {
    this.produto.push(nome);
    this.descricao.push(descricao);
    this.cod.push(codigo);
    this.preco.push(parseFloat(preco.replace(',', '.')));
    this.link.push(link);
    this.qtd.push(0);
    this.totalCompra.push(0);
    this.salvarNoLocalStorage();
  }

  calcularTotalCompra(pos, qtdSelecionada) {
    const total = qtdSelecionada * this.preco[pos];
    this.qtd[pos] = qtdSelecionada;
    this.totalCompra[pos] = total;
    this.salvarNoLocalStorage();
    return total;
  }

  getProdutoPorPos(pos) {
    return {
      nome: this.produto[pos],
      descricao: this.descricao[pos],
      preco: this.preco[pos],
      cod: this.cod[pos],
      link: this.link[pos]
    };
  }

  getTodosProdutos() {
    return this.produto.map((_, i) => this.getProdutoPorPos(i));
  }
}
