from Models.db_init import db

class Campaign(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(255))
    position = db.Column(db.String(255))
    skills = db.Column(db.String(255))
    experience = db.Column(db.String(255))
    location = db.Column(db.String(255))
    responsibilities = db.Column(db.String(255))
    email = db.relationship('Emails', backref='campaign', lazy=True)


class Emails(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    email = db.Column(db.Text, nullable=False)
    feedback = db.Column(db.Text, nullable=False)
    parent_id = db.Column(db.Integer, db.ForeignKey('campaign.id'))
