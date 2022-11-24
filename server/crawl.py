import requests
from bs4 import BeautifulSoup
import json
from datetime import datetime

# Get news
def NEWS():
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

    with open('./data/NEWS.json', 'w', encoding="utf8") as file:
        json.dump(final, file, indent=2, ensure_ascii=False)

# Get events
def EVENTS():
    urls = set()
    final = []

    for i in range(1, 4):
        r = requests.get('https://danangfantasticity.com/event/page/' + str(i));

        soup = BeautifulSoup(r.content, 'html.parser')

        for link in soup.findAll('a'):
            res = str(link.get('href'))
            
            if(res != '@PAGE_URL@' and res.find("/event/") != -1 and res.find("/page/") == -1):
                urls.add(res)

    for link in urls:
        r = requests.get(link)

        soup = BeautifulSoup(r.content, 'html.parser')

        title = soup.title.text.split(" -")[0]
        image = str(soup.findAll('img', attrs={'class':'attachment-post-thumbnail size-post-thumbnail wp-post-image'})[0]['data-src'])
        start_date = ""
        end_date = ""
        location = ""

        for item in soup.find_all("div", {"class": "wrap-date wrap-pro"}):
            for date in item.find_all("span", {"class": "second_font general-content"}):
                if(start_date == ""):
                    start_date = date.text
                else:
                    end_date = item.text.split(" - ")[1]
        
        for item in soup.find_all("div", {"class": "wrap-location wrap-pro"}):
            for pos in item.find_all("span", {"class": "second_font general-content"}):
                location = pos.text
        
        event = {
            'title': str(title),
            'image': str(image),
            'start_date': str(start_date),
            'end_date': str(end_date.replace("\n", "")),
            'location': str(location.strip()),
        }

        test = requests.get(image)
        if(test.status_code == 200):
            final.append(event)
    
    with open('./data/EVENTS.json', 'w', encoding="utf8") as file:
        json.dump(final, file, indent=2, ensure_ascii=False)

if __name__ == "__main__":
    # print("Crawling NEWS...")
    # NEWS()
    # print("Finished!", end="\n\n")
    # print("Crawling EVENTS...")
    # EVENTS()
    # print("Finished!")

    params = {
        'key': 'AIzaSyBbswHuIJRTo6LsV1SrSMeBvp91hNNVAJE',
        'address': '1 hack drive, menlo park, CA'
    }

    base_url = 'https://maps.googleapis.com/maps/api/geocode/json?'

    r = requests.get(base_url, params=params).json()
    r.keys()

    print(r)
