// Admin authentication and management

// Check if user is logged in
function checkAuth() {
    const isLoggedIn = sessionStorage.getItem('adminLoggedIn') === 'true';
    const currentPage = window.location.pathname;
    
    // Redirect if not logged in and trying to access admin page
    if (currentPage.includes('admin.html') && !isLoggedIn) {
        window.location.href = 'admin-login.html';
    }
    
    // Redirect if logged in and on login page
    if (currentPage.includes('admin-login.html') && isLoggedIn) {
        window.location.href = 'admin.html';
    }
    
    return isLoggedIn;
}

// Handle login
function setupLogin() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple authentication (in production, use proper backend auth)
            if (email === 'admin@giftzone.ae' && password === 'admin123') {
                sessionStorage.setItem('adminLoggedIn', 'true');
                sessionStorage.setItem('adminEmail', email);
                window.location.href = 'admin.html';
            } else {
                const errorMsg = document.getElementById('errorMsg');
                errorMsg.textContent = 'Invalid email or password';
                errorMsg.style.display = 'block';
            }
        });
    }
}

// Handle logout
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            sessionStorage.removeItem('adminLoggedIn');
            sessionStorage.removeItem('adminEmail');
            window.location.href = 'index.html';
        });
    }
}

// Load admin dashboard
function loadAdminDashboard() {
    if (!checkAuth()) return;
    
    const products = getProducts();
    const inStock = products.filter(p => p.stock_quantity > 0).length;
    const outOfStock = products.filter(p => p.stock_quantity === 0).length;
    const featured = products.filter(p => p.featured).length;
    
    // Update stats
    const statsGrid = document.getElementById('statsGrid');
    if (statsGrid) {
        statsGrid.innerHTML = `
            <div class="stat-card">
                <div class="stat-value">${products.length}</div>
                <div>Total Products</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${inStock}</div>
                <div>In Stock</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${outOfStock}</div>
                <div>Out of Stock</div>
            </div>
            <div class="stat-card">
                <div class="stat-value">${featured}</div>
                <div>Featured</div>
            </div>
        `;
    }
    
    renderAdminProducts();
}

// Render products table
function renderAdminProducts() {
    const products = getProducts();
    const tbody = document.getElementById('productsTableBody');
    
    if (tbody) {
        tbody.innerHTML = products.map(product => `
            <tr>
                <td><input type="checkbox" class="product-select" value="${product.id}"></td>
                <td><img src="${product.images[0]}" style="width: 50px; height: 50px; object-fit: cover;"></td>
                <td>${product.name}</td>
                <td>${product.brand}</td>
                <td>AED ${product.price.toLocaleString()}</td>
                <td>
                    <input type="number" value="${product.stock_quantity}" 
                           onchange="updateStock('${product.id}', this.value)" 
                           style="width: 70px; padding: 4px;">
                </td>
                <td>
                    <input type="checkbox" ${product.featured ? 'checked' : ''} 
                           onchange="toggleFeatured('${product.id}', this.checked)">
                </td>
                <td>
                    <button class="edit-btn" onclick="editProduct('${product.id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteProduct('${product.id}')">Delete</button>
                </td>
            </tr>
        `).join('');
    }
    
    // Setup select all
    const selectAll = document.getElementById('selectAll');
    if (selectAll) {
        selectAll.onclick = () => {
            const checkboxes = document.querySelectorAll('.product-select');
            checkboxes.forEach(cb => cb.checked = selectAll.checked);
        };
    }
}

// Update stock
function updateStock(productId, newStock) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
        product.stock_quantity = parseInt(newStock);
        saveProducts(products);
        showToast('Stock updated successfully');
    }
}

// Toggle featured
function toggleFeatured(productId, isFeatured) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
        product.featured = isFeatured;
        saveProducts(products);
        showToast('Featured status updated');
    }
}

// Delete product
function deleteProduct(productId) {
    if (confirm('Are you sure? This action cannot be undone.')) {
        let products = getProducts();
        products = products.filter(p => p.id !== productId);
        saveProducts(products);
        loadAdminDashboard();
        showToast('Product deleted successfully');
    }
}

