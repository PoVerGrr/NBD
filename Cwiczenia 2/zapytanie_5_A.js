db = connect("localhost:27017/nbd")
printjson( 
	db.people.aggregate([
		{$match:{
			sex: "Female",
			nationality:"Poland"
		}},
		{$unwind : "$credit"},
		{$group:{
				_id: "$credit.currency",
				avg_balanced: {$avg: {$convert: {input: "$credit.balance", to: "double"}}},
				sum_balanced: {$sum: {$convert: {input: "$credit.balance", to: "double"}}}
		}}
	])
	.toArray()
)