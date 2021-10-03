import { useEffect } from 'react';
import styles from '../styles/Guides.module.css';
import AuthContext from '../stores/authContext';

export default function Guides() {
    const { user, authReady } = useContext(AuthContext);
    const { guides, setGuides } = useState(null);
    const { eror, setError } = useState(null);

    useEffect(() => {
        if (authReady) {
            fetch(
                '/.netlify/functions/guies',
                user && {
                    headers: {
                        Authorization: 'Bearer ' + user.token.access_token,
                    },
                }
            )
                .then((res) => {
                    if (!res.ok) {
                        throw Error(
                            'You must be logged in to view this content'
                        );
                    }

                    return res.json();
                })
                .then((data) => {
                    setGuides(data);
                    setError(null);
                })
                .catch((err) => {
                    setError(err.message);
                    setGuides(null);
                });
        }
    }, [user, authReady]);

    return (
        <div className={styles.guides}>
            {!authReady && <div>Loading ...</div>}

            {error && (
                <div className={styles.error}>
                    <p>{error}</p>
                </div>
            )}

            { guides && guides.map(guide => (
                <div key={guide.title} className={styles.card}>
                    <h3> {guide.title} </h3>
                    <h4>Written by { guide.title} </h4>
                    <p> lorem20  </p>
                </div>
            )) }
        </div>
    );
}
