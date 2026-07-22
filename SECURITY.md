# Security

## Reporting

Please report vulnerabilities privately to the repository owner instead of
opening a public issue with exploit details.

## Token safety

- Keep `GITHUB_TOKEN` in Vercel server environment variables.
- Never use a `NEXT_PUBLIC_` prefix for credentials.
- Never place a token in a README image URL.
- Use minimum GitHub permissions and rotate a token after accidental exposure.
- Optional numbered tokens (`GITHUB_TOKEN_2`, etc.) are only read server-side.

## Input handling

The service validates GitHub usernames and repository names, clamps dimensions
and cache values, bounds custom text, validates colors, and XML-escapes rendered
content.
