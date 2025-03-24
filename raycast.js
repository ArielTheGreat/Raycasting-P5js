const TILE_SIZE = 32;
const MAP_NUM_ROWS = 11;
const MAP_NUM_COLS = 15;

const WINDOW_WIDTH = MAP_NUM_COLS * TILE_SIZE;
const WINDOW_HEIGHT = MAP_NUM_ROWS * TILE_SIZE;

class Map {
    constructor() {
        this.grid = [
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
            [1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1],
            [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
            [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
        ];
    }
    render() {
        for (var i = 0; i < MAP_NUM_ROWS; i++) {
            for (var j = 0; j < MAP_NUM_COLS; j++) {
                var tileX = j * TILE_SIZE;
                var tileY = i * TILE_SIZE;
                var tileColor = this.grid[i][j] == 1 ? "#222" : "#fff";
                stroke("#222");
                fill(tileColor);
                rect(tileX, tileY, TILE_SIZE, TILE_SIZE);
            }
        }
    }
}

class Player
{
    constructor()
    {
        this.x = WINDOW_WIDTH / 2;
        this.y = WINDOW_HEIGHT / 2;
        this.radius = 3;
        this.angleTurned = Math.PI / 2;
        this.turnedDirection = 0;
        this.walkDirection = 0;
        this.rotationSpeed = 2 * (Math.PI / 180);
        this.walkSpeed = 2;
    }
    update()
    {
        this.angleTurned += this.turnedDirection * this.rotationSpeed;
        this.x += Math.cos(this.angleTurned) * this.walkSpeed * this.walkDirection;
        this.y += Math.sin(this.angleTurned) * this.walkSpeed  * this.walkDirection;
    }
    render()
    {
        noStroke();
        fill("red");
        circle(this.x, this.y, this.radius);
        stroke("red");
        line(
            this.x,
            this.y,
            this.x + Math.cos(this.angleTurned) * 40,
            this.y + Math.sin(this.angleTurned) * 40
        );
    }
}

var grid = new Map();
var player = new Player();

function setup() {
    createCanvas(WINDOW_WIDTH, WINDOW_HEIGHT);

}

function keyPressed()
{
    if (keyCode === LEFT_ARROW)
    {
        player.turnedDirection = -1;
    } else if (keyCode === RIGHT_ARROW)
    {
        player.turnedDirection = +1;
    } else if (keyCode === UP_ARROW)
    {
        player.walkDirection = +1;
    } else if (keyCode === DOWN_ARROW)
    {
        player.walkDirection = -1;
    }
}

function keyReleased()
{
    if (keyCode === LEFT_ARROW)
    {
        player.turnedDirection = 0;
    } else if (keyCode === RIGHT_ARROW)
    {
        player.turnedDirection = 0;
    } else if (keyCode === UP_ARROW)
    {
        player.walkDirection = 0;
    } else if (keyCode === DOWN_ARROW)
    {
        player.walkDirection = 0;
    }
}

function update() {
    // TODO: update all game objects before we render the next frame
    player.update();
}

function draw() {
    update();

    grid.render();
    player.render();
}
