export async function fetchNotifications() {
  // Login
  const authResponse = await fetch(
    "http://4.224.186.213/evaluation-service/auth",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({
  email: "24215a0512@gmail.com",
  name: "prathap reddy yakkanti",
  rollNo: "24215a512",
  accessCode: "ahXjvp",
  clientID: "5e52fa45-8b67-469f-8228-e707b78e2314",
  clientSecret: "nESjnfuMvChMaugE",
}),
    }
  );

  const authData = await authResponse.json();

 console.log(authData);

  // Fetch notifications
  const response = await fetch(
    "http://4.224.186.213/evaluation-service/notifications",
    {
      headers: {
        Authorization: `${authData.token_type} ${authData.access_token}`,
      },
    }
  );

  return await response.json();
}