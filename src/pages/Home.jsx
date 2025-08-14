

export const Home = () => {
    return (
        <div id="hcont">
           
            <a className="car" href="#">
                Compras
                <img src="imagens/carrinho.png" alt="Carrinho de compras" />
            </a>

            <h1 id="tituloProduto"></h1>
            <div id="central">
                <div id="imgProd"></div>
                <p id="descProduto"></p>
            </div>
        </div>
    );
}