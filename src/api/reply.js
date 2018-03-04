const Twit = require('twit')
const unique = require('unique-random-array')
const config = require('../config')

const param = config.twitterConfig
const randomReply = unique(param.randomReply.split('|'))

const bot = new Twit(config.twitterKeys)

// function: tweets back to user who followed
function tweetNow(text) {
  let tweet = {
    status: text
  }

  bot.post('statuses/update', tweet, (err, data, response) => {
    if (err) {
      console.lol('ERRORDERP Reply', err)
    }
    console.lol('SUCCESS: Replied: ', text)
  })
}

// function: tweets back to user who followed
function directMessage(user, text) {
  let tweet = {
    event: {
      type: "message_create",
      message_create: {
        target: {
          recipient_id: `${user}`
        },
        message_data: {
          text: text
        }
      }
    }
  }

  return bot.post('direct_messages/events/new', tweet, (err, data, response) => {
    if (err) {
      console.lol('ERRORDERP Reply', err)
    }
    console.lol('SUCCESS: Replied: ', text)
  })
}

function follow(user) {
  return bot.post('friendships/create', { user_id: user, follow: false }, function (err, data, response) {
    if (err) {
      console.lol('ERRORDERP Reply', err)
    } else {
      console.lol(`SUCCESS: followed ${user}`)
    }
  })
}

// function: Follow and DM user
const reply = event => {
  let screenName = event.source.screen_name
  let user_id = event.source.id

  if (screenName === config.twitterConfig.username) {
    return
  }

  follow(user_id)
    .then(() => {
      const response = randomReply()
      const res = response.replace('${screenName}', screenName)

      directMessage(user_id, res)
    }, (e) => {
      console.log('FAILURE: ', e)
    })
}

// // function: replies to user who followed
// const reply = event => {
//   // get user's twitter handler/screen name
//   let screenName = event.source.screen_name

//   if (screenName === config.twitterConfig.username) {
//     return
//   }
//   const response = randomReply()

//   const res = response.replace('${screenName}', screenName)

//   tweetNow(res)
// }

module.exports = reply
