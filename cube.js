import { Block } from "./block.js";

class Cube {
  constructor() {
    //Making a block array
    this.blocks = new Array();
    //Initialising default variables
    this.faceNmb = 1;
    this.faceNmbLeft = 4;
    this.faceNmbRight = 2;
    this.faceNmbUp = 5;
    this.faceNmbDown = 6;
    //Initialising the colorAmount variables for the cube
    this.redAmount = 0;
    this.orangeAmount = 0;
    this.greenAmount = 0;
    this.blueAmount = 0;
    this.yellowAmount = 0;
    this.whiteAmount = 0;
    //Setting up the currentMode part of the website for the cube
    //The cube stores currentMode to help with changeBlock function
    this.currentMode = "Color To Block";
    //Variables for the changeBlock() function
    this.currentSelectedBlock = null
    //The identifier has default value [0,0] to not cause error, no block in the cube can have this identifier
    this.currentSelectedBlockIdentifer = [0,0]
  }

  //Function to get and set the currentMode variable for the cube
  setCurrentMode(pCurrentMode) {
    this.currentMode = pCurrentMode;
    //This function also displays the new current mode to the website
    let currentModeDiv = document.getElementById("currentMode");
    currentModeDiv.innerHTML = "Current Mode : " + this.currentMode;
  }

  getCurrentMode() {
    return this.currentMode;
  }
  
  //Function to get the currently selected block
  getCurrentSelectedBlock(){
    return this.currentSelectedBlock;
  }

  //Making all the blocks to go into the array, to represent the cube
  //This can't be within the constructor as otherwise getColor(i) function won't be defined and therefore can't be used
  makeBlocks() {
    for (let i = 1; i <= 6; i++) {
      let color = this.getColor(i);
      for (let j = 1; j <= 9; j++) {
        this.makeBlock(i, j, color);
      }
    }
  }

  //Function primarily used to remake the blocks array after saving a cube
  //Also used in the makeBlocks() function to simplify code (Reduce lines)
  makeBlock(pFaceNmb, pBlockNmb, pColor) {
    let newBlock = new Block(pFaceNmb, pBlockNmb, pColor);
    this.incrementColorVariables(pColor);
    this.blocks.push(newBlock);
  }

  displayCube() {
    let cubesDisplayed = 0;
    for (let i = 0; i <= 53; i++) {
      if (this.blocks[i].getFaceNmb() == this.faceNmb) {
        let block = document.getElementById("block" + this.blocks[i].getBlockNmb());
        let blockColour = this.blocks[i].getColor();
        let blockBorder = this.blocks[i].getBorder();
        block.style.background = blockColour;
        block.style.border = blockBorder;
        cubesDisplayed += 1;
        if (cubesDisplayed == 9) {
          break;
        }
      }
    }
  }

  // Function used to select the block of the cube
  selectBlock(e) {
    let selectedBlockNmb = e.target.id.substring(5)
    let selectedBlockIdentifier = [this.faceNmb,selectedBlockNmb]
    if (this.currentSelectedBlockIdentifer[0] == selectedBlockIdentifier[0] && this.currentSelectedBlockIdentifer[1] == selectedBlockIdentifier[1]) {
      this.currentSelectedBlock.setBorder("5px solid black")
      this.currentSelectedBlock = null
      this.currentSelectedBlockIdentifer = [0,0]
    } else {
      if (this.currentSelectedBlock != null) {
        this.currentSelectedBlock.setBorder("5px solid black")
      }
      let selectedBlock = this.findBlock(selectedBlockNmb)
      this.currentSelectedBlock = selectedBlock
      this.currentSelectedBlockIdentifer = selectedBlockIdentifier
      this.currentSelectedBlock.setBorder("5px solid white")
    }
    //Changing the color of blocks if appropriate and correct mode
    let currentSelectedColor;
    try{
      currentSelectedColor = parseInt(localStorage.getItem("currentSelectedColor").substring(5));
    }
    catch{console.log("No Current Color")}
    if (this.currentMode == "Color To Block" && currentSelectedColor != "none" && this.currentSelectedBlock != null) {
      let errorIdentifier = document.getElementById("errorIdentifier");
      //Checking to see if the block they are trying to change is the middle block
      //If so, an error occurs as you are unable to do this
      if (this.currentSelectedBlock.getBlockNmb() == 5) {
        errorIdentifier.classList.remove("hide");
        errorIdentifier.innerHTML = "Unable to change color of the central block in a face";
      } else {
        errorIdentifier.classList.add("hide");
        //Retrieving the actual color that the id we currently has refers to
        let color = this.getColor(currentSelectedColor);
        //Getting the current color that the block is (so that the block of that colour can be decremeneted)
        let currentColor = this.currentSelectedBlock.getColor();
        //Changing the number of blocks that are of each color
        this.decrementColorVariables(currentColor);
        this.incrementColorVariables(color);
        this.currentSelectedBlock.setColor(color);
      }
    }
    this.displayCube()
  }

