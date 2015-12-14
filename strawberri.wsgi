#!/usr/bin/python
import sys
import logging
logging.basicConfig(stream=sys.stderr)
sys.path.insert(0,"/var/www/strawberri.tv/")

import app as application
application.secret_key = 'lol'
