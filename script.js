document.getElementById('btn1').addEventListener('click', function() {
    fetch('https://your-backend-url/get_business_ratings')
        .then(response => response.json())
        .then(data => {
            // Use the data to populate visualizations
            createBarChart(data, 'Business Ratings', 'Business', 'Rating');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

document.getElementById('btn2').addEventListener('click', function() {
    fetch('https://your-backend-url/get_review_counts')
        .then(response => response.json())
        .then(data => {
            // Use the data to populate visualizations
            createBarChart(data, 'Review Counts', 'Business', 'Review Count');
        })
        .catch((error) => {
            console.error('Error:', error);
        });
});

function createBarChart(data, title, xLabel, yLabel) {
    d3.select("#my_dataviz").selectAll("*").remove();

    var margin = { top: 50, right: 30, bottom: 50, left: 80 },
        width = 500 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    var svg = d3.select("#my_dataviz")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -margin.top / 2)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("fill", "#000")
        .text(title);

    var xScale = d3.scaleBand()
        .range([0, width])
        .padding(0.1)
        .domain(data.map(function(d) { return d.business; }));

    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(xScale))
        .selectAll("text")
        .style("text-anchor", "end")
        .attr("dx", "-.8em")
        .attr("dy", ".15em")
        .attr("transform", "rotate(-65)");

    var yScale = d3.scaleLinear()
        .domain([0, d3.max(data, function(d) { return +d.value; })])
        .range([height, 0]);

    svg.append("g")
        .call(d3.axisLeft(yScale));

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", function(d) { return xScale(d.business); })
        .attr("width", xScale.bandwidth())
        .attr("y", function(d) { return yScale(d.value); })
        .attr("height", function(d) { return height - yScale(d.value); })
        .attr("fill", "steelblue");
}
