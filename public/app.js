
document.addEventListener('DOMContentLoaded', workpls =>
    {
const enemyFields = [];
const ships = [];
const enships = [];
let win = false;
let end = false;
let currentPlayer = 'user';
let playerNum = 0;
let ready = false;
let enemyready = false;
let noships = false;
let Shoted = -1;
const socket = io();
let shipco = 0;
function endgame(){
    end = true
    if(win)
        alert('wygrłeś')
    else
        alert('porażka')
}
socket.on('player-number', num => {
    if (num === -1) {
        console.log('dołączono ciote');
        document.getElementById('gamefull').style.visibility = 'inherit';
        document.getElementById('allgame').style.visibility = 'hidden';
    } else {
        playerNum = parseInt(num)
        if(playerNum === 1) 
            currentPlayer = "enemy"

        console.log(playerNum)
        socket.emit('check-players')
      }
});
socket.on('enships', enemyShips => {
        console.log(enemyShips)
        for(let i in enemyShips){
            enships[i] = enemyShips[i]
        }
        console.log(enships)
        
});
socket.on('enemy-ready', num=>{
    enemyready = true;
    playerReady(num)
    if(ready) 
        startgame(socket)
}
)
socket.on('playercon', num => {
    let player = `.p${parseInt(num) + 1}`;
    document.querySelector(`${player} .connect`).classList.toggle('green');
});

function startgame(socket) {
    startbutton.style.visibility = 'hidden';
    if(end)
        return
    if(!ready)
        {
            console.log(enships)
            socket.emit('player-ready')
            ready = true
            playerReady(playerNum)
            socket.emit('ships',ships)
        }
    if(enemyready)
        if(currentPlayer === 'user')
        {
            turnds.innerHTML = "Obecna tura: TY"
        }
        else{
            turnds.innerHTML ="Obecna tura: NIE TY"
        }
    enemyFields.forEach(field =>{
        field.addEventListener('click', () => {
            if(currentPlayer === 'user' && ready && enemyready && !end) {
                Shoted = field.dataset.coordinates
                let guesf = document.getElementById('enemyboard').querySelector('#' + Shoted)
                if(guesf.classList.contains('selected')|| guesf.classList.contains('occupied'))
                    return
                else{
                if(enships.includes(Shoted)){
                    shipco +=1;
                    console.log('congratulations');
                    socket.emit('fire',Shoted)
                    guesf.classList.add('selected');
                    const ociec = document.getElementById('log')
                    const kom = document.createElement('p')
                    kom.innerHTML = 'trafiony';
                    document.getElementById('log').appendChild(kom)
                    ociec.insertBefore(kom, ociec.firstChild);
                    console.log(shipco)
                    if(shipco === 20){
                        console.log(win)
                        win = true
                        endgame()
                        socket.emit('L',shipco)
                    }
                }
                else
                {
                    
                    turnds.innerHTML ="Obecna tura: NIE TY"
                    currentPlayer = 'enemy'
                    const ociec = document.getElementById('log')
                    const kom = document.createElement('p')
                    kom.innerHTML = 'pudło';
                    document.getElementById('log').appendChild(kom)
                    ociec.insertBefore(kom, ociec.firstChild);
                    guesf.classList.add('occupied');
                    guesf.innerHTML = 'X'
                    socket.emit('miss', Shoted);
                    
                    
                        
                }
                }
                    
            }
          })
    }  )

}
socket.on('enwin',()=>{
    endgame()
})


socket.on('lost',id=>{  
    let losttile = document.getElementById(id)
    losttile.classList.add('red')
    losttile.classList.remove('selected')
})
socket.on('myturn',id=>{
    currentPlayer = 'user'
    let tile = document.getElementById(id)
    tile.classList.add('occupied')
    turnds.innerHTML = "Obecna tura: TY"
})
function playerReady(num){
    let player = `.p${parseInt(num) + 1}`;
    document.querySelector(`${player} .ready`).classList.toggle('green');

}
    socket.on('check-players', players => {
      players.forEach((p, i) => {
        if(p.connected) blabla(i)
        if(p.ready) {
          playerReady(i)
          if(i !== playerReady) 
            enemyReady = true
        }
      })
  
        
    });
 function blabla(num){
    if (parseInt(num) === playerNum) {
        let player = `.p${parseInt(num) + 1}`;
        document.querySelector(`${player} .connect`).classList.toggle('green');
    }
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
        field.classList.add('field');
        document.getElementById('enemyboard').appendChild(field);
        field.dataset.coordinates = coordinate_x + coordinate_y
        enemyFields.push(field)
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
    if(!ready){
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
            let ship = x+(y+i)
            let shipIndex = ships.findIndex(element => element === ship);
            if (shipIndex !== -1) {
                ships.splice(shipIndex, 1);
            }
            if(y+i > 10 ||!myfield.classList.contains('selected') ){
                for(j = 0;j < mustets-i+1; j++){
                    console.log(x+(y-j))
                    ship = x+(y-j)
                    shipIndex = ships.findIndex(element => element === ship);
                    if (shipIndex !== -1) {
                        ships.splice(shipIndex, 1);
                    }
                    myfield = document.getElementById(x+(y-j));
                    myfield.classList.remove('selected');
                }
                break  
            }
            
            myfield.classList.remove('selected');
            
        }
      
        
        console.log(ships)
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
                            let ship = x + (y+j)
                            ships.push(ship)
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
}
setInterval(how,1)
function how(){
for(i=1;i<5;i++){
    document.getElementById('must'+i).innerHTML = musts['must'+i]
}
}

    }
)
