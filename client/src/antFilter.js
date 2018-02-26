function reorderAnts(antArray){
    //sort the array passed in by the likelyhood they will win the race.
    var newArray = antArray.sort((a,b) => {
        return b.likelyhood - a.likelyhood;
    })

    return newArray;

}

export default reorderAnts;