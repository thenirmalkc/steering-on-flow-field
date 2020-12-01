const width = 900
const height = 600
const res = 30


const row = Math.floor(height / res)
const col = Math.floor(width / res)


let flow_fields
let vehicle


function setup() {
	const canvas = createCanvas(width, height)
  canvas.position((windowWidth - width) / 2, (windowHeight - height) / 2)
	background(100)

  flow_fields = []
  vehicle = new Vehicle(0, 0)

  for(let i = 0; i < row; i ++) {
    flow_fields.push([])

    for(let j = 0; j < col; j ++) {
      // creating flow field obj with random desired velocity
      flow_fields[i].push(new FlowField(i, j, res))
    }
  }

}


function draw() {
  background(100)

  for(let i = 0; i < row; i ++) {
    for(let j = 0; j < col; j ++) {

      // setting the color of currently applied flow field to white
      if(i == Math.floor(vehicle.position.y / res) && j == Math.floor(vehicle.position.x / res)) {
        flow_fields[i][j].line_color = 'white'
      }
      // setting the color of non applied flow field to black
      else {
        flow_fields[i][j].line_color = 'black'
      }

      flow_fields[i][j].display()
    }
  }
  vehicle.display()

  // applying steering force
  vehicle.apply_force(calc_steering_force())
  vehicle.update()


  // checks if vehicle is inside canvas
  check_edges()

  // if so, continues
  // else, restarts and creates new flow fields and vehicle

}


function calc_steering_force() {

  const i = Math.floor(vehicle.position.y / res)
  const j = Math.floor(vehicle.position.x / res)

  // getting desired velocity from flow field
  const desired_vel = flow_fields[i][j].desired_vel
    .copy()
    .set_mag(vehicle.max_speed)

  // calculating steering force
  const steering_force = Vector2D.sub(desired_vel, vehicle.velocity)
    .limit(vehicle.max_force)

  return steering_force
}


function check_edges() {

  // resetting flow field and vehicle
  if(vehicle.position.x < 0 || vehicle.position.y < 0 || vehicle.position.x > width - 1 || vehicle.position.y > height - 1) {
    setup()
  }
}