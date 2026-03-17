---
title: "Unix Timestamp Converter — Convert Epoch Time to Human-Readable Dates Online"
description: "Convert Unix timestamps to readable dates and vice versa. Free online tool for developers working with epoch time, API responses, and database timestamps."
date: "2026-03-16"
keywords: ["unix timestamp converter", "epoch time converter", "unix time to date", "timestamp to date online", "epoch converter", "unix timestamp calculator", "convert epoch to datetime"]
toolSlug: "unix-timestamp-converter"
faq:
  - question: "What is a Unix timestamp?"
    answer: "A Unix timestamp (epoch time) is the number of seconds that have elapsed since January 1, 1970 00:00:00 UTC. For example, the timestamp 1710000000 represents March 9, 2024. It is the standard time format in APIs, databases, and operating systems."
  - question: "What is the difference between seconds and milliseconds timestamps?"
    answer: "Unix timestamps are traditionally in seconds (10 digits, e.g., 1710000000). JavaScript's Date.now() returns milliseconds (13 digits, e.g., 1710000000000). Divide by 1000 to convert milliseconds to seconds."
  - question: "Will Unix timestamps run out?"
    answer: "32-bit Unix timestamps overflow on January 19, 2038 (the Y2038 problem). Modern systems use 64-bit timestamps which last billions of years. Most programming languages already handle this correctly."
  - question: "How do I get the current Unix timestamp?"
    answer: "In JavaScript: Math.floor(Date.now() / 1000). In Python: import time; int(time.time()). In Bash: date +%s. Or use the FlipMyCase Unix Timestamp Converter which shows the current timestamp in real time."
related: ["json-formatter-guide", "hash-generator-guide", "string-encoder-guide"]
---

# Unix Timestamp Converter — Convert Epoch Time to Human-Readable Dates

Every developer eventually encounters a Unix timestamp and needs to figure out what date it represents. An API returns `1710000000` and you need to know if that is yesterday or next month. A database stores `created_at` as epoch seconds and you need to display it as "March 9, 2024." A log file shows timestamps in milliseconds and you need to correlate them with events at specific times.

This guide covers what Unix timestamps are, how to convert them in both directions, how to handle them in code, and the edge cases that cause the most bugs.

## What Is a Unix Timestamp?

A Unix timestamp (also called epoch time or POSIX time) is the number of seconds that have elapsed since the Unix epoch: January 1, 1970, at 00:00:00 UTC. It is a single integer that represents an exact moment in time, independent of time zones, daylight saving, or calendar formats. The timestamp `0` is midnight on January 1, 1970. The timestamp `1710000000` is March 9, 2024, at 16:00:00 UTC.

You would use Unix timestamps for storing dates in databases (compact, sortable, timezone-independent), exchanging dates between APIs (unambiguous format), calculating time differences (simple subtraction), scheduling events (comparing against current time), and logging (precise, sortable chronological ordering).

## How to Convert Timestamps with FlipMyCase

1. Open the [FlipMyCase Unix Timestamp Converter](/unix-timestamp-converter).
2. Enter a Unix timestamp to see the human-readable date, or enter a date to get the timestamp.
3. The tool shows the current timestamp in real time for reference.
4. Copy the converted value for use in your code, API, or database.

The tool handles both seconds (10-digit) and milliseconds (13-digit) timestamps automatically.

## Code Examples for Timestamp Conversion

### JavaScript

```javascript
// Current Unix timestamp (seconds)
const now = Math.floor(Date.now() / 1000);
console.log(now);  // e.g., 1710000000

// Timestamp to human-readable date
const timestamp = 1710000000;
const date = new Date(timestamp * 1000);  // JS uses milliseconds
console.log(date.toISOString());           // 2024-03-09T16:00:00.000Z
console.log(date.toLocaleString());        // 3/9/2024, 11:00:00 AM (local)

// Date string to timestamp
const dateStr = '2024-03-09T16:00:00Z';
const ts = Math.floor(new Date(dateStr).getTime() / 1000);
console.log(ts);  // 1710000000

// Time difference in human-readable format
function timeAgo(timestamp) {
  const seconds = Math.floor(Date.now() / 1000) - timestamp;
  if (seconds < 60) return `${seconds} seconds ago`;
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  return `${Math.floor(seconds / 86400)} days ago`;
}
console.log(timeAgo(now - 3600));  // 1 hours ago
```

### Python

