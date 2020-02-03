desc 'Refresh all katagami.presined_urls'

task refresh_katagami: :environment do
  p 'Refreshing presigned_urls ...'
  Katagmai.refresh_all_presigned_urls
  p 'done.'
end