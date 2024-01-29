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
  }

  //Making all the blocks to go into the array, to represent the cube
  //This can't be within the constructor as otherwise getColor(i) function won't be defined and therefore can't be used
  makeBlocks() {
    for (let i = 1; i <= 6; i++) {
      let color = this.getColor(i);
      for (let j = 1; j <= 9; j++) {
        let newBlock = new Block(i, j, color);
        this.blocks.push(newBlock);
      }
    }
  }

  displayCube() {
    let cubesDisplayed = 0;
    for (let i = 0; i <= 53; i++) {
      if (this.blocks[i].getFaceNmb() == this.faceNmb) {
        let block = document.getElementById(
          "block" + this.blocks[i].getBlockNmb()
        );
        let blockColour = this.blocks[i].getColor();
        this.incrementColorVariables(blockColour);
        block.style.background = blockColour;
        cubesDisplayed += 1;
        if (cubesDisplayed == 9) {
          break;
        }
      }
    }
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
    cubeVerified = true;
    //Setting default values for variables that will be used, if the cube isn't verified
    //These are initialised so they can be set in the for loop, and then used outside of the for loop
    colorIssue = "";
    colorIssueAmount = 0;
    for (let i = 1; i <= 6; i++) {
      currentColor = getColor("color" + i);
      colorAmount = localStorage.getItem(currentColor + "Block");
      if (colorAmount != 9) {
        cubeVerified = false;
        colorIssue = currentColor;
        colorIssueAmount = colorAmount;
      }
    }
    //Cube is verified so user is able to move into solving state
    if (cubeVerified == true) {
      console.log("Cube verified");
    }
    //Displaying error amount
    else {
      errorIdentifier = document.getElementById("errorIdentifier");
      errorIdentifier.classList.remove("hide");
      errorIdentifier.innerHTML ="Unable to enter solving mode - Incorrect number of " +colorIssue +" blocks : " +colorIssueAmount +"/9";
    }
  }
}

export { Cube };