```python
import time
from datetime import datetime, timezone

# Current Unix timestamp
now = int(time.time())
print(now)  # e.g., 1710000000

# Timestamp to datetime
timestamp = 1710000000
dt = datetime.fromtimestamp(timestamp, tz=timezone.utc)
print(dt.isoformat())  # 2024-03-09T16:00:00+00:00
print(dt.strftime('%Y-%m-%d %H:%M:%S UTC'))  # 2024-03-09 16:00:00 UTC

# Datetime to timestamp
from datetime import datetime, timezone
dt = datetime(2024, 3, 9, 16, 0, 0, tzinfo=timezone.utc)
ts = int(dt.timestamp())
print(ts)  # 1710000000

# Parse date string to timestamp
date_str = '2024-03-09T16:00:00Z'
dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
print(int(dt.timestamp()))  # 1710000000

# Milliseconds vs seconds
ms_timestamp = 1710000000000  # 13 digits = milliseconds
sec_timestamp = ms_timestamp // 1000
print(sec_timestamp)  # 1710000000
```

### Go

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    // Current Unix timestamp
    now := time.Now().Unix()
    fmt.Println("Current:", now)

    // Timestamp to readable date
    ts := int64(1710000000)
    t := time.Unix(ts, 0).UTC()
    fmt.Println("Date:", t.Format("2006-01-02 15:04:05 UTC"))
    // Date: 2024-03-09 16:00:00 UTC

    // Date string to timestamp
    parsed, _ := time.Parse(time.RFC3339, "2024-03-09T16:00:00Z")
    fmt.Println("Timestamp:", parsed.Unix())  // 1710000000

    // Time difference
    duration := time.Since(time.Unix(ts, 0))
    fmt.Printf("%.0f days ago\n", duration.Hours()/24)
}
```

## Real-World Use Cases

**API date handling.** Most REST APIs return dates as Unix timestamps or ISO 8601 strings. When debugging an API response, you need to quickly verify that a timestamp like `1710000000` represents the expected date. The [Unix Timestamp Converter](/unix-timestamp-converter) answers this instantly without writing code.

**Database queries with time ranges.** When querying logs or events within a date range, you need to convert human-readable dates to timestamps for WHERE clauses: `WHERE created_at BETWEEN 1709251200 AND 1710000000`. Convert your start and end dates to timestamps before writing the query.

**JWT token expiration.** JWT tokens store expiration as Unix timestamps in the `exp` claim. When debugging authentication, you need to convert the timestamp to verify the token has not expired. Use the [Unix Timestamp Converter](/unix-timestamp-converter) alongside the [JWT Decoder](/jwt-decoder).

**Cron job scheduling and logging.** Cron jobs log execution times as timestamps. Converting these to human-readable dates helps verify that jobs ran at the expected times. Use the [Cron Expression Builder](/cron-expression-builder) to set up schedules and the timestamp converter to verify execution logs.

## Common Mistakes and Gotchas

The seconds vs. milliseconds confusion is the most common bug. JavaScript's `Date.now()` returns milliseconds (13 digits). Most APIs and databases use seconds (10 digits). Forgetting to divide by 1000 gives you a date in the year 56000+. Forgetting to multiply by 1000 gives you January 1970.

Time zone handling causes subtle bugs. `new Date(timestamp * 1000)` in JavaScript converts to the browser's local time zone. If you display this to a user in a different time zone, the date appears wrong. Always work in UTC internally and convert to local time only at the display layer.

The Y2038 problem affects 32-bit systems. A signed 32-bit integer overflows on January 19, 2038, at 03:14:07 UTC. Most modern systems use 64-bit timestamps, but legacy systems, embedded devices, and some databases may still use 32-bit fields. Check your database column types if you store timestamps for dates beyond 2038.

Daylight saving time creates a one-hour ambiguity twice a year. When clocks fall back, the same local time occurs twice. Using UTC timestamps avoids this entirely, which is why all timestamp storage and API exchange should use UTC.

## Conclusion

Unix timestamps are the universal time format for APIs, databases, and systems programming. They are compact, sortable, timezone-independent, and unambiguous. The tradeoff is that they are not human-readable, which is where a converter becomes essential.

The [FlipMyCase Unix Timestamp Converter](/unix-timestamp-converter) handles bidirectional conversion instantly in your browser. For programmatic use, the JavaScript, Python, and Go examples above cover all common timestamp operations. Combine with the [JWT Decoder](/jwt-decoder) for inspecting token expiration and the [JSON Formatter](/json-formatter) for working with API responses that contain timestamps.
