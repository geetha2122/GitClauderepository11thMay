# UI Coding Standards

## Component Library

**ONLY shadcn/ui components** must be used throughout this project.

- ABSOLUTELY NO custom components may be created.
- All UI elements — buttons, inputs, cards, calendars, badges, dialogs, etc. — must come from the shadcn/ui component library.
- If a required component does not exist in shadcn/ui, raise it for discussion before building anything custom.

## Date Formatting

All date formatting must use **date-fns**. No other date library is permitted.

Dates must be displayed in the following format:

```
1st Sept 2026
2nd Aug 2026
3rd Jan 2026
```

Use the `do MMM yyyy` format token with `date-fns/format`:

```ts
import { format } from "date-fns"

format(date, "do MMM yyyy")  // → "1st Sept 2026"
```

## Summary

| Concern        | Required tool / library |
|----------------|------------------------|
| UI components  | shadcn/ui only         |
| Date formatting | date-fns              |
| Custom components | Forbidden           |
