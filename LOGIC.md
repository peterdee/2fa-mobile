## Application logic for certain situations

### User is signed in:

#### 1. `401` code in response for non-auth requests.

If request receives a response with a `401` code, the user should be logged out.
Profile-related data (`login`, `token`, `userId`) should be deleted.
Stored `secrets` should be updated:
- synchronized data should be deleted;
- non-synchronized data should be preserved, as there are no copy of this data stored on the server.

User should be redirected to the `Logged Out` screen that should contain an explanation of the taken actions.

#### 2. User logs out from a single device.

When user decides to log out from a single device, there should be an option to keep the stored `secrets` on the device.
Profile-related data (`login`, `token`, `userId`) should be deleted.
If user selects the option to keep stored `secrets`:
- update the synchronized `secrets` by removing the `userId` data and by removing the synchronization information.

If user selects the option to delete stored `secrets`:
- delete the synchronized `secrets` and keep the non-synchronized ones.

#### 3. User logs out from all devices.

When user logs out from all of the devices, a request is sent to update a `TokenSecret` record.
This request makes all of the issued JWT invalid.
Client logic should be the same as when logging out from a single device, i. e. user should have a choice to keep the synchronized `secrets` or to delete them from device.

#### 4. User deletes an account.

When user deletes an account, a request is sent to delete all of the user-related data on the server.
Since this action is not reversible and it is not possible to restore any data if account is deleted, user should have an option to keep the stored `secrets` on device.
Other than that, client logic should be the same as when logging out from a single device.

#### 5. User adds a new `secret`.

When user adds a new `secret`, a request to the server should be sent and a new record for the `secret` should be created in the database.
A `secret` record stored on the device should be updated, it should get the `userId` and synchronization-related fields populated.

#### 6. User deletes a synchronized `secret`.

When user deletes a synchronized `secret`, a request should be sent to the server to delete a stored entry from the database.
`secret` record should then be deleted from the device (i. e. there should be a confirmation that the record was actually deleted from the database).

#### 6. User deletes a non-synchronized `secret`.

This does not require any requests to the server.
Selected `secret` can be deleted from device.

#### 7. Device receives a new `secret` entry from the server

When user opens the `List` screen, a request is sent to fetch all of the stored `secrets`.
If user receives an entry that is not stored on device, it should be added to the `secrets` array and stored on device.
The `List` screen should be updated to display the new entry.

#### 8. Device does not receive a synchronized `secret` record from the server.

When user opens the `List` screen, a request is sent to fetch all of the stored `secrets`.
It is possible that a `secret` record was deleted on another device, and user did not receive this record when fetching all of the `secret` records from the server.
Since the record has the synchronization data but is no longer stored in the database, it should be deleted from device storage.

#### 9. A received synchronized `secret` record has different `accountName` or `issuer` fields.

When user opens the `List` screen, a request is sent to fetch all of the stored `secrets`.
It is possible that the `secret` record was updated on another device, and its `accountName` or `issuer` fields were changed.
The changes should be applied for the `secret` record that is stored locally.

#### 10. Internet connection issues.

*TBD*

#### 11. Updating an already deleted `secret` record.

*TBD*

### User is not signed in:

*TBD*
