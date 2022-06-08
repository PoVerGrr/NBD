db = connect("localhost:27017/nbd")
printjson( 
	db.people.aggregate([
		{$group:{
				_id: "$job"
		}}
	])
	.toArray()
)