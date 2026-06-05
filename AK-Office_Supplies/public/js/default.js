// Product quick-view modal + simple front-end cart
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('productModal');
    if (!modal) return;

    const closeBtn    = document.getElementById('modalClose');
    const img         = document.getElementById('modalImage');
    const title       = document.getElementById('modalTitle');
    const category    = document.getElementById('modalCategory');
    const price       = document.getElementById('modalPrice');
    const description = document.getElementById('modalDescription');
    const link        = document.getElementById('modalLink');
    const addBtn      = document.getElementById('addToCart'); //for now

    const cart = [];     
    let currentProduct = null;

    const openModal = (card) => {
        const d = card.dataset;
        currentProduct = { id: d.id, name: d.name, price: Number(d.price), image: d.image };

        img.src = '/images/products/' + d.image;
        img.alt = d.name;
        title.textContent = d.name;
        category.textContent = d.category;
        price.textContent = '$' + d.price;
        description.textContent = d.description;
        link.href = '/products/' + d.id;

        // set for now for the 'Add to Cart'
        addBtn.textContent = 'Add to Cart';
        addBtn.disabled = false;

        modal.hidden = false;
        document.body.style.overflow = 'hidden';  // stop background scroll
        closeBtn.focus();
    };

    const closeModal = () => {
        modal.hidden = true;
        document.body.style.overflow = '';
    };

    const addToCart = () => {
        if (!currentProduct) return;
        cart.push(currentProduct);
        addBtn.textContent = 'Added ✓';
        addBtn.disabled = true;
        console.log('Cart now has', cart.length, 'item(s):', cart);
        setTimeout(() => {
            addBtn.textContent = 'Add to Cart';
            addBtn.disabled = false;
        }, 1200);
    };

    // Open modal on card click — works for both server-rendered and search-rendered cards
    // (listener is on #allCards, so it survives innerHTML re-renders). Links are ignored.
    document.getElementById('allCards')?.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        const card = e.target.closest('.productCard');
        if (card) openModal(card);
    });

    addBtn.addEventListener('click', addToCart);

    // Three ways to close: button, backdrop click, Escape
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
});

const searchInput = document.getElementById('searchInput');
const categoryInput = document.getElementById('category');
const maxPriceInput = document.getElementById('max_price');
const minPriceInput = document.getElementById('min_price');
const allCards = document.getElementById('allCards');

const renderCards = (products) => {
    if (products.length === 0) {
        allCards.innerHTML = '<p>No products found.</p>';
        return;
    }

    allCards.innerHTML = products.map(product => `
<div class="productCard"
        data-id="${product.product_id}"
        data-name="${product.product_name}"
        data-price="${product.price}"
        data-category="${product.category}"
        data-image="${product.image_file}"
        data-description="${product.product_description}">
    <img src="/images/products/${product.image_file}"
            alt="${product.product_name}"
            onerror="this.src='/images/default.webp'" />
    <h3>${product.product_name}</h3>
    <p class="description">${product.product_description}</p>
    <p class="price">$${product.price}</p>
</div>
    `).join('');
};

searchInput.addEventListener('input', async () => {
    const res = await fetch(`/api/products?search=${searchInput.value}`);
    const json = await res.json();
    renderCards(json.data);
});

categoryInput.addEventListener('input', async () => {
    let res, json;
    if(categoryInput.value === 'none'){
        res = await fetch(`/api/products`);
        json = await res.json();
    }else{
        res = await fetch(`/api/products?category=${categoryInput.value}`);
        json = await res.json();
    }
    //console.log(categoryInput.value);
    renderCards(json.data);
});

maxPriceInput.addEventListener('input', async () => {
    let res, json;
    if(maxPriceInput.value <= 0 || !maxPriceInput.value){
        res = await fetch(`/api/products`);
        json = await res.json();
    }else{
        res = await fetch(`/api/products?maxPrice=${maxPriceInput.value}`);
        json = await res.json();
    }
    renderCards(json.data);
})

minPriceInput.addEventListener('input', async () => {
    let res, json;
    if(minPriceInput.value <= 0 || !minPriceInput.value){
        res = await fetch(`/api/products`);
        json = await res.json();
    }else{
        res = await fetch(`/api/products?minPrice=${minPriceInput.value}`);
        json = await res.json();
    }
    renderCards(json.data);
})