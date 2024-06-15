module.exports = {
    apps: [
      {
        name: 'next-dev',
        script: 'npm',
        args: 'run dev',
        watch: true,
        env: {
          NODE_ENV: 'development'
        }
      }
    ]
  };
  