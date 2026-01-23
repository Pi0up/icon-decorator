class IconDecorator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._observer = null;
  }

  static get observedAttributes() {
    return ['position', 'offset', 'size-ratio', 'cutout-border', 'decorator-padding'];
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {
    if (this._observer) this._observer.disconnect();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.updateStyles();
    }
  }

  initResizeObserver() {
    if (this._observer) this._observer.disconnect();
    
    const badgeContainer = this.shadowRoot.querySelector('.badge-container');
    if (!badgeContainer) return;

    this._observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const width = entry.borderBoxSize?.[0]?.inlineSize || entry.contentRect.width;
        this.style.setProperty('--badge-width', `${width}px`);
      }
    });
    
    this._observer.observe(badgeContainer);
  }

  updateStyles() {
    const position = this.getAttribute('position') || 'bottom-right';
    const offset = this.getAttribute('offset') || '3px';
    const ratio = this.getAttribute('size-ratio') || '0.5';
    const cutoutBorder = this.getAttribute('cutout-border') || '2px';
    const decoratorPadding = this.getAttribute('decorator-padding') || '3px';

    this.style.setProperty('--offset', offset);
    this.style.setProperty('--scale', ratio);
    this.style.setProperty('--cutout-border', cutoutBorder);
    this.style.setProperty('--decorator-padding', decoratorPadding);
    
    this.setAttribute('data-inner-pos', position);
  }

  render() {
    
    this.style.display = 'none';
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-flex;
          position: relative;
          vertical-align: middle;
          --badge-width: 0px; 
          --scale: 0.5;
          --offset: 0px;
          --cutout-border: 4px;
          --decorator-padding: 0px;
          user-select: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
        }

        #icon-wrapper {
          display: inline-flex;
          position: relative;
          z-index: 0;
          line-height: 0;

          --hole-radius: calc( (var(--badge-width) * var(--scale) / 2) + var(--cutout-border) );
          
          -webkit-mask-image: radial-gradient(
            circle var(--hole-radius) at var(--mask-origin-x) var(--mask-origin-y), 
            transparent var(--hole-radius), 
            black calc(var(--hole-radius) + 0.5px)
          );
          mask-image: radial-gradient(
            circle var(--hole-radius) at var(--mask-origin-x) var(--mask-origin-y), 
            transparent var(--hole-radius), 
            black calc(var(--hole-radius) + 0.5px)
          );
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
        }

        :host([data-inner-pos="top-right"]) #icon-wrapper { --mask-origin-x: calc(50% + var(--offset)); --mask-origin-y: calc(50% - var(--offset)); }
        :host([data-inner-pos="top-left"]) #icon-wrapper { --mask-origin-x: calc(50% - var(--offset)); --mask-origin-y: calc(50% - var(--offset)); }
        :host([data-inner-pos="bottom-right"]) #icon-wrapper { --mask-origin-x: calc(50% + var(--offset)); --mask-origin-y: calc(50% + var(--offset)); }
        :host([data-inner-pos="bottom-left"]) #icon-wrapper { --mask-origin-x: calc(50% - var(--offset)); --mask-origin-y: calc(50% + var(--offset)); }

        ::slotted([slot="icon"]) {
          display: block;
          max-width: 100%;
          height: auto;
          font-size: var(--icon-size, 48px);
        }

        .badge-container {
          position: absolute;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
          min-width: 1px;
        }

        :host([data-inner-pos="top-right"]) .badge-container {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translate(var(--offset), calc(-1 * var(--offset))) scale(var(--scale));
        }
        :host([data-inner-pos="top-left"]) .badge-container {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translate(calc(-1 * var(--offset)), calc(-1 * var(--offset))) scale(var(--scale));
        }
        :host([data-inner-pos="bottom-right"]) .badge-container {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translate(var(--offset), var(--offset)) scale(var(--scale));
        }
        :host([data-inner-pos="bottom-left"]) .badge-container {
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) translate(calc(-1 * var(--offset)), var(--offset)) scale(var(--scale));
        }

        ::slotted([slot="decorator"]) {
          display: flex !important;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          box-sizing: border-box;
          padding: var(--decorator-padding);
          overflow: hidden;
        }
      </style>

      <div id="icon-wrapper">
        <slot name="icon"></slot>
      </div>

      <div class="badge-container" aria-hidden="true">
        <slot name="decorator"></slot>
      </div>
    `;

    this.updateStyles();
    this.initResizeObserver();
    
    // Show after rendering is complete
    requestAnimationFrame(() => {
      this.style.display = 'inline-flex';
    });
  }
}

customElements.define('icon-decorator', IconDecorator);
