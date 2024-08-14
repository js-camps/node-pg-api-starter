require('dotenv').config()
const app = require('./api/app')

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`\n** Server is running on http://localhost:${port} **\n`);
    
});
app.timeout = 60 * 10 * 1000;