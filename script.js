// Function to setup the website
function setup(){
    //Calling the function to set the colour of the blocks in the cube
    setupCube()
    //Calling the function to create the events for the website
    createEvents()
    //Calling the function to set up the current mode on the website
    currentModeSetup()
    //Setting default values for items from local storage
    localStorage.setItem("currentSelectedBlock","none")
    localStorage.setItem("currentSelectedColor","none")
}

//Function to setup the current mode for the website
function currentModeSetup(){
    //Setting the default cube change mode and displaying it to the screen
    currentMode =localStorage.getItem("currentMode")
    currentModeDiv = document.getElementById("currentMode")
    //Setting a default value for the currentMode if user hasn't entered site before
    if (currentMode == null){
        localStorage.setItem("currentMode","Color To Block")
        currentMode = "Color To Block"
    }
    currentModeDiv.innerHTML = "Current Mode : " + currentMode
}

//Function to setup the colour of the blocks on the cube
function setupCube(){
    //Setting up the initial colours of the cube, if the user hasn't used the website before
    //This variable is used to check whether the colours have been previously set or not
    blockColours = localStorage.getItem("blockColours")
    if (blockColours == null){
        //Setting a default colour for each of the colours in the cube
        blockNmb=0
        //FaceNmb is used so that it can loop through all of the faces of the cube
        faceNmb=0
        //Setting a default value for the faceNmb (to be used later)
        localStorage.setItem("faceNmb",1)
        for (let i=0;i<=5;i++){
            //Incrementing the faceNmb and reseting the blockNmb for each face
            faceNmb++
            blockNmb = 0
            for (let j=0;j<=2;j++){
                for (let k=0;k<=2;k++){
                    blockNmb++
                    localStorage.setItem("face"+faceNmb+"blockNmb"+blockNmb,"red")
                }
            }
        }
        //Setting it in local storage that the initial cube has been set up
        localStorage.setItem("blockColours",true)
    }
    //Setting the colours of the cube to the colours in the array
    blockNmb = 0
    //Getting the value of the faceNmb from local storage
    faceNmb = localStorage.getItem("faceNmb")
    for (let j=0;j<=2;j++){
        for(let k=0;k<=2;k++){
            blockNmb++
            block = document.getElementById("block"+blockNmb)
            blockColour = localStorage.getItem("face"+faceNmb+"blockNmb"+blockNmb)
            block.style.background = blockColour
        }
    }
}

// Function used to make the event listener functions for the blocks and colors 
function createEvents(){
    // Creating the click event listener for each block 
    // The block array has been used to simplify the addEventListener line 
    blocks = new Array(9)
    for (let i=1; i<=9; i++){
        blocks[i-1] = document.getElementById("block"+i)
        blocks[i-1].addEventListener("click",(e) => selectBlock(e))
    }
    // Creating the click event for the colors 
    // Code implemented the same way the block code has been
    colors = new Array(9)
    for (let i=1; i<=6; i++){
        colors[i-1] = document.getElementById("color"+i)
        colors[i-1].addEventListener("click",(e) => selectColor(e))
    }
}

// Function used to select the block of the cube 
function selectBlock(e){
    try{
        if (currentSelectedBlock == e.target){
            currentSelectedBlock.style.border="5px solid black"
            currentSelectedBlock = "none"
            localStorage.setItem("currentSelectedBlock","none")
        }
        else{
            if (currentSelectedBlock != "none"){
                currentSelectedBlock.style.border = "5px solid black"
            }
            e.target.style.border = "5px solid white"
            currentSelectedBlock = e.target
            localStorage.setItem("currentSelectedBlock",currentSelectedBlock.id)
        }
    }
    catch{
        currentSelectedBlock = "none"
    }
    
    //Changing the color of blocks if appropriate and correct mode
    currentMode = localStorage.getItem("currentMode")
    currentSelectedColor = localStorage.getItem("currentSelectedColor")
    if (currentMode == "Color To Block" && currentSelectedColor != "none" && currentSelectedBlock != "none"){
        //Retrieving the actual color that the id we currently has refers to
        color = getColor(currentSelectedColor)
        faceNmb = localStorage.getItem("faceNmb") //Collecting the current faceNmb from local storage
        blockNmb = currentSelectedBlock.id.substring(5) //Using the current selected block id to find the block number that it is
        currentSelectedBlock.style.background = color
        //Setting the color to connect to the block in local storage, so the system saves
        localStorage.setItem("face"+faceNmb+"blockNmb"+blockNmb,color) 
    }
}

