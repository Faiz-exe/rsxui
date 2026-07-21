import { useCallback, useRef } from 'react'

/**
 * Ripple effect hook.
 *
 * - Diameter  = Math.max(button width, button height)
 * - Scale     = scale(0) → scale(2.5)
 * - Duration  = 400 ms, linear
 * - Color     = rgba(255,255,255,0.5) on solid buttons
 *               currentColor @ 20 % opacity on outlined / text buttons
 *
 * Performance:
 * - Entirely compositor-driven (`transform` + `opacity`) — zero layout/paint.
 * - `animationend` cleanup — no timers, no memory leaks.
 * - `prefers-reduced-motion` respected at both JS and CSS levels.
 *
 * @param solidBackground — pass `true` (default) for solid/filled buttons,
 *                          `false` for outlined or text/ghost buttons.
 */

const RIPPLE_CLASS = 'rsxui-ripple'
const RIPPLE_ACTIVE_CLASS = 'rsxui-ripple-active'
const DURATION_MS = 400

/** Injects the stylesheet once, idempotently. */
function ensureStyles() {
  if (document.getElementById('rsxui-ripple-style')) return

  const style = document.createElement('style')
  style.id = 'rsxui-ripple-style'
  style.textContent = `
/* Base state — invisible circle at scale(0) */
@media (prefers-reduced-motion: no-preference) {
  .${RIPPLE_CLASS} {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
    /* Start at zero size at the click origin */
    transform: scale(0);
    /* opacity lives on the element so we can override per variant */
  }
  /* Active state — expand and fade */
  .${RIPPLE_ACTIVE_CLASS} {
    animation: rsxui-ripple-expand ${DURATION_MS}ms linear forwards;
  }
}
@keyframes rsxui-ripple-expand {
  to {
    transform: scale(2.5);
    opacity: 0;
  }
}
`
  document.head.appendChild(style)
}

export function useRipple<T extends HTMLElement = HTMLButtonElement>(
  /** Use white ripple (solid buttons) or currentColor ripple (outlined/text). */
  solidBackground = true,
) {
  const ref = useRef<T>(null)

  const onPointerDown = useCallback(
    (e: React.PointerEvent<T>) => {
      const el = ref.current
      if (!el || el.hasAttribute('disabled')) return

      // Respect OS "reduce motion" preference — skip the effect entirely.
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

      ensureStyles()

      const rect = el.getBoundingClientRect()

      // PrimeReact sizing: use the larger of width/height so the ripple
      // always covers the whole button when expanded to scale(2.5).
      const diameter = Math.max(rect.width, rect.height)
      const radius = diameter / 2

      const ripple = document.createElement('span')
      ripple.className = RIPPLE_CLASS

      // Position the centre of the ripple at the pointer contact point.
      ripple.style.cssText = [
        `width:${diameter}px`,
        `height:${diameter}px`,
        `left:${e.clientX - rect.left - radius}px`,
        `top:${e.clientY - rect.top - radius}px`,
        // Solid buttons: white @ 50 % alpha — identical to PrimeReact rgba(255,255,255,0.5)
        // Outlined / text: accent color @ 20 % — looks correct on transparent bg
        `background:${solidBackground ? 'rgba(255,255,255,0.5)' : 'currentColor'}`,
        solidBackground ? '' : 'opacity:0.2',
      ]
        .filter(Boolean)
        .join(';')

      el.appendChild(ripple)

      // Trigger reflow so the browser registers the initial transform: scale(0)
      // before we apply the active class that starts the animation.
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ripple.offsetWidth // intentional forced reflow

      ripple.classList.add(RIPPLE_ACTIVE_CLASS)

      // Remove the element as soon as the animation finishes — no setTimeout.
      ripple.addEventListener('animationend', () => ripple.remove(), { once: true })
    },
    [solidBackground],
  )

  return { ref, onPointerDown } as const
}
