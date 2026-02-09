module.exports = {
  apps: [
    {
      name: "Sarangsho",
      script: ".next/standalone/server.js",
      cwd: "/home/sarangsho/htdocs/sarangsho.com",
      instances: 1,
      exec_mode: "cluster",
      listen_timeout: 10000,
      restart_delay: 10000,
      env: {
        NODE_ENV: "production",
        PORT: 3002,
      },
    },
  ],
};
