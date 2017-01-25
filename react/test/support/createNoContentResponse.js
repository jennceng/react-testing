let createNoContentResponse = () => {
  let response = new Response(undefined, {
    status: 204,
    statusText: 'No Content'
  });
  return Promise.resolve(response);
};

export default createNoContentResponse;
