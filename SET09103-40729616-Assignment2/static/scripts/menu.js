'use strict';

function render(data, name, width, height, value){
	console.log('Inside Render');
	
	let totalPopulation = d3.rollups(data, v=>d3.sum(v,value), d=>d.SPECIES_NAME);
	console.log(totalPopulation);
	
	let topPopulation = d3.sort(totalPopulation, (a,b)=>d3.descending(a.value - b.value)).filter((d,i)=>i<10);
	console.log(topPopulation);
	
	let barContainer = d3.select(name);

	let barSvg = barContainer.append('svg')
		.attr('width', width)
		.attr('height', height + 20)
		.classed('barchart', true)
	
	// Declare x and y
	const x = d3.scaleBand()
		.domain(d3.groupSort(data, value, d=>d.SPECIES_NAME))
		.range([0, width])
		.padding(0.1);
	
	const y = d3.scaleLinear()
        .domain([0, 1])
        .range([height, 10]);
	
	// Add the x-axis and y-axis
	barSvg.append("g")
		.attr("transform", `translate(0,${height})`)
		.call(d3.axisBottom(x).tickSizeOuter(0));

	barSvg.append("g")
            .attr("transform", `translate(${30},0)`)
            .call(d3.axisLeft(y).tickFormat((y) => (y * 100).toFixed()))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
				.attr("x", -50)
                .attr("y", -10)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text("↑ Frequency (%)"));
	
	// Load barchart
	let bars = barSvg.selectAll('rect.bar')
		.data(topPopulation)
		.join('rect')
		.classed('bar', true)
		.attr('x', (d, i)=>i*70+34)
		.attr('height', d=>d[1])
		.attr('width', 50)
		.attr('y', d=> height-d[1])
		.style('fill', d=> d[1] <400?'#ba4a53':null)
		.style('stroke', d=> d[1] <400?'#381619':null);
}
d3.csv('static/data/FW_Fish_Counts_2026-09-20.csv')
	.then(data=>{
		let topPopulation = d3.sort(data, (a,b)=>d3.descending(a.SPCSNO, b.SPCSNO)).filter((d,i)=>i<10);
		console.log('Top 10 fish with most population');
		console.log(topPopulation);
		
		console.log('Render test');
		render(data, 'div#fishData', 2000, 500, d=>d.SPCSNO);
	});
