(function () {
  const storageKey = 'theme_preference';
  const root = document.documentElement;
  const toggle = document.getElementById('dark-mode-toggle');

  if (!toggle) return;

  const darkIcon = toggle.querySelector('#dark-icon');
  const lightIcon = toggle.querySelector('#light-icon');
  const reduceMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isTransitioning = false;

  function applyTheme(theme, persist) {
    const isDark = theme === 'dark';

    root.classList.toggle('dark-mode', isDark);
    root.style.colorScheme = theme;
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    toggle.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';

    if (darkIcon) darkIcon.hidden = isDark;
    if (lightIcon) lightIcon.hidden = !isDark;

    if (persist) localStorage.setItem(storageKey, theme);
  }

  applyTheme(root.classList.contains('dark-mode') ? 'dark' : 'light', false);

  toggle.addEventListener('click', function () {
    if (isTransitioning) return;

    const nextTheme = root.classList.contains('dark-mode') ? 'light' : 'dark';

    if (!document.startViewTransition || reduceMotionQuery.matches) {
      applyTheme(nextTheme, true);
      return;
    }

    const rect = toggle.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    isTransitioning = true;
    root.classList.add('theme-transitioning');

    const transition = document.startViewTransition(function () {
      applyTheme(nextTheme, true);
    });

    transition.ready.then(function () {
      return root.animate(
        {
          clipPath: [
            'circle(0px at ' + x + 'px ' + y + 'px)',
            'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)'
          ]
        },
        {
          duration: 460,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      ).finished;
    }).catch(function () {
      // The theme has already changed; only the optional reveal animation failed.
    });

    transition.finished.finally(function () {
      root.classList.remove('theme-transitioning');
      isTransitioning = false;
    });
  });

  const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
  const handleSystemThemeChange = function (event) {
    if (localStorage.getItem(storageKey) === null) {
      applyTheme(event.matches ? 'dark' : 'light', false);
    }
  };

  if (colorSchemeQuery.addEventListener) {
    colorSchemeQuery.addEventListener('change', handleSystemThemeChange);
  } else if (colorSchemeQuery.addListener) {
    colorSchemeQuery.addListener(handleSystemThemeChange);
  }
}());
