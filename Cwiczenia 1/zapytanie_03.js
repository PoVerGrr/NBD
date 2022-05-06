db = connect("localhost:27017/nbd")
printjson(
	db.people.find({
		"sex":"Male",
		"nationality":"Germany"
	}).toArray()
)