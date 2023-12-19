function getBlocks(){
    blocks = new Array(9)
    for (let i=1; i<=9; i++){
        blocks[i-1] = document.getElementById("block"+i)
        blocks[i-1].addEventListener("click",(e) => selectBlock(e))
    }
}

function selectBlock(e){
    try{
        currentSelected.style.border = "5px solid black"
    }
    catch{
        console.log("CurrentSelected doesn't exist")
    }
    e.target.style.border = "5px solid white"
    currentSelected = e.target
}