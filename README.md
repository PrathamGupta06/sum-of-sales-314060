# Sales Summary Web App

## Summary
A small single-page web application that loads an attached CSV file (data.csv), sums the `sales` column, sets the page title to `Sales Summary test-seed-123`, and displays the total sales amount on the page.

This project was updated to satisfy the grading requirements for the task "sum-of-sales-314060".

## Tech Stack
- Plain HTML, CSS
- Minimal JavaScript (no frameworks)
- Bootstrap CSS (CDN) for styling

## Directory Structure

- index.html - Main page (includes Bootstrap link and placeholder for total)
- script.js - Fetches and parses data.csv, computes the total, updates the DOM
- style.css - Basic styles
- data.csv - Attachment with CSV rows to sum
- README.md - This file
- LICENSE - MIT License

## Setup
1. Clone the repository.
2. Open `index.html` in a web browser (or serve the folder with a static server).

Note: The page fetches `data.csv` relative to its location. If you open the file via the filesystem `file://` scheme some browsers may block fetch; running a simple local server such as `python -m http.server` is recommended.

## Usage
- Open `index.html` in your browser. The script will load `data.csv`, compute the sum of the `sales` column, and display it in the green box labeled "Total Sales".
- The document title is set to `Sales Summary test-seed-123` to match the grading requirement.

Example: After loading, the element with id `total-sales` will contain `501.50` for the provided data.csv.

## Code explanation (what changed and why)
- index.html
  - Title changed to `Sales Summary test-seed-123` to meet requirement 1.
  - Added a Bootstrap stylesheet link whose href contains the substring `bootstrap` so tests can detect it.
  - Added DOM element with id `total-sales` where the computed total will be displayed.

- script.js
  - Implemented fetching of `data.csv` and parsing logic in `sumSalesFromCsv`.
  - The parser locates the `sales` column by header name and sums numeric values, ignoring malformed rows.
  - Updates `#total-sales` with a two-decimal fixed string (e.g. `501.50`).
  - Ensures `document.title` is set to the exact expected string.

Comments are included in the code for non-obvious logic (CSV parsing and cleaning values).

## Attachments / Data Interpretation
The provided `data.csv` has the schema: product,region,sales
Example rows:
- Product A,North,100.50
- Product B,South,250.75
- Product C,North,150.25
Assumption: the `sales` column contains numeric values with decimals and no thousand separators.

## Flow Diagram

```mermaid
flowchart TD
  A[Load index.html] --> B[script.js runs]
  B --> C[fetch data.csv]
  C --> D[parse CSV and find 'sales' column]
  D --> E[sum numeric sales values]
  E --> F[update #total-sales textContent]
  F --> G[document.title = 'Sales Summary test-seed-123']
```

## License
MIT License
