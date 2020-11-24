const { Complex } = require("./complex");

class Polynomial {
  constructor(coeff = []) {
    let len = 0;
    for (let i = coeff.length - 1; i >= 0; i--) {
      {
        if (coeff[i].abs() != 0) {
          len = i + 1;
          break;
        }
      }
    }

    this.coeff = coeff.slice(0, len);
  }

  degree() {
    return this.coeff.length - 1;
  }

  toString() {
    let output = "";
    for (let i = 0; i < this.coeff.length; i++) {
      output += "(";
      output += this.coeff[i].toString();
      output += ")";
      if (i != 0) {
        output += "X";
        if (i > 1) {
          output += "^";
          output += i;
        }
      }

      if (i != this.degree()) {
        output += "+";
      }
    }

    if (this.degree() == -1) {
      return "0";
    }

    return output;
  }

  evaluate(z) {
    let sum = new Complex();
    let raisePower = new Complex(1);
    for (let i = 0; i < this.coeff.length; i++) {
      sum = sum.add(this.coeff[i].multiply(raisePower));
      raisePower = raisePower.multiply(z);
    }

    return sum;
  }

  derivative() {
    const nCoeff = [];
    for (let i = 1; i < this.coeff.length; i++) {
      nCoeff[i - 1] = this.coeff[i].multiply(i);
    }
    return new Polynomial(nCoeff);
  }
}

const Test = () => {
  const pn = new Polynomial([
    new Complex(3, 5),
    new Complex(7, 1),
    new Complex(2, 6),
    new Complex(1, 9),
    new Complex(0, 2),
    new Complex(),
    new Complex(),
    new Complex(),
    new Complex(),
  ]);

  console.log("Polynomial String Representation: " + pn.toString());
  console.log(
    "Empty Polynomial String Representation: " + new Polynomial().toString()
  );
  console.log("Degree of Polynomial: " + pn.degree());
  console.log(
    "Evaluation of Polynomial with Complex number 1 + i: " +
      pn.evaluate(new Complex(1, 1)).toString()
  );
  console.log("Derivative of Polynomial: " + pn.derivative());
};

module.exports = {
  Polynomial,
  Test,
};
