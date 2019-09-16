class Partials::Comments::ListJob < ApplicationJob
  queue_as :default

  def perform
    RealtimePartialChannel.broadcast_to('comments/list', {
      body: ApplicationController.render(Comment.all, layout: false)
    })
  end
end
