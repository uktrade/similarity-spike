from cache import _unpickle, _pickle
import collections

# fh = open('cos_odict.pickle', 'wb')

def main():
    # combine cos
    cos_dict = _unpickle('ukl.pickle')
    cos_dict.update(_unpickle('bduk.pickle'))
    cos_dict = {
        co_name: co_desc for co_name, (co_desc, co_url) in cos_dict.items()
    }

    cos_odict = collections.OrderedDict()
    fc = _unpickle('fc.pickle')
    for name in sorted(cos_dict.keys()):
        bios = list(filter(
            None,
            [profile.get('bio') for profile in fc.get('name', {}).get('socialProfiles', [])]
        ))
        cos_odict[name] = ' '.join(bios + [cos_dict[name]])
    _pickle('cos_odict.pickle', cos_odict)

    # combine opps
    opps = _unpickle('eig.pickle')
    opps.extend(_unpickle('tenderpage-gb.pickle'))
    opps.extend(_unpickle('tenderpage-us.pickle'))

    opps_odict = collections.OrderedDict()
    for opp_title, opp_desc, opp_enddate in opps:
        opps_odict[opp_title] = opp_desc
    _pickle('opps_odict.pickle', opps_odict)
