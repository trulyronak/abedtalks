from bs4 import BeautifulSoup
import requests
import random

quotes = []

def webScrapeData():
    for i in range(1, 12):
        url = "https://www.tvfanatic.com/quotes/characters/abed/page-" + str(i) + ".html"
        page = requests.get(url)
        soup = BeautifulSoup(page.content, 'html5lib')

        main_div = soup.find('div', attrs = {'id':'infinite'})
        abed_quotes = main_div.findAll('blockquote')

        for block in abed_quotes:
            quote = block.find('p')
            for br in quote.findAll("br"):
                br.replace_with("\n")
            quotes.append(quote.text)
    return quotes

webScrapeData()

random_quote = random.choice(quotes)
print(random_quote)