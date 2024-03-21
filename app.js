<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Bellybutton Biodiversity</title>
  <script src="https://d3js.org/d3.v7.min.js"></script>
  <script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
</head>

<body>

  <div class="container">
    <div class="row">
      <div class="col-md-12 p-5 text-center bg-light">
        <h1>Belly Button Biodiversity Dashboard</h1>
        <p>Use the interactive charts below to explore the dataset</p>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2">
        <div class="card card-body bg-light">
          <h6>Test Subject ID No.:</h6>
          <select id="selDataset" onchange="optionChanged(this.value)"></select>
        </div>
        <div class="card card-primary">
          <div class="card-header">
            <h4 class="card-title">Demographic Info</h4>
          </div>
          <div id="sample-metadata" class="card-body"></div>
        </div>
      </div>
      <div class="col-md-5">
        <div id="bar"></div>
      </div>
      <div class="col-md-5">
        <div id="gauge"></div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12">
        <div id="bubble"></div>
      </div>
    </div>
  </div>

  <script>

    // Function to update the charts and metadata based on the selected sample
    function optionChanged(selectedSample) {
      d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(data => {
        const sampleData = data.samples.find(sample => sample.id === selectedSample);
        const metadata = data.metadata.find(metadata => metadata.id === parseInt(selectedSample));

        updateBarChart(sampleData);
        updateBubbleChart(sampleData);
        displayMetadata(metadata);
      }).catch(error => console.log("Error fetching data:", error));
    }

    // Function to create or update the bar chart
    function updateBarChart(data) {
      const sampleValues = data.sample_values.slice(0, 10).reverse();
      const otuIds = data.otu_ids.slice(0, 10).reverse().map(id => `OTU ${id}`);
      const otuLabels = data.otu_labels.slice(0, 10).reverse();

      const trace = {
        x: sampleValues,
        y: otuIds,
        text: otuLabels,
        type: 'bar',
        orientation: 'h'
      };

      const layout = {
        title: 'Top 10 OTUs',
        xaxis: { title: 'Sample Values' },
        yaxis: { title: 'OTU IDs' }
      };

      Plotly.newPlot('bar', [trace], layout);
    }

    // Function to create or update the bubble chart
    function updateBubbleChart(data) {
      const trace = {
        x: data.otu_ids,
        y: data.sample_values,
        text: data.otu_labels,
        mode: 'markers',
        marker: {
          size: data.sample_values,
          color: data.otu_ids
        }
      };

      const layout = {
        title: 'OTU Bubble Chart',
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'Sample Values' }
      };

      Plotly.newPlot('bubble', [trace], layout);
    }

    // Function to display sample metadata
    function displayMetadata(metadata) {
      const metadataDiv = document.getElementById('sample-metadata');
      metadataDiv.innerHTML = '<h4>Demographic Info</h4>';
      Object.entries(metadata).forEach(([key, value]) => {
        metadataDiv.innerHTML += `<p><strong>${key}:</strong> ${value}</p>`;
      });
    }

    // Initialize the dropdown menu
    d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then(data => {
      const dropdown = d3.select('#selDataset');
      data.names.forEach(sample => {
        dropdown.append('option').text(sample).property('value', sample);
      });

      // Initialize with the first sample
      optionChanged(data.names[0]);
    }).catch(error => console.log("Error fetching data:", error));

  </script>
</body>

</html>
