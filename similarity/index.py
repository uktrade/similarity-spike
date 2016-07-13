import itertools
import multiprocessing as mp
from cache import _unpickle
from .main import cache

cos_odict = _unpickle('cos_odict.pickle')
opps_odict = _unpickle('opps_odict.pickle')

def func(subject, context):
    print(subject[:20])
    try:
        cache.fetch(subject, context)
    except Exception as exc:
        print("FAIL {0}".format(subject[:20]))


def main():
    pool = mp.Pool(8)
    # starmap = itertools.starmap
    starmap = pool.starmap

    co_descs = list(cos_odict.values())
    list(starmap(func, [(opp_desc, co_descs) for opp_desc in opps_odict.values()][:3]))

    opp_descs = list(opps_odict.values())
    list(starmap(func, [(co_desc, opp_descs) for co_desc in cos_odict.values()]))
