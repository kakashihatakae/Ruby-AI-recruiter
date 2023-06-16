# Ruby the AI APP

## Frontend
You can find all the FE code in `ruby-ai-fe` folder. This project uses *MaterialUI*, *Styled Components*, *Typescript*, *react-router-dom* and *React* for its Frontend.

To install all the packages, go to the root of `ruby-ai-fe` and just run the following

```shell
cd ruby-ai-fe
npm install
```

### Components
There are three parts to this `Home`, `NewEmail` and `EmailDetails`

**Home (/)**

- Here we display all the campaigns in a list format
- Here we also have a button to create a new campaign
- On clicking the button you are routed to `/add_email`
- Home does an API call to `/get_all_campaigns`

**NewEmail (/add_email)**

- Here we have a form to take in all the information regarding this specific job posting
- After the user submits we make a call to `openai.ChatCompletion.create`
- We also save the campaign info to database 

**Email Details (/get_campaign/<int: campaign_id>)**

- Here we Show all the previous feedbacks and their responses
- We use openAis APi to feed the history of all emails to get a better response


## Backend
I have used Flask, MySQL for the backend as the tech stack. 

Before running `applications.py` make sure you have installed all the required packages and also initialized a schema by the name of **Ruby** and password with a value of **password**.

Please add your own OpenAI key inside `EmailResponse.py` on line number 3.

Before starting to install all packages, don't forge to go to the root of `ruby-ai-be`

Before installing all the packages it is better if you initialised a virtual enviornment. Use the following commands to do so

```shell
cd ruby-ai-be
virtual env
source env/bin/activate
```

Install all the dependencies by running

```shell
pip3 install -r requirements.tx
```

The `requirements.txt` contants a list of all dependencies required to run this project.

### Components

**Models**
- The Models contains models for *Company Information* and the *Campaigns* that a recruiter/user will run.
- Tables *Emails* and *Campaign* have a many-to-one relationship, we are storing the history of all the  feedback and email responses in the *Emails* table
- *Company Info* table will have information related to the specific company the the recruiter is working at. 

**Controllers**
- *Company Info Controller* handles all the requests related to onboarding and Company information.
- *Campaign Controller* Handles all the requests related to campaigns and Emails. We use this controller to get new responses based on feedback and also set up new campaigns from scratch.

**EmailResponse .py**
This file has functions that helps us generate an initial email and also has a function that will help us generate an email based on previous response. Here we use `openai` packange to generate these responses.

**application .py**
In this file we setup our Flask app. Please run this file if you want to run the app. 

Just use this command

```shell
python3 application.py
```