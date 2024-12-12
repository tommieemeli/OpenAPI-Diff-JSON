# OpenAPI Specification Comparator

This project compares two OpenAPI specifications in JSON format and identifies the differences between them. The script uses the `openapi-diff` library to detect changes such as added, removed, or modified paths, responses, or parameters.

## Prerequisites

- Node.js (preferably version 14 or above)

You can install them using npm:

```sh
npm install
```

## Example result

```sh
Difference #1:
  Type: breaking
  Action: remove
  Code: path.remove
  Entity: path
  Source: openapi-diff
  Source Details:
    [1] {
      "location": "paths./users/{id}",
      "value": {
        "get": {
          "summary": "Get user by ID",
          "responses": {
            "200": {
              "description": "Successful response"
            }
          }
        }
      }
    }
}
```
