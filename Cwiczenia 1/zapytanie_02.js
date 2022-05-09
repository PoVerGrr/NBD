db = connect("localhost:27017/nbd")
printjson( 
	db.people.findOne({
		"sex":"Female",
		"nationality":"China"
	})
)