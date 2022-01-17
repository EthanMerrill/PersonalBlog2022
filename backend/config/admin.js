module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '3f5417f665c000c873f614b0c58ce266'),
  },
});
