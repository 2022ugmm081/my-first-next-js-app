"use client";

import { useEffect, useState } from "react";

import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

import {
    getProducts,
    deleteProduct
} from "../services/productService";

export default function ProductApp() {

    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [editingProduct, setEditingProduct] =
        useState(null);

    const [selectedProduct, setSelectedProduct] =
        useState(null);


    // ======================================
    // GET PRODUCTS
    // ======================================

    async function loadProducts() {

        try {

            setLoading(true);
            setError("");

            const data = await getProducts();

            setProducts(data);

        } catch (error) {

            setError(error.message);

        } finally {

            setLoading(false);

        }
    }


    // ======================================
    // ADD / UPDATE SUCCESS
    // ======================================

    async function handleSaved() {

        setEditingProduct(null);

        await loadProducts();
    }


    // ======================================
    // EDIT
    // ======================================

    function handleEdit(product) {

        setSelectedProduct(null);

        setEditingProduct(product);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }


    // ======================================
    // DELETE
    // ======================================

    async function handleDelete(id) {

        const confirmed = window.confirm(
            "Are you sure you want to delete this product?"
        );

        if (!confirmed) {
            return;
        }

        try {

            setError("");

            await deleteProduct(id);

            setProducts((currentProducts) =>
                currentProducts.filter(
                    (product) =>
                        product.id !== id
                )
            );

        } catch (error) {

            setError(error.message);

        }
    }


    // ======================================
    // VIEW
    // ======================================

    function handleView(product) {

        setSelectedProduct(product);
    }


    // ======================================
    // INITIAL LOAD
    // ======================================

    useEffect(() => {

        loadProducts();

    }, []);


    return (
        <div className="app-container">

            {/* HEADER */}

            <header className="app-header">

                <p className="eyebrow">
                    ADMIN PANEL
                </p>

                <h1>
                    Product Management
                </h1>

                <p className="subtitle">
                    Manage your products from one place.
                </p>

            </header>


            {/* ERROR */}

            {error && (

                <div className="global-error">
                    ⚠️ {error}
                </div>

            )}


            {/* FORM */}

            <ProductForm
                editingProduct={editingProduct}
                onSaved={handleSaved}
                onCancel={() =>
                    setEditingProduct(null)
                }
            />


            {/* LIST */}

            <ProductList
                products={products}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onView={handleView}
            />


            {/* VIEW MODAL */}

            {selectedProduct && (

                <div
                    className="modal-overlay"
                    onClick={() =>
                        setSelectedProduct(null)
                    }
                >

                    <div
                        className="modal"
                        onClick={(event) =>
                            event.stopPropagation()
                        }
                    >

                        <div className="modal-header">

                            <h2>
                                Product Details
                            </h2>

                            <button
                                className="close-button"
                                onClick={() =>
                                    setSelectedProduct(null)
                                }
                            >
                                ×
                            </button>

                        </div>


                        <div className="modal-body">

                            <div className="detail-icon">
                                📦
                            </div>

                            <h3>
                                {selectedProduct.name}
                            </h3>

                            <p>
                                Product ID:
                                {" "}
                                <strong>
                                    {selectedProduct.id}
                                </strong>
                            </p>

                            <div className="detail-price">

                                ₹
                                {Number(
                                    selectedProduct.price
                                ).toLocaleString("en-IN")}

                            </div>

                        </div>


                        <div className="modal-footer">

                            <button
                                className="primary-button"
                                onClick={() => {

                                    handleEdit(
                                        selectedProduct
                                    );

                                    setSelectedProduct(null);

                                }}
                            >
                                Edit Product
                            </button>

                        </div>

                    </div>

                </div>

            )}

        </div>
    );
}