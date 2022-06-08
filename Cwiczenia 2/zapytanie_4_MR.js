db = connect("localhost:27017/nbd")

map = function() {
		weight = parseFloat(this.weight)
		height = parseFloat(this.height)
		BMI = weight/Math.pow(height/100,2)
		val = {
			count: 1,
			min_BMI:BMI, 
			max_BMI:BMI, 
			sum_BMI:BMI
		}
		emit(this.nationality, val)
	}
	
reduce = function(nationality, values) {
		out = {count:0, min_BMI:0.0, max_BMI:0.0, sum_BMI:0.0}
		start_val = values[0]

		out.count += start_val.count		
		out.sum_BMI += start_val.sum_BMI
		out.min_BMI = start_val.min_BMI
		out.max_BMI = start_val.max_BMI

		for(i=1; i<values.length; i++){
			min_BMI = values[i].min_BMI
			max_BMI = values[i].max_BMI
			sum_BMI = values[i].sum_BMI

			out.count += values[i].count
			out.sum_BMI += sum_BMI
			out.min_BMI = out.min_BMI > min_BMI ? min_BMI: out.min_BMI 
			out.max_BMI = out.max_BMI < max_BMI ? max_BMI: out.max_BMI
		}
		
		return out 
	}

 finalize = function (key, result) {
	out = {min_BMI:0.0, max_BMI:0.0, avg_BMI:0.0}
	
	out.avg_BMI = result.sum_BMI/result.count
	out.min_BMI = result.min_BMI
	out.max_BMI = result.max_BMI
	
	return out
};

db.people.mapReduce(
	map,
	reduce,
	{finalize: finalize, out: 'zad4'}
)

printjson( 
	db.zad4.find().toArray()
)
