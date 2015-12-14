# Override default config if config_local exists (if we are local).
import os
try:
	full_url = os.environ['MONGOLAB_URI']
except KeyError:
	full_url = None

db = dict(
    host         = "0.0.0.0"
,   user         = "root"
,   dbname         = "strawberri"
,   pw           = ""
,	port 		 = "27017"  # Has to be a string
,	full_url     = full_url
)


redis = dict(
    host    = 'DEFAULT_REDIS_HOSTNAME'
,   port    = "DEFAULT_REDIS_PORT"
,   db      = "DEFAULT_REDIS_DB"         
)

server = dict(
	debug				= False
,	host 				= "0.0.0.0"
,	port 				= 80
)

try:
	from config_local import *
except ImportError as e:
	pass
	
	