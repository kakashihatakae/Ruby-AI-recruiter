from flask import Flask
from flask_cors import CORS, cross_origin
from Models import db_init
from Controllers.CompanyInfoController import CompanyInfoController
from Controllers.CampaignController import CampaignController

db = db_init.db
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:password@localhost:3306/Ruby?charset=utf8mb4"
cors = CORS(app , resources={r"/*": {"origins": "*", "allow_headers": "*", "expose_headers": "*"}})
db.init_app(app)

app.register_blueprint(CompanyInfoController)
app.register_blueprint(CampaignController)

# Import all models
from Models.CompanyInfo import CompanyInfo
from Models.Campaign import Campaign, Emails

with app.app_context():
  # db.drop_all()
  db.create_all()

if __name__ == '__main__':
  app.run(debug=True)
