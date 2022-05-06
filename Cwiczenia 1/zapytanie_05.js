db = connect("localhost:27017/nbd")
printjson( 
	db.people.find({
		"birth_date":{
			$gte:"2001-01-01T00:00:00.000Z", 
			$lt:"2100-01-01T00:00:00.000Z"}
	},
	{
		"_id":0,
		"first_name":1,
		"last_name":1,
		"location.city":1
	}).toArray()
)