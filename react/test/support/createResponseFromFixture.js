let createResponseFromFixture = (fixtureFilename, statusCode = 200) => {
  let fixture = window.__fixtures__[fixtureFilename];
  let responseBody = JSON.stringify(fixture);
  let response = new Response(responseBody, {
    status: statusCode,
    statusText: 'OK',
    headers: { 'Content-Type': 'application/json' }
  });
  return Promise.resolve(response);
};

export default createResponseFromFixture;
