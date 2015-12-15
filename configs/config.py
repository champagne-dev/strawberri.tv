# Override default config if config_local exists (if we are local).
import os

try:
	port = int(os.environ['PORT'])
except KeyError:
	port = 80

db = dict(
    host         = "localhost"
,   user         = "root"
,   dbname         = "strawberri"
,   pw           = ""
,	port 		 = "27017"  # Has to be a string
)


redis = dict(
    host    = 'DEFAULT_REDIS_HOSTNAME'
,   port    = "DEFAULT_REDIS_PORT"
,   db      = "DEFAULT_REDIS_DB"         
)

server = dict(
	debug				= False
,	host 				= "0.0.0.0"
,	port 				= port
)

try:
	from config_local import *
except ImportError as e:
	pass
	
	