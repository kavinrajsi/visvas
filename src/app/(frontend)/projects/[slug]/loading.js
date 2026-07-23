// Override the parent /projects grid skeleton for the detail route: no
// preloader here. An empty Suspense fallback shows nothing while the page
// streams in, rather than a grid skeleton that does not match this layout.
export default function Loading() {
  return null
}
