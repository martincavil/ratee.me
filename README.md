# ratee.me - Client Feedback Automation

Automate client feedback collection with professional NPS tracking for freelancers and agencies.

## 🚀 Features

- **Dashboard**: Centralized view of all client feedback
- **NPS Tracking**: Net Promoter Score tracking (0-10 scale)
- **Project Management**: CRUD operations for client projects
- **Feedback Collection**: Automated feedback requests (Post-MVP)
- **Badge Widget**: Embeddable reputation badge for websites
- **Analytics**: Feedback trends and insights

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Validation**: Zod
- **Deployment**: Vercel

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Supabase account ([Sign up here](https://supabase.com))

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/ratee-dashboard.git
cd ratee-dashboard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **Settings > API** and copy:
   - `Project URL`
   - `anon public` key
   - `service_role` key (keep secret!)

3. Run the database schema:
   - Open Supabase SQL Editor
   - Copy contents of `supabase-schema.sql`
   - Execute the SQL

### 4. Configure Environment Variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
ratee-dashboard/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Auth pages (login, signup)
│   ├── (dashboard)/       # Dashboard pages (projects, feedbacks, badge)
│   ├── api/               # API routes
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/                # shadcn/ui components
│   ├── shared/            # Shared components (navbar, etc.)
│   ├── projects/          # Project-specific components
│   ├── feedbacks/         # Feedback-specific components
│   └── badge/             # Badge-specific components
├── lib/                   # Utilities & helpers
│   ├── supabase/          # Supabase clients & queries
│   ├── hooks/             # Custom React hooks
│   ├── utils.ts           # Utility functions
│   └── constants.ts       # App constants
├── types/                 # TypeScript types
├── public/                # Static assets
└── CONTEXTE.md           # Full project documentation
```

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run type-check` - Check TypeScript types

## 📚 Documentation

For complete project architecture, API contracts, and development guidelines, see [CONTEXTE.md](./CONTEXTE.md).

## 🔐 Security

- All passwords hashed via Supabase Auth (bcrypt)
- Row Level Security (RLS) enabled on all tables
- Input validation with Zod schemas
- HTTPS enforced in production
- httpOnly cookies for session management

## 🚢 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Configure environment variables
4. Deploy!

### Manual Deployment

```bash
npm run build
npm run start
```

## 📖 API Documentation

See [CONTEXTE.md Section 7](./CONTEXTE.md#section-7-api-contract) for complete API documentation.

## 🗺️ Roadmap

### MVP (Current)
- ✅ Authentication (email/password)
- ✅ Dashboard with stats
- ✅ Projects CRUD
- ✅ Feedbacks view (mock data)
- ✅ Badge preview

### Post-MVP (Month 1)
- [ ] Public feedback form
- [ ] Email automation (Resend)
- [ ] Badge customization

### Month 2-3
- [ ] Analytics dashboard
- [ ] Integrations (Slack, Zapier)
- [ ] Team accounts

### Month 4-12
- [ ] Mobile app
- [ ] AI insights
- [ ] White-label solution

## 🤝 Contributing

This is a private project. Contact the maintainer for contribution guidelines.

## 📄 License

Proprietary - All rights reserved

## 📞 Support

For questions or issues:
- Email: support@ratee.me
- Documentation: [CONTEXTE.md](./CONTEXTE.md)

---

**Built with ❤️ using Next.js, Supabase, and Tailwind CSS**
