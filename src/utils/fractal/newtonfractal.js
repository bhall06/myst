const { exception } = require("console");
const { Complex } = require("./complex");
const { Newton } = require("./newton");
const Canvas = require("canvas");
const { Color } = require("./color");
const { Polynomial } = require("./polynomial");

class NewtonFractal {
  constructor(p, origin, width) {
    this.iterator = new Newton(p);
    this.origin = origin;
    this.width = width;
    this.roots = [];

    this.setupFractal();
  }

  getRoots() {
    return this.roots;
  }

  findRoot(root) {
    for (let i = 0; i < this.roots.length; i++) {
      const r = this.roots[i];
      const dif = root.add(r.minus());

      if (dif.abs() < Newton.TOL) {
        return i;
      }
    }

    return -1;
  }

  pixelToComplex(i, j) {
    return new Complex(
      this.origin.getReal() + i * (this.width / NewtonFractal.NUMPIXELS),
      this.origin.getImag() - j * (this.width / NewtonFractal.NUMPIXELS)
    );
  }

  createFractal(colorIterations) {
    this.colorIterations = colorIterations;

    for (let i = 0; i < NewtonFractal.NUMPIXELS; i++) {
      for (let j = 0; j < NewtonFractal.NUMPIXELS; j++) {
        const c = this.pixelToComplex(i, j);
        this.iterator.iterate(c);
        const root = this.iterator.getRoot();
        if (this.findRoot(root) == -1) {
          this.roots.push(root);
        }
        const rootNum = this.findRoot(root);
        this.colorPixel(i, j, rootNum, this.iterator.getNumIterations());
      }
    }
  }

  setupFractal() {
    if (
      this.iterator.getF().degree() < 3 ||
      this.iterator.getF().degree() > 5
    ) {
      throw new exception(
        "Degree of polynomial must be between 3 and 5 inclusive!"
      );
    }

    this.colors = [...Array(8)].map((_) => new Array(Newton.MAXITER));
    this.colors[0][0] = Color.RED;
    this.colors[1][0] = Color.GREEN;
    this.colors[2][0] = Color.BLUE;
    this.colors[3][0] = Color.CYAN;
    this.colors[4][0] = Color.MAGENTA;

    for (let i = 0; i < 5; i++) {
      const { r, g, b } = this.colors[i][0];
      const components = [r, g, b];
      const delta = [];

      for (let j = 0; j < 3; j++) {
        delta[j] = (0.8 * components[j]) / Newton.MAXITER;
      }

      for (let j = 1; j < Newton.MAXITER; j++) {
        const { r, g, b } = this.colors[i][j - 1];
        const tmp = [r, g, b];
        this.colors[i][j] = new Color(
          tmp[0] - delta[0],
          tmp[1] - delta[1],
          tmp[2] - delta[2]
        );
      }
    }

    this.canvas = Canvas.createCanvas(400, 400);
    this.ctx = this.canvas.getContext("2d");
  }

  colorPixel(i, j, rootColor, numIter) {
    if (this.colorIterations) {
      this.ctx.fillStyle = this.colors[rootColor][numIter - 1].getHex();
    } else {
      this.ctx.fillStyle = this.colors[rootColor][0].getHex();
    }

    this.ctx.fillRect(i, j, 1, 1);
  }

  getImage() {
    return this.canvas.toBuffer();
  }
}

NewtonFractal.NUMPIXELS = 400;

const Test = (log = false) => {
  const coeff = [new Complex(-1), new Complex(), new Complex(), new Complex(1)];
  const p = new Polynomial(coeff);
  const f = new NewtonFractal(p, new Complex(-1.0, 1.0), 2.0);

  f.createFractal(false);

  log && console.log(f.getImage());

  return f.getImage();
};

const GenerateFractal = (coeffs, origin, width, coloured = false) => {
  const p = new Polynomial(coeffs);
  const f = new NewtonFractal(p, origin, width);
  f.createFractal(coloured);
  return f.getImage();
};

module.exports = {
  NewtonFractal,
  Test,
  GenerateFractal,
};
