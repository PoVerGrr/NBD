db = connect("localhost:27017/nbd")
printjson( 
	db.people.aggregate([
		{$group:{
				_id: "$sex",
				avg_weight: {$avg: {$convert: {input: "$weight", to: "double"}}},
				avg_height: {$avg: {$convert: {input: "$height", to: "double"}}}
		}}
	])
	.toArray()
)