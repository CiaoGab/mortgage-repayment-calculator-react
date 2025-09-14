# Frontend Mentor - Mortgage repayment calculator solution

This is a solution to the [Mortgage repayment calculator challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/mortgage-repayment-calculator-Galx1LXK73). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

## Overview

### The challenge

Users should be able to:

- Input mortgage information and see monthly repayment and total repayment amounts after submitting the form
- See form validation messages if any field is incomplete
- Complete the form only using their keyboard
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

```md
![Mortgage repayment calculator screenshot](src\assets\images\Screenshot 2025-09-13 225221.png)
```



### Links

- Solution (repo): https://github.com/CiaoGab/mortgage-repayment-calculator-react
- Frontend Mentor profile: https://www.frontendmentor.io/profile/CiaoGab
- Live Site: [Add live URL here once deployed]

## My process

### Built with

- Semantic HTML5 markup
- CSS utility-first with Tailwind CSS 4
- Flexbox and CSS Grid
- Mobile-first workflow
- [React 19](https://react.dev/) + [Vite 7](https://vitejs.dev/)

### What I learned

- Managed controlled inputs with React state and validated required fields on submit.
- Displayed inline validation errors with conditional Tailwind classes for borders and adornment spans.
- Imported image assets in React (`import icon from './assets/...';`) so Vite resolves them correctly for production.
- Implemented basic amortization (repayment) and interest-only calculations and formatted results.

Example of conditional styling for errors:

```jsx
<div className={`flex border rounded-md ${errors.mortgageAmt ? 'border-red-500' : ''}`}>
  <span className={`${errors.mortgageAmt ? 'bg-red-600 text-white' : 'bg-sky-100'}`}>£</span>
  <input name="mortgageAmt" value={formData.mortgageAmt} onChange={handleChange} />
</div>
{errors.mortgageAmt && <p className="text-red-600 text-sm">this field is required</p>}
```

### Continued development

- Improve accessibility: ARIA live regions for error messages and keyboard focus management.
- Add unit tests for calculation logic and form validation.
- Support more repayment options and currency/locale formatting.
- Persist last inputs in localStorage.

### Useful resources

- Tailwind CSS Docs – https://tailwindcss.com/docs
- React Forms (controlled components) – https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components
- Mortgage payment formula overview – https://en.wikipedia.org/wiki/Mortgage_calculator

## Getting started

### Prerequisites

- Node.js 18+ (recommended)
- npm or yarn

### Installation

```bash
npm install
```

### Running locally

```bash
npm run dev
```

Open http://localhost:5173 in your browser.

### Build

```bash
npm run build
```

### Deploy

You can deploy the `dist/` folder to any static host (e.g., Vercel, Netlify, GitHub Pages). Remember to update the Live Site URL above after deployment.

## Author

- Frontend Mentor – https://www.frontendmentor.io/profile/CiaoGab
- GitHub – https://github.com/CiaoGab/mortgage-repayment-calculator-react
- LinkedIn – https://www.linkedin.com/in/juangabrielvallejo/

## Acknowledgments

Thanks to Frontend Mentor for the design and challenge brief.
