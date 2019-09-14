class Partials::Comments::ListJob < ApplicationJob
  queue_as :default

  def perform
    PartialsChannel.broadcast_to('comments/_list', {
      body: ApplicationController.render('comments/_list', layout: false, locals: { comments: Comment.all })
    })
  end
end
