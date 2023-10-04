
    // Define the URL of the JSON file
    const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";
    
    // Use D3 to fetch and parse the JSON data
   
    d3.json(url).then(({names})=>{
        names.forEach(id => {
            d3.select('select').append('option').text(id);
        });

        optionChanged()
    });

    const optionChanged = () => {
        let id = d3.select('select').node().value;

        d3.json(url).then(({metadata,samples})=>{
            let meta = metadata.find(obj=>obj.id==id);
            let sample = samples.find(obj=>obj.id==id);

            d3.select('.panel-body').html('');
            Object.entries(meta).forEach(([key,val])=>{
                d3.select('.panel-body').append('h6').text(`${key.toUpperCase(0)}: ${val}`)
            })            
        })
        // Define a function to update the bar chart based on the selected ID
const updateBarChart = (selectedId) => {
    // Use D3.js to fetch the JSON data
    d3.json(url).then(({ samples }) => {
      // Find the sample data corresponding to the selected ID
      const sampleData = samples.find((obj) => obj.id == selectedId);
  
      // Slice the top 10 OTUs and keep them in descending order
      const top10Values = sampleData.sample_values.slice(0, 10).reverse();
      const top10Labels = sampleData.otu_ids
        .slice(0, 10)
        .map((id) => `OTU ${id}`)
        .reverse();
      const top10HoverText = sampleData.otu_labels.slice(0, 10).reverse();
  
      // Create the bar chart trace
      const trace = {
        x: top10Values,
        y: top10Labels,
        text: top10HoverText,
        type: "bar",
        orientation: "h", // Horizontal bar chart
      };
  
      // Create the bar chart data array
      const data = [trace];
  
      // Define the layout for the bar chart
      const layout = {
        title: `Top 10 OTUs for Test Subject ${selectedId}`,
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU Labels" },
      };
  
      // Plot the bar chart using Plotly
      Plotly.newPlot("bar", data, layout);
    });
  };
  
  // Attach the updateBarChart function to the dropdown's change event
  d3.select("#selDataset").on("change", function () {
    const selectedId = d3.select(this).property("value");
    updateBarChart(selectedId);
  });
  
  // Initial rendering of the bar chart with the first option (assuming it's the default)
  updateBarChart(d3.select("#selDataset").property("value"));

  // Define a function to update the bubble chart based on the selected ID
const updateBubbleChart = (selectedId) => {
    // Use D3.js to fetch the JSON data
    d3.json(url).then(({ samples }) => {
      // Find the sample data corresponding to the selected ID
      const sampleData = samples.find((obj) => obj.id == selectedId);
  
      // Extract the required data for the bubble chart
      const otuIds = sampleData.otu_ids;
      const sampleValues = sampleData.sample_values;
      const markerColors = otuIds; // Use otu_ids for marker colors
      const markerSize = sampleValues; // Use sample_values for marker size
      const textValues = sampleData.otu_labels; // Use otu_labels for text values
  
      // Create the bubble chart trace
      const trace = {
        x: otuIds,
        y: sampleValues,
        text: textValues,
        mode: "markers",
        marker: {
          size: markerSize,
          color: markerColors,
          colorscale: "Viridis", // You can choose a different colorscale if needed
          opacity: 0.7,
          showscale: true, // Show the color scale legend
        },
      };
  
      // Create the bubble chart data array
      const data = [trace];
  
      // Define the layout for the bubble chart
      const layout = {
        title: `Bubble Chart for Test Subject ${selectedId}`,
        xaxis: { title: "OTU IDs" },
        yaxis: { title: "Sample Values" },
      };
  
      // Plot the bubble chart using Plotly
      Plotly.newPlot("bubble", data, layout);
    });
  };
  
  // Attach the updateBubbleChart function to the dropdown's change event
  d3.select("#selDataset").on("change", function () {
    const selectedId = d3.select(this).property("value");
    updateBubbleChart(selectedId);
  });
  
  // Initial rendering of the bubble chart with the first option (assuming it's the default)
  updateBubbleChart(d3.select("#selDataset").property("value"));

  const optionChanged = () => {
  let id = d3.select('select').node().value;

  // Use D3.js to fetch the JSON data
  d3.json(url).then(({ metadata, samples }) => {
    let meta = metadata.find((obj) => obj.id == id);
    let sample = samples.find((obj) => obj.id == id);

    // Clear the existing content in the panel body
    d3.select('.panel-body').html('');

    // Append the demographic information to the panel body
    Object.entries(meta).forEach(([key, val]) => {
      d3.select('.panel-body')
        .append('h6')
        .text(`${key.toUpperCase()}: ${val}`);
    });

    // Update the bubble chart and bar chart based on the selected ID (if needed)
    updateBubbleChart(id); // Call the function to update the bubble chart
    updateBarChart(id);    // Call the function to update the bar chart
  });
};
    
    };
    