import os
from flask import Flask, request, jsonify, render_template, json, abort, current_app as app
#from flask_filter import query_with_filters

app = Flask(__name__)
app.config["DEBUG"] = True



@app.route('/')
def index():
    return render_template('index.html')


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
