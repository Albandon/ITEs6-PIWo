import { createContext, useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore, auth } from '../../config/firebase';

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
    const [booksList, setBooksList] = useState([]);
    const [showMine, setShowMine] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(setUser);
        return () => unsubscribe();
    }, []);

    const getBookList = async () => {
        try {
            let col = collection(firestore, "books");
            let q = col;
            if (showMine && user) {
                q = query(col, where("userId", "==", user.uid));
            }
            const data = await getDocs(q);
            const filteredData = data.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setBooksList(filteredData);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getBookList();
    }, [showMine, user]);

    return (
        <BooksContext.Provider value={{ booksList, setBooksList, showMine, setShowMine, user, getBookList }}>
            {children}
        </BooksContext.Provider>
    );
};
