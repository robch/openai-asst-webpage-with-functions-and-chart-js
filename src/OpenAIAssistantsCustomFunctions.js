import { FunctionFactory } from "./FunctionFactory";
let factory = new FunctionFactory();

function getCurrentWeather(function_arguments) {
    const location = JSON.parse(function_arguments).location;
    return `The weather in ${location} is 72 degrees and sunny.`;
  };

const getCurrentWeatherSchema = {
  name: "get_current_weather",
  description: "Get the current weather in a given location",
  parameters: {
    type: "object",
    properties: {
      location: {
        type: "string",
        description: "The city and state, e.g. San Francisco, CA",
      },
      unit: {
        type: "string",
        enum: ["celsius", "fahrenheit"],
      },
    },
    required: ["location"],
  },
};

factory.addFunction(getCurrentWeatherSchema, getCurrentWeather);

function getCurrentDate() {
  const date = new Date();
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
}

const getCurrentDateSchema = {
  name: "get_current_date",
  description: "Get the current date",
  parameters: {
    type: "object",
    properties: {},
  },
};

factory.addFunction(getCurrentDateSchema, getCurrentDate);

function getCurrentTime() {
  const date = new Date();
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

const getCurrentTimeSchema = {
  name: "get_current_time",
  description: "Get the current time",
  parameters: {
    type: "object",
    properties: {},
  },
};

factory.addFunction(getCurrentTimeSchema, getCurrentTime);

function getRecommendedOilChangeForManufacturer(function_arguments) {
  const manufacturer = JSON.parse(function_arguments).manufacturer;
  // use tolower case and check for contains
  if (manufacturer.toLowerCase().includes("ford")) {
    return 5000;
  } else if (manufacturer.toLowerCase().includes("toyota")) {
    return 10000;
  } else {
    return 7500;
  }
}

const getRecommendedOilChangeForManufacturerSchema = {
  name: "get_recommend_oil_change_milesage_for_manufacturer",
  description: "Get the recommended oil change mileage for a given manufacturer",
  parameters: {
    type: "object",
    properties: {
      manufacturer: {
        type: "string",
        description: "The manufacturer of the vehicle",
      },
    },
    required: ["manufacturer"],
  },
};

factory.addFunction(getRecommendedOilChangeForManufacturerSchema, getRecommendedOilChangeForManufacturer);
export { factory };
