import { NavLink } from "react-router";

export default function Header() {
    return (
        <header>
            <div className="top">
                <div className="top-login">
                    <NavLink className="top-text" to="/Login">Zaloguj się</NavLink>
                </div>
                <div className="logo">
                    <NavLink to="/">
                        <img src="logo.png" className="logo-image" alt="Logo" />
                    </NavLink>
                </div>
                <div className="top-register">
                    <NavLink className="top-text" to="/Register">Zarejestruj się</NavLink>
                </div>
                <div className="cart">
                    <NavLink className="cart-links" to="/Cart">Koszyk</NavLink>
                    <NavLink className="cart-links" to="/New">Dodaj książkę</NavLink>
                </div>
            </div>
        </header>
    );
}