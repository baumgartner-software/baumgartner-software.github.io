# baumgartner-software.github.io

This is the official website for Baumgartner Software UG.

## Build Process

The website uses a build process to replace uaib placeholders with company information:

- Company information is stored in `company-info.md`
- HTML templates use `{{uaib.VARIABLE_NAME}}` placeholders
- The `build.js` script replaces placeholders during GitHub Actions deployment
- The GitHub Actions workflow automatically processes placeholders before deployment

## Company Information Integration

The following placeholders are automatically replaced:

- `{{uaib.COMPANY_NAME}}` - Full company name with legal form
- `{{uaib.COMPANY_NAME_SHORT}}` - Short company name
- `{{uaib.ADDRESS}}` - Company address
- `{{uaib.PHONE}}` - Phone number
- `{{uaib.EMAIL}}` - Email address
- `{{uaib.MANAGING_DIRECTOR}}` - Managing director name
- `{{uaib.COMMERCIAL_REGISTER}}` - Commercial register location
- `{{uaib.REGISTRATION_NUMBER}}` - Registration number
- `{{uaib.VAT_ID}}` - VAT identification number

## Local Development

To test the build process locally:

```bash
node build.js
```

This will process the HTML file and replace all uaib placeholders with the actual company information.