# Airtable Export

## Setup

Create a **airtable-export.config.json** file containing your table names and the export file destinations:
```json
{
  "tables": [
    ["Your Table Name 1", "data/your-table-name-1.json"],
    ["Your Table Name 2", "data/your-table-name-2.json"]
  ]
}
```

Run:
```
npx airtable-export
```
