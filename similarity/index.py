import itertools
import multiprocessing as mp
from .main import cache, cos, opps


def func(co_name, co_desc, opp_descs):
    print(co_name)
    try:
        cache.fetch(co_desc, opp_descs)
    except:
        print("{0} failed".format(co_name))


def main():
    opp_descs = [desc for _, desc, _ in opps]
    pool = mp.Pool(8)
    # starmap = itertools.starmap
    starmap = pool.starmap
    list(starmap(func, [
        (co_name, co_desc, opp_descs)
        for co_name, co_desc in cos.items()
    ]))
