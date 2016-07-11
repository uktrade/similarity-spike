import os

from . import cosine
from cache import CallCache, _unpickle, _pickle

cos = _unpickle('ukl.pickle')
cos.update(_unpickle('bduk.pickle'))
cos = {co_name: co_desc for co_name, (co_desc, co_url) in cos.items()}
for name, fc_data in _unpickle('fc.pickle').items():
    bios = list(filter(
        None,
        [profile.get('bio') for profile in fc_data.get('socialProfiles', [])]
    ))
    cos[name] = ' '.join(bios + [cos[name]])

opps = _unpickle('eig.pickle')
opps.extend(_unpickle('tenderpage-gb.pickle'))
opps.extend(_unpickle('tenderpage-us.pickle'))

cache = CallCache(path=os.path.dirname(__file__), func=cosine.main)

def dress_up(scores, n=10):
    best = [
        (score, opps[scores.index(score)])
        for score in sorted(scores, reverse=True)[:n]
    ]

    return [
        {
            'score': score,
            'title': opp_title,
            'desc': opp_desc,
            'enddate': opp_enddate,
        }
        for score, (opp_title, opp_desc, opp_enddate) in best
    ]

def main(name):
    if name == 'l':
        return list(map(print, sorted(cos.keys())))
    return(dress_up(cache.fetch(cos[name], [desc for _, desc, _ in opps])))
