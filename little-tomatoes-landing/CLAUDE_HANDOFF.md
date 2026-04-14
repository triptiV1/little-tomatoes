# Little Tomatoes - Claude Handoff Document

## Project Overview

**Little Tomatoes** is an AI-powered cognitive development app for kids aged 2-5, designed to prepare them for HiCAP (Highly Capable) gifted programs. The app features 8 unique veggie characters, each teaching different cognitive domains through adaptive, play-based learning.

**Current Status:** MVP Foundation Complete - Ready for Feature Development
**Timeline Goal:** Launch in 2-3 weeks
**Domain:** littletomatoes.ai

---

## What's Already Built

### 1. Landing Page (100% Complete)
- **Location:** `/client/src/pages/Home.tsx` + components
- **Features:**
  - Hero section with Veggie Valley illustration
  - Meet the Veggie Squad (all 8 characters with images)
  - Interactive character growth showcase (5 stages per character)
  - Features section highlighting HiCAP readiness
  - Call-to-action with pricing
  - Responsive design, animations, smooth transitions
- **Assets:** All character illustrations generated and uploaded to CDN

### 2. Full-Stack Architecture
- **Tech Stack:** React 19 + Tailwind 4 + Express + tRPC + Supabase
- **Authentication:** Manus OAuth (already configured)
- **Database:** MySQL via Supabase (migrations applied)
- **Deployment:** Ready for littletomatoes.ai domain

### 3. Database Schema (7 Tables)
```
users                    - Parent accounts (Manus OAuth)
childProfiles            - Child accounts with HiCAP tracking
characterProgress        - Growth tracking for 8 characters
activities               - HiCAP-aligned activity library
activitySessions         - User attempts & performance metrics
subscriptions            - Freemium model ($14.99/month)
parentSettings           - Parent preferences & parental controls
```

All migrations applied and ready to use.

### 4. Project Structure
```
client/src/
  ├── pages/             - Page components (Home, App screens)
  ├── components/        - Reusable UI components
  ├── lib/               - Utilities (tRPC client, auth)
  ├── contexts/          - React contexts
  ├── App.tsx            - Main router
  └── index.css          - Global styles (Tailwind + design tokens)

server/
  ├── routers.ts         - tRPC procedures (main API)
  ├── db.ts              - Database query helpers
  ├── storage.ts         - S3 file storage helpers
  └── _core/             - Framework plumbing (don't edit)

drizzle/
  ├── schema.ts          - Database table definitions
  ├── migrations/        - Applied migrations
  └── config.ts          - Drizzle ORM config

shared/
  ├── const.ts           - Shared constants
  └── types.ts           - Shared TypeScript types
```

---

## What Needs to Be Built

### Phase 1: Backend API (tRPC Procedures)

**Authentication & User Management**
- `auth.me` - Get current user (DONE)
- `auth.logout` - Logout (DONE)
- `users.createChildProfile` - Create child account
- `users.getChildProfiles` - List child profiles for parent
- `users.updateChildProfile` - Update child info

**Child Progress & Activities**
- `activities.list` - Get activities by character/age
- `activities.getById` - Get single activity details
- `activities.getRecommended` - AI-adaptive activity recommendations
- `activitySessions.create` - Start activity session
- `activitySessions.complete` - Complete activity (with performance metrics)
- `characterProgress.get` - Get character growth status
- `characterProgress.update` - Update character progress

**Parent Dashboard**
- `dashboard.getMetrics` - Daily/weekly metrics for child
- `dashboard.getHiCapReadiness` - Calculate HiCAP readiness score
- `dashboard.getCharacterProgress` - All character growth data

**Subscriptions & Payments**
- `subscriptions.getStatus` - Get subscription status
- `subscriptions.createCheckoutSession` - Stripe checkout
- `subscriptions.handleWebhook` - Stripe webhook handler

