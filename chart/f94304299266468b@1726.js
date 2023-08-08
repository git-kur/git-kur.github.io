import define1 from "./b2bbebd2f186ed03@1803.js";

function _1(md){return(
md`# Donut/Pie Chart Race
## The rise and fall of popular web browsers from 1994 to 2023.

The visualisation chosen for this donut-shaped graphical race is fun to watch for anyone who lived through the browser shift of the 2000s, starting with the collapse of the Netscape Navigator, which was the dominant web browser in the 1990s.

The subsequent takeover by other web browsers and their eventual collapse are just as interesting. We are talking here, of course, about the infamous Internet Explorer which was pre-bundled with every copy of Microsoft Windows.`
)}

function _2(md){return(
md`*Note: The numbers used to build the CSV dataset are only approximate. They are based on the values reported in the Wikipedia page on the [Usage share of web browsers](https://en.wikipedia.org/wiki/Usage_share_of_web_browsers). *

*For comparison purposes, have a look at [this video](https://youtu.be/H52DmvfzDWM) posted on YouTube by James Eagle.*`
)}

function _replay(html){return(
html`<button>Replay`
)}

function _observation_period(interval){return(
interval([1994, 2023], {
  step: 1,
  value: [1994, 2023],
  format: ([start, end]) => `January ${start} … December ${end}`,
  label: 'Period of interest'
})
)}

