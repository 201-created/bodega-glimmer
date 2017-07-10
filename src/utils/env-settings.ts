const CURRENT_ENV = "production";

const devSettings = {
  apiBase: "https://localhost:3000/api",
  stripeKey: "pk_test_SrD06JdAhT0DZvBEK8SZ9aiB"
};

const prodSettings = {
  ...devSettings,
  apiBase: "https://api.shop-201.com/api",
  stripeKey: "pk_live_f90QszZOgLBlf3U25ZhPnV0M"
};

const settings = { development: devSettings, production: prodSettings };

export default settings[CURRENT_ENV];