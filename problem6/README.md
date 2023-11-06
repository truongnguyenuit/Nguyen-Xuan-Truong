# Scoreboard API Module

## 1.Overview 
This module is responsible for providing a RESTful interface to interact with the scoreboard data. It provides endpoints that allow users to increase their score by performing actions and update scoreboard real-time.

## 2.Update user score module
ENDPOINT: POST `/api/user/score/update`
DESCRIPTION: Increase a user's score after they complete an action. This involves several checks:

Verify the status of the action they completed.
Confirm the user's completion of the action.
Check the validity of the secret token they provided before increasing their score.
If everything is in order, increase their score and log the action in the database, making the secret token expire.

### Return false if:

- `userId` is not provided.
- `actionId` is not provided.
- `secretToken` is not provided.

### Return false if:

- No user with the provided `userId` is found in the database.
- No action with the provided `actionId` is found in the database.

### Return false if:

The time of the last update is less than 24 hours **`can be flexible in a real project`**
- The `secretToken` has expired.

### After decoding the secret token to obtain `userId` and `ACCESS_SALT`:

- Return false if `userId` does not match the provided `userId`.
- Return false if `ACCESS_SALT` does not match the `ACCESS_SALT` in the .env file.

### If the score update is successful:

Write a log for the scoreboard.
Make the `secretToken` expired.
Return `true`.
Otherwise, return `false`.

### REQUEST:
`json`
{
  `"userId"`: "string",
  `"actionId"`: "string",
  `"secretToken"`: "string"
}

### RESPONSE: 
`json` 
{
  `"success"`: "boolean",
  `"message"`: "string",
  `"user"`: "Object"
}

## 3.Software Requirements

### a.API score board
  If people complete their actions and increase their scores, update the database and return the new scoreboard after sorting. Additionally, call the writing log API.

### b.Live update 
  I suggest using **Sockets** to connect between the front-end and back-end instead of HTTP, as sockets are faster, cheaper, and have a smaller footprint than HTTP requests.

### c.Authorization
#### To prevent malicious users, it is recommended to use a `SECRET_TOKEN`
  This can be achieved by combining `SECRET_SALT` with the user's `userId` in the **Action Module**. After a user completes an action, a `secretToken` is generated, and this token must be included in the **Update User Score Module**.

#### check the status of their `action` before increasing their score:
  An action marked as complete should contain information about the user who completed it. If the check for the user or the action's status is not successful, return an error message.
  Users should not be able to use other people's `SECRET_TOKEN` to increase their scores.
  If the `secretToken` is not valid, return an error message.

## 4.Improvement
  + Implement a score log to prevent abnormal score increases.
  + Utilize third-party services for authentication and authorization.
  + Limit the rate of score increase based on the action completion rate.
  + Employ AI to scan for abnormal user scores.