// Bulk delete
function bulkDelete() {
    const selected = document.querySelectorAll('.product-select:checked');
    if (selected.length === 0) {
        alert('Please select products to delete');
        return;
    }
    
    if (confirm(`Delete ${selected.length} product(s)? This cannot be undone.`)) {
        let products = getProducts();
        const idsToDelete = Array.from(selected).map(cb => cb.value);
        products = products.filter(p => !idsToDelete.includes(p.id));
        saveProducts(products);
        loadAdminDashboard();
        showToast(`${selected.length} product(s) deleted`);
    }
}

// Open product modal for add/edit
function openProductModal(productId = null) {
    const modal = document.getElementById('productModal');
    const modalTitle = document.getElementById('modalTitle');
    
    if (productId) {
        modalTitle.textContent = 'Edit Product';
        const products = getProducts();
        const product = products.find(p => p.id === productId);
        if (product) {
            document.getElementById('productId').value = product.id;
            document.getElementById('prodName').value = product.name;
            document.getElementById('prodBrand').value = product.brand;
            document.getElementById('prodCategory').value = product.category;
            document.getElementById('prodPrice').value = product.price;
            document.getElementById('prodDescription').value = product.description;
            document.getElementById('prodStock').value = product.stock_quantity;
            document.getElementById('prodImage').value = product.images[0] || '';
            document.getElementById('prodFeatured').checked = product.featured;
        }
    } else {
        modalTitle.textContent = 'Add New Product';
        document.getElementById('productForm').reset();
        document.getElementById('productId').value = '';
    }
    
    modal.style.display = 'flex';
}

// Close product modal
function closeProductModal() {
    document.getElementById('productModal').style.display = 'none';
}

// Save product from modal
function setupProductForm() {
    const productForm = document.getElementById('productForm');
    if (productForm) {
        productForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const productId = document.getElementById('productId').value;
            const products = getProducts();
            
            const productData = {
                id: productId || Date.now().toString(),
                slug: document.getElementById('prodName').value.toLowerCase().replace(/\s+/g, '-'),
                name: document.getElementById('prodName').value,
                brand: document.getElementById('prodBrand').value,
                category: document.getElementById('prodCategory').value,
                description: document.getElementById('prodDescription').value,
                price: parseFloat(document.getElementById('prodPrice').value),
                reference_number: `${document.getElementById('prodBrand').value.substring(0, 2).toUpperCase()}-${Date.now()}`,
                case_material: 'Stainless Steel',
                diameter: '40mm',
                movement_type: 'Automatic',
                water_resistance: '100m',
                strap_type: 'Leather',
                stock_quantity: parseInt(document.getElementById('prodStock').value),
                featured: document.getElementById('prodFeatured').checked,
                images: [document.getElementById('prodImage').value || 'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&h=1000&fit=crop'],
                created_at: new Date().toISOString()
            };
            
            if (productId) {
                // Update existing
                const index = products.findIndex(p => p.id === productId);
                products[index] = { ...products[index], ...productData };
                showToast('Product updated successfully');
            } else {
                // Add new
                products.push(productData);
                showToast('Product added successfully');
            }
            
            saveProducts(products);
            closeProductModal();
            loadAdminDashboard();
        });
    }
}

// Show toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--gold-primary);
        color: var(--background);
        padding: 12px 24px;
        z-index: 3000;
        animation: fadeUp 0.3s ease-out;
    `;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Edit product
function editProduct(productId) {
    openProductModal(productId);
}

// Initialize admin
document.addEventListener('DOMContentLoaded', () => {
    setupLogin();
    setupLogout();
    setupProductForm();
    
    if (window.location.pathname.includes('admin.html')) {
        loadAdminDashboard();
    }
    
    // Close modal on outside click
    const modal = document.getElementById('productModal');
    if (modal) {
        window.onclick = (e) => {
            if (e.target === modal) {
                closeProductModal();
            }
        };
    }
});
