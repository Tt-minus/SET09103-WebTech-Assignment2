'use strict';

// Length of each fish by fish name
function render(data, name, width, height, value){
	let byName = d3.group(data, d=>d.SPECIES_NAME, value);
	let avgLength = d3.rollups(data, v=>d3.mean(v,value), d=>d.SPECIES_NAME);
	console.log('Inside Render');
	console.log(avgLength);
	
	let barContainer = d3.select(name);

	let barSvg = barContainer.append('svg')
		.attr('width', width)
		.attr('height', height)
		.classed('barchart', true)
	
	
	// Declare x and y
	const x = d3.scaleBand()
		.domain(d3.groupSort(data, d=>d.avgLength, d=>d.SPECIES_NAME))
		.range([0, width])
		.padding(0.1);
	
	const y = d3.scaleLinear()
        .domain([0, 5])
        .range([height - 20, 10]);
	
	// Add the x-axis and y-axis
	barSvg.append("g")
		.attr("transform", `translate(0,${height - 20})`)
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
	
	let bars = barSvg.selectAll('rect.bar')
		.data(avgLength)
		.join('rect')
		.classed('bar', true)
		.attr('x', (d, i)=>i*107+34)
		.attr('height', d=>d[1]-20)
		.attr('width', 50)
		.attr('y', d=> height-d[1])
		.style('fill', d=> d[1] <400?'#ba4a53':null)
		.style('stroke', d=> d[1] <400?'#381619':null);
}
// Length of each fish by site name
function locationrender(data, name, width, height, value){
	let byName = d3.group(data, d=>d.SITE_NAME, value);
	let avgLength = d3.rollups(data, v=>d3.mean(v,value), d=>d.SITE_NAME);
	console.log('Inside Render');
	console.log(avgLength);
	
	let barContainer = d3.select(name);

	let barSvg = barContainer.append('svg')
		.attr('width', width)
		.attr('height', height + 20)
		.classed('barchart', true)
	
	// Declare x and y
	const x = d3.scaleBand()
		.domain(d3.groupSort(data, d=>d.avgLength, d=>d.SITE_NAME))
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
		.data(avgLength)
		.join('rect')
		.classed('bar', true)
		.attr('x', (d, i)=>i*139+50)
		.attr('height', d=>d[1])
		.attr('width', 50)
		.attr('y', d=> height-d[1])
		.style('fill', d=> d[1] <400?'#ba4a53':null)
		.style('stroke', d=> d[1] <400?'#381619':null);
}
// Load fish length data
d3.csv('static/data/FW_Fish_Individual_Lengths_2026-09-20.csv')
	.then(lengthData=>{
		let byName = d3.group(lengthData, d=>d.SPECIES_NAME, d=>d.FISH_LENGTH);
		console.log('Group fish name then fish length');
		console.log(byName);
		
		let avgLength = d3.rollups(lengthData, v=>d3.mean(v,d=>d.FISH_LENGTH), d=>d.SPECIES_NAME);
		console.log('Average fish lengths by Name:');
		console.log(avgLength);
		
		//let groupTest = d3.groupSort(lengthData, D=>d3.median(D, d=>d.FISH_LENGTH), d=>d.SPECIES_NAME);
		//console.log('Group sort test');
		//console.log(groupTest);
		
		console.log('Render test');
		render(lengthData, 'div#fishData', 1400, 500, d=>d.FISH_LENGTH);
		locationrender(lengthData, 'div#fishData', 1400, 500, d=>d.FISH_LENGTH);
	});
	
// Display fish population
function altrender(data, name, width, height, value){
	
	let totalPopulation = d3.rollup(data, v=>d3.sum(v,value), d=>d.SPECIES_NAME);
	console.log('Inside Render');
	console.log(totalPopulation);
	
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
		.data(totalPopulation)
		.join('rect')
		.classed('bar', true)
		.attr('x', (d, i)=>i*68+34)
		.attr('height', d=>d[1])
		.attr('width', 56)
		.attr('y', d=> height-d[1])
		.style('fill', d=> d[1] <400?'#ba4a53':null)
		.style('stroke', d=> d[1] <400?'#381619':null);
}

d3.csv('static/data/FW_Fish_Counts_2026-09-20.csv')
	.then(population=>{
		//let topPopulation = d3.sort(data, (a,b)=>d3.descending(a.SPCSNO, b.SPCSNO)).filter((d,i)=>i<10);
		//console.log('Top 10 fish with most population');
		//console.log(topPopulation);
		
		console.log('Render test');
		//render(population, 'div#fishData', 2000, 500, d=>d.SPCSNO);
	});


/*
function render(data, name, width, height, value){
	let avgLength = d3.rollups(data, v=>d3.mean(v,value), d=>d.SPECIES_NAME);
	console.log('Inside Render');
	console.log(avgLength);
	
	let barContainer = d3.select(name);

	let barSvg = barContainer.append('svg')
		.attr('width', width)
		.attr('height', height)
		.classed('barchart', true)
	
		
	let bars = barSvg.selectAll('rect.bar')
		.data(data, d=>d.k)
		.join('rect')
		.classed('bar', true)
		.attr('x', (d, i)=>i*40+5)
		.attr('height', value)
		.attr('width', 35)
		.attr('y', value)
		.style('fill', value<400?'#ba4a53':null)
		.style('stroke', value[1] <400?'#381619':null);
}
d3.csv('static/data/FW_Fish_Individual_Lengths_2026-09-20.csv')
	.then(data=>{
		let byName = d3.group(data, d=>d.SPECIES_NAME, d=>d.FISH_LENGTH);
		console.log('Group fish name then fish length');
		console.log(byName);
		
		let avgLength = d3.rollups(data, v=>d3.mean(v,d=>d.FISH_LENGTH), d=>d.SPECIES_NAME);
		console.log('Average fish lengths by Name:');
		console.log(avgLength);
		
		//let groupTest = d3.groupSort(data, D=>d3.median(D, d=>d.FISH_LENGTH), d=>d.SPECIES_NAME);
		//console.log('Group sort test');
		//console.log(groupTest);
		
		console.log('Render test');
		render(data, 'div#fishData', 23850, 1200, d=>d.FISH_LENGTH);
	});
*/

