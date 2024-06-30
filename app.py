from flask import Flask, render_template

app = Flask(__name__)


@app.route('/')
def index():
    return render_template('index.html')

# Ruta para la página de tienda
@app.route('/Tienda.html')
def tienda():
    return render_template('Tienda.html')


@app.route('/Eventos.html')
def eventos():
    return render_template('Eventos.html')


@app.route('/static/<path:path>')
def send_static(path):
    return send_from_directory('static', path)

if __name__ == '__main__':
    app.run(debug=True)
