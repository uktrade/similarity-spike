# NOTE: Run this app using ../run-webapp.py otherwise imports won’t work
import json

import flask
app = flask.Flask(__name__, static_url_path='')

from cache import _unpickle
import similarity

cos = _unpickle('ukl.pickle')
cos.update(_unpickle('bduk.pickle'))

@app.route("/")
def index():
    return app.send_static_file('index.html')


@app.route("/opportunities/<name>")
def opportunities(name):
    return app.send_static_file('index.html')


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