async function* _chart(replay,width,observation_period,d3,keyframes,wrap,formatDate,invalidation)
{
  replay;
  
  const height = Math.min(width, 700);
  const radius = height/2 - 150*height/700;
  
  const duration = 15;

  const innerRadius_factor = 0.65;
  const dist_text_factor = 1.54;
  const width_image = 56*height/700;
  const min_angle = 0.38;
  const hide_angle = 0.07;
  const font_size = 15;  
  const font_size_year = 64*height/700;
  
  const background_color = "#FDFDFD";
  const border_color = "#C0C0C0";

  const wrap_title_top = 380;  
  const font_size_title = 28*height/700;  
  const title_top = "Rise and fall of popular web browsers ("+observation_period[0]+" - "+observation_period[1]+")";
  
  const title = "Market share (%)";
  
  const arc = d3.arc()
      .innerRadius(radius * innerRadius_factor)
      .outerRadius(radius);


  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [-width / 2, -height / 2, width, height])
      .attr("style", "max-width: 100%; height: auto;")
      .style("background", background_color)
      .attr("style", "outline: thin solid")
      .style("outline-color", border_color);

  yield svg.node();
            
  for (const keyframe of keyframes) {
    const transition = svg.transition()
        .duration(duration)
        .ease(d3.easeLinear);

    const pie = d3.pie()
      .padAngle(1 / radius)
      .sort(null)
      .value(d => d.value);

     const color = d3.scaleOrdinal()
      .domain(keyframe[1].map(d => d.name))
      .range(d3.quantize(t => d3.interpolateSpectral(t * 0.85 + 0.1), keyframe[1].length).reverse());

  svg.selectAll("g").remove();

  svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", font_size_title)
      .attr("font-weight", "bold") 
      .attr("fill-opacity", 0.2)  
    
    .selectAll()
    .data(pie(keyframe[1]))
      .join("text")
      .call(text => text.append("tspan")
          .attr("class", "title_top")   
          .attr("x", -width/2 + 30*height/700)   
          .attr("y", -height/2 + 50*height/700) 
          .attr("dy", "0.2em") 
          .text(title_top));

  svg.selectAll(".title_top")
    .call(wrap, wrap_title_top);
             
    
  svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", font_size_year)
      .attr("text-anchor", "middle") 
      .attr("fill-opacity", 0.2)
    .selectAll()
    .data(pie(keyframe[1]))
    .join("text")
      .call(text => text.append("tspan")
          .attr("font-weight", "bold")
          .attr("x", 0)    
          .attr("y", "10px")
          .text(d => formatDate(keyframe[0]))
      .call(text => text.append("tspan")
          .attr("font-weight", "lighter")     
          .attr("x", 0)
          .attr("y", 50*height/700)
          .attr("font-size", font_size_year/2.8)
          .text(title)));

    
  svg.append("g")
    .selectAll()
    .data(pie(keyframe[1]))
    .enter()
    .filter(d => (d.endAngle - d.startAngle) > 2*hide_angle)
    .append('line')
    .style("stroke", "black")
    .style("stroke-width", 1)
      .attr("x1", d => arc.centroid(d)[0]*1.2)
      .attr("y1", d => arc.centroid(d)[1]*1.2)
      .attr("x2", d => arc.centroid(d)[0]*dist_text_factor*0.88)
      .attr("y2", d => arc.centroid(d)[1]*dist_text_factor*0.88); 
    
  svg.append("g")
    .selectAll()
    .data(pie(keyframe[1]))
    .join("path")
      .attr("fill", d => color(d.data.name))
      .attr("d", arc)
    .append("title")
      .text(d => `${d.data.name}: ${d.data.value.toLocaleString()}`);

  svg.append("g")
    .selectAll()
    .data(pie(keyframe[1]))
    .join("svg:image")
      .filter(d => (d.endAngle - d.startAngle) < min_angle && (d.endAngle - d.startAngle) > hide_angle)
        .attr("xlink:href", d => d.data.image) 
        .attr("transform", d => `translate(${[arc.centroid(d)[0]-width_image*0.5*(d.endAngle - d.startAngle)/min_angle,
                                              arc.centroid(d)[1]-width_image*0.5*(d.endAngle - d.startAngle)/min_angle]})`)
        .attr('width', d => width_image*(d.endAngle - d.startAngle)/min_angle);
    
  svg.append("g")
    .selectAll()
    .data(pie(keyframe[1]))
    .join("svg:image")
      .filter(d => (d.endAngle - d.startAngle) > min_angle)
        .attr("xlink:href", d => d.data.image) 
        .attr("transform", d => `translate(${[arc.centroid(d)[0]-width_image/2,arc.centroid(d)[1]-width_image/2]})`)
        .attr('width', d => width_image);
    
  svg.append("g")
      .attr("font-family", "sans-serif")
      .attr("font-size", font_size)
      .attr("text-anchor", "middle")
    .selectAll()
    .data(pie(keyframe[1]))
    .join("text")
      .attr("transform", d => `translate(${[arc.centroid(d)[0]*dist_text_factor,arc.centroid(d)[1]*dist_text_factor]})`)
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 2*hide_angle).append("tspan")            
          .attr("y", "-0.6em")   
          .attr("dy", "-1em") 
          .attr("font-weight", "bold")
          .attr("class", "tick")
          .text(d => d.data.name))
      .call(text => text.filter(d => (d.endAngle - d.startAngle) > 2*hide_angle).append("tspan")
          .attr("x", 0)
          .attr("dy", "1.2em") 
          .attr("fill-opacity", 0.7)
          .text(d => d.data.value.toLocaleString("en-US", { maximumFractionDigits: 1 })+"%"));

    svg.selectAll(".tick")
    .call(wrap, 8);
    
    invalidation.then(() => svg.interrupt());
    await transition.end();

  }
}


function _6(md){return(
md`## Appendices`
)}

function _rawData(FileAttachment){return(
FileAttachment("web_browsers_1994-2023.csv").csv({typed: true})
)}

function _start_date(observation_period){return(
new Date(observation_period[0],0)
)}

function _end_date(observation_period){return(
new Date(observation_period[1],12)
)}

function _rawData_Filtered(rawData,start_date,end_date){return(
rawData.filter(d => d.date.getTime() >= start_date && d.date.getTime() <= end_date)
)}

function _data(rawData_Filtered,pieImages){return(
rawData_Filtered.map(obj1 => { 
  let obj2 = pieImages.find(obj2 => obj1.name === obj2.name); 
  return { ...obj1, ...obj2 }; 
})
)}

function _names(data){return(
new Set(data.map(d => d.name))
)}

