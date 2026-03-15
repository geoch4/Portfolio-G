// src/components/layout/Footer.tsx
import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-100 border-t border-gray-200 mt-auto">
            <div className="container mx-auto px-6 py-4 text-center text-gray-600">
                <p>&copy; {currentYear} [Gerogia Chalkia]. Alla rättigheter förbehållna.</p>
            </div>
        </footer>
    );
};

export default Footer;