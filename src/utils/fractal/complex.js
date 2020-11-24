class Complex {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  getReal() {
    return this.x;
  }

  getImag() {
    return this.y;
  }

  setReal(x) {
    this.x = x;
  }

  setImag(y) {
    this.y = y;
  }

  toString() {
    if (this.y < 0) {
      return this.x + "-" + Math.abs(this.y) + "i";
    } else {
      return this.x + "+" + Math.abs(this.y) + "i";
    }
  }

  abs2() {
    return Math.pow(this.x, 2) + Math.pow(this.y, 2);
  }

  abs() {
    return Math.sqrt(this.abs2());
  }

  conjugate() {
    return new Complex(this.x, -this.y);
  }

  add(b) {
    return new Complex(this.x + b.x, this.y + b.y);
  }

  minus() {
    return new Complex(-this.x, -this.y);
  }

  multiply(b) {
    if (typeof b === "object") {
      return new Complex(
        this.x * b.x - this.y * b.y,
        this.x * b.y + this.y * b.x
      );
    } else {
      return new Complex(this.x * b, this.y * b);
    }
  }

  divide(b) {
    if (typeof b === "object") {
      return this.multiply(b.conjugate()).multiply(1 / b.abs2());
    } else {
      return new Complex(this.x / b, this.y / b);
    }
  }
}

const Test = () => {
  const A = new Complex(1.0, 1.0);
  const B = new Complex(1.0);
  const C = new Complex();

  console.log("Constructor test:");
  console.log("A = " + A.toString());
  console.log("B = " + B.toString());
  console.log("C = " + C.toString());

  console.log();

  console.log("Setting imag(C) = real(C) + 1:");
  C.setImag(C.getReal() + 1);
  console.log("C = " + C.toString());

  console.log();

  console.log("Testing operators:");
  console.log("abs(A)   = " + A.abs());
  console.log("abs2(A)  = " + A.abs2());
  console.log("abs(B)   = " + B.abs());
  console.log("abs2(B)  = " + B.abs2());
  console.log("conj(A)  = " + A.conjugate().toString());
  console.log("conj(B)  = " + B.conjugate().toString());
  console.log("neg(A)   = " + A.minus().toString());
  console.log("neg(B)   = " + B.minus().toString());
  console.log("A+B      = " + A.add(B).toString());
  console.log("A+C      = " + A.add(C).toString());
  console.log("2*A      = " + A.multiply(2.0).toString());
  console.log("A*C      = " + A.multiply(C).toString());
  console.log("B*C      = " + B.multiply(C).toString());
  console.log("A*A      = " + A.multiply(A).toString());
  console.log("A/B      = " + A.divide(B).toString());
  console.log("A/C      = " + A.divide(C).toString());
  console.log("A/A      = " + A.divide(A).toString());

  console.log();

  console.log("Chained operators:");
  console.log("B*(A+C)  = " + B.multiply(A.add(C)).toString());
  console.log("-A*(B+C) = " + A.minus().multiply(B.add(C)).toString());
};

module.exports = {
  Complex,
  Test,
};
