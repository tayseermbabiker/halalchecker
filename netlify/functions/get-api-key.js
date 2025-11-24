exports.handler = async (event, context) => {
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
    body: process.env.OPENAI_API_KEY || 'API_KEY_NOT_SET'
  };
};