  findBlock(blockNmb) {
    for (let i = 0; i <= 53; i++) {
      let currentBlock = this.blocks[i];
      if (
        currentBlock.getBlockNmb() == blockNmb &&
        currentBlock.getFaceNmb() == this.faceNmb
      ) {
        return currentBlock;
      }
    }
  }

  incrementColorVariables(color) {
    if (color == "red") {
      this.redAmount += 1;
    } else if (color == "blue") {
      this.blueAmount += 1;
    } else if (color == "orange") {
      this.orangeAmount += 1;
    } else if (color == "yellow") {
      this.yellowAmount += 1;
    } else if (color == "white") {
      this.whiteAmount += 1;
    } else if (color == "green") {
      this.greenAmount += 1;
    }
  }

  decrementColorVariables(color) {
    if (color == "red") {
      this.redAmount -= 1;
    } else if (color == "blue") {
      this.blueAmount -= 1;
    } else if (color == "orange") {
      this.orangeAmount -= 1;
    } else if (color == "yellow") {
      this.yellowAmount -= 1;
    } else if (color == "white") {
      this.whiteAmount -= 1;
    } else if (color == "green") {
      this.greenAmount -= 1;
    }
  }

  //Function to translate the initial faceNmbs to a color, to be used
  getColor(colorId) {
    switch (colorId) {
      case 1:
        return "red";
      case 2:
        return "yellow";
      case 3:
        return "orange";
      case 4:
        return "white";
      case 5:
        return "blue";
      case 6:
        return "green";
      default:
        return "Error Occurred";
    }
  }

  //Function called to change the currently viewed face that the user is on
  changeFace(e) {
    //This piece of code uses the id of the element that has been selected to uniquely define what button it is
    let controlNmb = e.target.id.substring(11);
    //Changing the face number of the cube depending on what button the user has pressed
    if (controlNmb == 1) {
      this.faceNmbRight = this.faceNmb
      this.faceNmb = this.faceNmbLeft
      this.faceNmbLeft = this.oppositeColour(this.faceNmbRight)
    } 
    else if (controlNmb == 2) {
      this.faceNmbDown = this.faceNmb;
      this.faceNmb = this.faceNmbUp;
      this.faceNmbUp = this.oppositeColour(this.faceNmbDown);
    } 
    else if (controlNmb == 3) {
      this.faceNmbUp = this.faceNmb;
      this.faceNmb = this.faceNmbDown;
      this.faceNmbDown = this.oppositeColour(this.faceNmbUp)
    } 
    else if (controlNmb == 4) {
      this.faceNmbLeft = this.faceNmb;
      this.faceNmb = this.faceNmbRight
      this.faceNmbRight = this.oppositeColour(this.faceNmbLeft);
    }
    //Calling the function to display the new face onto the website
    this.displayCube();
  }

