# NOTE: Run this app using ../run-webapp.py otherwise imports won’t work
import json

import flask
from flask import render_template
from cache import _unpickle
import similarity

app = flask.Flask(__name__, static_url_path='')


cos = _unpickle('ukl.pickle')
cos.update(_unpickle('bduk.pickle'))

@app.route("/")
def index():
    return render_template('index.html')


@app.route("/cos")
def cos_route():
    return flask.jsonify([
        {'name': name, 'desc': desc, 'url': url}
        for name, (desc, url) in cos.items()
    ]);


@app.route("/opps", methods=['POST'])
def opps_route():
    return flask.jsonify(similarity.main(flask.request.json['name']))


def main():
    app.run(debug=True)
