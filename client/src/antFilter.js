function reorderAnts(antArray){
    var orderedArray = [];
    var newArray = antArray.sort((a,b) => {
        console.log(a.likelyhood, "should be numberb ")
        return b.likelyhood - a.likelyhood;
    })

    console.log(newArray, "Should be ordered?")
    return newArray;

}

export default reorderAnts;