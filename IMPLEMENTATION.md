# Harveen Dynamics - E-Learning Platform Website

## ✨ What's Been Built

We've successfully created a modern, trendy e-learning website for Harveen Dynamics with cutting-edge animations and smooth transitions. Here's what's been implemented:

### 🎯 Components Created

#### 1. **Header Component** (`src/components/Header.tsx`)
- **Logo Section**: Branded logo with "HD" initials in a gradient circle
- **Navigation Menu**: Links to Programs, Learning Path, Testimonials, and Contact
- **WhatsApp Button**: Green CTA button with hover effects and mobile responsiveness
- **Features**:
  - Sticky positioning with backdrop blur effect
  - Smooth fade-in animation on load
  - Hover effects with scale transformations
  - Responsive design (hides nav on mobile, converts WhatsApp to icon)

#### 2. **Hero Section Component** (`src/components/Hero.tsx`)
- **Animated Badge**: Pulsing badge with the tagline "Master Microsoft Dynamics 365 & Power Platform"
- **Main Heading**: Eye-catching title with gradient text effect that shifts colors
- **Description**: Compelling copy about the training program
- **Call-to-Action Buttons**:
  - "Explore Programs" (Primary button with gradient and shine effect)
  - "Watch Demo" (Secondary button with outline style)
- **Visual Elements**: Animated laptop icon with floating glow orbs
- **Features**:
  - Staggered entrance animations for each element
  - Continuous gradient color shifting on main title
  - Floating animation on the hero visual
  - Responsive grid layout (2-column on desktop, single column on mobile)

#### 3. **Stats Section Component** (`src/components/Stats.tsx`)
- **Key Metrics**:
  - 3 Training Tracks (📚)
  - 6 Learning Stages (📈)
  - 100% Online—Instructor-led (👨‍🏫)
  - 1:1 Project Guidance (🎯)
- **Features**:
  - Animated counter that increments to final values
  - Card hover effects with elevation and glow
  - Grid layout that adapts to screen size
  - Smooth scroll-triggered animations
  - Gradient borders and background effects

### 🎨 Design Features

**Color Palette**:
- Primary Accent: #38b6ff (Cyan Blue)
- Secondary Accent: #ff914d (Orange)
- Background: #0a0a15 (Dark Navy)
- Dynamics Purple: #2a13af
- Text: #d1d5db (Light Gray)
- WhatsApp Green: #34d399

**Animation Effects**:
- ✨ Fade-in and slide-up animations on page load
- ✨ Staggered animations for better visual flow
- ✨ Hover effects with scale and shadow transformations
- ✨ Floating animations on visual elements
- ✨ Pulsing badge with dot animation
- ✨ Gradient color shifting on titles
- ✨ Smooth transitions on all interactive elements
- ✨ Counter animations that increment smoothly
- ✨ Backdrop blur effects on sticky header

**Responsive Design**:
- Desktop (1024px+): Full 2-column layout with complete navigation
- Tablet (768px-1024px): Adjusted spacing and simplified layout
- Mobile (<768px): Single column layout with icon-based buttons

### 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation and branding
│   ├── Header.css          # Header styling and animations
│   ├── Hero.tsx            # Main hero section with CTAs
│   ├── Hero.css            # Hero styling and animations
│   ├── Stats.tsx           # Key metrics display
│   └── Stats.css           # Stats styling and animations
├── App.tsx                 # Main app component
├── App.css                 # App-level styles
├── index.css               # Global styles and CSS variables
└── main.tsx                # React entry point
```

### 🚀 Technologies Used

- **React 19.3.1**: UI framework
- **TypeScript**: Type-safe development
- **Vite 8.3.6**: Fast build tool and dev server
- **Framer Motion 14.0.0**: Advanced animations
- **Tailwind CSS 4.3.3**: Utility-first styling
- **CSS Modules & Custom CSS**: Component-specific styling

### ✅ Features Implemented

- [x] Sticky header with navigation
- [x] Hero section with animated content
- [x] Gradient text effects
- [x] Call-to-action buttons with hover effects
- [x] Animated stat cards with counter animations
- [x] Responsive design for all screen sizes
- [x] Smooth scroll animations
- [x] Floating visual elements
- [x] Badge with pulsing animation
- [x] WhatsApp integration button
- [x] Dark theme with vibrant accents

### 🔧 Running the Project

**Development**:
```bash
cd harveen-dynamics
npm run dev
```
The site will be available at `http://localhost:5174`

**Build**:
```bash
npm run build
```

**Preview**:
```bash
npm run preview
```

### 📋 Next Steps

To complete the full website, we can add:

1. **Programs Section**: Showcase training tracks
2. **Learning Journey Section**: Display learning path and milestones
3. **Testimonials Section**: Student success stories
4. **Careers/Jobs Section**: Open positions
5. **FAQ Section**: Common questions
6. **Contact Section**: Get in touch form
7. **Footer**: Links and company info

Each section can follow the same animation patterns and design system already established!

---

**Status**: ✅ Hero & Home Page Complete
**Ready for**: Adding additional sections iteratively
