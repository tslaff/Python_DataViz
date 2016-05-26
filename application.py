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

# Elastic Beanstalk initalization
application = Flask(__name__)
application.debug=True
application.secret_key = 'cC1YCIWOj9GgWspgNEo2'

conn = MySQLdb.connect(host="flasktest.cf4uesukkwab.us-east-1.rds.amazonaws.com", user="flask", passwd="California1", db="flaskdb");
cursor = conn.cursor();
sql = 'SELECT Date_o, Product, Company, State, Zip_code FROM Data_1'
df = pd.read_sql(sql, conn)
conn.close()

#application.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://flask:California1@flasktest.cf4uesukkwab.us-east-1.rds.amazonaws.com:3306/flaskdb'


@application.route('/')
#@application.route('/index', methods=['GET', 'POST'])
#def hello_world():

	#string = str(df)[0:500]
	
	#return string

def analysis():
    x = pd.DataFrame(df)
    return render_template("index.html", name='this is my name', data=x.to_html())	
	
    
    

if __name__ == '__main__':
    application.run(host='0.0.0.0')