[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

# Realtime Partial Update App

This is a sample of how to use ActionCable & Stimulus to update partials in Rails 6.

## Key files

- [config/cable.yml](https://github.com/MikeRogers0/RealtimePartialUpdateApp/blob/9b3fdb8aef2e0d645f10fe3b74ec5a245182b00a/config/cable.yml#L1-L4) - I setup the local adaptor to be `redis` so ActionCable will work locally.
- [app/javascript/controllers/realtime_partial_controller.js](https://github.com/MikeRogers0/RealtimePartialUpdateApp/blob/master/app/javascript/controllers/realtime_partial_controller.js) - The Stimulus controller for making a partial update when being updated via ActionCable.
- [app/views/comments/index.html.erb](https://github.com/MikeRogers0/RealtimePartialUpdateApp/blob/master/app/views/comments/index.html.erb#L14-L16) - The adjustment to the view I added to make the Stimulus controller activate.
- [app/jobs/partials/comments/list_job.rb](https://github.com/MikeRogers0/RealtimePartialUpdateApp/blob/master/app/jobs/partials/comments/list_job.rb) - The ActiveJob where I broadcast the updated partial via ActionCable.
- [test/system/comments/realtime_partials_test.rb](https://github.com/MikeRogers0/RealtimePartialUpdateApp/blob/master/test/system/comments/realtime_partials_test.rb) - The system test for the realtime partials.

## Setting up locally

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
