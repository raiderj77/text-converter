---
title: "Database column naming: snake_case vs PascalCase debate settled"
date: "2026-05-13"
slug: "database-column-naming-snake-case-vs-pascalcase-debate-settled"
description: ""
status: published
---

# Database Column Naming: snake_case vs PascalCase Debate Settled

> **Short answer:** Use snake_case for database columns. Every major database style guide recommends it, SQL is case-insensitive by default, and ORM mapping is trivial. PascalCase columns create quoting requirements, cross-database portability headaches, and friction with every SQL tool in your stack. The debate is settled. Here is why.

---

## Why does SQL default behavior matter here?

SQL identifiers are case-insensitive by default, so the engine folds unquoted names to lowercase. PostgreSQL stores UserId as userid, forcing double quotes everywhere you reference it. One missing quote in a migration or reporting tool silently breaks queries. snake_case sidesteps the problem entirely by matching what the engine stores natively.


SQL identifiers are case-insensitive unless quoted. That single fact makes PascalCase columns a liability, not a preference.

When you create a column named `UserId` in PostgreSQL, the engine stores it as `userid`. To actually get `UserId` back, you need double quotes everywhere: `SELECT "UserId" FROM "Users"`. Miss one quote in a raw query, a migration script, or a reporting tool, and you silently get the wrong column or an error. [PostgreSQL's documentation on identifier folding](https://www.postgresql.org/docs/current/sql-syntax-lexical.html#SQL-SYNTAX-IDENTIFIERS) is explicit: unquoted identifiers are folded to lowercase.

MySQL on Windows folds identifiers differently than MySQL on Linux because of filesystem case sensitivity. A schema with `UserName` works on your Windows dev box and breaks in production on Linux unless `lower_case_table_names` is set correctly. That is a real deployment bug waiting to happen, documented in the [MySQL manual on identifier case sensitivity](https://dev.mysql.com/doc/refman/8.0/en/identifier-case-sensitivity.html).

[snake_case sidesteps all of this](/blog/when-snakecase-beats-camelcase-in-2026-codebases/). `user_id` is `user_id` everywhere, quoted or not, on every platform.

---

## What do the actual style guides say?

Every major SQL style guide recommends snake_case. GitLab's internal SQL guide mandates it, and Simon Holywell's widely referenced SQL Style Guide explicitly requires lowercase with underscores. No mainstream style guide recommends PascalCase for column names. The consensus is not ambiguous, it is just frequently ignored in ORM-heavy ecosystems.


The major references converge on snake_case for relational databases.

[GitLab's SQL style guide](https://about.gitlab.com/handbook/business-technology/data-team/platform/sql-style-guide/) mandates snake_case for all identifiers. [Simon Holywell's SQL Style Guide](https://www.sqlstyle.guide/), one of the most-referenced community standards, explicitly recommends lowercase with underscores and warns against CamelCase. The [dbt Labs style guide](https://docs.getdbt.com/blog/on-the-importance-of-naming), used by thousands of data teams, standardizes on snake_case throughout.

On the application side, [Django's ORM](https://docs.djangoproject.com/en/4.2/topics/db/models/) generates snake_case columns by default. [Rails ActiveRecord](https://guides.rubyonrails.org/active_record_basics.html) does the same. These are not accidents. The frameworks made an opinionated choice based on what works cleanly with SQL engines.

PascalCase columns appear most often in SQL Server shops where the Windows-first heritage and case-insensitive collations masked the problem for years. That is a legacy context, not a recommendation.

---

## Does ORM mapping change the calculus?

No. ORMs exist to translate between database conventions and application conventions, so let them do that job. Django, ActiveRecord, and SQLAlchemy all map snake_case columns to idiomatic application properties with zero configuration. Designing your schema around ORM convenience inverts the responsibility and leaves raw SQL, migrations, and reporting tools worse off.


No. ORMs handle the translation; you should not design your schema around it.

Every mainstream ORM maps snake_case database columns to camelCase or PascalCase application properties without configuration:

```python
# Django - column: first_name, Python attribute: first_name
class User(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
```

```typescript
// TypeORM - column: created_at, TypeScript property: createdAt
@Entity()
export class User {
  @Column({ name: 'created_at' })
  createdAt: Date;
}
```

```ruby
# Rails - column: phone_number, Ruby method: phone_number / phone_number=
user.phone_number
```

Prisma does this automatically with `@map` and the `@@map` convention, and its default code generator assumes snake_case columns. Sequelize has a `underscored: true` option that converts camelCase model fields to snake_case columns globally.

The mapping cost is near zero. The cost of managing quoted PascalCase identifiers across migrations, seed scripts, raw queries, and reporting tools is not.

---

## Are there real performance or storage differences?

No meaningful performance or storage differences exist. The real cost is readability in slow query logs, monitoring dashboards, and incident investigations. snake_case column names scan faster in plain text output, and tools like pgBadger or Datadog's query analysis render them without the visual noise that mixed-case identifiers introduce under pressure.


No meaningful ones, but there is a readability tax worth naming.

Column name length and character set have negligible storage impact. What does matter is [query readability in logs, slow query analysis, and database monitoring tools](/blog/the-relationship-between-code-readability-and-the-use-of-cam/). A slow query log entry with `SELECT u.firstName, o.orderId FROM Users u JOIN Orders o` requires more cognitive parsing than `SELECT u.first_name, o.order_id FROM users u JOIN orders o`. The underscores make word boundaries unambiguous without relying on case.

This matters more than it sounds. At scale, you are reading hundreds of query logs, EXPLAIN outputs, and migration diffs. Reducing parse time per line adds up across a team.

---

## What about SQL Server specifically?

SQL Server's default CI_AS collation makes PascalCase work without quoting, which is why the habit persists in .NET shops. That convenience disappears the moment you run tests against PostgreSQL or SQLite, migrate to a different engine, or share schema definitions across teams. snake_case works correctly on SQL Server and every other engine.


SQL Server's case-insensitive collation (the default `SQL_Latin1_General_CP1_CI_AS`) means PascalCase columns work without quoting. That is why the convention persists in .NET and SQL Server ecosystems.

But "works without quoting on SQL Server with default collation" is not the same as "is a good idea." Problems surface when:

- You run integration tests against PostgreSQL or SQLite (common in CI pipelines)
- You expose the schema through an API or reporting layer that is database-agnostic
- You migrate to or replicate into a case-sensitive system
- New team members from non-SQL Server backgrounds hit quoting errors immediately

If your stack is permanently SQL Server and never touches another engine, PascalCase is survivable. It is still not better. It is just not actively broken in that specific context.

---

## What about the `id` column specifically?

Use id for primary keys and table_name_id for foreign keys, always lowercase. The Id, ID, and UserId variants are the most common source of minor but annoying schema inconsistencies. Enforce the pattern in your migration linter. Both squawk and sqlfluff support rules that flag non-conforming identifier names before they reach production.


Use `id` as a plain integer primary key or `user_id`, `order_id` as foreign keys. Do not use `ID`, `Id`, or `UserId`.

The `Id` vs `id` vs `ID` inconsistency is one of the most common sources of minor schema bugs. Pick `id` for primary keys and `{table_name}_id` for foreign keys, and enforce it in your migration linter. [squawk](https://squawkhq.com/) and [sqlfluff](https://sqlfluff.com/) both support rules for this.

---

## What is the practical checklist?

Use lowercase snake_case for all tables and columns, plural table names, and no quoted identifiers in new migrations. Foreign keys follow the user_id pattern, booleans use is_ or has_ prefixes, and timestamps are created_at and updated_at. Enforce this with sqlfluff or squawk in CI so the rules outlive any single developer's memory.


- All column names: lowercase snake_case
- All table names: lowercase snake_case, plural (`users`, `order_items`)
- No quoted identifiers in migrations unless you are fixing a legacy schema
- Foreign keys: `{referenced_table_singular}_id` (`user_id`, `product_id`)
- Booleans: `is_active`, `has_verified_email` (not `active`, not `verified`)
- Timestamps: `created_at`, `updated_at` (not `createdAt`, not `CreatedDate`)

Run sqlfluff or squawk in CI. Enforce the convention at the tool level, not through code review comments.

---

The snake_case recommendation is not aesthetic preference. It is the choice that avoids a category of real bugs, aligns with the default behavior of SQL engines, and matches what every major style guide and ORM expects. PascalCase columns are a holdover from a specific ecosystem context. Outside that context, they are friction with no upside.

## Frequently asked questions

### Should database columns use snake_case or PascalCase?
Snake_case is generally recommended for database column names. Most major databases and SQL style guides favor snake_case because SQL keywords are case-insensitive, making PascalCase visually ambiguous in queries. Snake_case also improves readability in raw SQL, aligns with PostgreSQL and MySQL conventions, and avoids quoting requirements in case-sensitive engines. That said, if your ORM or team already standardizes on PascalCase, consistency within your project matters more than following a universal rule.

### Does the database engine affect which naming convention I should choose?
Yes, your database engine significantly influences the best naming convention. PostgreSQL folds unquoted identifiers to lowercase, making PascalCase columns require quoted names in every query. MySQL on Windows is case-insensitive by default but case-sensitive on Linux, creating cross-platform risks. SQL Server handles PascalCase more gracefully. Checking your specific engine's behavior before establishing a convention prevents painful migration headaches and unexpected query failures later.

### How does ORM choice impact database column naming conventions?
Your ORM can make either convention seamless or painful. Entity Framework defaults favor PascalCase to match C# property names, while ActiveRecord and SQLAlchemy naturally map to snake_case. Mismatching your ORM's defaults with your column naming means writing extra mapping configuration for every model. Choosing a convention that aligns with your ORM's assumptions reduces boilerplate code, minimizes bugs from manual mapping errors, and keeps your codebase easier to onboard new developers into.

### Can I convert between snake_case and PascalCase automatically for database work?
Yes, you can convert between cases automatically using tools like flipmycase.com or built-in ORM mapping features. Many ORMs offer automatic case translation, so your C# PascalCase properties map cleanly to snake_case database columns without manual configuration. For one-off conversions during migrations or schema reviews, online case conversion tools let you paste column lists and instantly reformat them, saving significant time when renaming dozens of columns during a refactor.

### What naming convention should I use when my frontend and backend teams disagree?
Establish snake_case for the database layer and let each application layer use its own convention with automatic mapping. Databases benefit from snake_case consistency regardless of what your frontend JavaScript or backend C# prefers. Modern frameworks handle the translation automatically. Trying to force one universal case across every layer creates awkward code in at least one environment. Document the boundary clearly in your style guide so both teams understand where each convention applies.


<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Should database columns use snake_case or PascalCase?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Snake_case is generally recommended for database column names. Most major databases and SQL style guides favor snake_case because SQL keywords are case-insensitive, making PascalCase visually ambiguous in queries. Snake_case also improves readability in raw SQL, aligns with PostgreSQL and MySQL conventions, and avoids quoting requirements in case-sensitive engines. That said, if your ORM or team already standardizes on PascalCase, consistency within your project matters more than following a universal rule."
      }
    },
    {
      "@type": "Question",
      "name": "Does the database engine affect which naming convention I should choose?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, your database engine significantly influences the best naming convention. PostgreSQL folds unquoted identifiers to lowercase, making PascalCase columns require quoted names in every query. MySQL on Windows is case-insensitive by default but case-sensitive on Linux, creating cross-platform risks. SQL Server handles PascalCase more gracefully. Checking your specific engine's behavior before establishing a convention prevents painful migration headaches and unexpected query failures later."
      }
    },
    {
      "@type": "Question",
      "name": "How does ORM choice impact database column naming conventions?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Your ORM can make either convention seamless or painful. Entity Framework defaults favor PascalCase to match C# property names, while ActiveRecord and SQLAlchemy naturally map to snake_case. Mismatching your ORM's defaults with your column naming means writing extra mapping configuration for every model. Choosing a convention that aligns with your ORM's assumptions reduces boilerplate code, minimizes bugs from manual mapping errors, and keeps your codebase easier to onboard new developers into."
      }
    },
    {
      "@type": "Question",
      "name": "Can I convert between snake_case and PascalCase automatically for database work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, you can convert between cases automatically using tools like flipmycase.com or built-in ORM mapping features. Many ORMs offer automatic case translation, so your C# PascalCase properties map cleanly to snake_case database columns without manual configuration. For one-off conversions during migrations or schema reviews, online case conversion tools let you paste column lists and instantly reformat them, saving significant time when renaming dozens of columns during a refactor."
      }
    },
    {
      "@type": "Question",
      "name": "What naming convention should I use when my frontend and backend teams disagree?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Establish snake_case for the database layer and let each application layer use its own convention with automatic mapping. Databases benefit from snake_case consistency regardless of what your frontend JavaScript or backend C# prefers. Modern frameworks handle the translation automatically. Trying to force one universal case across every layer creates awkward code in at least one environment. Document the boundary clearly in your style guide so both teams understand where each convention applies."
      }
    }
  ]
}
</script>
