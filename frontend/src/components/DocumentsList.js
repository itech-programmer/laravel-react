import React, {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

function DocumentsList() {
    const [documents, setDocuments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const {data} = await axios.get(`http://localhost:8000/api/documents`);
            console.log('Data fetched:', data);
            setDocuments(data);
        } catch (error) {
            console.error('Error fetching documents:', error);
            setError('Error loading documents.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="row justify-content-center">
            <div className="col-12">
                <Link className='btn btn-primary mb-2 float-end' to={"/document"}>
                    New document form
                </Link>
            </div>
            <div className="col-12">
                <div className="card card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered mb-0 text-center">
                            <thead>
                            <tr>
                                <th>Document Title</th>
                                <th>Created Date</th>
                                <th>Document Size</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                            {documents.length > 0 ? (
                                documents.map(doc => (
                                    <tr key={doc.id}>
                                        <td>{doc.document_name}</td>
                                        <td>{new Date(doc.created_at).toLocaleDateString()}</td>
                                        <td>{doc.configurations_count}</td>
                                        <td>
                                            <Link to={`/document/${doc.id}`} className="btn btn-primary">Preview</Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No documents found</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default DocumentsList;
