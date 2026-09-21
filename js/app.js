/**
 * =============================================================================
 * Stav's Birthday - Core Application Logic
 * =============================================================================
 * Handles:
 * - Google Form CTA binding
 * - Responsive RAM stick dimension synchronization
 * - Animated unmasking progress fill
 * - Milestone status updates
 * - Dynamic Contributor Table rendering with XSS safety
 * - Interactive celebratory confetti triggers
 */

(function () {
  'use strict';

  // Fallback default configuration in case js/config.js fails to load
  const DEFAULT_CONFIG = {
    ramFundPercentage: 25,
    googleFormUrl: 'https://forms.google.com',
    ramImageUrl: 'ram.png',
    milestones: [
      { percent: 25, label: '25%' },
      { percent: 50, label: '50%' },
      { percent: 75, label: '75%' },
      { percent: 100, label: '100% (Kingston FURY)' }
    ],
    contributors: []
  };

  /**
   * Retrieve active configuration merging globals with fallbacks
   */
  function getConfig() {
    const userConfig = (typeof window !== 'undefined' && window.BIRTHDAY_CONFIG) || {};
    return Object.assign({}, DEFAULT_CONFIG, userConfig);
  }

  /**
   * Sanitize string against XSS injection
   */
  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * Fire a celebratory confetti burst
   */
  function triggerConfetti(originX, originY) {
    if (typeof confetti !== 'function') return;

    confetti({
      particleCount: 55,
      spread: 65,
      origin: {
        x: originX !== undefined ? originX : 0.5,
        y: originY !== undefined ? originY : 0.6
      },
      colors: ['#6366f1', '#ec4899', '#06b6d4', '#f59e0b', '#8b5cf6']
    });
  }

  /**
   * Setup Google Form link and external targets
   */
  function setupFormLink(config) {
    const linkEl = document.getElementById('google-form-link');
    if (linkEl && config.googleFormUrl) {
      linkEl.href = config.googleFormUrl;
      linkEl.setAttribute('target', '_blank');
      linkEl.setAttribute('rel', 'noopener noreferrer');
    }
  }

  /**
   * Configure RAM images from config
   */
  function setupRamImages(config) {
    if (!config.ramImageUrl) return;

    const baseImg = document.querySelector('.ram-base-img');
    const fillImg = document.getElementById('ram-custom-image');

    if (baseImg && baseImg.getAttribute('src') !== config.ramImageUrl) {
      baseImg.src = config.ramImageUrl;
    }
    if (fillImg && fillImg.getAttribute('src') !== config.ramImageUrl) {
      fillImg.src = config.ramImageUrl;
    }
  }

  /**
   * Render milestone badges dynamically from config
   */
  function renderMilestones(config) {
    const container = document.getElementById('milestone-container');
    if (!container) return;

    const milestones = Array.isArray(config.milestones) ? config.milestones : DEFAULT_CONFIG.milestones;
    const currentPercent = Number(config.ramFundPercentage) || 0;

    container.innerHTML = milestones.map(m => {
      const isActive = currentPercent >= m.percent;
      return `<span class="milestone-pill ${isActive ? 'active' : ''}" data-percent="${m.percent}">${escapeHtml(m.label)}</span>`;
    }).join('');
  }

  /**
   * Keep unmasked visual layer matched to the outer frame width
   */
  function setupDimensionSync() {
    const frameEl = document.getElementById('ram-frame');
    const visualContent = document.getElementById('ram-visual-content');
    const fillImg = document.getElementById('ram-custom-image');

    if (!frameEl || !visualContent) return () => {};

    function sync() {
      const width = frameEl.offsetWidth;
      visualContent.style.setProperty('--ram-full-width', `${width}px`);
      visualContent.style.width = `${width}px`;
    }

    // Initial sync
    sync();

    // ResizeObserver for modern browsers
    if (window.ResizeObserver) {
      const ro = new ResizeObserver(sync);
      ro.observe(frameEl);
    } else {
      window.addEventListener('resize', sync);
    }

    if (fillImg) {
      fillImg.addEventListener('load', sync);
    }

    return sync;
  }

  /**
   * Animate the progress bar and number display
   */
  function animateProgressBar(config, syncFn) {
    const fillLayer = document.getElementById('ram-fill-layer');
    const percentageNumber = document.getElementById('percentage-number');
    const statusText = document.getElementById('ram-status-text');

    if (!fillLayer || !percentageNumber) return;

    const targetPercent = Math.min(Math.max(Number(config.ramFundPercentage) || 0, 0), 100);

    // Ensure layout is ready before animating width
    setTimeout(() => {
      if (typeof syncFn === 'function') syncFn();

      fillLayer.style.width = `${targetPercent}%`;

      let currentVal = 0;
      const duration = 1200;
      const steps = 40;
      const stepTime = duration / steps;
      const increment = targetPercent / steps;

      const counter = setInterval(() => {
        currentVal += increment;
        if (currentVal >= targetPercent) {
          currentVal = targetPercent;
          clearInterval(counter);
        }
        percentageNumber.textContent = `${Math.round(currentVal)}%`;
      }, stepTime);

      if (statusText) {
        statusText.textContent = `RAM Fund: ${targetPercent}% of Goal Reached`;
      }
    }, 250);
  }

  /**
   * Render the contributor list or show empty state
   */
  function renderContributors(config) {
    const tbody = document.getElementById('contributor-tbody');
    const emptyState = document.getElementById('table-empty-state');
    const countEl = document.getElementById('contributor-count');

    const contributors = Array.isArray(config.contributors) ? config.contributors : [];

    if (countEl) {
      countEl.textContent = `${contributors.length} ${contributors.length === 1 ? 'Supporter' : 'Supporters'}`;
    }

    if (!tbody) return;

    if (contributors.length > 0) {
      if (emptyState) emptyState.style.display = 'none';
      tbody.innerHTML = contributors.map((c, i) => `
        <tr>
          <td style="color: var(--text-dim); font-family: 'Space Grotesk', monospace;">#${i + 1}</td>
          <td style="font-weight: 600; color: #fff;">${escapeHtml(c.name || 'Friend')}</td>
          <td style="color: var(--text-muted);">${escapeHtml(c.persona || 'Inner Child')}</td>
          <td style="text-align: right;">
            <span style="display: inline-block; padding: 3px 10px; border-radius: 999px; background: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.3); color: #34d399; font-size: 0.78rem; font-weight: 600;">
              ${escapeHtml(c.status || 'Backed')}
            </span>
          </td>
        </tr>
      `).join('');
    } else {
      tbody.innerHTML = '';
      if (emptyState) emptyState.style.display = 'flex';
    }
  }

  /**
   * Attach click event listeners for celebratory interactions
   */
  function setupInteractions() {
    const frameEl = document.getElementById('ram-frame');
    const badgeEl = document.getElementById('percentage-badge');

    const clickHandler = (e) => {
      const x = e ? e.clientX / window.innerWidth : 0.5;
      const y = e ? e.clientY / window.innerHeight : 0.6;
      triggerConfetti(x, y);
    };

    if (frameEl) frameEl.addEventListener('click', clickHandler);
    if (badgeEl) badgeEl.addEventListener('click', clickHandler);
  }

  /**
   * Main application bootstrap
   */
  function init() {
    const config = getConfig();

    setupFormLink(config);
    setupRamImages(config);
    renderMilestones(config);
    const syncFn = setupDimensionSync();
    animateProgressBar(config, syncFn);
    renderContributors(config);
    setupInteractions();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
