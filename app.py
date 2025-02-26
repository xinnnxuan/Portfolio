from flask import Flask, request, jsonify, redirect, render_template
from mysklearn.myclassifiers import MyDecisionTreeClassifier
from mysklearn import myutils
import pickle
import os

app = Flask(__name__)

# Ensure the file paths are correct
TREE_PATH = os.path.join(os.path.dirname(__file__), 'tree.p')

def load_classifier():
    # unpickle header and tree in tree.p
    with open(TREE_PATH, 'rb') as infile:
        header, tree, y_train = pickle.load(infile)
        decision_tree_classifier = MyDecisionTreeClassifier()
        decision_tree_classifier.header = header
        decision_tree_classifier.tree = tree
        decision_tree_classifier.y_train = y_train
    return decision_tree_classifier

@app.route('/')
def home():
    return render_template('wine-project.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get values from the form
        price = float(request.form.get('Price'))
        year = int(request.form.get('Year'))
        num_ratings = int(request.form.get('NumberOfRatings'))
        
        # Load classifier and make prediction
        decision_tree_classifier = load_classifier()
        instance = [price, year, num_ratings]
        prediction = predict_rating(instance, decision_tree_classifier)
        prediction = myutils.most_frequent(prediction)
        
        if prediction is not None:
            return jsonify({'prediction': prediction})
        return jsonify({'error': 'Error making prediction'}), 400
        
    except Exception as e:
        return jsonify({'error': str(e)}), 400

def predict_rating(unseen_instance, classifier):
    try:
        # discretize unseen instance values before prediction
        unseen_instance[0] = myutils.price_discretizer(unseen_instance[0])
        unseen_instance[1] = myutils.year_discretizer(unseen_instance[1])
        unseen_instance[2] = myutils.num_ratings_discretizer(unseen_instance[2])
        return classifier.predict(unseen_instance)
    except:
        return None

if __name__ == "__main__":
    app.run(debug=True) 