/**
 * PARAS ESTATE - Premium Static Web Application
 * Client Interaction & Dynamic Component Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initPlotExplorer();
    initEMICalculator();
    initGalleryLightbox();
    initModalForms();
});

/* ==========================================================================
   1. Navigation & Header Handlers
   ========================================================================== */
function initNavigation() {
    const header = document.querySelector('.header');
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileDrawer = document.getElementById('mobileDrawer');
    const drawerOverlay = document.getElementById('drawerOverlay');
    const drawerClose = document.getElementById('drawerClose');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    // Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active Link Highlighting based on scroll position
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 120;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // Mobile Drawer Logic
    function toggleDrawer(open) {
        if (open) {
            mobileDrawer.classList.add('open');
            drawerOverlay.classList.add('open');
            document.body.style.overflow = 'hidden';
        } else {
            mobileDrawer.classList.remove('open');
            drawerOverlay.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    if (mobileToggle) mobileToggle.addEventListener('click', () => toggleDrawer(true));
    if (drawerClose) drawerClose.addEventListener('click', () => toggleDrawer(false));
    if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleDrawer(false));

    // Smooth Scroll Close Drawer
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElem = document.querySelector(targetId);
                if (targetElem) {
                    toggleDrawer(false);
                    targetElem.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/* ==========================================================================
   2. Interactive Plot Explorer
   ========================================================================== */
/* ==========================================================================
   2. Interactive Plot Explorer
   ========================================================================== */
const PLOT_DATA = [
    {
        id: 'plot-206',
        sizeCategory: '206-sqyd',
        title: 'Executive Villa Plot',
        sqyd: '206 Sq. Yds.',
        sqft: '1,854 Sq. Ft.',
        dimensions: '30\' x 61.8\'',
        floorPermission: 'Stilt + 4 Floors Approved',
        facing: 'East / North-East Facing',
        registry: 'Individual Floor Registry',
        price: '₹ 1.28 Crore*',
        badge: 'Selling Fast',
        description: 'Ideal for bespoke luxury low-rise floors or single-family executive homes with private stilt parking.'
    },
    {
        id: 'plot-249',
        sizeCategory: '249-sqyd',
        title: 'Premium Residency Plot',
        sqyd: '249 Sq. Yds.',
        sqft: '2,241 Sq. Ft.',
        dimensions: '35\' x 64.0\'',
        floorPermission: 'Stilt + 4 Floors Approved',
        facing: 'Central Park Facing',
        registry: 'Individual Floor Registry',
        price: '₹ 1.55 Crore*',
        badge: 'Most Popular',
        description: 'Spacious layout offering maximum floor space efficiency and high rental yield for multi-level luxury floors.'
    },
    {
        id: 'plot-272',
        sizeCategory: '272-sqyd',
        title: 'Royal Ambassador Plot',
        sqyd: '272 Sq. Yds.',
        sqft: '2,448 Sq. Ft.',
        dimensions: '40\' x 61.2\'',
        floorPermission: 'Stilt + 4 Floors Approved',
        facing: 'Grand Boulevard Facing',
        registry: 'Individual Floor Registry',
        price: '₹ 1.78 Crore*',
        badge: 'Ultra Luxury',
        description: 'Flagship wide-frontage plot designed for opulent mega residences or multi-tenant luxury apartment floors.'
    }
];

function initPlotExplorer() {
    const plotGrid = document.getElementById('plotGrid');
    const filterBtns = document.querySelectorAll('.plot-filter-tabs .filter-btn');

    if (!plotGrid) return;

    function renderPlots(filter = 'all') {
        plotGrid.innerHTML = '';

        const filtered = filter === 'all'
            ? PLOT_DATA
            : PLOT_DATA.filter(p => p.sizeCategory === filter);

        filtered.forEach(plot => {
            const card = document.createElement('div');
            card.className = 'plot-card';
            card.innerHTML = `
                <span class="plot-badge">${plot.badge}</span>
                <div>
                    <div class="plot-card-header">
                        <h3 class="plot-title">${plot.title}</h3>
                        <p class="plot-desc">${plot.description}</p>
                    </div>

                    <div class="plot-specs-grid">
                        <div class="spec-block">
                            <span class="spec-label">Area Size</span>
                            <span class="spec-value">${plot.sqyd}</span>
                        </div>
                        <div class="spec-block">
                            <span class="spec-label">Built Up Area</span>
                            <span class="spec-value">${plot.sqft}</span>
                        </div>
                        <div class="spec-block">
                            <span class="spec-label">Dimensions</span>
                            <span class="spec-value">${plot.dimensions}</span>
                        </div>
                        <div class="spec-block">
                            <span class="spec-label">Permissions</span>
                            <span class="spec-value">Stilt + 4 Floors</span>
                        </div>
                    </div>
                </div>

                <div class="plot-card-footer">
                    <div>
                        <span class="price-label">Starting Price</span>
                        <div class="price-amount">${plot.price}</div>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="openEnquireModal('${plot.title} (${plot.sqyd})')">
                        <i class="bi bi-send-fill"></i> Enquire Plot
                    </button>
                </div>
            `;
            plotGrid.appendChild(card);
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const category = btn.getAttribute('data-filter');
            renderPlots(category);
        });
    });

    renderPlots('all');
}

/* ==========================================================================
   3. Interactive EMI & Investment Calculator
   ========================================================================== */
function initEMICalculator() {
    const priceSlider = document.getElementById('calcPrice');
    const downSlider = document.getElementById('calcDownPayment');
    const tenureSlider = document.getElementById('calcTenure');
    const rateSlider = document.getElementById('calcRate');

    const priceVal = document.getElementById('calcPriceVal');
    const downVal = document.getElementById('calcDownPaymentVal');
    const tenureVal = document.getElementById('calcTenureVal');
    const rateVal = document.getElementById('calcRateVal');

    const resEMI = document.getElementById('resEMI');
    const resPrincipal = document.getElementById('resPrincipal');
    const resInterest = document.getElementById('resInterest');
    const resROI = document.getElementById('resROI');

    const barPrincipal = document.getElementById('barPrincipal');
    const barInterest = document.getElementById('barInterest');

    if (!priceSlider) return;

    function formatINR(val) {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(val);
    }

    function calculate() {
        const plotPrice = parseFloat(priceSlider.value) * 100000; // In Lakhs to INR
        const downPercent = parseFloat(downSlider.value);
        const tenureYears = parseInt(tenureSlider.value);
        const annualRate = parseFloat(rateSlider.value);

        const downPayment = plotPrice * (downPercent / 100);
        const loanPrincipal = plotPrice - downPayment;

        const r = annualRate / 12 / 100;
        const n = tenureYears * 12;

        // EMI Formula: [P x R x (1+R)^N]/[(1+R)^N-1]
        let emi = 0;
        if (r > 0) {
            emi = (loanPrincipal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        } else {
            emi = loanPrincipal / n;
        }

        const totalPayment = emi * n;
        const totalInterest = Math.max(0, totalPayment - loanPrincipal);

        // 5-Year Estimated Value Appreciation (Assuming 12% p.a. CAGR for Gurugram Plotted Real Estate)
        const estimated5YrVal = plotPrice * Math.pow(1.12, 5);

        // Update Labels
        priceVal.textContent = `₹ ${(plotPrice / 100000).toFixed(1)} Lakhs`;
        downVal.textContent = `${downPercent}% (${formatINR(downPayment)})`;
        tenureVal.textContent = `${tenureYears} Years`;
        rateVal.textContent = `${annualRate}% p.a.`;

        // Update Result Displays
        resEMI.textContent = formatINR(Math.round(emi));
        resPrincipal.textContent = formatINR(Math.round(loanPrincipal));
        resInterest.textContent = formatINR(Math.round(totalInterest));
        resROI.textContent = formatINR(Math.round(estimated5YrVal));

        // Update Progress Bar
        const total = loanPrincipal + totalInterest;
        const principalPct = (loanPrincipal / total) * 100;
        const interestPct = (totalInterest / total) * 100;

        if (barPrincipal) barPrincipal.style.width = `${principalPct}%`;
        if (barInterest) barInterest.style.width = `${interestPct}%`;
    }

    [priceSlider, downSlider, tenureSlider, rateSlider].forEach(slider => {
        slider.addEventListener('input', calculate);
    });

    calculate();
}

/* ==========================================================================
   4. Gallery Grid & Interactive Carousel Switcher
   ========================================================================== */
function initGalleryLightbox() {
    const galleryGrid = document.getElementById('galleryGrid');
    const galleryGridFooter = document.getElementById('galleryGridFooter');
    const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
    const filterBtns = document.querySelectorAll('.gallery-filter-tabs .filter-btn');
    const btnToggleGallery = document.getElementById('btnToggleGallery');
    const galleryHiddenCount = document.getElementById('galleryHiddenCount');

    // Inline Carousel DOM elements
    const carouselView = document.getElementById('galleryCarouselView');
    const btnBackToGrid = document.getElementById('btnBackToGrid');
    const inlineImg = document.getElementById('inlineCarouselImg');
    const inlineTitle = document.getElementById('inlineCarouselTitle');
    const inlineCategory = document.getElementById('inlineCarouselCategory');
    const inlineCounter = document.getElementById('inlineCarouselCounter');
    const inlinePrev = document.getElementById('inlinePrev');
    const inlineNext = document.getElementById('inlineNext');
    const inlineThumbsTrack = document.getElementById('inlineThumbsTrack');
    const inlinePlayPause = document.getElementById('inlinePlayPause');
    const inlineZoomIn = document.getElementById('inlineZoomIn');
    const inlineZoomOut = document.getElementById('inlineZoomOut');
    const inlineZoomReset = document.getElementById('inlineZoomReset');

    let currentIndex = 0;
    let isExpanded = false;
    let activeFilter = 'all';
    let isAutoPlaying = false;
    let autoPlayTimer = null;
    let inlineScale = 1.0;

    if (!galleryItems.length) return;

    // Filter Tabs handler
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            activeFilter = btn.getAttribute('data-gallery-filter');
            applyFilter();
            if (carouselView && carouselView.style.display !== 'none') {
                currentIndex = 0;
                updateCarouselView();
            }
        });
    });

    function applyFilter() {
        let visibleCount = 0;

        galleryItems.forEach((item) => {
            const itemCat = item.getAttribute('data-category');
            const matches = activeFilter === 'all' || itemCat === activeFilter;

            if (matches) {
                if (isExpanded || visibleCount < 6) {
                    item.style.display = 'block';
                    item.classList.remove('gallery-hidden');
                } else {
                    item.style.display = 'none';
                    item.classList.add('gallery-hidden');
                }
                visibleCount++;
            } else {
                item.style.display = 'none';
            }
        });

        if (btnToggleGallery) {
            const hiddenItems = galleryItems.filter(item => {
                const itemCat = item.getAttribute('data-category');
                const matches = activeFilter === 'all' || itemCat === activeFilter;
                return matches && item.classList.contains('gallery-hidden');
            });

            if (hiddenItems.length > 0) {
                if (galleryGridFooter) galleryGridFooter.style.display = 'block';
                btnToggleGallery.style.display = 'inline-flex';
                if (galleryHiddenCount) galleryHiddenCount.textContent = hiddenItems.length;
                btnToggleGallery.innerHTML = `<i class="bi bi-grid-3x3-gap-fill"></i> View All Photos (${hiddenItems.length} More)`;
            } else if (isExpanded && activeFilter === 'all') {
                if (galleryGridFooter) galleryGridFooter.style.display = 'block';
                btnToggleGallery.style.display = 'inline-flex';
                btnToggleGallery.innerHTML = `<i class="bi bi-chevron-up"></i> Show Less`;
            } else {
                if (hiddenItems.length === 0 && !isExpanded) {
                    if (galleryGridFooter) galleryGridFooter.style.display = 'none';
                }
            }
        }
    }

    if (btnToggleGallery) {
        btnToggleGallery.addEventListener('click', () => {
            isExpanded = !isExpanded;
            applyFilter();
        });
    }

    function getActiveItems() {
        return galleryItems.filter(item => {
            const itemCat = item.getAttribute('data-category');
            return activeFilter === 'all' || itemCat === activeFilter;
        });
    }

    // Switch from Grid to Carousel View
    function switchToCarousel(indexInActive) {
        const activeList = getActiveItems();
        if (indexInActive < 0 || indexInActive >= activeList.length) return;

        currentIndex = indexInActive;

        if (galleryGrid) galleryGrid.style.display = 'none';
        if (galleryGridFooter) galleryGridFooter.style.display = 'none';
        if (carouselView) {
            carouselView.style.display = 'block';
            carouselView.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }

        updateCarouselView();
    }

    // Switch Back to Grid View
    function switchToGrid() {
        stopAutoPlay();
        if (carouselView) carouselView.style.display = 'none';
        if (galleryGrid) galleryGrid.style.display = 'grid';
        applyFilter();
    }

    if (btnBackToGrid) {
        btnBackToGrid.addEventListener('click', switchToGrid);
    }

    function updateCarouselView() {
        const activeList = getActiveItems();
        if (!activeList.length) return;

        resetInlineZoom();

        const activeItem = activeList[currentIndex];
        const img = activeItem.querySelector('img');
        const caption = activeItem.querySelector('.gallery-caption')?.textContent || 'Gallery Photo';
        const tag = activeItem.querySelector('.gallery-tag')?.textContent || 'Paras Estate';

        if (inlineImg) {
            inlineImg.style.opacity = '0';
            setTimeout(() => {
                inlineImg.src = img.src;
                inlineImg.alt = caption;
                inlineImg.style.opacity = '1';
            }, 150);
        }

        if (inlineTitle) inlineTitle.textContent = caption;
        if (inlineCategory) inlineCategory.textContent = tag;
        if (inlineCounter) inlineCounter.textContent = `${currentIndex + 1} / ${activeList.length}`;

        renderCarouselThumbs(activeList);
    }

    function renderCarouselThumbs(activeList) {
        if (!inlineThumbsTrack) return;
        inlineThumbsTrack.innerHTML = '';

        activeList.forEach((item, idx) => {
            const img = item.querySelector('img');
            const thumb = document.createElement('div');
            thumb.className = `lightbox-thumb ${idx === currentIndex ? 'active' : ''}`;
            thumb.innerHTML = `<img src="${img.src}" alt="Thumb ${idx + 1}">`;
            thumb.addEventListener('click', () => {
                currentIndex = idx;
                updateCarouselView();
            });
            inlineThumbsTrack.appendChild(thumb);
        });

        const activeThumb = inlineThumbsTrack.children[currentIndex];
        if (activeThumb) {
            activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }

    function carouselPrev() {
        const activeList = getActiveItems();
        if (!activeList.length) return;
        currentIndex = (currentIndex - 1 + activeList.length) % activeList.length;
        updateCarouselView();
    }

    function carouselNext() {
        const activeList = getActiveItems();
        if (!activeList.length) return;
        currentIndex = (currentIndex + 1) % activeList.length;
        updateCarouselView();
    }

    if (inlinePrev) inlinePrev.addEventListener('click', carouselPrev);
    if (inlineNext) inlineNext.addEventListener('click', carouselNext);

    // Auto Play Slideshow
    function toggleAutoPlay() {
        if (isAutoPlaying) {
            stopAutoPlay();
        } else {
            startAutoPlay();
        }
    }

    function startAutoPlay() {
        isAutoPlaying = true;
        if (inlinePlayPause) inlinePlayPause.innerHTML = '<i class="bi bi-pause-fill"></i>';
        autoPlayTimer = setInterval(carouselNext, 3000);
    }

    function stopAutoPlay() {
        isAutoPlaying = false;
        if (inlinePlayPause) inlinePlayPause.innerHTML = '<i class="bi bi-play-fill"></i>';
        if (autoPlayTimer) clearInterval(autoPlayTimer);
    }

    if (inlinePlayPause) inlinePlayPause.addEventListener('click', toggleAutoPlay);

    // Zoom Controls
    function applyInlineZoom() {
        if (inlineImg) inlineImg.style.transform = `scale(${inlineScale})`;
    }

    function resetInlineZoom() {
        inlineScale = 1.0;
        applyInlineZoom();
    }

    if (inlineZoomIn) inlineZoomIn.addEventListener('click', () => { if (inlineScale < 2.5) { inlineScale += 0.25; applyInlineZoom(); } });
    if (inlineZoomOut) inlineZoomOut.addEventListener('click', () => { if (inlineScale > 0.6) { inlineScale -= 0.25; applyInlineZoom(); } });
    if (inlineZoomReset) inlineZoomReset.addEventListener('click', resetInlineZoom);

    // Click on any Grid Item switches to Carousel View focused on that item!
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const activeList = getActiveItems();
            const idxInActive = activeList.indexOf(item);
            if (idxInActive !== -1) {
                switchToCarousel(idxInActive);
            }
        });
    });

    // Keyboard support for Carousel View
    document.addEventListener('keydown', (e) => {
        if (!carouselView || carouselView.style.display === 'none') return;
        if (e.key === 'ArrowLeft') carouselPrev();
        if (e.key === 'ArrowRight') carouselNext();
        if (e.key === 'Escape') switchToGrid();
    });

    // Initial Filter setup
    applyFilter();
}

