
document.addEventListener('DOMContentLoaded', workpls =>
    {


let BattleshipGame = "";
let currentPlayer = 'ja';
let playerNum = 0;
let myturn = false;
let enemyturn = false;
let noships = false;
let Shoted = -1;
const socket = io();

socket.on('player-number', num => {
    if (num === -1) {
        console.log('dołączono ciote');
        document.getElementById('gamefull').style.visibility = 'inherit';
        document.getElementById('allgame').style.visibility = 'hidden';
    } else {
        playerNum = parseInt(num);
        console.log(playerNum);
        if (playerNum === 1) {
            currentPlayer = "nieja";
        }
    }
});

socket.on('playercon', num => {
    console.log(num);
    if (parseInt(num) === playerNum) {
        let player = `.p${parseInt(num) + 1}`;
        document.querySelector(`${player} .connect`).classList.toggle('green');
    }
});

function startgame(socket) {
    startbutton.style.visibility = 'hidden';
    if(end)
        return
    if(!ready)
        {
            socket.emit()
        }
    socket.on('playercon', num => {
        console.log(num);
        let player = `.p${parseInt(num) + 1}`;
        document.querySelector(`${player} .ready`).classList.toggle('green');
    });
}

for(let i = 1; i <= 10; i++){
    for(let j = 0; j < 10; j++){
        let coordinate_x = letters[j];
        let coordinate_y = i;
        const field = document.createElement('div');
        field.setAttribute('id',coordinate_x+coordinate_y);
        field.setAttribute('coordinates',coordinate_x+coordinate_y);
        field.addEventListener('click',() => select(coordinate_x,coordinate_y));
        field.classList.add('field');
        document.getElementById('myboard').appendChild(field);

    }
}
for(let i = 1; i <= 10; i++){
    for(let j = 0; j < 10; j++){
        let coordinate_x = letters[j];
        let coordinate_y = i;
        const field = document.createElement('div');
        field.setAttribute('id',coordinate_x+coordinate_y);
        field.setAttribute('coordinates',coordinate_x+coordinate_y);
        field.addEventListener('click',() => guess(coordinate_x,coordinate_y));
        field.classList.add('field');
        document.getElementById('enemyboard').appendChild(field);

    }
}
const startbutton = document.getElementById('startbutt')
startbutton.addEventListener('click',() =>{
    if(noships)
        startgame(socket)
    else
        alert('Umieść wszystkie statki')
    }
)


function select(x,y) {
    let myfield = document.getElementById(x+y);
    let posible = true
    let xer = letters.indexOf(x)
    if(myfield.classList.contains('selected'))
    {
        
        let mustets = Number(myfield.getAttribute('musts'))
        musts['must'+mustets] +=1
        noships = false;
        for(i = 0;i < mustets ; i++){
            myfield = document.getElementById(x+(y+i));
            if(y+i > 10 ||!myfield.classList.contains('selected') ){
                for(j = 0;j < mustets-i+1; j++){
                    console.log(x+(y-j))
                    myfield = document.getElementById(x+(y-j));
                    myfield.classList.remove('selected');
                }
                break  
            }
            myfield.classList.remove('selected');
            
        }
      
        
            
    }
    else{
        if(musts['must'+mustcount] !=0){
            
            if(y+mustcount <= 11){
                for(let j = 0; j < mustcount; j++){
        
                    const  field = document.getElementById(x+(y+j));
                    if (field.classList.contains('selected')){
                        posible = false
                        console.log('jaja')
                    }    
                    if(y!=1){
                        let ocfield = document.getElementById(x+(y-1))
                        if(ocfield.classList.contains('selected'))
                        posible = false
                        if(y!=1 && xer!=0){
                            ocfield = document.getElementById(letters[xer-1]+(y+j-1))
                                if(ocfield.classList.contains('selected'))
                                posible = false
                    }
                                }
                    if(y!=11-mustcount){
                            ocfield = document.getElementById(x+(y+mustcount))
                            if(ocfield.classList.contains('selected'))
                                posible = false
                        if(y!=11-mustcount && xer!=0){
                        ocfield = document.getElementById(letters[xer-1]+(y+j+1))
                        if(ocfield.classList.contains('selected'))
                            posible = false
                        }
                        }
                        if(xer!=9){
                            ocfield = document.getElementById(letters[xer+1]+(y+j))
                            if(ocfield.classList.contains('selected'))
                                posible = false

                        }
                        if(xer!=0){
                            ocfield = document.getElementById(letters[xer-1]+(y+j))
                            if(ocfield.classList.contains('selected'))
                                posible = false
                        }
                        if(xer!=9 && y!=1){
                            ocfield = document.getElementById(letters[xer+1]+(y+j-1))
                            if(ocfield.classList.contains('selected'))
                                posible = false
                        }
                        if(xer!=9 && y!=11-mustcount){
                            ocfield = document.getElementById(letters[xer+1]+(y+j+1))
                            if(ocfield.classList.contains('selected'))
                                posible = false
                        }
                    }
                
                        
                    if(posible == true){
                        for(let j = 0; j < mustcount; j++){
                        const  field = document.getElementById(x+(y+j));
                        if (!field.classList.contains('selected')){
                            field.classList.add('selected');
                            field.setAttribute('musts',mustcount);
                        }
                    }
                }
                if(posible){
                    musts['must'+mustcount] -=1
                if(musts['must1'] === 0 && musts['must2']  === 0 && musts['must3'] === 0  && musts['must4'] === 0  )
                {
                    noships = true;
                }
                }
                    
            }
        }
    }
}
setInterval(how,1)
function how(){
for(i=1;i<5;i++){
    document.getElementById('must'+i).innerHTML = musts['must'+i]
}
}

    }
)