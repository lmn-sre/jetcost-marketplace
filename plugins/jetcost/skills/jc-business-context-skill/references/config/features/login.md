---
type: Feature Flag
description: "Login to a Jetcost user account with Google or Facebook; login is switched off in code, so the flag no longer has any effect."
tags: [feature]
timestamp: 2026-10-29T00:00:00Z
---

# LOGIN

Login to a Jetcost user account, on the Jetcost site only: sign-in with
Google (including Google's One Tap prompt in the header) or Facebook,
registration with email and password, and the logged-in profile area.
The web site no longer reads this flag. Login is switched off in code on
every site, whatever the flag says: the login and profile pages do not
exist and the header shows no login. Turning it back on takes a code
change, not a flag change.

## Configs

### ENABLED
Boolean, default `0`. No longer has any effect: it switched login on.

### FACEBOOK-CLIENT-ID
String. No longer has any effect: it was the client ID of the Facebook
application behind "log in with Facebook".

### FACEBOOK-CLIENT-SECRET
String. No longer has any effect: it was the secret paired with
`FACEBOOK-CLIENT-ID`.

### GOOGLE-CLIENT-ID
String. No longer has any effect: it was the client ID of the Google
application behind "log in with Google" and the One Tap prompt.

### GOOGLE-CLIENT-SECRET
String. No longer has any effect: it was the secret paired with
`GOOGLE-CLIENT-ID`.
