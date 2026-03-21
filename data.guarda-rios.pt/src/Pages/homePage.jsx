import '../App.css';
import "./homePage.css";

function HomePage() {
    return (
          <div className="window">
      <div className="home-page-header">
        <img
          src="https://data.guarda-rios.pt/PGR_Logo.png"
          alt="Projeto Guarda Rios - Logo"
          className="home-page-header-pgr-logo"
        />
        <h1 className="home-page-title">Data - Projeto Guarda Rios</h1>
      </div>

      <div className="container">
        <main>
          <h1 className="welcome-message">Bem-vindo/a ao portal de partilha de dados Guarda Rios!</h1>

          <p>
            Um projeto com o objetivo de medir a qualidade da água dos rios
            portugueses. Neste site estão disponíveis os dados obtidos em cada
            estação, acessíveis ao público e permitindo que todos possam
            utilizá-los de forma livre, dentro do espírito Open Source (sob as
            licenças{" "}
            <a
              href="https://opensource.org/licenses/MIT"
              target="_blank"
              rel="noopener noreferrer"
            >
              MIT
            </a>{" "}
            e{" "}
            <a
              href="https://cern-ohl.web.cern.ch/"
              target="_blank"
              rel="noopener noreferrer"
            >
              CERN-OHL-P v2
            </a>
            ).
          </p>      
        </main>

        <footer>
          Mais informações sobre o nosso projeto em {" "}
	  <a
	    href="https://guarda-rios.pt"
	    target="_blank"
	    rel="noopener noreferrer"
	  >
	    guarda-rios.pt
	  </a>
	  .
        </footer>
      </div>
    </div>
    );
}

export default HomePage;
