import os
import hashlib
import pickle

import requests

class NotCachedException(Exception):
    pass


class BadPickleException(Exception):
    pass


def _unpickle(path):
    'Unpickle object from file at given path'
    with open(path, 'rb') as path_fh:
        return pickle.load(path_fh)


def _pickle(path, data):
    'Pickle given data to given path'
    with open(path, 'wb') as path_fh:
        pickle.dump(data, path_fh)

class BaseCache(object):

    def __init__(self, path='', prefix='.cache'):
        self.prefix = prefix
        self.path = path
        cache_path = os.path.dirname(self._cache_path(''))
        if not os.path.isdir(cache_path):
            os.mkdir(cache_path)

    def _cache_path(self, name):
        'Return cache path for given URL'
        return os.path.join(
            self.path,
            self.prefix,
            hashlib.sha1(name.encode('utf8')).hexdigest()
        )

    def _cached(self, url):
        'Return boolean representation of cachedness of given URL'
        path = self._cache_path(url)
        file_exists = os.path.isfile(path)
        if file_exists:
            try:
                _unpickle(path)
                return True
            except Exception as exc:  #pylint: disable=all
                pass
        return False

    def put(self, name, data):
        'Set cache entry for given name to given data'
        _pickle(self._cache_path(name), data)




class RequestsCache(BaseCache):
    'url -> response cache using requests'

    def fetch(self, url, method='get'):
        '''
        Test if URL is cached, then either unpickle the response or make the
        request and cache it.
        '''
        if not self._cached(url):
            resp = getattr(requests, method)(url)
            assert resp.ok
            self.put(url, resp)
            return resp
        return _unpickle(self._cache_path(url))


class CallCache(BaseCache):
    'Simple args -> return cache'

    def __init__(self, **kwargs):
        self.func = kwargs.pop('func')
        super(CallCache, self).__init__(**kwargs)

    def fetch(self, *args, **kwargs):
        name = str(args) + str(kwargs)
        if not self._cached(name):
            retval = self.func(*args, **kwargs)
            self.put(name, retval)
            return retval
        return _unpickle(self._cache_path(name))
