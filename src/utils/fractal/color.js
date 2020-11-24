class Color {
  constructor(r, g, b, a = 1) {
    this.r = Math.min(r, 255);
    this.g = Math.min(g, 255);
    this.b = Math.min(b, 255);
    this.a = Math.min(a, 1);
  }

  getHex(value = -1) {
    if (value === -1) {
      return (
        "#" + this.getHex(this.r) + this.getHex(this.g) + this.getHex(this.b) //+
        //this.getHex(this.a * 255)
      );
    }

    return ("0" + value.toString(16)).slice(-2);
  }

  getRGB() {
    return `rgb(${this.r}, ${this.g}, ${this.b})`;
  }

  changeBrightness(scale) {
    return new Color(this.r * scale, this.g * scale, this.b * scale, this.a);
  }

  changeOpacity(scale) {
    return new Color(this.r, this.g, this.b, this.a * scale);
  }
}

Color.RED = new Color(255, 0, 0);
Color.GREEN = new Color(0, 255, 0);
Color.BLUE = new Color(0, 0, 255);
Color.CYAN = new Color(255, 255, 0);
Color.MAGENTA = new Color(255, 0, 255);

const Test = () => {
  for (let i = 0; i < 255; i += 15) {
    console.log(new Color(i, i, i).getHex());
    console.log(new Color(i, i, i).getRGB());
  }
};

module.exports = {
  Color,
  Test,
};
