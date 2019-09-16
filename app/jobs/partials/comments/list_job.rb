class Partials::Comments::ListJob < ApplicationJob
  queue_as :default

  # This will push the updated partial to the user via ActionCable.
  def perform
    RealtimePartialChannel.broadcast_to('comments/list', {
      body: ApplicationController.render(Comment.all, layout: false)
    })
  end
end
