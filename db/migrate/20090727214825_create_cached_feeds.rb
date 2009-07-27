class CreateCachedFeeds < ActiveRecord::Migration
  def self.up
    create_table :cached_feeds do |t|

      t.timestamps
    end
  end

  def self.down
    drop_table :cached_feeds
  end
end
