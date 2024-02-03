import requests

def learnGet(url):
    response = requests.get(url)
    print(response.status_code)
    print(response.text)
    print(response.content)
    print(response.headers)
    print(response.cookies)
    print(response.url)
    print(response.history)

learnPost('http://127.0.0.1:3000/'):