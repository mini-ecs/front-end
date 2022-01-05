import AuthRequest from 'umi-request';

AuthRequest.interceptors.response.use(async (response) => {
  const status = await response.status;
  const location = await response.headers.get('location');
  console.log(response);
  if (status == 301 && location) {
    window.location.href = location;
  }
  return response;
});

export { AuthRequest };
