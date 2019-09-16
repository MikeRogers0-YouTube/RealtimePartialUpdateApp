class Partials::SingleObjectJob < ApplicationJob
  queue_as :default

  def perform(object)
    # .to_gid_param returns a unique reference to the object, so we can uniquely
    # reference it in our views without revealing the ID.
    PartialsChannel.broadcast_to(object.to_gid_param, {
      body: ApplicationController.render(object, layout: false)
    })
  end
end
