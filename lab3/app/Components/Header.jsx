import { useContext, useState, useEffect } from "react";
import { NavLink } from "react-router";
import { auth } from "../../config/firebase";
import { CartContext } from "../Context/CartContext";

export default function Header() {
    const [user, setUser] = useState(null);
    const { cart, dispatch } = useContext(CartContext);
    const [cartOpen, setCartOpen] = useState(false);

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
                <div className="cart" style={{ position: "relative" }}>
                    <button className="cart-links" onClick={() => setCartOpen(o => !o)}>
                        Koszyk ({cart.length})
                    </button>
                    <NavLink className="cart-links" to="/New">Dodaj książkę</NavLink>
                    {cartOpen && (
                        <div style={{
                            position: "absolute",
                            right: 0,
                            top: "100%",
                            background: "#fff",
                            border: "1px solid #ccc",
                            zIndex: 100,
                            minWidth: "260px",
                            boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
                        }}>
                            {cart.length === 0 ? (
                                <div style={{ padding: "1em" }}>Koszyk jest pusty</div>
                            ) : (
                                <ul style={{ listStyle: "none", margin: 0, padding: "1em" }}>
                                    {cart.map(item => (
                                        <li key={item.id} style={{ marginBottom: "0.5em", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                            <div style={{ display: "flex", alignItems: "center" }}>
                                                {item.cover && (
                                                    <img src={item.cover} alt="miniaturka" style={{ width: 40, height: 60, objectFit: "cover", marginRight: 10, borderRadius: 4 }} />
                                                )}
                                                <span>{item.title}</span>
                                            </div>
                                            <button
                                                style={{ marginLeft: "1em", background: "#ffeb3b", border: "none", borderRadius: "4px", cursor: "pointer" }}
                                                onClick={() => dispatch({ type: "REMOVE_FROM_CART", id: item.id })}
                                            >
                                                Usuń
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}