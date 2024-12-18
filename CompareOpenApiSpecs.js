const fs = require('fs');
const openapiDiff = require("openapi-diff");

const filePath = './OpenApiJsons'; // Tiedostopolku, jossa OpenAPI JSON-tiedostot sijaitsevat
const oldJsonName = 'old.json'; // Vanhemman OpenAPI JSON-tiedoston nimi
const newJsonName = 'new.json'; // Uudemman OpenAPI JSON-tiedoston nimi

const loadJSON = (fileName) => {
  try {
    const data = fs.readFileSync(`${filePath}/${fileName}`, 'utf-8');
    return JSON.parse(data); // Fiksua castata eka objektiks, sit takas jsoniks.. :-DD
  } catch (err) {
    console.error(`Error loading file ${filePath}:`, err);
    process.exit(1);
  }
};

const compareOpenApiFiles = async () => {
  const oldSpec = loadJSON(newJsonName);
  const newSpec = loadJSON(oldJsonName);

  const result = await openapiDiff.diffSpecs({
    sourceSpec: {
      content: JSON.stringify(oldSpec),
      location: `${filePath}/${oldJsonName}`,
      format: "openapi3",
    },
    destinationSpec: {
      content: JSON.stringify(newSpec),
      location: `${filePath}/${newJsonName}`,
      format: "openapi3",
    },
  });

  if (!result.breakingDifferencesFound) {
    console.log('No breaking differences found between the two OpenAPI specifications.');
  }

  formatBreakingDifferences(result.breakingDifferences);
};

const formatBreakingDifferences = (differences) => {
  differences.forEach((difference, index) => {
    console.log(`\nDifference #${index + 1}:`);
    console.log(`  Type: ${difference.type}`);
    console.log(`  Action: ${difference.action}`);
    console.log(`  Code: ${difference.code}`);
    console.log(`  Entity: ${difference.entity}`);
    console.log(`  Source: ${difference.source}`);

    if (difference.sourceSpecEntityDetails?.length) {
      console.log(`  Source Details:`);
      difference.sourceSpecEntityDetails.forEach((detail, idx) => {
        console.log(`    [${idx + 1}] ${JSON.stringify(detail, null, 2)}`);
      });
    }

    if (difference.destinationSpecEntityDetails?.length) {
      console.log(`  Destination Details:`);
      difference.destinationSpecEntityDetails.forEach((detail, idx) => {
        console.log(`    [${idx + 1}] ${JSON.stringify(detail, null, 2)}`);
      });
    }
  });
};

compareOpenApiFiles();