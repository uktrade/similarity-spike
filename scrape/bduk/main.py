import csv
import functools
import hashlib
import itertools
import math
import multiprocessing as mp
import os
import pickle
import time

import bs4
from lxml import etree
from lxml.html import soupparser
import requests

from .. import common
from ...cache import RequestsCache
from ...cache import _pickle

BDUK_URL = 'http://www.business-directory-uk.co.uk/'


def extract_text_nodes(children):
    text = ''
    for elem in children:
        conditions = (
            isinstance(elem, bs4.NavigableString),
            not isinstance(elem, bs4.Comment),
            elem.name != 'b',
            elem.name != 'br',
        )
        if all(conditions):
            text += ' ' + elem.strip()
    return text

def extract_companies(resp):
    soup = bs4.BeautifulSoup(resp.content.decode(resp.encoding))
    companies = {}
    for company in soup.select('.companies table td'):
        try:
            name = common.extract(company, 'b')
        except (IndexError,):
            continue
        try:
            url = company.select('a')[0].attrs['href']
        except (IndexError,):
            pass
        text = extract_text_nodes(company.children)
        if not text:
            text = extract_text_nodes(company.select_one('p').children)
        companies[name] = text, url
    return companies
        


def main():
    cache = RequestsCache(path=os.path.dirname(__file__))
    resp = cache.fetch(BDUK_URL)
    soup = bs4.BeautifulSoup(resp.content.decode(resp.encoding))
    companies = {}
    for category in soup.select('.listings .index-headings a'):
        url = '/'.join([BDUK_URL, category.attrs['href']])
        resp = cache.fetch(url)
        companies.update(extract_companies(resp))
    _pickle('bduk.pickle', companies)
