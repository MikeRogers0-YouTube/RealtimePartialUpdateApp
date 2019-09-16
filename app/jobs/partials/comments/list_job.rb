class Partials::Comments::ListJob < ApplicationJob
  queue_as :default

  def perform
    PartialsChannel.broadcast_to('comments/_list', {
      body: ApplicationController.render(Comment.all, layout: false)
    })
  end
end
