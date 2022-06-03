db = connect("localhost:27017/nbd")

map = function() {
		sex = this.sex
		nationality = this.nationality
		
		if(sex == 'Female' && nationality == 'Poland')
			for (card of this.credit) 
			   emit(card.currency, {count:1, balance:parseFloat(card.balance)})
		else 
			return
	}
	
reduce = function(nationality, values) {
		out = {sum_balance:0, count:0}
		
		for(i=0; i<values.length; i++){
			out.sum_balance += values[i].balance
			out.count += values[i].count
		}
		
		return out 
	}

 finalize = function (key, result) {
	out = {sum_balance:0, avg_balance:0}
	
	out.avg_balance = result.sum_balance/result.count
	out.sum_balance = result.sum_balance
	
	return out
};

db.people.mapReduce(
	map,
	reduce,
	{finalize: finalize, out: 'zad5'}
)

printjson( 
	db.zad5.find().toArray()
)
