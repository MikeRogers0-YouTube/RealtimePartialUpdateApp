require "application_system_test_case"

class Comments < ActiveSupport::TestCase
  class RealtimePartialsTest < ApplicationSystemTestCase
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

    test "an updated comment is updated on the index with latest content" do
      updated_comment = Comment.create!(title: 'Realtime title', body: 'Realtime Body')

      visit comments_url

      assert_text updated_comment.title

      updated_comment.update(title: 'Changed title')
      assert_no_text updated_comment.title


      # Save & fire off the ActionCable job
      ::Partials::SingleObjectJob.perform_now(updated_comment)
      
      # Wait for the new contents to be updated
      Timeout.timeout(Capybara.default_max_wait_time) do
        loop until page.has_content?(updated_comment.title)
      end

      assert_text updated_comment.title
    end
  end
end
