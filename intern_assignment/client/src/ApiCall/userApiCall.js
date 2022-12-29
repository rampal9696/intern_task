export const createUser = async (user) => {
  try {
    const res = await fetch("/signup", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const updateUser = async (user, id) => {
  try {
    const res = await fetch(`/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (user) => {
  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};

export const getUserById = async (id) => {
  const res = await fetch(`/user/${id}`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  });
  const data = await res.json();

  return data;
};
