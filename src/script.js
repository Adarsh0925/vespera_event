/**
 * Vespera Events - Vanilla JavaScript (Phase 2)
 * Event Exploration, Dynamic Generation, Multi-factor Search, Category Filtering,
 * Sorting, Dedicated Event Details View, and Route Navigation.
 */

import { NEPAL_EVENTS } from './events-data.js';
import QRCode from 'qrcode';

(function () {
  'use strict';

  // Application State
  const state = {
    currentView: 'home', // 'home' | 'explore' | 'details'
    selectedEventId: null,
    searchQuery: '',
    selectedCategory: 'All Events',
    selectedSort: 'upcoming'
  };

  // DOM Elements - Shell & Views
  const header = document.getElementById('header');
  const heroSection = document.getElementById('home');
  const heroBgImg = document.getElementById('heroBgImg');
  const homeView = document.getElementById('homeView');
  const exploreView = document.getElementById('exploreView');
  const detailsView = document.getElementById('detailsView');
  const registrationView = document.getElementById('registrationView');
  const confirmationView = document.getElementById('confirmationView');
  const myRegistrationsView = document.getElementById('myRegistrationsView');

  // DOM Elements - Navigation
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const navLinkHome = document.getElementById('navLinkHome');
  const navLinkEvents = document.getElementById('navLinkEvents');
  const navLinkRegistrations = document.getElementById('navLinkRegistrations');
  const navLinkAbout = document.getElementById('navLinkAbout');
  const navLinkContact = document.getElementById('navLinkContact');
  const mobileLinkHome = document.getElementById('mobileLinkHome');
  const mobileLinkEvents = document.getElementById('mobileLinkEvents');
  const mobileLinkRegistrations = document.getElementById('mobileLinkRegistrations');
  const mobileLinkAbout = document.getElementById('mobileLinkAbout');
  const mobileLinkContact = document.getElementById('mobileLinkContact');
  const navRegistrationsCount = document.getElementById('navRegistrationsCount');
  const mobileRegistrationsCount = document.getElementById('mobileRegistrationsCount');

  // DOM Elements - Search Inputs
  const navSearchInput = document.getElementById('navSearchInput');
  const navSearchClear = document.getElementById('navSearchClear');
  const mobileSearchInput = document.getElementById('mobileSearchInput');
  const mobileSearchClear = document.getElementById('mobileSearchClear');
  const exploreSearchInput = document.getElementById('exploreSearchInput');
  const exploreSearchClear = document.getElementById('exploreSearchClear');

  // DOM Elements - Explore Controls
  const eventSortSelect = document.getElementById('eventSortSelect');
  const categoryFiltersList = document.getElementById('categoryFiltersList');
  const exploreStatusBarText = document.getElementById('exploreStatusBarText');
  const exploreResultCount = document.getElementById('exploreResultCount');
  const exploreResetAllBtn = document.getElementById('exploreResetAllBtn');
  const exploreEventsGrid = document.getElementById('exploreEventsGrid');
  const exploreEmptyState = document.getElementById('exploreEmptyState');
  const exploreEmptyDesc = document.getElementById('exploreEmptyDesc');
  const exploreEmptyResetBtn = document.getElementById('exploreEmptyResetBtn');

  // DOM Elements - Home Grid
  const homeEventsGrid = document.getElementById('homeEventsGrid');

  // DOM Elements - Details View
  const btnBackToEvents = document.getElementById('btnBackToEvents');
  const detailHeroImg = document.getElementById('detailHeroImg');
  const detailCategory = document.getElementById('detailCategory');
  const detailDate = document.getElementById('detailDate');
  const detailLocationTag = document.getElementById('detailLocationTag');
  const detailMainTitle = document.getElementById('detailMainTitle');
  const detailDetailedDesc = document.getElementById('detailDetailedDesc');
  const detailHighlightsList = document.getElementById('detailHighlightsList');
  const detailSidebarDate = document.getElementById('detailSidebarDate');
  const detailSidebarTime = document.getElementById('detailSidebarTime');
  const detailSidebarVenue = document.getElementById('detailSidebarVenue');
  const detailOrganizerName = document.getElementById('detailOrganizerName');
  const detailOrganizerRole = document.getElementById('detailOrganizerRole');
  const detailOrganizerEmail = document.getElementById('detailOrganizerEmail');
  const detailOrganizerContact = document.getElementById('detailOrganizerContact');
  const btnOpenInMaps = document.getElementById('btnOpenInMaps');
  const btnRegisterNow = document.getElementById('btnRegisterNow');

  // DOM Elements - Phase 3 Registration
  const btnBackFromReg = document.getElementById('btnBackFromReg');
  const btnBackFromRegLabel = document.getElementById('btnBackFromRegLabel');
  const eventRegistrationForm = document.getElementById('eventRegistrationForm');
  const formGlobalAlert = document.getElementById('formGlobalAlert');
  const formGlobalAlertMsg = document.getElementById('formGlobalAlertMsg');
  const regEventSelect = document.getElementById('regEventSelect');
  const regFullName = document.getElementById('regFullName');
  const regEmail = document.getElementById('regEmail');
  const regPhone = document.getElementById('regPhone');
  const regGender = document.getElementById('regGender');
  const regParticipants = document.getElementById('regParticipants');
  const btnSubmitRegistration = document.getElementById('btnSubmitRegistration');

  // Preview Card Elements
  const regPreviewImg = document.getElementById('regPreviewImg');
  const regPreviewCategory = document.getElementById('regPreviewCategory');
  const regPreviewTitle = document.getElementById('regPreviewTitle');
  const regPreviewDesc = document.getElementById('regPreviewDesc');
  const regPreviewDateTime = document.getElementById('regPreviewDateTime');
  const regPreviewVenue = document.getElementById('regPreviewVenue');
  const regPreviewContact = document.getElementById('regPreviewContact');
  const regPreviewAttendees = document.getElementById('regPreviewAttendees');

  // DOM Elements - Phase 3 Confirmation Pass
  const confRegId = document.getElementById('confRegId');
  const btnCopyRegId = document.getElementById('btnCopyRegId');
  const copyTooltip = document.getElementById('copyTooltip');
  const confEventCategory = document.getElementById('confEventCategory');
  const confEventName = document.getElementById('confEventName');
  const confEventVenue = document.getElementById('confEventVenue');
  const confAttendeeName = document.getElementById('confAttendeeName');
  const confEventDateTime = document.getElementById('confEventDateTime');
  const confContact = document.getElementById('confContact');
  const confParticipantsCount = document.getElementById('confParticipantsCount');
  const confGender = document.getElementById('confGender');
  const confTimestamp = document.getElementById('confTimestamp');
  const btnPrintTicket = document.getElementById('btnPrintTicket');

  // DOM Elements - Phase 3 My Registrations
  const myRegListContainer = document.getElementById('myRegListContainer');
  const myRegEmptyState = document.getElementById('myRegEmptyState');

  // Motion & Scroll State
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isScrollTicking = false;

  /* ==========================================================================
     1. Sticky Header & Parallax Scroll Effect
     ========================================================================== */
  function handleHeaderScroll() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  function updateHeroParallax() {
    if (!heroBgImg || !heroSection || prefersReducedMotion.matches || state.currentView !== 'home') {
      isScrollTicking = false;
      return;
    }

    const scrollY = window.scrollY || window.pageYOffset;
    const heroHeight = heroSection.offsetHeight;

    if (scrollY <= heroHeight + 100) {
      const parallaxFactor = 0.32;
      const translateY = scrollY * parallaxFactor;
      heroBgImg.style.transform = `scale(1.14) translate3d(0, ${translateY.toFixed(2)}px, 0)`;
    }

    isScrollTicking = false;
  }

  function onWindowScroll() {
    handleHeaderScroll();

    if (!isScrollTicking) {
      window.requestAnimationFrame(updateHeroParallax);
      isScrollTicking = true;
    }
  }

  window.addEventListener('scroll', onWindowScroll, { passive: true });
  handleHeaderScroll();
  updateHeroParallax();

  /* ==========================================================================
     2. Mobile Hamburger Drawer
     ========================================================================== */
  function toggleMobileMenu() {
    if (!mobileToggle || !mobileDrawer) return;
    const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
    const nextState = !isExpanded;

    mobileToggle.setAttribute('aria-expanded', String(nextState));
    mobileDrawer.classList.toggle('active', nextState);
    document.body.classList.toggle('menu-open', nextState);
  }

  function closeMobileMenu() {
    if (!mobileToggle || !mobileDrawer) return;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('active');
    document.body.classList.remove('menu-open');
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', toggleMobileMenu);
  }

  /* ==========================================================================
     3. Event Card HTML Builder
     ========================================================================== */
  function createEventCardMarkup(event) {
    return `
      <article class="event-card" data-event-id="${event.id}">
        <div class="event-media-wrap">
          <img
            src="${event.image}"
            alt="${event.title}"
            class="event-image"
            loading="lazy"
            onerror="this.onerror=null;this.src='/images/event-tech.svg';"
          />
          <div class="event-image-scrim"></div>
        </div>

        <div class="event-body">
          <div class="meta-unboxed event-meta-top">
            <span class="meta-category">${event.category}</span>
            <span class="meta-separator" aria-hidden="true">·</span>
            <time datetime="${event.isoDate}">${event.date}</time>
            <span class="card-location-meta">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <span>${event.location}</span>
            </span>
          </div>

          <h3 class="event-title">${event.title}</h3>

          <p class="event-description">${event.shortDescription}</p>

          <div class="event-venue-info">
            <svg class="venue-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span class="event-venue-text" title="${event.venue}">
              <strong>${event.time}</strong> · ${event.venue}
            </span>
          </div>

          <div class="event-actions">
            <button
              type="button"
              class="btn-card-details"
              data-event-id="${event.id}"
              aria-label="View details for ${event.title}"
            >
              <span>View Details</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>
      </article>
    `;
  }

  /* ==========================================================================
     4. Render Functions (Home & Explore Grids)
     ========================================================================== */
  function renderHomeEvents() {
    if (!homeEventsGrid) return;
    const featuredEvents = NEPAL_EVENTS.filter((e) => e.featured).slice(0, 4);
    homeEventsGrid.innerHTML = featuredEvents.map(createEventCardMarkup).join('');
    bindCardDetailButtons(homeEventsGrid);
  }

  function getFilteredAndSortedEvents() {
    let result = [...NEPAL_EVENTS];

    // 1. Category Filter
    if (state.selectedCategory && state.selectedCategory !== 'All Events') {
      result = result.filter(
        (event) => event.category.toLowerCase() === state.selectedCategory.toLowerCase()
      );
    }

    // 2. Search Query (Name, Venue, Location, Category)
    const query = state.searchQuery.trim().toLowerCase();
    if (query) {
      result = result.filter((event) => {
        const titleMatch = event.title.toLowerCase().includes(query);
        const venueMatch = event.venue.toLowerCase().includes(query);
        const locationMatch = event.location.toLowerCase().includes(query);
        const categoryMatch = event.category.toLowerCase().includes(query);
        const descMatch = event.shortDescription.toLowerCase().includes(query);
        return titleMatch || venueMatch || locationMatch || categoryMatch || descMatch;
      });
    }

    // 3. Sorting (Upcoming First, Latest First, Event Name A-Z)
    if (state.selectedSort === 'upcoming') {
      result.sort((a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime());
    } else if (state.selectedSort === 'latest') {
      result.sort((a, b) => new Date(b.isoDate).getTime() - new Date(a.isoDate).getTime());
    } else if (state.selectedSort === 'name-asc') {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }

  function renderExploreEvents() {
    if (!exploreEventsGrid) return;

    const filtered = getFilteredAndSortedEvents();
    const count = filtered.length;

    // Update Status Bar
    if (exploreResultCount) {
      exploreResultCount.textContent = String(count);
    }

    const hasActiveFilters =
      state.searchQuery.trim().length > 0 || state.selectedCategory !== 'All Events';

    if (exploreResetAllBtn) {
      exploreResetAllBtn.style.display = hasActiveFilters ? 'inline-block' : 'none';
    }

    // Render cards or empty state
    if (count === 0) {
      exploreEventsGrid.innerHTML = '';
      if (exploreEmptyState) {
        exploreEmptyState.style.display = 'block';
        if (exploreEmptyDesc) {
          const queryPart = state.searchQuery ? ` matching "${state.searchQuery}"` : '';
          const catPart =
            state.selectedCategory !== 'All Events' ? ` in ${state.selectedCategory}` : '';
          exploreEmptyDesc.textContent = `No events found${queryPart}${catPart}. Try clearing your filters or selecting a different category.`;
        }
      }
    } else {
      if (exploreEmptyState) {
        exploreEmptyState.style.display = 'none';
      }
      exploreEventsGrid.innerHTML = filtered.map(createEventCardMarkup).join('');
      bindCardDetailButtons(exploreEventsGrid);
    }
  }

  function bindCardDetailButtons(container) {
    if (!container) return;
    const buttons = container.querySelectorAll('.btn-card-details');
    buttons.forEach((btn) => {
      btn.addEventListener('click', function () {
        const eventId = this.getAttribute('data-event-id');
        if (eventId) {
          window.location.hash = `#/event/${eventId}`;
        }
      });
    });
  }

  /* ==========================================================================
     5. Dedicated Event Details View Renderer
     ========================================================================== */
  function renderEventDetails(eventId) {
    const event = NEPAL_EVENTS.find((e) => e.id === eventId);
    if (!event) {
      // Event not found, fallback to explore page
      window.location.hash = '#/events';
      return;
    }

    state.selectedEventId = eventId;

    if (detailHeroImg) {
      detailHeroImg.src = event.image;
      detailHeroImg.alt = event.title;
      detailHeroImg.onerror = function () {
        this.onerror = null;
        this.src = '/images/event-tech.svg';
      };
    }
    if (detailCategory) detailCategory.textContent = event.category;
    if (detailDate) detailDate.textContent = event.date;
    if (detailLocationTag) detailLocationTag.textContent = event.location;
    if (detailMainTitle) detailMainTitle.textContent = event.title;
    if (detailDetailedDesc) detailDetailedDesc.textContent = event.detailedDescription;

    if (detailHighlightsList) {
      detailHighlightsList.innerHTML = event.highlights
        .map(
          (item) => `
          <li class="details-highlight-item">
            <svg class="highlight-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="20 6 9 17 4 12" />
            </svg>
            <span>${item}</span>
          </li>
        `
        )
        .join('');
    }

    if (detailSidebarDate) detailSidebarDate.textContent = event.date;
    if (detailSidebarTime) detailSidebarTime.textContent = event.time;
    if (detailSidebarVenue) detailSidebarVenue.textContent = `${event.venue}, ${event.location}`;

    if (btnOpenInMaps) {
      const destinationQuery = `${event.venue}, ${event.location}, Nepal`;
      btnOpenInMaps.href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destinationQuery)}`;
      btnOpenInMaps.setAttribute('title', `Open directions to ${event.venue} (${event.location}) on Google Maps`);
    }

    if (detailOrganizerName) detailOrganizerName.textContent = event.organizer.name;
    if (detailOrganizerRole) detailOrganizerRole.textContent = event.organizer.role;
    if (detailOrganizerEmail) detailOrganizerEmail.textContent = event.organizer.email;
    if (detailOrganizerContact) detailOrganizerContact.textContent = event.organizer.contact;

    // Start Live Event Countdown Timer (Phase 4)
    startEventCountdown(event);
  }

  /* ==========================================================================
     6. Registration Notice (Phase 3 Placeholder Notification)
     ========================================================================== */
  function showRegistrationNotice(eventTitle) {
    // Remove any existing toast
    const existing = document.getElementById('phase3Toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'phase3Toast';
    toast.className = 'phase-toast';
    toast.setAttribute('role', 'alert');
    toast.innerHTML = `
      <svg class="toast-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <div>
        <strong>Registration Notice</strong>
        <p style="margin: 0; font-size: 0.84rem; opacity: 0.9;">Registration for "${eventTitle}" will open in Phase 3. Stay tuned!</p>
      </div>
    `;

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.classList.add('fade-out');
      setTimeout(() => toast.remove(), 320);
    }, 4500);
  }

  if (btnRegisterNow) {
    btnRegisterNow.addEventListener('click', () => {
      if (state.selectedEventId) {
        window.location.hash = `#/register/${state.selectedEventId}`;
      } else {
        window.location.hash = '#/register';
      }
    });
  }

  /* ==========================================================================
     7. Multi-factor Search, Filter & Sort Event Handlers
     ========================================================================== */
  function syncSearchInputs(value) {
    state.searchQuery = value;

    if (navSearchInput && navSearchInput.value !== value) navSearchInput.value = value;
    if (mobileSearchInput && mobileSearchInput.value !== value) mobileSearchInput.value = value;
    if (exploreSearchInput && exploreSearchInput.value !== value) exploreSearchInput.value = value;

    const hasValue = value.trim().length > 0;
    if (navSearchClear) navSearchClear.classList.toggle('visible', hasValue);
    if (mobileSearchClear) mobileSearchClear.classList.toggle('visible', hasValue);
    if (exploreSearchClear) exploreSearchClear.classList.toggle('visible', hasValue);

    renderExploreEvents();
  }

  function handleSearchInputEvent(e) {
    const val = e.target.value;
    syncSearchInputs(val);

    // If typing from header search while on home or details view, transition to explore view
    if (
      (e.target === navSearchInput || e.target === mobileSearchInput) &&
      state.currentView !== 'explore' &&
      val.trim().length > 0
    ) {
      window.location.hash = '#/events';
    }
  }

  function clearAllSearch() {
    syncSearchInputs('');
    if (exploreSearchInput) exploreSearchInput.focus();
  }

  // Bind Search Inputs
  [navSearchInput, mobileSearchInput, exploreSearchInput].forEach((input) => {
    if (input) {
      input.addEventListener('input', handleSearchInputEvent);
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (state.currentView !== 'explore') {
            window.location.hash = '#/events';
          }
          closeMobileMenu();
        } else if (e.key === 'Escape') {
          clearAllSearch();
        }
      });
    }
  });

  // Bind Search Clear Buttons
  if (navSearchClear) navSearchClear.addEventListener('click', clearAllSearch);
  if (mobileSearchClear) mobileSearchClear.addEventListener('click', clearAllSearch);
  if (exploreSearchClear) exploreSearchClear.addEventListener('click', clearAllSearch);

  // Category Filtering
  if (categoryFiltersList) {
    const categoryButtons = categoryFiltersList.querySelectorAll('.category-btn');
    categoryButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        categoryButtons.forEach((b) => {
          b.classList.remove('active');
          b.setAttribute('aria-selected', 'false');
        });

        this.classList.add('active');
        this.setAttribute('aria-selected', 'true');

        state.selectedCategory = this.getAttribute('data-category') || 'All Events';
        renderExploreEvents();
      });
    });
  }

  function selectCategory(categoryName) {
    state.selectedCategory = categoryName;
    if (categoryFiltersList) {
      const categoryButtons = categoryFiltersList.querySelectorAll('.category-btn');
      categoryButtons.forEach((btn) => {
        const cat = btn.getAttribute('data-category');
        const isMatch = cat === categoryName;
        btn.classList.toggle('active', isMatch);
        btn.setAttribute('aria-selected', String(isMatch));
      });
    }
    renderExploreEvents();
  }

  // Bind Sorting Dropdown
  if (eventSortSelect) {
    eventSortSelect.addEventListener('change', function () {
      state.selectedSort = this.value;
      renderExploreEvents();
    });
  }

  // Reset All Filters Button
  function resetAllFilters() {
    syncSearchInputs('');
    selectCategory('All Events');
    if (eventSortSelect) {
      eventSortSelect.value = 'upcoming';
      state.selectedSort = 'upcoming';
    }
    renderExploreEvents();
  }

  if (exploreResetAllBtn) exploreResetAllBtn.addEventListener('click', resetAllFilters);
  if (exploreEmptyResetBtn) exploreEmptyResetBtn.addEventListener('click', resetAllFilters);

  // Footer Category Quick Links
  document.querySelectorAll('.footer-cat-link').forEach((link) => {
    link.addEventListener('click', function (e) {
      const cat = this.getAttribute('data-cat');
      if (cat) {
        selectCategory(cat);
      }
    });
  });

  /* ==========================================================================
     8. Phase 3: Complete Event Registration & LocalStorage Engine
     ========================================================================== */
  const STORAGE_KEY = 'vespera_registrations';

  function getStoredRegistrations() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error('Failed reading registrations from localStorage:', err);
      return [];
    }
  }

  function saveRegistration(regRecord) {
    try {
      const existing = getStoredRegistrations();
      existing.unshift(regRecord);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
      updateNavRegistrationsBadge();
      return true;
    } catch (err) {
      console.error('Failed saving registration to localStorage:', err);
      return false;
    }
  }

  function deleteRegistration(regId) {
    try {
      const existing = getStoredRegistrations();
      const filtered = existing.filter((item) => item.id !== regId);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      updateNavRegistrationsBadge();
      return true;
    } catch (err) {
      console.error('Failed deleting registration from localStorage:', err);
      return false;
    }
  }

  function updateNavRegistrationsBadge() {
    const list = getStoredRegistrations();
    const count = list.length;
    [navRegistrationsCount, mobileRegistrationsCount].forEach((badge) => {
      if (badge) {
        if (count > 0) {
          badge.textContent = count;
          badge.style.display = 'inline-flex';
        } else {
          badge.style.display = 'none';
        }
      }
    });
  }

  function generateRegistrationId() {
    const year = new Date().getFullYear();
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    let randStr = '';
    for (let i = 0; i < 3; i++) {
      randStr += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return `VSP-${year}-NPL-${randNum}${randStr}`;
  }

  function populateRegistrationEventOptions() {
    if (!regEventSelect) return;
    const currentSelected = regEventSelect.value;
    regEventSelect.innerHTML =
      '<option value="">-- Choose an Event in Nepal --</option>' +
      NEPAL_EVENTS.map(
        (ev) => `<option value="${ev.id}">${ev.title} (${ev.location})</option>`
      ).join('');
    if (currentSelected) {
      regEventSelect.value = currentSelected;
    }
  }

  function updateRegistrationPreview(eventId, participantsCount) {
    if (!eventId) {
      // If none selected, default preview to first event
      const defaultEvent = NEPAL_EVENTS[0];
      if (defaultEvent) {
        setPreviewCardContent(defaultEvent, participantsCount);
      }
      return;
    }
    const found = NEPAL_EVENTS.find((e) => e.id === eventId);
    if (found) {
      setPreviewCardContent(found, participantsCount);
    }
  }

  function setPreviewCardContent(event, participantsCount) {
    if (regPreviewImg) {
      regPreviewImg.src = event.image;
      regPreviewImg.alt = event.title;
    }
    if (regPreviewCategory) regPreviewCategory.textContent = event.category;
    if (regPreviewTitle) regPreviewTitle.textContent = event.title;
    if (regPreviewDesc) regPreviewDesc.textContent = event.description;
    if (regPreviewDateTime) regPreviewDateTime.textContent = `${event.date} · ${event.time}`;
    if (regPreviewVenue) regPreviewVenue.textContent = `${event.venue}, ${event.location}`;
    if (regPreviewContact) regPreviewContact.textContent = event.organizer.contact;
    if (regPreviewAttendees) {
      const count = parseInt(participantsCount, 10) || 1;
      regPreviewAttendees.textContent = `${count} ${count === 1 ? 'Attendee' : 'Attendees'}`;
    }
  }

  function showFieldError(groupId, errorId, message) {
    const group = document.getElementById(groupId);
    const errorElem = document.getElementById(errorId);
    if (group) group.classList.add('has-error');
    if (errorElem) {
      errorElem.textContent = message;
      errorElem.style.display = 'block';
    }
  }

  function clearFieldError(groupId, errorId) {
    const group = document.getElementById(groupId);
    const errorElem = document.getElementById(errorId);
    if (group) group.classList.remove('has-error');
    if (errorElem) {
      errorElem.textContent = '';
      errorElem.style.display = 'none';
    }
    if (formGlobalAlert) formGlobalAlert.style.display = 'none';
  }

  function clearAllFormErrors() {
    ['groupEvent', 'groupFullName', 'groupEmail', 'groupPhone', 'groupGender', 'groupParticipants'].forEach(
      (id) => {
        const group = document.getElementById(id);
        if (group) group.classList.remove('has-error');
      }
    );
    ['errRegEvent', 'errRegFullName', 'errRegEmail', 'errRegPhone', 'errRegGender', 'errRegParticipants'].forEach(
      (id) => {
        const err = document.getElementById(id);
        if (err) {
          err.textContent = '';
          err.style.display = 'none';
        }
      }
    );
    if (formGlobalAlert) formGlobalAlert.style.display = 'none';
  }

  function validateRegistrationForm() {
    clearAllFormErrors();
    let isValid = true;
    let firstErrorElement = null;

    const fullName = regFullName ? regFullName.value.trim() : '';
    const email = regEmail ? regEmail.value.trim() : '';
    const phone = regPhone ? regPhone.value.trim() : '';
    const eventId = regEventSelect ? regEventSelect.value : '';
    const gender = regGender ? regGender.value : '';
    const participants = regParticipants ? parseInt(regParticipants.value, 10) : 0;

    // 1. Full Name: cannot be empty, minimum 2 characters
    if (!fullName) {
      showFieldError('groupFullName', 'errRegFullName', 'Full name is required and cannot be empty.');
      isValid = false;
      if (!firstErrorElement) firstErrorElement = regFullName;
    } else if (fullName.length < 2) {
      showFieldError('groupFullName', 'errRegFullName', 'Name must contain at least 2 characters.');
      isValid = false;
      if (!firstErrorElement) firstErrorElement = regFullName;
    } else if (!/^[a-zA-Z\s.'-]+$/.test(fullName)) {
      showFieldError('groupFullName', 'errRegFullName', 'Name must contain letters and standard characters only.');
      isValid = false;
      if (!firstErrorElement) firstErrorElement = regFullName;
    }

    // 2. Email: valid email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (!email) {
      showFieldError('groupEmail', 'errRegEmail', 'Email address is required.');
      isValid = false;
      if (!firstErrorElement) firstErrorElement = regEmail;
    } else if (!emailPattern.test(email)) {
      showFieldError('groupEmail', 'errRegEmail', 'Please enter a valid email address (e.g., name@example.com).');
      isValid = false;
      if (!firstErrorElement) firstErrorElement = regEmail;
    }

    // 3. Phone: valid Nepalese or Indian mobile number
    const regCountryCode = document.getElementById('regCountryCode');
    let selectedCountry = regCountryCode ? regCountryCode.value : '+977';
    const cleanPhone = phone.replace(/[\s\-()]/g, '');

    // Patterns
    // Nepal: 10-digit mobile starting with 98 or 97, optional +977 or 977 prefix
    const nepalPattern = /^(\+977|977)?(98\d{8}|97\d{8})$/;
    // India: 10-digit mobile starting with 6, 7, 8, or 9, optional +91, 91, or 0 prefix
    const indiaPattern = /^(\+91|91|0)?([6-9]\d{9})$/;

    // Smart auto-detection based on international prefix typed by user
    if (cleanPhone.startsWith('+91') || cleanPhone.startsWith('919') || cleanPhone.startsWith('918') || cleanPhone.startsWith('917') || cleanPhone.startsWith('916')) {
      if (regCountryCode && regCountryCode.value !== '+91') {
        regCountryCode.value = '+91';
        selectedCountry = '+91';
      }
    } else if (cleanPhone.startsWith('+977') || cleanPhone.startsWith('97798') || cleanPhone.startsWith('97797')) {
      if (regCountryCode && regCountryCode.value !== '+977') {
        regCountryCode.value = '+977';
        selectedCountry = '+977';
      }
    }

    if (!phone) {
      showFieldError('groupPhone', 'errRegPhone', 'Phone number is required and cannot be empty.');
      isValid = false;
      if (!firstErrorElement) firstErrorElement = regPhone;
    } else if (selectedCountry === '+91') {
      if (!indiaPattern.test(cleanPhone)) {
        showFieldError(
          'groupPhone',
          'errRegPhone',
          'Please enter a valid 10-digit Indian mobile number starting with 6, 7, 8, or 9 (e.g., 9876543210).'
        );
        isValid = false;
        if (!firstErrorElement) firstErrorElement = regPhone;
      }
    } else {
      // Default to Nepal
      if (!nepalPattern.test(cleanPhone)) {
        showFieldError(
          'groupPhone',
          'errRegPhone',
          'Please enter a valid 10-digit Nepal mobile number starting with 98 or 97 (e.g., 9841234567).'
        );
        isValid = false;
        if (!firstErrorElement) firstErrorElement = regPhone;
      }
    }

    // 4. Selected Event: must be selected
    if (!eventId) {
      showFieldError('groupEvent', 'errRegEvent', 'Please select an event in Nepal to attend.');
      isValid = false;
      if (!firstErrorElement) firstErrorElement = regEventSelect;
    } else {
      const exists = NEPAL_EVENTS.some((e) => e.id === eventId);
      if (!exists) {
        showFieldError('groupEvent', 'errRegEvent', 'The selected event could not be found.');
        isValid = false;
        if (!firstErrorElement) firstErrorElement = regEventSelect;
      }
    }

    // 5. Gender: must be chosen
    if (!gender) {
      showFieldError('groupGender', 'errRegGender', 'Please select a gender option.');
      isValid = false;
      if (!firstErrorElement) firstErrorElement = regGender;
    }

    // 6. Number of Participants: at least 1, max 10
    if (isNaN(participants) || participants < 1) {
      showFieldError('groupParticipants', 'errRegParticipants', 'Number of participants must be at least 1.');
      isValid = false;
      if (!firstErrorElement) firstErrorElement = regParticipants;
    } else if (participants > 10) {
      showFieldError('groupParticipants', 'errRegParticipants', 'Maximum 10 participants per registration.');
      isValid = false;
      if (!firstErrorElement) firstErrorElement = regParticipants;
    }

    // 7. Duplicate Prevention Check
    if (isValid) {
      const stored = getStoredRegistrations();
      const duplicate = stored.find(
        (r) => r.email.toLowerCase() === email.toLowerCase() && r.eventId === eventId
      );
      if (duplicate) {
        if (formGlobalAlert && formGlobalAlertMsg) {
          formGlobalAlertMsg.textContent = `A registration for this event with "${email}" already exists (Pass ID: ${duplicate.id}). Please check "My Registrations" or register with another email.`;
          formGlobalAlert.style.display = 'flex';
        }
        isValid = false;
        if (!firstErrorElement) firstErrorElement = regEmail;
      }
    }

    if (!isValid && firstErrorElement) {
      firstErrorElement.focus();
    }

    return isValid;
  }

  function handleRegistrationSubmit(e) {
    e.preventDefault();

    if (!validateRegistrationForm()) {
      return;
    }

    // Form is valid! Show loading feedback
    if (btnSubmitRegistration) {
      btnSubmitRegistration.disabled = true;
      btnSubmitRegistration.classList.add('loading');
    }

    const eventId = regEventSelect.value;
    const selectedEvent = NEPAL_EVENTS.find((ev) => ev.id === eventId);

    // Format phone with proper country code (+977 or +91)
    const regCountryCode = document.getElementById('regCountryCode');
    let activeCode = regCountryCode ? regCountryCode.value : '+977';
    let cleanNumber = regPhone.value.trim().replace(/[\s\-()]/g, '');

    if (cleanNumber.startsWith('+91')) {
      activeCode = '+91';
      cleanNumber = cleanNumber.replace('+91', '');
    } else if (cleanNumber.startsWith('91') && cleanNumber.length === 12) {
      activeCode = '+91';
      cleanNumber = cleanNumber.substring(2);
    } else if (cleanNumber.startsWith('+977')) {
      activeCode = '+977';
      cleanNumber = cleanNumber.replace('+977', '');
    } else if (cleanNumber.startsWith('977') && cleanNumber.length === 13) {
      activeCode = '+977';
      cleanNumber = cleanNumber.substring(3);
    } else if (cleanNumber.startsWith('0') && activeCode === '+91') {
      cleanNumber = cleanNumber.substring(1);
    }
    const formattedPhone = `${activeCode} ${cleanNumber}`;

    const regId = generateRegistrationId();
    const now = new Date();
    const formattedTime =
      new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
        timeZone: 'Asia/Kathmandu'
      }).format(now) + ' NPT';

    const newRecord = {
      id: regId,
      participantName: regFullName.value.trim(),
      email: regEmail.value.trim().toLowerCase(),
      phone: formattedPhone,
      eventId: selectedEvent.id,
      eventTitle: selectedEvent.title,
      eventCategory: selectedEvent.category,
      eventDate: selectedEvent.date,
      eventTime: selectedEvent.time,
      eventVenue: selectedEvent.venue,
      eventLocation: selectedEvent.location,
      gender: regGender.value,
      participantsCount: parseInt(regParticipants.value, 10),
      registrationDate: formattedTime,
      createdAt: now.toISOString()
    };

    // Smooth processing transition (350ms)
    setTimeout(() => {
      saveRegistration(newRecord);

      // Reset form
      if (eventRegistrationForm) eventRegistrationForm.reset();
      clearAllFormErrors();

      if (btnSubmitRegistration) {
        btnSubmitRegistration.disabled = false;
        btnSubmitRegistration.classList.remove('loading');
      }

      // Navigate to confirmation view
      window.location.hash = `#/confirmation/${regId}`;
    }, 350);
  }

  function openRegistrationPage(eventId) {
    populateRegistrationEventOptions();

    const targetEventId = eventId || state.selectedEventId;
    if (targetEventId && NEPAL_EVENTS.some((e) => e.id === targetEventId)) {
      regEventSelect.value = targetEventId;
      state.selectedEventId = targetEventId;
      if (btnBackFromRegLabel) btnBackFromRegLabel.textContent = 'Back to Event Details';
      if (btnBackFromReg) {
        btnBackFromReg.onclick = () => {
          window.location.hash = `#/event/${targetEventId}`;
        };
      }
    } else {
      if (NEPAL_EVENTS.length > 0) {
        regEventSelect.value = NEPAL_EVENTS[0].id;
        state.selectedEventId = NEPAL_EVENTS[0].id;
      }
      if (btnBackFromRegLabel) btnBackFromRegLabel.textContent = 'Back to Events';
      if (btnBackFromReg) {
        btnBackFromReg.onclick = () => {
          window.location.hash = '#/events';
        };
      }
    }

    clearAllFormErrors();
    updateRegistrationPreview(regEventSelect.value, regParticipants ? regParticipants.value : 1);
  }

  function renderConfirmationView(regId) {
    const list = getStoredRegistrations();
    let record = list.find((r) => r.id === regId);
    if (!record) {
      if (list.length > 0) {
        record = list[0];
      } else {
        window.location.hash = '#/events';
        return;
      }
    }

    if (confRegId) confRegId.textContent = record.id;
    if (confEventCategory) confEventCategory.textContent = record.eventCategory || 'Nepal Event';
    if (confEventName) confEventName.textContent = record.eventTitle;
    if (confEventVenue) confEventVenue.textContent = `${record.eventVenue}, ${record.eventLocation}, Nepal`;
    if (confAttendeeName) confAttendeeName.textContent = record.participantName;
    if (confEventDateTime) confEventDateTime.textContent = `${record.eventDate} · ${record.eventTime || '09:00 AM'}`;
    if (confContact) confContact.textContent = `${record.email} · ${record.phone}`;
    if (confParticipantsCount) {
      confParticipantsCount.textContent = `${record.participantsCount} ${record.participantsCount === 1 ? 'Attendee' : 'Attendees'}`;
    }
    if (confGender) confGender.textContent = record.gender;
    if (confTimestamp) confTimestamp.textContent = record.registrationDate;

    // Render verification QR Code containing the Registration ID
    generatePassQrCode(record.id);
  }

  function renderMyRegistrationsView() {
    const list = getStoredRegistrations();

    if (!myRegListContainer || !myRegEmptyState) return;

    if (list.length === 0) {
      myRegListContainer.style.display = 'none';
      myRegEmptyState.style.display = 'block';
      return;
    }

    myRegEmptyState.style.display = 'none';
    myRegListContainer.style.display = 'flex';

    myRegListContainer.innerHTML = list
      .map(
        (reg) => `
        <div class="my-reg-card" data-reg-id="${reg.id}">
          <div class="my-reg-badge-col">
            <span class="my-reg-id-badge">${reg.id}</span>
            <span class="my-reg-time-stamp">Booked on ${reg.registrationDate}</span>
          </div>
          <div class="my-reg-info">
            <h3 class="my-reg-info-title">${reg.eventTitle}</h3>
            <div class="my-reg-info-meta">
              <span class="my-reg-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>${reg.eventDate}</span>
              </span>
              <span class="my-reg-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span>${reg.eventVenue}, ${reg.eventLocation}</span>
              </span>
              <span class="my-reg-meta-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                <span>${reg.participantName} (${reg.participantsCount} ${reg.participantsCount === 1 ? 'Attendee' : 'Attendees'})</span>
              </span>
            </div>
          </div>
          <div class="my-reg-actions">
            <a href="#/confirmation/${reg.id}" class="btn-view-pass" title="View Full Pass">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span>View Pass</span>
            </a>
            <button type="button" class="btn-cancel-reg" data-cancel-id="${reg.id}" title="Cancel Registration">
              Cancel
            </button>
          </div>
        </div>
      `
      )
      .join('');

    // Attach cancel registration listeners (opens interactive cancellation modal with reason required)
    const cancelButtons = myRegListContainer.querySelectorAll('.btn-cancel-reg');
    cancelButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        const idToCancel = this.getAttribute('data-cancel-id');
        openCancelModal(idToCancel);
      });
    });
  }

  // Bind Form Listeners
  if (eventRegistrationForm) {
    eventRegistrationForm.addEventListener('submit', handleRegistrationSubmit);
  }

  if (regEventSelect) {
    regEventSelect.addEventListener('change', () => {
      updateRegistrationPreview(regEventSelect.value, regParticipants ? regParticipants.value : 1);
      clearFieldError('groupEvent', 'errRegEvent');
      state.selectedEventId = regEventSelect.value;
    });
  }

  if (regParticipants) {
    regParticipants.addEventListener('input', () => {
      updateRegistrationPreview(regEventSelect ? regEventSelect.value : '', regParticipants.value);
      clearFieldError('groupParticipants', 'errRegParticipants');
    });
  }

  if (regFullName) {
    regFullName.addEventListener('input', () => clearFieldError('groupFullName', 'errRegFullName'));
  }
  if (regEmail) {
    regEmail.addEventListener('input', () => clearFieldError('groupEmail', 'errRegEmail'));
  }
  const regCountryCode = document.getElementById('regCountryCode');
  const phoneFieldHint = document.getElementById('phoneFieldHint');

  if (regCountryCode) {
    regCountryCode.addEventListener('change', () => {
      clearFieldError('groupPhone', 'errRegPhone');
      if (regCountryCode.value === '+91') {
        if (regPhone) regPhone.placeholder = '98XXXXXXXX or 7XXXXXXXX';
        if (phoneFieldHint) phoneFieldHint.textContent = 'Enter a 10-digit Indian mobile number (e.g., 9876543210 or 8123456789).';
      } else {
        if (regPhone) regPhone.placeholder = '98XXXXXXXX or 97XXXXXXXX';
        if (phoneFieldHint) phoneFieldHint.textContent = 'Enter a 10-digit Nepal mobile number (e.g., 9841234567 or 9741234567).';
      }
    });
  }

  if (regPhone) {
    regPhone.addEventListener('input', () => {
      clearFieldError('groupPhone', 'errRegPhone');
      // Helpful live check: if user pastes/types +91, auto-select India; if +977, auto-select Nepal
      const val = regPhone.value.trim();
      if (val.startsWith('+91') && regCountryCode && regCountryCode.value !== '+91') {
        regCountryCode.value = '+91';
        if (phoneFieldHint) phoneFieldHint.textContent = 'Enter a 10-digit Indian mobile number (e.g., 9876543210 or 8123456789).';
      } else if (val.startsWith('+977') && regCountryCode && regCountryCode.value !== '+977') {
        regCountryCode.value = '+977';
        if (phoneFieldHint) phoneFieldHint.textContent = 'Enter a 10-digit Nepal mobile number (e.g., 9841234567 or 9741234567).';
      }
    });
  }
  if (regGender) {
    regGender.addEventListener('change', () => clearFieldError('groupGender', 'errRegGender'));
  }

  // Copy ID button with animated tooltip
  if (btnCopyRegId && confRegId && copyTooltip) {
    btnCopyRegId.addEventListener('click', () => {
      const textToCopy = confRegId.textContent.trim();
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard
          .writeText(textToCopy)
          .then(() => {
            copyTooltip.classList.add('show');
            setTimeout(() => copyTooltip.classList.remove('show'), 2000);
          })
          .catch(() => {
            copyTooltip.classList.add('show');
            setTimeout(() => copyTooltip.classList.remove('show'), 2000);
          });
      } else {
        copyTooltip.classList.add('show');
        setTimeout(() => copyTooltip.classList.remove('show'), 2000);
      }
    });
  }

  // Print & Download Ticket Pass System
  const btnPrintPassAlt = document.getElementById('btnPrintPassAlt');
  const btnDownloadTicket = document.getElementById('btnDownloadTicket');
  const printToast = document.getElementById('printToast');
  const printToastMsg = document.getElementById('printToastMsg');

  function showPrintToast(message, isSuccess = false, duration = 3500) {
    if (!printToast || !printToastMsg) return;
    printToastMsg.textContent = message;
    printToast.classList.toggle('success', isSuccess);
    printToast.style.display = 'flex';
    if (printToast._timer) clearTimeout(printToast._timer);
    printToast._timer = setTimeout(() => {
      printToast.style.display = 'none';
    }, duration);
  }

  function handlePrintPass() {
    const ticketElement = document.getElementById('ticketPassCard');
    if (!ticketElement) {
      window.print();
      return;
    }

    // Add layout consistency CSS class toggle before print dialog
    document.body.classList.add('printing-ticket-only');

    showPrintToast('Preparing ticket pass for printing...', true, 2000);

    // Brief delay to ensure layout consistency, CSS paint stabilization, and fonts before print dialog appears
    setTimeout(() => {
      try {
        window.print();
      } catch (err) {
        console.warn('window.print() encountered an issue:', err);
      } finally {
        // Cleanup CSS class after print dialog is closed or afterprint triggers
        const removePrintClass = () => {
          document.body.classList.remove('printing-ticket-only');
          window.removeEventListener('afterprint', removePrintClass);
        };
        window.addEventListener('afterprint', removePrintClass, { once: true });
        // Fallback cleanup in case afterprint does not fire
        setTimeout(removePrintClass, 1200);
      }
    }, 180);
  }

  function handleDownloadPassSummary() {
    const list = getStoredRegistrations();
    const curRegId = confRegId ? confRegId.textContent.trim() : '';
    const record = list.find((r) => r.id === curRegId) || (list.length > 0 ? list[0] : null);

    const id = record ? record.id : (confRegId ? confRegId.textContent.trim() : 'PASS');
    const title = record ? record.eventTitle : (confEventName ? confEventName.textContent.trim() : 'Nepal Event');
    const category = record ? record.eventCategory : (confEventCategory ? confEventCategory.textContent.trim() : 'Event');
    const date = record ? `${record.eventDate} · ${record.eventTime || '09:00 AM'}` : (confEventDateTime ? confEventDateTime.textContent.trim() : '');
    const venue = record ? `${record.eventVenue}, ${record.eventLocation}, Nepal` : (confEventVenue ? confEventVenue.textContent.trim() : '');
    const attendee = record ? record.participantName : (confAttendeeName ? confAttendeeName.textContent.trim() : 'Attendee');
    const contact = record ? `${record.email} | ${record.phone}` : (confContact ? confContact.textContent.trim() : '');
    const attendeesCount = record ? `${record.participantsCount} Attendee(s)` : (confParticipantsCount ? confParticipantsCount.textContent.trim() : '1 Attendee');
    const timestamp = record ? record.registrationDate : (confTimestamp ? confTimestamp.textContent.trim() : '');

    const content = 
`=============================================================
             VESPERA NEPAL OFFICIAL EVENT PASS
=============================================================
REGISTRATION ID: ${id}
STATUS: Active & Verified
ISSUED ON: ${timestamp}

-------------------------------------------------------------
EVENT DETAILS
-------------------------------------------------------------
Event Name:      ${title}
Category:        ${category}
Date & Time:     ${date}
Venue Location:  ${venue}

-------------------------------------------------------------
ATTENDEE DETAILS
-------------------------------------------------------------
Full Name:       ${attendee}
Total Attendees: ${attendeesCount}
Contact:         ${contact}

-------------------------------------------------------------
VERIFICATION & ADMISSION INSTRUCTIONS
-------------------------------------------------------------
1. Please present this pass (printed or on your mobile device)
   at the entrance check-in counter.
2. Admission is complimentary for all registered attendees.
3. Bring valid student / citizen photo identification.

Vespera Nepal Event Discovery & Management Platform
Kathmandu · Pokhara · Lalitpur · Bhaktapur · Chitwan
Helpline: +977 1-4235890 / +977 9801234567 | support@vespera.np
=============================================================`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Vespera-Pass-${id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showPrintToast(`Pass downloaded as Vespera-Pass-${id}.txt!`, true, 3500);
  }

  // Bind Print & Download listeners
  if (btnPrintTicket) {
    btnPrintTicket.addEventListener('click', handlePrintPass);
  }
  if (btnPrintPassAlt) {
    btnPrintPassAlt.addEventListener('click', handlePrintPass);
  }
  if (btnDownloadTicket) {
    btnDownloadTicket.addEventListener('click', handleDownloadPassSummary);
  }

  /* ==========================================================================
     Admission Pass QR Code Generator (Contains Registration ID)
     ========================================================================== */
  const ticketQrCanvas = document.getElementById('ticketQrCanvas');
  const ticketQrIdLabel = document.getElementById('ticketQrIdLabel');
  const btnSaveQr = document.getElementById('btnSaveQr');

  function generatePassQrCode(registrationId) {
    if (ticketQrIdLabel) {
      ticketQrIdLabel.textContent = registrationId;
    }
    const canvas = document.getElementById('ticketQrCanvas');
    if (!canvas) return;

    // Accurately encode the unique registration ID into the QR canvas
    QRCode.toCanvas(
      canvas,
      registrationId,
      {
        width: 140,
        margin: 1,
        color: {
          dark: '#0f172a', // Deep navy/black modules for maximal scanner readability
          light: '#ffffff' // High-contrast pure white backdrop
        },
        errorCorrectionLevel: 'M'
      },
      function (err) {
        if (err) {
          console.error('Failed to generate pass QR code:', err);
        }
      }
    );
  }

  function handleSaveQrImage() {
    const canvas = document.getElementById('ticketQrCanvas');
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const currentId = confRegId && confRegId.textContent.trim() ? confRegId.textContent.trim() : 'Vespera-Pass';
      const link = document.createElement('a');
      link.href = dataUrl;
      link.download = `${currentId}-QR.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showPrintToast(`QR code image saved as ${currentId}-QR.png!`, true, 3000);
    } catch (e) {
      console.error('Failed to save QR image:', e);
      showPrintToast('Unable to export QR code image.', false, 3000);
    }
  }

  if (btnSaveQr) {
    btnSaveQr.addEventListener('click', handleSaveQrImage);
  }

  /* ==========================================================================
     Interactive Pass Cancellation Modal (Reason Required)
     ========================================================================== */
  const cancelModal = document.getElementById('cancelModal');
  const btnCloseCancelModal = document.getElementById('btnCloseCancelModal');
  const btnDismissCancelModal = document.getElementById('btnDismissCancelModal');
  const cancelPassForm = document.getElementById('cancelPassForm');
  const cancelReasonSelect = document.getElementById('cancelReasonSelect');
  const cancelAdditionalNote = document.getElementById('cancelAdditionalNote');
  const errCancelReason = document.getElementById('errCancelReason');
  const cancelTargetRegId = document.getElementById('cancelTargetRegId');
  const cancelTargetEventName = document.getElementById('cancelTargetEventName');
  const btnCancelFromCard = document.getElementById('btnCancelFromCard');
  const btnCancelPassAlt = document.getElementById('btnCancelPassAlt');

  let pendingCancelRegId = null;

  function openCancelModal(regId) {
    if (!cancelModal) return;
    const list = getStoredRegistrations();
    let record = list.find((r) => r.id === regId);
    if (!record) {
      if (confRegId && confRegId.textContent.trim()) {
        const currentId = confRegId.textContent.trim();
        record = list.find((r) => r.id === currentId);
      }
      if (!record && list.length > 0) {
        record = list[0];
      }
    }

    if (!record) {
      showPrintToast('No registration pass found to cancel.', false, 3000);
      return;
    }

    pendingCancelRegId = record.id;
    if (cancelTargetRegId) cancelTargetRegId.textContent = record.id;
    if (cancelTargetEventName) cancelTargetEventName.textContent = record.eventTitle;

    // Reset form fields and errors
    if (cancelReasonSelect) cancelReasonSelect.value = '';
    if (cancelAdditionalNote) cancelAdditionalNote.value = '';
    const groupReason = document.getElementById('groupCancelReason');
    if (groupReason) groupReason.classList.remove('has-error');
    if (errCancelReason) {
      errCancelReason.textContent = '';
      errCancelReason.style.display = 'none';
    }

    cancelModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
    if (cancelReasonSelect) cancelReasonSelect.focus();
  }

  function closeCancelModal() {
    if (cancelModal) {
      cancelModal.style.display = 'none';
    }
    document.body.style.overflow = '';
    pendingCancelRegId = null;
  }

  function handleCancelSubmit(e) {
    e.preventDefault();

    if (!pendingCancelRegId) {
      closeCancelModal();
      return;
    }

    const selectedReason = cancelReasonSelect ? cancelReasonSelect.value.trim() : '';
    const groupReason = document.getElementById('groupCancelReason');

    // Strict validation: Reason is required
    if (!selectedReason) {
      if (groupReason) groupReason.classList.add('has-error');
      if (errCancelReason) {
        errCancelReason.textContent = 'Please select a reason to cancel this registration pass.';
        errCancelReason.style.display = 'block';
      }
      if (cancelReasonSelect) cancelReasonSelect.focus();
      return;
    }

    const cancelledId = pendingCancelRegId;
    deleteRegistration(cancelledId);
    closeCancelModal();

    showPrintToast(`Pass ${cancelledId} cancelled successfully (Reason: ${selectedReason}).`, true, 4000);

    // Re-render my-registrations list
    renderMyRegistrationsView();

    // If currently viewing the cancelled pass, route to my registrations
    if (state.currentView === 'confirmation') {
      window.location.hash = '#/my-registrations';
    }
  }

  if (cancelPassForm) {
    cancelPassForm.addEventListener('submit', handleCancelSubmit);
  }
  if (cancelReasonSelect) {
    cancelReasonSelect.addEventListener('change', () => {
      const groupReason = document.getElementById('groupCancelReason');
      if (groupReason) groupReason.classList.remove('has-error');
      if (errCancelReason) {
        errCancelReason.textContent = '';
        errCancelReason.style.display = 'none';
      }
    });
  }
  if (btnCloseCancelModal) {
    btnCloseCancelModal.addEventListener('click', closeCancelModal);
  }
  if (btnDismissCancelModal) {
    btnDismissCancelModal.addEventListener('click', closeCancelModal);
  }
  if (cancelModal) {
    cancelModal.addEventListener('click', (e) => {
      if (e.target === cancelModal) {
        closeCancelModal();
      }
    });
  }
  if (btnCancelFromCard) {
    btnCancelFromCard.addEventListener('click', () => {
      const currentId = confRegId ? confRegId.textContent.trim() : null;
      openCancelModal(currentId);
    });
  }
  if (btnCancelPassAlt) {
    btnCancelPassAlt.addEventListener('click', () => {
      const currentId = confRegId ? confRegId.textContent.trim() : null;
      openCancelModal(currentId);
    });
  }

  /* ==========================================================================
     10. Phase 4: Theme Toggle (Dark / Light Mode)
     ========================================================================== */
  const THEME_KEY = 'vespera_theme';
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const mobileThemeStatus = document.getElementById('mobileThemeStatus');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      // ignore
    }

    const isLight = theme === 'light';
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute(
        'aria-label',
        isLight ? 'Switch to dark theme' : 'Switch to light theme'
      );
      themeToggleBtn.setAttribute(
        'title',
        isLight ? 'Switch to Dark Theme' : 'Switch to Light Theme'
      );
    }
    if (mobileThemeStatus) {
      mobileThemeStatus.textContent = isLight ? 'Light Mode' : 'Dark Mode';
    }
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
  }

  function initTheme() {
    let savedTheme = 'dark';
    try {
      savedTheme = localStorage.getItem(THEME_KEY) || 'dark';
    } catch (e) {
      savedTheme = 'dark';
    }
    applyTheme(savedTheme);

    if (themeToggleBtn) {
      themeToggleBtn.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggleBtn) {
      mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    }
  }

  /* ==========================================================================
     11. Phase 4: Event Countdown Timer Widget
     ========================================================================== */
  let countdownTimerInterval = null;

  function stopEventCountdown() {
    if (countdownTimerInterval) {
      clearInterval(countdownTimerInterval);
      countdownTimerInterval = null;
    }
  }

  function startEventCountdown(event) {
    stopEventCountdown();

    const cdDays = document.getElementById('cdDays');
    const cdHours = document.getElementById('cdHours');
    const cdMinutes = document.getElementById('cdMinutes');
    const cdSeconds = document.getElementById('cdSeconds');
    const countdownStatusBadge = document.getElementById('countdownStatusBadge');
    const countdownTimerGrid = document.getElementById('countdownTimerGrid');
    const countdownPassedMsg = document.getElementById('countdownPassedMsg');

    if (!cdDays || !cdHours || !cdMinutes || !cdSeconds) return;

    // Calculate event target timestamp using event's isoDate and starting time (Nepal UTC+05:45)
    let timeStr = '09:00:00';
    if (event.time) {
      const match = event.time.match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (match) {
        let h = parseInt(match[1], 10);
        const m = match[2];
        const ampm = match[3].toUpperCase();
        if (ampm === 'PM' && h < 12) h += 12;
        if (ampm === 'AM' && h === 12) h = 0;
        timeStr = `${String(h).padStart(2, '0')}:${m}:00`;
      }
    }

    const targetDate = new Date(`${event.isoDate}T${timeStr}+05:45`);

    function updateCountdown() {
      const now = new Date();
      const diffMs = targetDate.getTime() - now.getTime();

      if (diffMs <= 0) {
        if (countdownTimerGrid) countdownTimerGrid.style.display = 'none';
        if (countdownPassedMsg) {
          countdownPassedMsg.style.display = 'block';
          countdownPassedMsg.innerHTML = `<strong>Event is Live or Concluded</strong>This event was scheduled for ${event.date} at ${event.venue}. Attendance verification is active.`;
        }
        if (countdownStatusBadge) {
          countdownStatusBadge.textContent = 'Event in Progress / Concluded';
        }
        stopEventCountdown();
        return;
      }

      if (countdownTimerGrid) countdownTimerGrid.style.display = 'flex';
      if (countdownPassedMsg) countdownPassedMsg.style.display = 'none';
      if (countdownStatusBadge) countdownStatusBadge.textContent = 'Live Countdown to Event';

      const totalSec = Math.floor(diffMs / 1000);
      const days = Math.floor(totalSec / (3600 * 24));
      const hours = Math.floor((totalSec % (3600 * 24)) / 3600);
      const minutes = Math.floor((totalSec % 3600) / 60);
      const seconds = Math.floor(totalSec % 60);

      cdDays.textContent = String(days).padStart(2, '0');
      cdHours.textContent = String(hours).padStart(2, '0');
      cdMinutes.textContent = String(minutes).padStart(2, '0');
      cdSeconds.textContent = String(seconds).padStart(2, '0');
    }

    updateCountdown();
    countdownTimerInterval = setInterval(updateCountdown, 1000);
  }

  /* ==========================================================================
     12. Phase 4: Floating Back-to-Top Button
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTopBtn');

  function handleBackToTopScroll() {
    if (!backToTopBtn) return;
    if (window.scrollY > 350) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  }

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
  window.addEventListener('scroll', handleBackToTopScroll, { passive: true });

  /* ==========================================================================
     13. Single-Page Router & Navigation Sync
     ========================================================================== */
  function switchView(viewName, param) {
    state.currentView = viewName;

    // Stop countdown if navigating away from details
    if (viewName !== 'details') {
      stopEventCountdown();
    }

    // Toggle View Containers
    if (homeView) {
      homeView.classList.toggle('active', viewName === 'home');
      homeView.style.display = viewName === 'home' ? 'block' : 'none';
    }
    if (exploreView) {
      exploreView.classList.toggle('active', viewName === 'explore');
      exploreView.style.display = viewName === 'explore' ? 'block' : 'none';
    }
    if (detailsView) {
      detailsView.classList.toggle('active', viewName === 'details');
      detailsView.style.display = viewName === 'details' ? 'block' : 'none';
    }
    if (registrationView) {
      registrationView.classList.toggle('active', viewName === 'register');
      registrationView.style.display = viewName === 'register' ? 'block' : 'none';
    }
    if (confirmationView) {
      confirmationView.classList.toggle('active', viewName === 'confirmation');
      confirmationView.style.display = viewName === 'confirmation' ? 'block' : 'none';
    }
    if (myRegistrationsView) {
      myRegistrationsView.classList.toggle('active', viewName === 'my-registrations');
      myRegistrationsView.style.display = viewName === 'my-registrations' ? 'block' : 'none';
    }

    // Update Nav Link Active States
    if (navLinkHome) navLinkHome.classList.toggle('active', viewName === 'home');
    if (mobileLinkHome) mobileLinkHome.classList.toggle('active', viewName === 'home');
    if (navLinkEvents) navLinkEvents.classList.toggle('active', viewName === 'explore');
    if (mobileLinkEvents) mobileLinkEvents.classList.toggle('active', viewName === 'explore');
    if (navLinkRegistrations) navLinkRegistrations.classList.toggle('active', viewName === 'my-registrations');
    if (mobileLinkRegistrations) mobileLinkRegistrations.classList.toggle('active', viewName === 'my-registrations');

    // Specific View Lifecycle actions
    if (viewName === 'home') {
      updateHeroParallax();
    } else if (viewName === 'explore') {
      renderExploreEvents();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'details') {
      if (param) {
        renderEventDetails(param);
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'register') {
      openRegistrationPage(param);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'confirmation') {
      renderConfirmationView(param);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (viewName === 'my-registrations') {
      renderMyRegistrationsView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    closeMobileMenu();
  }

  function handleRoute() {
    const hash = window.location.hash || '#/';

    if (hash.startsWith('#/event/')) {
      const eventId = hash.replace('#/event/', '').trim();
      switchView('details', eventId);
    } else if (hash.startsWith('#/register/')) {
      const eventId = hash.replace('#/register/', '').trim();
      switchView('register', eventId);
    } else if (hash === '#/register' || hash === '#register') {
      switchView('register');
    } else if (hash.startsWith('#/confirmation/')) {
      const regId = hash.replace('#/confirmation/', '').trim();
      switchView('confirmation', regId);
    } else if (hash === '#/my-registrations' || hash === '#my-registrations') {
      switchView('my-registrations');
    } else if (hash === '#/events' || hash === '#events') {
      switchView('explore');
    } else if (hash === '#about' || hash === '#contact') {
      switchView('home');
      setTimeout(() => {
        const target = document.querySelector(hash);
        if (target) {
          const headerOffset = header ? header.offsetHeight : 70;
          const pos = target.getBoundingClientRect().top + window.pageYOffset - headerOffset;
          window.scrollTo({ top: pos, behavior: 'smooth' });
        }
      }, 50);
    } else {
      switchView('home');
    }
  }

  window.addEventListener('hashchange', handleRoute);

  // Initialize all platform modules
  initTheme();
  renderHomeEvents();
  renderExploreEvents();
  populateRegistrationEventOptions();
  updateNavRegistrationsBadge();
  handleBackToTopScroll();
  handleRoute();

  // Keyboard accessibility
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (mobileDrawer && mobileDrawer.classList.contains('active')) {
        closeMobileMenu();
      }
      if (cancelModal && cancelModal.style.display === 'flex') {
        closeCancelModal();
      }
    }
  });
})();
