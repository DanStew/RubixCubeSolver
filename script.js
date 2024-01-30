import {Cube} from './cube.js';

//Defining all global variables here
let cube = new Cube();

//The onload setup function for the website
window.onload = function(){
    let cubeChecker = localStorage.getItem("savedCube")
    if (cubeChecker == "true"){
        //Used information in local storage to remake the blocks that the user had
        remakeCube()
    }
    else{
        //Making the default blocks in the cube
        cube.makeBlocks()
    }
    cube.displayCube()
    createEvents()
    currentModeSetup()
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

//Function to setup the current mode for the website
function currentModeSetup(){
    //Setting the default cube change mode and displaying it to the screen
    let currentMode =localStorage.getItem("currentMode")
    let currentModeDiv = document.getElementById("currentMode")
    //Setting a default value for the currentMode if user hasn't entered site before
    if (currentMode == null){
        localStorage.setItem("currentMode","Color To Block")
        currentMode = "Color To Block"
    }
    currentModeDiv.innerHTML = "Current Mode : " + currentMode
}

// Function used to make the event listener functions for the blocks and colors 
function createEvents(){
    // Creating the click event listener for each block 
    // The block array has been used to simplify the addEventListener line 
    let blocks = new Array(9)
    for (let i=1; i<=9; i++){
        blocks[i-1] = document.getElementById("block"+i)
        blocks[i-1].addEventListener("click",(e) => selectBlock(e))
    }
    // Creating the click event for the colors 
    // Code implemented the same way the block code has been
    let colors = new Array(6)
    for (let i=1; i<=6; i++){
        colors[i-1] = document.getElementById("color"+i)
        colors[i-1].addEventListener("click",(e) => selectColor(e))
    }
    // Creating the click events for the controls of the website
    let controls = new Array(4)
    for (let i=1; i<=4; i++){
        controls[i-1] = document.getElementById("cubeControl"+i)
        controls[i-1].addEventListener("click",(e) => cube.changeFace(e))
    }
}

// Function used to select the block of the cube 
function selectBlock(e){
    let currentSelectedBlockId = localStorage.getItem("currentSelectedBlock")
    let currentSelectedBlock = document.getElementById(currentSelectedBlockId)
    if (currentSelectedBlock == e.target){
        currentSelectedBlock.style.border="5px solid black"
        currentSelectedBlock = "none"
        localStorage.removeItem("currentSelectedBlock")
    }
    else{
        if (currentSelectedBlock != null){
            currentSelectedBlock.style.border = "5px solid black"
        }
        e.target.style.border = "5px solid white"
        currentSelectedBlock = e.target
        localStorage.setItem("currentSelectedBlock",currentSelectedBlock.id)
    }
    //Changing the color of blocks if appropriate and correct mode
    let currentMode = localStorage.getItem("currentMode")
    let currentSelectedColor = localStorage.getItem("currentSelectedColor")
    if (currentMode == "Color To Block" && currentSelectedColor != "none" && currentSelectedBlock != "none"){
        let blockObject = cube.findBlock(e.target.id.substring(5))
        let errorIdentifier = document.getElementById("errorIdentifier")
        //Checking to see if the block they are trying to change is the middle block
        //If so, an error occurs as you are unable to do this
        if (blockObject.getBlockNmb() == 5){
            errorIdentifier.classList.remove("hide")
            errorIdentifier.innerHTML = "Unable to change color of the central block in a face"
        }
        else{
            errorIdentifier.classList.add("hide")
            let faceNmb = blockObject.getFaceNmb() //Collecting the current faceNmb from the cube object
            //Retrieving the actual color that the id we currently has refers to
            let color = getColor(currentSelectedColor)
            //Getting the current color that the block is (so that the block of that colour can be decremeneted)
            let currentColor = currentSelectedBlock.style.background
            //Changing the number of blocks that are of each color
            cube.decrementColorVariables(currentColor)
            cube.incrementColorVariables(color)
            blockObject.setColor(color)
            currentSelectedBlock.style.background = color
        }
    }
}

// Function used to select the block of the cube 
function selectColor(e){
    let currentSelectedColorId = localStorage.getItem("currentSelectedColor")
    let currentSelectedColor = document.getElementById(currentSelectedColorId)
    if (currentSelectedColor == e.target){
        currentSelectedColor.style.border="4px solid black"
        currentSelectedColor = "none"
        localStorage.removeItem("currentSelectedColor")
    }
    else{
        if (currentSelectedColorId != null){
            currentSelectedColor.style.border = "4px solid black"
        }
        e.target.style.border = "4px solid white"
        currentSelectedColor = e.target
        localStorage.setItem("currentSelectedColor",currentSelectedColor.id)
    }
    //Changing the color of blocks if appropriate and correct mode
    let currentMode = localStorage.getItem("currentMode")
    let currentSelectedBlockId = localStorage.getItem("currentSelectedBlock")
    let currentSelectedBlock = document.getElementById(currentSelectedBlockId)
    if (currentMode == "Block To Color" && currentSelectedBlockId != null && currentSelectedColor != "none"){
        let blockObject = cube.findBlock(currentSelectedBlockId.substring(5))
        let blockNmb = blockObject.getBlockNmb() //Using the current selected block id to find the block number that it is
        //Checking to see if the block trying to be changed is the middle block
        //If so, the error table will be run instead
        let errorIdentifier = document.getElementById("errorIdentifier")
        if (blockNmb == 5){
            errorIdentifier.classList.remove("hide")
            errorIdentifier.innerHTML = "Unable to change color of the central block in a face"
        }
        else{
            errorIdentifier.classList.add("hide")
            //Retrieving the actual color that the id we currently has refers to
            let color = getColor(currentSelectedColor.id)
            //Getting the current color that the block is (so that the block of that colour can be decremeneted)
            let currentColor = currentSelectedBlock.style.background
            //Changing the number of blocks that are of each color
            cube.decrementColorVariables(currentColor)
            cube.incrementColorVariables(color)
            currentSelectedBlock.style.background = color
            //Setting the color to connect to the block in local storage, so the system saves
            blockObject.setColor(color)
        }
    }
}

//Function which translates a color id into the actual color that it refers to
function getColor(colorId){
    switch(colorId){
        case "color1" : 
            return "red"
        case "color2" : 
            return "white"
        case "color3" : 
            return "orange"
        case "color4" : 
            return "yellow"
        case "color5" : 
            return "blue"
        case "color6" : 
            return "green"
    }
}

// Function called when the user selects the buttons at the top of the page
// Function to hide the colours from the page 
document.getElementById("hideCol").onclick = function(){
    let hideCol = document.getElementById("hideCol")
    let showCol = document.getElementById("showCol")
    let colors = document.getElementsByClassName("col")
    hideCol.classList.add("hide")
    showCol.classList.remove("hide")
    for (let i=0; i<=6; i++){
        colors[i].classList.add("hide")
    }
}

// Function to show the colours from the page
document.getElementById("showCol").onclick = function showColours(){
    let hideCol = document.getElementById("hideCol")
    let showCol = document.getElementById("showCol")
    let colors = document.getElementsByClassName("col")
    hideCol.classList.remove("hide")
    showCol.classList.add("hide")
    for (let i=0; i<=6; i++){
        colors[i].classList.remove("hide")
    }
}

// Function to hide the controls from the page
document.getElementById("hideCon").onclick = function(){
    let controls = document.getElementsByClassName("con")
    let hideCon = document.getElementById("hideCon")
    let showCon = document.getElementById("showCon")
    hideCon.classList.add("hide")
    showCon.classList.remove("hide")
    for (let i=0;i<=5;i++){
        controls[i].classList.add("hide")
    }
}

// Function to show the controls from the page
document.getElementById("showCon").onclick = function(){
    let controls = document.getElementsByClassName("con")
    let hideCon = document.getElementById("hideCon")
    let showCon = document.getElementById("showCon")
    hideCon.classList.remove("hide")
    showCon.classList.add("hide")
    for (let i=0;i<=5;i++){
        controls[i].classList.remove("hide")
    }
}

//Function to reset the colours of the cube
document.getElementById("reset").onclick = function(){
    //Remaking and displaying the cube (Completely resetting the object)
    cube = new Cube()
    cube.makeBlocks()
    cube.displayCube()
}


//Function to show the info on the screen
document.getElementById("showInfo").onclick = function(){
    let showInf = document.getElementById("showInfo")
    let hideInf = document.getElementById("hideInfo")
    let info = document.getElementById("infoContainer")
    showInf.classList.add("hide")
    hideInf.classList.remove("hide")
    info.classList.remove("hide")
}

//Function to hide the info on the screen
document.getElementById("hideInfo").onclick = function(){
    let showInf = document.getElementById("showInfo")
    let hideInf = document.getElementById("hideInfo")
    let info = document.getElementById("infoContainer")
    showInf.classList.remove("hide")
    hideInf.classList.add("hide")
    info.classList.add("hide")
}

//Functions to change the currentMode of the website
document.getElementById("colToBlock").onclick = function(){
    localStorage.setItem("currentMode","Color To Block")
    let currentModeDiv = document.getElementById("currentMode")
    currentModeDiv.innerHTML = "Current Mode : Color To Block"
}

document.getElementById("blockToCol").onclick = function(){
    localStorage.setItem("currentMode","Block To Color")
    let currentModeDiv = document.getElementById("currentMode")
    currentModeDiv.innerHTML = "Current Mode : Block To Color"
}

document.getElementById("startSolving").onclick = function(){cube.verifyCube()}

document.getElementById("saveCube").onclick = function(){cube.saveCube()}

//Function to remove all information of the saved cube from local storage
document.getElementById("deleteCube").onclick = function(){
    for (let i=0;i<=53;i++){
        localStorage.removeItem("block"+i)
    }
    localStorage.removeItem("savedCube")
}