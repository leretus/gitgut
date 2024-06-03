
let letters = 'abcdefghij';

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
function select(x,y) {
    let myfield = document.getElementById(x+y);
    let posible = true
    let xer = letters.indexOf(x)
    if(myfield.classList.contains('selected'))
    {
        
        let mustets = Number(myfield.getAttribute('musts'))
        musts['must'+mustets] +=1
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
                if(posible)
                    musts['must'+mustcount] -=1
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
const socket = io();

/*function check(){
    const ships = document.getElementsByClassName("selected")
    const chips = []
    for (const ship of ships)
        chips.push(ship.getAttribute('coordinates'));

    for (const c{hip of chips){
        const text_index = letters.indexOf(chip[0]);
        const y_coordinate = Number(chip.replace(chip[0], ""));
        console.log("y:" + y_coordinate)
        console.log(text_index)
        if (text_index == 0) {
            const balls = document.getElementById(letters[text_index + 1] + y_coordinate);
            console.log(balls.classList.contains("selected"))

        } else if (text_index == 9)
        {
            const balls = document.getElementById(letters[text_index - 1] + y_coordinate);
            console.log(balls.classList.contains("selected"))

        }
        
    
        
    }
}*/

