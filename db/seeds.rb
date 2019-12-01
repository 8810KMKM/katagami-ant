require 'aws-sdk'
    
s3 = Aws::S3::Resource.new(
  region: 'ap-northeast-1',
  access_key_id: ENV['S3_ACCESS_KEY_ID'],
  secret_access_key: ENV['S3_SECRET_ACCESS_KEY']
)
bucket = s3.bucket('katagami-ant')

Katagami.transaction do
  bucket.objects.each do |item|
    item_url = item.presigned_url(:get)
    katagami = Katagami.new(
      src: item_url,
      cw_obj: open(item_url)
    )
    katagami.save!
  end
end
