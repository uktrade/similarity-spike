import collections
import os
import itertools

from . import cosine
from cache import CallCache, _unpickle, _pickle

cache = CallCache(path=os.path.dirname(__file__), func=cosine.main)

def dress_up(scores, context, n=10):
    best = []
    for score in sorted(scores, reverse=True)[:n]:
        index = scores.index(score)
        context_item = next(itertools.islice(context.items(), index, index + 1))
        best.append((score, context_item))

    return [
        {
            'score': score,
            'name': name,
            'desc': desc,
        }
        for score, (name, desc) in best
    ]

def main(subject, context):
    return dress_up(cache.fetch(subject, list(context.values())), context)
