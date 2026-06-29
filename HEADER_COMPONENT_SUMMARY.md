# Header Component Documentation

## Overview
A fully responsive, accessible header component built with Next.js and CSS Modules, following BEM naming conventions and mobile-first design approach.

## Files Created

### 1. `/src/app/(frontend)/components/header/Header.jsx`
React component with the following features:
- **Logo**: Inline SVG (Visvas logo) with hover effects
- **Mobile Navigation**: Hamburger menu button that toggles navigation
- **Responsive Navigation**: Menu items with dropdown support for Projects
- **Contact Section**: Displays phone number on both mobile and desktop
- **CTA Button**: "Enquiry Now" button in both header and mobile menu
- **Accessibility**: Proper ARIA labels, keyboard navigation support
- **State Management**: Menu open/close state with scroll locking

### 2. `/src/app/(frontend)/components/header/Header.module.css`
Comprehensive styling with:
- **Design Tokens**: CSS custom properties for colors, spacing, typography
- **Breakpoints**:
  - Mobile: Base styles
  - Tablet (768px+): Adjusted spacing
  - Desktop (1024px+): Full navigation display
- **BEM Naming**: All classes follow `header__element--modifier` convention with kebab-case
- **Features**:
  - Mobile-first responsive design
  - Smooth transitions and animations
  - Hover effects on navigation links
  - Hamburger menu animation (3-line to X)
  - Scroll lock when menu is open
  - Keyboard focus states
  - Reduced motion support
  - High contrast mode support
  - Dark mode support

## Files Modified

### 1. `/src/app/(frontend)/layout.js`
- Imported Header component
- Added `<Header />` to the layout before `{children}`
- Updated metadata (title and description)

### 2. `/src/app/globals.css`
- Added Raleway font import from Google Fonts
- Updated default font-family to use Raleway

## How It Works

### Mobile (Mobile First Approach)
1. Hamburger menu button visible on right
2. Clicking hamburger toggles navigation overlay
3. When menu opens:
   - `open-menu` class added to `<html>` and `<body>`
   - `overflow: hidden` applied to prevent scrolling
   - Full-screen navigation menu appears
4. Contact info and CTA button visible in mobile menu footer
5. Clicking any navigation link closes the menu

### Desktop (1024px and above)
1. Hamburger menu button hidden
2. Navigation items displayed horizontally next to logo
3. Contact info displayed on right side
4. CTA button always visible on right
5. Desktop right section shows side-by-side layout

## Color System
- **Primary Green**: `#1e5f2f` (buttons, accents)
- **Accent Gold**: `#e4a025` (underlines, hover effects)
- **Text Dark**: `#000000` (default text)
- **Text Sub**: `#4b4b4b` (secondary text)
- **Border**: `#e0e0e0` (dividers)
- **Background**: `#ffffff` (default background)

## Key CSS Classes (BEM Convention)

### Block: `header`
```
.header                          - Main header element
.header__container               - Logo + menu area wrapper
.header__right                   - Desktop-only right section
```

### Elements under Container
```
.header__logo                    - Logo link
.header__menu-toggle             - Hamburger button
.header__hamburger               - Hamburger icon (3 lines)
.header__nav                     - Navigation menu
.header__nav-list                - Navigation ul
.header__nav-item                - Navigation li
.header__nav-link                - Navigation link/button
.header__nav-footer              - Mobile-only contact section
```

### Modifiers
```
.header__nav--open               - When menu is open
.header__nav-link--with-dropdown - Link with dropdown icon
```

## How to Use the Component

### Basic Usage
The Header component is automatically included in the frontend layout:

```jsx
import Header from './components/header/Header'

export default function FrontendLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
      </body>
    </html>
  )
}
```

### Customization

#### Add/Remove Navigation Links
Edit `/src/app/(frontend)/components/header/Header.jsx`, update the navigation items in the `<nav>` section:

```jsx
<li className={styles['header__nav-item']}>
  <Link href="/your-page" className={styles['header__nav-link']}>
    Your Link
  </Link>
</li>
```

#### Update Colors
Modify the CSS custom properties in `Header.module.css`:

```css
:root {
  --header-color-primary: #your-color;
  --header-color-accent: #your-color;
  /* ... other variables */
}
```

#### Change Contact Information
Update the phone number and links in the Header component JSX.

#### Update CTA Button Text/Action
Modify the button text and `onClick` handler in the Header component.

## Accessibility Features
- ✅ Semantic HTML (header, nav, button, link elements)
- ✅ ARIA labels on hamburger button (`aria-label`, `aria-expanded`, `aria-controls`)
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ High contrast mode support
- ✅ Reduced motion preferences respected
- ✅ Screen reader friendly

## Browser Support
- All modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome for Android)
- Requires CSS custom properties support

## Testing the Component

### Run the Development Server
```bash
npm run dev
```

Visit `http://localhost:3000` to see the header in action.

### Test Mobile Responsiveness
1. Use browser DevTools to set viewport to:
   - Mobile: 375x667
   - Tablet: 768x1024
   - Desktop: 1440x900

2. Test hamburger menu:
   - Click hamburger on mobile
   - Verify menu opens with overlay
   - Verify scroll is locked (body has `overflow: hidden`)
   - Click a link to close menu

3. Test keyboard navigation:
   - Press Tab to navigate links
   - Verify focus states are visible
   - Test with reduced motion enabled

## Production Deployment
No additional setup required. The component will work as-is in production. All styles are scoped via CSS Modules, and the component uses Next.js best practices.

## Notes
- The logo SVG is inline for optimal performance
- All transitions respect `prefers-reduced-motion`
- The component is a client component (`'use client'`) only where necessary for interactivity
- CSS is scoped to prevent style conflicts with other components
