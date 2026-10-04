"use client";

export default function ProductList({
    products,
    loading,
    onEdit,
    onDelete,
    onView
}) {

    if (loading) {

        return (
            <div className="loading">
                Loading products...
            </div>
        );

    }


    if (products.length === 0) {

        return (
            <div className="empty-state">

                <div className="empty-icon">
                    📦
                </div>

                <h3>
                    No products found
                </h3>

                <p>
                    Add your first product.
                </p>

            </div>
        );

    }


    return (
        <div className="product-section">

            <div className="section-header">

                <h2>
                    Products
                </h2>

                <span className="product-count">
                    {products.length} products
                </span>

            </div>


            <div className="product-grid">

                {products.map((product) => (

                    <div
                        className="product-card"
                        key={product.id}
                    >

                        <div className="product-icon">
                            📦
                        </div>


                        <div className="product-info">

                            <h3>
                                {product.name}
                            </h3>

                            <p className="product-id">
                                ID: {product.id}
                            </p>

                            <p className="product-price">
                                ₹
                                {Number(
                                    product.price
                                ).toLocaleString("en-IN")}
                            </p>

                        </div>


                        <div className="product-actions">

                            <button
                                className="view-button"
                                onClick={() =>
                                    onView(product)
                                }
                            >
                                View
                            </button>


                            <button
                                className="edit-button"
                                onClick={() =>
                                    onEdit(product)
                                }
                            >
                                Edit
                            </button>


                            <button
                                className="delete-button"
                                onClick={() =>
                                    onDelete(product.id)
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}