import {Cube} from './cube.js';

//Defining all global variables here
let cube = new Cube()
cube.makeBlocks()
cube.displayCube()
createEvents()
currentModeSetup()


/*
// Function to setup the website
window.onload = function setup(){
    //Calling the function to set the colour of the blocks in the cube
    setupCube()
    //Calling the function to create the events for the website
    createEvents()
    //Calling the function to set up the current mode on the website
    currentModeSetup()
    //Setting default values for items from local storage
    localStorage.setItem("currentSelectedBlock","none")
    localStorage.setItem("currentSelectedColor","none")
    //Setting up the default values for the faceNmb variable
    faceNmbSetup()   
}*/

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

/*
//Function to setup the default values for the faceNmb variable
function faceNmbSetup(){
    //Checking to see whether faceNmb has already been initialised
    faceNmb = localStorage.getItem("currentFaceNmb")
    //Initialising the values if it hasn't been initialised
    if (faceNmb == null){
        //This function sets a default value for the current faceNmb the user is on
        localStorage.setItem("currentFaceNmb",1)
        //It will also include what value the faceNmb will be when the user changes cube face
        //The values of these variables will be changed and used in the changeFace(e) function
        localStorage.setItem("faceNmbLeft",4)
        localStorage.setItem("faceNmbRight",2)
        localStorage.setItem("faceNmbUp",5)
        localStorage.setItem("faceNmbDown",6)
    }
}*/

/*
//Function to setup the colour of the blocks on the cube
function setupCube(){
    //Setting up the initial colours of the cube, if the user hasn't used the website before
    //This variable is used to check whether the colours have been previously set or not
    let blockColours = localStorage.getItem("blockColours")
    if (blockColours == null){
        //Setting a default colour for each of the colours in the cube
        let blockNmb=0
        //FaceNmb is used so that it can loop through all of the faces of the cube
        let faceNmb=0
        for (let i=0;i<=5;i++){
            //Incrementing the faceNmb and reseting the blockNmb for each face
            faceNmb++
            //Collecting the colour that refers to the current faceNmb that we are on
            color = getColor("color"+faceNmb)
            blockNmb = 0
            for (let j=0;j<=2;j++){
                for (let k=0;k<=2;k++){
                    blockNmb++
                    localStorage.setItem("face"+faceNmb+"blockNmb"+blockNmb,color)
                }
            }
        }
        //Initialising the values of the colorAmounts (this is the only way I could get this to work?)
        localStorage.setItem("redBlock",9)
        localStorage.setItem("blueBlock",9)
        localStorage.setItem("orangeBlock",9)
        localStorage.setItem("greenBlock",9)
        localStorage.setItem("whiteBlock",9)
        localStorage.setItem("yellowBlock",9)
        //Setting it in local storage that the initial cube has been set up
        localStorage.setItem("blockColours",true)
    }
    //Displaying the face of the cube to the user
    displayCubeFace()
} */


/*
//Function to increment the amount of blocks of each color on the system, when changes are made
//This is used to help with the verification function, ensuring that the user has a valid cube
function incrementColorAmount(color){
    currentColorAmount = JSON.parse(localStorage.getItem(color+"Block"))
    localStorage.setItem(color+"Block",JSON.stringify(currentColorAmount+1))
}

//Function to decrease the amount of blocks of each color on the system
//The opposite of the above function
function decrementColorAmount(color){
    currentColorAmount = JSON.parse(localStorage.getItem(color+"Block"))
    localStorage.setItem(color+"Block",JSON.stringify(currentColorAmount-1))
} */

/*
//Function to remove the color amount variables from localStorage
//This function is called within the reset cube function, as all colorAmounts will need to be reset to default
function removeColorAmounts(){
    localStorage.removeItem("redBlock")
    localStorage.removeItem("blueBlock")
    localStorage.removeItem("greenBlock")
    localStorage.removeItem("orangeBlock")
    localStorage.removeItem("whiteBlock")
    localStorage.removeItem("yellowBlock")
} */

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
        console.log(currentSelectedBlockId)
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

/*
//Function to ensure that the cube is able to move into solving state
//This function checks all the color amount variables to ensure they are correct, and if so moves the website into solving state
document.getElementById("startSolving").onclick = function(){
    //Setting a default value for the verification state
    cubeVerified = true
    //Setting default values for variables that will be used, if the cube isn't verified
    //These are initialised so they can be set in the for loop, and then used outside of the for loop
    colorIssue = ""
    colorIssueAmount = 0
    for (let i=1; i<=6;i++){
        currentColor = getColor("color"+i)
        colorAmount = localStorage.getItem(currentColor+"Block")
        if (colorAmount != 9){
            cubeVerified = false
            colorIssue = currentColor
            colorIssueAmount = colorAmount
        }
    }
    //Cube is verified so user is able to move into solving state
    if (cubeVerified == true){
        console.log("Cube verified")
    }
    //Displaying error amount
    else{
        errorIdentifier = document.getElementById("errorIdentifier")
        errorIdentifier.classList.remove("hide")
        errorIdentifier.innerHTML = "Unable to enter solving mode - Incorrect number of " + colorIssue + " blocks : " + colorIssueAmount + "/9"
    }
} */