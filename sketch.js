let xScale = 0.015;
let yScale = 0.02;

let grids = [];
const NUM_GRIDS = 4;
const gapNames = ["Gap C", "Gap M", "Gap Y", "Gap K"];
const offsetNames = ["Offset C", "Offset M", "Offset Y", "Offset K"];

function setup() {
  createCanvas(400, 400);

  // Build 4 grid objects
  for (let i = 0; i < NUM_GRIDS; i++) {
    const gapSlider = createSlider(2, width / 9, (width / 40) + i * 30);
    const offsetSlider = createSlider(0, 2000, i * 100);

    // minor UI spacing
    gapSlider.position(90, 440 + i * 80);
    offsetSlider.position(90, 455 + i * 80);
   
// Gap label
    //somehow need a 15 pt differece to make text and slider allign (?)
                  createP(`${gapNames[i]}`).position(10, 425 + i * 60);
    gapSlider.position(90, 440 + i * 60);
    gapSlider.style('width', '250px');
    
    
    // Offset label
  
  createP(`${offsetNames[i]}`).position(10, 455 + i * 60);
    offsetSlider.position(90, 470 + i * 60);
    offsetSlider.style('width', '250px');

    const grid = {
      gap: gapSlider.value(),
      offset: offsetSlider.value(),
      gapSlider,
      offsetSlider,
      color: color(0, 0, 0, 0),   // low alpha for blending
    };

    grids.push(grid);

    // react to slider activity
    gapSlider.input(drawGrid);
    offsetSlider.input(drawGrid);
  }

  // optional: different colors
  grids[0].color = color(0, 255, 255 );
  grids[2].color = color(255, 234, 0);
  grids[1].color = color(255, 0, 217);
  grids[3].color = color(1 );

  drawGrid();
}

function draw() {
 
}

// MAIN DRAW
function drawGrid() {
  background(255);

  for (let g of grids) {
    g.gap = g.gapSlider.value();
    g.offset = g.offsetSlider.value();
    drawDotLayer(g.gap, g.offset, g.color);
  }
}


// Draws one grid
function drawDotLayer(gap, offset, col) {
  noStroke();
  fill(col);

  for (let x = gap / 2; x < width; x += gap) {
    for (let y = gap / 2; y < height; y += gap) {

      // noise lookup using gap+offset like original code
      let n = noise(
        (x + offset) * xScale,
        (y + offset) * yScale
      );

      let diameter = n * gap;
      circle(x, y, diameter);
    }
  }
}