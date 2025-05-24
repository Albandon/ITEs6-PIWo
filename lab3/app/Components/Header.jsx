import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { auth } from "../../config/firebase";

export default function Header() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, []);

    const handleLogout = async () => {
        await auth.signOut();
        window.location.reload();
    };

    return (
        <header>
            <div className="top">
                <div className="top-login">
                    {user ? (
                        <button className="top-text" onClick={handleLogout}>Wyloguj</button>
                    ) : (
                        <NavLink className="top-text" to="/Login">Zaloguj się</NavLink>
                    )}
                </div>
                <div className="logo">
                    <NavLink to="/">
                        <img src="/logo.png" className="logo-image" alt="Logo" />
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