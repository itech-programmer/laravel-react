import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function DocumentView() {
    const { id } = useParams();
    const [document, setDocument] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log('Document ID:', id);
        fetchDocument();
    }, [id]);

    const fetchDocument = async () => {
        setLoading(true);
        try {
            const { data } = await axios.get(`http://localhost:8000/api/document/${id}`);
            console.log('Document data:', data);
            setDocument(data);
        } catch (error) {
            console.error('Error fetching document:', error.response || error.message || error);
            setError('Error loading document.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container">
            <h1 className="my-4">{document?.document_name}</h1>
            {document?.fields.map(field => (
                <div className="form-group" key={field.id}>
                    <label>{field.field_name}</label>
                    {renderField(field)}
                </div>
            ))}
        </div>
    );
}

// Функция для отображения поля в зависимости от типа
function renderField(field) {
    switch (field.type) {
        case 'text':
            return <input type="text" className="form-control" value={field.value} readOnly />;
        case 'date':
            return <input type="date" className="form-control" value={field.value} readOnly />;
        case 'textarea':
            return <textarea className="form-control" value={field.value} readOnly />;
        case 'checkbox':
            return <input type="checkbox" className="form-check-input" checked={field.value} readOnly />;
        // Добавьте другие типы полей, если необходимо
        default:
            return <span>{field.value}</span>;
    }
}

export default DocumentView;