// Function used to select the block of the cube 
function selectColor(e){
    try{
        if (currentSelectedColor == e.target){
            currentSelectedColor.style.border="4px solid black"
            currentSelectedColor = "none"
            localStorage.setItem("currentSelectedColor","none")
        }
        else{
            if (currentSelectedColor != "none"){
                currentSelectedColor.style.border = "4px solid black"
            }
            e.target.style.border = "4px solid white"
            currentSelectedColor = e.target
            localStorage.setItem("currentSelectedColor",currentSelectedColor.id)
        }
    }
    catch{
        currentSelectedColor = "none"
    }
    //Changing the color of blocks if appropriate and correct mode
    currentMode = localStorage.getItem("currentMode")
    currentSelectedBlockId = localStorage.getItem("currentSelectedBlock")
    currentSelectedBlock = document.getElementById(currentSelectedBlockId)
    if (currentMode == "Block To Color" && currentSelectedBlock != "none" && currentSelectedColor != "none"){
        //Retrieving the actual color that the id we currently has refers to
        color = getColor(currentSelectedColor.id)
        faceNmb = localStorage.getItem("faceNmb") //Collecting the current faceNmb from local storage
        blockNmb = currentSelectedBlock.id.substring(5) //Using the current selected block id to find the block number that it is
        currentSelectedBlock.style.background = color
        //Setting the color to connect to the block in local storage, so the system saves
        localStorage.setItem("face"+faceNmb+"blockNmb"+blockNmb,color) 
    }
}

// Function called when the user selects the buttons at the top of the page
// Function to hide the colours from the page 
function hideColours(){
    hideCol = document.getElementById("hideCol")
    showCol = document.getElementById("showCol")
    colors = document.getElementsByClassName("col")
    hideCol.classList.add("hide")
    showCol.classList.remove("hide")
    for (let i=0; i<=6; i++){
        colors[i].classList.add("hide")
    }
}

// Function to show the colours from the page
function showColours(){
    hideCol = document.getElementById("hideCol")
    showCol = document.getElementById("showCol")
    colors = document.getElementsByClassName("col")
    hideCol.classList.remove("hide")
    showCol.classList.add("hide")
    for (let i=0; i<=6; i++){
        colors[i].classList.remove("hide")
    }
}

//Function which translates a color id into the actual color that it refers to
function getColor(colorId){
    if (colorId == "color1"){
        return "red"
    }
    else if (colorId == "color2"){
        return "orange"
    }
    else if (colorId == "color3"){
        return "blue"
    }
    else if (colorId == "color4"){
        return "green"
    }
    else if (colorId == "color5"){
        return "white"
    }
    else if (colorId == "color6"){
        return "yellow"
    }
    else{
        return "Error Occured"
    }
}

//Function to show the info on the screen
function showInfo(){
    showInf = document.getElementById("showInfo")
    hideInf = document.getElementById("hideInfo")
    info = document.getElementById("infoContainer")
    showInf.classList.add("hide")
    hideInf.classList.remove("hide")
    info.classList.remove("hide")
}

//Function to hide the info on the screen
function hideInfo(){
    showInf = document.getElementById("showInfo")
    hideInf = document.getElementById("hideInfo")
    info = document.getElementById("infoContainer")
    showInf.classList.remove("hide")
    hideInf.classList.add("hide")
    info.classList.add("hide")
}

//Functions to change the currentMode of the website
function colorToBlock(){
    localStorage.setItem("currentMode","Color To Block")
    currentModeDiv = document.getElementById("currentMode")
    currentModeDiv.innerHTML = "Current Mode : Color To Block"
}

function blockToColor(){
    localStorage.setItem("currentMode","Block To Color")
    currentModeDiv = document.getElementById("currentMode")
    currentModeDiv.innerHTML = "Current Mode : Block To Color"
}