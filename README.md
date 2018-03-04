# Pact Bot

Really basic Twitter bot running on Zeit.co.

Currently follows a follower, and sends a customised DM introducing them to the Pact ecosystem.

## Code stolen from

https://github.com/spences10/twitter-bot-bootstrap

Adapted to instead of just reply, follow and DM.

## .env file

```sh
TWITTER_CONSUMER_KEY=xxxx
TWITTER_CONSUMER_SECRET=xxxx
TWITTER_ACCESS_TOKEN=xxxx
TWITTER_ACCESS_TOKEN_SECRET=xxxx

QUERY_STRING=contracttesting

RANDOM_REPLY=👋 @${screenName}, thanks for following! For more info on Pact, check out our docs at pact.io. We also love to chat with people and help solve problems out at gitter.im/realestate-com-au/pact. Hope to see you there! Oh, and don't forget to check out our new product at http://pact.dius.com.au/.

RESULT_TYPE=mixed
TWITTER_LANG=en

TWITTER_RETWEET_RATE=.1
TWITTER_SEARCH_COUNT=5
```