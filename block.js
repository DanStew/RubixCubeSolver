class Block{
    constructor(pFaceNmb,pBlockNmb,pColor){
        this.faceNmb = pFaceNmb
        this.blockNmb = pBlockNmb
        this.color = pColor
    }

    //Getter and setter methods for the blocks
    setFaceNmb(pFaceNmb){
        this.faceNmb = pFaceNmb
    }

    getFaceNmb(){
        return this.faceNmb
    }

    setBlockNmb(){
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
}

export {Block}