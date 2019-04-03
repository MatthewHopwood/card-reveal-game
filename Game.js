var GameCanvas;
var ctx;
var GameMode = 'Game';
var Won = false;
var GameOverTimer = 2;
var Cards = [];
var Lives = 5;
var Numbers = [1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16
];

function Card(x, y, number)
{
    this.x = x;
    this.y = y;
    this.number = number;
    this.width = 75;
    this.height = 100;
    this.turnedOver = false;
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        ctx.fillStyle = 'rgb(0, 0, 255)';
        ctx.fillRect(this.x, this.y, this.width, this.height);
        if (this.turnedOver)
        {
            if (this.number == 7)
            {
                ctx.fillStyle = 'rgb(0, 255, 255)';
            }
            ctx.font = '50px Arial';
            ctx.textAlign = 'center';
            ctx.fillStyle = 'rgb(0, 255, 0)';
            ctx.fillText(this.number, this.x + this.width / 2, this.y + this.height / 1.5);
            
        }
    }
    this.isTouched = function(x, y)
    {
        if (x > this.x && x < this.x + this.width && y > this.y && y < this.y + this.height)
        {
            return true;
        }
        else 
        {
            return false;
        }
    }
    this.turnOver = function()
    {
       this.turnedOver = true;
       if (this.number == 7)
       {
            GameMode = 'Waiting';
            Won = true;
       }
       else
       {
           Lives--;
           if (Lives == 0)
           {
                GameMode = 'Waiting';
                Won = false;
           }
       }
    }
    Cards.push(this);
}

function MouseClick(Event)
{
    var x = Event.layerX;
    var y = Event.layerY;

    if (GameMode == 'EndGame')
    {
        if(x > 125 && x < 300 && y > 400 && y < 450)
        {
            GameMode = 'Game';
            RestartGame();
        }
        return;
    }
    else if (GameMode == 'Waiting')
    {
        return;
    }
   
    for (var t = 0; t < Cards.length; t++)
    {
        if(Cards[t].isTouched(x, y))
        {
            Cards[t].turnOver();
        }
    }  
}

function GameOver()
{
    GameMode = 'EndGame';

    ctx.fillStyle = 'rgb(0, 150, 255)';
    ctx.fillRect(0, 0, 425, 525);

    ctx.fillStyle = 'rgb(0, 0, 255)';
    ctx.fillRect(125, 400, 175, 50);

    ctx.font = '20px Arial';
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fillText('Try Again?', 210, 433);

    if(Won)
    {
        ctx.font = '40px Arial';
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillText('You Found 7, You Win!', 215, 100);
    }
    else
    {
        ctx.font = '40px Arial';
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillText('You Lose Sucker!', 215, 100);
    }
}

function ChooseNumber()
{
   var Choice =  Math.random() * Numbers.length | 0;
   var Number = Numbers[Choice];
   Numbers.splice(Choice, 1);
   return Number;
}

function StartGame()
{    
    GameCanvas = document.getElementById("game_canvas");
    ctx = GameCanvas.getContext("2d");

    window.addEventListener("click", MouseClick, true);

   
    RestartGame();
    MainLoop();
}

function RestartGame()
{
    Cards = [];
    Numbers = [1,
        2,
        3,
        4,
        5,
        6,
        7,
        8,
        9,
        10,
        11,
        12,
        13,
        14,
        15,
        16
    ];
    Lives = 5;
    GameOverTimer = 2;

    for (var x = 25; x < 4 * 100 + 25; x += 100)
   {
       new Card (x, 25, ChooseNumber());
       new Card (x, 150, ChooseNumber());
       new Card (x, 275, ChooseNumber());
       new Card (x, 400, ChooseNumber());
   }
}

function MainLoop()
{
    ctx.clearRect(0, 0, 425, 525);

    if(GameMode == 'EndGame')
    {
        GameOver();
    }
    else if (GameMode == 'Waiting')
    {
        for (var t = 0; t < 16; t++)
        {
            Cards[t].update();
        }

        GameOverTimer -= 1/60;
        if (GameOverTimer <= 0)
        {
            GameMode = 'EndGame';
        }
    }
    else
    {    
        for (var t = 0; t < 16; t++)
        {
            Cards[t].update();
        }       
    }

    setTimeout(MainLoop, 16);
}

window.onload = function (e)
{
    console.log('Game Started');
    StartGame();
}
