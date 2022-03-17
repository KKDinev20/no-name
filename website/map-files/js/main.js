const overlay = document.getElementById('overlay');
const popup = document.getElementById('popup');

overlay.addEventListener('click', () => {
    const popups = document.querySelectorAll('.popup.active')
    popups.forEach(popup => {
        closePopup(popup);
    })
})

function openPopup(popup){
    if(popup == null) return
    popup.classList.add('active');
    overlay.classList.add('active');
}
function closePopup(popup){
    if(popup == null) return
    popup.classList.remove('active');
    overlay.classList.remove('active');
}


var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
var height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

var svg = d3.select("body")
    .append("svg")
    .style("cursor", "move");

svg.attr("viewBox", "50 10 " + width + " " + height)
    .attr("preserveAspectRatio", "xMinYMin");

var zoom = d3.zoom()
    .on("zoom", function () {
        var transform = d3.zoomTransform(this);
        map.attr("transform", transform);
    });

svg.call(zoom);

var map = svg.append("g")
    .attr("class", "map");

d3.queue()
    .defer(d3.json, "map-files/data/50m.json")
    .defer(d3.json, "map-files/data/population.json")
    .defer(d3.json, "map-files/data/data.json")
    .await(function (error, world, population, history) {
        if (error) {
            console.error('Oh dear, something went wrong: ' + error);
        }
        else {
            drawMap(world, population, history);
        }
    });

function drawMap(world, population, history) {
    // geoMercator projection
    var projection = d3.geoMercator() //d3.geoOrthographic()
        .scale(200)
        .translate([width / 2, height / 1.5]);

    // geoPath projection
    var path = d3.geoPath().projection(projection);

    //colors for population metrics
    var color = d3.scaleThreshold()
        .domain([10000, 100000, 500000, 1000000, 5000000, 10000000, 50000000, 100000000, 500000000, 1500000000])
        .range(["#C8F7C8", "#B1F3B1", "#8DD88D", "#8AC28A", "#86AC86", "#73BE73", "#65A765", "#568F56"]);

    var features = topojson.feature(world, world.objects.countries).features;
    var populationById = {};
    var historyById = {};

    population.forEach(function (d) {
        populationById[d.country] = {
            total: +d.total,
            females: +d.females,
            males: +d.males,
        }
    }); 

    history.forEach(function (d) {
        historyById[d.country] = {
            information: d.information,
            flag : d.flag
        }
    });

    features.forEach(function (d) {
        d.population = populationById[d.properties.name] ? populationById[d.properties.name] : {};
        d.history = historyById[d.properties.name] ? historyById[d.properties.name] : {};
    });

    map.append("g")
        .selectAll("path")
        .data(features)
        .enter().append("path")
        .attr("name", function (d) {
            return d.properties.name;
        })
        .attr("id", function (d) {
            return d.id;
        })
        .attr("d", path)
        .style("fill", function (d) {
            return d.population && d.population.total ? color(d.population.total) : "#568F56";
        })
        .on('click', function(d) {
            var info = d.history.information;
            var partinfo = [{},{},{}];
            for(let i = 0; i < 3; i++)
            {
                let start = i * 600;
                partinfo[i] = info.substr(start, 600);
            }
            console.log(partinfo[0]);
            let counter = 0;
            openPopup(popup);
            d3.select(".title")
            .text(d.properties.name)
            d3.select(".information")
            .text(partinfo[0] + '...');
            document.getElementById('country-flag').src = d.history.flag;

            

        })
        .on('mouseover', function (d) {
            d3.select(this)
                .style("stroke", "white")
                .style("stroke-width", 0.7)
                .style("cursor", "pointer");
        })
        .on('mouseout', function (d) {
            d3.select(this)
                .style("stroke", null)
                .style("stroke-width", 0.25);

            d3.select('.details')
                .style('visibility', "hidden");
        });
}