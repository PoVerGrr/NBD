db = connect("localhost:27017/nbd")

map = function() {
		weight = parseFloat(this.weight)
		height = parseFloat(this.height)
		BMI = weight/Math.pow(height/100,2)
		val = {
			count: 1,
			BMI: BMI
		}
		emit(this.nationality, val)
	}
	
reduce = function(nationality, values) {
		BMI = values[0].BMI
		out = {count:1, min_BMI:BMI, max_BMI:BMI, sum_BMI:BMI}
		
		for(i=1; i<values.length; i++){
			BMI = values[i].BMI
			out.count += values[i].count
			out.sum_BMI += BMI
			out.min_BMI = out.min_BMI > BMI ? BMI: out.min_BMI 
			out.max_BMI = out.max_BMI < BMI ? BMI: out.max_BMI
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
