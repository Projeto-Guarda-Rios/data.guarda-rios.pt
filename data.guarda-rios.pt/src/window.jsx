import PropTypes from "prop-types";
import HomePage from "./Pages/homePage.jsx";
import GraficoGeral from "./Pages/graficoGeral.jsx";
import GraficoRibalab from "./Pages/graficoRibalab.jsx";
import GraficoGranja from "./Pages/graficoGranja.jsx";

function Window(props) {
    if (props.currentPage === 0) {
        return (
            <HomePage />
        );
    } else if (props.currentPage === 1) {
        return (
            <GraficoGeral />
        );
    } else if (props.currentPage === 2) {
        return (
            <GraficoRibalab />
        );
    } else if (props.currentPage === 3) {
        return (
            <GraficoGranja />
        );
    }
}

Window.propTypes = {
    currentPage: PropTypes.number.isRequired
}

Window.defaultProps = {
    currentPage: -1
}

export default Window;
