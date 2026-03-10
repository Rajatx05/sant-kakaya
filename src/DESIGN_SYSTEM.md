# ForeverMatch Design System
**Version:** 2.0  
**Last Updated:** November 15, 2025  
**Project:** ForeverMatch Matrimonial Web Application

---

## 🎨 Color System

### Brand Colors (From globals.css)
```css
Primary Brand:     #E91E63  (Rose Pink)
Light Accent:      #F8BBD0  (Soft Pink)
Background:        #FAFAFA  (Off White)
Text Primary:      #212121  (Dark Gray)
```

### Tailwind Gradient Palette (STANDARD - Use Everywhere)
```tsx
// Primary Button & Accent Gradient
className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600"

// Light Background Gradient
className="bg-gradient-to-br from-rose-50 to-pink-50"
className="bg-gradient-to-br from-rose-100 to-pink-100"

// Icon/Badge Gradient
className="bg-gradient-to-br from-rose-500 to-pink-500"
```

### Semantic Colors
```tsx
Success:   from-green-500 to-emerald-600
Warning:   from-amber-500 to-orange-500
Error:     from-red-500 to-rose-500
Info:      from-blue-500 to-indigo-500
```

### Neutral Scale (Grays)
```tsx
Gray Backgrounds:  bg-gray-50, bg-gray-100
Borders:           border-gray-200, border-gray-300
Secondary Text:    text-gray-500, text-gray-600
Primary Text:      text-gray-700, text-gray-800
Dark Elements:     bg-gray-800, bg-gray-900
```

---

## 📝 Typography System

### Font Families
```css
Body & Inputs:     'Roboto', sans-serif
Headings & Buttons: 'Poppins', sans-serif
```

### Font Size Scale (Mobile-First)
```tsx
// Captions & Fine Print
text-xs      // 12px - Badges, timestamps, helper text

// Body Text & Labels
text-sm      // 14px - Secondary text, labels
text-base    // 16px - PRIMARY body text (default)
text-lg      // 18px - Emphasized paragraphs

// Headings
text-xl      // 20px - Card titles (h4)
text-2xl     // 24px - Section subheadings (h3)
text-3xl     // 30px - Section headings (h2)
text-4xl     // 36px - Page titles (h1)
text-5xl     // 48px - Hero headlines (desktop only)
```

### Font Weights
```tsx
font-normal     // 400 - Body text
font-medium     // 500 - Labels, emphasized text
font-semibold   // 600 - Buttons, subheadings
font-bold       // 700 - Major headings
```

### Responsive Typography Pattern
```tsx
// Hero Heading
className="text-3xl sm:text-4xl md:text-5xl"

// Page Title
className="text-2xl sm:text-3xl md:text-4xl"

// Section Heading
className="text-xl sm:text-2xl md:text-3xl"
```

---

## 📐 Spacing System

### Standard Spacing Scale
```tsx
gap-2     // 8px   - Tight spacing (icon + text)
gap-3     // 12px  - Close elements
gap-4     // 16px  - Standard spacing
gap-6     // 24px  - Section spacing
gap-8     // 32px  - Large gaps
```

### Padding Standards
```tsx
// Cards & Components
p-4       // Mobile: 16px
p-6       // Desktop: 24px
p-8       // Large cards: 32px

// Sections
py-12     // Top/bottom: 48px
py-16     // Top/bottom: 64px

// Containers
px-4 sm:px-6 lg:px-8  // Responsive horizontal padding
```

### Margin Standards
```tsx
mb-2      // 8px   - Tight bottom margin
mb-4      // 16px  - Standard bottom margin
mb-6      // 24px  - Section separation
mb-8      // 32px  - Large section gap
mb-12     // 48px  - Major section division
```

---

## 🔘 Button System

### Button Heights (STANDARDIZED)
```tsx
// Small Button (Mobile-friendly)
h-10      // 40px - Minimum touch target

// Medium Button (Standard)
h-12      // 48px - Default button height

// Large Button (Primary CTA)
h-14      // 56px - Hero buttons, major actions
```

### Primary Button
```tsx
<Button className="
  bg-gradient-to-r from-rose-500 to-pink-500 
  hover:from-rose-600 hover:to-pink-600 
  h-12 px-6 
  shadow-lg hover:shadow-xl 
  transition-all duration-200
  touch-manipulation
">
  Action Text
</Button>
```

### Secondary Button
```tsx
<Button 
  variant="outline"
  className="
    border-2 border-rose-200 
    text-rose-600 
    hover:bg-rose-50 hover:border-rose-300
    h-12 px-6
    transition-all duration-200
    touch-manipulation
  "
>
  Secondary Action
</Button>
```

