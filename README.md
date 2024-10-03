# An AI chat website w/ Chart.js rendering

This repo contains the HTML/JS source code for a chat web interface.

Key features:  
✔️ Uses [OpenAI's Assistants API](https://learn.microsoft.com/azure/ai-services/openai/concepts/assistants) for responses.  
✔️ Saves and restores [Assistant Threads](https://learn.microsoft.com/azure/ai-services/openai/assistants-reference-threads) in sidebar.  
✔️ Renders streaming markdown using [markd](https://marked.js.org/).  
✔️ Highlights code blocks using [highlight.js](https://highlightjs.org/).  
✔️ Creates interactive charts using [Chart.js](https://www.chartjs.org/).  

This sample is based on the `openai-asst-webpage-with-functions` sample, created with the [Azure AI CLI (`ai`)](https://github.com/Azure/azure-ai-cli/):  

```bash
ai dev new openai-asst-webpage-with-functions --javascript
```

✍️ Read how we updated that sample to add Chart.js rendering [here](./.ai/data/updates-to-openai-asst-webpage-with-functions-js.md).  
📘 Read [The Book of AI](https://thebookof.ai) to get started with Azure AI here: [https://thebookof.ai/](https://thebookof.ai).  
🚀 Read below for instructions on how to set up and run this sample website locally.  

## STEP 1: Create or update your OpenAI Assistant instructions

This sample uses specialized OpenAI Assistant instructions ([assistant.instructions](.ai/data/assistant.instructions)) to generate charts using `Chart.js`.  

You can create or update your OpenAI Assistant instructions via [Azure AI Studio](https://ai.azure.com/) or using the Azure AI CLI (`ai`):

**STEP 1a: Install the Azure AI CLI (`ai`)**:  
[https://thebookof.ai/install-ai-cli/](https://thebookof.ai/install-ai-cli/)  

**STEP 1b: Select or create your Azure OpenAI resource**:  
[https://thebookof.ai/setup/openai/](https://thebookof.ai/setup/openai/)

**STEP 1c: Create or modify your OpenAI Assistant instructions**: 

```bash
ai chat assistant create --name my-chart-making-assistant --instructions @assistant.instructions
```

OR:

```bash
ai config --set assistant.id YOUR-ASSISTANT-ID
ai chat assistant update --instructions @assistant.instructions
```

## STEP 2: Create a `.env` file with configuration settings

This sample uses environment variables to retrieve the Azure OpenAI Assistant ID and other settings.  

- `ASSISTANT_ID`: The ID of the Azure OpenAI Assistant to use.
- `AZURE_OPENAI_API_KEY`: Your Azure OpenAI API key.
- `AZURE_OPENAI_API_VERSION`: The version of the Azure OpenAI API to use.
- `AZURE_OPENAI_CHAT_DEPLOYMENT`: The Azure OpenAI chat model deployment to use.
- `AZURE_OPENAI_ENDPOINT`: The endpoint of the Azure OpenAI API to use.

You can update the `.env` file using the Azure AI CLI (`ai`):

```bash
ai dev new .env
```

## STEP 3: Serve the website locally 

Use `npm` to install the required packages.  
Use `npm` (`vite` under the covers) to serve the website locally.  

```bash
npm install
npm run dev
```

Navigate to the URL provided by the `npm run dev` command to view the website.  