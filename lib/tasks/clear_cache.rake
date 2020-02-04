desc 'Clear all caches'

task clear_cache: :environment do
  puts 'Cleaning up cache datas ...'
  Rails.cache.instance_variable_get(:@data).keys.each {|k| Rails.cache.delete k }
  puts 'done.'
end