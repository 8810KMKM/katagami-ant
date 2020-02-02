class AddS3UrlToKatagamis < ActiveRecord::Migration[5.2]
  def change
    add_column :katagamis, :s3_url, :text, null: false
  end
end
