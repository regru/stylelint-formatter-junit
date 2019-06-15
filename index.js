const xmlBuilder = require('xmlbuilder');
const path = require("path")

module.exports = (stylelintResults) => {
  let tests = 0;
  let failures = 0;
  const xmlRoot = xmlBuilder.create('testsuites', { encoding: 'utf-8' })
                            .att('package', 'stylelint.rules');
  const testSuites = stylelintResults.map((testSuite) => {
    const suite = parseSuite(testSuite);
    tests += suite.testsuite['@tests'];
    failures += suite.testsuite['@failures'];
    return suite;
  });

  return xmlRoot
    .att('tests', tests)
    .att('failures', failures)
    .element(testSuites)
    .end({ pretty: true });
};

function parseSuite(testSuite) {
  const suiteName = path.relative(process.cwd(), testSuite.source).split(path.sep).join("/");
  const failuresCount = testSuite.warnings.length;
  const testCases = testSuite.errored
                      ? testSuite.warnings.map((testCase) => parseFailedCase(testCase, suiteName))
                      : { '@name': 'stylelint.passed' };

  return {
    testsuite: {
      '@name': suiteName,
      '@failures': failuresCount,
      '@errors': failuresCount,
      '@tests': failuresCount || 1,
      testcase: testCases
    }
  };
}

function parseFailedCase(testCase, source) {
  const {
    rule,
    severity,
    text,
    line,
    column
  } = testCase;

  return {
    '@name': `${source}:${line}:${column} - ${rule}`,
    '@classname': rule,
    failure: {
      '@type': severity,
      '@message': text,
      '#text': `On line ${line}, column ${column} in ${source}`
    }
  };
}