/* ==========================================================================
   5. Modals & Forms Logic
   ========================================================================== */
function initModalForms() {
    const enquireModal = document.getElementById('enquireModal');
    const brochureModal = document.getElementById('brochureModal');
    const modalCloseBtns = document.querySelectorAll('.modal-close-btn');

    modalCloseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            enquireModal.classList.remove('active');
            brochureModal.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    [enquireModal, brochureModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        }
    });

    // Form Submissions
    const enquireForm = document.getElementById('enquireForm');
    const brochureForm = document.getElementById('brochureForm');

    if (enquireForm) {
        enquireForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = enquireForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Processing...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showToast('Thank you! Your Paras Estate inquiry has been received. Our luxury real estate advisor will call you shortly.');
                enquireForm.reset();
                submitBtn.innerHTML = '<i class="bi bi-check-circle"></i> Request Confirmed';
                submitBtn.disabled = false;
                setTimeout(() => {
                    enquireModal.classList.remove('active');
                    document.body.style.overflow = '';
                }, 1200);
            }, 1000);
        });
    }

    if (brochureForm) {
        brochureForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = brochureForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="bi bi-cloud-arrow-down"></i> Generating PDF...';
            submitBtn.disabled = true;

            setTimeout(() => {
                showToast('Brochure request successful! Downloading Paras Estate official e-brochure.');
                brochureForm.reset();
                submitBtn.innerHTML = '<i class="bi bi-download"></i> Download Started';
                submitBtn.disabled = false;

                // Simulate PDF download
                const link = document.createElement('a');
                link.href = 'assets/images/hero.jpg'; // Sample download preview
                link.download = 'Paras_Estate_Official_EBrochure.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                setTimeout(() => {
                    brochureModal.classList.remove('active');
                    document.body.style.overflow = '';
                }, 1500);
            }, 1200);
        });
    }
}

