import os
from flask import Flask, request, jsonify, render_template, json, current_app as app
#from flask_filter import query_with_filters

app = Flask(__name__)
app.config["DEBUG"] = True

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


@app.route('/')
def index():
    return render_template('index.html')


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

    """
    results = []

    for book in books:
        if book['id'] == id:
            results.append(book)

    return jsonify(results)
    """
    filtered_data = list(filter(lambda d: d['id'] == id, books))
    return jsonify(filtered_data)


@app.errorhandler(404)
def page_not_found(e):
    return "<h1>404</h1><p>The resource could not be found.</p>", 404


def read_data(file_name):
    read_file = os.path.join(app.static_folder, 'data', file_name)
    json_data = []
    with open(read_file) as f:
        data_header = f.readline().strip().split("~")
        data_body = f.readlines()[0:]
        
        for x in data_body:
            body_line = x.strip().split("~")
            res = {data_header[idx]: val for idx, val in enumerate(body_line)}
            json_data.append(res)
    return json_data




@app.route('/api/products', methods=['GET'])
def products():
    data = read_data('products.txt')
    
    query_parameters = request.args

    if query_parameters:
        q = query_parameters.get('q')
    else:
        return "Error: No id field provided. Please specify an id."
    
    if q:
        #return jsonify(list(filter(lambda d: q.lower() in (d['Ingredient'].lower(),d['Trade_Name'].lower(),d['DF;Route'].lower()), data)))
        return jsonify(list(filter(lambda d: q.lower() in d['Ingredient'].lower() or q.lower() in d['Trade_Name'].lower() or q.lower() in d['DF;Route'].lower(), data)))


#app.run()
#https://www.blog.pythonlibrary.org/2017/12/15/flask-101-filtering-searches-and-deleting-data/

#pagination
#https://stackoverflow.com/questions/55543011/flask-restful-pagination
#https://blog.fossasia.org/paginated-apis-in-flask/