// Product quick-view modal
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

    const openModal = (card) => {
        const d = card.dataset;
        img.src = '/images/products/' + d.image;
        img.alt = d.name;
        title.textContent = d.name;
        category.textContent = d.category;
        price.textContent = '$' + d.price;
        description.textContent = d.description;
        link.href = '/products/' + d.id;
        modal.hidden = false;
        document.body.style.overflow = 'hidden';  // stop background scroll
        closeBtn.focus();
    };

    const closeModal = () => {
        modal.hidden = true;
        document.body.style.overflow = '';
    };

    // One listener handles every card (event delegation)
    document.getElementById('allCards')?.addEventListener('click', (e) => {
        const card = e.target.closest('.productCard');
        if (card) openModal(card);
    });

    // Three ways to go back: button, backdrop click, Escape
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.hidden) closeModal();
    });
});