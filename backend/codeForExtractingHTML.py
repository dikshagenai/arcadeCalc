import requests

url = 'https://www.cloudskillsboost.google/public_profiles/5c1e434b-0957-430c-bedb-7dd616c30901'
response = requests.get(url)
data = response.text
with open('file.html', 'w') as file:
    file.write(data)