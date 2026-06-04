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