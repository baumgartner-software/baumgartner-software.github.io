#!/usr/bin/env node

/**
 * Build script to replace uaib placeholders with company information
 */

const fs = require('fs');
const path = require('path');

// Company information from company-info.md
const companyInfo = {
  COMPANY_NAME: 'Baumgartner Software UG (haftungsbeschränkt)',
  COMPANY_NAME_SHORT: 'Baumgartner Software UG',
  ADDRESS: 'Bernhardstraße 20, 49413',
  PHONE: '+49 170 2215430',
  EMAIL: 'info@baumgartner-software.de',
  MANAGING_DIRECTOR: 'Nils Baumgartner',
  COMMERCIAL_REGISTER: 'Oldenburg',
  REGISTRATION_NUMBER: 'HRB 219785',
  VAT_ID: 'DE362633044'
};

function replaceUaibPlaceholders(content) {
  let replacedContent = content;
  
  // Replace all uaib placeholders with company information
  Object.keys(companyInfo).forEach(key => {
    const placeholder = `{{uaib.${key}}}`;
    const value = companyInfo[key];
    replacedContent = replacedContent.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value);
  });
  
  return replacedContent;
}

function processFile(filePath) {
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    return;
  }
  
  const content = fs.readFileSync(filePath, 'utf8');
  const processedContent = replaceUaibPlaceholders(content);
  
  // Only write if content changed
  if (content !== processedContent) {
    fs.writeFileSync(filePath, processedContent);
    console.log(`Processed: ${filePath}`);
  } else {
    console.log(`No changes needed: ${filePath}`);
  }
}

// Process HTML files
const htmlFiles = ['index.html'];

htmlFiles.forEach(file => {
  const filePath = path.join(__dirname, file);
  processFile(filePath);
});

console.log('Build process completed!');