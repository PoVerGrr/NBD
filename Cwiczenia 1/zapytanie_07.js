db = connect("localhost:27017/nbd")
printjson( 
	db.people.remove(
		{
			height: {$gt:"190"}
		}
	)
)

printjson(
	db.people.find(
		{
			height: {$gt:"190"}
		}
	).count()
)