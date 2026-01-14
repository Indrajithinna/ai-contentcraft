# Security Policy

## Supported Versions

We release patches for security vulnerabilities for the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability, please do the following:

1. **Do NOT** open a public issue
2. Email the details to: [your-email@example.com]
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will respond within 48 hours and work with you to address the issue.

## Security Best Practices

When using AI ContentCraft:

1. **API Keys**: Never commit API keys to version control
2. **Environment Variables**: Always use `.env.local` for sensitive data
3. **Dependencies**: Keep dependencies up to date
4. **Input Validation**: Validate all user inputs before processing
5. **HTTPS**: Always use HTTPS in production

## Disclosure Policy

- We will acknowledge your report within 48 hours
- We will provide an estimated timeline for a fix
- We will notify you when the vulnerability is fixed
- We will credit you in the security advisory (unless you prefer to remain anonymous)

Thank you for helping keep AI ContentCraft secure!
