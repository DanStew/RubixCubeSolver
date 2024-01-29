function setup(){
    //Calling the function to set the colour of the blocks in the cube
    setupCube()
    //Calling the function to create the events for the website
    createEvents()
    //Setting default values for items from local storage
    localStorage.setItem("currentSelectedBlock","none")
    localStorage.setItem("currentSelectedColor","none")
}

//Function to setup the colour of the blocks on the cube
function setupCube(){
    //Setting up the initial colours of the cube, if the user hasn't used the website before
    //This variable is used to check whether the colours have been previously set or not
    blockColours = localStorage.getItem("blockColours")
    if (blockColours == null){
        location.href="index.html"
    }
    //Displaying the face of the cube to the user
    //Setting the colours of the cube to the colours in the array
    blockNmb = 0
    //Getting the value of the faceNmb from local storage
    faceNmb = localStorage.getItem("currentFaceNmb")
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
    // Creating the click events for the controls of the website
    controls = new Array(4)
    for (let i=1; i<=4; i++){
        controls[i-1] = document.getElementById("cubeControl"+i)
        controls[i-1].addEventListener("click",(e) => changeFace(e))
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
        blockNmb = currentSelectedBlock.id.substring(5) //Using the current selected block id to find the block number that it is
        errorIdentifier = document.getElementById("errorIdentifier")
        //Checking to see if the block they are trying to change is the middle block
        //If so, an error occurs as you are unable to do this
        if (blockNmb == 5){
            errorIdentifier.classList.remove("hide")
            errorIdentifier.innerHTML = "Unable to change color of the central block in a face"
        }
        else{
            errorIdentifier.classList.add("hide")
            faceNmb = localStorage.getItem("currentFaceNmb") //Collecting the current faceNmb from local storage
            //Retrieving the actual color that the id we currently has refers to
            color = getColor(currentSelectedColor)
            //Getting the current color that the block is (so that the block of that colour can be decremeneted)
            currentColor = currentSelectedBlock.style.background
            //Changing the number of blocks that are of each color
            decrementColorAmount(currentColor)
            incrementColorAmount(color)
            currentSelectedBlock.style.background = color
            //Setting the color to connect to the block in local storage, so the system saves
            localStorage.setItem("face"+faceNmb+"blockNmb"+blockNmb,color) 
        }
    }
}

//Function called to change the currently viewed face that the user is on
function changeFace(e){
    //This piece of code uses the id of the element that has been selected to uniquely define what button it is
    controlNmb = e.target.id.substring(11)
    //Changing the face number of the cube depending on what button the user has pressed
    if (controlNmb == 1){
        //Getting the value of the faceNmb when the user presses left
        faceNmbLeft = localStorage.getItem("faceNmbLeft")
        //Changing the value of the current faceNmb in local storage
        localStorage.setItem("currentFaceNmb",faceNmbLeft)
        //Updating the surrounding faceNmbs, so the left and right now point to the correct face
        updateFaceNmbsLeftRight(faceNmbLeft)
    }
    else if (controlNmb == 2){
        faceNmb = localStorage.getItem("currentFaceNmb")
        //Updating the surrounding faceNmb variables in local storage
        updateFaceNmbsUp(faceNmb)
    }
    else if (controlNmb == 3){
        faceNmb = localStorage.getItem("currentFaceNmb")
        //Updating the surrounding faceNmb variables in local storage
        updateFaceNmbsDown(faceNmb)
    }
    else if (controlNmb == 4){
        //Getting the value of the faceNmb when the user presses right
        faceNmbRight = localStorage.getItem("faceNmbRight")
        //Changing the value of the current faceNmb in local storage
        localStorage.setItem("currentFaceNmb",faceNmbRight)
        //Updating the surrounding faceNmbs, so the left and right now point to the correct face
        updateFaceNmbsLeftRight(faceNmbRight)
    }
    //Calling the function to display the new face onto the website
    displayCubeFace()
}