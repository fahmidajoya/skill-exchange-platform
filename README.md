# Skill Exchange Platform

A web-based platform for a university campus where students and faculty can offer their skills (video editing, UI design, tutoring and more) and find skilled peers to hire.

- Design prototype (Figma): https://www.figma.com/make/qemIHC3TOGonpotXU0elYw/Skill-Exchange-Platform-Design
- Prototype code: https://github.com/fahmidajoya/skill_exchange_platform-prototype

## Features

- **Home page:** hero section with search box, statistics, browse by category, how it works, testimonials and call to action
- **Authentication:** Sign Up, Log In and Log Out with Firebase Authentication
- **User profile:** stored in Cloud Firestore; users can view and edit their name, role, department and bio
- **Browse Services:** 12 sample services with live search and category filter
- **Admin Panel:** manage users (suspend or activate) and listings (approve, reject, delete). Only users with `isAdmin = true` can open it
- **Form validation:** clear error messages for empty fields, invalid email, short passwords and mismatched passwords
- **Client-side routing:** page changes without reloading the whole site

## Tech Stack

| Area | Technology |
|---|---|
| Frontend | React with TypeScript |
| Build tool | Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Authentication and database | Firebase Authentication and Cloud Firestore |
| Version control | Git and GitHub |

## Project Structure

```
src/
├── components/      Navbar, Footer, Hero, Stats, Category, How it Works,
│                    Testimonials, CTA, ServiceCard, InputField, AdminRoute
├── data/            services.ts (sample services)
├── pages/           HomePage, BrowsePage, LoginPage, ProfilePage, AdminPage
├── AuthContext.tsx  login state and user profile (Firebase)
├── firebase.ts      Firebase setup
├── App.tsx          routes
└── main.tsx
```

## Getting Started

**Requirements:** Node.js 18 or newer and a free Firebase account.

1. Clone the repository and install the packages:

```bash
git clone https://github.com/fahmidajoya/skill-exchange-platform.git
cd skill-exchange-platform
npm install
```

2. Create a file named `.env.local` in the project root. Copy the names from `.env.example` and fill in the values from your own Firebase project (Project settings, Your apps, Web app).

3. Start the development server:

```bash
npm run dev
```

4. Open http://localhost:5173 in your browser.

## Firebase Setup

1. Create a Firebase project and register a Web app.
2. In **Authentication**, enable the **Email/Password** sign-in method.
3. Create a **Cloud Firestore** database and publish these security rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId
                    && request.resource.data.isAdmin == false;
      allow update: if request.auth != null && request.auth.uid == userId
                    && request.resource.data.isAdmin == resource.data.isAdmin;
    }
  }
}
```

4. To create an administrator, open the user's document in the Firestore console (`users` collection) and set the field `isAdmin` to `true`. Users cannot make themselves administrators because the security rules block it.

## Current Limitations

- The services in **Browse Services**, the users and listings in the **Admin Panel**, and the sample listings on the **Profile** page are demo data. They are not stored in the database yet.
- Actions in the Admin Panel (suspend, approve, delete) change only the page on screen and are not saved.
- Only user profiles are stored in Firestore.
- There is no password reset and no email verification yet.

## Testing

Manual testing was carried out on the Home page, navigation, forms, Sign Up and Log In, profile editing and Admin page access. The results are recorded in the Software Testing Report.

## Author

Fahmida Akter Joya