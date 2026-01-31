import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import joblib

X = np.random.rand(50, 1) * 10
y = np.random.rand(50, 1) * 20 + 5 * X


m = 0
b = 0
def mse(y_true, y_pred):
    return np.mean((y_true - y_pred) ** 2)

def gradient_descent(X, y, m, b, Learning_rate):
    n = len(X)

    y_pred = m*X+b

    dm = (-2/n) * np.sum(X * (y - y_pred))

    db = (-2/n) * np.sum(y - y_pred)

    m = m - Learning_rate * dm
    b = b - Learning_rate * db

    return m, b

epochs = 1000
learning_rate = 0.01
losses = []

for epoch in range(epochs):
    y_pred = m * X + b
    loss = mse(y, y_pred)
    losses.append(loss)

    m, b = gradient_descent(X, y, m, b, learning_rate)

    if epoch % 100 == 0:
        print(f"Epoch {epoch} | Loss: {loss:.4f}")


print(f"\nFinal Model:")
print(f"Slope (m): {m:.4f}")
print(f"Intercept (b): {b:.4f}")


def predict(X, m, b):
    return m * X + b

model_params = {
    "m": float(m),
    "b": float(b)
}

joblib.dump(model_params, "linear_model.pkl")
print("Model saved as linear_model.pkl")



plt.scatter(X, y, color="blue", label="Data Points")
plt.plot(X, predict(X, m, b), color="red", label="Regression Line")
plt.xlabel("X")
plt.ylabel("y")
plt.legend()
plt.show()


plt.plot(losses)
plt.xlabel("Epochs")
plt.ylabel("Loss (MSE)")
plt.title("Training Loss Curve")
plt.show()

