```
pip install -r requirements.txt
pushd webapp
npm install
npm run build
popd
python main.py webapp.server
```
