// Blog Navigation Component
class BlogNavigation {
  constructor(config) {
    this.config = config;
  }

  // Theme toggle functionality
  renderThemeToggle() {
    return `
      <button id="theme-toggle" class="theme-toggle" aria-label="Toggle theme">
        <svg id="sun-icon" class="hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="12" cy="12" r="5"/>
          <line x1="12" y1="1" x2="12" y2="3"/>
          <line x1="12" y1="21" x2="12" y2="23"/>
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
          <line x1="1" y1="12" x2="3" y2="12"/>
          <line x1="21" y1="12" x2="23" y2="12"/>
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
        </svg>
        <svg id="moon-icon" class="hidden" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
        </svg>
      </button>
    `;
  }

  // Main navigation
  render(currentPage = "blog") {
    const navLinks = this.config.navigation
      .map((item) => {
        const isActive = item.href.includes(currentPage);
        return `
          <a href="${item.href}" 
             class="nav-link ${
               isActive ? "font-medium text-black dark:text-white" : ""
             }">
            ${item.label}
          </a>
        `;
      })
      .join("");

    return `
      <nav class="mt-10 md:mt-16 flex items-center justify-between">
        <a href="/" class="text-2xl md:text-3xl font-bold tracking-tight text-black dark:text-white hover:opacity-70 transition-opacity">
          ${this.config.site.author}
        </a>
        
        <div class="flex items-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
          ${navLinks}
          ${this.renderThemeToggle()}
        </div>
      </nav>
      <hr class="mt-8 border-zinc-200 dark:border-zinc-800" />
    `;
  }

  // Simplified navigation for article pages
  renderArticleNav(backUrl, backLabel) {
    return `
      <nav class="mt-10 flex items-center justify-between">
        <a href="${backUrl}" class="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
          ← ${backLabel}
        </a>
        
        <div class="flex items-center gap-6">
          <a href="/" class="text-sm text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white transition-colors">
            Home
          </a>
          ${this.renderThemeToggle()}
        </div>
      </nav>
    `;
  }

  // Initialize navigation
  init(
    containerId = "main-nav",
    currentPage = "blog",
    isArticle = false,
    backUrl = null,
    backLabel = null
  ) {
    const container = document.getElementById(containerId);
    if (container) {
      if (isArticle && backUrl && backLabel) {
        container.innerHTML = this.renderArticleNav(backUrl, backLabel);
      } else {
        container.innerHTML = this.render(currentPage);
      }

      // Initialize theme toggle after rendering
      this.initThemeToggle();
    }
  }

  // Theme toggle initialization
  initThemeToggle() {
    const toggle = document.getElementById("theme-toggle");
    const sunIcon = document.getElementById("sun-icon");
    const moonIcon = document.getElementById("moon-icon");

    if (!toggle || !sunIcon || !moonIcon) return;

    // Set initial icon state
    const isDark = document.documentElement.classList.contains("dark");
    if (isDark) {
      sunIcon.classList.remove("hidden");
      moonIcon.classList.add("hidden");
    } else {
      moonIcon.classList.remove("hidden");
      sunIcon.classList.add("hidden");
    }

    toggle.addEventListener("click", () => {
      const html = document.documentElement;
      const isDarkNow = html.classList.contains("dark");

      if (isDarkNow) {
        html.classList.remove("dark");
        localStorage.setItem("theme", "light");
        moonIcon.classList.remove("hidden");
        sunIcon.classList.add("hidden");
      } else {
        html.classList.add("dark");
        localStorage.setItem("theme", "dark");
        sunIcon.classList.remove("hidden");
        moonIcon.classList.add("hidden");
      }
    });
  }
}

// Export for use in other modules
if (typeof module !== "undefined" && module.exports) {
  module.exports = BlogNavigation;
}
