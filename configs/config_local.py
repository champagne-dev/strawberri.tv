# Override default config if config_local exists (if we are local).

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
	debug				= True
,	host 				= "localhost"
,	port 				= 5000
)