db = connect("localhost:27017/nbd")
printjson( 
	db.people.update(
		{first_name: "Antonio"},
		{$push: {hobby: "pingpong"}},
		{"multi": true}
	)
)

printjson(
	db.people.find(
		{
			first_name: "Antonio"
		},
		{
			_id:0,
			first_name:1,
			hobby:1
		}
	).toArray()
)