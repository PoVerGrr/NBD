db = connect("localhost:27017/nbd")
printjson( 
	db.people.aggregate([
		{$unwind: "$credit"},
		{$group:{
				_id: "$credit.currency",
				sum_balance: {$sum: {$convert: {input: "$credit.balance", to: "double"}}}
		}}
	])
	.toArray()
)