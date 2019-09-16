class Partials::SingleObjectJob < ApplicationJob
  queue_as :default

  def perform(object)
    PartialsChannel.broadcast_to(object.to_gid_param, {
      body: ApplicationController.render(object, layout: false)
    })
  end
end
