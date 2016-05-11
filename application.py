'''
Simple Flask application to test deployment to Amazon Web Services
Uses Elastic Beanstalk and RDS


'''

from flask import Flask, render_template, request
from application import db
from application.models import Data
from application.forms import EnterDBInfo, RetrieveDBInfo

application = Flask(__name__)
app = Flask(__name__)
application.debug=True
# change this to your own value
application.secret_key = 'cC1YCIWOj9GgWspgNEo2'   

# @application.route('/', methods=['GET', 'POST'])
# @application.route('/index', methods=['GET', 'POST'])

@app.route('/')
def hello_world():
  return 'Hello from Flask!'

if __name__ == '__main__':
    application.run(host='0.0.0.0')
