# ForeverMatch Style Guide - Quick Copy-Paste Reference
**Use this guide for instant styling patterns**

---

## 🚀 Ready-to-Use Components

### Page Layout Wrapper
```tsx
<div className="min-h-screen py-12 pb-24 md:pb-12">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Your content */}
  </div>
</div>
```

---

## 🔘 Buttons

### Primary Button (Most Common)
```tsx
<Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-12 px-6 shadow-lg transition-all duration-200">
  Click Me
</Button>
```

### Secondary Button
```tsx
<Button 
  variant="outline"
  className="border-2 border-rose-200 text-rose-600 hover:bg-rose-50 h-12 px-6 transition-all duration-200"
>
  Secondary Action
</Button>
```

### Small Button
```tsx
<Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-10 px-4 text-sm">
  Small Button
</Button>
```

### Large Hero Button
```tsx
<Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-14 px-8 shadow-lg text-lg">
  Get Started
</Button>
```

### Full Width Mobile Button
```tsx
<Button className="w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-12 px-6 touch-manipulation">
  Mobile Friendly
</Button>
```

### Button with Icon
```tsx
<Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-12 px-6 gap-2">
  <Heart className="w-4 h-4" />
  With Icon
</Button>
```

---

## 🎴 Cards

### Standard Card
```tsx
<Card className="p-6 bg-white border-rose-100 shadow-lg hover:shadow-xl transition-all duration-300">
  <h3 className="text-xl text-gray-800 mb-4">Card Title</h3>
  <p className="text-gray-600">Card content goes here</p>
</Card>
```

### Interactive/Clickable Card
```tsx
<Card className="p-6 bg-white border-rose-100 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300 cursor-pointer group">
  {/* Content with group-hover effects */}
</Card>
```

### Profile Card
```tsx
<Card className="overflow-hidden bg-white border-rose-100 shadow-lg hover:shadow-xl transition-all duration-300">
  <div className="relative h-64">
    <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
  </div>
  <div className="p-6">
    <h3 className="text-xl text-gray-800 mb-2">{name}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
</Card>
```

### Info Alert Card
```tsx
<Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100 shadow-md">
  <div className="flex items-start gap-3">
    <Info className="w-5 h-5 text-blue-600 flex-shrink-0" />
    <p className="text-sm text-gray-700">Your info message here</p>
  </div>
</Card>
```

---

## 📝 Forms

### Input Field
```tsx
<div className="space-y-2">
  <Label className="text-sm font-medium text-gray-700">Field Label</Label>
  <Input 
    className="h-11 sm:h-12 bg-white border-gray-200 focus:border-rose-300 focus:ring-rose-200"
    placeholder="Enter text"
  />
</div>
```

### Select Dropdown
```tsx
<div className="space-y-2">
  <Label className="text-sm font-medium text-gray-700">Select Option</Label>
  <Select>
    <SelectTrigger className="h-11 sm:h-12 bg-white border-gray-200">
      <SelectValue placeholder="Choose..." />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">Option 1</SelectItem>
      <SelectItem value="option2">Option 2</SelectItem>
    </SelectContent>
  </Select>
</div>
```

### Textarea
```tsx
<div className="space-y-2">
  <Label className="text-sm font-medium text-gray-700">Description</Label>
  <Textarea 
    className="min-h-[120px] bg-white border-gray-200 focus:border-rose-300 focus:ring-rose-200 resize-none"
    placeholder="Enter description"
  />
</div>
```

---

## 🎯 Common Patterns

### Back Button
```tsx
<button
  onClick={onGoBack}
  className="flex items-center gap-2 text-gray-600 hover:text-rose-600 mb-6 group transition-colors touch-manipulation"
>
  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
  <span>Back</span>
</button>
```

### Icon with Text
```tsx
<div className="flex items-center gap-2">
  <MapPin className="w-4 h-4 text-rose-500 flex-shrink-0" />
  <span className="text-sm text-gray-600">Mumbai, Maharashtra</span>
</div>
```

### Badge
```tsx
<Badge className="bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-sm">
  Premium
</Badge>
```

### Section Header (Centered)
```tsx
<div className="text-center mb-12">
  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-rose-100 to-pink-100 rounded-3xl mb-6 shadow-lg">
    <Heart className="w-10 h-10 text-rose-600" />
  </div>
  <h1 className="text-3xl md:text-4xl text-gray-800 mb-4">
    Section Title
  </h1>
  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
    Section description text goes here
  </p>
</div>
```

### Icon Badge/Avatar
```tsx
<div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
  <Icon className="w-8 h-8 text-white" />
</div>
```

---

## 📱 Responsive Layouts

### Two Column Grid
```tsx
<div className="grid md:grid-cols-2 gap-6">
  <div>{/* Left column */}</div>
  <div>{/* Right column */}</div>
</div>
```

### Three Column Grid
```tsx
<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
  <div>{/* Column 1 */}</div>
  <div>{/* Column 2 */}</div>
  <div>{/* Column 3 */}</div>
</div>
```

