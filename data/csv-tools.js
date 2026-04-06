#!/usr/bin/env node
/**
 * FeverBee Platform Data — CSV Export/Import Tools
 *
 * EXPORT (generate CSV for editing):
 *   node data/csv-tools.js export
 *   → Creates data/platform-scores.csv
 *   → Open in Google Sheets, Excel, etc.
 *   → Edit scores, verdicts, editorial content
 *   → Save as CSV
 *
 * IMPORT (apply CSV changes back to platforms.js):
 *   node data/csv-tools.js import
 *   → Reads data/platform-scores.csv
 *   → Updates scores, verdicts, editorial in data/platforms.js
 *   → Creates a backup at data/platforms.js.bak
 *
 * EDITABLE COLUMNS:
 *   - easeOfUse, qualityOfFeatures, integrations,
 *     dataPrivacySecurity, servicesSupport, reportsAnalytics (scores 0-10)
 *   - verdict (text), verdictType (rising/steady/declining/watch)
 *   - editorial (text)
 *   - tagline, pricing, target (text)
 */

const fs = require('fs');
const path = require('path');

const DATA_DIR = __dirname;
const PLATFORMS_FILE = path.join(DATA_DIR, 'platforms.js');
const CSV_FILE = path.join(DATA_DIR, 'platform-scores.csv');

function loadPlatforms() {
  let src = fs.readFileSync(PLATFORMS_FILE, 'utf8');
  src = src.replace(/^const /gm, 'var ');
  eval(src);
  return platforms;
}

function exportCSV() {
  const platforms = loadPlatforms();
  const headers = [
    'id','name','category','catLabel','tagline','pricing','target',
    'verdict','verdictType','website',
    'easeOfUse','qualityOfFeatures','integrations',
    'dataPrivacySecurity','servicesSupport','reportsAnalytics',
    'editorial'
  ];

  let csv = headers.join(',') + '\n';
  platforms.forEach(p => {
    const row = headers.map(h => {
      const val = p[h];
      if (val === undefined) return '""';
      const str = String(val).replace(/"/g, '""');
      return `"${str}"`;
    });
    csv += row.join(',') + '\n';
  });

  fs.writeFileSync(CSV_FILE, csv);
  console.log(`Exported ${platforms.length} platforms to ${CSV_FILE}`);
  console.log('Open in Google Sheets or Excel, edit, save as CSV, then run: node data/csv-tools.js import');
}

function parseCSV(text) {
  const rows = [];
  let current = '';
  let inQuotes = false;
  let row = [];

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch === '"') {
      if (inQuotes && text[i+1] === '"') { current += '"'; i++; }
      else { inQuotes = !inQuotes; }
    } else if (ch === ',' && !inQuotes) {
      row.push(current); current = '';
    } else if ((ch === '\n' || ch === '\r') && !inQuotes) {
      if (ch === '\r' && text[i+1] === '\n') i++;
      row.push(current); current = '';
      if (row.length > 1) rows.push(row);
      row = [];
    } else {
      current += ch;
    }
  }
  if (current || row.length) { row.push(current); rows.push(row); }
  return rows;
}

function importCSV() {
  if (!fs.existsSync(CSV_FILE)) {
    console.error(`CSV file not found: ${CSV_FILE}`);
    console.error('Run "node data/csv-tools.js export" first');
    process.exit(1);
  }

  // Backup
  const backup = PLATFORMS_FILE + '.bak';
  fs.copyFileSync(PLATFORMS_FILE, backup);
  console.log(`Backup saved to ${backup}`);

  const csvText = fs.readFileSync(CSV_FILE, 'utf8');
  const rows = parseCSV(csvText);
  const headers = rows[0];
  const dataRows = rows.slice(1);

  // Build lookup of CSV data by id
  const csvData = {};
  dataRows.forEach(row => {
    const obj = {};
    headers.forEach((h, i) => { obj[h] = row[i] || ''; });
    csvData[obj.id] = obj;
  });

  // Read the original JS file
  let src = fs.readFileSync(PLATFORMS_FILE, 'utf8');

  // Score fields to update
  const scoreFields = ['easeOfUse','qualityOfFeatures','integrations','dataPrivacySecurity','servicesSupport','reportsAnalytics'];
  const textFields = ['tagline','pricing','target','verdict','verdictType','editorial'];

  let updated = 0;
  Object.entries(csvData).forEach(([id, data]) => {
    // Update scores
    scoreFields.forEach(field => {
      const val = parseFloat(data[field]);
      if (!isNaN(val)) {
        // Match the pattern: fieldName:oldValue
        const regex = new RegExp(`(id:"${id}"[\\s\\S]*?)${field}:([\\d.]+)`);
        const match = src.match(regex);
        if (match && parseFloat(match[2]) !== val) {
          src = src.replace(regex, `$1${field}:${val}`);
          console.log(`  ${data.name}: ${field} ${match[2]} → ${val}`);
          updated++;
        }
      }
    });

    // Update text fields
    textFields.forEach(field => {
      const newVal = data[field];
      if (newVal) {
        const escaped = newVal.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        const regex = new RegExp(`(id:"${id}"[\\s\\S]*?)${field}:"([^"]*(?:\\\\.[^"]*)*)"`, 's');
        const match = src.match(regex);
        if (match && match[2] !== escaped) {
          src = src.replace(regex, `$1${field}:"${escaped}"`);
          console.log(`  ${data.name}: ${field} updated`);
          updated++;
        }
      }
    });
  });

  fs.writeFileSync(PLATFORMS_FILE, src);
  console.log(`\nDone. ${updated} fields updated in ${PLATFORMS_FILE}`);
}

// CLI
const cmd = process.argv[2];
if (cmd === 'export') exportCSV();
else if (cmd === 'import') importCSV();
else {
  console.log('Usage:');
  console.log('  node data/csv-tools.js export   — Generate CSV for editing');
  console.log('  node data/csv-tools.js import   — Apply CSV changes back to platforms.js');
}
