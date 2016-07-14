FROM python:3.5.2-onbuild

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

ONBUILD COPY requirements.txt /usr/src/app/
ONBUILD RUN pip install --no-cache-dir -r requirements.txt
ONBUILD RUN python -m nltk.downloader stopwords

ONBUILD COPY . /usr/src/app

EXPOSE 80:5000