### Stack on Mobile, Row on Desktop
```tsx
<div className="flex flex-col md:flex-row gap-4">
  <div className="flex-1">{/* Item 1 */}</div>
  <div className="flex-1">{/* Item 2 */}</div>
</div>
```

### Responsive Text Size
```tsx
<h1 className="text-2xl sm:text-3xl md:text-4xl text-gray-800">
  Responsive Heading
</h1>
```

---

## 🎨 Color Combinations

### Primary Gradient (STANDARD)
```tsx
className="bg-gradient-to-r from-rose-500 to-pink-500"
```

### Light Background
```tsx
className="bg-gradient-to-br from-rose-50 to-pink-50"
className="bg-gradient-to-br from-rose-100 to-pink-100"
```

### Success
```tsx
className="bg-gradient-to-r from-green-500 to-emerald-600"
```

### Warning
```tsx
className="bg-gradient-to-r from-amber-500 to-orange-500"
```

### Info
```tsx
className="bg-gradient-to-br from-blue-50 to-indigo-50"
className="bg-gradient-to-r from-blue-500 to-indigo-500"
```

---

## ✨ Hover & Transition Effects

### Shadow Expansion Hover
```tsx
className="shadow-lg hover:shadow-xl transition-shadow duration-300"
```

### Scale Hover
```tsx
className="hover:scale-105 transition-transform duration-200"
```

### Lift Hover
```tsx
className="hover:-translate-y-1 transition-transform duration-200"
```

### Combined Effect
```tsx
className="shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
```

### Icon Slide (Back Button)
```tsx
<Icon className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
```

### Group Hover (Parent → Child)
```tsx
<div className="group cursor-pointer">
  <img className="group-hover:scale-110 transition-transform duration-300" />
</div>
```

---

## 🖼️ Image Patterns

### Profile Image Container
```tsx
<div className="relative w-full h-64 overflow-hidden rounded-lg">
  <img 
    src={imageUrl}
    alt={alt}
    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
  />
</div>
```

### Image with Overlay
```tsx
<div className="relative h-64">
  <img src={imageUrl} className="w-full h-full object-cover" />
  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
  <div className="absolute bottom-4 left-4 text-white">
    <h3>Overlay Content</h3>
  </div>
</div>
```

---

## 🔄 Loading & States

### Skeleton Loader
```tsx
<div className="animate-pulse">
  <div className="h-48 bg-gray-200 rounded-lg mb-4" />
  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
  <div className="h-4 bg-gray-200 rounded w-1/2" />
</div>
```

### Empty State
```tsx
<Card className="p-12 text-center bg-white/95 backdrop-blur border-rose-100 shadow-lg">
  <div className="max-w-md mx-auto">
    <div className="w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center">
      <Icon className="w-12 h-12 text-gray-400" />
    </div>
    <h3 className="text-2xl text-gray-800 mb-3">No Items Found</h3>
    <p className="text-gray-600 mb-6">
      Description of the empty state
    </p>
    <Button className="bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 h-12 px-8">
      Take Action
    </Button>
  </div>
</Card>
```

---

## 🎯 Mobile Optimization

### Touch-Friendly Button
```tsx
<Button className="
  bg-gradient-to-r from-rose-500 to-pink-500 
  hover:from-rose-600 hover:to-pink-600 
  h-12 px-6 
  touch-manipulation
  active:scale-95
  transition-all duration-200
">
  Mobile Button
</Button>
```

### Mobile Bottom Spacing (Account for nav bar)
```tsx
<div className="pb-24 md:pb-12">
  {/* Content */}
</div>
```

### Responsive Padding
```tsx
<div className="p-4 sm:p-6 md:p-8">
  {/* Content */}
</div>
```

---

## 💡 Pro Tips

1. **Always add `touch-manipulation` to buttons for mobile**
2. **Use `pb-24 md:pb-12` for pages with bottom navigation**
3. **Add `transition-all duration-200` to interactive elements**
4. **Use `flex-shrink-0` on icons to prevent squishing**
5. **Add `group` to parent for group-hover effects**
6. **Use `truncate` or `line-clamp-{n}` for text overflow**
7. **Add `shadow-lg` to elevated components**
8. **Use `gap-{n}` instead of margins between flex/grid items**

---

## ⚡ Common Mistakes to Avoid

❌ **Don't:**
- Use arbitrary pixel values: `w-[234px]`
- Mix gradient colors: `from-blue-500 to-rose-500`
- Forget mobile breakpoints: `text-4xl` (too big on mobile)
- Skip hover states on clickable elements
- Use buttons smaller than `h-10` (40px)

✅ **Do:**
- Use Tailwind scale: `w-64`
- Stick to rose/pink gradient: `from-rose-500 to-pink-500`
- Add responsive classes: `text-2xl md:text-4xl`
- Add hover/focus states everywhere
- Use minimum `h-11` for mobile touch targets

---

**🎨 Copy these patterns directly into your components for instant consistency!**
