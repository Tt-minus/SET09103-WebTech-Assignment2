from flask import Flask, render_template
app = Flask(__name__)

@app.route('/')
def indec(name=None):
    return render_template('index.html')

@app.route('/menu')
def menu(name=None):
    return render_template('menusite.html')

@app.route('/data')
def data(name=None):
    return render_template('datasite.html')