function _datevalues(d3,data){return(
Array.from(d3.rollup(data, ([d]) => d.value, d => +d.date, d => d.name))
  .map(([date, data]) => [new Date(date), data])
  .sort(([a], [b]) => d3.ascending(a, b))
)}

async function _pieImages(FileAttachment){return(
[
  { name: "Mosaic", image: await (await FileAttachment("Mosaic.png")).url(),},
  { name: "Safari", image: await (await FileAttachment("Safari.png")).url(),},
  { name: "Netscape", image: await (await FileAttachment("Netscape.png")).url(),},
  { name: "Opera", image: await (await FileAttachment("opera.png")).url(),},  
  { name: "Chrome", image: await (await FileAttachment("Chrome.png")).url(),},  
  { name: "Firefox", image: await (await FileAttachment("Firefox.png")).url(),},    
  { name: "Internet Explorer", image: await (await FileAttachment("IE.png")).url(),},      
  { name: "Edge", image: await (await FileAttachment("Edge.png")).url(),},  
  ]
)}

function _imageLinks(pieImages){return(
new Map(pieImages.map(d => [d.name, d.image]))
)}

function _formatDate(d3){return(
d3.utcFormat("%Y")
)}

function _rank(names,imageLinks){return(
function rank(value) {
  const data = Array.from(names, name => ({name, image: imageLinks.get(name), value: value(name) || 0}));
  //data.sort((a, b) => d3.descending(a.value, b.value));
  for (let i = 0; i < data.length; ++i) data[i].rank = i;
  return data;
}
)}

function _keyframes(d3,datevalues,rank)
{
  const keyframes = [];
  const k = 100;
  let ka, a, kb, b;
  for ([[ka, a], [kb, b]] of d3.pairs(datevalues)) {
    for (let i = 0; i < k; ++i) {
      const t = i / k;
      keyframes.push([
        new Date(ka * (1 - t) + kb * t),
        rank(name => (a.get(name) || 0) * (1 - t) + (b.get(name) || 0) * t)
      ]);
    }
  }
  keyframes.push([new Date(kb), rank(name => b.get(name) || 0)]);
  return keyframes;
}


function _wrap(d3){return(
function wrap(text, wrapWidth) {
  text.each(function() {
    var text = d3.select(this),
        words = text.text().split(/\s+/).reverse(),
        word,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        dy = parseFloat(text.attr("dy")),
        tspan = text.text(null).append("tspan").attr("dx", 0).attr("dy", `${dy}em`);
    while (word = words.pop()) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > wrapWidth) {
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text.append("tspan").attr("dx", -tspan.node().getComputedTextLength() ).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
      }
    }
  });
  return 0;
}
)}

function _20(check_observation_period){return(
check_observation_period()
)}

function _set_input(Event){return(
function set_input(input, value) {
  input.value = value;
  input.dispatchEvent(new Event("input", {bubbles: true}));
}
)}

