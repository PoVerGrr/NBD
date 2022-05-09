db = connect("localhost:27017/nbd")
printjson( 
	db.people.update(
		{job: "Editor"},
		{$unset: {email:1}},
		{"multi": true}
	)
)

printjson(
	db.people.find(
		{
			job: "Editor"
		},
		{
			_id:0,
			job:1,
			email:1
		}
	).toArray()
)