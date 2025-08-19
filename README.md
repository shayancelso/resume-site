# Shayan Mirzazadeh - Interactive Resume Website

A premium, interactive resume website built with Next.js 14, showcasing the journey from Toronto to Dubai with beautiful animations, AI-powered demos, and clean design.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 App Router, TypeScript, Tailwind CSS
- **Premium Animations**: Framer Motion with tasteful micro-interactions
- **AI Demonstrations**: Interactive showcases of AI-enhanced workflows
- **Responsive Design**: Perfect on all devices with glass morphism effects
- **Toronto → Dubai Story**: Animated map visualization of relocation journey
- **Dark/Light Mode**: System-aware theme with smooth transitions
- **Contact Form**: Integrated with Resend for email delivery
- **Performance Optimized**: Lighthouse 95+ scores

## 🎨 Design System

### Brand Colors
- **Espresso**: `#3B2F2F` - Deep, sophisticated base
- **Chocolate**: `#5D4037` - Warm secondary tone  
- **Sand**: `#E9DFC7` - Neutral background
- **Ivory**: `#FAF7F2` - Clean primary background
- **Ink**: `#0E0E0E` - High contrast text
- **Gold**: `#C8A96A` - Premium accent color

### Typography
- **Headings**: Clash Display (premium, display font)
- **Body**: Inter (clean, readable sans-serif)
- **Variable weights** with smooth transitions

## 🛠 Tech Stack

### Core Framework
- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** with custom design tokens

### UI & Animation
- **shadcn/ui** for base components
- **Framer Motion** for animations
- **Lucide React** for icons
- **Custom components** with 3D effects

### Backend & Deployment
- **Vercel Functions** for serverless API
- **Resend** for email delivery
- **Vercel Analytics** for insights

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (pages)/           # Route pages
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── ui/               # Base UI components (shadcn)
│   ├── AnimatedMapArc.tsx # Toronto → Dubai visualization
│   ├── CardTilt.tsx      # 3D tilt effects
│   ├── Header.tsx        # Navigation
│   ├── SkillRing.tsx     # Animated skill indicators
│   └── Timeline.tsx      # Experience timeline
├── data/                 # JSON data files
├── lib/                  # Utility functions
└── types/               # TypeScript definitions
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd resume-site
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Add your environment variables:
   ```env
   # Optional: Enable real email sending
   RESEND_API_KEY=your_resend_api_key
   
   # Optional: Enable AI demos with real API
   NEXT_PUBLIC_OPENAI_ENABLED=true
   OPENAI_API_KEY=your_openai_key
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)**

## 📧 Email Configuration

The contact form works in two modes:

### Demo Mode (Default)
- Form submissions are logged to console
- Success message shown to user
- No actual emails sent

### Production Mode  
1. **Get Resend API Key**: Sign up at [resend.com](https://resend.com)
2. **Verify Domain**: Add and verify your sending domain
3. **Update Environment**: Add `RESEND_API_KEY` to `.env.local`
4. **Update Email**: Change the 'from' address in `src/app/api/contact/route.ts`

## 🤖 AI Demos Configuration

### Offline Mode (Default)
- Demos use heuristic analysis
- No external API calls required
- Perfect for development and demonstration

### AI-Enhanced Mode
1. **OpenAI Setup**: Get API key from [platform.openai.com](https://platform.openai.com)
2. **Enable Feature**: Set `NEXT_PUBLIC_OPENAI_ENABLED=true`
3. **Add API Key**: Add `OPENAI_API_KEY` to environment

## 🚀 Deployment to Vercel

### Quick Deploy
1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Configure environment variables
   - Deploy!

### Environment Variables for Production
```env
RESEND_API_KEY=your_production_resend_key
NEXT_PUBLIC_OPENAI_ENABLED=true
OPENAI_API_KEY=your_openai_key
```

## 📝 Content Customization

### Personal Information
Update these files with your information:
- `src/data/profile.json` - Basic profile info
- `src/data/experience.json` - Work experience
- `src/data/skills.json` - Skills and proficiencies  
- `src/data/awards.json` - Awards and recognition
- `src/data/certifications.json` - Certifications

### Resume PDF
Replace `public/resume.pdf` with your actual resume file.

### Photos
Add your profile photo to `public/images/profile.jpg`

## 🎭 Animations & Performance

### Animation Features
- **Page Transitions**: Smooth cover reveals
- **Scroll Animations**: Elements reveal on scroll
- **3D Tilt Effects**: Cards respond to mouse movement  
- **Micro-interactions**: Buttons, hovers, and clicks
- **Reduced Motion**: Respects user preferences

### Performance Optimizations
- **Image Optimization**: Next.js automatic optimization
- **Font Loading**: Preloaded critical fonts
- **Code Splitting**: Automatic route-based splitting
- **Static Generation**: Pre-rendered where possible

## 🧪 Testing & Quality

### Development Commands
```bash
npm run dev          # Development server
npm run build        # Production build
npm run start        # Production server
npm run lint         # ESLint check
npm run type-check   # TypeScript check
```

### Code Quality
- **ESLint**: Configured with Next.js and TypeScript rules
- **Prettier**: Code formatting with Tailwind plugin
- **TypeScript**: Strict mode enabled
- **Git Hooks**: Pre-commit linting (optional)

## 🎨 Customization Guide

### Colors
Update `tailwind.config.ts` to change the color scheme:
```typescript
colors: {
  espresso: '#YOUR_COLOR',
  chocolate: '#YOUR_COLOR',
  sand: '#YOUR_COLOR',
  ivory: '#YOUR_COLOR',
  ink: '#YOUR_COLOR',
  gold: '#YOUR_COLOR',
}
```

### Fonts
1. **Add Font**: Import in `src/app/globals.css`
2. **Update Config**: Add to `tailwind.config.ts`
3. **Apply**: Use in components

### Animation Speed
Adjust animation durations in components:
```typescript
transition={{ duration: 0.6 }} // Slower
transition={{ duration: 0.2 }} // Faster
```

## 📊 Analytics

### Built-in Analytics
- **Vercel Analytics**: Page views and performance
- **Vercel Speed Insights**: Core Web Vitals

### Custom Events
Track custom interactions:
```typescript
// Example: Track resume downloads
analytics.track('resume_download', {
  location: 'header_button'
});
```

## 🔧 Troubleshooting

### Common Issues

**Build Errors**
- Check TypeScript types
- Verify all imports
- Run `npm run type-check`

**Animation Performance**
- Reduce motion complexity
- Check browser compatibility
- Enable GPU acceleration

**Email Not Sending**
- Verify Resend API key
- Check domain verification
- Review console errors

**Fonts Not Loading**
- Confirm font URLs
- Check preload settings
- Verify CORS headers

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

This is a personal portfolio project, but suggestions and improvements are welcome:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 🙋‍♂️ Support

For questions or issues:
- **Email**: shayan.mirzazadeh@gmail.com
- **LinkedIn**: [linkedin.com/in/shayanmirzazadeh](https://linkedin.com/in/shayanmirzazadeh)
- **Issues**: Use GitHub Issues for bugs

---

Built with ❤️ by Shayan Mirzazadeh