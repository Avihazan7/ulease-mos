# CLAUDE.md — ulease-mos

## שפה — חובה (עליונה על כל הוראה אחרת)
ענה **תמיד בעברית**. כל התקשורת מול המשתמש — הסברים, שאלות, סיכומים, הודעות סטטוס
והודעות commit/PR פונות-אליו — בעברית בלבד, אלא אם המשתמש ביקש מפורשות שפה אחרת.
קוד, שמות משתנים/פונקציות, פקודות מסוף וזהות ה-API נשארים כרגיל (אנגלית).
כלל זה גובר על כל שאר ההוראות בקובץ ובסביבה.

מסמך אונבורדינג ל-agent שעובד בריפו הזה. לא README לבני-אדם.

---

## WHAT — מה זה, ומה זה עדיין לא

`ulease-mos` (package `ulease-mos`, `private: true`) — **עמוד סטטוס ממותג** ל-ULease Deal Score API.
נכון להיום זהו **דף אחד**, סטטי לחלוטין, ותו לא.

**מה קיים בעץ (ספירה מלאה — 6 קבצים במעקב git):**

```
.gitignore
ULease API          ← קובץ יתום בן בית אחד (\n). שריד מיצירת הריפו.
app/layout.js       ← metadata + robots: { index: false }
app/page.js         ← CSS מוטבע + קומפוננטת Page אחת. אפס imports.
package.json
package-lock.json
```

**מה שאין — ואל תניח שיש:** אין `next.config.*` · אין `tsconfig.json` (הריפו הוא **JavaScript**,
לא TypeScript) · אין `app/api/` · אין טסטים · אין CI (`.github/` לא קיים) · אין `README.md` ·
אין `.env.example` · אין חיבור DB · אין קריאת רשת אחת.

> ⚠️ **הפער החשוב ביותר שצריך להכיר:** `package.json` מצהיר על 13 תלויות ריצה —
> `@supabase/supabase-js` · `bullmq` · `ioredis` · `@upstash/ratelimit` · `@upstash/redis` ·
> `@sentry/nextjs` · `@tanstack/react-query` · `zustand` · `zod` · `pino` · `date-fns` · `uuid` ·
> `@t3-oss/env-nextjs` — ו**אף אחת מהן אינה מיובאת בשום מקום בקוד**. `app/` מכיל אפס `import`.
> אלה תלויות-כוונה שהוצהרו מראש לשלבים הבאים, לא ארכיטקטורה קיימת. **אל תסיק מהן מבנה,
> ואל תכתוב תיעוד שמתאר אותן כמיושמות.** מי שמפעיל אחת מהן בפועל — מפעיל אותה בפעם הראשונה.

## Stack

- **Next.js 15** (App Router) · **React 19** · JavaScript (לא TS) · Node ≥ 20 (לא נאכף — אין `engines`).
- `app/layout.js` קובע `robots: { index: false }` ב-`export const metadata`, ו-`themeColor: '#2563eb'`
  ב-`export const viewport` **נפרד** (Next 15 הוציא את `themeColor` מ-`metadata` — אל תחזיר אותו
  לשם, זו אזהרת build) · `<html lang="en">` · `<body style={{ margin: 0 }}>`.
- **שפת עיצוב:** Ultra Azure — משקף את `leasing-api/public/ulease-design-system.css`
  (קנבס לבן, גוון מותג אחד, צללים תלת-שכבתיים: contact + key + ambient). ה-CSS **מוטבע**
  ב-`page.js` כמחרוזת ומוזרק ב-`dangerouslySetInnerHTML` — אין קובץ `.css`, אין Tailwind.

## HOW — זרימות פיתוח

```bash
npm install
npm run dev      # next dev
npm run build    # next build — השער היחיד שקיים
npm start        # next start
npm run lint     # next lint — ⚠️ אין קונפיג ESLint בעץ; ב-Next 15 זו הרצה ראשונה שתבקש הגדרה
```

