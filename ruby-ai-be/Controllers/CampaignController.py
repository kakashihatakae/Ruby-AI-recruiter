from flask import Blueprint, request, jsonify
from Models.Campaign import Campaign, Emails
from Models.db_init import db
from Models.CompanyInfo import CompanyInfo
from EmailResponse import getFirstEmail, getResponseBasedOnFeedback

CampaignController = Blueprint('Campaign', __name__)

@CampaignController.route("/create_campaign", methods=["POST"])
def createCampaign():
    if request.method == 'POST':
        data = request.get_json()
        companyInfo = CompanyInfo.query.all()[0]
        email, prompt = getFirstEmail(campaign=data, company_info=companyInfo)
        newCampaign = Campaign(**data, email=[Emails(email=email, feedback=prompt)])
        db.session.add(newCampaign)
        db.session.commit()
        new_campaign_id = newCampaign.id
        toReturn = { 'campaign_id': new_campaign_id }
        return jsonify(toReturn)
    

@CampaignController.route("/get_campaign/<int:campaign_id>")
def getCampaign(campaign_id):
    campaign = Campaign.query.filter_by(id=campaign_id).all()[0]
    data = {}
    data['campaign'] = {
      'title': campaign.title,
    'position': campaign.position,
    'skills': campaign.skills,
    'experience': campaign.experience,
    'location': campaign.location,
    'responsibilities': campaign.responsibilities,
    'email': [{'email': email.email, 'feedback': email.feedback} for email in campaign.email],
    }
    return jsonify(data)

@CampaignController.route("/get_better_response", methods=["POST"])
def getBetterResponse():
    if request.method == 'POST':
        # campaign_id and feedback
        data = request.get_json()
        campaign_id = data['campaign_id']
        feedback = data['feedback']
        campaign = Campaign.query.filter_by(id=campaign_id).all()[0]
        AIResponse = getResponseBasedOnFeedback([email for email in campaign.email], feedback)
        newEmail = Emails(email=AIResponse, feedback=feedback, parent_id=campaign_id)
        db.session.add(newEmail)
        db.session.commit()
        return ''

@CampaignController.route("/get_all_campaigns", methods=["GET"])
def getAllCampaigns():
    campaigns = Campaign.query.all()
    campaignList = []

    for campaign in campaigns:
        data = {
            'campaign_id': campaign.id,
            'title': campaign.title,
            'position': campaign.position,
            'skills': campaign.skills,
            'experience': campaign.experience,
            'location': campaign.location,
            'responsibilities': campaign.responsibilities,
            'email': [{'email': email.email, 'feedback':email.feedback} for email in campaign.email]
        }
        campaignList.append(data)
    return jsonify({'res':campaignList })
