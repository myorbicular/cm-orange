import os
from flask import Flask, request, jsonify, render_template, json, abort, current_app as app
#from flask_filter import query_with_filters

app = Flask(__name__)
app.config["DEBUG"] = True


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/product_details')
def product_details():
    return render_template('product_details.html')


def get_paginated_list(klass, url, start, limit):
    # check if page exists
    results = klass
    count = len(results)
    if (count < start):
        abort(404)
    # make response
    obj = {}
    obj['start'] = start
    obj['limit'] = limit
    obj['count'] = count
    # make URLs
    # make previous url
    if start == 1:
        obj['previous'] = ''
    else:
        start_copy = max(1, start - limit)
        limit_copy = start - 1
        obj['previous'] = url + '?start=%d&limit=%d' % (start_copy, limit_copy)
    # make next url
    if start + limit > count:
        obj['next'] = ''
    else:
        start_copy = start + limit
        obj['next'] = url + '?start=%d&limit=%d' % (start_copy, limit)
    # finally extract result according to bounds
    obj['results'] = results[(start - 1):(start - 1 + limit)]
    return obj


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

"""
@app.route('/api/products', methods=['GET'])
def products_api():
    data = read_data('products.txt')
    query_parameters = request.args

    if query_parameters:
        q = query_parameters.get('q').lower()
        
        #q = "BUDESONIDE".lower()
    else:
        return "Error: No id field provided. Please specify an id."
    
    #results = []
    #for x in data:
    #    if q in x['ingredient']: #or q in x['trade_name'] or x['df;route']:
    #        print(x)
    #        results.append(x)
    #return jsonify(results)
    
    if q:
        filtered_data = list(filter(lambda d: q in d['ingredient'].lower() or q in d['trade_name'].lower() or q in d['df;route'].lower(), data))
        res = {
            'draw': 1,
            'recordsTotal' :10,
            'recordsFiltered': 10,
            'data': filtered_data,
        }
        print(res['data'])
        return jsonify(res)
"""

@app.route('/api/products/details', methods=['GET'])
def products_details_api():
    obj = {}
    patent_data = read_data('patent.txt')
    excl_data = read_data('exclusivity.txt')
    
    query_parameters = request.args

    if query_parameters:
        Product_No = query_parameters.get('Product_No')
        Appl_No = query_parameters.get('Appl_No')
        Appl_Type = query_parameters.get('Appl_Type')
    else:
        return "Error: No id field provided. Please specify an id."
    
    if patent_data:
        obj['patent_obj'] = jsonify(list(filter(lambda d: Product_No.lower() in d['Product_No'].lower() and Appl_No.lower() in d['Appl_No'].lower() or Appl_Type.lower() in d['Appl_Type'].lower(), patent_data)))
    elif excl_data:
        obj['excl_obj'] = jsonify(list(filter(lambda d: Product_No.lower() in d['Product_No'].lower() and Appl_No.lower() in d['Appl_No'].lower() or Appl_Type.lower() in d['Appl_Type'].lower(), excl_data)))
    
    #return jsonify({'data':200})
    return obj


@app.route('/api/products', methods=['POST'])
def products_api():
    data = read_data('products.txt')
    if request.method == 'POST':
        testdata = json.loads(request.get_data())
        draw = testdata.get('draw',0)
        start = testdata.get('start',0)
        length = testdata.get('start',0)
        page =  testdata.get('page',1)
        q = "BUDESONIDE".lower()
        filtered_data = list(filter(lambda d: q in d['ingredient'].lower() or q in d['trade_name'].lower() or q in d['df;route'].lower(), data))
        recordsFiltered = len(filtered_data)
        recordsTotal = len(filtered_data)
        print(data.items)
    
    """    
    recordsFiltered = Test.query.filter(Test.state == 1).order_by(Test.create_on.desc()).count()
    recordsTotal = recordsFiltered
    pagination = Test.query.filter(Test.state==1).order_by(Test.create_on.desc()).paginate(
    page=page, per_page=length, error_out=True)
    objs = pagination.items
    
    data = []
    for obj in objs:
        list = [obj.id, obj.name, obj.address, obj.contact, obj.type, obj.state]
        data.append(list)
    """
    res = {
        'draw': draw,
        'recordsTotal' :recordsTotal,
        'recordsFiltered': recordsFiltered,
        'data': filtered_data,
    }
    return jsonify(res)