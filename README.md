# Relationship Questionnaire (Prototype)

A React-based prototype of a relationship interaction questionnaire,  
adapted from Gilford & Bengtson (1979)’s *Marital Satisfaction Scale*.

This project is intended as a **research and design prototype** to explore
mobile-friendly questionnaire UI, reverse-scored items, and simple feedback
presentation.  
It is **not a diagnostic or clinical assessment tool**.

---

## Features

- 10-item questionnaire with 5-point Likert scale
- Support for reverse-scored items
- Automatic score calculation and average score feedback
- Mobile-friendly, touch-optimized UI
- Simple interpretation text based on score range

---

## Scoring Logic

- Items 1, 3, 5, 6, 9  
  → 1 (Almost never) to 5 (Almost always)

- Items 2, 4, 7, 8, 10 (reverse-scored)  
  → 5 (Almost never) to 1 (Almost always)

The total score is divided by 10 to produce an average score (range: 1–5).

---

## Disclaimer

This questionnaire is provided for **exploratory and educational purposes only**.  
It does not constitute psychological diagnosis or professional advice.
For clinical evaluation or counseling, please consult a qualified professional.

---

## Tech Stack

- React
- Vite
- Tailwind CSS

---

## Run Locally

```bash
npm install
npm run dev
