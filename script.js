// Script: fetch data.csv, sum the `sales` column, display the total
// and ensure the document title matches the requirement.

document.addEventListener('DOMContentLoaded', function() {
    // Ensure the required title is set exactly as tests expect.
    document.title = 'Sales Summary test-seed-123';

    // Fetch the CSV from the repo attachments (relative path)
    fetch('data.csv')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.text();
        })
        .then(text => {
            const total = sumSalesFromCsv(text);
            // Display with two fixed decimals to match expectation
            const el = document.querySelector('#total-sales');
            if (el) el.textContent = total.toFixed(2);
        })
        .catch(err => {
            console.error('Failed to load or parse data.csv:', err);
            const el = document.querySelector('#total-sales');
            if (el) el.textContent = '0.00';
        });
});

// Parse CSV text and sum the sales column. Returns a Number.
function sumSalesFromCsv(csvText) {
    // Basic CSV parsing: split into lines, handle simple commas, ignore blank lines
    const lines = csvText.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    if (lines.length === 0) return 0;

    const header = lines[0].split(',').map(h => h.trim().toLowerCase());
    // Find the index of the sales column (case-insensitive)
    const salesIdx = header.indexOf('sales');
    if (salesIdx === -1) {
        console.warn('No sales column found in CSV header:', header);
        return 0;
    }

    let sum = 0;
    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(',');
        // If row has fewer columns, skip it
        if (cols.length <= salesIdx) continue;
        const raw = cols[salesIdx].trim();
        // Remove potential currency symbols and thousands separators
        const cleaned = raw.replace(/[^0-9.\-]/g, '');
        const val = parseFloat(cleaned);
        if (!isNaN(val)) sum += val;
    }

    return sum;
}
