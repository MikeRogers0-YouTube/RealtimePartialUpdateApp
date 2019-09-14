class Comments::PartialsUpdateJob < ApplicationJob
  queue_as :default

  def perform(comment)
    PartialsChannel.broadcast_to('comments/_list', {
      body: ApplicationController.render('comments/_list', layout: false, locals: { comments: Comment.all })
    })
  end
end