### Button with Icon
```tsx
<Button className="bg-gradient-to-r from-rose-500 to-pink-500 h-12 px-6 gap-2">
  <Icon className="w-4 h-4" />
  <span>Button Text</span>
</Button>
```

### Mobile Optimization
```tsx
// Full width on mobile, auto on desktop
className="w-full sm:w-auto h-12 touch-manipulation"

// Responsive height
className="h-11 sm:h-12 md:h-14"
```

---

## 🎴 Card System

### Standard Card
```tsx
<Card className="
  p-6 
  bg-white 
  border-rose-100 
  shadow-lg 
  hover:shadow-xl 
  transition-all duration-300
">
  {/* Content */}
</Card>
```

### Interactive Card (Clickable)
```tsx
<Card className="
  p-6 
  bg-white 
  border-rose-100 
  shadow-lg 
  hover:shadow-xl 
  hover:scale-[1.02]
  transition-all duration-300 
  cursor-pointer
  group
">
  {/* Content with group-hover effects */}
</Card>
```

### Info/Alert Card
```tsx
<Card className="
  p-4 sm:p-6 
  bg-gradient-to-br from-blue-50 to-indigo-50 
  border-blue-100 
  shadow-md
">
  {/* Info content */}
</Card>
```

### Profile Card
```tsx
<Card className="
  overflow-hidden 
  bg-white 
  border-rose-100 
  shadow-lg 
  hover:shadow-xl 
  transition-all duration-300
">
  {/* Profile content */}
</Card>
```

---

## 📱 Responsive Layout

### Breakpoint System
```tsx
Mobile:        Default (< 640px)
Small:         sm:  (≥ 640px)
Medium:        md:  (≥ 768px)
Large:         lg:  (≥ 1024px)
Extra Large:   xl:  (≥ 1280px)
```

### Container Pattern
```tsx
<div className="min-h-screen py-12 pb-24 md:pb-12">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</div>
```

### Grid Layouts
```tsx
// Two Column Grid
className="grid md:grid-cols-2 gap-6"

// Three Column Grid
className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"

// Auto-fit Grid
className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
```

### Flexbox Patterns
```tsx
// Stack on mobile, row on desktop
className="flex flex-col md:flex-row gap-4"

// Center content
className="flex items-center justify-center gap-4"

// Space between
className="flex items-center justify-between gap-4"
```

---

## ✨ Effects & Transitions

### Shadow Scale (STANDARDIZED)
```tsx
shadow-sm      // Subtle (buttons, inputs)
shadow-md      // Light elevation (small cards)
shadow-lg      // Standard (cards, modals)
shadow-xl      // Elevated (hover states)
shadow-2xl     // Dramatic (overlays, popovers)
```

### Transition Standards
```tsx
// Quick transitions (colors, opacity)
transition-colors duration-200

// Standard transitions (most interactions)
transition-all duration-200

// Smooth transitions (transforms, scales)
transition-all duration-300

// Slow transitions (page loads, reveals)
transition-all duration-500
```

### Hover Effects
```tsx
// Shadow expansion
hover:shadow-xl transition-shadow duration-300

// Scale up
hover:scale-105 transition-transform duration-200

// Subtle lift
hover:-translate-y-1 transition-transform duration-200

// Combined effect
hover:shadow-xl hover:scale-[1.02] transition-all duration-300
```

### Common Animations
```tsx
// Pulse (attention grabber)
animate-pulse

// Spin (loading)
animate-spin

// Group hover (parent triggers child)
group-hover:scale-110 transition-transform duration-300
```

---

## 📋 Form Elements

### Input Field
```tsx
<Input 
  className="
    h-11 sm:h-12 
    bg-white 
    border-gray-200 
    focus:border-rose-300 
    focus:ring-rose-200
    transition-colors duration-200
  " 
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
    <SelectItem value="option">Option</SelectItem>
  </SelectContent>
</Select>
```

### Textarea
```tsx
<Textarea 
  className="
    min-h-[100px] 
    bg-white 
    border-gray-200 
    focus:border-rose-300 
    focus:ring-rose-200 
    resize-none
  " 
  placeholder="Enter description"
/>
```

### Label
```tsx
<Label className="text-sm font-medium text-gray-700">
  Field Label
</Label>
```

---

## 🎯 Component Patterns

### Icon with Text
```tsx
<div className="flex items-center gap-2">
  <Icon className="w-4 h-4 text-rose-500 flex-shrink-0" />
  <span className="text-sm text-gray-600">Label text</span>
</div>
```