/*
d3.csv('static/data/FW_Fish_Individual_Lengths_2026-09-20.csv', d=>{
	return {
		SITE_ID: d.SITE_ID,
		SITE_NAME: d.SITE_NAME,
		SURVEY_ID: d.SURVEY_ID,
		EVENT_DATE: d.EVENT_DATE,
		SURVEY_SPECIES_ID: d.SURVEY_SPECIES_ID,
		SPECIES_ID: d.SPECIES_ID,
		SPECIES_NAME: d.SPECIES_NAME,
		LATIN_NAME: d.LATIN_NAME,
		SPECIES_RUN_ID: d.SPECIES_RUN_ID,
		RUN_NUMBER: d.RUN_NUMBER,
		LW_MEASURED_ID: d.LW_MEASURED_ID,
		FISH_LENGTH: d.FISH_LENGTH,
		FISH_WEIGHT: d.FISH_WEIGHT,
		AGE_BAND: d.AGE_BAND,
		NALL_AGE: d.NALL_AGE
	}
})
.then(dataset=>{
	console.log(dataset);
	
	let fishNames = Array.from(new Set(dataset.map(d=>d.SPECIES_NAME)));
	console.log('Unique fish:');
	console.log(fishNames);
	
	let byName1 = d3.group(dataset, d=>d.SPECIES_NAME, d=>d.SITE_NAME);
	let byName2 = d3.groups(dataset, d=>d.SPECIES_NAME, d=>d.SITE_NAME);
	let byName3 = d3.flatGroup(dataset, d=>d.SPECIES_NAME, d=>d.SITE_NAME);
	console.log('data sorted by fish name and location:');
	console.log(byName1);
	console.log(byName2);
	console.log(byName3);
	
	let byName4 = d3.rollup(dataset, v=>v.length, d=>d.SPECIES_NAME, d=>d.SITE_NAME);
	let byName5 = d3.rollups(dataset, v=>v.length, d=>d.SPECIES_NAME, d=>d.SITE_NAME);
	let byName6 = d3.flatRollup(dataset, v=>v.length, d=>d.SPECIES_NAME, d=>d.SITE_NAME);
	console.log('Number of fish by fish name and location:');
	console.log(byName4);
	console.log(byName5);
	console.log(byName6);
	
	let avgLength = d3.rollups(dataset, v=>d3.mean(v,d=>d.FISH_LENGTH), d=>d.SPECIES_NAME);
	console.log('Average fish lengths by location:');
	console.log(avgLength);
	
	let topLength = d3.sort(dataset, (a,b)=>d3.descending(a.FISH_LENGTH, b.FISH_LENGTH)).filter((d,i)=>i<10);
	console.log('top 10 fish with highest length:');
	console.log(topLength);
})



	let bars = barSvg.selectAll('rect.bar')
		.data(data, d=>d.k)
		.join('rect')
		.classed('bar', true)
		.attr('x', (d, i)=>i*40+5)
		.attr('height', d=>d.avgLength)
		.attr('width', 35)
		.attr('y', d=>d.avgLength)
		.style('fill', d=>d.avgLength<400?'#ba4a53':null)
		.style('stroke', d=>d.avgLength<400?'#381619':null);

function rerender(data, name, width, height){
	let barContainer = d3.select(name);

	let barSvg = barContainer.append('svg')
		.attr('width', width)
		.attr('height', height)
		.classed('barchart', true)
	
	// Declare x and y
	const x = d3.scaleBand()
		.domain(d3.groupSort(data, d=>d.FISH_LENGTH, d=>d.SPECIES_NAME))
		.range([0, width])
		.padding(0.1);
	
	const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height - 20, 10]);
	
	// Add the x-axis and y-axis
	barSvg.append("g")
		.attr("transform", `translate(0,${height - 20})`)
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
		
	let bars = barSvg.selectAll('rect.bar')
		.data(data, d=>d.k)
		.join('rect')
		.classed('bar', true)
		.attr('x', (d, i)=>i*40+5)
		.attr('height', d=>d.FISH_LENGTH)
		.attr('width', 35)
		.attr('y', d=>1000-d.FISH_LENGTH)
		.style('fill', d=>d.FISH_LENGTH<400?'#ba4a53':null)
		.style('stroke', d=>d.FISH_LENGTH<400?'#381619':null);
}

d3.csv('static/data/FW_Fish_Individual_Lengths_2026-09-20.csv')
	.then(data=>{
		let byName = d3.groups(data, d=>d.SPECIES_NAME, d=>d.FISH_LENGTH);
		console.log('Group fish name then fish length');
		console.log(byName);
		console.log('Render test');
		rerender(data, 'div#fishData', 23850, 1225);
	});
*/