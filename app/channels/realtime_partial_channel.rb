class RealtimePartialChannel < ApplicationCable::Channel
  def subscribed
    stream_for params[:key]
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
