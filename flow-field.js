class FlowField {

  constructor(row, col, res) {
    this.row = row
    this.col = col
    this.res = res

    this.desired_vel = Vector2D.random()

    // pointing towards positive direction
    this.desired_vel.set_x(Math.abs(this.desired_vel.x))
    this.desired_vel.set_y(Math.abs(this.desired_vel.y))

    // color of the arrow
    this.line_color = 'black'

  }

  display() {
    const arrow_len = 12
    const pointer_len = 6
    const angle_in_degree = 32

    let desired_vel

    // calculating points for arrow

    // mid point of a cell
    const x1 = this.col * this.res + this.res / 2
    const y1 = this.row * this.res + this.res / 2


    // points for line
    desired_vel = this.desired_vel.copy()
      .set_mag(arrow_len / 2)

    const x2 = x1 + desired_vel.x
    const y2 = y1 + desired_vel.y

    desired_vel = this.desired_vel.copy()
      .set_mag(arrow_len / 2)
      .mult(-1)

    const x3 = x1 + desired_vel.x
    const y3 = y1 + desired_vel.y


    // points for arrow
    desired_vel = this.desired_vel.copy()
      .set_mag(pointer_len)
      .mult(-1)
      .rotate_in_degree(angle_in_degree)

    const x4 = x2 + desired_vel.x
    const y4 = y2 + desired_vel.y

    desired_vel = this.desired_vel.copy()
      .set_mag(pointer_len)
      .mult(-1)
      .rotate_in_degree(angle_in_degree * -1)


    const x5 = x2 + desired_vel.x
    const y5 = y2 + desired_vel.y



    // drawing all the lines
    strokeWeight(1)
    stroke(this.line_color)

    line(x1, y1, x2, y2)
    line(x1, y1, x3, y3)
    line(x2, y2, x4, y4)
    line(x2, y2, x5, y5)

  }

}