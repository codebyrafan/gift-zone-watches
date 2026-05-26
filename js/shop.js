// Shop page functionality

let currentProducts = [];
let filteredProducts = [];

// Load all products
function loadProducts() {
    currentProducts = getProducts();
    filteredProducts = [...currentProducts];
    applyFilters();
}

// Apply filters and render
function applyFilters() {
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    const brand = document.getElementById('brandFilter')?.value || '';
    const sort = document.getElementById('sortFilter')?.value || 'featured';
    
    // Filter
    filteredProducts = currentProducts.filter(product => {
        const matchesSearch = !searchTerm || 
            product.name.toLowerCase().includes(searchTerm) || 
            product.brand.toLowerCase().includes(searchTerm);
        const matchesCategory = !category || product.category === category;
        const matchesBrand = !brand || product.brand === brand;
        
        return matchesSearch && matchesCategory && matchesBrand;
    });
    
    // Sort
    switch(sort) {
        case 'price_asc':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price_desc':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            break;
        default:
            filteredProducts.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }
    
    renderProducts();
    updateActiveFilters();
    updateResultCount();
}

// Render products grid
function renderProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;
    
    container.innerHTML = filteredProducts.map(product => {
        const stockStatus = getStockStatus(product.stock_quantity);
        const isSoldOut = product.stock_quantity <= 0;
        
        return `
            <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
                <div class="product-image">
                    <img src="${product.images[0]}" alt="${product.name}" style="${isSoldOut ? 'filter: grayscale(1);' : ''}" loading="lazy">
                </div>
                <span class="product-brand">${product.brand}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">AED ${product.price.toLocaleString()}</div>
                <span class="stock-badge ${stockStatus.class}">
                    ${stockStatus.text}
                </span>
            </div>
        `;
    }).join('');
    
    if (filteredProducts.length === 0) {
        container.innerHTML = '<div style="text-align: center; padding: 60px; color: var(--text-muted);">No products found. Try adjusting your filters.</div>';
    }
}

// Update result count
function updateResultCount() {
    const countElement = document.getElementById('resultCount');
    if (countElement) {
        countElement.textContent = `${filteredProducts.length} timepiece${filteredProducts.length !== 1 ? 's' : ''} found`;
    }
}

// Update active filters chips
function updateActiveFilters() {
    const searchTerm = document.getElementById('searchInput')?.value || '';
    const category = document.getElementById('categoryFilter')?.value || '';
    const brand = document.getElementById('brandFilter')?.value || '';
    
    const activeFilters = [];
    if (searchTerm) activeFilters.push({ type: 'search', value: searchTerm, label: `Search: ${searchTerm}` });
    if (category) activeFilters.push({ type: 'category', value: category, label: category });
    if (brand) activeFilters.push({ type: 'brand', value: brand, label: brand });
    
    const container = document.getElementById('activeFilters');
    if (container) {
        container.innerHTML = activeFilters.map(filter => `
            <span class="filter-chip" onclick="removeFilter('${filter.type}')">${filter.label} ✕</span>
        `).join('');
    }
}

// Remove individual filter
function removeFilter(type) {
    switch(type) {
        case 'search':
            const searchInput = document.getElementById('searchInput');
            if (searchInput) searchInput.value = '';
            break;
        case 'category':
            const categorySelect = document.getElementById('categoryFilter');
            if (categorySelect) categorySelect.value = '';
            break;
        case 'brand':
            const brandSelect = document.getElementById('brandFilter');
            if (brandSelect) brandSelect.value = '';
            break;
    }
    applyFilters();
}

// Clear all filters
function clearAllFilters() {
    const searchInput = document.getElementById('searchInput');
    const categorySelect = document.getElementById('categoryFilter');
    const brandSelect = document.getElementById('brandFilter');
    const sortSelect = document.getElementById('sortFilter');
    
    if (searchInput) searchInput.value = '';
    if (categorySelect) categorySelect.value = '';
    if (brandSelect) brandSelect.value = '';
    if (sortSelect) sortSelect.value = 'featured';
    
    applyFilters();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    
    // Add event listeners
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const brandFilter = document.getElementById('brandFilter');
    const sortFilter = document.getElementById('sortFilter');
    
    if (searchInput) searchInput.addEventListener('input', applyFilters);
    if (categoryFilter) categoryFilter.addEventListener('change', applyFilters);
    if (brandFilter) brandFilter.addEventListener('change', applyFilters);
    if (sortFilter) sortFilter.addEventListener('change', applyFilters);
});
