# Circle

Our project is to build an app that allows users to meet and chat with people near them. The app allows user to create chat rooms with tags. Other users are able to search and enter those chat rooms based on name or tags. Within a chat room, users can interact with other uses by sending text messages, voice messages, pictures, current location, or start a game with other people in the chat room.

- The app allows users to chat with strangers and make friends.
- The app allows users to find interesting chat rooms by tags.
- All chat rooms are created based on location. Only nearby users are able to enter the room.
- All users are totally anonymous to each other.

### Functional Properties
- Users are able to log in with a username and profile picture.
- Users can create chat room with a name, optional tags, and range specifying the visible range of this chat room.
- Users can view nearby chat rooms, join visible chat rooms, and quit joined chat rooms.
- Users can search chat rooms based on name and tags.
- Users are allowed to send different types of messages including text, location, image, voice and possibly video message.
- Users can play mini games in the chat room and share their score with others.
- User can blacklist other users and their message will no longer be displayed.

### Non-Functional properties
- Circle handles unexpected input. Our app will detect invalid input and alert users.
- Circle is able to run on Android phones with version higher than 5.0.
- Circle is able to display reasonable amount of messages sent by users in a chat room within 500 ms under stable Internet connectivity.
- Circle does not contain user information so it will never reveal user privacy.

### Future Work
- Upload user profile pictures 
- More games
- More rigorous garbage message check
- Suspend users if the user is blacklisted by a certain number of users.
