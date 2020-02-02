require 'aws-sdk'

Katagami.transaction do
  Katagami.s3_bucket.objects.each do |item|
    item_url = item.presigned_url(:get, expires_in: 60 * 65)
    katagami = Katagami.new(
      name: item.key,
      cw_obj: open(item_url),
      s3_url: item_url,
    )
    katagami.save!
  end
end

label_names = [
  'kasuri',   'kiku', 'ume',   'hishi',     'sakura',
  'karakusa', 'chou', 'matsu', 'kamenokou', 'asanoha'
]

Label.transaction do
  label_names.each do |name|
    label = Label.new(name: name)
    label.save!
  end
end
