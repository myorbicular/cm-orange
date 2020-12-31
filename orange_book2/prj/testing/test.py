import os
from flask import Flask, request, jsonify, render_template, json, current_app as app

app = Flask(__name__)
app.config["DEBUG"] = True


filename = os.path.join(app.static_folder, 'data', 'products.txt')


@app.route('/')
def index():
    json_data = []
    with open(filename) as test_file:
        #data = json.load(test_file)
        data_header = test_file.readline().strip().split("~")
        #data_body = test_file.readlines()[1:]
        data_body = test_file.readlines()[0:5]
        
        for x in data_body:
            body_line = x.strip().split("~")
            #res = {}
            #for idx, val in enumerate(body_line):
            #    res[data_header[idx]] = val
            res = {data_header[idx]: val for idx, val in enumerate(body_line)}
            json_data.append(res)

            #filtered_dict = dict(filter(lambda item: filter_str in item[0], d.items()))

    #data = [d for d in json_data if d['Ingredient'] == 'BUDESONIDE']
    #https://stackoverflow.com/questions/29051573/python-filter-list-of-dictionaries-based-on-key-value/29051598
    data = list(filter(lambda d: d['Ingredient'] == 'BUDESONIDE', json_data))
    return render_template('index.html')


books = [
    {'id': 0,
     'title': 'A Fire Upon the Deep',
     'author': 'Vernor Vinge',
     'first_sentence': 'The coldsleep itself was dreamless.',
     'year_published': '1992'},
    {'id': 1,
     'title': 'The Ones Who Walk Away From Omelas',
     'author': 'Ursula K. Le Guin',
     'first_sentence': 'With a clamor of bells that set the swallows soaring, the Festival of Summer came to the city Omelas, bright-towered by the sea.',
     'published': '1973'},
    {'id': 2,
     'title': 'Dhalgren',
     'author': 'Samuel R. Delany',
     'first_sentence': 'to wound the autumnal city.',
     'published': '1975'}
]

@app.route('/api', methods=['GET'])
def home():
    return "<h1>Distant Reading Archive</h1><p>This site is a prototype API for distant reading of science fiction novels.</p>"


@app.route('/api/v1/resources/books/all', methods=['GET'])
def api_all():
    return jsonify(books)



@app.route('/api/v1/resources/books', methods=['GET'])
def api_id():
    if 'id' in request.args:
        id = int(request.args['id'])
    else:
        return "Error: No id field provided. Please specify an id."

    results = []

    for book in books:
        if book['id'] == id:
            results.append(book)

    return jsonify(results)


def read_data():
    json_data = []
    with open(filename) as test_file:
        data_header = test_file.readline().strip().split("~")
        data_body = test_file.readlines()[1:]
        
        for x in data_body:
            body_line = x.strip().split("~")
            res = {data_header[idx]: val for idx, val in enumerate(body_line)}
            json_data.append(res)
    return json_data

@app.route('/api/v1/resources/products', methods=['GET'])
def products():
    json_data = []
    with open(filename) as test_file:
        data_header = test_file.readline().strip().split("~")
        data_body = test_file.readlines()[1:]
        
        for x in data_body:
            body_line = x.strip().split("~")
            res = {data_header[idx]: val for idx, val in enumerate(body_line)}
            json_data.append(res)

    
    data = list(filter(lambda d: d['Ingredient'] == 'BUDESONIDE', json_data))
    return render_template('index.html')

#app.run()

#https://thispointer.com/python-filter-a-dictionary-by-conditions-on-keys-or-values/
#https://programminghistorian.org/en/lessons/creating-apis-with-python-and-flask
#https://realpython.com/flask-by-example-part-1-project-setup/
#https://auth0.com/blog/developing-restful-apis-with-python-and-flask/
#https://flask-restless.readthedocs.io/en/latest/filtering.html