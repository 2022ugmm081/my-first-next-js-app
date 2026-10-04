"use client";

import { useEffect, useState } from "react";
import {
    createProduct,
    updateProduct
} from "../services/productService";

export default function ProductForm({
    editingProduct,
    onSaved,
    onCancel
}) {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // ======================================
    // LOAD EDITING PRODUCT INTO FORM
    // ======================================

    useEffect(() => {

        if (editingProduct) {

            setName(editingProduct.name);
            setPrice(editingProduct.price);

        } else {

            setName("");
            setPrice("");

        }

        setError("");

    }, [editingProduct]);


    // ======================================
    // SUBMIT
    // ======================================

    async function handleSubmit(event) {

        event.preventDefault();

        setError("");

        // Validation

        if (!name.trim()) {
            setError("Product name is required.");
            return;
        }

        if (!price || Number(price) <= 0) {
            setError("Price must be greater than 0.");
            return;
        }

        const product = {
            name: name.trim(),
            price: Number(price)
        };

        try {

            setLoading(true);

            if (editingProduct) {

                // UPDATE
                await updateProduct(
                    editingProduct.id,
                    product
                );

            } else {

                // CREATE
                await createProduct(product);

            }

            setName("");
            setPrice("");

            onSaved();

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    }


    return (
        <div className="form-card">

            <div className="form-header">

                <h2>
                    {editingProduct
                        ? "Edit Product"
                        : "Add Product"}
                </h2>

                {editingProduct && (

                    <button
                        type="button"
                        className="cancel-button"
                        onClick={onCancel}
                    >
                        Cancel
                    </button>

                )}

            </div>


            <form onSubmit={handleSubmit}>

                <div className="form-group">

                    <label>
                        Product Name
                    </label>

                    <input
                        type="text"
                        value={name}
                        onChange={(e) =>
                            setName(e.target.value)
                        }
                        placeholder="Enter product name"
                        disabled={loading}
                    />

                </div>


                <div className="form-group">

                    <label>
                        Price
                    </label>

                    <input
                        type="number"
                        value={price}
                        onChange={(e) =>
                            setPrice(e.target.value)
                        }
                        placeholder="Enter price"
                        min="1"
                        disabled={loading}
                    />

                </div>


                {error && (

                    <div className="error-message">
                        {error}
                    </div>

                )}


                <button
                    type="submit"
                    className="primary-button"
                    disabled={loading}
                >

                    {loading
                        ? "Saving..."
                        : editingProduct
                            ? "Update Product"
                            : "Add Product"}

                </button>

            </form>

        </div>
    );
}