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

EIG_URL = ('https://www.exportingisgreat.gov.uk'
           '/page/{0}/'
           '?post_type=eig_opportunity')


def parse_opp(resp):
    'Grab title, description and date for an opp'
    soup = bs4.BeautifulSoup(resp.content.decode(resp.encoding))
    return map(functools.partial(common.extract, soup), [
        '.opportunity__teaser',
        '.opportunity__description',
        '.icon-block.date p',
    ])

def parse_opps(cache, resp):
    'Parse opps from an EiG AJAX response'
    root = soupparser.fromstring(resp.content.decode(resp.encoding))
    opps = []
    for article in root.cssselect('article.opportunities__item'):
        opp_url = article.cssselect('a')[0].attrib['href']
        opp_title, opp_desc, opp_date = parse_opp(cache.fetch(opp_url))
        print(opp_title)
        opps.append([opp_title, opp_desc, opp_date])
    return opps

def main():
    cache = RequestsCache(path=os.path.dirname(__file__))
    pool = mp.Pool(8)
    resp = cache.fetch(EIG_URL.format(1))
    root = soupparser.fromstring(resp.content.decode(resp.encoding))
    opp_count = int(root.cssselect('#opportunities-result-title span')[0].text_content())
    page_count = math.ceil(opp_count / 10)
    resps = []
    for page in range(page_count)[1:]:
        resp = cache.fetch(EIG_URL.format(page + 1), 'post')
        resps.append(resp)
    map_ = pool.map
    map_ = map
    opps = itertools.chain.from_iterable(map_(functools.partial(parse_opps, cache), resps))
    with open('opps.pickle', 'wb') as opps_fh:
        pickle.dump(list(opps), opps_fh)
