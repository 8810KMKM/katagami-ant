Katagami.fetch_from_s3_files

label_names = [
  'kasuri',   'kiku', 'ume',   'hishi',     'sakura',
  'karakusa', 'chou', 'matsu', 'kamenokou', 'asanoha'
]

if (label_names.size > Label.count)
  Label.transaction do
    label_names.each do |name|
      label = Label.new(name: name)
      label.save!
    end
  end
end
