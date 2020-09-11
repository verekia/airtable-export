# Airtable Export

## Setup

Create a **.env** file containing:
```env
AIRTABLE_PERSONAL_KEY='keyYOUR_KEY'
AIRTABLE_BASE_ID='appYOUR_BASE_ID'
```

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
