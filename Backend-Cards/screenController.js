const APIscreenCost = require("./models/schemathree");
//for req.params we write directly in the url box of thunderclient
//for req.body we write in the body section
//for req.query (used rarely) we write in the query section
exports.getCost = async(req,res) =>{
    try{
        const cinema = req.params.cinema;
        const screen = req.params.screen;
        const cost = await APIscreenCost.findOne({cinemaName : cinema, ScreenID: screen});
        //http://localhost:5000/api/screen/cost/Vandana Heritage/1
         
        if(!cost) 
        {
            return res.status(404).json({message:'Requested Detail could not be found, please recheck the parameters'});
        }
        else
        {
            return res.status(200).json(cost.cost);
        }
    }
    catch(error){
        res.status(500).json({message: "Server error", error: error.message})
    }
}