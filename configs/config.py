# Override default config if config_local exists (if we are local).

db = dict(
    host         = "0.0.0.0"
,   user         = "root"
,   name         = ""
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
,	port 				= 80
)

try:
	from config_local import *
except ImportError as e:
	pass
	
	