require "application_system_test_case"

class Comments < ActiveSupport::TestCase
  class RealtimeTest < ApplicationSystemTestCase
    test "New comment updates index with latest content" do
      visit comments_url

      new_comment = Comment.new(title: 'Realtime title', body: 'Realtime Body')
      new_comment.save!

      assert_no_text new_comment.title

      # Save & fire off the ActionCable job
      ::Partials::Comments::ListJob.perform_now
      
      # Wait for the new contents to be added to the page
      Timeout.timeout(Capybara.default_max_wait_time) do
        loop until page.has_content?(new_comment.title)
      end

      assert_text new_comment.title
    end
  end
end
