class PartialsChannel < ApplicationCable::Channel
  def subscribed
    stream_for params[:partial]
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
