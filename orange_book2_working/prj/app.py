import os
from flask import Flask, request, jsonify, render_template, json, abort, current_app as app

app = Flask(__name__)
#app.config["DEBUG"] = True


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/table')
def table():
    return render_template('table.html')


@app.route('/product_details')
def product_details():
    return render_template('product_details.html')


def read_data(file_name):
    read_file = os.path.join(app.static_folder, 'data', file_name)
    json_data = []
    with open(read_file) as f:
        data_header = [x.lower() for x in f.readline().strip().split("~")]
        data_body = f.readlines()[0:]
        
        for x in data_body:
            body_line = x.strip().split("~")
            res = {data_header[idx]: val for idx, val in enumerate(body_line)}
            json_data.append(res)
    return json_data


@app.route('/api/products', methods=['GET'])
def products_api():
    data = read_data('products.txt')
    query_parameters = request.args

    if query_parameters:
        q = query_parameters.get('q').lower()
    else:
        return "Error: No id field provided. Please specify an id."
    
    if q:
        filtered_data = list(filter(lambda d: q in d['ingredient'].lower() or q in d['trade_name'].lower() or q in d['df;route'].lower(), data))
        return jsonify({'data':filtered_data})


@app.route('/api/products/details', methods=['GET'])
def products_details_api():
    obj = {}
    patent_data = read_data('patent.txt')
    excl_data = read_data('exclusivity.txt')
    
    query_parameters = request.args

    if query_parameters:
        product_no = query_parameters.get('product_no')
        appl_no = query_parameters.get('appl_no')
        appl_type = query_parameters.get('appl_type')
    else:
        return "Error: No id field provided. Please specify an id."
    
    if patent_data and excl_data:
        obj['patent_obj'] = list(filter(lambda d: product_no == d['product_no'] and appl_no == d['appl_no'] and appl_type == d['appl_type'], patent_data))
        obj['excl_obj'] =   list(filter(lambda d: product_no == d['product_no'] and appl_no == d['appl_no'] and appl_type == d['appl_type'], excl_data))
    
    return jsonify(obj)


if __name__ == '__main__':
    app.debug = True
    #app.run(host='192.168.1.10')
    #app.run(host="0.0.0.0")
    app.run(host = '0.0.0.0',port=9014)
