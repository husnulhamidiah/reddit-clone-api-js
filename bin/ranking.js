Item = mongoose.model('Item'),
/*
params.type - String
params.limit - integer
*/
function getRankedItems(callback) {
  Item.aggregate([
    { $project: 
      {
        item: "$_id",
        ranking: { 
          $divide: [
            { $add: [
              "$upvotes",
              { $multiply: ["$numComments", 0.08] },
              { $multiply: ["$views", 0.002] },
              0.75
            ] }, //end $add
            { $add: [
              1,
              { $subtract: [
                { $multiply: [ // this is a workaround for mongo version 3.0 (no $pow)
                  { $multiply: [
                    { $divide: [{ $subtract: [ new Date(), "$createDate" ] },14400000]},
                    .4
                  ] }, //end $multiply
                  { $multiply: [
                    { $divide: [{ $subtract: [ new Date(), "$createDate" ] },14400000]},
                    .4
                  ] } //end $multiply
                ] }, //end $multiply
                { $multiply: [ // this is a workaround for mongo version 3.0 (no $pow)
                  { $multiply: [
                    { $subtract: [
                      { $divide: [{ $subtract: [ new Date(), "$createDate" ] },14400000]},
                      { $divide: [{ $subtract: [ new Date(), "$lastUpdate" ] },14400000]}
                    ] }, //end $subtract
                    .3
                  ] }, //end $multiply
                  { $multiply: [
                    { $subtract: [
                      { $divide: [{ $subtract: [ new Date(), "$createDate" ] },14400000]},
                      { $divide: [{ $subtract: [ new Date(), "$lastUpdate" ] },14400000]}
                    ] }, //end $subtract
                    .3
                  ] } //end $multiply
                ] } //end $multiply
              ] } //end $subtract
            ] } //end $add
          ] } //end $divide
        }
      }, //end $project
      { $sort: { ranking: -1 } },
      { $limit: parseInt(params.limit) }
    ],
    function(err, results) {
      if (err) {
        console.log(err);
        return callback(err);
      }
      callback(null, results);
    }
  ); //end Items.aggregate
}