const logger = require("./logging.js");
const fs = require('fs');

logger.logTitle("VALIDATING CUSTOM CONVENTIONAL COMMITS TYPE");

const AllowedReleaseType = [
    "major",
    "minor",
    "patch"
];

const customCCFilePath = process.argv[2];
logger.logKeyValuePair("custom-conventional-commits-file", customCCFilePath);

if (fs.existsSync(customCCFilePath)) {
    let rawdata = fs.readFileSync(customCCFilePath);
    let CCTypevsReleaseType = JSON.parse(rawdata);

    CCTypevsReleaseType.forEach(element => {
        logger.logAction("Validating Convention Commit Type:")
        if (!element.commitType) {
            throw new Error(`ERROR: no release type defined for ${element.releaseType}`);
        }

        if (!element.releaseType && !AllowedReleaseType.includes(element.releaseType)) {
            throw new Error(`ERROR:  ${element.releaseType} is invalid release type.`);
        }

        logger.logKeyValuePair("commitType", element.commitType);
        logger.logKeyValuePair("releaseType", element.releaseType);

    });

    logger.logSucceed("the conventional commits provided are valid!");

} else {
    throw new Error('ERROR: custom-conventional-commits-file path does not exist!');
}