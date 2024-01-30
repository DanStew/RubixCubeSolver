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
    if (
      this.currentMode == "Color To Block" &&
      currentSelectedColor != "none" &&
      this.currentSelectedBlock != null
    ) {
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
        return "white";
      case 3:
        return "orange";
      case 4:
        return "yellow";
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
      this.faceNmb = this.faceNmbLeft;
      //Updating the surrounding faceNmbs
      this.updateFaceNmbsLeftRight(this.faceNmbLeft);
    } else if (controlNmb == 2) {
      //Updating the surrounding faceNmb variables in local storage
      this.updateFaceNmbsUp(this.faceNmb);
    } else if (controlNmb == 3) {
      //Updating the surrounding faceNmb variables in local storage
      this.updateFaceNmbsDown(this.faceNmb);
    } else if (controlNmb == 4) {
      this.faceNmb = this.faceNmbRight;
      //Updating the surrounding faceNmbs, so the left and right now point to the correct face
      this.updateFaceNmbsLeftRight(this.faceNmbRight);
    }
    //Calling the function to display the new face onto the website
    this.displayCube();
  }

  //Updating the faceNmb and surrounding variables if the user selects to go Left or Right
  updateFaceNmbsLeftRight(faceNmb) {
    //Updating the surrounding faceNmbs, so the left and right now point to the correct face
    if (faceNmb == 1) {
      this.faceNmbLeft = 4;
      this.faceNmbRight = 2;
    } else if (faceNmb == 2) {
      this.faceNmbLeft = 1;
      this.faceNmbRight = 3;
    } else if (faceNmb == 3) {
      this.faceNmbLeft = 2;
      this.faceNmbRight = 4;
    } else if (faceNmb == 4) {
      this.faceNmbLeft = 3;
      this.faceNmbRight = 1;
    }
  }

  //Updating the faceNmb and surrounding variables if the user selects to go Up or Down
  updateFaceNmbsUp(faceNmb) {
    //Collecting what the next down button value for faceNmb is
    this.faceNmbDown = this.faceNmb;
    this.faceNmb = this.faceNmbUp;
    //Finding and setting the value of the faceNmb if they go Up again
    if (faceNmb == 1) {
      this.faceNmbUp = 3;
    }
    if (faceNmb == 2) {
      this.faceNmbUp = 4;
    }
    if (faceNmb == 3) {
      this.faceNmbUp = 1;
    }
    if (faceNmb == 4) {
      this.faceNmbUp = 2;
    }
    if (faceNmb == 5) {
      this.faceNmbUp = 6;
    }
    if (faceNmb == 6) {
      this.faceNmbUp = 5;
    }
  }

  //Updating the faceNmb and surrounding variables if the user selects to go Up or Down
  updateFaceNmbsDown(faceNmb) {
    this.faceNmbUp = this.faceNmb;
    this.faceNmb = this.faceNmbDown;
    //Finding and setting the value of the faceNmb if they go down again
    if (faceNmb == 1) {
      this.faceNmbDown = 3;
    }
    if (faceNmb == 2) {
      this.faceNmbDown = 4;
    }
    if (faceNmb == 3) {
      this.faceNmbDown = 1;
    }
    if (faceNmb == 4) {
      this.faceNmbDown = 2;
    }
    if (faceNmb == 5) {
      this.faceNmbDown = 6;
    }
    if (faceNmb == 6) {
      this.faceNmbDown = 5;
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
    let colorAmounts = [
      ["red", this.redAmount],
      ["orange", this.orangeAmount],
      ["blue", this.blueAmount],
      ["green", this.greenAmount],
      ["yellow", this.yellowAmount],
      ["white", this.whiteAmount],
    ];
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
      console.log("Cube verified");
    }
    //Displaying error amount
    else {
      let errorIdentifier = document.getElementById("errorIdentifier");
      errorIdentifier.classList.remove("hide");
      errorIdentifier.innerHTML =
        "Unable to enter solving mode - Incorrect number of " +
        colorIssue +
        " blocks : " +
        colorIssueAmount +
        "/9";
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
}

export { Cube };
