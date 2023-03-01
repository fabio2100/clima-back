export default function handler(request, response) {
    const { name } = request.query;
    console.log(request.query)
    return response.end(`Hello ${name}!`);
  }