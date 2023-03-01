export default function handler(request, response) {
  response.status(200).json({
    body: 'hola mundo desde pages/api'
  });
}