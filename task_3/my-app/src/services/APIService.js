const APIService = () => {
  const getInfo = async (country) => {
    const response = await fetch(
      `http://universities.hipolabs.com/search?country=${country}`
    ).then((res) => res.json());

    return response.map(_transformInfo);
  };

  const _transformInfo = (info) => {
    return {
      code: info.alpha_two_code,
      country: info.country,
      domains: info.domains,
      name: info.name,
      pages: info.web_pages,
    };
  };

  return {
    getInfo,
  };
};

export default APIService;
