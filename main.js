document.addEventListener("DOMContentLoaded", () => {
  const outputDiv = document.getElementById("responseContainer");
  const fetchHeaderButton = document.getElementById("fetchHeader");
  const fetchWithoutHeaderButton =
    document.getElementById("fetchWithoutHeader");

  async function fetchUserData(includeHeader) {
    outputDiv.textContent = "Loading...";
    console.log("Fetching user's data...");

    try {
      //   const headers = includeHeader
      //     ? {
      //         "x-api-key": "reqres-free-v1",
      //       }
      //     : {}; //based on the button clicked, header api key is either set or omitted
      const headers = {
        ...(includeHeader && { "x-api-key": "reqres-free-v1" }),
      };

      const response = await fetch("https://reqres.in/api/users?delay=1", {
        headers, //fetching the headers
      });

      if (!response.ok) {
        //error in case response is not ok
        throw new Error(`There was a HTTP Error! Status: ${response.status}`);
      }
      const { data = [] } = (await response.json()) || {}; //parsing the response data to JSON
      await new Promise((resolve) => setTimeout(resolve, 1000)); //simulating a delay of 3 seconds

      console.log("Response data: ", data);
      //if(!data.length)
      if (data.length === 0) {
        outputDiv.textContent = "No user data found."; //if no data is found, display No user data found
      }

      const fullNames = data.map(
        (user) => `${user.first_name} ${user.last_name}` //mapping the first and last names to a new array as a string
      );

      outputDiv.textContent = "";
      fullNames.forEach((name) => {
        //iterating through every previously created string and "printing" inside a newly created <p>
        const p = document.createElement("p");
        p.textContent = name;
        outputDiv.appendChild(p);
      });

      console.log("Done");
    } catch (error) {
      //catching errors
      console.error("Error fetching user data:", error);
      outputDiv.textContent = "Error fetching user data.";
    }
  }

  //Event listeners for specific buttons
  fetchHeaderButton.addEventListener("click", () => {
    fetchUserData(true);
  });
  fetchWithoutHeaderButton.addEventListener("click", () => {
    fetchUserData(false);
  });
});
