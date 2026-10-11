# 🛒 বাজার দর (Bajar Dor)

**A Bangla-language daily market price tracking application**

বাজার দর helps users explore daily market prices, compare price changes, and discover product categories through a responsive, user-friendly interface.

## ✨ Features

- **Homepage:** Explore products with rising prices, falling prices, and a complete product listing.
- **Category browsing:** Browse products by category.
- **Product sorting:** Sort category products by price from low to high or high to low.
- **Product details:** View individual product information through dedicated product pages.
- **Authentication:** Sign up and sign in using email and password, Google, or GitHub.
- **Protected routes:** Restrict access to protected product pages to authenticated users.
- **Responsive design:** Designed for mobile, tablet, and desktop screens.
- **Loading and error states:** Provide feedback while data loads or when requests fail.
- **404 handling:** Display an appropriate page when a requested resource is unavailable.
- **Bangla interface:** Uses Bengali text and the Hind Siliguri font for a localized experience.

## 🧰 Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- DaisyUI
- Better Auth
- MongoDB Atlas
- Lucide React
- React Hot Toast
- Programming Hero Bazar Dor API

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js (a compatible LTS version)
- npm
- Git
- A MongoDB Atlas database
- Google and GitHub OAuth applications if you want to enable social sign-in locally

### 1. Clone the repository

```bash
git clone https://github.com/Sonia-Shurmi/bajar-dor.git
cd bajar-dor
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file in the project root and add the required variables:

```env
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_DB_URI=
MONGODB_DB_NAME=bazardor

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
```

Fill in the values using your own configuration. Generate a strong, unique Better Auth secret and use your MongoDB Atlas connection string.

Configure your Google and GitHub OAuth applications to use the appropriate local callback URLs:

- Google: `http://localhost:3000/api/auth/callback/google`
- GitHub: `http://localhost:3000/api/auth/callback/github`

**Security:** Never commit `.env` or publish real API keys, database credentials, OAuth secrets, or authentication secrets. Keep environment files excluded through `.gitignore`.

### 4. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔌 API

Product and category information is retrieved from the Bazar Dor API:

```text
https://openapi.programming-hero.com/api/bazardor
```

The application uses the API's product data to display prices and price changes.

## 📁 Project Structure

The application uses the Next.js App Router.

```text
bajar-dor/
├── public/
├── src/
│   ├── app/
│   │   ├── api/
│   │   ├── category/
│   │   ├── product/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   └── not-found.tsx
│   ├── components/
│   └── lib/
├── .gitignore
├── package.json
└── README.md
```

*Note: This is a high-level overview; individual files may differ as the project evolves.*

## 🔐 Authentication

Authentication is implemented using Better Auth with MongoDB as the database. Supported sign-in methods include:

- Email and password
- Google OAuth
- GitHub OAuth

Social authentication requires valid provider credentials and correctly configured callback URLs.

## 🎨 Design

The interface uses a green-based visual theme inspired by market freshness and trust.

- Primary color: `#05893E`
- Primary content color: `#F3FBF4`
- Base content color: `#1D271F`
- Typography: Hind Siliguri

## 👩‍💻 Author

**Sonia Shurmi**

GitHub: [Sonia-Shurmi](https://github.com/Sonia-Shurmi)

---

Built with ❤️ to make everyday market price information easier to explore.
