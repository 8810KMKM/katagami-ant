# 型紙画像を取得
Katagami.transaction do
  Katagami.fetch_from_s3_files
rescue => e
  puts e.message
end

# ラベルを生成
label_names = [
  'kasuri',   'kiku', 'ume',   'hishi',     'sakura',
  'karakusa', 'chou', 'matsu', 'kamenokou', 'asanoha'
]

Label.transaction do
  label_names.each do |name|
    label = Label.new(name: name)
    label.save!
  end
rescue => e
  puts e.message
end

