require_relative 'boot'

require "rails"
# Pick the frameworks you want:
require "active_model/railtie"
require "active_job/railtie"
require "active_record/railtie"
#require "active_storage/engine"
require "action_controller/railtie"
require "action_mailer/railtie"
require "action_view/railtie"
require "action_cable/engine"
# require "sprockets/railtie"
require "rails/test_unit/railtie"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module KatagamiAnt
  class Application < Rails::Application
    # Initialize configuration defaults for originally generated Rails version.
    config.load_defaults 5.2
    config.i18n.default_locale = :ja
    # config.i18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.yml').to_s]
    config.time_zone = 'Tokyo'
    config.api_only = true

    # setting for usinge OmuniAuth into API
    config.cache_store = :redis_store, 'redis://redis:6379/0', { expires_in: 1.hour }
    config.middleware.use ActionDispatch::Cache
    config.middleware.use ActionDispatch::Session::CacheStore
    config.middleware.use ActionDispatch::Flash

    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins "*"
        resource "*",
          headers: :any,
          methods: [:get, :post, :options, :head]
      end
    end
  end
end
