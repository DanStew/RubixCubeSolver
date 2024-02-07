class Block{
    constructor(pFaceNmb,pBlockNmb,pColor,pBorder="5px solid black"){
        this.faceNmb = pFaceNmb
        this.blockNmb = pBlockNmb
        this.color = pColor
        this.border = pBorder
    }

    //Getter and setter methods for the blocks
    setFaceNmb(pFaceNmb){
        this.faceNmb = pFaceNmb
    }

    getFaceNmb(){
        return this.faceNmb
    }

    setBlockNmb(pBlockNmb){
        this.blockNmb = pBlockNmb
    }

    getBlockNmb(){
        return this.blockNmb
    }

    setColor(pColor){
        this.color = pColor
    }

    getColor(){
        return this.color
    }

    setBorder(pBorder){
        this.border = pBorder
    }

    getBorder(){
        return this.border
    }
}

export {Block}