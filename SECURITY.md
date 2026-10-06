# Security reporting

Please report suspected credential leaks or authorization vulnerabilities privately using the repository owner's GitHub profile contact options. Do not post tokens, passwords, user records, or exploit details in public issues. Private vulnerability reporting is not assumed to be enabled.

This project has no security support SLA. Use synthetic data when evaluating it. Production operators must configure HTTPS, secrets, PostgreSQL backups, email delivery, and distributed abuse controls before accepting public traffic.

The credential-pattern scan detects a limited set of key formats; a passing scan is not proof that all sensitive data is absent. Rotate any exposed credential before considering a leak resolved.
