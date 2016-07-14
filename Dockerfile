FROM python:3.5.2-onbuild

RUN python -m nltk.downloader stopwords

EXPOSE 80:5000

CMD [ "python", "main.py", "webapp.server"  ]
