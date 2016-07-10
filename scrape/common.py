def extract(elem, selector):
    'Return the text content for the first element matching given selector'
    return elem.select(selector)[0].text.strip()
