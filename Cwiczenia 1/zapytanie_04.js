db = connect("localhost:27017/nbd")
printjson( 
	db.people.find({
		"weight":{$gte:"68.0", $lt:"71.5"}
	}).toArray()
)