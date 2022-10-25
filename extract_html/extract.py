from bs4 import BeautifulSoup
import requests

def LinkSummarize(URL):
    r = requests.get(URL)
    soup = BeautifulSoup(r.text, 'html.parser')
    results = soup.find_all(['h1', 'p'])
    text = [result.text for result in results]
    ARTICLE = ' '.join(text)
    
    max_chunk = 500

    ARTICLE = ARTICLE.replace('.', '.<eos>')
    ARTICLE = ARTICLE.replace('?', '?<eos>')
    ARTICLE = ARTICLE.replace('!', '!<eos>')
    sentences = ARTICLE.split('<eos>')

    current_chunk = 0 
    chunks = []

    for sentence in sentences:
        if len(chunks) == current_chunk + 1: 
            if len(chunks[current_chunk]) + len(sentence.split(' ')) <= max_chunk:
                chunks[current_chunk].extend(sentence.split(' '))
            else:
                current_chunk += 1
                chunks.append(sentence.split(' '))
        else:
            chunks.append(sentence.split(' '))

    for chunk_id in range(len(chunks)):
        chunks[chunk_id] = ' '.join(chunks[chunk_id])
    
    final_text = [temp for temp in chunks]

    return final_text

if __name__ == "__main__":
    print(LinkSummarize('https://thanhnien.vn/da-nang-tung-chuoi-hoat-dong-le-hoi-mua-he-hut-khach-noi-dia-post1466086.html'))