  //Function to find the faceNmb of the opposite side of the cube, that the user is currently on
  //Ie red and orange are on oppsite sides of the cube, so inputting red returns orange and etc.
  oppositeColour(colorNmb){
    if (colorNmb == 1){
      return 3
    }
    else if (colorNmb == 2){
      return 4
    }
    else if (colorNmb == 3){
      return 1
    }
    else if (colorNmb == 4){
      return 2
    }
    else if (colorNmb == 5){
      return 6
    }
    else if (colorNmb == 6){
      return 5
    }
  }

  //Function to ensure that the cube is able to move into solving state
  //This function checks all the color amount variables to ensure they are correct, and if so moves the website into solving state
  verifyCube() {
    //Setting a default value for the verification state
    let cubeVerified = true;
    //Setting default values for variables that will be used, if the cube isn't verified
    //These are initialised so they can be set in the for loop, and then used outside of the for loop
    let colorIssue = "";
    let colorIssueAmount = 0;
    //Making an array storing the color and the amount of each color (makes it easier to loop through all the colors)
    let colorAmounts = [["red", this.redAmount],["orange", this.orangeAmount],["blue", this.blueAmount],["green", this.greenAmount],["yellow", this.yellowAmount],["white", this.whiteAmount]];
    for (let i = 0; i <= 5; i++) {
      if (colorAmounts[i][1] != 9) {
        //Defining the colorIssue variables, if incorrect number of colors
        cubeVerified = false;
        colorIssue = colorAmounts[i][0];
        colorIssueAmount = colorAmounts[i][1];
        break;
      }
    }
    //Cube is verified so user is able to move into solving state
    if (cubeVerified == true) {
      this.saveCube()
      localStorage.setItem("solveTerminal",true) //Variable to tell system that the user is allowed on page
      window.location.href = 'solveTerminal.html'
    }
    //Displaying error amount
    else {
      let errorIdentifier = document.getElementById("errorIdentifier");
      errorIdentifier.classList.remove("hide");
      errorIdentifier.innerHTML ="Unable to enter solving mode - Incorrect number of " +colorIssue +" blocks : " +colorIssueAmount +"/9";
    }
  }

  //Function to save all cube information to local storage, so the cube can be accessed later
  saveCube() {
    //Code to save all of the blocks within the cube to local storage
    for (let i = 0; i <= 53; i++) {
      //Collecting all of the information from the block
      let faceNmb = this.blocks[i].getFaceNmb();
      let blockNmb = this.blocks[i].getBlockNmb();
      let color = this.blocks[i].getColor();
      //Saving it in local storage
      localStorage.setItem("block" + i, faceNmb + "," + blockNmb + "," + color);
    }
    //Setting a variable to notify whether cube has been saved or not
    localStorage.setItem("savedCube", true);
    //Other information isn't saved as it isn't necessary
    //ColorAmount variables are recollected when remaking the cube
  }

  //Function to turn the individual rows on the cube, to allow the user to move the cube
  turnRow(e){
    //Finding the action that the user is doing, and where they are doing this
    //This is done by translating the HTML Id's into the direction and location
    let targetId = e.target.id
    let actionLocation = targetId.substring(targetId.length-1)
    let actionDirection = targetId.split(actionLocation)[0]
    //Finding how much the blockNmb increment needs to be multiplied by, given the location that the user has selected
    let locationValue = this.translateLocation(actionLocation)
    //Initialising a faceNmbs array, marking the different faceNmbs that will be accessed
    //Here, the order of the faceNmbs in the array is the order in which the different faceNmbs will need to be
    let faceNmbs;
    if (actionDirection == "right"){
      faceNmbs = [this.faceNmb,this.faceNmbRight,this.oppositeColour(this.faceNmb),this.faceNmbLeft]
    }
    else if (actionDirection == "left"){
      faceNmbs = [this.faceNmb,this.faceNmbLeft,this.oppositeColour(this.faceNmb),this.faceNmbRight]
    }
    else if (actionDirection == "up"){
      faceNmbs = [this.faceNmb,this.faceNmbUp,this.oppositeColour(this.faceNmb),this.faceNmbDown]
    }
    else{
      faceNmbs = [this.faceNmb,this.faceNmbDown,this.oppositeColour(this.faceNmb),this.faceNmbUp]
    }
    //Moving the faceNmbs of the blocks and getting all the blocks that have been accessed (and their indexes)
    let accessedBlocks = this.moveRows(actionDirection,locationValue,faceNmbs)
    //Rotating the side connected the location where the cube has been turned
    if (actionLocation != "M"){
      this.rotateSide(actionLocation,targetId)
    }
    //Function used to sort the blocks array to put the blocks to the new locations where they should be
    this.sortBlocks(accessedBlocks)
    //Displaying the new cube that has been made
    this.displayCube()
  }
  
