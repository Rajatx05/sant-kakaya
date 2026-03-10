# ForeverMatch Design System Reference
**Last Updated:** November 15, 2025

## 🎨 Color Palette

### Primary Colors (From globals.css)
```css
--primary: #E91E63           /* Rose Pink - Main brand color */
--muted: #F8BBD0             /* Light Pink - Accents */
--background: #FAFAFA        /* Off-white - Page background */
--foreground: #212121        /* Dark Gray - Text */
```

### Tailwind Gradient System
For consistency across the app, use these exact gradient combinations:

**Primary Button Gradient:**
```tsx
className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"
```

**Background Gradients:**
```tsx
// Light background
className="bg-gradient-to-br from-rose-100 to-pink-100"

// Bold background
className="bg-gradient-to-br from-rose-500 to-pink-500"
```

### Semantic Colors
- **Success**: `from-green-500 to-emerald-600`
- **Warning**: `from-amber-500 to-orange-500`
- **Error**: `from-red-500 to-rose-500`
- **Info**: `from-blue-500 to-indigo-500`

---

## 📝 Typography

### Font Families
```css
Body Text: 'Roboto', sans-serif
Headings/Buttons: 'Poppins', sans-serif
```

### Font Sizes (Use Tailwind Classes)
**IMPORTANT:** Only use these classes when explicitly needed. Default HTML typography is set in globals.css.

- `text-xs` (12px) - Captions, tiny labels
- `text-sm` (14px) - Secondary text, metadata
- `text-base` (16px) - Body text (default)
- `text-lg` (18px) - Large body text
- `text-xl` (20px) - Small headings
- `text-2xl` (24px) - Section headings (h3)
- `text-3xl` (30px) - Page headings (h2)
- `text-4xl` (36px) - Hero headings (h1)

### Font Weights
- `font-normal` (400) - Body text
- `font-medium` (500) - Emphasized text
- `font-semibold` (600) - Subheadings, buttons
- `font-bold` (700) - Headings

---

## 📏 Spacing System

### Component Padding
```tsx
// Cards
className="p-4 sm:p-5 md:p-6"

// Sections
className="py-12 md:py-16 lg:py-20"

// Containers
className="px-4 sm:px-6 lg:px-8"
```

### Gaps Between Elements
```tsx
// Tight spacing
className="gap-2"          // 8px

// Standard spacing
className="gap-4"          // 16px

// Loose spacing
className="gap-6 md:gap-8" // 24px to 32px
```

### Margins
```tsx
// Small
className="mb-4"           // 16px

// Medium
className="mb-6"           // 24px

// Large
className="mb-8 md:mb-12"  // 32px to 48px
```

---

## 🔘 Button System

### Primary Button (Main CTAs)
```tsx
<Button
  className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-12 px-6 shadow-lg"
>
  Button Text
</Button>
```

### Secondary Button (Alternative actions)
```tsx
<Button
  variant="outline"
  className="border-rose-200 text-rose-600 hover:bg-rose-50 h-12 px-6"
>
  Button Text
</Button>
```

### Button Sizes
- **Small**: `h-9 px-4 text-sm`
- **Medium**: `h-10 sm:h-11 px-5 text-sm sm:text-base`
- **Large**: `h-12 sm:h-14 px-6 sm:px-8 text-base`

### Button States
- Hover: Add `transition-all duration-200`
- Disabled: Automatically handled by Button component
- Active: Add `active:scale-95`

---

## 🎴 Card System

### Standard Card
```tsx
<Card className="p-6 bg-white border-rose-100 shadow-lg hover:shadow-xl transition-all">
  {/* Card content */}
</Card>
```

### Card Variants
```tsx
// With gradient background
className="bg-gradient-to-br from-rose-50 to-pink-50 border-rose-100"

// Elevated card
className="shadow-xl hover:shadow-2xl transition-shadow duration-300"

// Interactive card
className="hover:scale-105 transition-transform duration-200 cursor-pointer"
```

---

## 📱 Responsive Breakpoints

### Tailwind Breakpoints
- **Mobile**: `< 640px` (default)
- **SM (Small Tablet)**: `sm:` ≥ 640px
- **MD (Tablet)**: `md:` ≥ 768px
- **LG (Desktop)**: `lg:` ≥ 1024px
- **XL (Large Desktop)**: `xl:` ≥ 1280px

