from datetime import datetime, timedelta
from urllib.parse import urlparse
import csv
import hashlib
import os
import pickle
import time
 
from cache import _unpickle

import requests

with open(os.path.join(os.path.dirname(__file__), 'key'), 'r') as key_fh:
    api_key = key_fh.read().strip()

fullcontact_fmt = 'https://api.fullcontact.com/v2/company/lookup.json?domain={0}&apiKey={1}'

def co_domains():
    'Return all company names'
    cos = _unpickle('ukl.pickle')
    cos.update(_unpickle('bduk.pickle'))
    return {
        name: urlparse(url).netloc.replace('www.', '')
        for name, (_, url) in cos.items()
    }

TO_REQUEST = co_domains()
TO_POLL = []
TO_CACHE = []

cache_prefix = '.cache'
def cache_path(domain):
    'Return cache path for given URL'
    return os.path.join(
        os.path.dirname(__file__),
        cache_prefix,
        hashlib.sha1(domain.encode('utf8')).hexdigest()
    )


def cached(domain):
    'Return boolean representation of cachedness of given URL'
    path = cache_path(domain)
    return os.path.isfile(path)


def set(domain, data):
    'Set cache key for given URL to given data'
    with open(cache_path(domain), 'wb') as cache_fh:
        pickle.dump(data, cache_fh)


def get(domain):
    'Return the content for the given URL, using cached data if available'
    url = fullcontact_fmt.format(domain, api_key)
    if not cached(domain):
        return
        resp = requests.get(url)
        print("{0} {1}".format(resp.status_code, domain))
        if resp.status_code == 202:
            TO_POLL.append((domain, datetime.now()))
            return
        elif resp.status_code == 200:
            data = resp.json()
            set(domain, data)
            return data
        else:
            print(resp.json()['message'])
            return
    with open(cache_path(domain), 'rb') as cache_fh:
        return pickle.load(cache_fh)


def main():

    out = {}
    for name, domain in TO_REQUEST.items():
        data = get(domain)
        if not data:
            continue
        out[name] = data
    with open('fc.pickle', 'wb') as fc_fh:
        pickle.dump(out, fc_fh)


if __name__ == '__main__':
    main()
