/* Function used to make the event listener functions for the blocks and colors */
function createEvents(){
    /* Creating the click event listener for each block */
    /* The block array has been used to simplify the addEventListener line */
    blocks = new Array(9)
    for (let i=1; i<=9; i++){
        blocks[i-1] = document.getElementById("block"+i)
        blocks[i-1].addEventListener("click",(e) => selectBlock(e))
    }
    /* Creating the click event for the colors */
    /* Code implemented the same way the block code has been */
    colors = new Array(9)
    for (let i=1; i<=6; i++){
        colors[i-1] = document.getElementById("color"+i)
        colors[i-1].addEventListener("click",(e) => selectColor(e))
    }
}

/* Function used to select the block of the cube */
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

/* Function used to select the block of the cube */
function selectColor(e){
    try{
        if (currentSelected == e.target){
            currentSelected.style.border="4px solid black"
            currentSelected = "none"
        }
        else{
            if (currentSelected != "none"){
                currentSelected.style.border = "4px solid black"
            }
            e.target.style.border = "4px solid white"
            currentSelected = e.target
        }
    }
    catch{
        console.log("CurrentSelected doesn't exist")
        currentSelected = "none"
    }
}