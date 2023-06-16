from Models.db_init import db

class CompanyInfo(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    company_name = db.Column(db.String(100), nullable=False)
    company_motto = db.Column(db.Text, nullable=False)
    company_mission = db.Column(db.Text, nullable=False)
    brand_voice = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"<Company {self.company_name}>"
