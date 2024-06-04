function descr(x){
for (let i = 0; i < 11; i++) {
    const cba = document.createElement('div');
    if(i==0){
    cba.classList.add('desc0');
    document.getElementById('cba'+x).appendChild(cba);
    }
    else{
    cba.classList.add('desc1');
    cba.innerHTML = i;
    document.getElementById('cba'+x).appendChild(cba);
    }
    
}
for (let j = 0; j < 10; j++) {
    const cba = document.createElement('div');
    cba.classList.add('desca');
    cba.innerHTML = letters[j];
    document.getElementById('abc'+x).appendChild(cba);

}
}

descr(0)
descr(1)
