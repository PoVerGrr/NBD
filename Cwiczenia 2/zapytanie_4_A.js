db = connect("localhost:27017/nbd")
printjson( 
	db.people.aggregate([
		{$addFields: {BMI: {$divide:[
								{$convert:{ input: "$weight", to: "double" }}, 
								{$pow:[
									{$divide:[{ $convert:{ input: "$height", to: "double" }}, 100.0]},2
									]} 
							]}}},
		{$group:{
				_id: "$nationality",
				avg_BMI: {$avg: "$BMI"},
				min_BMI: {$min: "$BMI"},
				max_BMI: {$max: "$BMI"}
		}}
	])
	.toArray()
)