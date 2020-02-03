desc 'Refresh all katagami.presined_urls'

task refresh_katagami: :environment do
  puts 'Refreshing presigned_urls ...'
  Katagami.refresh_all_presigned_urls
  puts 'done.'
end