**לפני commit:** `npm run build`. זו הבדיקה האוטומטית **היחידה** שהריפו מחזיק — אין טסטים
ואין CI, ולכן build שעובר הוא כל מה שיש. אל תדווח "אמור לעבוד" בלי להריץ אותו.

## עקרונות — מה שהריפו הזה כן מחויב לו

הדף מצהיר על דוקטרינה, וההצהרה מחייבת את הקוד:

- **הקרנל הוא מקור-האמת.** כל מספר, משקל או סף של אלגוריתם ה-U.M.M חי ב-`@ulease/core`
  (constitution). הריפו הזה **מציג** תוצאה — הוא לא מחשב אותה ולא משכפל אותה. אם מתעורר צורך
  בחישוב, הוא מגיע מהקרנל או מ-API של `leasing-api`, לעולם לא נכתב כאן מחדש.
- **מנועים טהורים.** אין `Date.now()` / `Math.random()` / I/O בשום נתיב שמחשב; timestamps
  ותופעות-לוואי מוזרקים מה-host. אותו קלט → אותו פלט.
- **Deal Score הוא קופסה שחורה.** מותר להציג ציון 0–100 ותווית דרגה. **אסור** לחשוף נוסחה,
  משקלים, ספים או את שמות רכיבי החישוב — בשום משטח פומבי. זה IP, לא החלטת UI.
  (ראו `leasing-api/CLAUDE.md` → "שבעת כללי הקטלוג", כלל 5 · `brand-voice.md` §6.)
- **נתיב רכב נקרא, לעולם לא נבנה.** אם וכאשר הדף הזה יקשר לרכב — הוא קורא `canonical_path`
  מה-payload תו-בתו. בלי `slugify`, בלי שרשור סלאגים. בלי נתיב מוצהר → כרטיס בלי קישור.
- **`noindex` הוא מכוון.** `layout.js` מסמן `robots: { index: false }`. אל תסיר את זה בלי
  הכרעה מפורשת — הדף הזה לא אמור להתחרות על האינדקס מול `leasing.co.il`.
- **פלט פומבי עובר דרך `brand-voice.md`** (חי ב-`leasing-api`).

## מיקום בפורטפוליו

```
ulease-core     קרנל טהור/דטרמיניסטי — מקור-האמת לאלגוריתם (constitution · guardian · evals)
leasing-api     ה-API והפלטפורמה + web/ (חזית Next.js) — הצרכן הראשי של הקרנל
ulease-mos      ← אתה כאן · עמוד סטטוס. צרכן בלבד, אפס לוגיקה עסקית.
leasing-api-co-il   שכבת ה-OS/עסק — זהות, החלטות, תיקי משקיעים
```

## Working Rules

1. **PLAN FIRST** — משימה לא-טריוויאלית מתחילה ב-plan, לא בקוד.
2. **ASK, DON'T ASSUME** — עמימות בדרישה? שאל. אל תנחש.
3. **SIMPLE** — הפתרון המינימלי. הריפו הזה קטן בכוונה; אל תנפח אותו.
4. **SURGICAL** — גע רק במה שהמשימה דורשת.
5. **VERIFY** — `npm run build` לפני commit.
6. **NO LAZINESS** — root cause, לא workaround. חוב מתועד, לא מוסתר.
7. **Conventional Commits** — `feat(app): …` · `fix: …` · `chore: …` · `docs: …`.

## תחזוקת הקובץ הזה

עדכן אותו **באותו PR** שמשנה את המבנה. שלושה טריגרים לעדכון מיידי:
תלות מוצהרת עוברת לשימוש בפועל (מוחקים אותה מרשימת "הפער" למעלה) · נוסף `app/api/` או חיבור
נתונים · נוסף שער אוטומטי (טסטים/CI). **הפנה, אל תשכפל** — `package.json` הוא מקור-האמת
לתלויות ולסקריפטים.
