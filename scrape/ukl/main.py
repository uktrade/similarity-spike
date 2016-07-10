import csv
import os

from lxml import etree
from lxml.html import soupparser

from ...cache import RequestsCache
from ...cache import _pickle

location_list_selector = (
    'body > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > '
    'tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(3) > td > '
    'table > tbody > tr:nth-child(1) > td'
)
company_list_selector = (
    'body > table > tbody > tr:nth-child(2) > td > table:nth-child(2) > '
    'tbody > tr > td:nth-child(2) > table > tbody'
)


expected_title = b'Related Companies in the United Kingdom'

def scrape_sector(n, mode='a'):
    cache = RequestsCache(path=os.path.dirname(__file__))
    print("Scraping sector {0}".format(n))
    url = "http://www.uklistings.org/directory_listings.asp?sector={0}".format(n)
    resp = cache.fetch(url)
    root = soupparser.fromstring(resp.content.decode(resp.encoding))
    for table in root.cssselect('table table table'):  # lol lern2class
        if expected_title in etree.tostring(table):
            company_rows = table.cssselect('tr')
    companies = {}
    for company_row in company_rows[1::2]:  # every other tr has content :D
        text_lines = company_row.text_content().strip().split('\n')
        name = text_lines[0]
        description = text_lines[2].strip()
        href = None
        for anchor in company_row.cssselect('a'):
            _href = anchor.attrib['href']
            if 'uklisting' not in _href:
                href = _href
        if href is None:
            continue
        companies[name] = description, href
    return companies

def main():
    companies = {}
    scrape_sector(1, 'w')
    for n in range(2, 8):
        companies.update(scrape_sector(n))
    _pickle('ukl.pickle', companies)


if __name__ == '__main__':
    main()
