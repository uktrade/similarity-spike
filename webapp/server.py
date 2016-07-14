# NOTE: Run this app using ../run-webapp.py otherwise imports won’t work
import json
import os

import flask
from flask import render_template
from cache import _unpickle
import similarity

app = flask.Flask(__name__, static_url_path='')

cos_odict = _unpickle('cos_odict.pickle')
opps_odict = _unpickle('opps_odict.pickle')

cos = _unpickle('ukl.pickle')
cos.update(_unpickle('bduk.pickle'))


@app.route("/")
def index():
    return render_template('index.html', asset_path='/')

@app.route("/company/<company_name>")
def company(company_name):
    return render_template('index.html', asset_path='/')

@app.route("/cos")
def cos_route():
    return flask.jsonify([
        {'name': name, 'desc': desc}
        for name, (desc, url) in cos.items()
    ]);


@app.route("/co-opps", methods=['POST'])
def co_opps_route():
    return flask.jsonify(similarity.main(flask.request.json['co'], opps_odict))


@app.route("/opp-cos", methods=['POST'])
def opp_cos_route():
    return flask.jsonify(similarity.main(flask.request.json['opp'], cos_odict))


def main():
    app.run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
