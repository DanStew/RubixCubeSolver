import {Cube} from './cube.js'

let cube = new Cube();

window.onload = function(){
    let solveTerminal = localStorage.getItem("solveTerminal")
    if (solveTerminal == "true"){
        remakeCube()
        cube.displayCube()
        //Calling the function to create the events for the website
        createEvents()
        //Resetting the solveTerminal variable
        localStorage.removeItem("solveTerminal")
    }
    else{
        window.location.href = 'index.html'
    }
}

//Function used to remake any cubes that have been saved in localStorage
function remakeCube(){
    //Looping through all blocks and making them (Adding them to the blocks array in cube)
    for (let i=0;i<=53;i++){
        let blockInformation = localStorage.getItem("block"+i)
        //Splitting string made into an array : [faceNmb,blockNmb,color]
        let blockSpecifics = blockInformation.split(",")
        //Making the cube and adding it to the blocks array in cube
        cube.makeBlock(blockSpecifics[0],blockSpecifics[1],blockSpecifics[2])
    }
}

// Function used to make the event listener functions for the blocks and colors 
function createEvents(){
    // Creating the click events for the controls of the website
    let controls = new Array(4)
    for (let i=1; i<=4; i++){
        controls[i-1] = document.getElementById("cubeControl"+i)
        controls[i-1].addEventListener("click",(e) => cube.changeFace(e))
    }
}

document.getElementById("cubePicker").onclick = function(){window.location.href = "index.html"}