**Adaptive Engine**
- `adaptive.calculateDifficulty` - AI difficulty adjustment
- `adaptive.calculateReadiness` - HiCAP readiness calculation

### Phase 2: Frontend Screens

**Onboarding Flow**
- Sign-up screen (parent email/password)
- Child profile creation (name, age, avatar)
- 3-question baseline assessment
- Welcome celebration screen

**Main App Screens**
- Veggie Valley home (8 characters, daily streak, HiCAP score)
- Activity selection screen (character → activity)
- Activity player (interactive game interface)
- Celebration screen (stars, progress animation)
- Parent dashboard (metrics, HiCAP readiness, character progress)

**Parent Features**
- Parent lock (PIN/biometric)
- Session limits
- Email reports
- Subscription management

### Phase 3: Activities (16 Total)

**Activity Framework:**
- 2 activities per character (8 characters = 16 activities)
- Each activity has 3 difficulty levels (easy, medium, hard)
- HiCAP-aligned to cognitive domains
- Age-appropriate (2-5 years)

**Character Domains:**
1. **Tommy Tomato** - Logical Reasoning
2. **Carrie Carrot** - Resilience & EQ
3. **Egie Eggplant** - Pattern Recognition
4. **Potato Pete** - Working Memory
5. **Ollie Onion** - Verbal Reasoning
6. **Celly Celery** - Processing Speed
7. **Oliver Okra** - Quantitative Reasoning
8. **Ada Avocado** - AI Literacy & Creative Thinking

**Activity Types:**
- Pattern teaching games
- Robot correction games
- Creative combination challenges
- Prediction games
- Vocabulary teaching games

### Phase 4: Stripe Integration

- Freemium model ($14.99/month premium)
- Checkout flow
- Webhook handling
- Subscription status tracking

---

## Key Files to Understand

**Database Schema:**
```
/drizzle/schema.ts - All table definitions with types
```

**Backend Router:**
```
/server/routers.ts - Where you'll add all tRPC procedures
```

**Database Helpers:**
```
/server/db.ts - Add query helpers here as you build procedures
```

**Frontend Components:**
```
/client/src/components/ - Reusable UI components
/client/src/pages/ - Page-level screens
```

**Styling:**
```
/client/src/index.css - Global design tokens and Tailwind config
```

---

## Character Specifications

### 8 Veggie Characters

**1. Tommy Tomato 🍅**
- Color: #E74C3C (Red)
- Domain: Logical Reasoning
- Personality: Problem-solver, tries everything
- Catchphrase: "Let's solve this!"

**2. Carrie Carrot 🥕**
- Color: #E67E22 (Orange)
- Domain: Resilience & EQ
- Personality: Empathetic, encourages others
- Catchphrase: "You've got this!"

**3. Egie Eggplant 🍆**
- Color: #8E44AD (Purple)
- Domain: Pattern Recognition
- Personality: Analytical, loves puzzles
- Catchphrase: "I see the pattern!"

**4. Potato Pete 🥔**
- Color: #A0826D (Brown)
- Domain: Working Memory
- Personality: Reliable, remembers everything
- Catchphrase: "I remember!"

**5. Ollie Onion 🧅**
- Color: #F1C40F (Golden)
- Domain: Verbal Reasoning
- Personality: Talkative, loves words
- Catchphrase: "Let's talk about it!"

**6. Celly Celery 🌿**
- Color: #27AE60 (Green)
- Domain: Processing Speed
- Personality: Quick, energetic
- Catchphrase: "Quick, quick, quick!"

**7. Oliver Okra 🫑**
- Color: #2E86C1 (Blue)
- Domain: Quantitative Reasoning
- Personality: Logical, numbers-focused
- Catchphrase: "Let's count!"

