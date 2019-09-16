[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# Realtime Partial Update App

This is a sample of how to use ActionCable & Stimulus to update partials in Rails 6.

## Key files

- [config/cable.yml](https://github.com/MikeRogers0/RealtimePartialUpdateApp/blob/9b3fdb8aef2e0d645f10fe3b74ec5a245182b00a/config/cable.yml#L1-L4) - I setup the local adaptor to be `redis` so ActionCable will work locally.
- [controllers/realtime_controller.js](https://github.com/MikeRogers0/RealtimePartialUpdateApp/blob/master/app/javascript/controllers/realtime_controller.js) - 

TODO: List files that are actually worth looking at.

## Setting up locally

Pull down the repo & run:

```bash
brew install redis
./bin/setup
```

- `brew install redis` You will need redis installed on your local machine & have it running for ActionCable to work.
- [`bin/setup`](https://github.com/MikeRogers0/RealtimePartialUpdateApp/blob/master/bin/setup) - runs bundler & yarn, then sets up the database.

Next you should be able to run:

```bash
rails s
```

To turn on the server, your port may vary but if you visit [http://localhost:3000/comments](http://localhost:3000/comments) you should be able to see the realtime updates when CRUD'ing objects.
