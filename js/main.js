// Navigation and UI Components

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Load featured products on homepage
function loadFeaturedProducts() {
    const products = getProducts();
    const featured = products.filter(p => p.featured).slice(0, 6);
    const container = document.getElementById('featuredProducts');
    
    if (container) {
        container.innerHTML = featured.map(product => `
            <div class="product-card" onclick="window.location.href='product-detail.html?id=${product.id}'">
                <div class="product-image">
                    <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                </div>
                <span class="product-brand">${product.brand}</span>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-price">AED ${product.price.toLocaleString()}</div>
                <span class="stock-badge ${getStockStatus(product.stock_quantity).class}">
                    ${getStockStatus(product.stock_quantity).text}
                </span>
            </div>
        `).join('');
    }
}

// Load testimonials
function loadTestimonials() {
    const testimonials = getTestimonials();
    const approved = testimonials.filter(t => t.approved);
    const container = document.getElementById('testimonials');
    
    if (container) {
        container.innerHTML = approved.map(testimonial => `
            <div class="testimonial-card">
                <div class="stars">${'★'.repeat(testimonial.rating)}${'☆'.repeat(5 - testimonial.rating)}</div>
                <p class="testimonial-quote">"${testimonial.quote}"</p>
                <div class="testimonial-author">${testimonial.customer_name}</div>
                <div class="testimonial-city">${testimonial.customer_city}</div>
            </div>
        `).join('');
    }
}

// Load product detail
function loadProductDetail() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    
    const container = document.getElementById('productContent');
    if (container && product) {
        const stockStatus = getStockStatus(product.stock_quantity);
        container.innerHTML = `
            <div class="product-detail-grid">
                <div class="gallery">
                    <div class="gallery-main" onclick="openLightbox('${product.images[0]}')">
                        <img id="mainImage" src="${product.images[0]}" alt="${product.name}">
                    </div>
                    <div class="gallery-thumbnails">
                        ${product.images.map((img, idx) => `
                            <img src="${img}" class="gallery-thumb ${idx === 0 ? 'active' : ''}" 
                                 onclick="changeImage('${img}', this)">
                        `).join('')}
                    </div>
                </div>
                <div class="product-info">
                    <span class="product-brand">${product.brand}</span>
                    <h1>${product.name}</h1>
                    <div class="product-ref">Ref: ${product.reference_number}</div>
                    <div class="product-price-large">AED ${product.price.toLocaleString()}</div>
                    <span class="stock-badge ${stockStatus.class}" style="margin-bottom: 24px; display: inline-block;">
                        ${stockStatus.text}
                    </span>
                    <p style="color: var(--text-muted); margin: 24px 0;">${product.description}</p>
                    
                    <table class="specs-table">
                        <tr><td>Case Material</td><td>${product.case_material}</td></tr>
                        <tr><td>Diameter</td><td>${product.diameter}</td></tr>
                        <tr><td>Movement</td><td>${product.movement_type}</td></tr>
                        <tr><td>Water Resistance</td><td>${product.water_resistance}</td></tr>
                        <tr><td>Strap</td><td>${product.strap_type}</td></tr>
                    </table>
                    
                    <a href="https://wa.me/971500000000?text=Hi%2C%20I%20am%20interested%20in%20${product.name}%20(Ref%3A%20${product.reference_number})%20Price%3A%20AED%20${product.price.toLocaleString()}" 
                       target="_blank" class="btn whatsapp-btn">
                        💬 Order via WhatsApp
                    </a>
                </div>
            </div>
        `;
    }
}

// Image gallery functions
function changeImage(src, element) {
    document.getElementById('mainImage').src = src;
    document.querySelectorAll('.gallery-thumb').forEach(thumb => {
        thumb.classList.remove('active');
    });
    element.classList.add('active');
}

function openLightbox(src) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    lightbox.style.display = 'flex';
    lightboxImg.src = src;
}

// Close lightbox on click outside
document.addEventListener('click', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    loadFeaturedProducts();
    loadTestimonials();
    loadProductDetail();
});
