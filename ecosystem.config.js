module.exports = {
    apps: [
        {
            name: 'backend',
            cwd: './backend',
            script: 'npm',
            args: 'start',
            env: {
                PORT: 5000,
                NODE_ENV: 'development'
            }
        },
        {
            name: 'admin-panel',
            cwd: './admin',
            script: 'npm',
            args: 'run dev',
            env: {
                PORT: 3001
            }
        },
        {
            name: 'webapp',
            cwd: './lider-bazar',
            script: 'npm',
            args: 'run dev',
            env: {
                PORT: 3000
            }
        }
    ]
};
