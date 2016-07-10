import nltk, string
from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.corpus import wordnet as wn


# very frequent words in tenderpage descriptions
domain_stopwords = [
    'contract',  # 774
    'services',  # 683
    'section',  # 468
    'information',  # 420
    'united',  # 357
    'contracting',  # 272
    'authority',  # 264
    'kingdom',  # 254
    'tender',  # 249
    'address',  # 228
    'code',  # 222
    'number',  # 220
    'yes',  # 219
    'nuts',  # 205
    'notice',  # 205
    'service',  # 199
    'lot',  # 194
    'public',  # 182
    'contact',  # 181
    'award',  # 178
    'gbp',  # 178
    'tenders',  # 171
    'value',  # 165
    'options',  # 161
    'internet',  # 151
    'email',  # 145
    'procedure',  # 139
    'telephone',  # 134
    'council',  # 127
    'support',  # 127
    'points',  # 116
    'months',  # 115
    'agreement',  # 115
    'documents',  # 113
    'main',  # 109
    'vat',  # 108
    'procurement',  # 106
    'addresses',  # 105
    'lots',  # 102
    'local',  # 102
    'excluding',  # 101
    'general',  # 100
    'received',  # 100
    'framework',  # 99
]

stemmer = nltk.stem.porter.PorterStemmer()
remove_punctuation_map = dict((ord(char), None) for char in string.punctuation)

def stem_tokens(tokens):
    return [stemmer.stem(item) for item in tokens]

def normalize(text):
    tokens = []
    for word in nltk.word_tokenize(text.lower().translate(remove_punctuation_map)):
        if word in domain_stopwords:
            continue
        # tokens.append(word)
        # continue
        synsets = wn.synsets(word)
        if synsets:
            for lemma in synsets[0].lemmas():
                tokens.append(lemma.name())
        else:
            tokens.append(word)
    return stem_tokens(tokens)

vectorizer = TfidfVectorizer(tokenizer=normalize, stop_words='english')

def main(co, opps):
    tfidf = vectorizer.fit_transform([co] + opps)
    return (tfidf * tfidf.T)[0].toarray().tolist()[0][1:]