### Responsive Patterns
```tsx
// Mobile-first approach
className="flex flex-col md:flex-row gap-4 md:gap-6"

// Responsive sizing
className="text-lg md:text-xl lg:text-2xl"

// Responsive visibility
className="hidden md:block"
```

---

## 🎭 Component Patterns

### Icon with Text
```tsx
<div className="flex items-center gap-2">
  <Icon className="w-4 h-4 text-rose-500" />
  <span className="text-sm text-gray-600">Text</span>
</div>
```

### Badge Component
```tsx
<Badge className="bg-gradient-to-r from-rose-500 to-pink-500">
  Premium
</Badge>
```

### Profile Image Container
```tsx
<div className="relative w-full h-full overflow-hidden rounded-lg">
  <img 
    src={imageUrl} 
    alt={alt}
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
  />
</div>
```

---

## ✨ Shadows & Effects

### Shadow Scale
```tsx
// Subtle
className="shadow-sm"

// Standard
className="shadow-md"

// Elevated
className="shadow-lg"

// Dramatic
className="shadow-xl"

// Extreme (modals, overlays)
className="shadow-2xl"
```

### Hover Effects
```tsx
// Standard hover
className="hover:shadow-xl transition-shadow duration-300"

// Transform hover
className="hover:scale-105 transition-transform duration-200"

// Combined
className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
```

---

## 🔄 Transitions & Animations

### Standard Transitions
```tsx
// Quick
className="transition-colors duration-150"

// Standard
className="transition-all duration-200"

// Smooth
className="transition-all duration-300"
```

### Common Animation Patterns
```tsx
// Fade in
className="animate-in fade-in duration-300"

// Slide up
className="animate-in slide-in-from-bottom-4 duration-500"

// Scale in
className="animate-in zoom-in duration-200"
```

---

## 📋 Form Elements

### Input Field
```tsx
<Input
  className="h-11 sm:h-12 bg-white border-gray-200 focus:border-rose-300 focus:ring-rose-200"
  placeholder="Enter text"
/>
```

### Select Dropdown
```tsx
<Select>
  <SelectTrigger className="h-11 sm:h-12 bg-white border-gray-200">
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
  </SelectContent>
</Select>
```

### Textarea
```tsx
<Textarea
  className="min-h-[120px] bg-white border-gray-200 focus:border-rose-300 focus:ring-rose-200 resize-none"
  placeholder="Enter description"
/>
```

---

## 🎯 Layout Patterns

### Page Container
```tsx
<div className="min-h-screen py-12 pb-24 md:pb-12">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Page content */}
  </div>
</div>
```

### Two Column Layout
```tsx
<div className="grid md:grid-cols-2 gap-6">
  <div>{/* Left column */}</div>
  <div>{/* Right column */}</div>
</div>
```

### Three Column Grid
```tsx
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  {/* Grid items */}
</div>
```

---

## ⚠️ Important Rules

### DO's ✅
1. Always use the standard gradient: `from-rose-500 to-pink-500`
2. Use `shadow-lg` for elevated components
3. Add `transition-all duration-200` for interactive elements
4. Use `h-12 sm:h-14` for primary buttons
5. Include `touch-manipulation` for mobile buttons
6. Use `gap-4` or `gap-6` for consistent spacing
7. Apply `rounded-lg` or `rounded-xl` for cards
8. Use semantic color names (rose, pink, not arbitrary hex)

### DON'Ts ❌
1. Don't use arbitrary font sizes - stick to Tailwind scale
2. Don't mix different gradient combinations
3. Don't use inconsistent button heights
4. Don't forget responsive modifiers (sm:, md:, lg:)
5. Don't use pixel values - use Tailwind spacing
6. Don't create custom colors - use theme colors
7. Don't use different shadow styles in similar components
8. Don't forget hover states on interactive elements

---

## 🧩 Component Checklist

When creating or updating any component, ensure:

- [ ] Uses theme colors from the palette
- [ ] Has responsive breakpoints where needed
- [ ] Includes hover/focus states for interactive elements
- [ ] Uses consistent spacing (gap-4, p-6, etc.)
- [ ] Has appropriate shadows for elevation
- [ ] Uses standard button heights (h-9, h-12, h-14)
- [ ] Includes smooth transitions
- [ ] Follows mobile-first responsive design
- [ ] Uses semantic HTML elements
- [ ] Has proper accessibility attributes

---

**This design system ensures visual consistency across the entire ForeverMatch application.**
