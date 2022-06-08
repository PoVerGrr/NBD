db = connect("localhost:27017/nbd")

map = function() {
		val = {
			count: 1,
			weight: parseFloat(this.weight),
			height: parseFloat(this.height) 
		}
		emit(this.sex, val)
	}
	
reduce = function(sex, values) {
		out = {count:0, weight:0, height:0}
		
		for(i=0; i<values.length; i++){
			out.count += values[i].count
			out.weight += values[i].weight
			out.height += values[i].height
		}
		return out 
	}

 finalize = function (key, result) {
	out = {height_avg:0.0, weight_avg:0.0}
	
	out.height_avg = result.height/result.count
	out.weight_avg = result.weight/result.count
	
	return out
};

db.people.mapReduce(
	map,
	reduce,
	{finalize: finalize, out: "zad1"}
)

printjson( 
	db.zad1.find().toArray()
)
