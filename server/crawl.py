import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

urls = set()

final = []

for i in range(1, 101):
    url = "https://baodanang.vn/du-lich-da-nang/?paged=" + str(i)
    
    r = requests.get(url)

    if(r.status_code != 200):
        break

    soup = BeautifulSoup(r.content, 'html.parser')
    
    for link in soup.findAll('a'):
        res = str(link.get('href'))
        
        if(res != '/du-lich-da-nang/' and res != '@PAGE_URL@'):
            urls.add("https://baodanang.vn" + res)

for link in urls:
    r = requests.get(link)

    soup = BeautifulSoup(r.content, 'html.parser')

    news = {}

    title = soup.title.text.split(" -")[0]
    abstract = soup.select_one("strong").text
    image = "https://baodanang.vn" + str(soup.findAll('img')[0]['src'])
    date = soup.find_all("div", {"class": "date"})[0].text.split(", ")[1]

    if(len(abstract) < 10):
        continue

    news = {
        'title': str(title),
        'abstract': str(abstract),
        'image': str(image),
        'date': str(date),
        'link': str(link),
    }

    test = requests.get(image)
    if(test.status_code == 200): 
        final.append(news)

final.sort(key = lambda x: datetime.strptime(x['date'], '%d/%m/%Y'))

final.reverse()

with open('NEWS.json', 'w', encoding="utf8") as file:
    json.dump(final, file, indent=2, ensure_ascii=False)