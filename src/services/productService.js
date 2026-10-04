const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/Product`;

// ======================================
// GET ALL PRODUCTS
// ======================================

export async function getProducts() {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Failed to load products.");
    }

    return await response.json();
}


// ======================================
// GET PRODUCT BY ID
// ======================================

export async function getProductById(id) {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
        throw new Error("Failed to load product.");
    }

    return await response.json();
}


// ======================================
// CREATE PRODUCT
// ======================================

export async function createProduct(product) {
    const response = await fetch(API_URL, {
        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(product)
    });

    if (!response.ok) {
        throw new Error("Failed to create product.");
    }

    return await response.json();
}


// ======================================
// UPDATE PRODUCT
// ======================================

export async function updateProduct(id, product) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(product)
    });

    if (!response.ok) {
        throw new Error("Failed to update product.");
    }

    return await response.json();
}


// ======================================
// DELETE PRODUCT
// ======================================

export async function deleteProduct(id) {
    const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    if (!response.ok) {
        throw new Error("Failed to delete product.");
    }

    return await response.json();
}