desc 'Refresh all katagami.presined_urls'

task refresh_katagami: :environment do
  puts 'Refreshing presigned_urls ...'

  Katagami.transaction do
    Katagami.refresh_all_presigned_urls
  rescue => e
    puts e.message
  end

  puts 'done.'
end