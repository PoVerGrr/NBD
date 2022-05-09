db = connect("localhost:27017/nbd")
printjson( 
	db.people.insert({
		sex: "Male",
		first_name: "Alan",
		last_name: "Glodek",
		job: "MarkLogic Developer",
		email: "alan@code4it.pl",
		location:{
			city: "Warsaw",
			address:{
				streetname:"tajne przez poufne",
				streetnumber:"123"
			}
		},
		description: "nic dodac nic ujac",
		height: "171",
		weight: "84.0",
		birth_date: "1997-07-16T02:55:03Z",
		nationality: "Poland",
		credit: [
			{
				type: "switch",
				number: "6759888939100098699",
				currency: "COP",
				balance: "5117.06"
			}
		]
	})
)
printjson( 
	db.people.find({
		first_name: "Alan",
		last_name: "Glodek"
	})
)
