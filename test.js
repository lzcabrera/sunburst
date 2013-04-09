
var width = 450, height = 400;
var r = Math.min(width, height) / 2;
var svg = d3.select('#chart').append('svg').attr("width", width).attr("height", height);
var pi = Math.PI;
var color = d3.scale.category20b();

var jan, feb, mar, apr, may, jun, jul, aug, sep, oct, nov, dec;
var artichokes, asparagus, chives, cucumber, snappeas, greenbeans, mushrooms, newpotatoes;

var container_vegetablemonth;
var thevegetables;
var thevegetablemonths;
var arc_veggie;

var dur = 750;

var data;

d3.json("data.json", function(error, root) {

	//console.log('root '+root.children.length);


	

	var seasons = root.children[0];
	var months = root.children[1];
	var vegetables = root.children[2];

	//console.dir(d3.each(months));

	//console.dir(vegetable);

	//console.log('season '+seasons.children.length);
	//console.log('month '+months.children.length);

	var arc_season = d3.svg.arc()
					.innerRadius(50*0.3)
					.outerRadius(50)
					.startAngle(function(d){
						return ((d.time - 1)* 90 * pi / 180);
					})
					.endAngle(function(d){
						return (d.time * 90 * pi / 180);
					});
	var arc_month =  d3.svg.arc()
					.innerRadius(80*0.7)
					.outerRadius(80)
						.startAngle(function(d){
						return ((d.time - 1)* 30 * pi / 180);
					})
					.endAngle(function(d){
						return (d.time * 30 * pi / 180);
					});

	//console.dir(container_veggie[0][0].childNodes);
	arc_veggie = d3.svg.arc()
					.innerRadius(110*0.8)
					.outerRadius(110)
					.startAngle(function(d,i){
						//console.info('-- startAngle --'+i);
						//console.dir(d);
						return ((i)* 30 * pi / 180);
					})
					.endAngle(function(d,i){
						//console.info('~~ endAngle ~~'+i);
						//console.dir(d);
						return ((i+1) * 30 * pi / 180);
					});
	var arc_vegetable = d3.svg.arc();
					/*.innerRadius(0*0.8)
					.outerRadius(0)
					.startAngle(function(d,i){
						
						return ((i)* 30 * pi / 180);
					})
					.endAngle(function(d,i){
						return ((i+1) * 30 * pi / 180);
					});*/

	//console.log('arc done');				


	var container_season = svg.append("g").attr('class','ring_season').attr('transform', 'translate(200,150)');
	var container_month = svg.append("g").attr('class','ring_month').attr('transform', 'translate(200,150)');
	var container_veggie = svg.append("g").attr('class','ring_veggie').attr('transform', 'translate(200,150)');
	
	container_vegetablemonth = svg.append("g").attr('class','ring_veggie').attr('transform', 'translate(200,150)');

	var theseasons = container_season.selectAll("path").data(seasons.children);
	var themonths = container_month.selectAll("path").data(months.children);
	thevegetables = container_veggie.selectAll("path").data(vegetables.children);

	data = container_veggie.selectAll("path").data(vegetables.children[0].info);

	


	theseasons.enter().append('path').attr('d',arc_season)
	.attr('class','arc')
	.style("stroke","#eaeaea")
	.attr('class',function(d){return 'arc_'+d.label.toLowerCase()});
	
	theseasons.enter().append("text")
	.attr("transform", function(d,i) {
        return "translate(" + arc_season.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size","0.7em")
    .style("fill","#fff")
    .text(function(d, i) { return d.label; });


    
	themonths.enter().append('path').attr('d',arc_month)
	.attr('class','arc')
	.attr('class',function(d){return 'arc_'+d.label.toLowerCase()})
	.style("fill",function(d,i){ 
		var monthValue = i;
		return color(monthValue);
	});

	themonths.enter().append("text")
	.attr("transform", function(d,i) {
        return "translate(" + arc_month.centroid(d) + ")";
    })
    .attr("text-anchor", "middle")
    .attr("font-family", "sans-serif")
    .attr("font-size","0.7em")
    .style("fill","#fff")
    .text(function(d, i) { return d.label; });

	themonths.each(function(d,i){
		switch (d.label){
			case 'Jan':
				var jan = d;
				break;
			case 'Feb':
				var feb = d;
				break;
			case 'Mar':
				var mar = d;
				break;
			case 'Apr':
				var apr = d;
				break;
			case 'May':
				var may = d;
				break;
			case 'Jun':
				var jun = d;
				break;
			case 'Jul':
				var jul = d;
				break;
			case 'Aug':
				var aug = d;
				break;
			case 'Sep':
				var sep = d;
				break;
			case 'Oct':
				var oct = d;
				break;
			case 'Nov':
				var nov = d;
				break;
			case 'Dec':
				var dec = d;	
				break;	
										
		}
	});


/*
    
    tempvegetables.enter().append('path').attr('d',arc_veggie)
	.attr('class','arc')
	.attr('class', function(d,i){
		var state = (d==1)?"active":"passive";
		return state;
	});*/

	thevegetables.enter().append('path');
	
	thevegetables.each(function(d,i){
		//console.log('test');
		switch(d.label){
			case 'artichokes':
				artichokes = d;
				break;
			case 'asparagus':
				asparagus = d;
				break;
			case 'chives':
				chives = d;
				break;
			case 'cucumber':
				cucumber = d;
				break;
			case 'snappeas':
				snappeas = d;
				break;
			case 'greenbeans':
				greenbeans = d;
				break;
			case 'mushrooms':
				mushrooms = d;
				break;
			case 'newpotatoes':
				newpotatoes = d;
				break;

		}	

		//var vegetablemonths = d.info;

        thevegetablemonths = container_vegetablemonth.selectAll("path").data(d.info);
        thevegetablemonths.enter().append('path').attr('d',arc_veggie)
        .attr('class','arc')
        .attr('class', function(d,i){
        	var state = (d==1)?"active":"passive";
			return state;
        });

        thevegetablemonths.exit().remove();

		//console.dir(d.info);

	});
	

	
	
	

});



function updateChart(model) {
	data = eval(model);


	thevegetables.each(function(d,i){
		if(d.label == model){
			console.log('aja! '+model);

			//data = container_veggie.selectAll("path").data(vegetables.children[0].info);
			console.log('d.info '+d.info);

			thevegetablemonths = thevegetablemonths.data(d.info);

			thevegetablemonths.transition().ease("elastic").duration(dur);//.attrTween("d", arcTween);

	      

		}
	});
   /* data = eval(model); // which model?
    arcs = arcs.data(donut(data.pct)); // recompute angles, rebind data
    arcs.transition().ease("elastic").duration(dur).attrTween("d", arcTween);
    sliceLabel.attr("transform", function(d) {
        return "translate(" + arc.centroid(d) + ")"; })
    sliceLabel.attr("text-anchor", "middle")
    pieLabel.text(data.label);
    */

    alert('model: '+model);
}



$(".season-section h3 a").click(function(e) {
	e.preventDefault();
	var ss = $(this).parent().parent();

	if(ss.hasClass('section-open')){
		ss.removeClass('section-open');
	}else{
		ss.addClass('section-open');
	}
	
});

$(".season-section ul a").click(function() {
    updateChart(this.href.slice(this.href.indexOf('#') + 1));
});


