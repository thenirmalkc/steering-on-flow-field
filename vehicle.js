class Vehicle {

  constructor(x, y) {
    this.position = new Vector2D(x, y)
    this.velocity = new Vector2D(0, 0)
    this.acceleration = new Vector2D(0, 0)

    this.mass = 1
    this.max_speed = 2
    this.max_force = 0.1
  }

  set_mass(mass) {
    this.mass = mass
  }

  apply_force(force) {
    force = force.copy()

    // acceleration = force / mass
    this.acceleration.add(force.div(this.mass))

  }

  update() {

    // calculating velocity
    this.velocity.add(this.acceleration)
    // this.velocity.limit(4)

    // calculating position
    this.position.add(this.velocity)

    // resetting acceleration
    this.acceleration.mult(0)

  }

  display() {

    // calculating 3 points of a triangle

    const p2 = this.velocity
      .copy()
      .set_mag(12)
      .add(this.position)

    const p1 = this.velocity
      .copy()
      .set_mag(12)
      .mult(-1)
      .rotate_in_degree(24)
      .add(this.position)

    const p3 = this.velocity
      .copy()
      .set_mag(12)
      .mult(-1)
      .rotate_in_degree(-24)
      .add(this.position)

    noStroke()
    fill('lime')
    triangle(p1.x, p1.y, p2.x, p2.y, p3.x, p3.y)

  }

}