  moveRows(actionDirection,locationValue,faceNmbs){
    let accessedBlocks = []
    for (let i=1; i<=4; i++){
      let currentFaceNmb = faceNmbs[i-1]
      for (let j=1; j<=3;j++){
        let currentBlock
        if (actionDirection == "up" || actionDirection == "down"){
          currentBlock = this.blocks[(currentFaceNmb-1)*9 + (locationValue+1+(j-1)*3) -1]
        }
        else if (actionDirection == "right" || actionDirection == "left"){
          currentBlock = this.blocks[(currentFaceNmb-1)*9 + (j+3*locationValue-1)]
        }
        if (i < 4){
          currentBlock.setFaceNmb(faceNmbs[i])
        }
        else{
          currentBlock.setFaceNmb(faceNmbs[0])
        }
        if (actionDirection == "up" || actionDirection == "down"){
          accessedBlocks.push([currentBlock,(currentFaceNmb-1)*9 + (locationValue+1+(j-1)*3) -1])
        }
        else if (actionDirection == "right" || actionDirection == "left"){
          accessedBlocks.push([currentBlock,(currentFaceNmb-1)*9 + (j+3*locationValue-1)])
        }
        
      }
    }
    return accessedBlocks
  }

  rotateSide(actionLocation,actionId){
    //Getting the faceNmb of the blocks which we are rotating
    let faceNmb = this.getActionFaceNmb(actionLocation)
    //Defining a default array to store a copy of all blocks accessed
    let accessedBlocks = []
    //Defining default variable to store the newBlockNmbs
    let newBlockNmbs
    //Seeing which of the two possible rotations need to be completed (depending on what action is made)
    if ((actionId == "upR") || (actionId == "downL") || (actionId == "leftT") || (actionId == "rightB")){
      console.log("Rotating")
      newBlockNmbs = [7,4,1,8,5,2,9,6,3]
    }
    else{
      console.log("Rotating")
      newBlockNmbs = [3,6,9,2,5,8,1,4,7]
    } 
    //Getting the blocks and changing the blockNmbs, then resorting the blocks array
    for (let i=0;i<=8;i++){
      let currentBlock = this.blocks[faceNmb*9+i]
      currentBlock.setBlockNmb(newBlockNmbs[i])
      accessedBlocks.push(currentBlock)
    }
    for (let i=0;i<=8;i++){
      this.blocks[faceNmb*9+newBlockNmbs[i]-1] = accessedBlocks[i]
    }
  }

  getActionFaceNmb(actionLocation){
    switch(actionLocation){
      case "R" :
        return this.faceNmbRight
      case "L" :
        return this.faceNmbLeft
      case "T" : 
        return this.faceNmbUp
      case "B" : 
        return this.faceNmbDown
    }
  }

  //Translation the location where the user has selected to turn into a value, to be used later in calculations
  translateLocation(actionLocation){
    if (actionLocation == "T" || actionLocation == "L"){
      return 0
    }
    else if (actionLocation == "M"){
      return 1
    }
    else{
      return 2
    }
  }

  sortBlocks(accessedBlocks){
    for (let i=1;i<=4;i++){
      let k
      if (i<4){
        k=i
      }
      else{
        k=0
      }
      for (let j=1;j<=3;j++){
        this.blocks[accessedBlocks[3*k+j-1][1]] = accessedBlocks[3*(i-1)+j-1][0]
      }
    }
  }
}

export { Cube };
