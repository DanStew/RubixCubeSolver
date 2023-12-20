function getBlocks(){
    blocks = new Array(9)
    for (let i=1; i<=9; i++){
        blocks[i-1] = document.getElementById("block"+i)
        blocks[i-1].addEventListener("click",(e) => selectBlock(e))
    }
}

function selectBlock(e){
    try{
        if (currentSelected == e.target){
            currentSelected.style.border="5px solid black"
            currentSelected = "none"
        }
        else{
            if (currentSelected != "none"){
                currentSelected.style.border = "5px solid black"
            }
            e.target.style.border = "5px solid white"
            currentSelected = e.target
        }
    }
    catch{
        console.log("CurrentSelected doesn't exist")
        currentSelected = "none"
    }
}