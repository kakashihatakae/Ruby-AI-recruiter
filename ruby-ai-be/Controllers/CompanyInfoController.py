from flask import Blueprint, request, jsonify
from Models.CompanyInfo import CompanyInfo
from Models.db_init import db

CompanyInfoController = Blueprint('CompanyInfo', __name__)

@CompanyInfoController.route('/onboarding', methods=['GET', 'POST'])
def onboarding():
    if request.method == 'POST':
        companyInfo = request.get_json()
        newCompanyRow = CompanyInfo(**companyInfo)
        db.session.add(newCompanyRow)
        db.session.commit()
        return ''
    
    if request.method == 'GET':
        companyInfo = CompanyInfo.query.all()
        show_onboarding = len(companyInfo) < 1
        return jsonify({ "show_onboarding": show_onboarding })