function _check_observation_period(observation_period,set_input,$0){return(
function check_observation_period() { 
   if(observation_period[0]==observation_period[1])
      set_input($0, [observation_period[0]-1,observation_period[1]+1])
 }
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["opera.png", {url: new URL("./files/de5c151fd60dda45c0280a8020578d1952770528cf07cce982fdaf5642f1008af0473672f8a7c3d683a59ac1cd80ff48426e84cd59ac18ec0087c6499d55c859.png", import.meta.url), mimeType: "image/png", toString}],
    ["Netscape.png", {url: new URL("./files/98b8801284aa38c667b4911b1812c0c21b105c20949b8c0e10cc9abe532660f8e0f57d9a2f8e78204b733356337575f21f99944d5fe85942c1ac2eb2e36ffe2d.png", import.meta.url), mimeType: "image/png", toString}],
    ["IE.png", {url: new URL("./files/4046dad76c9898fb46d4c99c5fa34124d30cb5acee60af6ad3937537e5d8173e8e435c03dc5375cc9374c2071bfb1f5aca1bc4a5e13b75f840d6eac9e36900f1.png", import.meta.url), mimeType: "image/png", toString}],
    ["Mosaic.png", {url: new URL("./files/5a960844cd5bfebcc7f1db217244e714c327f824c4fb9f972ebac566d6b65819cc1efbc95c77ddd6a6afbf221d5997c7bdd1d61b38a18b87a30c10dd39f64445.png", import.meta.url), mimeType: "image/png", toString}],
    ["Safari.png", {url: new URL("./files/42f927b4d91b3f6e793bd14644d765dbe02b7a782c146109828e9ba59955bf31a860b3cfb0945d95329eb92ec2657edbff4d0f0ac88147fb129868fca0b63dac.png", import.meta.url), mimeType: "image/png", toString}],
    ["Chrome.png", {url: new URL("./files/0459e6c85f01fe2430cba9820e19265b74dc72bf3e9be055fa29261e60d90ba316227109b503fb1c13bd7ea6568365e55aabcbdfb8005d9a2d2ea2c7baf50a89.png", import.meta.url), mimeType: "image/png", toString}],
    ["Firefox.png", {url: new URL("./files/8ea3e2c8de1a5d4ce16ab63aab52fce8d67405d4d8597c66ca96def8792f05c091a0c74d950e1104681d8c9f8d45aaa635b1b85b1a60c2e6ad033b9e041bd938.png", import.meta.url), mimeType: "image/png", toString}],
    ["Edge.png", {url: new URL("./files/eab8d8fbef79372b5892e78b23493c995f907984c9c7e75e7865934a475eb23d0f77f9def41c3c2bf11ca78c160ea788a494dbe915863dea45849b8a70e11819.png", import.meta.url), mimeType: "image/png", toString}],
    ["web_browsers_1994-2023.csv", {url: new URL("./files/b1b9c8c3ea689485f978c258938e829cc99bbf68525029a9dce06d55ea6f7fc7a5adbe38c481189c07651834a35133f65ec5384da0647c4078a2ebb498594fe3.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer()).define(["md"], _2);
  main.variable(observer("viewof replay")).define("viewof replay", ["html"], _replay);
  main.variable(observer("replay")).define("replay", ["Generators", "viewof replay"], (G, _) => G.input(_));
  main.variable(observer("viewof observation_period")).define("viewof observation_period", ["interval"], _observation_period);
  main.variable(observer("observation_period")).define("observation_period", ["Generators", "viewof observation_period"], (G, _) => G.input(_));
  main.variable(observer("chart")).define("chart", ["replay","width","observation_period","d3","keyframes","wrap","formatDate","invalidation"], _chart);
  main.variable(observer()).define(["md"], _6);
  main.variable(observer("rawData")).define("rawData", ["FileAttachment"], _rawData);
  main.variable(observer("start_date")).define("start_date", ["observation_period"], _start_date);
  main.variable(observer("end_date")).define("end_date", ["observation_period"], _end_date);
  main.variable(observer("rawData_Filtered")).define("rawData_Filtered", ["rawData","start_date","end_date"], _rawData_Filtered);
  main.variable(observer("data")).define("data", ["rawData_Filtered","pieImages"], _data);
  main.variable(observer("names")).define("names", ["data"], _names);
  main.variable(observer("datevalues")).define("datevalues", ["d3","data"], _datevalues);
  main.variable(observer("pieImages")).define("pieImages", ["FileAttachment"], _pieImages);
  main.variable(observer("imageLinks")).define("imageLinks", ["pieImages"], _imageLinks);
  main.variable(observer("formatDate")).define("formatDate", ["d3"], _formatDate);
  main.variable(observer("rank")).define("rank", ["names","imageLinks"], _rank);
  main.variable(observer("keyframes")).define("keyframes", ["d3","datevalues","rank"], _keyframes);
  main.variable(observer("wrap")).define("wrap", ["d3"], _wrap);
  main.variable(observer()).define(["check_observation_period"], _20);
  main.variable(observer("set_input")).define("set_input", ["Event"], _set_input);
  main.variable(observer("check_observation_period")).define("check_observation_period", ["observation_period","set_input","viewof observation_period"], _check_observation_period);
  const child1 = runtime.module(define1);
  main.import("interval", child1);
  return main;
}
