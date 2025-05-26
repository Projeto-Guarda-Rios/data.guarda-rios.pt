import PropTypes from "prop-types";
import './App.css';

function SideBar(props) {
    return (
        <div className="side-bar">
            <div className={props.currentPage == 0 ? "side-bar-element-selected" : "side-bar-element"} onClick={() => props.updatePageFunc(0)}>Home Page</div>
            <div className={props.currentPage == 1 ? "side-bar-element-selected" : "side-bar-element"} onClick={() => props.updatePageFunc(1)}>Gráfico Geral</div>
            <div className={props.currentPage == 2 ? "side-bar-element-selected" : "side-bar-element"} onClick={() => props.updatePageFunc(2)}>Gráfico Ribalab</div>
            <div className={props.currentPage == 3 ? "side-bar-element-selected" : "side-bar-element"} onClick={() => props.updatePageFunc(3)}>Gráfico Ribeira da Granja</div>
            {/*<div className={props.currentPage == 4 ? "side-bar-element-selected" : "side-bar-element"} onClick={() => props.updatePageFunc(3)}>Gráfico Rio Douro</div>
            <div className={props.currentPage == 5 ? "side-bar-element-selected" : "side-bar-element"} onClick={() => props.updatePageFunc(4)}>Gráfico Rio Tejo</div>*/}
        </div>
    );
}

SideBar.propTypes = {
    currentPage: PropTypes.number.isRequired,
    updatePageFunc: PropTypes.func.isRequired
}

SideBar.defaultProps = {
    currentPage: 0
}

export default SideBar;
