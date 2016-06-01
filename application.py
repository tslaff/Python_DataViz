'''
Simple Flask application to test deployment to Amazon Web Services
Uses Elastic Beanstalk and RDS


'''

from flask import Flask, render_template, request
from sqlalchemy import create_engine
from nvd3 import pieChart
import MySQLdb
import pandas as pd
import numpy as np
from application import db
from application.models import Data
import random

# Elastic Beanstalk initalization

application = Flask(__name__)
application.debug=True
application.secret_key = 'cC1YCIWOj9GgWspgNEo2'

conn = MySQLdb.connect(host="flasktest.cf4uesukkwab.us-east-1.rds.amazonaws.com", user="flask", passwd="California1", db="flaskdb");
cursor = conn.cursor();
sql = 'SELECT PROP_FRONT,PROP_DEPTH FROM Commercial_Data LIMIT 30'
df = pd.read_sql(sql, conn)
conn.close()



@application.route('/')
#@application.route('/index', methods=['GET', 'POST'])


def analysis():
    d = pd.DataFrame(df)
    return render_template("index.html", name='Commercial Data', data=d.to_json())	
	
    
    

if __name__ == '__main__':
    application.run(host='0.0.0.0')