---
title: "Extract Emails — How to Pull Email Addresses from Text Online"
description: "Extract all email addresses from any text instantly. Free online tool finds emails in documents, web pages, log files, and messy data. No signup required."
date: "2026-03-16"
keywords: ["extract emails from text", "email extractor", "find emails in text", "email address finder", "pull emails from document", "extract emails online", "email scraper tool"]
toolSlug: "extract-emails"
faq:
  - question: "How do I extract emails from a block of text?"
    answer: "Paste your text into the FlipMyCase Email Extractor. The tool uses regex pattern matching to find all valid email addresses and outputs them as a clean list — one per line, deduplicated, ready to copy."
  - question: "Does the tool extract emails from HTML?"
    answer: "Yes. Paste raw HTML and the tool finds email addresses in both visible text and href attributes (mailto: links). It strips the HTML and extracts just the email addresses regardless of where they appear in the markup."
  - question: "Are extracted emails deduplicated?"
    answer: "Yes. If the same email appears multiple times in your text, the output list contains it only once. The tool also normalizes case so 'User@Example.com' and 'user@example.com' are treated as the same address."
  - question: "Is this tool GDPR compliant?"
    answer: "The tool runs entirely in your browser — no data is transmitted or stored. However, how you use extracted emails must comply with GDPR, CAN-SPAM, and other regulations. Only email contacts who have given consent."
related: ["regex-tester-guide", "text-cleaner-guide", "duplicate-remover-guide"]
---

# Extract Emails — How to Pull Email Addresses from Text Online

Email addresses are scattered across every kind of document — buried in PDFs, mixed into spreadsheet cells, embedded in web pages, sprinkled through log files, and hidden in long email threads. When you need to extract them for a mailing list, CRM import, outreach campaign, or data cleaning project, manually scanning text and copying each address is painfully slow and error-prone.

This guide covers how email extraction works, how to implement it in code with reliable regex patterns, practical use cases, and the legal considerations you must follow.

## What Is Email Extraction?

Email extraction scans a body of text and identifies all strings that match the format of a valid email address — a local part, an @ symbol, and a domain with at least one dot. The regex pattern `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}` captures the vast majority of real-world email addresses. The extracted addresses are collected into a deduplicated list.

You would use email extraction when building contact lists from unstructured data, cleaning CRM imports that contain emails mixed with other text, parsing log files for user identifiers, extracting contacts from email threads, and auditing documents for PII (personally identifiable information).

## How to Extract Emails with FlipMyCase

1. Open the [FlipMyCase Email Extractor](/extract-emails).
2. Paste your text — it can be plain text, HTML, CSV, log output, or any format containing email addresses.
3. The tool instantly finds and lists all email addresses, deduplicated and sorted.
4. Copy the clean list for import into your email platform, spreadsheet, or CRM.

The extractor runs in your browser with no data sent to a server. For extracting URLs instead of emails, use the [URL Extractor](/extract-urls).

## Code Examples for Email Extraction

### JavaScript

```javascript
function extractEmails(text) {
  const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g;
  const matches = text.match(regex) || [];
  // Deduplicate (case-insensitive)
  const seen = new Set();
  return matches.filter(email => {
    const lower = email.toLowerCase();
    if (seen.has(lower)) return false;
    seen.add(lower);
    return true;
  });
}

const text = `
Contact us at support@example.com or sales@example.com.
For press inquiries: press@example.com
Duplicate: SUPPORT@EXAMPLE.COM
Personal: alice.smith+work@gmail.com
Invalid: not-an-email, @missing, incomplete@
`;

const emails = extractEmails(text);
console.log(emails);
// ['support@example.com', 'sales@example.com',
//  'press@example.com', 'alice.smith+work@gmail.com']

// Extract from HTML
const html = '<a href="mailto:contact@site.com">Email us</a> or reach bob@site.com';
console.log(extractEmails(html));
// ['contact@site.com', 'bob@site.com']
```