### Badge
```tsx
<Badge className="
  bg-gradient-to-r from-rose-500 to-pink-500 
  text-white 
  px-3 py-1 
  rounded-full 
  text-xs
  shadow-sm
">
  Premium
</Badge>
```

### Back Button
```tsx
<button
  onClick={onGoBack}
  className="
    flex items-center gap-2 
    text-gray-600 hover:text-rose-600 
    mb-6 
    group 
    transition-colors
    touch-manipulation
  "
>
  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
  <span>Back</span>
</button>
```

### Section Header
```tsx
<div className="text-center mb-12">
  <div className="
    inline-flex items-center justify-center 
    w-20 h-20 
    bg-gradient-to-br from-rose-100 to-pink-100 
    rounded-3xl 
    mb-6 
    shadow-lg
  ">
    <Icon className="w-10 h-10 text-rose-600" />
  </div>
  <h1 className="text-3xl md:text-4xl text-gray-800 mb-4">
    Page Title
  </h1>
  <p className="text-lg text-gray-600">
    Description text
  </p>
</div>
```

---

## 🔍 Accessibility

### Focus States
```tsx
// All interactive elements should have visible focus
focus:outline-none focus:ring-2 focus:ring-rose-400 focus:ring-offset-2
```

### Touch Targets (Mobile)
```tsx
// Minimum 44x44px touch target
h-11          // 44px height
touch-manipulation  // Improves touch responsiveness
```

### Semantic HTML
```tsx
// Use proper heading hierarchy
<h1> → <h2> → <h3> → <h4>

// Use semantic elements
<header>, <nav>, <main>, <section>, <footer>

// Add ARIA labels where needed
aria-label="descriptive text"
```

---

## ⚠️ Design Rules

### DO's ✅
1. **Always use the standard gradient**: `from-rose-500 to-pink-500`
2. **Use consistent button heights**: h-10, h-12, or h-14
3. **Add transitions to all interactive elements**: `transition-all duration-200`
4. **Use shadow-lg for elevated cards**: Creates consistent depth
5. **Include touch-manipulation on buttons**: Better mobile UX
6. **Use gap-4 or gap-6 for spacing**: Consistent rhythm
7. **Apply rounded-lg for cards, rounded-xl for larger elements**
8. **Add hover states to all clickable elements**
9. **Use responsive modifiers**: sm:, md:, lg: for breakpoints
10. **Follow mobile-first approach**: Default mobile, then desktop

### DON'Ts ❌
1. ❌ Don't use arbitrary pixel values - use Tailwind scale
2. ❌ Don't mix different gradient combinations
3. ❌ Don't create buttons smaller than h-10 (40px)
4. ❌ Don't forget responsive breakpoints
5. ❌ Don't use different shadow styles in similar components
6. ❌ Don't use pure black (#000) - use gray-800 or gray-900
7. ❌ Don't skip hover/focus states on interactive elements
8. ❌ Don't use more than 3 font sizes in a single section
9. ❌ Don't override default typography unless necessary
10. ❌ Don't create custom colors - use theme palette

---

## 📦 Quick Reference

### Common Class Combinations

**Primary CTA Button:**
```tsx
"bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-12 px-6 shadow-lg transition-all duration-200"
```

**Card with Hover:**
```tsx
"p-6 bg-white border-rose-100 shadow-lg hover:shadow-xl transition-all duration-300"
```

**Input Field:**
```tsx
"h-11 sm:h-12 bg-white border-gray-200 focus:border-rose-300 focus:ring-rose-200"
```

**Container:**
```tsx
"min-h-screen py-12 pb-24 md:pb-12" + "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8"
```

**Responsive Text:**
```tsx
"text-2xl sm:text-3xl md:text-4xl text-gray-800"
```

**Icon Badge:**
```tsx
"w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl flex items-center justify-center shadow-lg"
```

---

## 🎨 Component Library Quick Start

Every new component should follow this structure:

```tsx
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Icon } from 'lucide-react';

export default function MyComponent() {
  return (
    <div className="min-h-screen py-12 pb-24 md:pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl text-gray-800 mb-4">
            Section Title
          </h1>
          <p className="text-lg text-gray-600">
            Description
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-white border-rose-100 shadow-lg hover:shadow-xl transition-all duration-300">
            {/* Card Content */}
          </Card>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-12 px-8 shadow-lg">
            Primary Action
          </Button>
        </div>
        
      </div>
    </div>
  );
}
```

---

**This design system ensures perfect visual consistency across ForeverMatch.**

_For questions or clarifications, refer to existing components in `/components` directory._
