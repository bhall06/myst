const { SSL_OP_NO_SSLv3 } = require("constants");
const { Complex } = require("./complex");
const { Polynomial } = require("./polynomial");

class Newton {
  constructor(p) {
    this.f = p;
    this.fp = p.derivative();
  }

  getError() {
    return this.error;
  }

  getNumIterations() {
    return this.numIterations;
  }

  getRoot() {
    return this.root;
  }

  getF() {
    return this.f;
  }

  getFP() {
    return this.fp;
  }

  iterate(z0) {
    this.numIterations = 0;

    while (this.numIterations++ < Newton.MAXITER) {
      if (this.f.evaluate(z0).abs() < Newton.TOL) {
        this.error = 0;
        this.root = z0;
        return;
      } else if (this.fp.evaluate(z0).abs() < Newton.TOL) {
        this.error = -1;
        return;
      }

      z0 = z0.add(this.f.evaluate(z0).divide(this.fp.evaluate(z0)).minus());
    }

    this.numIterations--;

    this.error = -2;
  }
}

Newton.MAXITER = 30;
Newton.TOL = 1.0e-10;

const Test = () => {
  const coeff = [
    new Complex(-1.0, 0.0),
    new Complex(),
    new Complex(),
    new Complex(1.0, 0.0),
  ];
  const p = new Polynomial(coeff);
  const n = new Newton(p);

  const coeff2 = [
    new Complex(1, 0),
    new Complex(4, 0),
    new Complex(1, 0),
    new Complex(-6, 0),
  ];
  const p2 = new Polynomial(coeff2);
  const n2 = new Newton(p2);

  const coeff3 = [
    new Complex(-1),
    new Complex(),
    new Complex(),
    new Complex(1),
  ];
  const p3 = new Polynomial(coeff3);
  const n3 = new Newton(p3);

  n.iterate(new Complex(1.0, 1.0));
  n2.iterate(new Complex(2.5, 0));
  n3.iterate(new Complex(-1.0, 1.0));

  console.log(n.root);
  console.log(n.numIterations);
  console.log(n2.root);
  console.log(n2.numIterations);
  console.log(n2.error);
  console.log(n3.numIterations);
  console.log(Newton.TOL);
};

module.exports = {
  Newton,
  Test,
};
