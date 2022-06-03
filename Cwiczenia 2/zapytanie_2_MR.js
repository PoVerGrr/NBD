db = connect("localhost:27017/nbd")

map = function() {
		for (card of this.credit) 
		   emit(card.currency, parseFloat(card.balance))
	}
	
reduce = function(currency, values) {
		out = {sum_balance:0}
		
		for(i=0; i<values.length; i++)
			out.sum_balance += values[i]

		return out 
	}

db.people.mapReduce(
	map,
	reduce,
	{out: 'zad2'}
)

printjson( 
	db.zad2.find().toArray()
)
