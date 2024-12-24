export const fetchWithErrorHandling = async (url: string) => {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log("Response status is not ok:", res.status);
      throw new Error(`Failed to fetch: ${res.statusText}`);
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { success: false, message: "something went wrong" + error };
  }
};

export const GetPropertyData = async (name: string) => {
  const data = await fetchWithErrorHandling(
    `${process.env.PUBLIC_URL}/api/properties?slug=${name}`
  );
  if (data.success === false) {
    throw new Error(data.message);
  }
  return data.property;
};

export const getPropertyRating = async (id: string | undefined) => {
  if (!id) return [];
  const data = await fetchWithErrorHandling(
    `${process.env.PUBLIC_URL}/api/rating?id=${id}`
  );
  if (data.success === false) {
    throw new Error(data.message);
  }
  return data.data;
};

export const getSimilarProperties = async (city: string | undefined) => {
  if (!city) return [];
  const data = await fetchWithErrorHandling(
    `${process.env.PUBLIC_URL}/api/get-data?city=${city}&limit=5`
  );
  if (data.success === false) {
    throw new Error(data.message);
  }
  return data.data;
};
