# ADDING CHART.JS FUNCTIONALITY TO OPENAI ASST CHAT SAMPLE

We want to extend the functionality of a web app to allow users to create charts using Chart.js.

## WHERE WE ARE SO FAR

We've already generated a new web app using the Azure AI CLI (`ai`), which demonstrates:
- How to use OpenAI Assistants API to create a chat interface.
- How streaming chat messages are displayed in the chat interface.
- How to use Markdown to format those streaming messages.

We did that by using this AI CLI command:

```bash
ai dev new openai-asst-webpage-with-functions --javascript
cd openai-asst-webpage-with-functions-js
```

You'll find it in the `openai-asst-webpage-with-functions-js` folder in this repository.

If you don't have the Azure AI CLI, you can install it by following the instructions at [https://thebookof.ai](https://thebookof.ai).

## OUR APPROACH TO ADDING CHART.JS FUNCTIONALITY

To achieve our goal, we need to:
1. Update `index.html` to include the Chart.js script.
2. Update `src/script.js` to handle Chart.js code blocks and render the charts.

We'll do this by plugging into the existing Markdown rendering logic in `src/script.js`.

## READING THE SOURCE CODE FOR WHAT WE HAVE SO FAR

1. Please inspect the `openai-asst-streaming-with-functions-js` folder to understand the existing code structure.  
2. Specifically, read the `src/script.js` file to understand how the Markdown rendering logic works.
3. Note how the `marked` library is initialized and used to convert Markdown to HTML.
4. Note also how the streaming from the OpenAI API works, specifically, see where we're converting markdown messages to HTML.
5. Finally, read the `index.html` file to understand the structure of the web app.

## DELAYED RENDERING OF CHARTS

To ensure that the Chart.js charts are rendered correctly, we need to delay their rendering until the DOM elements are available. This is because the `<canvas>` elements required for the charts might not exist when the Markdown is being parsed. We can do this by inserting a canvas element into the HTML and then rendering the Chart.js chart into that canvas element later, once the DOM is ready.

## UPDATING `src/script.js`

We'll add several functions to handle the creation and rendering of Chart.js charts. We'll also modify the `marked.setOptions` configuration to handle `chartjs` language code blocks and return the canvas HTML. Finally, we'll incorporate delayed rendering logic to ensure that the charts are rendered after the DOM elements are genuinely available.

1. **Add Chart.js Handling Functions**:
   
   Implement the functions `createNewChartJsChart`, `populateNewChartLater`, `populateNewChartNow`, and `populateNewChartsNow` to handle the creation and rendering of Chart.js charts.
   
   ```javascript
   let totalCharts = 0;
   let chartsNotPopulated = [];
   function populateNewChartLater(chartId, chartConfig) {
     chartsNotPopulated.push({ id: chartId, config: chartConfig });
   }

   function populateNewChartNow(chart) {
       let ctx = document.getElementById(chart.id).getContext('2d');
       new Chart(ctx, {
         type: chart.config.type,
         data: chart.config.data,
         options: chart.config.options
       });
   }

   function populateNewChartsNow() {
     chartsNotPopulated.forEach(chart => {
       populateNewChartNow(chart);
     });
     chartsNotPopulated = [];
   }

   function createNewChartJsChart(code) {

     const chartId = `chart-${totalCharts}`;
     const html = `<canvas id="${chartId}"></canvas>`;

     let chartConfig;
     try {
       chartConfig = JSON.parse(code);
     } catch (e) {
       return html;
     }

     populateNewChartLater(chartId, chartConfig);
     totalCharts++;

     return html;
   }
   ```

2. **Modify `marked.setOptions`**:
   
   Update the `marked.setOptions()` configuration to handle `chartjs` language code blocks and return the canvas HTML.
   
   ```javascript
   marked.setOptions({
     highlight: function (code, lang) {
       if (lang === 'chartjs') {
         let chart = createNewChartJsChart(code);
         return `<div class="chartjs">${chart}</div>`;
       }

       let hl = lang === undefined || lang === ''
         ? hljs.highlightAuto(code).value
         : hljs.highlight(lang, code).value;
       return `<div class="hljs">${hl}</div>`;
     }
   });
   ```

3. **Incorporate Delayed Rendering Logic**:
   
   Ensure that the rendering of Chart.js charts is delayed until the DOM elements are available. Modify the `assistant.getResponse` and `newMessage.innerHTML` assignments to utilize the delayed rendering approach.
   
   ```javascript
   await assistant.getResponse(userInput, function (response) {
     let atBottomBeforeUpdate = chatPanelIsScrollAtBottom();

     completeResponse += response;
     let withEnding = `${completeResponse}${blackVerticalRectangle}`;
     let asHtml = markdownToHtml(withEnding);

     if (asHtml !== undefined) {
       newMessage.innerHTML = asHtml;
       populateNewChartsNow();

       if (atBottomBeforeUpdate) {
         chatPanelScrollToBottom();
       }
     }
   });

   newMessage.innerHTML = markdownToHtml(completeResponse) || completeResponse.replace(/\n/g, '<br/>');
   populateNewChartsNow();
   ```

**CRITICAL NOTES**:  
- You **MUST NOT** leave placeholders in the source files. You must write all the code that's required.  
- You **MUST NOT** skip over code that's already in the source files.  

## UPDATING `index.html`

To ensure Chart.js is properly loaded in your project, you need to add the Chart.js script reference in the `head` section of your `index.html` file.

1. **Include Chart.js Script**:
   
   Open your `index.html` file and add the following script reference within the `<head>` tag to include Chart.js:
   
   ```html
   <head>
     <!-- Other head elements -->
     <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
   </head>
   ```

By adding this script reference, you ensure that Chart.js is available when your JavaScript code attempts to render charts.

## CONCLUSION

By following these instructions, you can accurately incorporate Chart.js functionality into your `openai-asst-webpage-with-functions-js` project. Ensure that charts are correctly rendered by handling them after the DOM elements are ready, which involves the delayed rendering approach discussed above.

Now, it's your turn. Please go ahead and follow the instructions above to read the appropriate files, understand how the changes will be applied, and then, finally, save your work by updating the `src/script.js` and `index.html` files using the functions provided.

You should have enough information to complete the task now. Go ahead and do your work. Don't ask me any further questions.

Just do the work. I'll review it when you're done to make sure you've done it correctly.

But remember, don't leave any placeholders in the source files.

Thanks.