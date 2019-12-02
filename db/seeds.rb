require 'aws-sdk'

Katagami.transaction do
  Katagami.s3_bucket.objects.each do |item|
    item_url = item.presigned_url(:get)
    katagami = Katagami.new(
      name: item.key,
      cw_obj: open(item_url)
    )
    katagami.save!
  end
end
