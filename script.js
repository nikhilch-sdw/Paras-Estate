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
const PLOT_DATA = [
    {
        id: 'plot-200',
        sizeCategory: '200-sqyd',
        title: 'Executive Villa Plot',
        sqyd: '200 Sq. Yds.',
        sqft: '1,800 Sq. Ft.',
        dimensions: '30\' x 60\'',
        floorPermission: 'Stilt + 4 Floors Approved',
        facing: 'East / North-East Facing',
        registry: 'Individual Floor Registry',
        price: '₹ 1.25 Crore*',
        badge: 'Selling Fast',
        description: 'Ideal for bespoke low-rise floors or single-family executive homes with private stilt parking & terrace garden.'
    },
    {
        id: 'plot-225',
        sizeCategory: '225-sqyd',
        title: 'Premium Residency Plot',
        sqyd: '225 Sq. Yds.',
        sqft: '2,025 Sq. Ft.',
        dimensions: '33\' x 61.3\'',
        floorPermission: 'Stilt + 4 Floors Approved',
        facing: 'North / East Facing',
        registry: 'Individual Floor Registry',
        price: '₹ 1.45 Crore*',
        badge: 'Popular Choice',
        description: 'Versatile layout offering maximum floor space efficiency and high rental yield for multi-level luxury floors.'
    },
    {
        id: 'plot-250',
        sizeCategory: '250-sqyd',
        title: 'Luxury Parkview Plot',
        sqyd: '250 Sq. Yds.',
        sqft: '2,250 Sq. Ft.',
        dimensions: '35\' x 64.2\'',
        floorPermission: 'Stilt + 4 Floors Approved',
        facing: 'Overlooking Central Park',
        registry: 'Individual Floor Registry',
        price: '₹ 1.65 Crore*',
        badge: 'Park Facing',
        description: 'Prime location plot adjacent to central green trails and botanical gardens. Unobstructed views & serene surroundings.'
    },
    {
        id: 'plot-280',
        sizeCategory: '280-sqyd',
        title: 'Royal Ambassador Plot',
        sqyd: '280 Sq. Yds.',
        sqft: '2,520 Sq. Ft.',
        dimensions: '40\' x 63\'',
        floorPermission: 'Stilt + 4 Floors Approved',
        facing: 'Grand Boulevard Facing',
        registry: 'Individual Floor Registry',
        price: '₹ 1.88 Crore*',
        badge: 'Ultra Luxury',
        description: 'Flagship spacious plot designed for opulent mega residences or multi-tenant luxury apartment floors.'
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
                <div class="plot-card-body">
                    <h3 class="plot-title">${plot.title}</h3>
                    <p style="color: var(--text-secondary); font-size: 0.875rem;">${plot.description}</p>
                    
                    <ul class="plot-specs-list">
                        <li class="spec-item">
                            <span class="spec-label">Area Size</span>
                            <span class="spec-value">${plot.sqyd}</span>
                        </li>
                        <li class="spec-item">
                            <span class="spec-label">Built Up Area</span>
                            <span class="spec-value">${plot.sqft}</span>
                        </li>
                        <li class="spec-item">
                            <span class="spec-label">Dimensions</span>
                            <span class="spec-value">${plot.dimensions}</span>
                        </li>
                        <li class="spec-item">
                            <span class="spec-label">Permissions</span>
                            <span class="spec-value">${plot.floorPermission}</span>
                        </li>
                    </ul>
                    
                    <div class="plot-card-footer">
                        <div class="plot-price-tag">
                            <span class="price-label">Starting Price</span>
                            <span class="price-amount">${plot.price}</span>
                        </div>
                        <button class="btn btn-primary btn-sm" onclick="openEnquireModal('${plot.title} (${plot.sqyd})')">
                            <i class="bi bi-send"></i> Enquire Plot
                        </button>
                    </div>
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
   4. Gallery Lightbox
   ========================================================================== */
function initGalleryLightbox() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');

    if (!lightbox) return;

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            if (img) {
                lightboxImg.src = img.src;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    });

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
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
window.openEnquireModal = function(plotTitle = '') {
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

window.openBrochureModal = function() {
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
window.handleHeroFormSubmit = function(e) {
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

