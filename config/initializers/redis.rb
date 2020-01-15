if ENV['REDISCLOUD_URL']
  p ENV['REDISCLOUD_URL']
  p ENV['DATABASE_URL']
  $redis = Redis.new(url: ENV['REDISCLOUD_URL'])
end