### Python

```python
import re
from collections import OrderedDict

def extract_emails(text):
    pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
    matches = re.findall(pattern, text)
    # Deduplicate while preserving order (case-insensitive)
    seen = OrderedDict()
    for email in matches:
        lower = email.lower()
        if lower not in seen:
            seen[lower] = email
    return list(seen.values())

text = """
Team contacts:
- Alice: alice@example.com
- Bob: bob@example.com
- Support: support@EXAMPLE.COM
- Alice again: alice@example.com
CC: charlie+work@gmail.com
"""

emails = extract_emails(text)
for email in emails:
    print(email)
# alice@example.com
# bob@example.com
# support@EXAMPLE.COM
# charlie+work@gmail.com

# Extract from a file
with open('document.txt', 'r') as f:
    content = f.read()
file_emails = extract_emails(content)
print(f'Found {len(file_emails)} unique emails')

# Write to CSV
import csv
with open('emails.csv', 'w', newline='') as f:
    writer = csv.writer(f)
    writer.writerow(['email'])
    for email in file_emails:
        writer.writerow([email])
```

### Bash

```bash
# Extract emails from a file
grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' document.txt | sort -uf

# Extract from multiple files
grep -roE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' /path/to/docs/ | \
  cut -d: -f2 | sort -uf

# Extract from a web page
curl -s https://example.com/contact | \
  grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' | sort -uf

# Count unique emails
grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' data.txt | sort -uf | wc -l

# Extract and save to file
grep -oE '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' input.txt | sort -uf > emails.txt
```

## Real-World Use Cases

**CRM data import.** You receive a spreadsheet where email addresses are mixed with names, phone numbers, and notes in the same cells. Paste the entire column into the [Email Extractor](/extract-emails) to pull out just the email addresses, then import the clean list into your CRM.

**Lead list building.** When compiling contacts from multiple sources — conference attendee lists, partnership documents, email threads — extract all emails, deduplicate them with the tool (or the [Duplicate Remover](/duplicate-line-remover)), and normalize to lowercase before importing.

**PII auditing.** GDPR and privacy compliance require knowing what personal data exists in your documents. Run email extraction across your document repository to identify where email addresses appear, so you can apply appropriate data protection measures.

**Log analysis.** Application logs contain user email addresses in error messages, authentication events, and transaction records. Extract unique emails to identify affected users during an incident investigation.

## Common Mistakes and Gotchas

The standard email regex misses some valid addresses and matches some invalid ones. Email addresses can technically contain characters like `!#$%&'*/=?^{|}~` in the local part, and domains can be IP addresses in brackets. However, the practical regex `[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}` catches 99%+ of real-world addresses.

False positives happen with technical strings. File references like `user@localhost`, version strings like `v2.0@release`, and internal identifiers may match the email pattern but are not actual email addresses. Review extracted lists before sending to them.

Case normalization matters for deduplication. `User@Example.COM` and `user@example.com` are the same address, but string comparison treats them as different. Always lowercase before deduplicating. The [Email Extractor](/extract-emails) handles this automatically.

Legal compliance is your responsibility. Extracting emails is a technical operation; using them for unsolicited communication may violate GDPR, CAN-SPAM, CASL, or other regulations. Only email contacts who have given explicit consent or with whom you have a legitimate business relationship.

## Conclusion

Email extraction turns unstructured text into actionable contact lists. Whether you are cleaning CRM data, building outreach lists, auditing for PII, or analyzing logs, automated extraction is faster and more reliable than manual scanning.

The [FlipMyCase Email Extractor](/extract-emails) finds and deduplicates email addresses from any text instantly in your browser. For programmatic extraction, the JavaScript, Python, and Bash examples above handle files, HTML, and bulk processing. Test your email regex patterns in the [Regex Tester](/regex-tester) and deduplicate results with the [Duplicate Remover](/duplicate-line-remover).
