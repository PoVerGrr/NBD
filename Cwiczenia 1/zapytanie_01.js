db = connect("localhost:27017/nbd")
printjson( 
	db.people.aggregate([{$limit:1}]).toArray()
)