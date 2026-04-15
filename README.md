# SHOPEASY E-Commerce Web Application

## Overview

This is a basic e-commerce web application built using React and TypeScript.
Users can browse products, view product details, apply filters, and manage a shopping cart.

---

## Features

* View list of products
* Filter products by categories (multiple selection supported)
* Sort products (price, name)
* URL-based filters (can share filtered links)
* View product details
* Add items to cart
* Remove/update items in cart
* Cart persistence using localStorage
* Responsive design
* Basic animations for better UI
* End-to-end testing using Cypress

---

## Tech Stack

* React
* TypeScript
* React Router
* Context API (for cart state)
* SCSS
* Cypress (for testing)

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/lalitesh-tiwari/Shop-easy.git
cd e-commerce-app
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Run the application

```bash
npm run dev
```

The app will run on:

```
http://localhost:5173
```

---

### 4. Run Cypress tests

Make sure app is running, then:

```bash
npm run cypress
```

---

## Assumptions

* Product data is fetched from a public API.
* Categories are predefined and mapped for filtering.
* No authentication or payment system is included.

---

## Limitations

* No backend (pure frontend app)
* Limited product dataset (depends on API)
* No search functionality implemented
* No user login system

---

## Additional Features Implemented

* URL-based filtering (shareable links)
* Cart persistence using localStorage
* Loader and skeleton UI for better UX
* Responsive layout for mobile devices
* Basic animations (hover effects, transitions)

---

## Notes

* AI tools were used for debugging and minor guidance.
* Core logic, structure, and implementation were done manually.

---

## Repository Link

"https://github.com/lalitesh-tiwari/Shop-easy.git"
