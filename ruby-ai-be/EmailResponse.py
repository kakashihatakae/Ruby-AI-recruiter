import openai

# add your own key
openai.api_key = ""



def getFirstEmail(campaign, company_info):
    print(campaign, company_info)
    prompt = "write me a email, on behalf of " + company_info.company_name + \
        " for " +  campaign["position"]  + "position candidates regarding required qualifications including: "\
        + campaign["skills"] + \
        " who live in " + campaign['location'] + " for "  +  campaign['responsibilities'] + \
            "Don't forget to mention" +  company_info.company_name + "'s" + \
            " motto:" + company_info.company_motto + \
    "and its mission: " +  company_info.company_mission  + \
    "and its brand voice: " +  company_info.brand_voice

    messages = [{ 'role': 'user', 'content': prompt }]
    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=messages
    )
    print(response)
    if response['choices']:
        return (response['choices'][0]['message']['content'], prompt)
    else:
        return None

def getResponseBasedOnFeedback(emails, new_prompt):
    messages = [{"role": "system", "content":"You are a helpful assistant that creates emails for recruiters"}]
    for email in emails:
        messages.append({"role": "user", "content": email.feedback})
        messages.append({"role": "assistant", "content": email.email})
    messages.append({"role": "user", "content": new_prompt})
    response = openai.ChatCompletion.create(model="gpt-3.5-turbo", messages=messages)

    if response['choices']:
        return response['choices'][0]['message']['content']
    else:
        return None


