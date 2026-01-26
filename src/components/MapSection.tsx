import React from 'react';
import styles from './MapSection.module.css';

const MapSection = () => {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Our Location</h2>
                    <p className={styles.subtitle}>Visit us at Lider Bazar, Uchquduq, Navoiy Region</p>
                </div>

                <div className={styles.mapWrapper}>
                    <iframe
                        src="https://maps.google.com/maps?q=42.155472,63.563917&hl=uz&z=17&amp;output=embed"
                        width="100%"
                        className={styles.map}
                    ></iframe>
                </div>
            </div>
        </section>
    );
};

export default MapSection;
