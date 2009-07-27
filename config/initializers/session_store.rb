# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_mt_session',
  :secret      => '1218ec8596b8acdd1456cefd05dc42bdff819e8bd61dba0e0c1736e0719c9f6230277a4ddc6e970a2fa0ae3fada008da065dddeccf9a07f7d174f3d25df337ac'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
