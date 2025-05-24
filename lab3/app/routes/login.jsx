import { useState } from 'react';
import { auth, provider } from '../../config/firebase';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            setMessage('Zalogowano pomyślnie!');
        } catch (error) {
            setMessage(error.message);
        }
    };

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, provider);
            setMessage('Zalogowano przez Google!');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <main>
            <div className="main-container-signin">
                <h1 className="view-header">Logowanie</h1>
                <form className="add-parameters-container" onSubmit={handleSubmit}>
                    <input
                        className="small-input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className="small-input"
                        type="password"
                        placeholder="Hasło"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        required
                    />
                    <button className='small-button' type="submit">Zaloguj</button>
                    <button
                        type="button"
                        className="register-withGooglebutton"
                        onClick={signInWithGoogle}
                    >
                        <svg width="20" height="20" viewBox="0 0 48 48">
                            <g>
                            <path fill="#4285F4" d="M44.5 20H24v8.5h11.7C34.7 33.1 29.8 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 6.2 29.5 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z"/>
                            <path fill="#34A853" d="M6.3 14.7l7 5.1C15.5 16.1 19.4 13 24 13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.5 6.2 29.5 4 24 4c-7.2 0-13.4 3.7-17.1 9.4z"/>
                            <path fill="#FBBC05" d="M24 44c5.5 0 10.5-1.8 14.4-4.9l-6.6-5.4C29.7 35.7 27 36.7 24 36.7c-5.7 0-10.6-3.9-12.3-9.2l-7 5.4C7.1 39.2 14.9 44 24 44z"/>
                            <path fill="#EA4335" d="M44.5 20H24v8.5h11.7c-1.2 3.2-4.1 5.5-7.7 5.5-2.2 0-4.2-.7-5.8-2l-7 5.4C15.5 39.9 19.4 44 24 44c7.2 0 13.4-3.7 17.1-9.4z"/>
                            </g>
                        </svg>
                    </button>
                </form>
                {message && <div style={{ marginTop: "1rem", color: "#388e3c", fontWeight: "bold", textAlign: 'center'}}>{message}</div>}
            </div>
        </main>
    );
}