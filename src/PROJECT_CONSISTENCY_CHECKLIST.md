# ForeverMatch - Project Consistency Checklist
**Use this checklist when creating or updating any component**

---

## ✅ Before You Code

### 1. Review Reference Documents
- [ ] Read `/DESIGN_SYSTEM.md` for comprehensive design rules
- [ ] Check `/STYLE_GUIDE.md` for copy-paste patterns
- [ ] Look at `/DESIGN_SYSTEM_REFERENCE.md` for quick reference

### 2. Check Existing Components
- [ ] Review similar components in `/components`
- [ ] Copy styling from existing components when possible
- [ ] Maintain the same structure and patterns

---

## 🎨 Color System Checklist

### Primary Gradient (Required for all CTAs)
```tsx
✅ bg-gradient-to-r from-rose-500 to-pink-500
✅ hover:from-rose-600 hover:to-pink-600
```

### Common Colors
- [ ] Used `text-gray-800` for headings (NOT black)
- [ ] Used `text-gray-600` for body text
- [ ] Used `border-rose-100` for card borders
- [ ] Used `bg-white` or `bg-gray-50` for backgrounds

### Semantic Colors
- [ ] Success: `from-green-500 to-emerald-600`
- [ ] Warning: `from-amber-500 to-orange-500`
- [ ] Error: `from-red-500 to-rose-500`
- [ ] Info: `from-blue-500 to-indigo-500`

---

## 🔘 Button Checklist

### Standard Button Classes
```tsx
Primary: bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600
Secondary: border-2 border-rose-200 text-rose-600 hover:bg-rose-50
```

### Button Heights
- [ ] Small buttons: `h-10` (40px minimum)
- [ ] Medium buttons: `h-12` (48px standard)
- [ ] Large buttons: `h-14` (56px for CTAs)

### Button Must-Haves
- [ ] Added `shadow-lg` for primary buttons
- [ ] Added `transition-all duration-200`
- [ ] Added `touch-manipulation` for mobile
- [ ] Added `px-6` or `px-8` for proper padding
- [ ] Added hover state changes

### Button with Icons
- [ ] Icon size: `w-4 h-4` (standard)
- [ ] Gap between icon and text: `gap-2`
- [ ] Icon position: left side for actions, right for navigation

---

## 🎴 Card Checklist

### Standard Card Classes
```tsx
✅ p-6 (padding)
✅ bg-white (background)
✅ border-rose-100 (border color)
✅ shadow-lg (elevation)
✅ hover:shadow-xl (hover state)
✅ transition-all duration-300 (smooth animation)
```

### Card Variants
- [ ] Interactive cards have `cursor-pointer`
- [ ] Profile cards have `overflow-hidden`
- [ ] Info cards use gradient backgrounds
- [ ] All cards have proper hover states

### Card Content
- [ ] Headings use `text-xl text-gray-800 mb-4`
- [ ] Body text uses `text-gray-600`
- [ ] Proper spacing with `space-y-4` or `gap-4`

---

## 📱 Responsive Design Checklist

### Mobile-First Approach
- [ ] Default styles are mobile-optimized
- [ ] Added `sm:` breakpoint (≥640px)
- [ ] Added `md:` breakpoint (≥768px)
- [ ] Added `lg:` breakpoint (≥1024px)

### Common Responsive Patterns
```tsx
✅ text-2xl sm:text-3xl md:text-4xl (responsive text)
✅ flex flex-col md:flex-row (stack on mobile)
✅ grid md:grid-cols-2 gap-6 (responsive grid)
✅ p-4 sm:p-6 md:p-8 (responsive padding)
✅ h-11 sm:h-12 md:h-14 (responsive height)
```

### Mobile Optimization
- [ ] Added `pb-24 md:pb-12` for bottom nav spacing
- [ ] Used `touch-manipulation` on interactive elements
- [ ] Minimum touch target: `h-11` (44px)
- [ ] Full width on mobile: `w-full sm:w-auto`

---

## 📝 Typography Checklist

### Font Sizes (Use sparingly - defaults are set)
- [ ] `text-xs` (12px) - Captions only
- [ ] `text-sm` (14px) - Secondary text
- [ ] `text-base` (16px) - Body text (DEFAULT)
- [ ] `text-lg` (18px) - Large paragraphs
- [ ] `text-xl` (20px) - Card titles
- [ ] `text-2xl` (24px) - Section subheadings
- [ ] `text-3xl` (30px) - Section headings
- [ ] `text-4xl` (36px) - Page titles

### Font Weights
- [ ] `font-normal` (400) - Body text
- [ ] `font-medium` (500) - Labels
- [ ] `font-semibold` (600) - Buttons, subheadings
- [ ] `font-bold` (700) - Major headings

### Typography Rules
- [ ] Headings use Poppins (automatic)
- [ ] Body text uses Roboto (automatic)
- [ ] No arbitrary font sizes
- [ ] Proper heading hierarchy (h1→h2→h3→h4)

---

## 📐 Spacing Checklist

### Standard Gaps
- [ ] Tight: `gap-2` (8px)
- [ ] Standard: `gap-4` (16px)
- [ ] Loose: `gap-6` (24px)
- [ ] Extra: `gap-8` (32px)

### Padding Standards
- [ ] Cards: `p-6` (24px)
- [ ] Sections: `py-12` (48px)
- [ ] Containers: `px-4 sm:px-6 lg:px-8`

### Margins
- [ ] Small: `mb-4` (16px)
- [ ] Medium: `mb-6` (24px)
- [ ] Large: `mb-8` or `mb-12` (32-48px)

### Spacing Rules
- [ ] Use `gap-{n}` instead of margins in flex/grid
- [ ] No arbitrary spacing values
- [ ] Consistent rhythm throughout