**8. Ada Avocado 🥑**
- Color: #27AE60 (Fresh Green)
- Domain: AI Literacy & Creative Thinking
- Personality: Wonderstruck, learns from kids
- Catchphrase: "Holy Guacamole!"
- **Special:** Kids teach Ada (flips the script)
- Eyes: Pixelated, like a screen
- Pit: Glowing amber with circuit board lines
- Animation: Circuit lines pulse when learning

---

## Development Workflow

### 1. Add Backend Procedure
```typescript
// In server/routers.ts
export const appRouter = router({
  activities: router({
    list: protectedProcedure
      .input(z.object({ characterId: z.string() }))
      .query(async ({ ctx, input }) => {
        // Use db helpers from server/db.ts
        return getActivitiesByCharacter(input.characterId);
      }),
  }),
});
```

### 2. Add Database Helper
```typescript
// In server/db.ts
export async function getActivitiesByCharacter(characterId: string) {
  const db = await getDb();
  return db.select().from(activities)
    .where(eq(activities.characterId, characterId));
}
```

### 3. Use in Frontend
```typescript
// In React component
const { data: activities } = trpc.activities.list.useQuery({ 
  characterId: "tommy" 
});
```

### 4. Add Tests
```typescript
// In server/activities.test.ts
describe("activities.list", () => {
  it("returns activities for character", async () => {
    // Test implementation
  });
});
```

---

## Environment Variables

All environment variables are automatically injected:
- `DATABASE_URL` - Supabase MySQL connection
- `JWT_SECRET` - Session signing
- `VITE_APP_ID` - OAuth app ID
- `OAUTH_SERVER_URL` - OAuth backend
- `VITE_OAUTH_PORTAL_URL` - OAuth frontend

**Add these for Stripe:**
- `STRIPE_SECRET_KEY` - Stripe secret (add via webdev_request_secrets)
- `VITE_STRIPE_PUBLISHABLE_KEY` - Stripe public key

---

## Deployment

**Current Setup:**
- Project: `little-tomatoes-landing`
- Dev Server: Running on port 3000
- Database: Supabase MySQL (migrations applied)
- Domain: littletomatoes.ai (ready to bind)

**To Deploy:**
1. Push code to GitHub (repo: triptiV1/little-tomatoes)
2. Create checkpoint in Manus
3. Click "Publish" button in Management UI
4. Bind littletomatoes.ai domain in Settings

---

## Quick Start for Claude

1. **Read the Schema:** `/drizzle/schema.ts`
2. **Understand the Router:** `/server/routers.ts`
3. **Check the Landing Page:** `/client/src/pages/Home.tsx`
4. **Start with Procedures:** Add tRPC procedures for activities, progress, dashboard
5. **Build Screens:** Create onboarding, Veggie Valley, activity player
6. **Add Activities:** Create 16 HiCAP-aligned activities
7. **Integrate Stripe:** Add subscription handling
8. **Test:** Write vitest tests for procedures
9. **Deploy:** Push to GitHub and publish

---

## Important Notes

- **Never hardcode API keys** - Use environment variables
- **Always use tRPC** - No REST routes or Axios
- **Test with vitest** - See `server/auth.logout.test.ts` for example
- **Use TypeScript** - Full type safety end-to-end
- **Optimize images** - Use CDN URLs, not local files
- **Handle errors** - Use tRPC error handling
- **Mobile-first design** - Kids use tablets/phones

---

## Success Metrics

MVP Launch Checklist:
- [ ] All 8 characters display correctly
- [ ] Onboarding flow works end-to-end
- [ ] 2 activities per character (16 total) playable
- [ ] Parent dashboard shows HiCAP readiness
- [ ] Stripe subscription works
- [ ] Character growth animations smooth
- [ ] Parent lock PIN functional
- [ ] All tests passing
- [ ] Deployed to littletomatoes.ai
- [ ] No console errors

---

## Questions?

This handoff document covers everything you need to continue. Claude should be able to pick this up and run with it. The foundation is solid - now it's about building the features and activities.

Good luck! 🚀
