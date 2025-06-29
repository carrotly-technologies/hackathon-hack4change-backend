# Activity REST API

This document describes the REST API endpoints for the Activity module, which clones all the functionality from the GraphQL resolver.

## Base URL
All endpoints are prefixed with `/api/activities`

## Endpoints

### GET /api/activities
Get paginated list of activities with filtering, sorting, and pagination.

**Query Parameters:**
- `userId` (string, optional): Filter by user ID
- `activityType` (string, optional): Filter by activity type
- `isActive` (boolean, optional): Filter by active status
- `sortBy` (string, optional): Sort field
- `sortOrder` (string, optional): Sort order (asc/desc)
- `page` (number, optional): Page number
- `limit` (number, optional): Items per page

**Response:** `ActivityPaginationResponse`

### GET /api/activities/:id
Get a specific activity by ID.

**Path Parameters:**
- `id` (string): Activity ID

**Response:** `ActivityObject | null`

### GET /api/activities/user/:userId/started
Get the currently active activity for a user.

**Path Parameters:**
- `userId` (string): User ID

**Response:** `ActivityObject | null`

### GET /api/activities/trash-map
Get all trash locations from activities.

**Response:** `PathPointObject[]`

### GET /api/activities/:activityId/duration
Get the current duration of an active activity.

**Path Parameters:**
- `activityId` (string): Activity ID

**Response:** `number | null`

### POST /api/activities
Create a new activity.

**Request Body:** `ActivityCreateInput`
```json
{
  "userId": "string",
  "activityType": "walking|running|biking|trekking|other",
  "description": "string",
  "name": "string",
  "durationTime": 0,
  "distance": 0,
  "points": 0,
  "imageUrls": ["string"],
  "path": [{"lat": "string", "lon": "string"}],
  "trashLocations": [{"lat": "string", "lon": "string"}]
}
```

**Response:** `ActivityObject` (201 Created)

### POST /api/activities/start
Start a new activity for a user.

**Request Body:** `ActivityStartInput`
```json
{
  "userId": "string",
  "activityType": "walking|running|biking|trekking|other"
}
```

**Response:** `ActivityObject` (201 Created)

### POST /api/activities/end
End an active activity.

**Request Body:** `ActivityEndInput`
```json
{
  "activityId": "string",
  "distance": 0,
  "imageUrls": ["string"]
}
```

**Response:** `ActivityObject` (201 Created)

### POST /api/activities/add-score
Add points to an active activity.

**Request Body:** `ActivityAddScoreInput`
```json
{
  "activityId": "string",
  "points": 0
}
```

**Response:** `ActivityObject` (201 Created)

### POST /api/activities/add-trash
Add a trash location to an active activity.

**Request Body:** `ActivityAddTrashInput`
```json
{
  "activityId": "string",
  "lat": "string",
  "lon": "string"
}
```

**Response:** `ActivityObject` (201 Created)

### POST /api/activities/add-path-point
Add a path point to an active activity.

**Request Body:** `ActivityAddPathPointInput`
```json
{
  "activityId": "string",
  "lat": "string",
  "lon": "string"
}
```

**Response:** `ActivityObject` (201 Created)

### PUT /api/activities/:id
Update an existing activity.

**Path Parameters:**
- `id` (string): Activity ID

**Request Body:** `ActivityUpdateInput`
```json
{
  "id": "string",
  "durationTime": 0,
  "distance": 0,
  "trashCount": 0,
  "points": 0,
  "activityType": "walking|running|biking|trekking|other",
  "description": "string",
  "name": "string",
  "imageUrls": ["string"],
  "path": [{"lat": "string", "lon": "string"}]
}
```

**Response:** `ActivityObject | null` (200 OK)

### DELETE /api/activities/:id
Delete an activity.

**Path Parameters:**
- `id` (string): Activity ID

**Response:** `ActivityObject | null` (200 OK)

## Error Responses

All endpoints may return the following error responses:

- `400 Bad Request`: Validation errors or business logic violations
- `404 Not Found`: Resource not found
- `500 Internal Server Error`: Server errors

## Data Types

### ActivityObject
```json
{
  "id": "string",
  "userId": "string",
  "activityType": "string",
  "description": "string",
  "name": "string",
  "isActive": "boolean",
  "startTime": "string",
  "endTime": "string",
  "durationTime": "number",
  "distance": "number",
  "points": "number",
  "imageUrls": ["string"],
  "path": [{"lat": "string", "lon": "string"}],
  "trashLocations": [{"lat": "string", "lon": "string"}]
}
```

### PathPointObject
```json
{
  "lat": "string",
  "lon": "string"
}
```

### ActivityPaginationResponse
```json
{
  "data": ["ActivityObject"],
  "metadata": {
    "total": "number",
    "page": "number",
    "limit": "number",
    "totalPages": "number"
  }
}
``` 