---

## ✨ Effects & Transitions Checklist

### Shadows
- [ ] Subtle: `shadow-sm`
- [ ] Standard: `shadow-md`
- [ ] Elevated: `shadow-lg`
- [ ] Hover: `shadow-xl`
- [ ] Dramatic: `shadow-2xl`

### Transitions
- [ ] Quick: `transition-colors duration-200`
- [ ] Standard: `transition-all duration-200`
- [ ] Smooth: `transition-all duration-300`
- [ ] Slow: `transition-all duration-500`

### Hover Effects Checklist
- [ ] All clickable elements have hover states
- [ ] Buttons expand shadow on hover
- [ ] Cards scale slightly: `hover:scale-[1.02]`
- [ ] Icons translate on hover
- [ ] Added `group` for parent-child hover

---

## 📋 Form Elements Checklist

### Input Fields
```tsx
✅ h-11 sm:h-12 (responsive height)
✅ bg-white (background)
✅ border-gray-200 (border)
✅ focus:border-rose-300 (focus border)
✅ focus:ring-rose-200 (focus ring)
```

### Select Dropdowns
- [ ] Same height as inputs: `h-11 sm:h-12`
- [ ] Same styling as inputs
- [ ] Proper placeholder text

### Textareas
- [ ] Minimum height: `min-h-[100px]`
- [ ] Added `resize-none` if needed
- [ ] Same border styling as inputs

### Labels
- [ ] Used `text-sm font-medium text-gray-700`
- [ ] Added `space-y-2` wrapper for label+input

---

## 🎯 Common Patterns Checklist

### Page Container
```tsx
✅ min-h-screen py-12 pb-24 md:pb-12
✅ max-w-6xl mx-auto px-4 sm:px-6 lg:px-8
```

### Section Header
- [ ] Icon badge with gradient background
- [ ] Centered heading with proper size
- [ ] Description paragraph below
- [ ] Margin bottom: `mb-12`

### Back Button
```tsx
✅ flex items-center gap-2
✅ text-gray-600 hover:text-rose-600
✅ group (for icon animation)
✅ touch-manipulation
```

### Empty State
- [ ] Large icon in gradient circle
- [ ] Heading explaining state
- [ ] Description text
- [ ] CTA button to take action

---

## 🔍 Accessibility Checklist

### Focus States
- [ ] All interactive elements have visible focus
- [ ] Added `focus:ring-2 focus:ring-rose-400`
- [ ] Added `focus:outline-none` where appropriate

### Semantic HTML
- [ ] Used proper heading hierarchy
- [ ] Used semantic elements (header, nav, main, section, footer)
- [ ] Added `aria-label` where needed

### Touch Targets
- [ ] Minimum height: `h-11` (44px)
- [ ] Added `touch-manipulation` to buttons
- [ ] Adequate spacing between touch targets

### Keyboard Navigation
- [ ] All interactive elements are focusable
- [ ] Tab order makes sense
- [ ] Added keyboard shortcuts where appropriate

---

## 🚫 Common Mistakes to Avoid

### Colors
- [ ] ❌ Don't use pure black `#000` or `text-black`
- [ ] ❌ Don't mix different gradient combinations
- [ ] ❌ Don't use colors outside the palette

### Spacing
- [ ] ❌ Don't use arbitrary values like `w-[234px]`
- [ ] ❌ Don't use pixel values - use Tailwind scale
- [ ] ❌ Don't forget mobile padding

### Typography
- [ ] ❌ Don't use font size classes unless necessary
- [ ] ❌ Don't use more than 3 font sizes per section
- [ ] ❌ Don't mix font families

### Buttons
- [ ] ❌ Don't create buttons smaller than `h-10`
- [ ] ❌ Don't forget hover states
- [ ] ❌ Don't skip `touch-manipulation` on mobile

### Responsive
- [ ] ❌ Don't test only on desktop
- [ ] ❌ Don't forget breakpoint modifiers
- [ ] ❌ Don't ignore mobile bottom navigation spacing

---

## ✅ Final Checks

### Before Committing Code
- [ ] Tested on mobile viewport (375px)
- [ ] Tested on tablet viewport (768px)
- [ ] Tested on desktop viewport (1280px+)
- [ ] All buttons have proper hover states
- [ ] All interactive elements are touch-friendly
- [ ] Colors match the design system
- [ ] Spacing is consistent with other components
- [ ] Typography follows the hierarchy
- [ ] No console errors
- [ ] No accessibility warnings

### Code Quality
- [ ] No duplicate or redundant styles
- [ ] Used semantic class names
- [ ] Followed existing component patterns
- [ ] Added comments for complex logic
- [ ] Imported only necessary components

### Design Consistency
- [ ] Matches visual style of existing pages
- [ ] Uses standard components (Button, Card, etc.)
- [ ] Follows the established color palette
- [ ] Maintains spacing rhythm
- [ ] Looks professional and polished

---

## 📚 Quick Reference

**Colors:** Rose/Pink gradient (`from-rose-500 to-pink-500`)  
**Buttons:** h-12, px-6, shadow-lg  
**Cards:** p-6, border-rose-100, shadow-lg  
**Spacing:** gap-4, mb-6, py-12  
**Text:** text-gray-800 (headings), text-gray-600 (body)  
**Hover:** transition-all duration-200, hover:shadow-xl  
**Mobile:** pb-24 md:pb-12, touch-manipulation

---

## 🎨 When in Doubt

1. **Look at existing components first**
2. **Copy styling from similar elements**
3. **Use the Style Guide for quick patterns**
4. **Check the Design System for rules**
5. **Test on mobile before considering it done**

---

**✨ Follow this checklist for every component to maintain perfect consistency!**
