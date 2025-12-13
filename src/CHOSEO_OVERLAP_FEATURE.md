# Choseo Overlap & Shared Reflection Feature

## Overview
The Choseo Overlap feature allows users to discover other readers who highlighted the same or similar passages from books, compare their interpretations, and explore diverse perspectives on the same text.

## Feature Components

### 1. Choseo Detail Screen (`/components/ChoseoDetail.tsx`)
**Purpose**: Display a user's own Choseo (quote + reflection) with an indicator showing how many other readers selected similar passages.

**Key Elements**:
- Book information and page reference
- User's selected quote with decorative styling
- User's personal reflection/thought
- "Also highlighted by others" section
- Visual indicator showing number of overlapping readers
- Empty state for when no overlaps exist yet

**Navigation**:
- Click "보기" (View) button → Go to Choseo Overlap Screen

### 2. Choseo Overlap Screen (`/components/ChoseoOverlap.tsx`)
**Purpose**: Compare your quote with another reader's quote, highlighting overlapping text segments.

**Key Elements**:
- Navigation carousel (1/7 readers style)
- Your quote card with overlapping text highlighted in emerald
- Other user's quote card with overlapping text highlighted in teal
- Overlap percentage indicator
- Other user's reflection and metadata (level, vibe tag)
- Light-weight reaction buttons (☀️ 공감해요, 🌱 새로워요, 💭 생각중)
- Swipe left/right to see different readers

**Visual Design**:
- Overlapping text uses soft background highlights (emerald-100 / teal-100)
- Non-overlapping text shown in normal or muted colors
- Clean, readable serif fonts for quotes
- Vibe tags with color-coded backgrounds (analytical, reflective, emotional, etc.)

**Navigation**:
- Back button → Return to Choseo Detail
- "전체보기" (View All) → Go to Choseo Cluster Screen

### 3. Choseo Cluster Screen (`/components/ChoseoCluster.tsx`)
**Purpose**: Browse all similar Choseos from different readers in a list/cluster view.

**Key Elements**:
- Filter tabs:
  - **비슷한 생각** (Similar thoughts): Sorted by overlap score (highest first)
  - **다른 관점** (Different perspectives): Sorted by overlap score (lowest first)
  - **인기 생각** (Popular reflections): Sorted by likes
- Card list showing each reader's Choseo with:
  - User avatar and name
  - Overlap percentage badge
  - Quote preview
  - Reflection preview (2 lines max)
  - Vibe icon and tag
  - Engagement metrics (likes, bookmark)
- Summary footer showing aggregate stats

**Navigation**:
- Click any card → Return to Choseo Overlap Screen at that specific index

## Data Structure

### Mock Data Location
`/data/choseoOverlapData.ts`

### Key Interfaces
```typescript
interface ChoseoWithUser extends Chosu {
  user: Neighbor & { vibe?: string };
}

interface ChoseoOverlap {
  id: string;
  myChoseo: Chosu;
  otherChoseo: ChoseoWithUser;
  overlapScore: number; // 0-1
  overlapSegments: Array<{
    text: string;
    isOverlap: boolean;
  }>;
}
```

### Vibe Tags
User reading styles are tagged with vibes:
- `analytical` 🔍 - Blue tones
- `reflective` 🤔 - Purple tones
- `emotional` 💕 - Rose tones
- `transformative` 🦋 - Amber tones
- `hopeful` 🌅 - Emerald tones
- `minimalist` ✨ - Slate tones
- `philosophical` 🧠 - Indigo tones

## Access Points

### From Main Home
In the MainHome screen, after the social feed section, there's a demo card:
- Title: "초서 겹침 발견" (Choseo Overlap Discovery)
- Description: "다른 독자와 같은 구절을 골랐어요" (You chose the same passage as other readers)
- Button: "내 초서 겹침 보기" (View my Choseo overlaps)

### Screen Flow
```
MainHome
  ↓ (click "내 초서 겹침 보기")
ChoseoDetail
  ↓ (click "보기")
ChoseoOverlap ←→ (swipe/arrows to navigate)
  ↓ (click "전체보기")
ChoseoCluster
  ↓ (click any card)
ChoseoOverlap (at selected index)
```

## Design Philosophy

### Visual Language
- **Calm & Reading-Friendly**: Soft greens, warm neutrals, paper-like backgrounds
- **Forest/Nature Metaphor**: Leaf reactions (🌱), tree avatars, organic shapes
- **Thoughtful Typography**: Serif fonts for quotes, sans-serif for UI
- **Subtle Highlights**: Soft background colors instead of aggressive underlines
- **Rounded Everything**: Cards, buttons, and containers use generous border-radius

### Interaction Patterns
- **Light-Weight Reactions**: Emoji-based instead of generic likes
- **Progressive Disclosure**: Start with summary → dive into details → explore cluster
- **Carousel Navigation**: Intuitive left/right swipe for one-on-one comparisons
- **Filter-First Browsing**: Let users choose their perspective (similar vs different)

### Empty States
When no overlaps exist:
- Friendly message: "첫 번째 초서예요" (You are the first)
- Reassurance: Similar passages will appear here later
- Calm illustration with icon

## Technical Implementation

### Overlap Calculation
The `calculateOverlap()` function in `/data/choseoOverlapData.ts`:
- Word-based comparison (simple for demo)
- Returns overlap score (0-1) and segments array
- Can be enhanced with NLP/semantic similarity in production

### State Management
- Uses React useState for current index in carousel
- Filter state for cluster view tabs
- Navigation managed through App.tsx screen state

### Responsive Design
- Mobile-first (max-w-md container)
- Touch-friendly tap targets
- Scroll-based interactions
- Fixed headers and footers where appropriate

## Future Enhancements
1. **Semantic Similarity**: Use NLP to find conceptually similar passages, not just word matches
2. **Discussion Threads**: Allow users to reply to each other's reflections
3. **Collections**: Group multiple overlapping Choseos by theme or mood
4. **Notifications**: Alert when someone highlights the same passage
5. **Reading Circles**: Form groups around popular passages
6. **Annotation Tools**: Highlight within highlights, margin notes
7. **Export & Share**: Create beautiful cards for social sharing