// Global modal helpers
window.openEnquireModal = function (plotTitle = '') {
    const enquireModal = document.getElementById('enquireModal');
    const modalTitle = document.getElementById('enquireModalPlotName');
    if (plotTitle && modalTitle) {
        modalTitle.textContent = `Enquiry for: ${plotTitle}`;
    }
    if (enquireModal) {
        enquireModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

window.openBrochureModal = function () {
    const brochureModal = document.getElementById('brochureModal');
    if (brochureModal) {
        brochureModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
};

// Toast notification helper
function showToast(message, duration = 4000) {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<i class="bi bi-check-circle-fill" style="color: var(--primary-gold); font-size: 1.2rem;"></i> <span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('show');
    }, 100);

    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

// Hero Banner Form Submission Handler
window.handleHeroFormSubmit = function (e) {
    e.preventDefault();
    const nameInput = document.getElementById('heroName');
    const phoneInput = document.getElementById('heroPhone');
    const addressInput = document.getElementById('heroAddress');

    const name = nameInput ? nameInput.value.trim() : 'Valued Client';
    const phone = phoneInput ? phoneInput.value.trim() : '';

    const submitBtn = e.target.querySelector('button[type="submit"]');
    if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="bi bi-hourglass-split"></i> Submitting...';
    }

    setTimeout(() => {
        showToast(`Thank you, ${name}! Your enquiry has been received. Our sales team will call you at ${phone}.`);
        if (e.target) e.target.reset();
        if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i> Enquiry Submitted!';
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="bi bi-send-fill"></i> Get Instant Callback';
            }, 3000);
        }
    }, 1000);
};

