db = connect("localhost:27017/nbd")

map = function() {
		emit(this.job, 1)
	}
	
reduce = function(currency, values) {
		out = {count:0}
		
		for(i=0; i<values.length; i++)
			out.count += values[i]

		return out 
	}

db.people.mapReduce(
	map,
	reduce,
	{out: 'zad3'}
)

printjson( 
	db.zad3.find().toArray()
)
