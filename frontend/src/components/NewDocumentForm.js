import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function NewDocumentForm() {
    const [documentName, setDocumentName] = useState('');
    const [formValues, setFormValues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const addField = () => {
        setFormValues([...formValues, {
            field_seq: '',
            is_mandatory: false,
            field_type: '1',
            field_name: '',
            select_values: []
        }]);
    };

    const handleFieldChange = (index, field, value) => {
        const newFormValues = [...formValues];
        if (field === 'select_values') {
            newFormValues[index][field] = value.split(',').map(val => val.trim());
        } else {
            newFormValues[index][field] = value;
        }
        setFormValues(newFormValues);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            const { data } = await axios.post(`http://localhost:8000/api/document/store`, {
                document_name: documentName,
                form_values: formValues
            });
            console.log('Document created:', data);
            setSuccess('Document created successfully!');
            setDocumentName('');
            setFormValues([]);
        } catch (error) {
            console.error('Error creating document:', error.response || error.message || error);
            setError('Error creating document.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">Create New Document</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group mb-5">
                    <label>Document Name</label>
                    <input
                        type="text"
                        className="form-control"
                        value={documentName}
                        onChange={e => setDocumentName(e.target.value)}
                        required
                    />
                </div>
                <div className="mx-5">
                    {formValues.map((field, index) => (
                        <div className="form-row mb-3" key={index}>
                            <div className="col">
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Field Sequence"
                                    value={field.field_seq}
                                    onChange={e => handleFieldChange(index, 'field_seq', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col">
                                <select
                                    className="form-control"
                                    value={field.field_type}
                                    onChange={e => handleFieldChange(index, 'field_type', e.target.value)}
                                    required
                                >
                                    <option value="true">Agree</option>
                                    <option value="false">Disagree</option>
                                </select>
                            </div>
                            <div className="col">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Field Name"
                                    value={field.field_name}
                                    onChange={e => handleFieldChange(index, 'field_name', e.target.value)}
                                    required
                                />
                            </div>
                            <div className="col">
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        checked={field.is_mandatory}
                                        onChange={e => handleFieldChange(index, 'is_mandatory', e.target.checked)}
                                    />
                                    <label className="form-check-label">Mandatory</label>
                                </div>
                            </div>
                            {field.field_type === '3' && (
                                <div className="col">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Select Values (comma separated)"
                                        value={field.select_values.join(', ')}
                                        onChange={e => handleFieldChange(index, 'select_values', e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    ))}
                    <div className="d-flex justify-content-between mt-10">
                        <button
                            type="button"
                            className="btn btn-light text-secondary"
                            onClick={addField}>
                            Add More
                        </button>
                        <button
                            type="submit"
                            className="btn btn-primary text-white"
                            disabled={loading}>
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </div>
            </form>
            {success && <div className="alert alert-success mt-3">{success}</div>}
            {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
    );
}

export default NewDocumentForm;
