class JsonWebToken
  # ブロック内のメソットが全てクラスメソッドになる
  # def self.hogehoge
  class << self
    def encode(payload)
      JWT.encode(payload, ENV['JWT_SECRET_KEY_BASE'])
    end

    def decode(token)

      binding.pry
      
      HashWithIndifferentAccess.new(
        JWT.decode(token, ENV['JWT_SECRET_KEY_BASE'])
      )[0]
    rescue
      nil
    end
  end
end